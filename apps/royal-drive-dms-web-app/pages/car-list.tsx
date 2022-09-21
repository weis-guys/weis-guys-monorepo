import { MainLayout } from '../layouts/MainLayout'

export default MainLayout( props => {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
    }}>
        <h1>{props.pageTitle}</h1>
        <p>Not ready yet</p>
    </div>
} )