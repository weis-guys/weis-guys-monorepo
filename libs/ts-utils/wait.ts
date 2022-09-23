export const wait = <Data> ( ms: number, cb: () => Data ) =>
    new Promise<Data>( resolve => setTimeout( () => resolve( cb() ), ms ) )