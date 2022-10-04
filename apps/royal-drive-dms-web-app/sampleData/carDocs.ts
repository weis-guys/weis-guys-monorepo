import { CarDoc } from '@weis-guys/dms'

export const carDocs: CarDoc[] = [
    {
        id: '1B3EL46R75N668626',
        metadata: {
            modified: new Date( '2022-07-07T15:26:59.137Z' )
        },
        vin: '1B3EL46R75N668626',
        year: 2005,
        make: 'DODGE',
        model: 'STRATUS SXT',
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
    },
    {
        id: '5NPEB4AC8DH739853',
        metadata: {
            modified: new Date( 'July 7, 2022 at 10:26:59 AM UTC-5' )
        },
        vin: '5NPEB4AC8DH739853',
        year: 2013,
        make: 'HYUNDAI',
        model: 'SONATA',
        trim: 'GLS',
        acquisitions: [
            {
                lotNumber: '11092021',
                odometer: 147280,
                owner: 'Royal Drive',
                weblink: 'https://www.royaldriveautos.com/details/used-2013-hyundai-sonata/80911744',
                specs: {
                    bodyStyle: 'Sedan',
                    color: 'Silver',
                    drivetrain: 'FWD',
                },
                expenses: [
                    {
                        type: 'Detail',
                        company: 'Shiner',
                        date: new Date( 1637042400000 ),
                        price: 145
                    },
                    {
                        type: 'DMV',
                        company: 'Shiner',
                        date: new Date( 1638252000000 ),
                        price: 566.18
                    },
                ],
                sale: {
                    gross: 7821.68,
                    price: 6995,
                    from: 'Facebook',
                    date: new Date( 1638165600000 )
                },
                title: {
                    status: 'Clean',
                    location: 'At the lot',
                    number: '18669451-1',
                },
                notes: 'plates sent 12/3',
                listing: {
                    date: new Date( 1637128800000 ),
                    price: 6995,
                },
                acquired: {
                    state: 'SD',
                    price: 4200,
                    from: 'Trade-In',
                    date: new Date( 1636437600000 )
                },
                statusGroups: {
                    sale: {
                        id: 'listed',
                        date: new Date( 1638467101000 ),
                    },
                    work: {
                        id: 'unassigned',
                        date: new Date( 1638467101000 ),
                    },
                }
            }
        ]
    },
]