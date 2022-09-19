import { useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'

export default MainLayout( _props => {
    const [ name, nameSet ] = useState( '' )

    return <>
        <input
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={e => nameSet( e.target.value )}
        />

        Hello {name}
    </>
} )