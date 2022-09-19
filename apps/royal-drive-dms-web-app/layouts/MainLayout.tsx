import Head from 'next/head'
import { FC, MutableRefObject } from 'react'
import { useStore } from 'zustand'
import { LayoutComponent } from '.'
import { NavLinkButton } from '../components/NavLink'
import { ToggleButton } from '../components/ToggleButton'
import { APP } from '../constants/APP'
import { COLORS } from '../constants/COLORS'
import { NAV_LINKS } from '../constants/NAV_LINKS'
import { SIZES } from '../constants/SIZES'
import { useOutsideAlerter } from '../lib/useOutsideAlerter'
import { sideNavStore } from '../stores/sideNavStore'
import styles from './MainLayout.module.scss'

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
            backgroundColor: COLORS.bgColorPrimary,
        }}>
            <Head>
                <title>{headerTitle}</title>
            </Head>

            <div className={styles.appBar} style={{
                backgroundColor: COLORS.colorPrimary,
                height: SIZES.appBar.height,
            }}>
                <Nav />
                <div className='SearchAndProfile'>
                    <div className='Search'>
                        <input type='text' placeholder='Search' />
                    </div>
                    <div className='Profile'>
                        Profile Button
                    </div>
                </div>
            </div>

            <div className='pageArea' style={{
                margin: '0 auto',
                maxWidth: SIZES.pageArea.maxWidth,
                backgroundColor: 'rgba(255, 255, 255, .2)',
                padding: 10,
            }}>
                {component( props )}
            </div>

        </div>
    }
}

export const Nav = () => {
    const close = useStore( sideNavStore, x => x.close )

    return <nav>

        <div className={styles.largeScreen}>
            <NavLinkButtons onClick={close} />
        </div>

        <div className={styles.smallScreen}>
            <SideNav>
                <NavLinkButtons onClick={close} />
            </SideNav>
        </div>

    </nav>
}

const SideNav: FC<{ children: any }> = ( { children } ) => {
    const isOpen = useStore( sideNavStore, x => x.isOpen )
    const toggle = useStore( sideNavStore, x => x.toggle )
    const close = useStore( sideNavStore, x => x.close )
    const sideNavRef = useOutsideAlerter( close )

    return <>
        <div style={{
            display: isOpen ? 'block' : 'none',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: SIZES.appBar.height,
            left: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
        }}></div>
        <div ref={sideNavRef}>
            <ToggleButton active={isOpen} toggle={toggle} icon='menu' />

            {isOpen && <div style={{
                top: SIZES.appBar.height,
                backgroundColor: COLORS.bgColorSecondary,
                position: 'fixed',
                left: 0,
                padding: 10,
                height: '100vh',
                minWidth: 200,
                // boxShadow: '10px 10px 10px 0 rgba(0,0,0,0.5)',
            }}>
                {children}
            </div>}
        </div>
    </>
}

const NavLinkButtons: FC<{ onClick?: () => void }> = ( { onClick } ) =>
    <div className={styles.navLinkButtons}>
        {NAV_LINKS.map( ( { href, title } ) =>
            <NavLinkButton key={href} href={href} onClick={onClick}>
                {title}
            </NavLinkButton>
        )}
    </div>