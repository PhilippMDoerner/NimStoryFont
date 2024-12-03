import ./nodeMapModel
import ./nodeMapRepository
import ../campaign/campaignService

proc getNodeMap*(campaignName: string): NodeMap =
  let campaign: Campaign = getCampaignByName(campaignName)
  let nodes = getNodes(campaign.id)
  let links = getLinks(campaign.id)
  
  return NodeMap(nodes: nodes, links: links)