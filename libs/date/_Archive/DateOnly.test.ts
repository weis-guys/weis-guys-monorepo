import { makeDateOnly } from './DateOnly'

describe( 'makeDateOnly', () => {

    it( 'should be able to make from ISODateString', () => {
        expect( makeDateOnly( '2001-01-01' )?.value.valueOf() ).toBe( new Date( '01/01/2001' ).valueOf() )
        expect( makeDateOnly( '2020-01-01' )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )

        expect( makeDateOnly( '2020-13-01' ) ).toBe( undefined )
        expect( makeDateOnly( '2020-01-56' ) ).toBe( undefined )
    } )

    it( 'should be able to make from LocaleDateString', () => {
        expect( makeDateOnly( '1/1/1' )?.value.valueOf() ).toBe( new Date( '01/01/2001' ).valueOf() )
        expect( makeDateOnly( '1/1/2020' )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )
        expect( makeDateOnly( '01/01/20' )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )
        expect( makeDateOnly( '01/01/2020' )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )

        expect( makeDateOnly( '13/01/20' ) ).toBe( undefined )
        expect( makeDateOnly( '01/56/20' ) ).toBe( undefined )
    } )

    it( 'should be able to make from Date', () => {
        expect( makeDateOnly( new Date( '1/1/2020' ) )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )
        expect( makeDateOnly( new Date( '01/01/20' ) )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )
        expect( makeDateOnly( new Date( '01/01/2020' ) )?.value.valueOf() ).toBe( new Date( '01/01/2020' ).valueOf() )

        expect( makeDateOnly( new Date( '13/01/20' ) ) ).toBe( undefined )
        expect( makeDateOnly( new Date( '01/56/20' ) ) ).toBe( undefined )
    } )

    it( 'should return undefined', () => {
        expect( makeDateOnly( undefined ) ).toBe( undefined )
        //@ts-ignore
        expect( makeDateOnly( null ) ).toBe( undefined )
        //@ts-ignore
        expect( makeDateOnly() ).toBe( undefined )
        //@ts-ignore
        expect( makeDateOnly( 'fdsaf/fdsaf/fdsaf' ) ).toBe( undefined )
        //@ts-ignore
        expect( makeDateOnly( 'fdsaf' ) ).toBe( undefined )
    } )

} )