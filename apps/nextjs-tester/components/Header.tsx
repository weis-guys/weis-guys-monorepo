import Head from 'next/head'
import Links from './Links'

export default function Header ( { title }: { title: string } ) {
    return <>
        <Head>
            <title>{title}</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Links />
        <hr />
    </>
}