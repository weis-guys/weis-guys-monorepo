const { version, name, title } = require( './package.json' )
const transpiledDeps = require( 'next-transpile-modules' )( [
    '@weis-guys/ui',
    '@weis-guys/dms',
    '@weis-guys/ts-utils',
] )

module.exports = {
    publicRuntimeConfig: {
        name,
        version,
        title,
    },
    ...transpiledDeps( {
        // reactStrictMode: true,
    } ),
    async redirects () {
        return [
            {
                source: '/',
                destination: '/car-list',
                permanent: true,
            },
        ]
    },
}