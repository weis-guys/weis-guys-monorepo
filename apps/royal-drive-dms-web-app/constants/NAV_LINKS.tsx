import { getDefaultPageTitle } from '../lib/getDefaultPageTitle'
import { ScreenSizeClass } from '../lib/ScreenSizeClass'

type Config = {
    title?: string
    hide?: boolean
    appBarCtxClass?: ScreenSizeClass | 'hide'
    sideNavCtxClass?: ScreenSizeClass | 'hide'
    matIcon?: string
}

const navLinkConfigs: Record<string, Config> = {
    // '/car-details': {
    //     matIcon: 'directions_car',
    // },
    '/car-list': {
        matIcon: 'view_list',
        appBarCtxClass: 'md+',
        sideNavCtxClass: 'sm',
    },
    '/profit-calculator': {
        matIcon: 'calculate',
        appBarCtxClass: 'lg',
    },
    '/reporting': {
        matIcon: 'assessment',
        appBarCtxClass: 'lg',
    },
    '/profile': {
        matIcon: 'account_circle',
        appBarCtxClass: 'hide',
        sideNavCtxClass: 'sm',
    },
}

type NavLink = Config & { href: string }

export const NAV_LINKS: NavLink[] = Object.entries( navLinkConfigs )
    .map( ( [ href, config ] ) => ( {
        ...config,
        href,
        title: config.title ?? getDefaultPageTitle( href )
    } ) )
    .filter( ( { hide } ) => !hide )