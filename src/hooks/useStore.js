import create from 'zustand';
import { nanoid } from 'nanoid';

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => JSON.stringify(window.localStorage.setItem(key, JSON.stringify(value)))

// build a hook that manages state. This will allow you to create cubes etc...
export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [ ],
        // default cubes for debugging/creating
    //     {
    //     // intial cube
    //     key: nanoid(),
    //     pos: [2, 0.5, 0],
    //     texture: 'dirt',
    //     },
    //     {
    //     // intial cube
    //     key: nanoid(),
    //     pos: [1, 0.5, 0],
    //     texture: 'wood',
    // }

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
    removeCube: (x,y,z) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [X, Y, Z] = cube.pos
                return X !== x || Y !== y || Z !== z
            })
        }))
    },
    setTexture: (texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => {
        set((prev) => {
            setLocalStorage('cubes', prev.cubes)
        })
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    },
}))