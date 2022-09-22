export const joinTruthyValues = ( array: any[], separator: string = ' ' ) =>
    array.filter( Boolean ).join( separator )