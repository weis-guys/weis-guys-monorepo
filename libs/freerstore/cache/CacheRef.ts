import { is } from '@weis-guys/ts-utils'
import { CollectionRefMaker, makeCollectionRef } from './CollectionRef'

export type CacheRef = {
    name: string
    collection: CollectionRefMaker
}

export function makeCacheRef ( cacheName: string ): CacheRef {
    if ( !cacheName ) throw new Error( 'cacheName is required' )
    if ( !is.string( cacheName ) ) throw new Error( 'cacheName must be a string' )

    return {
        name: cacheName,
        collection ( x ) { return makeCollectionRef( this )( x ) },
    }
}