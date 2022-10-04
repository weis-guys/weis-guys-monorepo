import { is } from '@weis-guys/ts-utils'
import { FC, useEffect, useState } from 'react'
import YAML from 'yaml'

type Data = {} | Promise<{}>

export const Pretty: FC<{
    data?: Data,
    children?: Data,
    indent?: number,
    type?: 'yaml' | 'json',
}> = ( { type = 'json', ...props } ) => {
    const [ data, setData ] = useState<Data>()

    // this is only because of nextjs ssr
    useEffect( () => {
        const data = props.children ?? props.data
        if ( is.promise( data ) ) data.then( setData )
        setData( data )
    }, [ props.children ?? props.data ] )

    const prettyString = type == 'yaml'
        ? YAML.stringify( data, { indent: props.indent ?? 4 } )
        : JSON.stringify( data, null, props.indent ?? 4 )

    return <pre>{prettyString}</pre>
}