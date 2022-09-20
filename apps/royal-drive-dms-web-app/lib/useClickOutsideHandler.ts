import { RefObject, useEffect, useRef } from 'react'

export function useClickOutsideHandler ( cb: () => void ) {
    const ref = useRef<Node>( null )

    useEffect( () => {
        function handleClickOutside ( e: MouseEvent ) {
            if ( ref.current && !ref.current.contains( e.target as Node ) ) cb()
        }

        document.addEventListener( 'click', handleClickOutside )

        return () => {
            document.removeEventListener( 'click', handleClickOutside )
        }
    }, [ ref ] )

    return ref as RefObject<any>
}