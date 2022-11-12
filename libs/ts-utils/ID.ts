import { customAlphabet } from 'nanoid'
import { colorize } from '@weis-guys/ts-utils'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const sizeMap = {
    small: 16, // wlVYx48jCWQmFIyt
    default: 21, // aQjgQdlkEbvQJRgWJNkID
    large: 32, // efZzyaFTokKvOhDbFyt7t3dmB0RL3YPh
} as const

export const makeID = ( size: keyof typeof sizeMap = 'default' ) =>
    customAlphabet( alphabet )( sizeMap[ size ] )

export module ID {
    export const small = () => makeID( 'small' )
    export const large = () => makeID( 'large' )
}

export module IDTests {
    export function run () {
        console.clear()

        console.assert(
            ID.small().length === sizeMap.small,
            `id.small().length must === sizeMap.small (${ sizeMap.small })`
        )

        console.assert(
            makeID().length === sizeMap.default,
            `makeID().length must === sizeMap.default (${ sizeMap.default })`
        )

        console.assert(
            ID.large().length === sizeMap.large,
            `id.large().length must === sizeMap.large (${ sizeMap.large })`
        )

        console.log( colorize( 'green' )( 'idTests done' ) )
    }
}