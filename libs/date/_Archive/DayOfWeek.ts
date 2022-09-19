import moment from 'moment'

export const dateFromDayOfWeek = ( day: DayOfWeek ) => moment().day( day ).toDate()

export type DayOfWeek =
    | DayOfWeek.Full | DayOfWeek.Min | DayOfWeek.Short
    | Lowercase<DayOfWeek.Full | DayOfWeek.Min | DayOfWeek.Short>
export function isDayOfWeek ( x: unknown ): x is DayOfWeek {
    if ( typeof x !== 'string' ) return false
    return DayOfWeek.Full.isMatch( x ) || DayOfWeek.Min.isMatch( x ) || DayOfWeek.Short.isMatch( x )
}

export module DayOfWeek {
    export type Full = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
    export const full = moment.weekdays
    export module Full {
        export function isMatch ( x: unknown ): x is DayOfWeek.Full {
            if ( typeof x !== 'string' ) return false
            return !!DayOfWeek.full().find( day => day.match( new RegExp( x, 'i' ) ) )
        }
    }

    export type Short = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
    export const short = moment.weekdaysShort
    export module Short {
        export function isMatch ( x: unknown ): x is DayOfWeek.Short {
            if ( typeof x !== 'string' ) return false
            return !!DayOfWeek.short().find( day => day.match( new RegExp( x, 'i' ) ) )
        }
    }

    export type Min = 'Su' | 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa'
    export const min = moment.weekdaysMin
    export module Min {
        export function isMatch ( x: unknown ): x is DayOfWeek.Min {
            if ( typeof x !== 'string' ) return false
            return !!DayOfWeek.min().find( day => day.match( new RegExp( x, 'i' ) ) )
        }
    }
}