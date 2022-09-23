import { AnyObj, prune } from '@weis-guys/ts-utils'
import {
    collection, getDocs, getDocsFromCache,
    setDoc, deleteDoc, doc,
    query, where, limit,
} from 'firebase/firestore'
import { FIREBASE } from '../constants/FIREBASE'
import { TimestampLike } from './TimestampLike'

export const db = {
    async getCollection<DocData extends AnyObj> ( collectionName: string ) {
        const collectionRef = collection( ( await FIREBASE ).db, collectionName )

        return {
            async find1 ( props: Partial<DocData>, { from }: { from?: 'cache' } = {} ) {
                const prunedProps = prune( props )
                if ( !Object.entries( prunedProps ).length ) return

                const queryRef = query(
                    collectionRef,
                    ...Object.entries( props )
                        .filter( ( [ key, value ] ) => value != null )
                        .map( ( [ key, value ] ) => where( key, '==', value ) ),
                    limit( 1 )
                ).withConverter<DocData>( {
                    toFirestore: x => x,
                    fromFirestore: x => TimestampLike.toISO( { id: x.id, ...x.data() } ),
                } )

                const querySnapshot = await ( () => {
                    if ( from == 'cache' ) return getDocsFromCache( queryRef )
                    return getDocs( queryRef )
                } )()

                const [ doc ] = querySnapshot.docs

                // if ( querySnapshot.size ) return doc.data()
                if ( querySnapshot.size ) {
                    console.log( 'find1', prunedProps, doc.data() )
                    return doc.data()
                }

                console.log( 'find1', prunedProps, 'no data found' )
            },
            async set ( id: string, newData: DocData ) {
                const docRef = doc( collectionRef, id )
                await setDoc( docRef, newData )
                return newData
            },
            async delete ( id: string ) {
                const docRef = doc( collectionRef, id )
                return deleteDoc( docRef )
            },
        }
    }
}