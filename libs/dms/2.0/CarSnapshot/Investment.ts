import { CarSnapshot } from '.'
import { Expenses } from './Expense'

export module Investment {
    export const getTotal = ( car: CarSnapshot ) => {
        const acquiredPrice = car.acquired?.price ?? 0
        const expensesTotal = Expenses.getTotalPrice( car.expenses ?? [] )
        return acquiredPrice + expensesTotal
    }
}