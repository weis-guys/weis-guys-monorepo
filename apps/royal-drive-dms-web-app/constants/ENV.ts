const devENV = {
    name: 'dev',
    isProd: false,
    isDev: true,
}

const prodENV = {
    name: 'prod',
    isProd: true,
    isDev: false,
}

export const ENV = ( () => {
    const { NODE_ENV } = process.env
    if ( NODE_ENV == 'development' ) return devENV
    if ( NODE_ENV == 'production' ) return prodENV
    return devENV
} )()