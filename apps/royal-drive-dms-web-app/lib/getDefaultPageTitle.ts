import { nbsp } from '@weis-guys/ts-utils'
import { startCase } from 'lodash'

export const getDefaultPageTitle = ( path: string ) =>
    startCase( path ).replace( ' ', nbsp.js )