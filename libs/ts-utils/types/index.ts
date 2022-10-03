export type Dollars = number
// export type Days = number
export type Miles = number

export type NumberLike = number | string | bigint
export type Nullish = undefined | null | void
export type Nullable<T> = T | Nullish
export type NonNullable<T> = T extends Nullable<infer U> ? U : never
export type Primitive = string | number | boolean | bigint | symbol | Nullish

export type UnknownObj = Record<string, unknown>

export type PureFn<In = any, Out = any> = ( ...args: In[] ) => Out
export type AnyClass = { new( ...args: any[] ): any }
export type AnyObj = Record<string, any>
export type AnyNullableObj = Nullable<AnyObj>
export type AnyMap = Map<string, any>
export type AnyArray = any[]
export type AnyFunction = ( ...args: any[] ) => any

export type EmptyObj = Record<string, never>
export type EmptyArray = never[]
export type EmptyString = ''
export type Empty = EmptyString | Nullish | EmptyObj | EmptyArray

export type Immutable<T> =
    T extends Primitive | Function ? T :
    T extends Array<infer U> ? ReadonlyArray<Immutable<U>> :
    { readonly [ K in keyof T ]: Immutable<T[ K ]> }

export type optionalKeys<T extends object> = {
    [ k in keyof T ]: undefined extends T[ k ] ? k : never
}[ keyof T ]

export type requiredKeys<T extends object> = Exclude<keyof T, optionalKeys<T>>

export type addQuestionMarks<T extends object> =
    & { [ k in optionalKeys<T> ]?: T[ k ] }
    & { [ k in requiredKeys<T> ]: T[ k ] }


// https://stackoverflow.com/questions/46370222/why-does-a-b-allow-a-combination-of-both-and-how-can-i-prevent-it
type AllKeys<T> = T extends unknown ? keyof T : never
type Id<T> = T extends infer U ? { [ K in keyof U ]: U[ K ] } : never
type _ExclusifyUnion<T, K extends PropertyKey> =
    T extends unknown ? Id<T & Partial<Record<Exclude<K, keyof T>, never>>> : never
export type ExclusifyUnion<T> = _ExclusifyUnion<T, AllKeys<T>>

export type ValueOrPromise<Value> = Value | Promise<Value>

export type AnyKey = string | number
export type JSONParsable =
    | string
    | number
    | boolean
    | null
    | Array<JSONParsable>
    | { [ key in AnyKey ]: JSONParsable }

export type MapTupleValues<T extends any[], V> = Extract<{
    [ I in keyof T ]: V
}, any[]>
export type Optional<T> = T | undefined
export type MapTupleOptional<T extends any[]> = Extract<Partial<{
    [ I in keyof T ]: T[ I ]
}>, any[]>