import { Replacer } from '@weis-guys/ts-utils'

export const makeCircularReplacer = (): Replacer => {
    const seen = new WeakSet()
    return ( key, value ) => {
        if ( typeof value === 'object' && value !== null ) {
            if ( seen.has( value ) ) return
            seen.add( value )
        }
        return value
    }
}