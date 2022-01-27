import ../base_generics/genericArticleRepository
import campaignModel
import norm/[sqlite, model]
import std/[options]
import tinypool


proc getCampaignByName*(campaignName: string): Campaign =
    var entry: Campaign = newModel(Campaign)
    
    const modelTableName: string = Campaign.table()
    var sqlCondition: string = modelTableName & ".name LIKE ?"

    withDbConn(connection):
      connection.select(entry, sqlCondition, campaignName)

    result = entry
  

proc getAllCampaigns*(): seq[Campaign] =
  result = getList[Campaign]()


proc getAllCampaignReads*(): seq[CampaignRead] = 
  result = getList[CampaignRead]()
