import Head from 'next/head'
import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { useStore } from 'zustand'
import { LayoutComponent } from '.'
import { MatIcon } from '../components/MatIcon'
import { NavLinkButton } from '../components/NavLink'
import { ToggleButton } from '../components/ToggleButton'
import { APP } from '../constants/APP'
import { COLORS } from '../constants/COLORS'
import { GUIDES } from '../constants/GUIDES'
import { NAV_LINKS } from '../constants/NAV_LINKS'
import { SIZES } from '../constants/SIZES'
import { combineClassNames } from '../lib/combineClassNames'
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

            <ProfileIconButton className={styles.lg} style={{ justifySelf: 'right' }} />

            <SideNav>
                <NavLinkButtons
                    context='sideNav'
                    className={styles.SideNav_NavLinkButtons}
                    onClick={close} />
            </SideNav>

        </div>
    </div>
}

const PageArea: FC<{ children: any }> = ( { children } ) =>
    <div className='PageArea' style={{
        backgroundColor: GUIDES.shadedAreas ? 'rgba(255, 255, 255, .1)' : '',
        margin: '0 auto',
        maxWidth: SIZES.pageArea.maxWidth,
        marginTop: SIZES.appBar.height,
        padding: 10,
    }}>
        {children}
    </div>

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

const ProfileIconButton: FC<{ style: CSSProperties, className?: string }> =
    ( { style, ...props } ) => <div className={combineClassNames( [
        props.className,
        styles.Profile,
    ] )} style={style}>
        <NavLinkButton className='btn primary matIcon circle' href='/profile'>
            <MatIcon>account_circle</MatIcon>
        </NavLinkButton>
    </div>

const Nav: FC<{ style: CSSProperties }> = ( { style } ) => {
    const close = useStore( sideNavStore, x => x.close )
    const isOpen = useStore( sideNavStore, x => x.isOpen )
    const toggle = useStore( sideNavStore, x => x.toggle )

    return <nav style={{
        ...style,
        display: 'flex',
        gap: 5,
    }}>

        <ToggleButton
            className={combineClassNames( [
                styles.md,
                styles.sm,
            ] )}
            active={isOpen}
            toggle={toggle}
            matIcon='menu' />

        <NavLinkButtons
            context='appBar'
            className={styles.AppBar_NavLinkButtons}
            onClick={close} />

        {/* <SideNav>
            <NavLinkButtons
                context='sideNav'
                className={styles.SideNav_NavLinkButtons}
                onClick={close} />
        </SideNav> */}

    </nav>
}

const SideNav: FC<{ children: any }> = ( { children } ) => {
    const isOpen = useStore( sideNavStore, x => x.isOpen )
    const close = useStore( sideNavStore, x => x.close )

    return <div className={styles.SideNav}>

        <div
            onClick={close}
            className='OutsideOfSideNavArea' style={{
                display: isOpen ? 'block' : 'none',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: SIZES.appBar.height,
                left: 0,
                backgroundColor: 'rgba(255,255,255,0.5)',
            }}></div>

        <div
            className='SideNavArea'
            style={{
                display: isOpen ? 'block' : 'none',
                position: 'fixed',
                top: SIZES.appBar.height,
                left: 0,
                backgroundColor: COLORS.bgColorSecondary,
                padding: 10,
                height: '100vh',
                minWidth: 200,
            }}>
            {children}
        </div>

    </div>
}

const NavLinkButtons: FC<{
    context: 'appBar' | 'sideNav',
    className?: string,
    onClick?: () => void
}> = ( { onClick, className, context } ) => {
    return <div className={combineClassNames( [
        className,
        styles.md,
        styles.navLinkButtons,
    ] )}>
        {NAV_LINKS
            .map( ( { href, title, matIcon, showInAppBar } ) => {
                return <NavLinkButton
                    className={combineClassNames( [
                        context == 'appBar' && showInAppBar == 'lg' && styles.lg,
                        context == 'appBar' && showInAppBar == 'md' && styles.md,
                        context == 'appBar' && !showInAppBar && 'hide',
                    ] )}
                    key={href}
                    href={href}
                    onClick={onClick}
                >
                    <MatIcon>{matIcon}</MatIcon>
                    {title}
                </NavLinkButton>
            } )}
    </div>
}




/* 
TODO
fix problems with links showing/hiding on the wrong screen sizes
*/


