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

export const cars: SampleCar[] = [
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