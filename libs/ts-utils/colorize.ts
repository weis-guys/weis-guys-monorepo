import util from 'util'

export const colorize = ( ...options: Colorize.Option[] ) =>
    ( text: string ) => options
        .map( ( color ) => util.inspect.colors[ color as string ] as [ number, number ] )
        .filter( Boolean )
        .reduce( ( acc, [ first, second ] ) => `\x1b[${ first }m${ acc }\x1b[${ second }m`, text )

export module Colorize {
    export type Option = typeof options[ number ]
    export const options = [
        'reset',
        'bold',
        'underline',
        'inverse',
        'dim', // doesn't work in node on windows
        'italic', // doesn't work in node on windows
        'blink', // doesn't work in node on windows
        'hidden', // doesn't work in node on windows
        'strikethrough', // doesn't work in node on windows
        'doubleunderline', // doesn't work in node on windows
        'framed', // doesn't work in node on windows
        'overlined', // doesn't work in node on windows

        'black',
        'red',
        'green',
        'yellow',
        'blue',
        'magenta',
        'cyan',
        'white',
        'gray',

        'redBright',
        'greenBright',
        'yellowBright',
        'blueBright',
        'magentaBright',
        'cyanBright',
        'whiteBright',

        'bgBlack',
        'bgRed',
        'bgGreen',
        'bgYellow',
        'bgBlue',
        'bgMagenta',
        'bgCyan',
        'bgWhite',
        'bgGray',

        'bgRedBright',
        'bgGreenBright',
        'bgYellowBright',
        'bgBlueBright',
        'bgMagentaBright',
        'bgCyanBright',
        'bgWhiteBright',
    ] as const

    export const logAllOptions = () =>
        console.log( ...Colorize.options.map( x => colorize( x )( x ) ) )
}

export module ColorizeTests {
    export function run () {
        console.clear()

        Colorize.logAllOptions()
    }
}