import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'
import { joinTruthyValues } from '@weis-guys/ts-utils'

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

    if ( isActive ) props.className = joinTruthyValues( [ props.className, 'active' ] )

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
    props.className = joinTruthyValues( [ props.className, 'btn' ] )
    return <NavLink {...props} >{children}</NavLink>
}