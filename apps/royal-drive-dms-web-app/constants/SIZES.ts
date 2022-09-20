import { makeCSSProperties } from '../lib/makeCSSProperties'

export const SIZES = {

    appBar: makeCSSProperties( {
        height: 50,
    } as const ),

    pageArea: makeCSSProperties( {
        maxWidth: 1500,
    } as const ),

} as const