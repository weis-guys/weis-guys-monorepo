import { Html, Head, Main, NextScript } from 'next/document'

export default function Document () {
    return (
        <Html>
            <Head>
                <link rel='icon' type='image/x-icon' href='/static/favicon.ico' />
                <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,1,0' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}