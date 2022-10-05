import { AnyObj } from '@weis-guys/ts-utils'
import { CollectionRef } from './CollectionRef'

export type Doc<Data extends AnyObj> = {
    key: string
    data?: Data | undefined
} | undefined

export const getDoc = <Data extends AnyObj> ( collection: CollectionRef<Data> ) =>
    async ( key: string ): Promise<Doc<Data>> => {
        return {
            key,
            data: await collection.getItem( key ) ?? undefined,
        }
    }