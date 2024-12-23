import std/[strformat, json]
import norm/[sqlite]
import ./organizationModel
import ./organizationSerialization
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]
  
proc exportOrganizationData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignOrganizations = con.getCampaignList(campaign.name, OrganizationRead)
  let overviewSerializedOrganizations = con.overviewSerialize(campaignOrganizations)
  let overviewUrl = fmt"/organization/{campaign.name}/overview/"
  result[overviewUrl]= %*overviewSerializedOrganizations
  
  for organization in campaignOrganizations:
    let pkUrl = fmt"/organization/pk/{organization.id}/"
    let nameUrl = fmt"/organization/{campaign.name}/{organization.name}/"
    let serializedData = con.serializeOrganizationRead(organization)
    let serializedDataNode = %*serializedData
    result[pkUrl] = serializedDataNode
    result[nameUrl] = serializedDataNode
