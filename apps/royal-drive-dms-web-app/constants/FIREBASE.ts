import { initializeApp, FirebaseOptions, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { ENV } from './ENV'
import { pretty } from '@weis-guys/ts-utils'

const firebaseConfigs: Record<ENV[ 'name' ], FirebaseOptions> = {
    dev: {
        apiKey: 'AIzaSyDL4T7Ct0VtsN3s69zwODsU0pd5gnPmgnE',
        authDomain: 'royal-drive-dms-dev-987123654.firebaseapp.com',
        databaseURL: 'https://royal-drive-dms-dev-987123654.firebaseio.com',
        projectId: 'royal-drive-dms-dev-987123654',
        storageBucket: 'royal-drive-dms-dev-987123654.appspot.com',
        messagingSenderId: '68222877311',
        appId: '1:68222877311:web:a313c9aa73e4b75d9b894a'
    },
    prod: {
        apiKey: 'AIzaSyA0rTUbBoml5SEF2_z4b2kuXwmelWlXsmQ',
        authDomain: 'royal-drive-dms-live.firebaseapp.com',
        databaseURL: 'https://royal-drive-dms-live-default-rtdb.firebaseio.com',
        projectId: 'royal-drive-dms-live',
        storageBucket: 'royal-drive-dms-live.appspot.com',
        messagingSenderId: '336847221426',
        appId: '1:336847221426:web:80bf8408ece59c45784fab'
    }
}

const initApp = ( name: string = '[DEFAULT]' ): FirebaseApp => {
    // const config = firebaseConfigs.prod
    const config = firebaseConfigs[ ENV.name ]

    const apps = getApps()
    if ( apps.length ) {
        const app = apps.find( app => app.name == name )
        return app ?? initializeApp( config, name )
    }
    return initializeApp( config, name )
}

export type FIREBASE = typeof FIREBASE
export const FIREBASE = ( async () => {

    // const app = initApp( ENV.name )
    // const app = initApp( 'prod' )
    const app = initApp()
    const auth = getAuth( app )
    const db = getFirestore( app )

    // try {
    //     await enableIndexedDbPersistence( db )
    // } catch ( error ) {
    //     console.error( error )
    // }

    return { app, db, auth } as const
} )()

// logInfo()
function logInfo () {
    console.groupCollapsed( 'FIREBASE' )
    console.info( pretty( FIREBASE ) )
    console.groupEnd()
}