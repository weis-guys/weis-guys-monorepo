export type Damage = {
    readonly extent?: Damage.Extent
    readonly type?: Damage.Type
    readonly location?: Damage.Location
    readonly description?: string
}

export module Damage {
    export type Extent = typeof extents[ number ]
    export const extents = [
        'Minor',
        'Normal',
        'Major',
    ] as const

    export type Type = typeof types[ number ]
    export const types = [
        'Burn',
        'Hail',
        'Odometer',
        'Repossession',
        'Storm',
        'Theft',
    ] as const

    export type Location = typeof locations[ number ]
    export const locations = [
        'All-Over',
        'Driver-Side',
        'Front',
        'Rear',
        'Roof',
        'Passenger-Side',
        'Top',
    ] as const
}