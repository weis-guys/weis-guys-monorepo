// import {
//     ColumnDef, createColumnHelper, getCoreRowModel,
//     useReactTable, flexRender, FilterFn,
//     getFilteredRowModel,
//     getSortedRowModel,
//     HeaderContext
// } from '@tanstack/react-table'
// import { findMatchingProps, makeNumber, nbsp, stringify, toDollarsAndCents } from '@weis-guys/ts-utils'
// import { Pretty } from '@weis-guys/ui'
// import { get, startCase } from 'lodash'
// import { useMemo, useState } from 'react'
// import { Car, cars } from '../sampleData/cars'

// import { createStore, useStore } from 'zustand'
// import { users, User } from '../sampleData/users'
// import { MainLayout } from '../layouts/MainLayout'

// const initialSearchTerm = ''
// // const initialSearchTerm = '_'
// // const initialSearchTerm = '15'
// // const initialSearchTerm = 'Romaguera-Crona'
// // const initialSearchTerm = 'c'
// // const initialSearchTerm = 'ca'
// // const initialSearchTerm = 'ford'
// // const initialSearchTerm = '6849814'
// const searchStore = createStore<{
//     search: string
//     setSearch: ( search: string ) => void
// }>(
//     set => ( {
//         search: initialSearchTerm,
//         setSearch: search => set( { search } ),
//     } )
// )

// const columnHelper = createColumnHelper<User>()

// function getHeader ( ctx: HeaderContext<User, any> ): string {
//     const [ lastPropKey ] = ctx.column.id.split( /[_.]/ ).slice( -1 )
//     return startCase( lastPropKey ).replace( ' ', nbsp.js )
// }

// const userTableColumnDefs: ColumnDef<User>[] = [
//     columnHelper.accessor( 'name', { header: getHeader } ),
//     columnHelper.accessor( 'username', { header: getHeader } ),
//     columnHelper.accessor( 'email', { header: getHeader } ),
//     columnHelper.accessor( 'phone', { header: getHeader } ),
//     columnHelper.accessor( 'website', { header: getHeader } ),
// ]

// const fuzzyFilter: FilterFn<any> = ( row, columnId, filterValue ) => {
//     const objString = stringify( row.original )
//     return objString.toLowerCase().includes( filterValue.toLowerCase() )
// }

// const useTable = () => {
//     const search = useStore( searchStore, x => x.search )
//     const setSearch = useStore( searchStore, x => x.setSearch )

//     const table = useReactTable( {
//         columns: useMemo( () => userTableColumnDefs, [] ),
//         data: useMemo( () => users, [] ),
//         globalFilterFn: fuzzyFilter,
//         state: {
//             sorting: [ { id: 'email', desc: true } ],
//             globalFilter: search,
//             columnVisibility: {
//                 Matched: !!search
//             },
//         },
//         getCoreRowModel: getCoreRowModel(),
//         onGlobalFilterChange: setSearch,
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//     } )

//     return { table, search, setSearch }
// }

// export default MainLayout( _props => {
//     const { table, search, setSearch } = useTable()

//     return <>
//         <input
//             type='text'
//             id='search'
//             placeholder='Search'
//             value={search}
//             autoComplete='off'
//             onChange={e => setSearch( e.target.value )}
//             style={{
//                 fontSize: '1.5rem',
//                 minWidth: '90%',
//             }} />

//         <table style={{
//             borderCollapse: 'collapse',
//             minWidth: '90%',
//         }}>

//             <thead>
//                 {table.getHeaderGroups().map( headerGroup => {
//                     // console.log( headerGroup )

//                     // if ( headerGroup.depth > 0 )
//                     return (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map( header => (
//                                 <th key={header.id}
//                                     colSpan={header.colSpan}
//                                     rowSpan={1}
//                                     style={{
//                                         border: '1px solid #a0afaf',
//                                         padding: 10,
//                                         backgroundColor: '#d0dfdf',
//                                         minWidth: 50,
//                                     }}>
//                                     {header.isPlaceholder ? null : flexRender(
//                                         header.column.columnDef.header,
//                                         header.getContext()
//                                     )}
//                                 </th>
//                             ) )}
//                         </tr>
//                     )
//                 } )}
//             </thead>

//             <tbody>
//                 {table.getRowModel().rows.map( row => (
//                     <tr key={row.id} >
//                         {row.getVisibleCells().map( cell => (
//                             <td key={cell.id} style={{
//                                 border: '1px solid #a0afaf',
//                                 padding: 10,
//                                 backgroundColor: '#d0dfdf',
//                                 minWidth: 50,
//                                 textAlign: 'center',
//                             }}>
//                                 {flexRender(
//                                     cell.column.columnDef.cell,
//                                     cell.getContext()
//                                 )}
//                             </td>
//                         ) )}
//                     </tr>
//                 ) )}
//             </tbody>

//         </table>
//     </>
// } )