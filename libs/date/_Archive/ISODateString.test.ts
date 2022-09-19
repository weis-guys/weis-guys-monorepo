import { isISODateString, makeISODateString } from './ISODateString'

describe( 'makeISODateString', () => {

    it( 'should be able to make from ISODateString', () => {
        expect( makeISODateString( '2001-01-01' ) ).toBe( '2001-01-01' )
        expect( makeISODateString( '2020-01-01' ) ).toBe( '2020-01-01' )

        expect( makeISODateString( '2020-13-01' ) ).toBe( undefined )
        expect( makeISODateString( '2020-01-56' ) ).toBe( undefined )
    } )

    it( 'should be able to make from LocaleDateString', () => {
        expect( makeISODateString( '1/1/1' ) ).toBe( '2001-01-01' )
        expect( makeISODateString( '1/1/2020' ) ).toBe( '2020-01-01' )
        expect( makeISODateString( '01/01/20' ) ).toBe( '2020-01-01' )
        expect( makeISODateString( '01/01/2020' ) ).toBe( '2020-01-01' )

        expect( makeISODateString( '13/01/20' ) ).toBe( undefined )
        expect( makeISODateString( '01/56/20' ) ).toBe( undefined )
    } )

    it( 'should be able to make from Date', () => {
        expect( makeISODateString( new Date( '1/1/1' ) ) ).toBe( '2001-01-01' )
        expect( makeISODateString( new Date( '1/1/2020' ) ) ).toBe( '2020-01-01' )
        expect( makeISODateString( new Date( '01/01/20' ) ) ).toBe( '2020-01-01' )
        expect( makeISODateString( new Date( '01/01/2020' ) ) ).toBe( '2020-01-01' )

        expect( makeISODateString( new Date( '13/01/20' ) ) ).toBe( undefined )
        expect( makeISODateString( new Date( '01/56/20' ) ) ).toBe( undefined )
    } )

    it( 'should return undefined', () => {
        expect( makeISODateString( undefined ) ).toBe( undefined )
        //@ts-ignore
        expect( makeISODateString( null ) ).toBe( undefined )
        //@ts-ignore
        expect( makeISODateString() ).toBe( undefined )
        //@ts-ignore
        expect( makeISODateString( 'fdsaf/fdsaf/fdsaf' ) ).toBe( undefined )
        //@ts-ignore
        expect( makeISODateString( 'fdsaf' ) ).toBe( undefined )
    } )

} )

describe( 'isISODateString', () => {

    it( 'should be able to detect valid ISODateString', () => {
        expect( isISODateString( '2001-01-01' ) ).toBe( true )
        expect( isISODateString( '2020-01-01' ) ).toBe( true )

        expect( isISODateString( '2020-13-01' ) ).toBe( false )
        expect( isISODateString( '2020-01-56' ) ).toBe( false )


        expect( isISODateString( '1/1/1' ) ).toBe( false )
        expect( isISODateString( '1/1/2020' ) ).toBe( false )
        expect( isISODateString( '01/01/20' ) ).toBe( false )
        expect( isISODateString( '01/01/2020' ) ).toBe( false )

        expect( isISODateString( '1' ) ).toBe( false )
        expect( isISODateString( '1/1' ) ).toBe( false )
        expect( isISODateString( '13/01/20' ) ).toBe( false )
        expect( isISODateString( '01/56/20' ) ).toBe( false )

        // @ts-ignore
        expect( isISODateString() ).toBe( false )
        expect( isISODateString( 123 ) ).toBe( false )
        expect( isISODateString( undefined ) ).toBe( false )
        expect( isISODateString( null ) ).toBe( false )
        expect( isISODateString( 'fdsaf/fdsaf/fdsaf' ) ).toBe( false )
        expect( isISODateString( 'fdsaf' ) ).toBe( false )
    } )

} )