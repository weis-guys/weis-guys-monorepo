import '../global.scss'
import '../breakpoints.scss'

import { useRouter } from 'next/router'
import { getDefaultPageTitle } from '../lib/getDefaultPageTitle'

export default function _App ( { Component, pageProps } ) {
    const router = useRouter()

    /* set default props */
    pageProps = {
        pageTitle: getDefaultPageTitle( router.pathname ),
        ...pageProps,
    }

    return <Component {...pageProps} />
}