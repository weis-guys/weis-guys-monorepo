import { AnyArray, AnyObj, Empty, EmptyArray, EmptyObj, Nullish, NumberLike, Primitive } from './types'

/* make sure to sort these with more specific above less specific */
export const is = {
    spreadable: ( x: unknown ): x is AnyObj | AnyArray => is.array( x ) || is.object( x ),
    nonNullObject: ( x: unknown ): x is AnyObj => typeof x == 'object' && x != null,
    plainObject: ( x: unknown ): x is AnyObj => typeof x == 'object' && x?.constructor === Object,
    classInstance: ( x: unknown ): x is AnyObj => typeof x == 'object' && !is.plainObject( x ),
    emptyString: ( x: unknown ): x is '' => x === '',
    emptyArray: ( x: unknown ): x is EmptyArray => is.array( x ) && x.length === 0,
    emptyObj: ( x: unknown ): x is EmptyObj =>
        is.object( x ) && !is.date( x ) &&
        !is.function( x ) && !Object.keys( x ).length,
    error: ( x: unknown ): x is Error => x instanceof Error,

    defined: ( x: unknown ): x is any => x !== undefined,
    undefined: ( x: unknown ): x is undefined => x === undefined,
    null: ( x: unknown ): x is null => x === null,
    nullish: ( x: unknown ): x is Nullish => is.null( x ) || is.undefined( x ),
    empty: ( x: unknown ): x is Empty =>
        is.emptyString( x ) || is.nullish( x ) || is.emptyObj( x ) || is.emptyArray( x ),

    string: ( x: unknown ): x is string => typeof x == 'string',
    NaN: ( x: unknown ): x is number => typeof x == 'number' && isNaN( x ),
    number: ( x: unknown ): x is number => typeof x == 'number' && !isNaN( x ),
    bigint: ( x: unknown ): x is bigint => typeof x == 'bigint',
    numberLike: ( x: unknown ): x is NumberLike => is.number( x ) || is.string( x ) || is.bigint( x ),
    boolean: ( x: unknown ): x is boolean => typeof x == 'boolean',
    primitive: ( x: unknown ): x is Primitive => !is.object( x ),

    date: ( x: unknown ): x is Date => !isNaN( x as any ) && x instanceof Date,
    promise ( x ): x is Promise<any> {
        if (
            typeof x === 'object'
            && 'then' in x
            && typeof x.then === 'function'
        ) return true
        return false
    },

    function: ( x: unknown ): x is Function => typeof x == 'function',
    array: ( x: unknown ): x is unknown[] => Array.isArray( x ),
    object: ( x: unknown ): x is object => x === Object( x ),
}

// test()
function test () {
    const values = [
        200,
        200.56,
        '200.56',
        '200.56.465',
        6546546548n,
        -0,
        null,
        undefined,
        NaN,
    ]

    console.group( 'is.NaN' )
    values.forEach( value => console.log( value, is.NaN( value ) ) )
    console.groupEnd()

    console.group( 'is.number' )
    values.forEach( value => console.log( value, is.number( value ) ) )
    console.groupEnd()

    console.group( 'is.number' )
    values.forEach( value => console.log( value, is.number( value ) ) )
    console.groupEnd()
}