import { finalize, is, makeFromArray } from '@weis-guys/ts-utils'
import { savable, Savable } from '@weis-guys/ts-db-utils'
import { ISODateString, isISODateString, makeISODateString } from './ISODateString'
import { PlainDate, makePlainDate } from './PlainDate'

// TODO
// add ability to have start and end be the same date
// which would cause the string to be ISODateString

export type DateRangeData = DateRangeString | DateRangeDataProps

export type DateRange = Savable<{
    readonly start?: PlainDate
    readonly end?: PlainDate
    readonly string?: DateRangeString
}>

export function makeDateRange ( data: DateRangeData | undefined ): DateRange | undefined {
    if ( isDateRangeString( data ) ) {
        const { start, end } = dateRangeStringToDataPropsProps( data ) ?? {}
        const string = data
        return finalize( savable( {
            start: makePlainDate( start ),
            end: makePlainDate( end ),
            string,
            toString: () => string,
            toData: () => string,
        } ) )
    }

    if ( isDateRangeDataProps( data ) ) {
        const string = dateRangeDataPropsToString( data )
        return finalize( savable( {
            start: makePlainDate( data.start ),
            end: makePlainDate( data.end ),
            string,
            toString: () => string,
            toData: () => string,
        } ) )
    }
}

export const makeDateRanges = makeFromArray( makeDateRange )

export type DateRangeDataProps = {
    readonly start?: ISODateString
    readonly end?: ISODateString
}
const isDateRangeDataProps = ( x: unknown ): x is DateRangeDataProps => is.object( x ) && (
    ( 'start' in x && isISODateString( ( <any>x ).start ) )
    || ( 'end' in x && isISODateString( ( <any>x ).end ) )
)

const dateRangeSeparator = '..'
export type DateRangeSeparator = typeof dateRangeSeparator
export type DateRangeString =
    | `${ DateRangeSeparator }${ ISODateString }`
    | `${ ISODateString }${ DateRangeSeparator }`
    | `${ ISODateString }${ DateRangeSeparator }${ ISODateString }`
const isDateRangeString = ( x: unknown ): x is DateRangeString => {
    if ( !is.string( x ) ) return false
    if ( !x.includes( dateRangeSeparator ) ) return false
    const [ start, end ] = x.split( dateRangeSeparator )
    return isISODateString( start ) && isISODateString( end )
}

function dateRangeDataPropsToString ( props: DateRangeDataProps ): DateRangeString | undefined {
    if ( !isDateRangeDataProps( props ) ) return
    const startString = props.start ? makeISODateString( props.start ) : ''
    const endString = props.end ? makeISODateString( props.end ) : ''
    return `${ startString }${ dateRangeSeparator }${ endString }` as DateRangeString
}
function dateRangeStringToDataPropsProps ( string: DateRangeString ): DateRangeDataProps | undefined {
    if ( !isDateRangeString( string ) ) return
    const [ start, end ] = string.split( dateRangeSeparator ) as [ ISODateString, ISODateString ]
    return { start, end }
}




// import { ISODateString } from './ISODateString'
// import { DateOnly } from './DateOnly'
// import { is } from '../utils/is'

// export class DateRange {


//     #error?: string
//     get error () { return this.#error }
//     get isValid () { return !this.error }

//     constructor( readonly data: DateRange.Data ) {
//         if ( typeof data === 'string' ) {
//             if ( data.includes( DateRange.separator ) ) {
//                 const { start, end } = DateRange.rawToProps( data )
//                 if ( start ) this.start = new DateOnly( start )
//                 if ( end ) this.end = new DateOnly( end )
//             }

//         } else if ( DateRange.hasProps( data ) ) {
//             if ( data.start ) this.start = new DateOnly( data.start )
//             if ( data.end ) this.end = new DateOnly( data.end )
//         }

//         this.validate()
//         this.raw = this.toRaw()
//     }

//     private validate () {
//         const { start, end } = this
//         if ( start?.valueOf() != null && end?.valueOf() != null ) {
//             if ( start.valueOf() > end.valueOf() ) {
//                 this.#error = [
//                     `Start date '${start}' is after end date '${end}'.`,
//                     `Did you mean '${end}${DateRange.separator}${start}'?`
//                 ].join( ' ' )
//             }
//         }

