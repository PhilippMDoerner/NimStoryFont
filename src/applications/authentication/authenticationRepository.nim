import norm/sqlite
import ../genericRawRepository
import std/[strformat]

proc deleteGroupMembership*(connection: DbConn, userId: int64, groupId: int64) =
  let query = fmt"""
    DELETE FROM auth_user_groups 
    WHERE user_id = {userId} AND group_id = {groupId}
  """
  connection.rawExec(query)
