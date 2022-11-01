import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

// ground component
export const Ground = () => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI/2, 0, 0], position: [0, 0.5, 0]
    }))

    const [addCube] = useStore((state) => [state.addCube])

    // stop texture from stretching
    groundTexture.magFilter = NearestFilter;
    groundTexture.wrapS = RepeatWrapping;
    groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100,100)

    // return ground geometry with texture wrapped
    return (
        <mesh
            // create click event to add cubes
            onClick={(e) => {
                e.stopPropagation()
                const [x, y, z] = Object.values(e.point).map(val => Math.ceil(val));
                addCube(x,y,z)
                
            }}
            ref={ref}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture} />
        </mesh>
    )
}