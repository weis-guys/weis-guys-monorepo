import { colorize, makeCircularReplacer } from '@weis-guys/ts-utils'
import { Replacer } from '@weis-guys/ts-utils'

export const stringify = x => JSON.stringify( x, stringifyReplacer() )

export const stringifyReplacer = (): Replacer => {
    const replacers: Replacer[] = [
        makeCircularReplacer(),
        fnReplacer,
        bigIntReplacer,
        // replacerLogger,
    ]
    return ( key, value ) => {
        return replacers.reduce( ( value, replacer ) => replacer( key, value ), value )
    }
}

const fnReplacer: Replacer = ( key, value ) => {
    if ( typeof value === 'function' ) {
        const fn = ( value as Function )
        if ( fn.name ) return `[Function: ${ fn.name }]`

        return `[Function: ${ fn.toString()
            .split( '\n' )
            .slice( 0, 3 )
            .join( '\n' )
            .replaceAll( '\n', ' ' )
            .replaceAll( '  ', '' ) }]`
    }
    return value
}

const bigIntReplacer: Replacer = ( key, value ) => {
    if ( typeof value === 'bigint' ) return `${ value }n`
    return value
}

const replacerLogger: Replacer = ( key, value ) => {
    console.log( [ key, value ] )
    return value
}