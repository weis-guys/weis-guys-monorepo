import { LooseAutocomplete, DB } from '@weis-guys/ts-utils'
import { Damage } from './Damage'
import { Expense } from './Expense'
import { Acquired } from './Acquired'
import { Owner } from './Owner'
import { Sale } from './Sale'
import { Specs } from './Specs'
import { Title } from './Title'
import { Vehicle } from './Vehicle'
import { StatusGroups } from './StatusGroup'
import { Listing } from './Listing'
import { ExternalLink } from './ExternalLink'

export type CarSnapshotDoc = DB.Doc_v2<CarSnapshot>

export type CarSnapshot = {
    readonly lotNumber?: string
    readonly vin?: string

    readonly year?: number
    readonly make?: LooseAutocomplete<Vehicle.Make>
    readonly model?: string
    readonly trim?: string
    readonly owner?: LooseAutocomplete<Owner.Name>
    readonly notes?: string

    readonly specs?: Specs
    readonly title?: Title
    readonly acquired?: Acquired
    readonly listing?: Listing
    readonly sale?: Sale

    readonly damages?: Damage[]
    readonly externalLinks?: ExternalLink[]
    readonly expenses?: Expense[]

    readonly statusGroups?: StatusGroups
}