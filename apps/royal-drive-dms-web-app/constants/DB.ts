import { makeFreerstoreDB } from '@weis-guys/freerstore'
import { FIREBASE } from '../constants/FIREBASE'

export const DB = makeFreerstoreDB( FIREBASE.app )