import std/[strformat]
import norm/[sqlite]
import ./playerClassModel
import ../genericRawRepository
import ../../applicationSettings

proc getPlayerClasses*(con: DbConn, campaignName: string): seq[PlayerClass] =
  const getPlayerClassesSQL: string = fmt """
    SELECT 
      typ.name,
      typ.campaign_id,
      typ.update_datetime,
      typ.creation_datetime,
      typ.id
    FROM {PLAYERCLASS_TABLE} AS typ
    LEFT JOIN wikientries_campaign AS camp ON camp.id = typ.campaign_id
    WHERE 
      camp.name = ? OR typ.campaign_id IS NULL
  """

  let queryParams: array[1, DbValue] = [campaignName.dbValue()]
  return con.rawSelectRows(getPlayerClassesSQL, PlayerClass, queryParams)
