import { AnyObj } from '@weis-guys/ts-utils'

export type Type<T> = {
    name: string
    validate: ( x: unknown ) => {
        data: T
        errors: string[]
    }
}

export function makeType ( name: string, validator: ( x: unknown ) => boolean ) {
    return {
        name,
        validate ( x: unknown ) {
            const result = validator( x )
            return {
                data: result ? x : undefined,
                errors: result ? undefined : [ `${ x } is not of type ${ name }` ],
            }
        }
    }
}

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