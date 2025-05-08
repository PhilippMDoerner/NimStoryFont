import std/[strformat, json]
import norm/[sqlite]
import ./spellModel
import ./spellSerialization
import ./spellService
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc exportSpellData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignSpells = con.getCampaignList(campaign.name, SpellRead)
  let overviewSerializedSpells = con.overviewSerialize(campaignSpells)
  let overviewUrl = fmt"/spell/{campaign.name}/overview/"
  result[overviewUrl] = %*overviewSerializedSpells

  let serializedSpells = con.serializeSpellReads(campaignSpells)
  let listUrl = fmt"/spell/{campaign.name}/"
  result[listUrl] = %*serializedSpells

  for index, spell in campaignSpells:
    let pkUrl = fmt"/spell/pk/{spell.id}/"
    let nameUrl = fmt"/spell/{campaign.name}/{spell.name}/"
    let serializedDataNode = %*serializedSpells[index]
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
