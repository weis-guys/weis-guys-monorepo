import { AnyObj } from '@weis-guys/ts-utils'
import localForage from 'localforage'
import { CollectionRefMaker, makeCollectionRef } from './CollectionRef'

export type DBRef = {
    name: string
    lfRef: LocalForage
    collection: CollectionRefMaker
}

export function makeDBRef ( dbName: string ) {
    if ( !dbName )
        throw new Error( 'dbName is required' )

    if ( typeof dbName !== 'string' )
        throw new Error( 'dbName must be a string' )

    const dbRef: DBRef = {
        name: dbName,
        collection: x => makeCollectionRef( dbRef )( x ),
        lfRef: localForage.createInstance( {
            driver: localForage.INDEXEDDB,
            name: dbName,
            storeName: '[default]'
        } ),
    }

    return dbRef
}