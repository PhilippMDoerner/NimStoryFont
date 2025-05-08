import std/[options, strformat, sugar, sequtils]
import norm/sqlite
import ./creatureModel
import ../genericArticleRepository
import ../campaign/campaignModel
import ../articleModel
import ../image/[imageSerialization, imageModel]
import ../../utils/[myStrutils, djangoDateTime/djangoDateTimeType]

type CreatureSerializable* = object
  pk*: int64
  name*: string
  description*: Option[string]
  creation_datetime*: DjangoDateTime
  update_datetime*: DjangoDateTime
  campaign: int64
  campaign_details*: MinimumCampaignOverview
  images: seq[ImageSerializable]

proc serializeCreatureRead*(
    connection: DbConn, entry: CreatureRead
): CreatureSerializable =
  let images = connection.getManyFromOne(entry, Image).map(serializeImage)
  result = CreatureSerializable(
    pk: entry.id,
    name: entry.name,
    description: entry.description,
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
    images: images,
  )

proc serializeCreature*(connection: DbConn, entry: Creature): CreatureSerializable =
  let fullEntry = connection.getEntryById(entry.id, CreatureRead)
  result = connection.serializeCreatureRead(fullEntry)

type CreatureOverviewSerializable* = object
  article_type: ArticleType
  description: Option[string]
  pk*: int64
  name*: string
  name_full*: string
  campaign_details*: MinimumCampaignOverview
  update_datetime*: DjangoDateTime
  creation_datetime*: DjangoDateTime

proc overviewSerialize*(
    connection: DbConn, entry: CreatureOverview | CreatureRead
): CreatureOverviewSerializable =
  result = CreatureOverviewSerializable(
    article_type: ArticleType.atCreature,
    description: entry.description.map(truncate),
    pk: entry.id,
    name: entry.name,
    name_full: entry.name,
    campaign_details: entry.campaign_id,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
  )

proc overviewSerialize*(
    connection: DbConn, entries: seq[CreatureOverview | CreatureRead]
): seq[CreatureOverviewSerializable] =
  for entry in entries:
    result.add(connection.overviewSerialize(entry))
