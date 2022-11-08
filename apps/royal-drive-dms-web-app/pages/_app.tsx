import '../global.scss'
import '../breakpoints.scss'

{/* <meta name="robots" content="noindex"> */ }

import { useRouter } from 'next/router'
import { getDefaultPageTitle } from '../lib/getDefaultPageTitle'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export default function _App ( { Component, pageProps } ) {
    const router = useRouter()

    /* set default props */
    pageProps = {
        pageTitle: getDefaultPageTitle( router.pathname ),
        ...pageProps,
    }

    return <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
    </QueryClientProvider>
}