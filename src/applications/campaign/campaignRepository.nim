import ../base_generics/genericArticleRepository
import campaignModel
import ../../utils/database
import norm/[sqlite, model]
import std/[options]


proc getCampaignByName*(campaignName: string): Campaign =
    let db = getDatabaseConnection()
    var entry: Campaign = newModel(Campaign)
    
    const modelTableName: string = Campaign.table()
    var sqlCondition: string = modelTableName & ".name LIKE ?"
    db.select(entry, sqlCondition, campaignName)

    result = entry
  

proc getAllCampaigns*(): seq[Campaign] =
  result = getList[Campaign]()


proc getAllCampaignReads*(): seq[CampaignRead] = 
  result = getList[CampaignRead]()
