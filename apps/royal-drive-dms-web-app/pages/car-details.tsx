import { Pretty } from '@weis-guys/ui'
import { useRouter } from 'next/router'
import { MainLayout } from '../layouts/MainLayout'
import { cars } from '../sampleData/cars'

export default MainLayout( props => {
    const router = useRouter()

    const car = cars.find( car => car.vin === router.query.vin )

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
    }}>
        <h1>{props.pageTitle}</h1>
        <p>Not ready yet</p>
        <br />
        <p>VIN: {router.query.vin}</p>
        <Pretty>{car}</Pretty>
    </div>
} )