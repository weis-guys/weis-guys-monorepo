import { getAppConfig, pretty } from '@weis-guys/ts-utils'
import axios from 'axios'
import { useRouter } from 'next/router'

const appConfig = getAppConfig( 'nextjs' )

axios( '/api/db?action=find&collection=users', {
    method: 'POST',
    data: {
        // email: { $regex: 'gmail.com' },
        // email: { $regex: 'imready' },
        $regex: 'imready'
    },
} )
    // axios( '/api/db?action=add&collection=users', {
    //     method: 'POST',
    //     data: {
    //         name: {
    //             first: 'Spongebob',
    //             last: 'Squarepants',
    //         },
    //         age: 25,
    //         email: 'imready@gmail.com',
    //     },
    // } )
    .then( res => console.log( pretty( res.data ) ) )

export default function Page () {
    const router = useRouter()
    return <>
        <h1>{appConfig.name}{router.pathname}</h1>
    </>
}
