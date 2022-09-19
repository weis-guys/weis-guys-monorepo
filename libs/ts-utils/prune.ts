import { AnyArray, AnyObj, is } from '.'
import { isNil, negate, omitBy } from 'lodash'

/**
 * removes all nullish values from an object or array
 */
export const prune = <T> ( x: T ) => {
    if ( Array.isArray( x ) ) return pruneArray( x )
    if ( is.plainObject( x ) ) return prunePlainObj( x )
    if ( is.classInstance( x ) ) return pruneClassInstance( x )
    return x
}

function pruneArray<T extends AnyArray> ( array: T ): T {
    return array.filter( negate( isNil ) ) as T
}

function prunePlainObj<T extends AnyObj> ( obj: T ): T {
    return omitBy( obj, isNil ) as T
}

function pruneClassInstance<T extends AnyObj> ( instance: T ): T {
    Object.keys( instance )
        .filter( key => isNil( instance[ key ] ) )
        .forEach( key => delete instance[ key ] )
    return instance
}