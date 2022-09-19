import type { PlainDateString } from '@weis-guys/date'

export type StatusGroup = {
    readonly id?: string
    readonly date?: PlainDateString
}
export type StatusGroups = Record<string, StatusGroup>