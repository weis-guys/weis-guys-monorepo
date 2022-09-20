import { getDefaultPageTitle } from '../lib/getDefaultPageTitle'

type Config = {
    title?: string
    hide?: boolean
    showInAppBar?: 'md' | 'lg'
    matIcon?: string
}

const navLinkConfigs: Record<string, Config> = {
    // '/car-details': {
    //     matIcon: 'directions_car',
    // },
    '/car-list': {
        matIcon: 'view_list',
        showInAppBar: 'md',
    },
    '/profit-calculator': {
        matIcon: 'calculate',
        showInAppBar: 'lg',
    },
    '/reporting': {
        matIcon: 'assessment',
        showInAppBar: 'lg',
    },
    '/profile': {
        matIcon: 'account_circle',
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