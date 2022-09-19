import { getNextJSRuntimeConfig } from './nextjs/NextJSRuntimeConfig'

export type AppConfig = {
    name: string
    version: string
    title?: string
}

type AppType = typeof AppTypes[ number ]
const AppTypes = [
    'nextjs',
] as const

export function getAppConfig ( appType: AppType ): AppConfig {
    switch ( appType ) {
        case 'nextjs': return getNextJSRuntimeConfig()

        default: throw new Error( `\
appType '${ appType }' is not supported.
please choose one of the supported appTypes:
${ AppTypes.map( ( appType ) => ` - ${ appType }` ).join( '\n' ) }
` )

    }
}