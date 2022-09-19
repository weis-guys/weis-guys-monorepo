const { version, name } = require( './package.json' )
const transpiledDeps = require( 'next-transpile-modules' )( [
    '@weis-guys/ui',
    '@weis-guys/ts-utils',
] )

module.exports = {
    publicRuntimeConfig: {
        name,
        version,
    },
    ...transpiledDeps( {
        reactStrictMode: true,
    } ),
}