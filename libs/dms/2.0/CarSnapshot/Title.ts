export type Title = {
    readonly status?: Title.Status
    readonly number?: string
    readonly notes?: string

    readonly location?: Title.Location
    readonly salvageStatus?: Title.Salvage.Status
}

export module Title {
    // export type Status = typeof statuses[ number ] | 'Prior Salvage'
    export type Status = typeof statuses[ number ]
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