I'm getting this same issue too.

### package.json
```ts
"dependencies": {
    "@tanstack/react-table": "^8.5.13",
},
```

### user-list.tsx
```tsx
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table'
import { useMemo, useState } from 'react'

export default function UserListPage () {
    const [ search, setSearch ] = useState( 'april.biz' )

    console.log( search )

    const table = useReactTable<any>( {
        columns: useMemo( () => [
            { header: 'index', cell: ctx => ctx.row.index },
            { accessorKey: 'name' },
            { accessorKey: 'username' },
            { accessorKey: 'email' },
        ], [] ),
        data: useMemo( () => [
            {
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
            },
            {
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",
            }
        ], [] ),
        state: {
            sorting: [ { id: 'name', desc: false } ],
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    } )

    return <>
        <input
            type='text'
            id='search'
            placeholder='Search'
            value={search}
            autoComplete='off'
            onChange={e => setSearch( e.target.value )}
        />

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
}
```
