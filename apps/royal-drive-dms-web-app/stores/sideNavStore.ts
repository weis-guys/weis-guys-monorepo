import { createStore } from 'zustand'

export const sideNavStore = createStore<{
    isOpen: boolean
    toggle: () => void
    close: () => void
}>(
    set => ( {
        isOpen: false,
        toggle: () => set( x => ( { isOpen: !x.isOpen } ) ),
        open: () => set( ( { isOpen: true } ) ),
        close: () => set( ( { isOpen: false } ) ),
    } )
)