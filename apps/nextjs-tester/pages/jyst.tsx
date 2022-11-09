import { makeType } from '@weis-guys/jyst'

test()
function test () {
    console.clear()

    const type = makeType<( 42 | 'foo' )>( value =>
        value == 42 || value == 'foo' || 'not 42 or foo'
    )

    const stringType = makeType<string>( value =>
        typeof value === 'string' || `${ value } not a string`
    )

    const positiveType = makeType<number>( value => {
        if ( typeof value === 'number' ) {
            return value > 0 || `${ value } not a positive number`
        } else {
            return `${ value } not a number`
        }
    } )

    console.group( 'stringType' )
    console.log( stringType.validate( 'hello' ) ) // { data: 'hello' }
    console.log( stringType.validate( 4 ) ) // { error: '4 not a string' }
    console.log( stringType.validate( true ) ) // { error: 'true not a string' }
    console.groupEnd()

    console.group( 'positiveType' )
    console.log( positiveType.validate( 42 ) ) // { data: 42 } 
    console.log( positiveType.validate( 0 ) ) // { errors: [ '0 not a positive number' ] }
    console.log( positiveType.validate( -42 ) ) // { errors: [ '-42 not a positive number' ] }
    console.log( positiveType.validate( 'hello' ) ) // { errors: [ 'hello not a number' ] }
    console.log( positiveType.validate( true ) ) // { errors: [ 'true not a number' ] }
    console.groupEnd()

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
}

export default function Page () {
    return <>
    </>
}
