import characterModel
import std/[options, strformat, sugar]
import characterEncounterModel
import characterOrganizationModel
import ../genericArticleRepository
import ../authentication/authenticationUtils
import ../allUrlParams
import ../../utils/jwtContext

proc `$`*(character: CharacterRead | Character): string =
  let titleString = character.title.map(title => fmt"{title} - ").get("")
  result.add(titleString)
  result.add(character.name)
  if not character.alive:
    result.add(" (†)")

proc campaign_id*(entry: CharacterEncounterConnection): int64 =
  result = getEntryById(entry.character_id, Character).campaign_id

proc campaign_id*(entry: OrganizationMembership): int64 =
  result = getEntryById(entry.member_id, Character).campaign_id

proc checkCharacterReadListPermission*(
    ctx: JWTContext, entries: seq[CharacterOverview]
) =
  checkCampaignReadListPermission(ctx, entries)

proc checkOrganizationMembershipCreatePermission*(
    ctx: JWTContext, entry: OrganizationMembership
) =
  let organization: OrganizationRead =
    getEntryById(entry.organization_id, OrganizationRead)
  checkCreatePermission(ctx, organization.campaign_id.id)
