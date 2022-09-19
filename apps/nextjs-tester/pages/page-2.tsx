import Header from '../components/Header'

export default function Page () {
    const title = 'Page 2'
    return <>
        <Header title={title} />
        <h1>{title}</h1>
    </>
}