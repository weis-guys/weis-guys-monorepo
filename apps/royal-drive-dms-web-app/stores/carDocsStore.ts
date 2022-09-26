import { Car, CarDoc } from '@weis-guys/dms'
import { FieldPath, where } from 'firebase/firestore'
import { createStore, useStore } from 'zustand'
import { DB } from '../constants/DB'

export const useCarDocs = () => useStore( carDocsStore, x => x.carDocs )

export const carDocsStore = createStore<{
    carDocs: Record<string, CarDoc>
    add: ( carDocs: CarDoc[] ) => void
}>(
    set => ( {
        carDocs: {},
        add: carDocs => set( state => {
            carDocs.forEach( carDoc => {
                state.carDocs[ carDoc.id ] = carDoc
            } )
            console.log( { state } )

            return {
                ...state,

            }
        } ),
    } )
)

if ( typeof window !== 'undefined' ) {
    DB.getCollection<CarDoc>( 'cars' ).onSnapshot( snapshot => {
        // snapshot.docs.map( doc => doc.data()?.acquisitions?.[ 0 ].sale?.date )
        const carDocs = snapshot.docs.map( doc => doc.data() )
        // console.log( { carDocs } )
        carDocsStore.getState().add( carDocs )
    }, {
        // limit: 100,
        limit: 5,
        conditions: [
            // where( 'metadata.modified', '<', new Date() ),
            where( 'metadata.modified', '>', new Date( '08/01/22' ) ),
            // where( 'acquisitions', 'array-contains-any', [ 0 ] ),
            // where( 'acquisitions', '!=', null ),
            // where( new FieldPath( 'acquisitions', '0', 'sale', 'date' ), '>', '' ),
            // where( new FieldPath( 'acquisitions', '0', 'sale', 'date' ), '>', new Date( 0 ) ),
            // where( new FieldPath('acquisitions.0.sale.date'), '>', new Date( 0 ) ),
            // where( 'vin', '==', '19UDE2F39HA012042' ),
            // where( 'vin', '==', '19UUA56873A084343' ),
            // where( 'vin', '==', '19XFB2F57DE049485' ),
        ],
    } )
}