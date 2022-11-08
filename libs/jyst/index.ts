import { makeType } from './Type'

test()
function test () {
    console.clear()

    const stringType = makeType( 'string', x => typeof x === 'string' )
    const numberType = makeType( 'number', x => typeof x === 'number' )

    const objType = makeObjType( 'obj', {
        string: stringType,
        number: numberType,
    } )

    // console.log( stringType.validate( 'hello' ) )
    // console.log( stringType.validate( 4 ) )
    // console.log( stringType.validate( true ) )

    console.log(
        objType.validate( { string: 'hello', number: 4 } )
    )
}