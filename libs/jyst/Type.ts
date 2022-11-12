import { prune } from '@weis-guys/ts-utils'

type Validation<Data = any> = {
    validator: ( x: Data ) => boolean
    errorBuilder?: ( x: unknown ) => string
}
const validationFromTuple = <Data = any> (
    [ validator, errorBuilder ]: ValidationTuple<Data>
) => ( { validator, errorBuilder } )

type ValidationTuple<Data = any> = [
    validator: ( x: Data ) => boolean,
    errorBuilder?: ( x: unknown ) => string
]

const defaultErrorBuilder = ( x: unknown ) => `${ x } is not valid`

type MustPass = 'all' | 'some'

type TypeParams<
    // Data = any,
    Validations extends Validation<Data>[] = Validation<Data>[],
    mustPass extends MustPass = 'all',
> = {
    validations?: Validations,
    mustPass?: mustPass
}

export type Type<Data, PrevData extends any[]> = {
    // params?: Params

    validate ( x: Data ): { data?: Data, errors?: string[] }
    validate ( x: unknown ): { data?: Data, errors?: string[] }

    addValidation<NextData> ( ...action: ValidationTuple<NextData> ):
        Type<
            unknown extends NextData
            ? Data
            : NextData
        >

    config: ( params: TypeParams ) => Type<Data>
}

export function makeType<Data> ( params?: TypeParams<Validation<any>[]> ): Type<Data> {
    return {
        params,

        config ( params: TypeParams<Validation<any>[]> ) {
            return makeType<Data>( params )
        },

        validate ( x: unknown ) {
            const result = params?.validations?.map( ( { validator, errorBuilder } ) => {
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

            if ( params?.mustPass == 'some' ) {
                const errors = result
                    ?.filter( r => r.error )
                    .map( r => r.error ) as string[]
                if ( errors?.length && result?.length ) {
                    if ( errors?.length == result?.length ) return { errors }
                }

                return { data: x as Data }
            }

            const errors = result
                ?.filter( r => r.error )
                .map( r => r.error ) as string[]
            if ( errors?.length ) return { errors }

            return { data: x as Data }
        },

        addValidation<NewData> ( ...validationTuple: ValidationTuple<NewData> ) {
            const newValidation = validationFromTuple( validationTuple )

            type something = unknown extends NewData ? Data : NewData
            const newType = makeType<
                something
            >( {
                ...params,
                validations: [
                    ...params?.validations ?? [],
                    newValidation,
                ],
            } )
            return newType
        },
    }
}

type StringType<Data extends string> = Type<Data> & {
    literal<NewData extends string> ( literal: NewData ): StringType<NewData>
}
export function makeStringType<Data extends string> (): StringType<Data> {
    const baseType = makeType<Data>().addValidation(
        x => typeof x == 'string',
        x => `${ x } is not a string`
    )
    return {
        ...baseType,
        literal<NewData extends string> ( literal: NewData ) {
            return baseType.addValidation(
                x => x == literal,
                x => `${ x } is not '${ literal }'`
            ) as any as StringType<NewData>
        },
    }
}
export function makeNumberType<T extends number> (): Type<T> {
    return makeType<T>().addValidation(
        x => typeof x == 'number',
        x => `${ x } is not a number`
    )
}

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