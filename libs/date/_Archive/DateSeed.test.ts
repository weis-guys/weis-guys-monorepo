import { makeDateSeed } from './DateSeed'

describe( 'makeDateSeed', () => {

    it( 'should be able to make from ISODateString', () => {
        // TODO
        // expect( makeDateSeed(  ) ).toBe(  )
        // expect( makeDateSeed(  ) ).toBe(  )
        // expect( makeDateSeed(  ) ).toBe(  )
        // expect( makeDateSeed(  ) ).toBe(  )

        // expect( makeDateSeed(  ) ).toBe( undefined )
        // expect( makeDateSeed(  ) ).toBe( undefined )
    } )

    it( 'should be able to make from LocaleDateString', () => {
        // TODO
        // expect( makeDateSeed( '1/1/1' ) ).toBe( '01/01/01' )
        // expect( makeDateSeed( '1/1/2020' ) ).toBe( '01/01/20' )
        // expect( makeDateSeed( '01/01/20' ) ).toBe( '01/01/20' )
        // expect( makeDateSeed( '01/01/2020' ) ).toBe( '01/01/20' )

        // expect( makeDateSeed( '13/01/20' ) ).toBe( undefined )
        // expect( makeDateSeed( '01/56/20' ) ).toBe( undefined )
    } )

    it( 'should be able to make from Date', () => {
        // TODO
        // expect( makeDateSeed( new Date( '1/1/2020' ) ) ).toBe( '01/01/20' )
        // expect( makeDateSeed( new Date( '01/01/20' ) ) ).toBe( '01/01/20' )
        // expect( makeDateSeed( new Date( '01/01/2020' ) ) ).toBe( '01/01/20' )

        // expect( makeDateSeed( new Date( '13/01/20' ) ) ).toBe( undefined )
        // expect( makeDateSeed( new Date( '01/56/20' ) ) ).toBe( undefined )
    } )

    it( 'should be able to make from DayOfWeek', () => {
        // TODO
        // 'Fri'
        // 'fri'
        // 'sun'
        // 'Monday'
        // 'thursday'
    } )

    it( 'should be able to make from DayOfMonth', () => {
        // TODO
        // 15
        // 28
        // 31
    } )

    it( 'should return undefined', () => {
        // TODO
        // expect( makeDateSeed( undefined ) ).toBe( undefined )
        // //@ts-ignore
        // expect( makeDateSeed( null ) ).toBe( undefined )
        // //@ts-ignore
        // expect( makeDateSeed() ).toBe( undefined )
        // //@ts-ignore
        // expect( makeDateSeed( 'fdsaf/fdsaf/fdsaf' ) ).toBe( undefined )
        // //@ts-ignore
        // expect( makeDateSeed( 'fdsaf' ) ).toBe( undefined )
    } )

} )