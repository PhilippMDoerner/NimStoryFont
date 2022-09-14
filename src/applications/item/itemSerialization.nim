import norm/model
import itemModel
import itemUtils
import ../image/[imageModel, imageUtils, imageSerialization]
import ../articleModel
import ../campaign/campaignModel
import ../genericArticleRepository
import std/[options, sugar, sequtils]
import ../../utils/[djangoDateTime/djangoDateTimeType, myStrutils]


type OwnerDetails* = object
    name*: string
    pk*: int64

proc serializeOwner*(entry: ItemOwner): OwnerDetails =
    result = OwnerDetails(name: entry.name, pk: entry.id)

type ItemSerializable* = object
    pk*: int64
    name*: string
    owner*: Option[int64]
    owner_details*: Option[OwnerDetails]
    description*: Option[string]
    update_datetime*: DjangoDateTime
    creation_datetime*: DjangoDateTime
    images*: seq[ImageSerializable]
    campaign*: int64
    campaign_details*: MinimumCampaignOverview

proc serializeItemRead*(connection: DbConn, entry: ItemRead): ItemSerializable =
    let owner: Option[OwnerDetails] = entry.owner_id.map(serializeOwner)
    let images = connection.getManyFromOne(entry, Image).map(serializeImage)
    
    result = ItemSerializable(
        pk: entry.id,
        name: entry.name,
        owner: entry.owner_id.map(data => data.id),
        owner_details: owner,
        description: entry.description,
        update_datetime: entry.update_datetime,
        creation_datetime: entry.creation_datetime,
        images: images,
        campaign: entry.campaign_id.id,
        campaign_details: entry.campaign_id
    )

proc serializeItem*(connection: DbConn, entry: Item): ItemSerializable =
    let entryRead = connection.getEntryById(entry.id, ItemRead)
    result = connection.serializeItemRead(entryRead)

type ItemOverviewSerializable* = object
    article_type: ArticleType
    description*: Option[string]
    pk*: int64
    name_full*: string
    name*: string
    campaign_details*: MinimumCampaignOverview
    update_datetime*: DjangoDateTime


proc overviewSerialize*(connection: DbConn, entry: ItemRead): ItemOverviewSerializable =
    result = ItemOverviewSerializable(
        article_type: ArticleType.atItem,
        description: entry.description.map(truncate),
        pk: entry.id,
        name_full: $entry,
        name: entry.name,
        campaign_details: entry.campaign_id,
        update_datetime: entry.update_datetime
    )

proc overviewSerialize*(connection: DbConn, entries: seq[ItemRead]): seq[ItemOverviewSerializable] =
    for entry in entries:
        result.add(connection.overviewSerialize(entry))