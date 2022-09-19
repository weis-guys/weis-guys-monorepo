import { startCase } from 'lodash'
import Head from 'next/head'
import Link from 'next/link'
import { LayoutComponent } from '.'
import { NavLinkButton } from '../components/NavLink'
import { NavLinkButtons } from '../components/NavLinkButtons'
import { APP } from '../constants/APP'
import { COLORS } from '../constants/COLORS'

export const MainLayout: LayoutComponent = component => {

    return props => {
        const headerTitle = [
            props.pageTitle,
            APP.shortTitle,
        ].filter( Boolean ).join( ' | ' )

        return <div className='MainLayout' style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            minWidth: 300,
            gap: 5,
            backgroundColor: COLORS.bgColorPrimary,
        }}>
            <Head>
                <title>{headerTitle}</title>
            </Head>

            <div className='appBar' style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0 10px',
                placeItems: 'center',
                gap: 5,
                height: 40,
                backgroundColor: COLORS.colorPrimary,
            }}>
                {/* <button className='menuButton'>
                    <span className='material-symbols-outlined'>menu</span>
                </button> */}

                <NavLinkButtons />

                <span className='flex-spacer'></span>
                {/* <h1 className='pageTitle'>{props.pageTitle}</h1> */}
                <span className='flex-spacer'></span>

            </div>

            {component( props )}

        </div>
    }
}