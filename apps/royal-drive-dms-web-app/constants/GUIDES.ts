import { ENV } from './ENV'

export const GUIDES = {

    // centerLine: false,
    centerLine: ENV.isDev,

    shadedAreas: false,
    // shadedAreas: ENV.isDev,

} as const