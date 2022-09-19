import { useRouter } from 'next/router'
import Link from 'next/link'
import { FC } from 'react'

type NavLinkProps = {
    href: string
    exact?: boolean
    children?: any
    className?: string
    classNames?: string[]
}

export const NavLink: FC<NavLinkProps> = ( { href, exact = true, children, classNames = [], ...props } ) => {
    const { pathname } = useRouter()
    const isActive = exact ? pathname === href : pathname.startsWith( href )

    if ( isActive ) classNames.push( 'active' )

    props.className = [
        props.className,
        ...classNames
    ].filter( Boolean ).join( ' ' )

    return <Link href={href} >
        <a {...props} >
            {children}
        </a>
    </Link>
}

export const NavLinkButton: FC<NavLinkProps> = ( { children, ...props } ) => {
    props.classNames = props.classNames ? [ ...props.classNames, 'btn' ] : [ 'btn' ]
    return <NavLink {...props} >{children}</NavLink>
}