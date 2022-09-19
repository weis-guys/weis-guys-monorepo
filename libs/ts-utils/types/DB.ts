export module DB {

    export type Doc_v1<Data> = HasID & Data & {
        readonly metadata: DB.Doc.Metadata
    }

    export type Doc_v2<Data> = HasID & {
        readonly data: Data
        readonly metadata: DB.Doc.Metadata
    }

    export type HasID = { readonly id: string }

    export module Doc {
        export type Metadata = {
            readonly modified: Date
            readonly archived?: boolean
        }
    }

}