import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures"

// ground component
export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0], position: [0, 0, 0]
    }))

    // stop texture from stretching
    groundTexture.magFilter = NearestFilter;
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100,100)

    // return ground geometry with texture wrapped
    return (
        <mesh ref={ ref }>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
}