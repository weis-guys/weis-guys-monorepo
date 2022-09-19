import { getAppConfig } from '@weis-guys/ts-utils'
import { Button } from '@weis-guys/ui'
import Header from '../components/Header'

const appConfig = getAppConfig( 'nextjs' )

export default function Page () {
    return <>
        <Header title={appConfig.name} />

        <h1>{appConfig.name}</h1>

        <Button />
        <Button children='hello' />
        <Button>hello</Button>

        <Button onClick={() => console.log( 'no name logger' )} />
        <Button onClick={() => console.log( 'named logger' )}>named logger</Button>
    </>
}
