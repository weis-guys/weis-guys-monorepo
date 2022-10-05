import { CarDoc } from '@weis-guys/dms'
import { makeCacheRef } from '@weis-guys/freerstore'
import { Pretty } from '@weis-guys/ui'
import { useEffect } from 'react'
import { Lorem } from '../components/Lorem'
import { MainLayout } from '../layouts/MainLayout'
import { carDocs } from '../sampleData/carDocs'

const cache = makeCacheRef( 'dms2' )
const carsCollection = cache.collection<CarDoc>( 'cars' )

const fillCache = async () => {
    const cars = await carsCollection.findMany()
    if ( cars.length ) return

    console.info( 'filled Cache with sampleData/carDocs' )
    carDocs.forEach( doc => carsCollection.doc( doc.id ).setData( doc ) )
}

const doTheThing = async () => {
    await fillCache()

    const cachedCarDocs = await carsCollection.findMany()
    console.log(
        cachedCarDocs[ 0 ]?.id,
    )

    console.log(
        await carsCollection.query( ( { data } ) => data?.make === 'HYUNDAI' )
    )

    console.log(
        await carsCollection.query( ( { key } ) => !!key?.match( /5NPEB4A/ig ) )
    )

    console.log(
        await carsCollection.findOne( {
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