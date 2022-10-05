import { AnyObj, is } from '@weis-guys/ts-utils'
import { CollectionRef } from './CollectionRef'

export type DocRef<Data extends AnyObj> = {
    key: string
    getData: () => Promise<Data | undefined>
    setData: ( data: Data ) => Promise<Data | undefined>
}

export type DocRefMaker<Data extends AnyObj> = ( key: string ) => DocRef<Data>

export const makeDocRef = <Data extends AnyObj> (
    collection: CollectionRef<Data>
): DocRefMaker<Data> => key => {
    if ( !key ) throw new Error( 'key is required' )
    if ( !is.string( key ) ) throw new Error( 'key must be a string' )

    return {
        key,
        getData: async () => await collection.getItem( key ) ?? undefined,
        setData: async data => await collection.setItem( key, data ) as Data,
    }
}