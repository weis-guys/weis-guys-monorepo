import { DB } from '@weis-guys/ts-utils'
import { Access } from '../2.0/User/Access'
import { Person } from './Person'

export type UserDoc = DB.Doc_v1<User>

export type User = {
    readonly email?: string
    readonly role?: Access.Role
    readonly name?: Person.Name
}