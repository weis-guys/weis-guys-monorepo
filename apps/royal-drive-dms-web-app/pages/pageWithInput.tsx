import { useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'

export default MainLayout( props => {
    const [ name, nameSet ] = useState( '' )

    return <>
        <h1>{props.pageTitle}</h1>

        <input
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={e => nameSet( e.target.value )}
        />

        Hello {name}
    </>
} )