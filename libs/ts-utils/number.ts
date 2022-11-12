import lodash from 'lodash'
import { NumberLike, is } from '@weis-guys/ts-utils'

export function makeNumber ( numberLike: NumberLike ): number {
    if ( typeof numberLike == 'bigint' ) return lodash.toNumber( Number( numberLike ) )
    return lodash.toNumber( numberLike )
}

export function toDollarsAndCents ( numberLike: NumberLike | undefined ): string | undefined {
    if ( !is.numberLike( numberLike ) ) return
    return Intl.NumberFormat( 'en-US', { currency: 'USD', style: 'currency' } )
        .format( makeNumber( numberLike ) )
}