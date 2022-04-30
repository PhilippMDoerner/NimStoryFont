import norm/[model, sqlite]
import characterModel
import ../../utils/djangoDateTime/[normConversion]
import std/[strformat]

proc getNonPlayerCharacters*(connection: DbConn, campaignName: string): seq[CharacterOverview] =
  result = @[newModel(CharacterOverview)]

  const condition = fmt"""
    campaign_id.name LIKE ? 
    AND {CharacterOverview.table()}.player_character IS FALSE
    ORDER BY {CharacterOverview.table()}.name ASC
  """

  connection.select(result, condition, campaignName.dbValue())