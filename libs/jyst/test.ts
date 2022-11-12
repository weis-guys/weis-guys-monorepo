import { jyst, makeType } from '@weis-guys/jyst'
import { pretty, pretty1Line } from '@weis-guys/ts-utils'

test()
function test () {
    console.clear()

    console.log( '' )
    console.group( 'stringOrNumberType' )
    const stringOrNumberType = makeType()
        .config( { mustPass: 'some' } )
        .addValidation(
            ( value: string ) => typeof value == 'string',
            value => `${ value } is not a string`,
        )
        .addValidation(
            ( value: number ) => typeof value == 'number',
            value => `${ value } is not a number`,
        )
    // console.log( pretty( stringOrNumberType ) )
    console.log( pretty1Line( stringOrNumberType.validate( 'hello' ) ) )
    console.log( pretty1Line( stringOrNumberType.validate( 4 ) ) )
    console.log( pretty1Line( stringOrNumberType.validate( true ) ) )
    console.groupEnd()

    console.log( '' )
    console.group( 'fooOr42Type' )
    const fooOr42Type = makeType()
        .config( { mustPass: 'some' } )
        .addValidation(
            ( value: 'foo' ) => value == 'foo',
            value => `${ value } is not a string`,
        )
        .addValidation(
            ( value: 42 ) => value == 42,
            value => `${ value } is not a number`,
        )
    // console.log( pretty( fooOr42Type ) )
    console.log( pretty1Line( fooOr42Type.validate( '' ) ) )
    console.log( pretty1Line( fooOr42Type.validate( 42 ) ) )
    console.log( pretty1Line( fooOr42Type.validate( 'bar' ) ) )
    console.log( pretty1Line( fooOr42Type.validate( 42465 ) ) )
    console.groupEnd()

    // console.group( 'fooOr42Type' )
    // const fooOr42Type = stringOrNumberType.addValidator(
    //     ( value: 'foo' | 42 ) => value == 'foo' || value == 42,
    //     value => `${ value } is not foo or 42`,
    // )
    // console.log( pretty1Line( fooOr42Type.validate( 'foo' ) ) )
    // console.log( pretty1Line( fooOr42Type.validate( 42 ) ) )
    // console.log( pretty1Line( fooOr42Type.validate( true ) ) )
    // console.log( pretty1Line( fooOr42Type.validate( 'bar' ) ) )
    // console.log( pretty1Line( fooOr42Type.validate( 42465 ) ) )
    // console.groupEnd()

    console.log( '' )
    console.group( 'stringType' )
    const stringType = jyst.string()
    console.log( pretty1Line( stringType.validate( 'foo' ) ) )
    console.log( pretty1Line( stringType.validate( 42 ) ) )
    console.groupEnd()

    console.log( '' )
    console.group( 'fooLiteralType' )
    const fooLiteralType = jyst.string().literal( 'foo' )
    console.log( pretty1Line( fooLiteralType.validate( 'foo' ) ) )
    console.log( pretty1Line( fooLiteralType.validate( 42 ) ) )
    console.groupEnd()


    console.log( '' )
    console.group( 'numberType' )
    const numberType = jyst.number()
    console.log( pretty1Line( numberType.validate( 'foo' ) ) )
    console.log( pretty1Line( numberType.validate( 42 ) ) )
    console.groupEnd()





    // console.group( 'positiveType' )
    // const positiveType = makeType<number>( value => {
    //     if ( typeof value === 'number' ) {
    //         return value > 0 || `${ value } not a positive number`
    //     } else {
    //         return `${ value } not a number`
    //     }
    // } )
    // console.log( positiveType.validate( 42 ) ) // { data: 42 } 
    // console.log( positiveType.validate( 0 ) ) // { errors: [ '0 not a positive number' ] }
    // console.log( positiveType.validate( -42 ) ) // { errors: [ '-42 not a positive number' ] }
    // console.log( positiveType.validate( 'hello' ) ) // { errors: [ 'hello not a number' ] }
    // console.log( positiveType.validate( true ) ) // { errors: [ 'true not a number' ] }
    // console.groupEnd()

    // const minLength3Type = makeStringType(
    //     value => value.length <= 3,
    //     value => `length of ${ value } is not less than or equal to 3`
    // )
    // console.log( stringType.validate( 'foo' ) ) // { data: 'foo' }
    // console.log( stringType.validate( 'hello' ) ) // { errors: [ 'length of hello is not less than or equal to 3' ] }
    // console.log( stringType.validate( 4 ) ) // { errors: [ '4 is not of type string' ] }

    // const positiveType = makeNumberType( value => value > 0 )

    // const stringAndNumberType = makeAndType( 'stringAndNumber', stringType, numberType )
    // const stringOrNumberType = makeOrType( 'stringOrNumber', stringType, numberType )

    // const arrayType = makeArrayType( 'stringArray', stringType )
    // const arrayType = makeArrayType( 'stringOrNumberArray', stringOrNumberType )

    // const tupleType = makeTupleType( 'stringThenNumberTuple', [ stringType, numberType ] )

    // type User = {
    //     id: number
    //     email: string
    //     address: {
    //         street: string // 1234 Maple St
    //         city: string // Anytown
    //         state: string // CA
    //         zip: string // 12345
    //         country?: string // USA
    //     }
    // }

    // const userType = makeObjType<User>( {
    //     id: numberType,
    //     email: stringType,
    //     address: makeObjType( {
    //         street: stringType, // 1234 Maple St
    //         city: stringType, // Anytown
    //         state: stringType, // CA
    //         zip: makeStringType( 'zip', value => value.length == 5 ), // 12345
    //         country: stringType // USA
    //     } ),
    // } )

    // const user = {
    //     id: 1,
    //     email: '',
    //     address: {
    //         street: '1234 Maple St',
    //         city: 'Anytown',
    //         state: 'CA',
    //         zip: '12345',
    //     },
    // }

    // console.log( userType.validate( user ) )

    // const userWithCountry = { ...user, address: { ...user.address, country: 'USA' } }
    // console.log( userType.validate( userWithCountry ) )

    console.log( '' )
}