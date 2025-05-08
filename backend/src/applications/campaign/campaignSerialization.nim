import ../authentication/authenticationModels
import norm/[model, sqlite]
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../user/userSerialization
import ../genericArticleRepository
import std/[sugar, sequtils, options, algorithm, strformat, tables]
import campaignService
import ../session/sessionModel
import ../image/imageUtils

type CampaignSerializable* = object
  pk*: int64
  name*: string
  subtitle*: Option[string]
  background_image*: string
  is_deactivated*: bool
  has_audio_recording_permission*: bool
  update_datetime*: DjangoDateTime
  icon*: Option[string]
  default_map*: Option[int64]
  default_map_details*: Option[CampaignDefaultMap]
  emptySearchResponses*: seq[EmptySearchResponse]
  members*: seq[UserSerializable]
  admins*: seq[UserSerializable]
  guests*: seq[UserSerializable]
  member_group_name*: string
  admin_group_name*: string
  guest_group_name*: string

type CampaignDuration* = object
  start_date*: Option[DjangoDateTime]
  last_date*: Option[DjangoDateTime]

type CampaignOverviewSerializable* = object
  pk*: int64
  name*: string
  subtitle*: Option[string]
  background_image*: string
  is_deactivated*: bool
  has_audio_recording_permission*: bool
  icon*: Option[string]
  default_map*: Option[int64]
  default_map_details*: Option[CampaignDefaultMap]
  duration*: CampaignDuration

type MembershipSerializable* = UserGroup

proc serializeCampaignRead*(
    connection: DbConn, entry: CampaignRead
): CampaignSerializable =
  let campaignEmptySearchResponses: seq[EmptySearchResponse] =
    connection.getManyFromOne(entry, EmptySearchResponse)
  let default_map_id: Option[int64] =
    if entry.default_map_id.isSome():
      some(entry.default_map_id.get().id)
    else:
      none(int64)

  let campaignMembers: seq[UserGroup] = connection.getCampaignMembers(entry)
  let members = campaignMembers
    .filter(userGroup => userGroup.group_id.id == entry.member_group_id.get().id)
    .map(userGroup => connection.serializeUser(userGroup.user_id))
  let admins = campaignMembers
    .filter(userGroup => userGroup.group_id.id == entry.admin_group_id.get().id)
    .map(userGroup => connection.serializeUser(userGroup.user_id))
  let guests = campaignMembers
    .filter(userGroup => userGroup.group_id.id == entry.guest_group_id.get().id)
    .map(userGroup => connection.serializeUser(userGroup.user_id))

  result = CampaignSerializable(
    pk: entry.id,
    name: entry.name,
    subtitle: entry.subtitle,
    background_image: entry.background_image.getImagePath(),
    is_deactivated: entry.is_deactivated,
    has_audio_recording_permission: entry.has_audio_recording_permission,
    update_datetime: entry.update_datetime,
    icon: entry.icon,
    default_map: default_map_id,
    default_map_details: entry.default_map_id,
    emptySearchResponses: campaignEmptySearchResponses,
    members: members,
    admins: admins,
    guests: guests,
    admin_group_name: entry.admin_group_id.get().name,
    member_group_name: entry.member_group_id.get().name,
    guest_group_name: entry.guest_group_id.get().name,
  )

proc serializeCampaignReads*(
    connection: DbConn, entries: seq[CampaignRead]
): seq[CampaignSerializable] =
  for entry in entries:
    result.add(connection.serializeCampaignRead(entry))

proc serializeCampaign*(connection: DbConn, entry: Campaign): CampaignSerializable =
  let fullEntry = connection.getEntryById(entry.id, CampaignRead)
  result = connection.serializeCampaignRead(fullEntry)

proc overviewSerialize*(
    entry: CampaignRead, campaignSessions: var seq[Session]
): CampaignOverviewSerializable =
  let default_map_id: Option[int64] =
    if entry.default_map_id.isSome():
      some(entry.default_map_id.get().id)
    else:
      none(int64)

  var campaignDuration: CampaignDuration
  if campaignSessions.len() > 0:
    campaignSessions.sort((x, y: Session) => x.session_number - y.session_number)
    campaignDuration.start_date = some(campaignSessions[0].session_date)
    campaignDuration.last_date = some(campaignSessions[^1].session_date)
  else:
    campaignDuration.start_date = none(DjangoDateTime)
    campaignDuration.last_date = none(DjangoDateTime)

  result = CampaignOverviewSerializable(
    pk: entry.id,
    name: entry.name,
    subtitle: entry.subtitle,
    background_image: entry.background_image.getImagePath(),
    is_deactivated: entry.is_deactivated,
    has_audio_recording_permission: entry.has_audio_recording_permission,
    icon: entry.icon.map(getImagePath),
    default_map: default_map_id,
    default_map_details: entry.default_map_id,
    duration: campaignDuration,
  )

proc overviewSerialize*(
    connection: DbConn, entry: CampaignRead
): CampaignOverviewSerializable =
  var campaignSessions: seq[Session] = connection.getManyFromOne(entry, Session)
  result = overviewSerialize(entry, campaignSessions)

proc overviewSerialize*(
    connection: DbConn, entries: seq[CampaignRead]
): seq[CampaignOverviewSerializable] =
  var allCampaignSessions: Table[int64, seq[Session]] =
    connection.getManyFromOne(entries, Session, "campaign_id")

  for entry in entries:
    let serializedEntry: CampaignOverviewSerializable =
      overviewSerialize(entry, allCampaignSessions[entry.id])
    result.add(serializedEntry)

#TODO: Double check that if this is used during "change member" etc. provides correct data amounts
proc serializeMembership*(connection: DbConn, entry: UserGroup): UserSerializable =
  result = connection.serializeUser(entry.user_id)

proc serializeEmptySearchResponse*(
    connection: DbConn, entry: EmptySearchResponse
): CampaignSerializable =
  let campaign = connection.getEntryById(entry.campaign_id, CampaignRead)
  return connection.serializeCampaignRead(campaign)
