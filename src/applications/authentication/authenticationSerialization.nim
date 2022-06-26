import authenticationModels
import norm/sqlite
import ../genericArticleRepository
import std/[options, sequtils, strformat, sugar]

type GroupSerializable* = object
    id*: int64
    name*: string
    permissions*: seq[int64]

proc serializeGroup*(connection: DbConn, entry: Group): GroupSerializable =
  let groupPermissionIds: seq[int64] = connection.getManyFromOne(entry, GroupPermission).map(joinEntry => joinEntry.permission_id)
  result = GroupSerializable(
    id: entry.id,
    name: entry.name,
    permissions: groupPermissionIds
  )

proc serializeGroups*(connection: DbConn, entries: seq[Group]): seq[GroupSerializable] =
  for entry in entries:
    result.add(connection.serializeGroup(entry))