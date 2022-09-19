import { durationCalc, PlainDateString } from '@weis-guys/date'
import { subtractionCalc, divisionCalc } from '@weis-guys/ts-utils'
import { CarSnapshot } from '.'
import { Investment } from './Investment'

export type Listing = {
    readonly date?: PlainDateString
    readonly price?: number
    readonly profitMargin?: number
    readonly odometer?: number
}

export module Listing {
    export type CalcData = {
        readonly totalBudget?: number
        readonly expensesBudget?: number
        readonly remainingBudget?: number
        readonly netProfit?: number
        readonly projectedProfit?: number
        readonly daysReadying?: number
    }

    export function getCalcData ( car: CarSnapshot ): CalcData {
        const totalInvestment = Investment.getTotal( car )
        const totalBudget = divisionCalc( car.listing?.price, car.listing?.profitMargin )
        return {
            totalBudget,
            expensesBudget: subtractionCalc( totalBudget, car.acquired?.price ),
            remainingBudget: subtractionCalc( totalBudget, totalInvestment ),
            netProfit: subtractionCalc( car.listing?.price, totalInvestment ),
            projectedProfit: subtractionCalc( car.listing?.price, totalBudget ),
            daysReadying: durationCalc( car.acquired?.date, car.listing?.date )?.days,
        }
    }
}