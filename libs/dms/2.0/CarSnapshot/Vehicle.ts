export module Vehicle {
    export type VehicleMakeAlias = keyof typeof VehicleMakeAliases
    export const VehicleMakeAliases = {
        CHEVY: 'CHEVROLET',
        CADDY: 'CADILLAC',
    }

    export type Make = typeof Makes[ number ]
    export const Makes = [
        'ACURA',
        'AUDI',
        'BENTLEY',
        'BMW',
        'BUGATTI',
        'BUICK',
        'CADILLAC',
        'CHEVROLET',
        'CHRYSLER',
        'DODGE',
        'FERRARI',
        'FIAT',
        'FORD',
        'GMC',
        'HONDA',
        'HUMMER',
        'HYUNDAI',
        'INFINITI',
        'ISUZU',
        'JAGUAR',
        'JEEP',
        'KIA',
        'LAMBORGHINI',
        'LAND ROVER',
        'LEXUS',
        'LOTUS',
        'MASERATI',
        'MAZDA',
        'MCLAREN',
        'MERCEDES-BENZ',
        'MERCURY',
        'MINI',
        'MITSUBISHI',
        'NISSAN',
        'PONTIAC',
        'PORSCHE',
        'ROLLS-ROYCE',
        'SAAB',
        'SATURN',
        'SMART',
        'STEHL',
        'SUBARU',
        'SUZUKI',
        'TESLA',
        'TOYOTA',
        'VOLKSWAGEN',
        'VOLVO',
    ] as const
}