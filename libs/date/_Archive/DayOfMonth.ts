import moment from 'moment'

export type DayOfMonth =
    | 1 | 2 | 3 | 4 | 5 | 6 | 7
    | 8 | 9 | 10 | 11 | 12 | 13
    | 14 | 15 | 16 | 17 | 18 | 19
    | 20 | 21 | 22 | 23 | 24 | 25
    | 26 | 27 | 28 | 29 | 30 | 31

export function isDayOfMonth ( x: unknown ): x is DayOfMonth {
    if ( typeof x !== 'number' ) return false
    return x > 0 && x <= 31
}

/**
 *  this is so that if you put in Feb 31st,
 *  it will give you the last day of Feb,
 *  instead of the default behavior to give you Mar 2nd or 3rd
 */
export function dateFromDayOfMonth (
    dayOfMonth: DayOfMonth,
    dateConstraint: Date = moment().toDate()
): Date {
    const year = dateConstraint.getFullYear()
    const monthIndex = dateConstraint.getMonth()

    console.log( monthIndex )
    console.log( moment( dateConstraint ).get( 'month' ) )

    const momentObj = moment( { year, month: monthIndex, date: 1 } )
    const adjustedDayOfMonth = Math.min( dayOfMonth, moment( momentObj ).daysInMonth() )
    return momentObj.date( adjustedDayOfMonth ).toDate()
}