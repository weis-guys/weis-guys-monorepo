import { Pretty } from '@weis-guys/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Links () {
    const router = useRouter()

    return <>
        <Pretty data={router} />
        <ul>
            <li><h2><Link href="/">Home</Link></h2></li>
            <li><h2><Link href="/page-2">Page 2</Link></h2></li>
            <li><h2><Link href="/foo">Foo</Link></h2></li>
            <li><h2><Link href="/bar">Bar</Link></h2></li>
        </ul>
    </>
}