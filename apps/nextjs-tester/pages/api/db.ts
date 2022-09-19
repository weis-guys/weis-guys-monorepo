import { NextApiHandler } from 'next'
import { MongoClient } from 'mongodb'

const dbClient = new MongoClient( process.env.MONGODB_URL ?? '', {} )

const handler: NextApiHandler = async ( req, res ) => {
    res.status( 200 ).json( {
        query: req.query,
        body: req.body,
    } )
    return

    const { action, collection } = req.query as {
        action: 'add' | 'find'
        collection: 'users'
    }

    switch ( action ) {
        case 'add':
            const resData = await dbClient
                .db( process.env.MONGODB_DB )
                .collection( collection )
                .insertOne( req.body )

            res.status( 200 ).json( {
                query: req.query,
                body: req.body,
                resData
            } )

            return

        case 'find':
            const docs = await dbClient
                .db( process.env.MONGODB_DB )
                .collection( collection )
                .find( req.body )
                .toArray()

            res.status( 200 ).json( {
                query: req.query,
                body: req.body,
                docs
            } )

            return

        default:
            break
    }

}

export default handler