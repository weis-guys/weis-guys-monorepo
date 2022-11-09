// import { AnyObj, prune } from '@weis-guys/ts-utils'
// import { prune } from '@weis-guys/ts-utils'
import * as pkg from '@weis-guys/ts-utils'
const { prune } = pkg

type AnyObj = Record<string, any>

export type Type<T> = {
    validate: ( x: unknown ) => {
        data?: T
        error?: string
    }
}

export function makeType<T> ( validator: ( x: unknown ) => true | string ): Type<T> {
    return {
        validate ( x: unknown ) {
            const result = validator( x )
            const data = result === true ? x as T : undefined
            const error = typeof result === 'string' ? result : undefined
            return prune( { data, error } )
            // return { data, error }
        }
    }
}

// export function makeStringType<T extends string> (
//     validator: ( x: T ) => boolean,
//     errorBuilder?: ( x: T ) => string,
// ): Type<T> {
//     return makeType<T>( x => {
//         if ( typeof x !== 'string' ) return false
//         return validator( x )
//     } )
// }

// TODO
// makeStringType
// const stringType = makeType( 'string', value => typeof value === 'string' )
// makeNumberType
// const numberType = makeType( 'number', value => typeof value === 'number' )
// makeAndType
// makeOrType
// makeArrayType
// makeTupleType

export function makeObjType<T extends AnyObj> (
    name: string,
    shape: Record<keyof T, Type<T[ keyof T ]>>
) {
    return {
        // validate ( x: unknown ) {
        //     const result = validator( x )
        //     return {
        //         data: result ? x : undefined,
        //         error: result ? undefined : `${ x } is not of type ${ name }`
        //     }
        // }
    }
}