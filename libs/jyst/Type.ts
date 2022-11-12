import { prune } from '@weis-guys/ts-utils/prune.js'

export type Type<Data> = {
    params?: TypeParams

    validate ( x: Data ): { data?: Data, errors?: string[] }
    validate ( x: unknown ): { data?: Data, errors?: string[] }

    addValidator<NewData> ( ...action: ValidatorAction<NewData> ):
        Type<unknown extends NewData ? Data : NewData>

    config: ( params: TypeParams ) => Type<Data>
}

type ValidatorAction<Data = any> = [
    validator: ( x: Data ) => boolean,
    errorBuilder?: ( x: unknown ) => string
]

const defaultErrorBuilder = ( x: unknown ) => `${ x } is not valid`

type TypeParams = {
    actions?: ValidatorAction[],
    requiredPasses?: 'all' | 'some'
}

export function makeType<Data> ( params?: TypeParams ): Type<Data> {
    return {
        params,
        validate ( x: unknown ) {
            const result = params?.actions?.map( ( [ validator, errorBuilder ] ) => {
                const isValid = validator( x as Data )
                return {
                    data: isValid
                        ? x as Data
                        : undefined,
                    error: !isValid
                        ? errorBuilder?.( x ) ?? defaultErrorBuilder( x )
                        : undefined,
                }
            } )

            const errors = result
                ?.filter( r => r.error )
                .map( r => r.error ) as string[]
            if ( errors?.length ) return { errors }

            return { data: x as Data }
        },
        addValidator<NewData> ( ...action: ValidatorAction<NewData> ) {
            return makeType<( unknown extends NewData ? Data : NewData )>( {
                ...params,
                actions: [ ...params?.actions ?? [], action ],
            } )
        },
        config ( params: TypeParams ) {
            return makeType<Data>( params )
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

// export function makeObjType<T extends AnyObj> (
//     name: string,
//     shape: Record<keyof T, Type<T[ keyof T ]>>
// ) {
//     return {
//         // validate ( x: unknown ) {
//         //     const result = validator( x )
//         //     return {
//         //         data: result ? x : undefined,
//         //         error: result ? undefined : `${ x } is not of type ${ name }`
//         //     }
//         // }
//     }
// }