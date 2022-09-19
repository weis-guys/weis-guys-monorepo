import { Miles, Dollars, USA, DB } from '@weis-guys/ts-utils'
import { Vehicle } from '../2.0/CarSnapshot/Vehicle'

export type CarDoc = DB.Doc_v1<Car>

export type Car = {
    readonly vin?: string
    readonly deleted?: boolean

    readonly year?: number
    readonly make?: Vehicle.Make | string
    readonly model?: string
    readonly trim?: string

    readonly acquisitions?: {
        readonly notes?: string
        readonly weblink?: string
        readonly googleDriveLink?: string
        readonly odometer?: Miles
        readonly lotNumber?: string
        readonly damages?: Damage.Type[]
        readonly owner?: Owner.Name

        readonly specs?: {
            readonly color?: Specs.Body.Color
            readonly colorCode?: string
            readonly bodyStyle?: Specs.Body.Style
            readonly drivetrain?: Specs.Drivetrain
            readonly transmission?: Specs.Transmission
            readonly cylinders?: number
            readonly fuelType?: Specs.FuelType
        }

        readonly title?: {
            readonly status?: Title.Status
            readonly location?: Title.Location
            readonly number?: string
            readonly notes?: string

            readonly salvageStatus?: Title.Salvage.Status
            // todo: this.status == 'Salvage' ? this.data?.salvageStatus : undefined
        }

        readonly acquired?: {
            readonly from?: Acquired.From | string
            readonly state?: USA.StateAbbreviation
            readonly price?: Dollars
            readonly date?: Date
        }

        readonly repairs?: {
            readonly notes?: string
            readonly priority?: Repairs.Priority
        }

        readonly expenses?: {
            readonly date?: Date
            readonly expectedDate?: Date

            readonly type?: Expense.Type
            readonly price?: Dollars
            readonly company?: string
            readonly partType?: string
            readonly checkNumber?: string
            readonly notes?: string
        }[]

        readonly listing?: {
            readonly date?: Date
            readonly price?: Dollars
            readonly profitMargin?: number
        }

        readonly sale?: {
            readonly date?: Date
            readonly from?: Sale.From
            readonly gross?: number
            readonly price?: number
            readonly customer?: {
                readonly name?: string
                readonly phone?: string
                readonly email?: string
                readonly postSaleEmail?: Date
                readonly notes?: string
            }
            readonly purchaseWorksheet?: {
                readonly vehicle: {
                    readonly depositDate: Date
                    readonly deposit: number
                    readonly salesperson: string
                }
                readonly trade: {
                    readonly year: number
                    readonly make: string
                    readonly model: string
                    readonly trim: string
                    readonly vin: string
                    readonly lic: string
                    readonly mileage: number
                    readonly color: string
                    readonly price: number
                }
                readonly buyer1: {
                    readonly firstName: string
                    readonly middleName: string
                    readonly lastName: string
                    readonly address: string
                    readonly city: string
                    readonly state: string
                    readonly zip: number
                    readonly driversLicense: string
                    readonly dateOfBirth: Date
                    readonly phone: string
                    readonly email: string
                }
                readonly buyer2: {
                    readonly firstName: string
                    readonly middleName: string
                    readonly lastName: string
                    readonly address: string
                    readonly city: string
                    readonly state: string
                    readonly zip: number
                    readonly driversLicense: string
                    readonly dateOfBirth: Date
                    readonly phone: string
                    readonly email: string
                }
                readonly additionalInfo: {
                    readonly lienHolder: string
                    readonly lienAddress: string
                    readonly lienCity: string
                    readonly lienState: string
                    readonly lienZip: number

                    readonly creditCardNumber: string
                    readonly creditCardExpDate: Date
                    readonly creditCardHolderZip: number
                    readonly creditCardSecurityCode: string

                    readonly insuranceCompany: string
                    readonly insurancePolicyNumber: string
                    readonly insuranceExpirationDate: Date

                    readonly licenseFee: Dollars
                }
            }
        }

        readonly statusGroups?: {
            readonly work: {
                readonly id?: Status.WorkID
                readonly date?: Date
            }
            readonly sale: {
                readonly id?: Status.SaleID
                readonly date?: Date
            }
        }
    }[]
}

module Status {
    export type WorkID = typeof workIDs[ number ]
    const workIDs = [
        'unassigned',
        'inTransit',
        'onsiteRepairs',
        'offsiteRepairs',
        'detailing',
    ] as const

    export type SaleID = typeof saleIDs[ number ]
    const saleIDs = [
        'unlisted',
        'listed',
        'deposit',
        'sold',
    ] as const
}

module Owner {
    export type Name = typeof names[ number ]
    const names = [
        'Royal Drive',
        'Ken Worden',
    ] as const
}

module Specs {

    export type FuelType = typeof fuelTypes[ number ]
    export const fuelTypes = [
        'Gas',
        'E-85',
        'Hybrid',
        'Electric',
        'Other',
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

module Title {
    export type Status = typeof statuses[ number ] | 'Prior Salvage'
    export const statuses = [
        'Clean',
        'Salvage',
        'Rebuilt',
    ] as const

    export module Salvage {
        export type Status = typeof statuses[ number ]
        export const statuses = [
            'Not Arrived',
            'Submitted to DMV',
            'Prep for Inspection',
            'Ready to Inspect',
            'Inspected',
        ] as const
    }

    export type Location = typeof locations[ number ]
    export const locations = [
        'At the auction',
        'At the lot',
        'With the state',
    ] as const
}

module Damage {
    export type Type = typeof Types[ number ]
    export const Types = [
        'All-Over',
        'Burn',
        'Front',
        'Hail',
        'Minor',
        'Normal',
        'Odometer',
        'Rear',
        'Repo',
        'Roof',
        'Side',
        'Storm',
        'Theft',
        'Top',
    ] as const
}

module Acquired {
    export type From = typeof fromOptions[ number ]
    export const fromOptions = [
        'IAA',
        'Copart',
        'Trade-In',
        'Consignment',
        'Manheim',
        'Adesa',
        'Personal',
        'Wholesale',
    ] as const
}

module Repairs {
    export type Priority = typeof priorities[ number ]
    export const priorities = [
        'Top',
        'High',
        'Medium',
        'Low',
    ] as const

    export const getPriorityNumber = ( priority: Priority ) => {
        return priorities.slice().reverse().indexOf( priority )
    }
}

module Expense {
    export type Type = typeof Types[ number ]
    export const Types = [
        'Transport',
        'Part',
        'Floorplan',
        'Detail',
        'Labor',
        'Use Tax',
        'DMV',
        'Warranty',
    ] as const
}

module Sale {
    export type From = typeof fromOptions[ number ]
    export const fromOptions = [
        'CarGurus',
        'Craigslist',
        'Facebook',
        'Personal',
        'Return',
        'Walk-In',
        'Website',
        'Wholesale',
    ] as const
}