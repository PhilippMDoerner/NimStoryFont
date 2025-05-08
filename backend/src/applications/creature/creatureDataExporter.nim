import std/[strformat, json]
import norm/[sqlite]
import ./creatureModel
import ./creatureSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc exportCreatureData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignCreatures = con.getCampaignList(campaign.name, CreatureRead)
  let overviewSerializedCreatures = con.overviewSerialize(campaignCreatures)
  let overviewUrl = fmt"/creature/{campaign.name}/overview/"
  result[overviewUrl] = %*overviewSerializedCreatures

  for creature in campaignCreatures:
    let pkUrl = fmt"/creature/pk/{creature.id}/"
    let nameUrl = fmt"/creature/{campaign.name}/{creature.name}/"
    let serializedData = con.serializeCreatureRead(creature)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
