import organizationModel
import norm/sqlite
import ../genericArticleRepository
import organizationService
import ../image/[imageModel, imageService]
import ../campaign/campaignModel
import std/[sugar, options, sequtils]
import ../../utils/djangoDateTime/djangoDateTimeType



type OrganizationOverviewSerializable* = OrganizationOverview

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
        pk: entry.id
    )

type OrganizationSerializable* = object
    pk: int64
    creation_datetime: DjangoDateTime
    update_datetime: DjangoDateTime
    name: string
    leader: Option[string]
    headquarter: Option[int64]
    headquarter_details: Option[HeadquarterSerializable]
    description: Option[string]
    members: seq[OrganizationCharacter]
    images: seq[Image]
    campaign: int64
    campaign_details: MinimumCampaignOverview

proc serializeOrganizationRead*(connection: DbConn, entry: OrganizationRead): OrganizationSerializable =
    let images = connection.getManyFromOne(entry, Image)
    let members = connection.getManyFromOne(entry, OrganizationCharacter)

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
        campaign_details: entry.campaign_id
    )

proc serializeOrganization*(connection: DbConn, entry: Organization): OrganizationSerializable =
    let fullEntry = connection.getEntryById(entry.id, OrganizationRead)
    result = connection.serializeOrganizationRead(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: OrganizationOverview): OrganizationOverviewSerializable =
    result = entry
