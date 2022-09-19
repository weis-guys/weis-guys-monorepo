import { DB } from '@weis-guys/ts-utils'
import { Access } from './Access'
import { Person } from './Person'

export type UserDoc = DB.Doc_v2<User>

export type User = {
    readonly email?: string
    readonly role?: Access.Role
    readonly name?: Person.Name
}