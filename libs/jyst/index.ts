import {
    makeType,
    makeStringType,
    makeNumberType,
} from './Type.js'

export * from './Type.js'

export const jyst = {
    type: makeType,
    string: makeStringType,
    number: makeNumberType,
}