export type ScreenSizeClass = typeof screenSizeClasses[ number ]
export const screenSizeClasses = [
    'lg', // large only
    'md+', // medium or larger
    'md', // medium only
    'md-', // medium or smaller
    'sm', // small only
] as const

//        lg    md    sm
// .lg   show  hide  hide
// .md+  show  show  hide
// .md   hide  show  hide
// .md-  hide  show  show
// .sm   hide  hide  show