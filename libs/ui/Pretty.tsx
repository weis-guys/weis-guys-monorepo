import { FC, useEffect, useState } from 'react'
import { pretty } from '@weis-guys/ts-utils'

export const Pretty: FC<{
    data?: {},
    children?: {},
    spaces?: number | string,
}> = props => {
    const [ data, setData ] = useState<any>()

    // this is only because of nextjs ssr
    useEffect( () => {
        setData( props.children ?? props.data )
    }, [ props.children ?? props.data ] )

    return <pre>{pretty( data, { spaces: props.spaces } )}</pre>
}