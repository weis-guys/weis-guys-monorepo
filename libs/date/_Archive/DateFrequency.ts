import { makeEnum } from '../../ts-utils/src'

// UI/TODO make these items show in dropdown
const commonCustomMap = {
    daily: '1 day',
    weekly: '1 week',
    'bi-weekly': '2 weeks',
    monthly: '1 month',
    quarterly: '3 months',
    yearly: '1 year',
} as const
const commonCustomEnum = makeEnum( commonCustomMap )

const singularUnit = [ 'day', 'week', 'month', 'year' ] as const
const pluralUnit = singularUnit.map( unit => `${ unit }s` as `${ DateFrequencySingularUnit }s` )
const units = [ ...singularUnit, ...pluralUnit ] as const

export interface DateFrequencyProps {
    amount: number
    unit: DateFrequencyUnit
}

export type DateFrequencySingularUnit = typeof singularUnit[ number ]
export type DateFrequencyPluralUnit = typeof pluralUnit[ number ]
export type DateFrequencyUnit = DateFrequencySingularUnit | DateFrequencyPluralUnit

export type DateFrequencyCommonString = keyof typeof commonCustomMap
export type DateFrequencyCustomString = `${ number } ${ DateFrequencyPluralUnit }` | `1 ${ DateFrequencySingularUnit }`
export type DateFrequencyString = DateFrequencyCommonString | DateFrequencyCustomString

export type DateFrequencyData = DateFrequencyString | DateFrequencyProps







// export class DateFrequency {
//     readonly amount: DateFrequency.Props[ 'amount' ]
//     readonly unit: DateFrequency.Props[ 'unit' ]
//     readonly raw: DateFrequency.Raw

//     constructor( data: DateFrequency.Data ) {
//         if ( typeof data == 'string' ) {
//             const props = DateFrequency.rawToProps( data )
//             this.amount = props.amount
//             this.unit = props.unit
//         } else {
//             this.amount = data.amount
//             this.unit = data.unit
//         }
//         this.raw = this.toRaw()
//     }

//     toRaw () { return DateFrequency.propsToRaw( this ) }

//     static readonly customSeparator = ' ' as const
//     static propsToCustom ( { amount, unit }: DateFrequency.Props ): DateFrequency.Custom {
//         return `${amount}${DateFrequency.customSeparator}${unit}` as DateFrequency.Custom
//     }
//     static customToProps ( custom: DateFrequency.Custom ): DateFrequency.Props {
//         const [ amountString, unit ] = custom.split( DateFrequency.customSeparator ) as [ `${number}`, DateFrequency.Unit ]
//         const amount = Number( amountString )
//         return { amount, unit }
//     }
//     static propsToRaw ( props: DateFrequency.Props ): DateFrequency.Raw {
//         const custom = DateFrequency.propsToCustom( props )
//         const common = commonCustomEnum[ custom ]
//         return common ?? custom
//     }
//     static rawToProps ( rawFrequency: DateFrequency.Raw ): DateFrequency.Props {
//         if ( !rawFrequency ) throw new Error( 'rawFrequency is null' )

//         const custom = DateFrequency.isCommon( rawFrequency ) ? commonCustomEnum[ rawFrequency ] : rawFrequency
//         return DateFrequency.customToProps( custom )
//     }

//     static isCommon = ( x: string ): x is DateFrequency.Custom =>
//         Object.keys( commonCustomMap ).includes( x )

//     static hasProps = ( x: unknown ): x is DateFrequency.Props =>
//         is.nonNullObject( x ) && DateFrequency.hasAmount( x ) || DateFrequency.hasUnit( x )

//     static hasAmount = ( x: unknown ): x is Pick<DateFrequency.Props, 'amount'> =>
//         is.nonNullObject( x ) && ( 'amount' in x && typeof ( <DateFrequency.Props>x ).amount == 'number' )

//     static hasUnit = ( x: unknown ): x is Pick<DateFrequency.Props, 'unit'> =>
//         is.nonNullObject( x ) && ( 'unit' in x && units.includes( ( <DateFrequency.Props>x ).unit ) )
// }

// // test()
// function test () {
//     console.log( new DateFrequency( 'monthly' ).toRaw() )
//     console.log( new DateFrequency( '1 week' ).toRaw() )
//     console.log( new DateFrequency( '2 weeks' ).toRaw() )
//     console.log( new DateFrequency( '4 weeks' ).toRaw() )
// }

// // '1 time' = // TODO

// // UI/TODO allow user to save advanced options for easy reuse
// // UI/TODO make these items allowed in advanced options
// // 'tri-weekly' = '3 weeks'
// // 'quad-weekly' = '4 weeks'

// // 'bi-monthly' = '2 months'
// // 'quad-monthly' = '4 months'
// // 'semi-yearly' = '6 months'

// // 'bi-yearly' = '2 years'
// // 'tri-yearly' = '3 years'
// // 'quad-yearly' = '4 years'

// // const types = {
// //     'custom': {
// //         // UI/TODO use same/similar options as google calendar
// //         /*
// //             UI/TODO custom should allow for following options:
// //             'multi-day': { description: 'select days of week for weekly frequency (Mon/Wed/Fri)' },
// //             'weekdaily': { description: 'once every weekday (Mon-Fri)' },
// //             'weekenddaily': { description: 'once every weekendday (Sat-Sun)' },
// //             'semi-weekly': { description: 'twice every week' },
// //             'semi-monthly': { description: 'twice every month (1st and 15th)' },
// //         */
// //     },
// // }