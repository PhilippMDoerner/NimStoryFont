import std/[sugar, options, sequtils, tables]
import norm/sqlite
import ./organizationModel
import ./organizationService
import ./organizationUtils
import ../genericArticleRepository
import ../image/[imageModel, imageService, imageSerialization, imageUtils]
import ../campaign/campaignModel
import ../character/characterService
import ../../utils/[djangoDateTime/djangoDateTimeType, myStrutils]
import ../articleModel

type HeadquarterSerializable = object
  name: string
  parent_name: Option[string]
  name_full: string
  pk: int64

proc serializeHeadquarter(entry: OrganizationLocation): HeadquarterSerializable =
  result = HeadquarterSerializable(
    name: entry.name,
    parent_name: entry.parent_location_id.map(ploc => ploc.name),
    name_full: entry.name,
    pk: entry.id,
  )

type MemberSerializable* = object
  pk: int64
  name: string
  alive: bool
  organization_id: int64
  role: string
  membership_id: int64

type OrganizationSerializable* = object
  pk: int64
  creation_datetime: DjangoDateTime
  update_datetime: DjangoDateTime
  name: string
  leader: Option[string]
  headquarter: Option[int64]
  headquarter_details: Option[HeadquarterSerializable]
  description: Option[string]
  members: seq[MemberSerializable]
  images: seq[ImageSerializable]
  campaign: int64
  campaign_details: MinimumCampaignOverview

proc serializeMember(membership: OrganizationMemberRead): MemberSerializable =
  result = MemberSerializable(
    pk: membership.member_id.id,
    alive: membership.member_id.alive,
    name: membership.member_id.name,
    organization_id: membership.organization_id,
    role: membership.role.get("Member"),
    membership_id: membership.id,
  )

proc serializeOrganizationRead*(
    connection: DbConn, entry: OrganizationRead
): OrganizationSerializable =
  let images = connection.getManyFromOne(entry, Image).map(serializeImage)

  let members: seq[MemberSerializable] = connection.getOrganizationMembers(entry.id).map(
      character => serializeMember(character)
    )

  result = OrganizationSerializable(
    pk: entry.id,
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    name: entry.name,
    leader: entry.leader,
    headquarter: entry.headquarter_id.map(hq => hq.id),
    headquarter_details: entry.headquarter_id.map(serializeHeadquarter),
    description: entry.description,
    images: images,
    members: members,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
  )

proc serializeOrganization*(
    connection: DbConn, entry: Organization
): OrganizationSerializable =
  let fullEntry = connection.getEntryById(entry.id, OrganizationRead)
  result = connection.serializeOrganizationRead(fullEntry)

proc serializeOrganization*(
    connection: DbConn, entry: OrganizationRelationship
): OrganizationSerializable =
  let fullEntry = connection.getEntryById(entry.organization_id, OrganizationRead)
  result = connection.serializeOrganizationRead(fullEntry)

type OrganizationOverviewSerializable* = object
  article_type: ArticleType
  description*: Option[string]
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  images: seq[string]

proc overviewSerialize*(
    connection: DbConn,
    entry: OrganizationOverview | OrganizationRead,
    images: seq[Image] = @[],
): OrganizationOverviewSerializable =
  let imagePaths = images.map(getImagePath)

  result = OrganizationOverviewSerializable(
    article_type: ArticleType.atOrganization,
    description: entry.description.map(truncate),
    pk: entry.id,
    name_full: $entry,
    name: entry.name,
    campaign_details: entry.campaign_id,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    images: imagePaths,
  )

proc overviewSerialize*(
    connection: DbConn, entries: seq[OrganizationOverview | OrganizationRead]
): seq[OrganizationOverviewSerializable] =
  let organizationIds = entries.map(org => org.id)
  let organizationImages: Table[int64, seq[Image]] =
    connection.getOrganizationImages(organizationIds)

  for organization in entries:
    let images: seq[Image] =
      if organizationImages.hasKey(organization.id):
        organizationImages[organization.id]
      else:
        @[]

    result.add(connection.overviewSerialize(organization, images))
