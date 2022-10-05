import localForage from 'localforage'
import { pick } from 'lodash'

export type Store = ReturnType<typeof makeStore>
export const makeStore = ( cacheName: string, storeName: string ) => pick(
    localForage.createInstance( {
        name: cacheName,
        storeName
    } ),
    'keys',
    'getItem',
    'setItem',
)