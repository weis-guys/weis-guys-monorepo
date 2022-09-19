export type TupleContains<Tuple extends Array<any>, Type> = Extract<
    Tuple extends Array<infer T> ? ( T extends Type ? true : false ) : false,
    true
> extends never ? false : true

type trueTests = [
    TupleContains<'test'[], 'test'>,
    TupleContains<[ 'test' ], 'test'>,
    TupleContains<[ 'test', 'foo' ], 'test'>,
    TupleContains<( 'test' | 'foo' )[], 'test'>,
][ number ]
type falseTests = [
    TupleContains<[ 'foo' ], 'test'>,
    TupleContains<'foo'[], 'test'>,
][ number ]