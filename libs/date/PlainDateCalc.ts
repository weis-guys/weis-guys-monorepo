import { PureFn, makeCalc, MapTupleValues } from '@weis-guys/ts-utils'
import { makePlainDate, PlainDate } from './PlainDate'

export const makePlainDateCalc = <Fn extends PureFn<PlainDate>> ( fn: Fn ) =>
    ( ...args: MapTupleValues<Parameters<Fn>, PlainDate.Params> ): ReturnType<Fn> | undefined =>
        makeCalc<PureFn<PlainDate>>( fn )( ...Object.values( args ).map( makePlainDate ) )

export const durationCalc = makePlainDateCalc( ( start, end ) => start.until( end ) )

// test()
function test () {
    durationCalc( '2020-01-01', '2020-01-02' )
}