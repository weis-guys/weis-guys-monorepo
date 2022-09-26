import { FIREBASE } from '../constants/FIREBASE'
import { makeFreerstoreDB } from '../lib/freerstore/db'

export const DB = makeFreerstoreDB( FIREBASE.app )