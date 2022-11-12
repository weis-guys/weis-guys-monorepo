import lodash from 'lodash'
import { AnyObj, colorize } from '@weis-guys/ts-utils'

export const findMatchingProps = ( obj: AnyObj, searchValue: string ): AnyObj => {
    const paths = findMatchingPaths( obj, searchValue )
    return Object.fromEntries(
        paths.map( path => [ lodash.startCase( path ), lodash.get( obj, path ) ] )
    )
}

const findMatchingPaths = ( obj: AnyObj, searchValue: string ): string[] => {
    return Object.entries( obj )
        .map( ( [ key, value ] ) => {
            if ( lodash.isObject( value ) ) {
                const [ nextKey ] = findMatchingPaths( value, searchValue )
                if ( nextKey ) return [ key, nextKey ].filter( Boolean ).join( '.' )
            }

            if ( value && `${ value }`.match( new RegExp( searchValue, 'gi' ) ) ) {
                return key
            }
        } )
        .filter( Boolean ) as string[]
}

// test()
function test () {
    const cars = [
        {
            vin: '1G1ZC5E0XGF123456',
            lotNumber: '1658498136',
            make: 'Chevrolet',
            model: 'Camaro',
            year: 2016,
            prices: [
                -200.02,
                15,
                859846.4684984,
                NaN,
            ],
        },
        {
            vin: '1G1ZC5E0XGF123456',
            lotNumber: '1658498136',
            make: 'Camaro',
            model: 'Camaro',
            year: 2016,
            foo: {
                bar: {
                    baz: {
                        qux: 'Camaro',
                    }
                }
            }
        },
        {
            vin: '1G1ZC5E0XGF123457',
            lotNumber: '1684981435',
            make: 'Toyota',
            model: 'Camry',
            year: 2018,
            price: 24015616510n,
        },
        {
            vin: '1G1ZC5E0XGF123458',
            lotNumber: '1658498137',
            make: 'Ford',
            model: 'Mustang',
            year: 2017,
        },
    ]

    console.group( 'findMatchingProps' )
    cars.forEach( car => {
        const paths = findMatchingPaths( car, 'Ca' )
        paths.forEach( path => {
            console.log(
                colorize( 'green' )( path ),
                lodash.get( car, path )
            )
        } )
    } )
    console.groupEnd()
}