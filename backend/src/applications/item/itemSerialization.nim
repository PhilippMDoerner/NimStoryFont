import std/[options, sugar, sequtils, tables]
import norm/model
import ./itemModel
import ./itemUtils
import ./itemService
import ../image/[imageModel, imageSerialization, imageUtils]
import ../articleModel
import ../campaign/campaignModel
import ../genericArticleRepository
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
    campaign_details: entry.campaign_id,
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
  creation_datetime*: DjangoDateTime
  images: seq[string]

proc overviewSerialize*(
    connection: DbConn, entry: ItemRead, images: seq[Image] = @[]
): ItemOverviewSerializable =
  let imagePaths = images.map(getImagePath)

  result = ItemOverviewSerializable(
    article_type: ArticleType.atItem,
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
    connection: DbConn, entries: seq[ItemRead]
): seq[ItemOverviewSerializable] =
  let itemIds: seq[int64] = entries.map(item => item.id)
  let itemImages: Table[int64, seq[Image]] = connection.getItemImages(itemIds)

  for entry in entries:
    let images: seq[Image] =
      if itemImages.hasKey(entry.id):
        itemImages[entry.id]
      else:
        @[]

    result.add(connection.overviewSerialize(entry, images))
