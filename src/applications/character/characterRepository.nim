import norm/[model, sqlite]
import characterModel
import ../../utils/djangoDateTime/[normConversion]
import std/[strformat]

proc getCharacterSet(connection: DbConn, campaignName: string, isPlayerCharacter: bool): seq[CharacterOverview] =
  result = @[newModel(CharacterOverview)]

  const condition = fmt"""
    campaign_id.name LIKE ? 
    AND {CharacterOverview.table()}.player_character IS ?
    ORDER BY {CharacterOverview.table()}.name ASC
  """

  connection.select(result, condition, campaignName.dbValue(), isPlayerCharacter.dbValue())

proc getNonPlayerCharacters*(connection: DbConn, campaignName: string): seq[CharacterOverview] =
  result = connection.getCharacterSet(campaignName, false)

proc getPlayerCharacters*(connection: DbConn, campaignName: string): seq[CharacterOverview] =
  result = connection.getCharacterSet(campaignName, true)

