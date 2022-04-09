import campaignModel
import ../authentication/authenticationModels
import norm/sqlite
import ../genericArticleRepository

type CampaignSerializable* = CampaignRead
type CampaignOverviewSerializable* = CampaignOverview
type MembershipSerializable* = UserGroup

proc serializeCampaignRead*(connection: DbConn, entry: CampaignRead): CampaignSerializable =
    result = entry

proc serializeCampaign*(connection: DbConn, entry: Campaign): CampaignSerializable =
    let fullEntry = connection.getEntryById(entry.id, CampaignRead)
    result = connection.serializeCampaignRead(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: CampaignOverview): CampaignOverviewSerializable =
    result = entry

proc serializeMembership*(connection: DbConn, entry: UserGroup): MembershipSerializable = 
  result = entry