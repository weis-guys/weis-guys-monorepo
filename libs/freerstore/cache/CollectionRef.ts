import localForage from 'localforage'
import { AnyObj, } from '@weis-guys/ts-utils'
import { DBRef } from './DBRef'
import { DocRefMaker, makeDocRef } from './DocRef'

export type Selector<Data extends AnyObj> = Partial<Data>

export type CollectionRef<Data extends AnyObj> = {
    name: string
    dbRef: DBRef
    lfRef: LocalForage
    doc: DocRefMaker<Data>
    find: ( selector?: Selector<Data> ) => Promise<Data | undefined>
    findMany: ( selector?: Selector<Data> ) => Promise<( Data | undefined )[]>
    // add: ( data: Data ) => Promise<Data | undefined>
}

export type CollectionRefMaker = ReturnType<typeof makeCollectionRef>

export const makeCollectionRef = ( dbRef: DBRef ) =>
    <Data extends AnyObj> ( collectionName: string ) => {
        type Entry = Awaited<ReturnType<typeof getEntries>>[ number ]

        if ( !collectionName )
            throw new Error( 'collectionName is required' )

        if ( typeof collectionName !== 'string' )
            throw new Error( 'collectionName must be a string' )

        const lfRef = localForage.createInstance( {
            name: dbRef.name,
            storeName: collectionName
        } )

        const getEntries = async () => {
            const keys = await lfRef.keys()
            return Promise.all(
                keys.map( async key => [
                    key,
                    await lfRef.getItem<Data>( key ) ?? undefined
                ] as const )
            )
        }

        const entryFilter = ( selector?: Selector<Data> ) => ( [ , doc ]: Entry ) =>
            Object.entries( selector ?? {} ).every( ( [ key, val ] ) => doc?.[ key ] === val )

        const collectionRef: CollectionRef<Data> = {
            name: collectionName,
            dbRef,
            lfRef,
            doc: x => makeDocRef( dbRef )( collectionRef )( x ),
            find: async selector => {
                const entries = await getEntries()
                const entry = entries.find( entryFilter( selector ) )
                return entry?.[ 1 ]
            },
            findMany: async selector => {
                const entries = await getEntries()
                const filteredEntries = entries.filter( entryFilter( selector ) )
                if ( !filteredEntries?.length ) return []
                return filteredEntries.map( ( [ , doc ] ) => doc )
            },
            // add: async data => {
            //     console.log( 'add', data )
            //     return {} as Data
            // },
        }

        return collectionRef
    }