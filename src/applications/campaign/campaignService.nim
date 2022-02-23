import ../genericArticleRepository
import campaignModel
import norm/[sqlite, model]
import std/[options]
import tinypool

export campaignModel


proc getCampaignByName*(campaignName: string): Campaign =
  result = getEntryByField[Campaign, string]("name", campaignName)


proc getAllCampaigns*(): seq[Campaign] =
  result = getList[Campaign]()


proc getAllCampaignReads*(): seq[CampaignRead] = 
  result = getList[CampaignRead]()
