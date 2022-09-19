import { pretty } from '@weis-guys/ts-utils'
import { makeApiHandler } from '../../lib/ApiHandler'

export type ApiRouteConfig = {
    path?: string
    description?: string
}

const apiRouteConfigs: ApiRouteConfig[] = Object.entries( {
    '/api': {
        description: 'Get all API routes',
    },
    '/api/cars': {
        description: 'Get all cars',
    },
    '/api/users': {
        description: 'Get all users',
    },
} ).map( ( [ path, config ] ) => ( { path, ...config } ) )

export default makeApiHandler( ( req, res ) => {
    res.status( 200 ).send( pretty( apiRouteConfigs ) )
} )