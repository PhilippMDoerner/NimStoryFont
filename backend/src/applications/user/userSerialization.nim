import std/[options, sugar, sequtils, tables]
import norm/sqlite
import ./userModel
import ../genericArticleRepository
import ../authentication/authenticationModels

type UserGroupSerializable* = object
  name: string
  pk: int64

type UserMetadataSerializable* = object
  name*: string
  value*: string
  category*: string

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

proc serializeUser(entry: User, groups: seq[Group]): UserSerializable =
  let email =
    if entry.email == "":
      none(string)
    else:
      some(entry.email)
  result = UserSerializable(
    username: entry.username,
    pk: entry.id,
    email: email,
    is_staff: entry.is_staff,
    is_superuser: entry.is_superuser,
    is_active: entry.is_active,
    groups: groups.map(group => group.id),
    group_details: groups.map(serializeUserGroup),
  )

proc serializeUser*(connection: DbConn, entry: User): UserSerializable =
  let groups = connection.getManyToMany(entry, UserGroup, Group)
  result = serializeUser(entry, groups)

proc serializeUsers*(connection: DbConn, entries: seq[User]): seq[UserSerializable] =
  let allGroups: Table[int64, seq[Group]] =
    connection.getManyToMany(entries, UserGroup, Group, "user_id", "group_id")
  for entry in entries:
    let serializedEntry = serializeUser(entry, allGroups[entry.id])
    result.add(serializedEntry)

proc serializeUserMetadata*(
    connection: DbConn, entry: UserMetadata
): UserMetadataSerializable =
  result = UserMetadataSerializable(
    name: entry.name, value: entry.value, category: entry.category
  )

proc serializeUserMetadataEntries*(
    connection: DbConn, entries: seq[UserMetadata]
): seq[UserMetadataSerializable] =
  return entries.mapIt(connection.serializeUserMetadata(it))
