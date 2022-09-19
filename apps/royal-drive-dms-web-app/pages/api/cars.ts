import { pretty } from '@weis-guys/ts-utils'
import { makeApiHandler } from '../../lib/ApiHandler'
import { cars } from '../../sampleData/cars'

export default makeApiHandler( ( req, res ) => {
    res.status( 200 ).send( pretty( cars ) )
} )