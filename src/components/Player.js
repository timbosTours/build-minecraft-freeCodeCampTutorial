import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import {  Vector3 } from "three"
import { useEffect, useRef } from "react"
import { useKeyboard } from "../hooks/useKeyboard"


const JUMP_FORCE = 4;
const SPEED = 4;

// create component for player
export const Player = () => {
    const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard()
    // debug movement keys
    // console.log('actions', Object.entries(actions).filter(([k,v]) => v));

    // create camera for player
    const { camera } = useThree()
// create sphere to represent player
    const [ref, api] = useSphere(() => ({
        // mass for gravity effect
        mass: 1,
        // ?
        type: 'Dynamic',
        // ?
        position: [0,1,0]
    }))

    // store velocity of player
    const vel = useRef([0, 0, 0])
    // subscribe camera to player
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v)
        }, [api.velocity])

    // store position of player
    const pos = useRef([0, 0, 0])
    // subscribe camera to player
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p)
        }, [api.position])

    
    // assign camera position to pos variable
    // this hook runs on every frame
    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]))

        // create vectors for sideways movements
        const direction =  new Vector3()

        const frontVector =  new Vector3(
            0,
            0,
            // backwards cancels forwards movement, forwards cancels abckwards
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        )

        const sideVector =  new Vector3(
            // left cancels right movement, right cancels left
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        )

        // do some calculations(originate from direction vectors)
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)
        
        api.velocity.set(direction.x, vel.current[1], direction.z)

        // make player jump
        if (jump && Math.abs(vel.current[1] < 0.05)) {
            api.velocity.set(vel.current[0], JUMP_FORCE,  vel.current[2])
            
        }
    })

    // return player sphere
    return (
        <mesh ref={ref}> </mesh>
    )
}
