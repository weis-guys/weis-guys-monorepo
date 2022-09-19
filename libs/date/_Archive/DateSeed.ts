import { savable, Savable } from '@weis-guys/ts-db-utils'
import { finalize, is, pretty } from '@weis-guys/ts-utils'
import { dateFromDayOfMonth, DayOfMonth, isDayOfMonth } from './DayOfMonth'
import { dateFromDayOfWeek, DayOfWeek, isDayOfWeek } from './DayOfWeek'
import { PlainDate, makePlainDate } from './PlainDate'
import { ISODateString, isISODateString } from './ISODateString'
import { LocaleDateString } from './LocaleDateString'

export type DateSeedData =
    | Date
    | ISODateString
    | LocaleDateString
    | DayOfWeek
    | DayOfMonth

export type DateSeed = Savable<{
    readonly date?: PlainDate
    readonly data?: DateSeedData
}>

export function makeDateSeed ( data: DateSeedData | undefined ): DateSeed {
    let date: DateSeed[ 'date' ]

    if ( isDayOfWeek( data ) ) {
        date = makePlainDate( dateFromDayOfWeek( data ) )

    } else if ( isDayOfMonth( data ) ) {
        date = makePlainDate( dateFromDayOfMonth( data ) )

    } else if ( isISODateString( data ) ) {
        date = makePlainDate( data )

    } else if ( is.date( data ) ) {
        date = makePlainDate( data )
    }

    console.log( pretty( date ) )

    return finalize( {
        ...savable( data as any ),
        data,
        date,
    } )
}

// console.log( makeDateOnly )
// console.log( pretty )
// console.log( pretty( makeDateOnly( new Date ) ) )
// console.log( pretty( new Date ) )
// console.log( pretty( () => { } ) )
// console.log( pretty( { fn: () => { } } ) )
// console.log( pretty( { date: new Date } ) )


