import { joinTruthyValues } from '@weis-guys/ts-utils'
import { FC, MutableRefObject } from 'react'
import { MatIcon } from './MatIcon'

export const ToggleButton: FC<{
    active: boolean
    toggle: () => void
    matIcon?: string
    className?: string
    ref?: MutableRefObject<any>
}> = ( { active, toggle, matIcon, ref, ...props } ) => {
    return <button ref={ref} className={joinTruthyValues( [
        'btn matIcon',
        props.className,
        active ? 'active' : '',
    ] )} onClick={toggle}>
        <MatIcon>{matIcon}</MatIcon>
    </button>
}