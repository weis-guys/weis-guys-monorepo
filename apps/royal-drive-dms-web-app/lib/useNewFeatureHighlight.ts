import { stringify } from '@weis-guys/ts-utils'
import { useEffect, useState } from 'react'

export function useNewFeatureHighlight ( id: string, type: 'once' | 'always' = 'once' ) {
    const localStorageKey = `NewFeatureHighlight: ${ id }`
    const [ hidden, hiddenSet ] = useState<boolean>( false )

    useEffect( () => {
        if ( type == 'always' ) return
        const { highlightHidden: value } = JSON.parse(
            localStorage.getItem( localStorageKey ) ?? 'null'
        ) ?? {}
        hiddenSet( value )
    }, [] )

    return {
        hidden,
        shown: !hidden,
        hide () {
            if ( hidden ) return
            hiddenSet( true )
            localStorage.setItem( localStorageKey, stringify( { highlightHidden: true } ) )
        }
    } as const
}