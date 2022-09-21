import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import { combineClassNames } from '../lib/combineClassNames'

type NavLinkProps = {
    href: string
    exact?: boolean
    children?: any
    className?: string
    onClick?: () => void
}

export const NavLink: FC<NavLinkProps> = ( { href, exact = true, children, ...props } ) => {
    const { pathname } = useRouter()
    const isActive = exact ? pathname === href : pathname.startsWith( href )

    if ( isActive ) props.className = combineClassNames( [ props.className, 'active' ] )

    return <Link href={href} >
        <a style={{
            display: 'flex',
            placeItems: 'center',
            gap: 10,
        }} {...props} >
            {children}
        </a>
    </Link>
}

export const NavLinkButton: FC<NavLinkProps> = ( { children, ...props } ) => {
    props.className = combineClassNames( [ props.className, 'btn' ] )
    return <NavLink {...props} >{children}</NavLink>
}