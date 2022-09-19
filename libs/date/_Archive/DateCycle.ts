import { finalize } from '@weis-guys/ts-utils'
import { savable, Savable } from '@weis-guys/ts-db-utils'
import { DateFrequencyData } from './DateFrequency'
import { DateRange, DateRangeData, makeDateRange } from './DateRange'
import { DateSeed, DateSeedData, makeDateSeed } from './DateSeed'

export type DateCycleData = {
    readonly range?: DateRangeData
    readonly frequency?: DateFrequencyData
    readonly seed?: DateSeedData
}

export type DateCycle = Savable<{
    // readonly frequency?: DateFrequency
    readonly seed?: DateSeed
    readonly range?: DateRange
}>

export function makeDateCycle ( data: DateCycleData | undefined ): DateCycle {
    data = data ?? {}

    // const frequency = makeDateFrequency( data.frequency )
    const seed = makeDateSeed( data.seed )
    const range = makeDateRange( data.range )
    return finalize( savable( {
        // frequency,
        seed,
        range,
    } ) )
}






// import moment from 'moment'

// export class DateCycle {

//     static getDefaults ( data: DateCycle.Data = {} ) {
//         const today = new DateOnly
//         const frequency = new DateFrequency( data.frequency ?? 'monthly' )
//         const unit = frequency.unit ?? 'month'

//         const start = moment( today ).subtract( 3, unit ).toDate()
//         const end = moment( today ).add( 6, unit ).toDate()
//         const range = new DateRange( { start, end } )

//         const seed = new DateSeed( data.seed ?? start ?? today )
//         return new DateCycle( { frequency, range, seed } ) as Required<DateCycle>
//     }

//     getDates ( ...rangesData: ( DateRange.Data | undefined )[] ) { return DateCycle.getDates( this, ...rangesData ) }
//     getNextDate ( date: Date ) { return DateCycle.getNextDate( this, date ) }
//     addNextDate ( dates: Date[] ) { return DateCycle.addNextDate( this, dates ) }
//     getPreviousDate ( date: Date ) { return DateCycle.getPreviousDate( this, date ) }
//     getFirstDate () { return DateCycle.getFirstDate( this ) }

//     static getDates ( cycleData: DateCycle.Data, ...rangesData: ( DateRange.Data | undefined )[] ): Date[] {
//         const defaults = DateCycle.getDefaults( cycleData )
//         const range = DateRange.fromRanges( [ cycleData.range, ...rangesData ] ) ?? defaults.range
//         const cycle = new DateCycle( { ...cycleData, range } )

//         if ( !cycle?.range?.end ) throw new Error( 'DateCycle.getDates: missing end date' )

//         let date = DateCycle.getFirstDate( cycle )
//         let dates: Set<Date> = new Set( [ date ] )
//         while ( date && date.valueOf() <= cycle.range.end.valueOf() ) {
//             dates.add( date )
//             date = cycle.getNextDate( date )
//         }

//         return Array.from( dates )
//     }

//     static getFirstDate ( cycleData: DateCycle.Data ) {
//         const defaults = DateCycle.getDefaults( cycleData )
//         const cycle = new DateCycle( cycleData )

//         const { range } = cycle
//         const { start } = range ?? defaults.range
//         let { seed, frequency } = cycle
//         if ( !frequency ) frequency = defaults.frequency

//         if ( !start ) throw new Error( 'DateCycle.getFirstDate: missing start date' )

//         if ( !seed?.date ) seed = new DateSeed( start )
//         if ( !seed?.date ) throw new Error( 'DateCycle.getFirstDate: missing seed date' )

//         const ms = seed.date.valueOf() ?? start.valueOf()
//         const units = moment.duration( { ms } ).as( frequency.unit )
//         const cycles = units / frequency.amount
//         const cyclesRounded = NumberExt.roundUp( cycles ) ?? 1
//         const amountToSubtract = cyclesRounded * frequency.amount

//         const firstDate: Date = moment( seed.date ).subtract( amountToSubtract, frequency.unit ).toDate()

//         // TODO refactor to not need this part
//         if ( firstDate.valueOf() < start.valueOf() ) return cycle.getNextDate( firstDate )

//         return firstDate
//     }

