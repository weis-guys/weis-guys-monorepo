import { AnyNullableObj } from '@weis-guys/ts-utils'
import { DBRef } from './DBRef'
import { DocRefMaker, makeDocRef } from './DocRef'

export type CollectionRef<Data extends AnyNullableObj> = {
    name: string
    dbRef: DBRef
    lfRef: LocalForage
    doc: DocRefMaker<Data>
    get: () => Record<string, Data>
}

export type CollectionRefMaker = ReturnType<typeof makeCollectionRef>

export const makeCollectionRef = ( dbRef: DBRef ) =>
    <Data extends AnyNullableObj> ( collectionName: string ) => {
        if ( !collectionName )
            throw new Error( 'collectionName is required' )

        if ( typeof collectionName !== 'string' )
            throw new Error( 'collectionName must be a string' )

        const collectionRef: CollectionRef<Data> = {
            name: collectionName,
            dbRef,
            doc: x => makeDocRef( dbRef )( collectionRef )( x ),
            lfRef: dbRef.lfRef.createInstance( {
                storeName: collectionName
            } ),
            get: () => {
                console.log( 'get' )
                return {} as Record<string, Data>
            },
        }

        return collectionRef
    }