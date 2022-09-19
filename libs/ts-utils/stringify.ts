import { makeCircularReplacer } from './CircularReplacer'
import { Replacer } from './Replacer'

export const stringify = x => JSON.stringify( x, stringifyReplacer() )

export const stringifyReplacer = (): Replacer => {
    const replacers: Replacer[] = [
        makeCircularReplacer(),
        bigIntReplacer,
        // replacerLogger,
    ]
    return ( key, value ) => {
        return replacers.reduce( ( value, replacer ) => replacer( key, value ), value )
    }
}

const bigIntReplacer: Replacer = ( key, value ) => {
    if ( typeof value === 'bigint' ) return `${ value }n`
    return value
}

const replacerLogger: Replacer = ( key, value ) => {
    console.log( [ key, value ] )
    return value
}