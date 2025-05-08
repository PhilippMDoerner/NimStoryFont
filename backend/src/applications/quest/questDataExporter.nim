import std/[strformat, json, tables]
import norm/[sqlite]
import ./questModel
import ./questSerialization
import ./questService
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]

proc addQuestData(exportNode: JsonNode, con: DbConn, campaign: CampaignRead) =
  let campaignQuests = con.getCampaignList(campaign.name, QuestRead)
  let overviewSerializedQuests = con.overviewSerialize(campaignQuests)
  let overviewUrl = fmt"/quest/{campaign.name}/overview/"
  exportNode[overviewUrl] = %*overviewSerializedQuests

  for quest in campaignQuests:
    let pkUrl = fmt"/quest/pk/{quest.id}/"
    let nameUrl = fmt"/quest/{campaign.name}/{quest.name}/"
    let serializedData = con.serializeQuestRead(quest)
    let serializedDataNode = %*serializedData
    exportNode[pkUrl] = serializedDataNode
    exportNode[nameUrl] = serializedDataNode

proc addQuestStateData(exportNode: JsonNode) =
  let questStates: QuestStateTable = getQuestStateTable()
  const url = "/queststates"
  exportNode[url] = %*questStates

proc exportQuestData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  result.addQuestData(con, campaign)
  result.addQuestStateData()
