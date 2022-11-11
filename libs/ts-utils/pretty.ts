import { stringifyReplacer } from './stringify'

export const pretty = ( x: any, { spaces = 2 }: { spaces?: number | string } = {} ) =>
    JSON.stringify( x, stringifyReplacer(), spaces )

export const pretty1Line = ( value: any ) => pretty( value, { spaces: '' } )