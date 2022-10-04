import { CarDoc } from '@weis-guys/dms'
import { makeDBRef } from '@weis-guys/freerstore'
import { Pretty } from '@weis-guys/ui'
import { useEffect } from 'react'
import { Lorem } from '../components/Lorem'
import { MainLayout } from '../layouts/MainLayout'
import { carDocs } from '../sampleData/carDocs'

const db = makeDBRef( 'dms2' )
const carsCollection = db.collection<CarDoc>( 'cars' )

const populateLocalDB = async () => {
    const cars = await carsCollection.findMany()
    if ( cars.length ) return

    console.info( 'populated LocalDB with sampleData/carDocs' )
    carDocs.forEach( doc => carsCollection.doc( doc.id ).set( doc ) )
}

const doTheThing = async () => {
    await populateLocalDB()

    // console.log(
    //     await carsCollection.findMany()
    // )

    console.log(
        await carsCollection.find( {
            year: 2005,
        } )
    )

    return carsCollection.findMany()
}

export default MainLayout( props => {
    // useEffect( () => {
    //     doTheThing().then
    // }, [] )

    return <>
        <Pretty type='yaml'>{doTheThing()}</Pretty>
        {/* <Lorem /> */}
    </>
} )