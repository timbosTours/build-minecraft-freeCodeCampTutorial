import { useFrame, useThree } from "@react-three/fiber"
import { useSphere } from "@react-three/cannon"
import { Vector3 } from "three"
import { useEffect, useRef } from "react"
import { useKeyboard } from "../hooks/useKeyboard"

// create component for player
export const Player = () => {
    const actions = useKeyboard()
    console.log('actions', Object.entries(actions).filter(([k,v]) => v));

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

        api.velocity.set(0,0,0)
    })

    // return player sphere
    return (
        <mesh ref={ref}> </mesh>
    )
}
