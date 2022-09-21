import { FC, MutableRefObject } from 'react'
import { combineClassNames } from '../lib/combineClassNames'
import { MatIcon } from './MatIcon'

export const ToggleButton: FC<{
    active: boolean
    toggle: () => void
    matIcon?: string
    className?: string
    ref?: MutableRefObject<any>
}> = ( { active, toggle, matIcon, ref, ...props } ) => {
    return <button ref={ref} className={combineClassNames( [
        'btn primary matIcon',
        props.className,
        active ? 'active' : '',
    ] )} onClick={toggle}>
        <MatIcon>{matIcon}</MatIcon>
    </button>
}