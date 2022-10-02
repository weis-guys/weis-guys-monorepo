import { AnyObj, prune } from '@weis-guys/ts-utils'
import { TimestampLike } from './TimestampLike'
import { FirebaseApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDocsFromCache,
    setDoc,
    deleteDoc,
    query,
    where,
    limit,
    onSnapshot,
    CollectionReference,
    QueryConstraint,
    QuerySnapshot,
    FirestoreDataConverter,
} from 'firebase/firestore'

export const makeFreerstoreDB = ( firebaseApp: FirebaseApp ) => {
    const firestore = getFirestore( firebaseApp )

    return {
        getCollection<DocData extends AnyObj> ( collectionName: string ) {
            const collectionRef = collection( firestore, collectionName ) as CollectionReference<DocData>

            const converter: FirestoreDataConverter<DocData> = {
                toFirestore: x => x,
                fromFirestore: x => TimestampLike.toISO( { id: x.id, ...x.data() } ),
            }

            return {
                async findDoc ( props: Partial<DocData>, { from }: { from?: 'cache' } = {} ) {
                    const prunedProps = prune( props )
                    if ( !Object.entries( prunedProps ).length ) return

                    const queryRef = query(
                        collectionRef,
                        ...Object.entries( props )
                            .filter( ( [ key, value ] ) => value != null )
                            .map( ( [ key, value ] ) => where( key, '==', value ) ),
                        limit( 1 )
                    ).withConverter<DocData>( converter )

                    const querySnapshot = await ( () => {
                        if ( from == 'cache' ) return getDocsFromCache( queryRef )
                        return getDocs( queryRef )
                    } )()

                    const [ doc ] = querySnapshot.docs

                    if ( querySnapshot.size ) return doc.data()
                    // if ( querySnapshot.size ) {
                    //     console.log( 'findDoc', prunedProps, doc.data() )
                    //     return doc.data()
                    // }

                    // console.log( 'findDoc', prunedProps, 'no data found' )
                },
                async setDoc ( id: string, newData: DocData ) {
                    const docRef = doc( collectionRef, id )
                    await setDoc( docRef, newData )
                    return newData
                },
                async deleteDoc ( id: string ) {
                    const docRef = doc( collectionRef, id )
                    return deleteDoc( docRef )
                },

                onSnapshot (
                    onNext: ( snapshot: QuerySnapshot<DocData> ) => void,
                    config: {
                        conditions?: QueryConstraint[]
                        limit?: number
                    }
                ) {
                    const queryRef = query<DocData>(
                        collectionRef,
                        ...config.conditions ?? [],
                        limit( config.limit ?? 1 )
                    ).withConverter<DocData>( converter )

                    return onSnapshot( queryRef, onNext )
                },

            }
        }
    }
}