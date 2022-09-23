import '../global.scss'
import '../breakpoints.scss'

import { useRouter } from 'next/router'
import { getDefaultPageTitle } from '../lib/getDefaultPageTitle'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Temporal } from '@js-temporal/polyfill'

export const queryClient = new QueryClient(
    // {
    //     defaultOptions: {
    //         queries: {
    //             cacheTime: Temporal.Duration.from( { minutes: 5 } ).milliseconds,
    //             // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    //         },
    //     },
    // }
)

export default function _App ( { Component, pageProps } ) {
    const router = useRouter()

    /* set default props */
    pageProps = {
        pageTitle: getDefaultPageTitle( router.pathname ),
        ...pageProps,
    }

    // return <Component {...pageProps} />
    return <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
}