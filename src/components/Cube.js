import { useBox } from "@react-three/cannon"
import { useStore } from '../hooks/useStore'
import { useState } from "react"
import * as textures from '../images/textures'
import { dirtImg } from "../images/images"



export const Cube = ({ position, texture }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))

    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial map={activeTexture} attach="material"/>
        </mesh>
    )
}