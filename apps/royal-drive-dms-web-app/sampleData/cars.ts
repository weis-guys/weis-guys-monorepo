import { NumberLike } from '@weis-guys/ts-utils'

export type Car = Partial<{
    vin: string
    lotNumber: string
    make: string
    model: string
    year: number
    prices?: NumberLike[]
    price?: NumberLike
}>

export const cars: Car[] = [
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

// const carTableColumnDefs: ColumnDef<Car>[] = [
//     columnHelper.group( {
//         id: 'group',
//         columns: [
//             columnHelper.display( {
//                 header: '#',
//                 cell: x => x.row.index,
//             } ),
//             columnHelper.accessor( 'vin', { header: 'VIN' } ),
//             columnHelper.accessor( 'lotNumber', { header: 'Lot #' } ),
//             columnHelper.accessor( 'make', { header: x => startCase( x.column.id ) } ),
//             columnHelper.accessor( 'model', { header: x => startCase( x.column.id ) } ),
//             columnHelper.accessor( 'year', { header: x => startCase( x.column.id ) } ),
//             columnHelper.accessor( 'price', {
//                 header: 'Price',
//                 cell: props => {
//                     const price = props.cell.getValue() as Car[ 'price' ]
//                     return <span style={{ color: price ?? 0 < 0 ? 'red' : undefined }}>
//                         {toDollarsAndCents( price )}
//                     </span>
//                 },
//             } ),
//             columnHelper.accessor( 'prices', {
//                 header: 'Prices',
//                 cell: props => {
//                     const prices = props.cell.getValue() as Car[ 'prices' ]
//                     return prices?.map( numberLike => {
//                         const number = makeNumber( numberLike )
//                         return <div
//                             key={number}
//                             style={{ color: number < 0 ? 'red' : undefined }}>
//                             {toDollarsAndCents( number )}
//                         </div>
//                     } )
//                 },
//             } ),

//             columnHelper.display( {
//                 header: 'Matched',
//                 cell: x => {
//                     const { search } = searchStore.getState()

//                     if ( search ) {
//                         const obj = x.row.original
//                         const props = findMatchingProps( obj, search )
//                         return <>
//                             {Array.from( props ).map( ( [ key, value ] ) =>
//                                 <div key={key}>{key}: {value}</div>
//                             )}
//                         </>
//                     }
//                 },
//             } ),
//         ],
//     } ),
// ]