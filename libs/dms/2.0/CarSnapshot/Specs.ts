import { LooseAutocomplete } from '@weis-guys/ts-utils'

export type Specs = {
    readonly color?: Specs.Body.Color
    readonly colorCode?: string
    readonly bodyStyle?: Specs.Body.Style
    readonly drivetrain?: Specs.Drivetrain
    readonly transmission?: Specs.Transmission
    readonly cylinders?: number
    readonly fuelTypePrimary?: LooseAutocomplete<Specs.FuelType>
    readonly fuelTypeSecondary?: LooseAutocomplete<Specs.FuelType>
}

export module Specs {

    export type FuelType = typeof fuelTypes[ number ]
    export const fuelTypes = [
        'Gasoline',
        'Hybrid',
        'E-85',
        'Electric',
        'Diesel',
    ] as const

    export type Transmission = typeof transmissions[ number ]
    export const transmissions = [
        'Automatic',
        'Manual',
    ] as const

    export type Drivetrain = typeof drivetrains[ number ]
    export const drivetrains = [
        'FWD',
        'AWD',
        'RWD',
        '4WD',
    ] as const

    export module Body {

        export type Color = typeof colors[ number ]
        export const colors = [
            'Black', // #000000
            'Blue', // #0047FF
            'Brown', // #b45f06
            'Burgundy', // #990000
            'Gold', // #D4AF37
            'Green', // #228C22
            'Grey', // #444444
            'Orange', // #FF6700
            'Red', // #DA2121
            'Silver', // #AAAAAA
            'White', // #FFFFFF
            'Yellow', // #FFEF00
        ] as const

        export type Style = typeof styles[ number ]
        export const styles = [
            'Coupe',
            'Sedan',
            'Hatchback',
            'Van',
            'SUV',
            'Truck',
        ] as const
    }

}