import create from 'zustand';
import { nanoid } from 'nanoid';

// build a hook that manages state. This will allow you to create cubes etc...
export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: [{
        // intial cube
        key: nanoid(),
        pos: [10, 0.5, 10],
        texture: 'dirt',
    }],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: () => {},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {},
}))