import spellModel
import spellConstants
import std/[strformat, options]
import ../../utils/jwtContext
import ../authentication/authenticationUtils
import ../genericArticleRepository


proc `$`*(model: Spell | SpellRead): string = 
    model.name

proc campaign_id*(entry: SpellConnection): int64 =
    result = getEntryById(entry.spell_id, Spell).campaign_id

proc campaign_id*(entry: SpellConnectionRead): int64 = entry.spell_id.campaign_id

proc checkSpellConnectionCreatePermission*(ctx: JWTContext, entry: SpellConnection) =
  checkCreatePermission(ctx, entry)