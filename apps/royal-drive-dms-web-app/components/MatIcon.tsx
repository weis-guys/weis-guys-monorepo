import { FC } from 'react'

export const MatIcon: FC<{ children?: string }> = ( { children } ) => <>{
    children && <span className='material-symbols-outlined'>{children}</span>
}</>