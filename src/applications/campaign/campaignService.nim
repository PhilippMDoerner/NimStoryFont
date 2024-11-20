import std/[options, sets, strutils, tables, times, strformat, sugar]
import prologue except Group
import norm/[model, sqlite]
import campaignModel
import campaignRepository
import campaignDTO
import ../genericArticleRepository
import ../genericArticleService
import ../genericDeserialization
import ../authentication/authenticationConstants
import ../authentication/authenticationModels
import ../allUrlParams
import ../../database
import ../../applicationSettings
import ../../utils/[fileUpload, jwtContext, djangoDateTime/djangoDateTimeType]

export campaignModel

type PathTuple = tuple[relativeFilePath: string, absoluteFilePath: string]

proc storeFileIn(mediaDir: string, subDir: string, file: var UploadFile): PathTuple =
  let fileDir = fmt"{mediaDir}/{subDir}"
  let absolutePath: string = saveFile(file, fileDir)
  var relativePath = absolutePath.getRelativeFilepathTo(mediaDir)
  relativePath.removePrefix("/")
  
  return (relativePath, absolutePath)

proc storeIcon(mediaDir: string, image: var UploadFile): PathTuple =
  return mediaDir.storeFileIn(CAMPAIGN_ICONS_SUBDIR, image)
  
proc storeBackgroundImage(mediaDir: string, image: var UploadFile): PathTuple =
  return mediaDir.storeFileIn(BACKGROUND_IMAGE_SUBDIR, image)
  
proc createCampaign*(connection: DbConn, campaignDTO: CampaignDTO): CampaignRead =
  let (relativeIconPath, absoluteIconPath) = campaignDTO.mediaDirectory.storeIcon(campaignDTO.icon)
  let (relativeBackgroundImagePath, absoluteBackgroundImagePath) = campaignDTO.mediaDirectory.storeBackgroundImage(campaignDTO.backgroundImage)
    
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
  
proc updateCampaign*(connection: DbConn, campaignDTO: CampaignUpdateDTO): CampaignRead =
  let mediaDir = campaignDTO.mediaDirectory
  var campaign = connection.getEntryById(campaignDTO.pk, Campaign)
  let serverTimestamp = campaign.update_datetime.toTime().toUnix()
  let isOutdatedUpdate = campaignDTO.userTimestamp < serverTimestamp
  if isOutdatedUpdate:
    raise newException(OutdatedDataError, "Tried updating a campaign with data that has already been changed by another user!")
  
  if campaignDTO.name.isSome():
    campaign.name = campaignDTO.name.get()
  if campaignDTO.subtitle.isSome():
    campaign.subtitle = campaignDTO.subtitle
  
  let iconPaths = if campaignDTO.icon.isSome():
      let paths = mediaDir.storeIcon(campaignDTO.icon.get())
      campaign.icon = some(paths.relativeFilePath)
      some(paths)
    else:
      none(PathTuple)
  
  let backgroundImagePaths = if campaignDTO.backgroundImage.isSome():
      let paths = mediaDir.storeBackgroundImage(campaignDTO.backgroundImage.get())
      campaign.backgroundImage = paths.relativeFilePath
      some(paths)
    else:
      none(PathTuple)
  
  campaign.update_datetime = djangoDateTimeType.now()
  try:
    discard connection.updateEntryInTransaction(campaign)
    result = connection.getEntryById(campaign.id, CampaignRead)
  except CatchableError:
    if iconPaths.isSome():
      deleteFile(iconPaths.get().absoluteFilePath)
    if backgroundImagePaths.isSome():
      deleteFile(backgroundImagePaths.get().absoluteFilePath)
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

proc trackCampaignVisit*(userId: int64, campaignName: string) =
  let lastVisitDate = djangoDateTimeType.now()
  withDbConn(con):
    con.trackCampaignVisit(userId, campaignName, lastVisitDate)