//         if ( start?.valueOf() == null && end?.valueOf() == null ) {
//             this.#error = 'There was no start or end date passed in'
//         }

//         if ( start && !start.isValid ) { this.#error = 'Invalid Start Date' }
//         if ( end && !end.isValid ) { this.#error = 'Invalid End Date' }
//     }

//
//     static hasProps = ( x ): x is DateRange.Props =>
//         is.nonNullObject( x ) && DateRange.hasStart( x ) || DateRange.hasEnd( x )

//     static hasStart = ( x ): x is Pick<DateRange.Props, 'start'> =>
//         is.nonNullObject( x ) && ( 'start' in x && DateLike.isMatch( x.start ) )

//     static hasEnd = ( x ): x is Pick<DateRange.Props, 'end'> =>
//         is.nonNullObject( x ) && ( 'end' in x && DateLike.isMatch( x.end ) )

//     static fromRanges ( rangesData: ( DateRange.Data | undefined )[] ) {
//         const nonNullRangesData = rangesData.filter( Boolean ) as DateRange.Data[]
//         const ranges = nonNullRangesData.map( x => new DateRange( x ) )
//         const start = DateOnly.min( ranges.map( x => x.start ) )
//         const end = DateOnly.max( ranges.map( x => x.end ) )
//         const range = new DateRange( { start, end } )
//         if ( range.isValid ) return range
//     }
// }

// // constructorTest()
// function constructorTest () {
//     const tests = [
//         { start: '01/01/20', end: '01/01/1562' },
//         { start: '01/01/20', end: '03/01/20' },
//         { start: '01/01/20' },
//         { end: '03/01/20' },
//         {},
//         undefined,
//         '',
//         '‥',
//         'null',
//         'undefined',
//         'fdsalfkjdslfakhsd',
//         '01/01/20‥undefined',
//         '01/01/20‥fdsalfkjdslfakhsd',
//         'null‥03/01/20',
//         '01/01/20‥03/01/20',
//         '01/01/1562‥01/01/2020',
//         '01/01/2020‥01/01/1562',
//         '‥01/01/2020',
//         '01/01/2020‥',
//     ]

//     tests.forEach( value => {
//         let groupString = `new DateRange( ${value} )`
//         if ( typeof value == 'string' ) groupString = `new DateRange( '${value}' )`
//         if ( typeof value == 'object' ) groupString = `new DateRange( ${JSON.stringify( value )} )`

//         console.group( groupString )
//         console.log( new DateRange( value as any ) )
//         console.groupEnd()
//         console.log( '' )
//     } )
// }

// // fromRangesTest()
// function fromRangesTest () {
//     const tests = [
//         [ '01/01/20‥03/01/20', '01/01/1562‥01/01/2020' ],
//         [ '01/01/1562‥01/01/2020', '01/01/20‥03/01/20' ],
//         [ '01/01/20‥03/01/20', '01/01/1562‥01/01/2020', '‥01/01/2020' ],
//         [ '01/01/2020‥', '‥03/01/2020' ],
//         [ '‥03/01/2020', '01/01/2020‥' ],
//         [ '03/01/2020‥', '01/01/2020‥' ],
//         [ '01/01/2020‥', '01/01/2020‥', '‥01/01/2020', '‥01/01/2020' ],
//         [ undefined, '01/01/2020‥', '‥01/01/2020' ],
//         [ null, '01/01/2020‥', '‥01/01/2020' ],
//     ]

//     tests.forEach( value => {
//         let groupString = `DateRange.fromRanges( ${value} )`
//         if ( typeof value == 'string' ) groupString = `DateRange.fromRanges( '${value}' )`
//         if ( typeof value == 'object' ) groupString = `DateRange.fromRanges( ${JSON.stringify( value )} )`

//         console.group( groupString )
//         console.log( DateRange.fromRanges( value as any ) )
//         console.groupEnd()
//         console.log( '' )
//     } )
// }