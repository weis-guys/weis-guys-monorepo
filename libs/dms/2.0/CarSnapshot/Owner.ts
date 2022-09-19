export module Owner {
    export type Name = typeof names[ number ]
    const names = [
        'Royal Drive',
        'Ken Worden',
    ] as const
}