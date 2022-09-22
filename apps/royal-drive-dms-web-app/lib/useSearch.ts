import { stringify } from '@weis-guys/ts-utils'
import { useState } from 'react'

export function useSearch<Item> ( items: Item[] = [], initialSearch: string = '' ) {
    const [ search, searchSet ] = useState( initialSearch )
    // const [ search, searchSet ] = useState( initialSearch || testSearch )

    const results = items.filter( item => stringify( item ).match( new RegExp( search, 'gi' ) ) )

    /* TODO
    - make search history/results popup under search bar
    - history
      - previous searches
      - previous clicked results
    - make different sections in results for each result type
    - result types
      - cars (active and sold)
      - pages, so users can search for pages that might not appear in the nav bar
      - settings
    */

    return { search, searchSet, results } as const
}