import {
    useReactTable, flexRender, getCoreRowModel,
    getSortedRowModel, TableOptions, getFilteredRowModel
} from '@tanstack/react-table'
import { stringify } from '@weis-guys/ts-utils'
import { Pretty } from '@weis-guys/ui'
import { useMemo, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { users } from '../sampleData/users'

export default MainLayout( _props => {
    const [ search, searchSet ] = useState( '' )
    const [ sortId, sortIdSet ] = useState( 'name' )
    const [ sortDesc, sortDescSet ] = useState( true )

    // console.log( { sortId, sortDesc } )

    const table = useReactTable(
        useMemo( (): TableOptions<any> => ( {
            columns: [
                // { header: 'index', cell: ctx => ctx.row.index },
                { accessorKey: 'id' },
                { accessorKey: 'name' },
                { accessorKey: 'username' },
                { accessorKey: 'email' },
            ],
            data: users,
            globalFilterFn: ( row, columnId, filterValue ) =>
                stringify( row.original ).toLowerCase().includes( filterValue.toLowerCase() ),
            state: {
                sorting: [ { id: sortId, desc: sortDesc } ],
                globalFilter: search,
                columnVisibility: {
                    Matched: !!search
                },
            },
            getCoreRowModel: getCoreRowModel(),
            onGlobalFilterChange: searchSet,
            getFilteredRowModel: getFilteredRowModel(),
            getSortedRowModel: getSortedRowModel(),
        } ), [ search, sortId, sortDesc ] )
    )

    const changeSorting = ( newSortingId: string ) => {
        if ( newSortingId === sortId ) {
            sortDescSet( sortDesc => !sortDesc )
        } else {
            sortIdSet( newSortingId )
            sortDescSet( true )
        }
    }

    return <>
        <input
            type='text'
            id='search'
            placeholder='Search'
            value={search}
            autoComplete='off'
            onChange={e => searchSet( e.target.value )}
        />

        <Pretty spaces={0}>{[ sortId, sortDesc ]}</Pretty>
        <fieldset>
            <legend>Sorting Id:</legend>
            <div>
                <label >
                    <input
                        type="radio"
                        name="sortingId"
                        value="id"
                        checked={sortId == "id"}
                        onClick={e => changeSorting( "id" )}
                        onChange={() => { }}
                    />
                    id
                </label>
            </div>
            <div>
                <label >
                    <input
                        type="radio"
                        name="sortingId"
                        value="name"
                        checked={sortId == "name"}
                        onClick={e => changeSorting( "name" )}
                        onChange={() => { }}
                    />
                    Name
                </label>
            </div>
            <div>
                <label >
                    <input
                        type="radio"
                        name="sortingId"
                        value="username"
                        checked={sortId == "username"}
                        onClick={e => changeSorting( "username" )}
                        onChange={() => { }}
                    />
                    Username
                </label>
            </div>
            <div>
                <label >
                    <input
                        type="radio"
                        name="sortingId"
                        value="email"
                        checked={sortId == "email"}
                        onClick={e => changeSorting( "email" )}
                        onChange={() => { }}
                    />
                    Email
                </label>
            </div>
        </fieldset>


        <table>
            <thead>
                {table.getHeaderGroups().map( headerGroup =>
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map( header =>
                            <th key={header.id}>
                                {header.isPlaceholder ? null : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        )}
                    </tr>
                )}
            </thead>
            <tbody>
                {table.getRowModel().rows.map( row => (
                    <tr key={row.id} >
                        {row.getVisibleCells().map( cell => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ) )}
                    </tr>
                ) )}
            </tbody>
        </table>
    </>
} )