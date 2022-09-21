export const combineClassNames = ( classNames: any[] ) =>
    // export const combineClassNames = ( classNames: ( string | boolean | undefined )[] ) =>
    classNames.filter( x => typeof x == 'string' ).filter( Boolean ).join( ' ' )