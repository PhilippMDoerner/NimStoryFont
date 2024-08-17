import std/[options, sets, strutils, tables, strformat, sugar]
import campaignModel
import campaignRepository
import campaignDTO
import norm/[model, sqlite]
import ../genericArticleRepository
import ../genericArticleService
import ../authentication/authenticationConstants
import ../authentication/authenticationModels
import ../allUrlParams
import ../../database
import ../../applicationSettings
import ../../utils/[fileUpload, jwtContext]

export campaignModel

proc createCampaign*(connection: DbConn, campaignDTO: CampaignDTO): CampaignRead =
  let iconDirectory = fmt"{campaignDTO.mediaDirectory}/{CAMPAIGN_ICONS_SUBDIR}"
  let absoluteIconPath: string = saveFile(campaignDTO.icon, iconDirectory)
  var relativeIconPath = absoluteIconPath.getRelativeFilepathTo(campaignDTO.mediaDirectory)
  relativeIconPath.removePrefix("/")
  
  let backgroundImageDirectory = fmt"{campaignDTO.mediaDirectory}/{BACKGROUND_IMAGE_SUBDIR}"
  let absoluteBackgroundImagePath: string = saveFile(campaignDTO.backgroundImage, backgroundImageDirectory)
  var relativeBackgroundImagePath = absoluteBackgroundImagePath.getRelativeFilepathTo(campaignDTO.mediaDirectory)
  relativeBackgroundImagePath.removePrefix("/")
  
  var campaign = new(Campaign)
  campaign.name = campaignDTO.name
  campaign.subtitle = campaignDTO.subtitle
  campaign.background_image = relativeBackgroundImagePath
  campaign.icon = some relativeIconPath
  
  try:
    let newCampaign = connection.createEntryInTransaction(campaign)
    result = connection.getEntryById(newCampaign.id, CampaignRead)
  except CatchableError:
    deleteFile(absoluteIconPath)
    deleteFile(absoluteBackgroundImagePath)
    raise
  
proc getCampaignByName*(campaignName: string): Campaign =
  result = getEntryByField("name", campaignName, Campaign)

proc getAllCampaigns*(): seq[Campaign] =
  result = getList(Campaign)

proc getAllCampaignReads*(): seq[CampaignRead] = 
  result = getList(CampaignRead)

proc getAllCampaignReads*(connection: DbConn, requestParams: ReadWithoutParams): seq[CampaignRead] =
  result = connection.getList(CampaignRead)

proc readCampaignByName*(connection: DbConn, requestParams: CampaignNameParams): CampaignRead =
  result = connection.getEntryByField("name", requestParams.campaignName, CampaignRead)

proc getAllCampaignOverviews*(connection: DbConn, requestParams: ReadWithoutParams): seq[CampaignRead] =
  var campaignIdsOfUser: seq[int64] = @[]

  if requestParams.userToken.isAdmin or requestParams.userToken.isSuperUser:
    return connection.getList(CampaignRead)

  for campaignIdentifier in requestParams.userToken.campaignMemberships.keys:
    if campaignIdentifier.kind == CampaignIdType.citInt:
      campaignIdsOfUser.add(campaignIdentifier.id)

  result = connection.getCampaigns(campaignIdsOfUser)

proc getCampaignMembers*(connection: DbConn, campaign: Campaign | CampaignRead): seq[UserGroup] =
  result = connection.readCampaignMembers(campaign)

proc getCampaignMembersWithRole*(connection: DbConn, campaign: CampaignRead, role: CampaignRole): seq[UserGroup] =
  let campaignGroup: Option[Group] = case role:
  of CampaignRole.crADMIN:
    campaign.admin_group_id
  of CampaignRole.crMEMBER:
    campaign.member_group_id
  of CampaignRole.crGUEST:
    campaign.guest_group_id

  let campaignGroupId: Option[int64] = campaignGroup.map(group => group.id)
  if campaignGroupId.isNone():
    result = @[]

  result = connection.getList(
    UserGroup, 
    "group_id = ?", 
    campaignGroupId.get().dbValue(), 
  )

proc deactivateCampaign*(connection: DbConn, campaign: var Campaign) =
  if campaign.is_deactivated:
    raise newException(InvalidDatabaseManipulation, fmt"Campaigns cannot be deleted, they only get deactivated. '{campaign.name}' is already deactivated.")
  
  campaign.is_deactivated = true
  discard connection.updateEntryInTransaction(campaign)