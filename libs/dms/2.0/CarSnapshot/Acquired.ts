import { PlainDateString } from '@weis-guys/date'
import { LooseAutocomplete, USA } from '@weis-guys/ts-utils'

export type Acquired = {
    readonly from?: LooseAutocomplete<Acquired.From>
    readonly state?: USA.StateAbbreviation
    readonly price?: number
    readonly date?: PlainDateString
    readonly odometer?: number
}

export module Acquired {
    export type From = typeof FromOptions[ number ]
    export const FromOptions = [
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