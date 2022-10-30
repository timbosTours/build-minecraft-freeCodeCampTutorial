import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

// First Player View component

export const FPV = () => {
    const { camera, gl } = useThree()

    return (<PointerLockControls args={[camera, gl.domElement]} />)
}