import { isLocaleDateString } from './LocaleDateString'

describe( 'isLocaleDateString', () => {

    it( 'should be able to detect valid LocaleDateStrings', () => {
        expect( isLocaleDateString( '1/1/1' ) ).toBe( true )
        expect( isLocaleDateString( '1/1/2020' ) ).toBe( true )
        expect( isLocaleDateString( '01/01/20' ) ).toBe( true )
        expect( isLocaleDateString( '01/01/2020' ) ).toBe( true )

        expect( isLocaleDateString( '1' ) ).toBe( false )
        expect( isLocaleDateString( '1/1' ) ).toBe( false )
        expect( isLocaleDateString( '13/01/20' ) ).toBe( false )
        expect( isLocaleDateString( '01/56/20' ) ).toBe( false )

        //@ts-ignore
        expect( isLocaleDateString() ).toBe( false )
        expect( isLocaleDateString( 123 ) ).toBe( false )
        expect( isLocaleDateString( undefined ) ).toBe( false )
        expect( isLocaleDateString( null ) ).toBe( false )
        expect( isLocaleDateString( 'fdsaf/fdsaf/fdsaf' ) ).toBe( false )
        expect( isLocaleDateString( 'fdsaf' ) ).toBe( false )
    } )

} )