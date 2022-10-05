import { AnyObj, is, } from '@weis-guys/ts-utils'
import { CacheRef } from './CacheRef'
import { getDoc } from './Doc'
import { DocRefMaker, makeDocRef } from './DocRef'
import { makeStore, type Store } from './Store'

export type Selector<Data extends AnyObj> = Partial<Data>

export type CollectionRef<Data extends AnyObj> = Store & {
    name: string
    cacheRef: CacheRef
    doc: DocRefMaker<Data>
    getDocs (): Promise<Doc<Data>[]>
    findOne: ( selector?: Selector<Data> ) => Promise<Data | undefined>
    findMany: ( selector?: Selector<Data> ) => Promise<( Data | undefined )[]>
    query: ( queryFn: ( entry: { key: string, data: Data | undefined } ) => boolean ) => Promise<( Data | undefined )[]>
}

export type CollectionRefMaker = ReturnType<typeof makeCollectionRef>

export const makeCollectionRef = ( cacheRef: CacheRef ) =>
    <Data extends AnyObj> ( collectionName: string ): CollectionRef<Data> => {
        type Entry = Awaited<ReturnType<typeof getAllDocEntries>>[ number ]

        if ( !collectionName ) throw new Error( 'collectionName is required' )
        if ( !is.string( collectionName ) ) throw new Error( 'collectionName must be a string' )

        const store = makeStore( cacheRef.name, collectionName )

        // TODO make customizable ???
        const entryFilter = ( selector?: Selector<Data> ) => ( [ , data ]: Entry ) =>
            Object.entries( selector ?? {} ).every( ( [ key, val ] ) => data?.[ key ] === val )

        return {
            name: collectionName,
            cacheRef,
            ...store,
            doc ( x ) { return makeDocRef( this )( x ) },
            async getDocs () {
                const keys = await this.keys()
                return Promise.all( keys.map( getDoc( this ) ) )
            },
            findOne: async selector => {
                const entries = await getAllDocEntries<Data>( store )
                const entry = entries.find( entryFilter( selector ) )
                return entry?.[ 1 ]
            },
            findMany: async selector => {
                const entries = await getAllDocEntries<Data>( store )
                const filteredEntries = entries.filter( entryFilter( selector ) )
                if ( !filteredEntries?.length ) return []
                return filteredEntries.map( ( [ , data ] ) => data )
            },
            query: async queryFn => {
                const entries = await getAllDocEntries<Data>( store )
                const filteredEntries = entries.filter( ( [ key, data ] ) => queryFn( { key, data } ) )
                if ( !filteredEntries?.length ) return []
                return filteredEntries.map( ( [ , data ] ) => data )
            },
        }
    }

// const getAllDocEntries = async <Data extends AnyObj> ( store: Store ) => {
//     const keys = await store.keys()
//     return Promise.all(
//         keys.map( async key => [
//             key,
//             await store.getItem<Data>( key ) ?? undefined
//         ] as const )
//     )
// }