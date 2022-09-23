const devENV = {
    name: 'dev',
    isProd: false,
    isDev: true,
} as const

const prodENV = {
    name: 'prod',
    isProd: true,
    isDev: false,
} as const

export type ENV = typeof ENV
export const ENV = ( () => {
    const { NODE_ENV } = process.env
    if ( NODE_ENV == 'development' ) return devENV
    if ( NODE_ENV == 'production' ) return prodENV
    return devENV
} )()