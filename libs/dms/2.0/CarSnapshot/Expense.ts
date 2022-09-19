import { PlainDateString } from '@weis-guys/date'

export type Expense = {
    readonly date?: PlainDateString
    readonly expectedDate?: PlainDateString

    readonly type?: Expense.Type
    readonly price?: number
    readonly company?: string
    readonly partType?: string
    readonly checkNumber?: string
    readonly notes?: string

    // readonly author?: User
    /* TODO
        enable tracking of who created the expense
        so then we can allow users to add/edit their own expenses
        without giving them access to expenses from other users
        all while allowing managers to edit all expenses
    */
}

export module Expense {
    export type Type = typeof types[ number ]
    export const types = [
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

export module Expenses {
    export const getTotalPrice = ( expenses: Expense[] ) =>
        expenses.reduce( ( acc, x ) => acc + ( x.price ?? 0 ), 0 ) ?? 0
}