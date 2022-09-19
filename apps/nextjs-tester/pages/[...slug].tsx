import { useRouter } from 'next/router'
import Header from '../components/Header'
import { startCase } from 'lodash'

export default function Page () {
    const router = useRouter()

    const { slug } = router.query
    if ( !slug || !slug.length ) return
    const title = startCase( Array.isArray( slug ) ? slug.join( ' ' ) : slug )

    return <>
        <Header title={title} />
        <h1>{title}</h1>
    </>
}