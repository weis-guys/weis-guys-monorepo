export module Person {
    export type Name = {
        readonly first?: string
        readonly last?: string
        readonly alias?: string
    }

    export module Name {
        type WithFullAndDisplay = Person.Name & {
            readonly full?: string
            readonly display?: string
        }

        export function addFullAndDisplay ( name: Person.Name ): WithFullAndDisplay | undefined {
            if ( !name ) return

            const full = [ name.first, name.last ].filter( Boolean ).join( ' ' )

            const display = name.alias ?? [
                name.first,
                name.first ? name.last?.[ 0 ] : name.last,
            ].filter( Boolean ).join( ' ' )

            return { full, display, ...name }
        }
    }
}