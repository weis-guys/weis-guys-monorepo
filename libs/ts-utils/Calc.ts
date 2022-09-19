import { is } from './is'
import { PureFn, MapTupleOptional } from './types'

export const makeCalc = <Fn extends PureFn> ( fn: Fn ) =>
    ( ...args: MapTupleOptional<Parameters<Fn>> ): ReturnType<Fn> | undefined => {
        if ( args.every( is.defined ) )
            return fn( ...Object.values( args ) )
    }

export const makeNumberCalc = <Fn extends PureFn<number>> ( fn: Fn ) => makeCalc( fn )

/**
 * = minuend - subtrahend
 */
export const subtractionCalc = makeNumberCalc( ( minuend, subtrahend ) => minuend - subtrahend )

/**
 * = dividend / divisor
 */
export const divisionCalc = makeNumberCalc( ( dividend, divisor ) => dividend / divisor )