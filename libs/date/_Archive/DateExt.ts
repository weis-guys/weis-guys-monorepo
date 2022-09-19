// import moment from 'moment'
// import { logObjStr } from '../utils/Log'
// import { DateLike } from './DateLike'
// import { DayOfWeek } from './DayOfWeek'

// export class DateExt extends Date {
//     constructor( datelike?: DateLike ) {
//         super()
//         if ( arguments.length < 1 ) return
//         if ( !datelike ) DateExt.invalidate( this )

//         if ( DayOfWeek.isMatch( datelike ) ) {
//             this.set( moment().day( datelike ).toDate() )
//         } else if ( DateLike.isMatch( datelike ) ) {
//             this.set( datelike )
//         }
//     }

//     weekdayIndex () { return moment( this ).weekday() }
//     weekdayFull () { return DayOfWeek.full( this.weekdayIndex() ) }
//     weekdayShort () { return DayOfWeek.short( this.weekdayIndex() ) }
//     weekdayMin () { return DayOfWeek.min( this.weekdayIndex() ) }

//     set ( datelike: DateLike ) {
//         return this.setTime( new Date( datelike ).getTime() )
//     }

//     private static invalidate ( date: Date ) {
//         date.setTime( undefined as any )
//     }

//     private static minOrMax = ( name: 'min' | 'max' ) => ( dates: ( Date | undefined )[] = [] ) => {
//         const nonNullDates = dates.filter( Boolean )
//         if ( !nonNullDates.length ) return
//         return new Date( Math[ name ]?.( ...nonNullDates.map( Number ) ) )
//     }
//     static min = DateExt.minOrMax( 'min' )
//     static max = DateExt.minOrMax( 'max' )

//     static getDaysInMonth ( date: Date ): number {
//         return new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate()
//     }

//     static setToStartOfDay ( date: Date ) {
//         date.setTime( new Date( date.toDateString() ).getTime() )
//     }
// }

// // test()
// function test () {
//     logObjStr( [
//         moment( { month: 10, date: 30 } ).toDate().toLocaleDateString(),
//         DateExt.makeWithMonthLimit( 35 ).toLocaleDateString(),
//         DateExt.makeWithMonthLimit( 35, new Date( '11/15/2021' ) ).toLocaleDateString(),
//     ] )
// }