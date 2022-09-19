import moment from 'moment'
import { is } from '@weis-guys/ts-utils'
import { LocaleDateString, isLocaleDateString } from './LocaleDateString'

const isoDateStringFormat = 'YYYY-MM-DD'
export const isoDateStringSeparator = '-'
export type ISODateStringSeparator = typeof isoDateStringSeparator
export type ISODateString = `${ number }${ ISODateStringSeparator }${ number }${ ISODateStringSeparator }${ number }`
export function isISODateString ( x: unknown ): x is ISODateString {
    if ( !is.string( x ) ) return false
    if ( x.split( isoDateStringSeparator ).length !== 3 ) return false
    return moment( x, isoDateStringFormat, true ).isValid()
}

export type ISODateStringData = ISODateString | LocaleDateString | Date
export function makeISODateString ( data: ISODateStringData | undefined ): ISODateString | undefined {
    if ( !data ) return

    if ( isISODateString( data ) )
        data = moment( data, true ).toDate()

    if ( isLocaleDateString( data ) )
        data = new Date( data )

    if ( is.date( data ) ) {
        const momentObj = moment( data, true ).startOf( 'day' )
        if ( !momentObj.isValid() ) return
        return momentObj.format( isoDateStringFormat ) as ISODateString
    }
}