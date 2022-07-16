import norm/sqlite

proc deleteGroupMembership*(connection: DbConn, userId: int64, groupId: int64) =
  const query = sql"""
    DELETE FROM auth_user_groups 
    WHERE user_id = ? AND group_id = ?
  """
  let queryParams: array[2, DbValue] = [userId.dbValue(), groupId.dbValue()]
  connection.exec(query, queryParams)
