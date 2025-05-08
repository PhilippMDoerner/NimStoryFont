import norm/[sqlite]
import ./nodeMapModel
import ./nodeMapRepository
import ../allUrlParams
import ../campaign/campaignService
import ../genericArticleRepository

proc getNodeMap*(con: DbConn, campaignName: string): NodeMap =
  let campaign: Campaign = getCampaignByName(campaignName)
  let nodes = con.getNodes(campaign.id)
  let links = con.getLinks(campaign.id)

  return NodeMap(nodes: nodes, links: links)

proc getCampaignLinkTypes*(con: DbConn, params: ReadListParams): seq[CustomLinkType] =
  return con.getLinkTypes(params.campaignName)

proc getLinkTypes*(con: DbConn, params: ReadListParams): seq[CustomLinkType] =
  return con.getList(CustomLinkType)

proc getCampaignCustomLinks*(con: DbConn, campaignId: int64): seq[CustomLink] =
  const condition = "campaign_id = ?"
  return con.getList(CustomLink, condition, campaignId.dbValue())