//     static getNextDate ( cycleData: DateCycle.Data, date: Date ) {
//         return DateCycle.offsetDate( cycleData, date )
//     }

//     static addNextDate ( cycleData: DateCycle.Data, dates: Date[] ): Date[] {
//         const [ lastDate ] = dates.slice( -1 )
//         const nextDate = DateCycle.getNextDate( cycleData, lastDate )
//         return [ ...dates, nextDate ]
//     }

//     static getPreviousDate ( cycleData: DateCycle.Data, date: Date ) {
//         const { seed } = cycleData

//         if ( !cycleData.frequency ) throw new Error( 'DateCycle.getPreviousDate: missing frequency' )
//         const frequency = new DateFrequency( cycleData.frequency )

//         const amount = -1 * frequency.amount
//         return DateCycle.offsetDate( { frequency: { ...frequency, amount }, seed }, date )
//     }

//     private static offsetDate ( cycleData: DateCycle.Data, date: Date ): Date {
//         const defaults = DateCycle.getDefaults( cycleData )
//         const cycle = new DateCycle( cycleData )

//         let { frequency } = cycle
//         if ( !frequency ) frequency = defaults.frequency

//         const newDate = moment( date ).add( frequency.amount, frequency.unit ).toDate()
//         return newDate
//     }

// }

// export module DateCycle {
//     export interface Data {
//         range?: DateRange.Data
//         frequency?: DateFrequency.Data
//         seed?: DateSeed.Data
//     }
// }

// // test()
// async function test () {
//     const { pretty } = await import( '../utils/obj' )

//     console.group( 'DateCycle' )

//     const cycleDatas: DateCycle.Data[] = [
//         {},
//         { seed: 'Sun' },
//         { seed: 'Mon' },
//         { seed: 'Fri' },
//         { frequency: 'weekly' },
//         { range: '08/06/21‥10/16/21' },
//         { seed: 'Fri', frequency: 'weekly' },
//         { frequency: 'weekly', range: '08/06/21‥10/16/21' },
//         { seed: 'Fri', range: '08/06/21‥10/15/21' },
//         { seed: 'Fri', frequency: 'weekly', range: '08/06/21‥10/15/21' },
//         { frequency: 'weekly', seed: '01/31/1960', range: '01/01/20‥03/01/20' },
//         { frequency: 'weekly', seed: '01/31/2035', range: '01/01/20‥03/01/20' },
//         { frequency: '2 weeks', seed: '02/01/2035', range: '01/01/20‥03/01/20' },
//         { frequency: '3 weeks', seed: '02/01/2035', range: '01/01/20‥03/01/20' },
//         { frequency: 'monthly', seed: '02/28/21', range: '01/01/20‥07/31/20' },
//         { frequency: 'monthly', seed: '01/31/1960', range: '01/01/20‥07/31/20' },
//         { frequency: 'monthly', seed: '01/31/2035', range: '01/01/20‥07/31/20' },
//         { frequency: '3 months', seed: '08/31/2035', range: '01/01/20‥01/01/22' },
//         { frequency: 'quarterly', seed: '08/31/2035', range: '01/01/20‥01/01/22' },
//         { frequency: '6 months', seed: '08/31/2035', range: '01/01/20‥01/01/24' },
//         { frequency: '1 year', seed: '01/31/2035', range: '01/01/20‥01/01/28' },
//         { frequency: 'yearly', seed: '01/31/2035', range: '01/01/20‥01/01/28' },
//         { frequency: 'yearly', seed: '02/01/2035', range: '01/01/20‥02/01/28' },
//         { frequency: 'yearly', seed: '02/28/2035', range: '01/01/20‥01/01/28' },
//         { frequency: '10 years', seed: '02/28/2035', range: '01/01/20‥01/01/28' },
//     ]

//     const cycles = cycleDatas.map( x => new DateCycle( x ) )

//     // const justDates = cycles.map( x => ( { [ x.frequency?.type ?? '' ]: x.getDates() } ) )
//     // console.info( justDates )

//     cycles.map( x => {
//         console.group( x.data )
//         Object.entries( x )
//             .filter( ( [ key ] ) => key !== 'data' )
//             .map( ( [ key, value ] ) => console.log( pretty( key, value ) ) )
//         console.groupEnd()
//     } )

//     console.groupEnd()
// }