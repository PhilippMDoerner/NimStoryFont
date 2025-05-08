import ../../utils/jwtContext
import playerClassModel
import ../genericArticleRepository
import ../character/characterModel
import ../authentication/authenticationUtils

proc campaign_id*(entry: PlayerClassConnection): int64 =
  let characterId: int64 = entry.character_id
  let character: Character = getEntryById(characterId, Character)
  return character.campaign_id

proc checkPlayerClassConnectionCreatePermission*(
    ctx: JWTContext, entry: PlayerClassConnection
) =
  checkCreatePermission[PlayerClassConnection](ctx, entry)
