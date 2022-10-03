import { makeDBRef } from '@weis-guys/freerstore'
import { pretty } from '@weis-guys/ts-utils'
import { useEffect } from 'react'
import { Lorem } from '../components/Lorem'
import { MainLayout } from '../layouts/MainLayout'

const doTheThing = async () => {
    const db = makeDBRef( 'test-db' )
    type DocData = {
        id: string
        username: string
    }
    const collection = db.collection<DocData>( 'test-collection' )

    // console.log( pretty( { db, collection } ) )

    const docRefs = [
        collection.doc( 'test-doc1' ),
        collection.doc( { id: 'test-doc2' } )
    ]

    await docRefs[ 0 ].set( {
        id: 'test-doc1',
        username: 'username1'
    } )

    docRefs.forEach( doc => {
        doc.get().then( data => {
            data?.id
            data?.username

            console.log( pretty( { doc, data } ) )
        } )
    } )
}

export default MainLayout( props => {

    useEffect( () => {
        doTheThing()
    }, [] )

    return <>
        {/* <Lorem /> */}
    </>
} )