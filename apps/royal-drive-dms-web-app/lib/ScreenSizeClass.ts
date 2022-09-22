export type ScreenSizeClass = typeof screenSizeClasses[ number ]
export const screenSizeClasses = [
    'lg', // large only
    'md+', // medium or larger
    'md', // medium only
    'md-', // medium or smaller
    'sm', // small only
] as const

type ScreenSizes = 'sm' | 'md' | 'lg'

const ScreenSizeClassMatrix: {
    [ key in ScreenSizeClass ]: { [ key in ScreenSizes ]: 'show' | 'hide' }
} = {
    'lg': { sm: 'hide', md: 'hide', lg: 'show' },
    'md+': { sm: 'hide', md: 'show', lg: 'show' },
    'md': { sm: 'hide', md: 'show', lg: 'hide' },
    'md-': { sm: 'show', md: 'show', lg: 'hide' },
    'sm': { sm: 'show', md: 'hide', lg: 'hide' },
}