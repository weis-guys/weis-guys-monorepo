import { pretty } from '@weis-guys/ts-utils'
import { makeApiHandler } from '../../lib/ApiHandler'
import { users } from '../../sampleData/users'

export default makeApiHandler( ( req, res ) => {
    res.status( 200 ).send( pretty( users ) )
} )