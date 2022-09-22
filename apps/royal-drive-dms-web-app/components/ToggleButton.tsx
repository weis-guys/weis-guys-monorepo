import { FC, MutableRefObject } from 'react'
import { joinTruthyValues } from '../lib/joinTruthyValues'
import { MatIcon } from './MatIcon'

export const ToggleButton: FC<{
    active: boolean
    toggle: () => void
    matIcon?: string
    className?: string
    ref?: MutableRefObject<any>
}> = ( { active, toggle, matIcon, ref, ...props } ) => {
    return <button ref={ref} className={joinTruthyValues( [
        'btn primary matIcon',
        props.className,
        active ? 'active' : '',
    ] )} onClick={toggle}>
        <MatIcon>{matIcon}</MatIcon>
    </button>
}