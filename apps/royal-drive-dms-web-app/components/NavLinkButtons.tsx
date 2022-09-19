import { NAV_LINKS } from '../constants/NAV_LINKS'
import { NavLinkButton } from './NavLink'

export const NavLinkButtons = () => {
    return <div className='NavLinkButtons' style={{
        height: 'min-content',
        display: 'flex',
        placeItems: 'center',
        flexDirection: 'row',
        gap: 5,
    }}>
        {NAV_LINKS.map( ( { href, title } ) =>
            <NavLinkButton
                key={href}
                href={href}>
                {title}
            </NavLinkButton>
        )}
    </div>
}