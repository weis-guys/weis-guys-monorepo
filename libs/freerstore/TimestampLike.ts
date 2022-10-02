import { Timestamp } from 'firebase/firestore'
import { isObject } from 'lodash'

type TimestampLike = Pick<Timestamp, 'seconds' | 'nanoseconds'>
const isTimestampLike = ( x: unknown ): x is TimestampLike =>
    isObject( x ) && 'seconds' in x && 'nanoseconds' in x

export module TimestampLike {
    export const toTimestamp = ( timestampLike: TimestampLike ): Timestamp =>
        new Timestamp( timestampLike.seconds ?? 0, timestampLike.nanoseconds ?? 0 )

    export const toISO = ( value: any ) => {
        if ( isTimestampLike( value ) )
            return TimestampLike.toTimestamp( value ).toDate().toISOString()

        if ( isObject( value ) )
            return TimestampLikes.toISOs( value )

        return value
    }
}

module TimestampLikes {
    export const toISOs = <T extends Record<string, any> | any[]> ( obj: T ) => {
        if ( Array.isArray( obj ) ) return obj.map( TimestampLike.toISO )

        return Object.fromEntries(
            Object.entries( obj ).map( ( [ key, value ] ) => [
                key, TimestampLike.toISO( value )
            ] )
        ) as T
    }
}