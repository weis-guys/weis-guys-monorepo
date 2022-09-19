import { FC } from 'react'

export const ToggleButton: FC<{
    active: boolean
    toggle: () => void
    icon?: string
}> = ( { active, toggle, icon } ) => {

    const className = [
        'menuButton btn primary icon',
        active ? 'active' : '',
    ].filter( Boolean ).join( ' ' )

    return <button className={className} onClick={toggle}>
        <span className='material-symbols-outlined'>{icon}</span>
    </button>
}