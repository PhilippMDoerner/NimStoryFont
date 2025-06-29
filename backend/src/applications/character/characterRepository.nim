import std/[strformat]
import norm/[model, sqlite]
import characterModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[normConversion]

proc getCharacterSet(
    connection: DbConn, campaignName: string, isPlayerCharacter: bool
): seq[CharacterOverview] =
  const condition =
    fmt"""
    campaign_id.name LIKE ?
    AND {CharacterOverview.table()}.player_character IS ?
    ORDER BY LOWER({CharacterOverview.table()}.name) ASC
  """
  result = connection.getList(
    CharacterOverview, condition, campaignName.dbValue(), isPlayerCharacter.dbValue()
  )

proc getNonPlayerCharacters*(
    connection: DbConn, campaignName: string
): seq[CharacterOverview] =
  result = connection.getCharacterSet(campaignName, false)

proc getPlayerCharacters*(
    connection: DbConn, campaignName: string
): seq[CharacterOverview] =
  result = connection.getCharacterSet(campaignName, true)
