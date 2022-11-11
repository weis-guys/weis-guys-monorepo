const { version, name, title } = require( './package.json' )
const transpiledDeps = require( 'next-transpile-modules' )( [
    '@weis-guys/ui',
    '@weis-guys/jyst',
    '@weis-guys/ts-utils',
    '@weis-guys/freerstore',
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
                destination: '/jyst',
                permanent: false,
            },
        ]
    },
}