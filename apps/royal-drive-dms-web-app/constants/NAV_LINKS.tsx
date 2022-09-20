import { getDefaultPageTitle } from '../lib/getDefaultPageTitle'
import { ENV } from './ENV'

const navLinkConfigs: Record<string, Omit<NavLink, 'href'>> = {
    '/car-list': {},
    '/profit-calculator': {},
    '/reporting': {},
    // '/test': {
    //     hide: ENV.isProd,
    // },
    // '/user-list': {
    //     hide: ENV.isProd,
    // },
    // '/api': {
    //     title: 'API',
    //     hide: ENV.isProd,
    // },
}

type NavLink = {
    href: string
    title?: string
    hide?: boolean
}

export const NAV_LINKS: NavLink[] = Object.entries( navLinkConfigs )
    .map( ( [ href, config ] ) => ( {
        ...config,
        href,
        title: config.title ?? getDefaultPageTitle( href )
    } ) )
    .filter( ( { hide } ) => !hide )