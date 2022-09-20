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

// export function useClickOutsideHandler (
//     nodeRefs: Set<RefObject<Node | undefined>>,
//     cb: () => void,
// ) {
//     useEffect( () => {
//         function handleClickOutside ( e: MouseEvent ) {
//             const clickedOutside = [ ...nodeRefs ].every( ref => {
//                 console.log( ref.current )
//                 return ref.current && !ref.current.contains( e.target as Node )
//             } )
//             // console.log( 'click', clickedOutside )
//             if ( clickedOutside ) cb()
//         }

//         document.addEventListener( 'click', handleClickOutside )

//         return () => {
//             document.removeEventListener( 'click', handleClickOutside )
//         }
//     }, [ nodeRefs ] )
// }