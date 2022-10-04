import { AnyObj } from '@weis-guys/ts-utils'
import { CollectionRef } from './CollectionRef'
import { DBRef } from './DBRef'

export type DocRef<Data extends AnyObj> = {
    id: string
    get: () => Promise<Data | undefined>
    set: ( data: Data ) => Promise<Data | undefined>
}

type CollectionDocRefMaker = <Data extends AnyObj> (
    collection: CollectionRef<Data>
) => DocRefMaker<Data>

export type DocRefMaker<Data extends AnyObj> = (
    id: string
) => DocRef<Data>

export const makeDocRef = ( db: DBRef ): CollectionDocRefMaker =>
    <Data extends AnyObj> ( collection: CollectionRef<Data> ): DocRefMaker<Data> =>
        id => {
            if ( !id )
                throw new Error( 'id is required' )

            if ( typeof id != 'string' )
                throw new Error( 'id must be a string' )

            const docRef: DocRef<Data> = {
                id,
                get: async () => await collection.lfRef.getItem<Data>( id ) ?? undefined,
                set: async data => await collection.lfRef.setItem( id, data ) as Data,
            }

            return docRef
        }