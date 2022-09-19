import { toNumber } from 'lodash'
import { is } from './is'
import { NumberLike } from './types'

export function makeNumber ( numberLike: NumberLike ): number {
    if ( typeof numberLike == 'bigint' ) return toNumber( Number( numberLike ) )
    return toNumber( numberLike )
}

export function toDollarsAndCents ( numberLike: NumberLike | undefined ): string | undefined {
    if ( !is.numberLike( numberLike ) ) return
    return Intl.NumberFormat( 'en-US', { currency: 'USD', style: 'currency' } )
        .format( makeNumber( numberLike ) )
}