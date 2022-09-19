import { Temporal } from '@js-temporal/polyfill'

export const plainDateStringFormat = 'YYYY-MM-DD'
export const plainDateStringSeparator = '-'
type Separator = typeof plainDateStringSeparator
export type PlainDateStringSeparator = typeof plainDateStringSeparator
export type PlainDateString = `${ number }${ Separator }${ number }${ Separator }${ number }`

export type PlainDate = Temporal.PlainDate

export module PlainDate {
    export type Data = PlainDateString | 'now'
    export type Params = Parameters<typeof makePlainDate>[ number ]
}

export function makePlainDate (): undefined
export function makePlainDate ( x: PlainDate.Data ): PlainDate
export function makePlainDate ( x?: PlainDate.Data ): PlainDate | undefined
export function makePlainDate ( x?: PlainDate.Data ): PlainDate | undefined {
    if ( x == 'now' ) return Temporal.Now.plainDateISO()
    if ( x ) return Temporal.PlainDate.from( x as string )
}