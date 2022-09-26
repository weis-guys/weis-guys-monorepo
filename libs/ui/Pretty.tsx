import { FC, useEffect, useState } from 'react'
import YAML from 'yaml'

export const Pretty: FC<{
    data?: {},
    children?: {},
    indent?: number,
}> = props => {
    const [ data, setData ] = useState<any>()

    // this is only because of nextjs ssr
    useEffect( () => {
        setData( props.children ?? props.data )
    }, [ props.children ?? props.data ] )

    const prettyString = YAML.stringify( data, {
        indent: props.indent ?? 4,
    } )

    return <pre>{prettyString}</pre>
}