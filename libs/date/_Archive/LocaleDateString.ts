import moment from 'moment'
import { is } from '@weis-guys/ts-utils'

export const dateStringSeparator = '/'
export type LocaleDateStringSeparator = typeof dateStringSeparator

export type LocaleDateString =
    `${ number }${ LocaleDateStringSeparator }${ number }${ LocaleDateStringSeparator }${ number }`

export function isLocaleDateString ( x: unknown ): x is LocaleDateString {
    if ( !is.string( x ) ) return false
    if ( x.split( dateStringSeparator ).length !== 3 ) return false
    return moment( x, 'M/D/Y', true ).isValid()
}