import Head from 'next/head'
import { CSSProperties, FC, useState } from 'react'
import { useStore } from 'zustand'
import { LayoutComponent } from '.'
import { NavLinkButton } from '../components/NavLink'
import { ToggleButton } from '../components/ToggleButton'
import { APP } from '../constants/APP'
import { COLORS } from '../constants/COLORS'
import { GUIDES } from '../constants/GUIDES'
import { NAV_LINKS } from '../constants/NAV_LINKS'
import { SIZES } from '../constants/SIZES'
import { useClickOutsideHandler } from '../lib/useClickOutsideHandler'
import { sideNavStore } from '../stores/sideNavStore'
import styles from './MainLayout.module.scss'

export const MainLayout: LayoutComponent = component => props => {
    const headerTitle = [
        props.pageTitle,
        APP.shortTitle,
    ].filter( Boolean ).join( ' | ' )

    return <div className={styles.MainLayout} style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: 300,
        backgroundColor: COLORS.bgColorPrimary,
    }}>

        <Head><title>{headerTitle}</title></Head>

        {GUIDES.centerLine && <div className='centerLine-container'>
            <div className='centerLine'></div>
        </div>}

        <AppBar />

        <PageArea>{component( props )}</PageArea>

    </div>
}

const AppBar = () => {
    return <div style={{
        backgroundColor: COLORS.colorPrimary,
        height: SIZES.appBar.height,
        width: '100%',
        position: 'fixed',
        display: 'grid',
        placeItems: 'center',
    }}>
        <div className={styles.appBarContainer} style={{
            maxWidth: SIZES.pageArea.maxWidth,
            backgroundColor: GUIDES.shadedAreas ? 'rgba(255, 255, 255, .2)' : '',
        }}>
            <Nav style={{ justifySelf: 'left' }} />
            <Search style={{ justifySelf: 'center' }} />
            <Profile style={{ justifySelf: 'right' }} />
        </div>
    </div>
}

const PageArea: FC<{ children: any }> = ( { children } ) => {
    return <div className='PageArea' style={{
        backgroundColor: GUIDES.shadedAreas ? 'rgba(255, 255, 255, .1)' : '',
        margin: '0 auto',
        maxWidth: SIZES.pageArea.maxWidth,
        marginTop: SIZES.appBar.height,
        padding: 10,
    }}>
        {children}
    </div>
}

const Search: FC<{ style: CSSProperties }> = ( { style } ) => {
    const [ search, searchSet ] = useState( '' )
    // const [ search, searchSet ] = useState( 'hello how are you?' )

    // TODO make search history/results popup under search bar

    return <input className='Search' type='text' placeholder='Search'
        value={search}
        onChange={e => searchSet( e.target.value )}
        style={{
            ...style,
            padding: 10,
            width: '100%',
            height: '100%',
            border: 'none',
            fontSize: 16,
            backgroundColor: COLORS.colorPrimaryDarker,
        }}
    />
}

const Profile: FC<{ style: CSSProperties }> = ( { style } ) => {
    return <div className='Profile' style={style}>
        <NavLinkButton className='btn primary icon circle' href='/profile'>
            <span className='material-symbols-outlined'>account_circle</span>
        </NavLinkButton>
    </div>
}

const Nav: FC<{ style: CSSProperties }> = ( { style } ) => {
    const close = useStore( sideNavStore, x => x.close )

    return <nav style={style}>

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
    const sideNavRef = useClickOutsideHandler( close )

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