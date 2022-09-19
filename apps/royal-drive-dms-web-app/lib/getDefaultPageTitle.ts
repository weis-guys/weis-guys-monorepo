import { startCase } from 'lodash'

export const getDefaultPageTitle = ( path: string ) =>
    startCase( path ).replace( ' ', '\xa0' )