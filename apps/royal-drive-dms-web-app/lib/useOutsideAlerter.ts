import { MutableRefObject, useEffect, useRef } from 'react'

// ref: MutableRefObject<null>,
export function useOutsideAlerter ( cb: () => void ) {
    const ref = useRef<any>( null )

    useEffect( () => {
        function handleClickOutside ( e: MouseEvent ) {
            if ( ref.current && !ref.current.contains( e.target ) ) {
                cb()
            }
        }

        document.addEventListener( 'click', handleClickOutside )

        return () => {
            document.removeEventListener( 'click', handleClickOutside )
        }
    }, [ ref ] )
    return ref
}