import { AnyNullableObj, AnyObj } from '@weis-guys/ts-utils'
import { CollectionRef } from './CollectionRef'
import { DBRef } from './DBRef'

export type DocSelector<Data extends AnyObj> = string | Partial<Data>

export type DocRef<Data extends AnyNullableObj> = {
    selector: DocSelector<NonNullable<Data>>
    get: () => Promise<Data>
    set: ( data: Data ) => Promise<Data>
}

type CollectionDocRefMaker = <Data extends AnyNullableObj> (
    collection: CollectionRef<Data>
) => DocRefMaker<Data>

export type DocRefMaker<Data extends AnyNullableObj> = (
    selector: DocSelector<NonNullable<Data>>
) => DocRef<Data>

export const makeDocRef = ( db: DBRef ): CollectionDocRefMaker =>
    <Data extends AnyNullableObj> ( collection: CollectionRef<Data> ): DocRefMaker<Data> =>
        selector => {
            if ( !selector )
                throw new Error( 'selector is required' )

            const idSelector = typeof selector == 'string' ? selector : undefined
            const objSelector = typeof selector == 'object' ? selector : undefined

            if ( !idSelector && !objSelector )
                throw new Error( 'selector must be a string or object' )

            const docRef: DocRef<Data> = {
                selector,
                get: async () => {
                    if ( idSelector )
                        return await collection.lfRef.getItem( idSelector ) as Data

                    return {} as Data
                },
                set: async data => {
                    if ( idSelector )
                        return await collection.lfRef.setItem( idSelector, data ) as Data

                    return {} as Data
                },
            }

            return docRef
        }