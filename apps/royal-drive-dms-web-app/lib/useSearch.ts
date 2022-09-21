import { useState } from 'react'

const testSearch = ''
// const testSearch = '1FTNE14W18DB27128'
// const testSearch = '1C4NJDBB3HD133672'
// const testSearch = '56206002'

export function useSearch ( initialSearch?: string ) {
    const [ search, searchSet ] = useState( initialSearch ?? testSearch )

    /* TODO
    - make search history/results popup under search bar
    - make different sections in results
      - active cars
      - sold cars
      - pages, so people can search for pages that might not appear in the nav bar
    */

    return [ search, searchSet ] as const
}