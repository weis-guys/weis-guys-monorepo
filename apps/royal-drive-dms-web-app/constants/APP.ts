import { getAppConfig, pretty } from '@weis-guys/ts-utils'
import { startCase } from 'lodash'
import { ENV } from './ENV'

export const APP = ( () => {
    const APP = getAppConfig( 'nextjs' )

    const title = APP.title
    const version = APP.version
    const shortTitle = `DMS ${ version }`
    const fullTitle = `${ title } ${ version }`
    const fullTitleAndEnv = `${ fullTitle } : ${ startCase( ENV.name ) }`
    return {
        title,
        version,
        shortTitle,
        fullTitle,
        fullTitleAndEnv,
    } as const
} )()

logAppInfo()
function logAppInfo () {
    console.groupCollapsed( APP.fullTitleAndEnv )
    console.info( pretty( { ENV, appConfig: APP } ) )
    console.groupEnd()
}