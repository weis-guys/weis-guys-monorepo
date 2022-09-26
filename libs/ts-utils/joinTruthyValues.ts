import { is, nbsp } from '@weis-guys/ts-utils'

export function joinTruthyValues ( array: any[], separatorOrSpaces: string | number = ' ' ) {
    if ( is.number( separatorOrSpaces ) )
        return array.filter( Boolean ).join( nbsp.js.repeat( separatorOrSpaces ) )

    if ( is.string( separatorOrSpaces ) )
        return array.filter( Boolean ).join( separatorOrSpaces )
}