import { useMutation, useQuery } from '@tanstack/react-query'
import { CarDoc } from '@weis-guys/dms'
import { AnyObj, pretty, stringify, wait } from '@weis-guys/ts-utils'
import { Pretty } from '@weis-guys/ui'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { db } from '../lib/db'
import { Temporal } from '@js-temporal/polyfill'
import { queryClient } from './_app'
import { omit, pick, pickBy } from 'lodash'

// http://localhost:3000/car-details?vin=1B3EL46R75N668626

// export default MainLayout<{ car: CarDoc }>( props => {
export default MainLayout( props => {
    const { query: queryParams } = useRouter()

    const vin = Array.isArray( queryParams.vin )
        ? stringify( queryParams.vin )
        : queryParams.vin

    const queryKey = [ 'car', vin ]

    // channel?VER

    const { data: car, ...getCarQuery } = useQuery<CarDoc | undefined>( queryKey, async () => {
        console.log( 'queryFn' )
        // const carsCollection = await db.getCollection<CarDoc>( 'cars' )
        // const car = await carsCollection.find1( { vin } )
        // if ( !car ) console.log( 'car data not found' )
        // return car
        // return wait( 3000, () => undefined )
        return wait( 99999999999999999, () => undefined )
    }, {
        // initialData: () => {
        //     console.log( 'initialData' )
        //     return wait( 1000, () => undefined ) as any
        // },
        placeholderData: () => {
            if ( queryKey.every( Boolean ) )
                return loadFromStorage( stringify( queryKey ) )

            return undefined
        },
        // TODO come up with better way to handle realtime updates from other users
        staleTime: Temporal.Duration.from( { seconds: 30 } ).total( 'milliseconds' ),
        onSuccess: data => saveToStorage( stringify( queryKey ), data ),
        onError ( err ) {
            console.error( err )
        },
    } )

    const setCarMutation = useMutation( async ( newData: AnyObj ) => {
        if ( !car ) return
        if ( 'test' in car ) newData = omit( newData, 'test' )

        const carsCollection = await db.getCollection( 'cars' )
        const newCar = await carsCollection.set( car.id, newData )
        return newCar
        // return wait( 1000, () => newCar )
    }, {
        onMutate: async newData => {
            await queryClient.cancelQueries( queryKey )
            const oldData = queryClient.getQueryData( queryKey )
            queryClient.setQueryData( queryKey, newData )
            return { oldData, newData }
        },
        onError: ( err, newData, context ) => {
            // TODO make better alert system
            alert( err )
            queryClient.setQueryData( queryKey, context?.oldData )
        },
        onSuccess ( data, variables, context ) {
            queryClient.invalidateQueries( queryKey )
        },
    } )

    const deleteCarMutation = useMutation( async () => {
        if ( !car ) return

        const carsCollection = await db.getCollection( 'cars' )
        return carsCollection.delete( car.id )
        // return wait( 1000, () => newCar )
    }, {
        onMutate: async newData => {
            // await queryClient.cancelQueries( queryKey )
            // const oldData = queryClient.getQueryData( queryKey )
            // queryClient.setQueryData( queryKey, newData )
            // return { oldData, newData }
        },
        onError: ( err, newData, context ) => {
            // // TODO make better alert system
            // alert( err )
            // queryClient.setQueryData( queryKey, context?.oldData )
        },
        onSuccess ( data, variables, context ) {
            // queryClient.invalidateQueries( queryKey )
        },
    } )

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
    }}>
        <h1>{props.pageTitle}</h1>
        <p>Not ready yet</p>

        <br />
        <p>VIN: {vin}</p>

        <br />
        {/* <Pretty>{{ 
            isStale: getCarQuery.isStale,
            isPlaceholderData: getCarQuery.isPlaceholderData,
         }}</Pretty> */}
        <Pretty>{pick( getCarQuery, 'isStale', 'isPlaceholderData' )}</Pretty>

        <br />
        <button
            className='btn primary'
            onClick={() => setCarMutation.mutate( car ?? {} )}>
            {/* onClick={() => setCarMutation.mutate( { test: 'test', ...car } )}> */}
            setCarMutation
        </button>

        <br />
        <button
            className='btn bright-red'
            onClick={() => deleteCarMutation.mutate()}>
            deleteCarMutation
        </button>

        <br />
        {car ? <Pretty>{car}</Pretty> : <p>car data not found</p>}
    </div>
} )

const saveToStorage = ( key: string, data: any ) => {
    if ( typeof window !== 'undefined' ) {
        // console.log( 'writeToStorage', key )
        localStorage.setItem( key, stringify( data ) )
    }
}

const loadFromStorage = ( key: string ) => {
    if ( typeof window !== 'undefined' ) {
        // console.log( 'loadFromStorage', key )
        return JSON.parse( localStorage.getItem( key ) ?? 'null' )
    }
}