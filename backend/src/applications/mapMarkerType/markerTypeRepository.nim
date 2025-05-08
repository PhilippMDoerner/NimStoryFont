import std/[strformat]
import norm/[sqlite]
import ./markerTypeModel
import ../genericRawRepository
import ../../applicationSettings

proc getMarkerTypes*(con: DbConn, campaignName: string): seq[MarkerType] =
  const getMarkerTypesSQL: string = fmt """
    SELECT 
      typ.name,
      typ.icon,
      typ.is_text_marker,
      typ.creation_datetime,
      typ.update_datetime,
      typ.fontawesome_type,
      typ.color,
      typ.campaign_id,
      typ.id
    FROM {MARKERTYPE_TABLE} AS typ
    LEFT JOIN wikientries_campaign AS camp ON camp.id = typ.campaign_id
    WHERE 
      camp.name = ? OR typ.campaign_id IS NULL
  """

  let queryParams: array[1, DbValue] = [campaignName.dbValue()]
  return con.rawSelectRows(getMarkerTypesSQL, MarkerType, queryParams)
