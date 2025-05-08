import norm/model
import mapModel
import ../image/imageUtils
import ../campaign/campaignModel
import ../mapMarker/[markerSerialization, markerModel]
import ../genericArticleRepository
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[options, sugar, sequtils, strformat]
import ../articleModel

type MapSerializable* = object
  pk: int64
  name: string
  image: string
  icon: Option[string]
  update_datetime: DjangoDateTime
  campaign: int64
  campaign_details: MinimumCampaignOverview
  markers: seq[MarkerSerializable]

proc serializeMapRead*(connection: DbConn, entry: MapRead): MapSerializable =
  let markers = connection.getManyFromOne(entry, MarkerRead).map(
      marker => connection.serializeMarkerRead(marker)
    )

  result = MapSerializable(
    pk: entry.id,
    name: entry.name,
    image: entry.image.getImagePath(),
    icon: entry.icon.map(getImagePath),
    update_datetime: entry.update_datetime,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
    markers: markers,
  )

proc serializeMap*(connection: DbConn, entry: Map): MapSerializable =
  let mapRead = connection.getEntryById(entry.id, MapRead)
  result = connection.serializeMapRead(mapRead)

type MapOverviewSerializable* = object
  article_type: ArticleType
  description: string
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  icon: Option[string]

proc overviewSerialize*(connection: DbConn, entry: MapRead): MapOverviewSerializable =
  result = MapOverviewSerializable(
    article_type: ArticleType.atMap,
    description: fmt"A map of {entry.name}",
    pk: entry.id,
    name_full: entry.name,
    name: entry.name,
    campaign_details: entry.campaign_id,
    icon: entry.icon.map(getImagePath),
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
  )

proc overviewSerialize*(
    connection: DbConn, entries: seq[MapRead]
): seq[MapOverviewSerializable] =
  for entry in entries:
    result.add(connection.overviewSerialize(entry))
