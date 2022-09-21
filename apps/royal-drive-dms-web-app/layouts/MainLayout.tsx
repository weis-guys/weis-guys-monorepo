import Head from 'next/head'
import { CSSProperties, FC } from 'react'
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
import { useSearch } from '../lib/useSearch'
import { sideNavStore } from '../stores/sideNavStore'
import styles from './MainLayout.module.scss'

export const MainLayout: LayoutComponent = component => props => {
    const headerTitle = [
        props.pageTitle,
        APP.shortTitle,
    ].filter( Boolean ).join( ' | ' )

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        minWidth: 320,
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
        <div
            className={styles.appBarContainer}
            style={{
                maxWidth: SIZES.pageArea.maxWidth,
                backgroundColor: GUIDES.shadedAreas ? 'rgba(255, 255, 255, .2)' : '',
            }}>
            <Nav style={{ justifySelf: 'left' }} />

            <Search style={{ justifySelf: 'center' }} />

            <ProfileIconButton style={{ justifySelf: 'right' }} />
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
    const [ search, searchSet ] = useSearch()

    return <input className='darken' type='text' placeholder='Search'
        value={search}
        onChange={e => searchSet( e.target.value )}
        style={{
            ...style,
            padding: 10,
            width: '100%',
            height: '100%',
            border: 'none',
            fontSize: 16,
        }}
    />
}

const ProfileIconButton: FC<{ style: CSSProperties }> = ( { style } ) =>
    <div className='md+' style={style}>
        <NavLinkButton className='btn primary matIcon circle' href='/profile'>
            <MatIcon>account_circle</MatIcon>
        </NavLinkButton>
    </div>

const Nav: FC<{ style: CSSProperties }> = ( { style } ) => {
    const close = useStore( sideNavStore, x => x.close )
    const isOpen = useStore( sideNavStore, x => x.isOpen )
    const toggle = useStore( sideNavStore, x => x.toggle )

    return <nav>
        <div style={{
            ...style,
            display: 'flex',
            placeItems: 'center',
            gap: 5,
        }}>
            <ToggleButton active={isOpen} toggle={toggle} className='md-' matIcon='menu' />
            <NavLinkButtons context='appBar' onClick={close} />
        </div>
        <div>
            <SideNav>
                <NavLinkButtons context='sideNav' onClick={close} />
            </SideNav>
        </div>
    </nav>
}

const SideNav: FC<{ children: any }> = ( { children } ) => {
    const isOpen = useStore( sideNavStore, x => x.isOpen )
    const close = useStore( sideNavStore, x => x.close )

    return <div className='md-'>

        <div
            onClick={close}
            className='OutsideOfSideNavArea' style={{
                display: isOpen ? 'block' : 'none',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                cursor: 'pointer',
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
                padding: '5px 0',
                height: '100vh',
                minWidth: 200,
            }}>
            {children}
        </div>

    </div>
}

const NavLinkButtons: FC<{
    context: 'appBar' | 'sideNav',
    onClick?: () => void
}> = ( { onClick, context } ) => {
    return <div
        data-context={context}
        className={combineClassNames( [
            context == 'appBar' && 'md+',
            styles.navLinkButtons,
        ] )}>
        {NAV_LINKS
            .map( ( { href, title, matIcon, appBarCtxClass, sideNavCtxClass } ) => {
                return <NavLinkButton
                    data-context={context}
                    className={combineClassNames( [
                        context == 'appBar' && appBarCtxClass,
                        context == 'sideNav' && sideNavCtxClass,
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