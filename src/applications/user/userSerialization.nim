import userModel
import norm/sqlite
import ../genericArticleRepository
import std/[options, sugar, sequtils]
import ../authentication/authenticationModels

type UserGroupSerializable* = object
    name: string
    pk: int64

proc serializeUserGroup(entry: Group): UserGroupSerializable =
    result = UserGroupSerializable(name: entry.name, pk: entry.id)

type UserSerializable* = object
    username: string
    pk: int64
    email: Option[string]
    is_staff: bool
    is_superuser: bool
    is_active: bool
    groups: seq[int64]
    group_details: seq[UserGroupSerializable]

proc serializeUser*(connection: DbConn, entry: User): UserSerializable =
    let email = if entry.email == "": none(string) else: some(entry.email)
    let groups = connection.getManyToMany(entry, UserGroup, Group)
    
    result = UserSerializable(
        username: entry.username,
        pk: entry.id,
        email: email,
        is_staff: entry.is_staff,
        is_superuser: entry.is_superuser,
        is_active: entry.is_active,
        groups: groups.map(group => group.id),
        group_details: groups.map(serializeUserGroup)
    )
