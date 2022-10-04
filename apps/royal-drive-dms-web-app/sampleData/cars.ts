import { Car, CarDoc } from '@weis-guys/dms'
import { NumberLike } from '@weis-guys/ts-utils'

export type SampleCar = {
    vin?: string
    lotNumber?: string
    year?: NumberLike
    make?: string
    model?: string
    trim?: string
    odometer?: NumberLike
    color?: string
    status?: string
}

export const sampleCars: SampleCar[] = [
    {
        vin: '1FTNE14W18DB27128',
        lotNumber: '9152022',
        year: 2008,
        make: 'FORD',
        model: 'E150 ECONOLINE',
        trim: 'CARGO',
        odometer: 20080,
        color: 'White',
        status: 'detailing',
    },
    {
        vin: '1C4NJDBB3HD133672',
        lotNumber: '56206002',
        year: 2017,
        make: 'JEEP',
        model: 'COMPASS',
        trim: 'SPORT',
        odometer: 68232,
        color: 'Black',
        status: 'in-transit',
    },
    {
        vin: '5XXGT4L39JG272307',
        lotNumber: '33939481',
        year: 2018,
        make: 'KIA',
        model: 'OPTIMA',
        trim: 'LX',
        odometer: 69024,
        color: 'Blue',
        status: 'offsite-repairs',
    },
    {
        vin: '1VWBN7A39DC007056',
        lotNumber: '33611653',
        year: 2013,
        make: 'VOLKSWAGEN',
        model: 'PASSAT',
        trim: 'TDI SE',
        odometer: 80880,
        color: 'Black',
        status: 'unassigned',
    },
    {
        vin: 'JF2SJGDC1GH456637',
        lotNumber: '',
        year: 2016,
        make: 'SUBARU',
        model: 'FORESTER',
        trim: '2.0XT PREMIUM',
        odometer: 67787,
        color: 'Silver',
        status: 'onsite-repairs',
    },
]

export const carDocs: CarDoc[] = [
    {
        id: '1B3EL46R75N668626',
        metadata: {
            modified: new Date( '2022-07-07T15:26:59.137Z' )
        },
        model: 'STRATUS SXT',
        vin: '1B3EL46R75N668626',
        year: 2005,
        make: 'DODGE',
        acquisitions: [
            {
                odometer: 139698,
                expenses: [
                    {
                        type: 'Transport',
                        price: 80
                    },
                    {
                        price: 20,
                        type: 'Use Tax'
                    }
                ],
                damages: [
                    'Hail'
                ],
                sale: {
                    gross: 200,
                    from: 'Wholesale',
                    date: new Date( '2018-07-13T05:00:00.000Z' )
                },
                title: {
                    status: 'Clean'
                },
                notes: 'Vehicle not inspected prior to purchase',
                listing: {
                    date: new Date( '2018-06-28T05:00:00.000Z' )
                },
                acquired: {
                    state: 'MN',
                    price: 360,
                    from: 'Copart',
                    date: new Date( '2018-06-19T05:00:00.000Z' )
                }
            }
        ]
    }
]