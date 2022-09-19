import { LooseAutocomplete, subtractionCalc } from '@weis-guys/ts-utils'
import { durationCalc, PlainDateString } from '@weis-guys/date'
import { Investment } from './Investment'
import { CarSnapshot } from '.'

export type Sale = {
    readonly date?: PlainDateString
    readonly leadSource?: LooseAutocomplete<Sale.LeadSource>
    readonly gross?: number
    readonly price?: number
    readonly customer?: Sale.Customer
}

export module Sale {

    // TODO add other info for Purchase Worksheet
    export type Customer = {
        readonly name?: string
        readonly phone?: string
        readonly email?: string
        readonly postSaleEmailDate?: PlainDateString
        readonly notes?: string
    }

    export type CalcData = {
        readonly daysOnMarket?: number
        readonly profit?: number
        readonly priceDiffFromListing?: number
    }

    export function getCalcData ( car: CarSnapshot ): CalcData {
        const totalInvestment = Investment.getTotal( car )
        const { sale, listing } = car

        return {
            daysOnMarket: durationCalc( listing?.date, sale?.date ?? 'now' )?.days,
            profit: subtractionCalc( sale?.gross, totalInvestment ),
            priceDiffFromListing: subtractionCalc( sale?.price, listing?.price ),
        }
    }

    export type LeadSource = typeof leadSources[ number ]
    export const leadSources = [
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