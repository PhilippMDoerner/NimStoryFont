import norm/[sqlite]
import ./nodeMapModel
import ./nodeMapRepository
import ../allUrlParams
import ../campaign/campaignService
import ../genericArticleRepository

proc getNodeMap*(campaignName: string): NodeMap =
  let campaign: Campaign = getCampaignByName(campaignName)
  let nodes = getNodes(campaign.id)
  let links = getLinks(campaign.id)
  
  return NodeMap(nodes: nodes, links: links)

proc getCampaignLinkTypes*(con: DbConn, params: ReadListParams): seq[CustomLinkType] =
  return con.getLinkTypes(params.campaignName)

proc getLinkTypes*(con: DbConn, params: ReadListParams): seq[CustomLinkType] =
  return con.getList(CustomLinkType)