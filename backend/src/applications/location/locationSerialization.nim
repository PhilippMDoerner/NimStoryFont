import std/[options, sugar, sequtils, tables]
import norm/model
import ./locationModel
import ./locationUtils
import ./locationService
import ./locationRepository
import ../articleModel
import ../image/[imageModel, imageSerialization, imageUtils]
import ../mapMarker/[markerModel]
import ../mapMarkerType/[markerTypeModel]
import ../character/[characterModel, characterUtils]
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/[djangoDateTime/djangoDateTimeType, myStrutils]
import ../../applicationConstants

type LocationCharacter* = object
  pk*: int64
  name*: string
  name_full*: string

proc serializeLocationCharacter(entry: Character): LocationCharacter =
  result = LocationCharacter(pk: entry.id, name: entry.name, name_full: $entry)

type LocationMarker* = object
  map: string
  map_icon: Option[string]

proc serializeLocationMarker(entry: MarkerRead): LocationMarker =
  result = LocationMarker(map: entry.map_id.name, map_icon: entry.map_id.icon)

type ParentLocationSerializable* = object
  pk*: Option[int64]
  name*: string
  name_full*: string
  parent_location*: Option[string]

proc serializeParentLocation(
    entry: ParentLocation | LocationRead
): ParentLocationSerializable =
  result = ParentLocationSerializable(
    pk: some(entry.id),
    name: entry.name,
    name_full: entry.name,
    parent_location: entry.parent_location_id.map(ploc => ploc.name),
  )

proc serializeParentLocation(
    entry: Option[ParentLocation]
): ParentLocationSerializable =
  if entry.isSome():
    result = entry.get().serializeParentLocation()
  else:
    result = ParentLocationSerializable(
      pk: none(int64),
      name: NONE_STRING,
      name_full: NONE_STRING,
      parent_location: none(string),
    )

proc serializeParentLocation(entry: Option[LocationRead]): ParentLocationSerializable =
  if entry.isSome():
    result = entry.get().serializeParentLocation()
  else:
    result = serializeParentLocation(none(ParentLocation))

type SubLocationSerializable* = object
  creation_datetime: DjangoDateTime
  update_datetime: DjangoDateTime
  pk: int64
  name: string
  description: Option[string]
  parent_location: Option[int64]
  parent_location_details: ParentLocationSerializable
  parent_location_list: seq[string]
  name_full: string
  characters: seq[LocationCharacter]
  marker_details: seq[LocationMarker]
  campaign: int64
  campaign_details: MinimumCampaignOverview

proc serializeSubLocation(
    connection: DbConn, entry: LocationRead
): SubLocationSerializable =
  let parentLocationNames: seq[string] =
    connection.getParentLocations(entry.id).map(loc => loc.name)
  let characters: seq[LocationCharacter] =
    connection.getManyFromOne(entry, Character).map(serializeLocationCharacter)
  let markers: seq[LocationMarker] =
    connection.getManyFromOne(entry, MarkerRead).map(serializeLocationMarker)

  result = SubLocationSerializable(
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    pk: entry.id,
    name: entry.name,
    name_full: connection.stringifyLocation(entry),
    description: entry.description,
    parent_location: entry.parent_location_id.map(ploc => ploc.id),
    parent_location_details: entry.parent_location_id.serializeParentLocation(),
    parent_location_list: parentLocationNames,
    characters: characters,
    marker_details: markers,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
  )

type LocationSerializable* = object
  creation_datetime*: DjangoDateTime
  update_datetime*: DjangoDateTime
  pk*: int64
  name*: string
  name_full*: string
  description*: Option[string]
  parent_location*: Option[int64]
  parent_location_details*: ParentLocationSerializable
  parent_location_list*: seq[string]
  images*: seq[ImageSerializable]
  sublocations*: seq[SubLocationSerializable]
  characters*: seq[LocationCharacter]
  marker_details*: seq[LocationMarker]
  campaign*: int64
  campaign_details*: MinimumCampaignOverview

proc serializeLocationRead*(
    connection: DbConn, entry: LocationRead
): LocationSerializable =
  var images = connection.getManyFromOne(entry, Image).map(serializeImage)

  let parentLocations: seq[ParentLocationSerializable] =
    connection.getParentLocationReads(entry.id).map(serializeParentLocation)
  let sublocations: seq[SubLocationSerializable] = connection
    .getManyFromOne(entry, LocationRead)
    .map(sloc => connection.serializeSubLocation(sloc))
  let characters: seq[LocationCharacter] =
    connection.getManyFromOne(entry, Character).map(serializeLocationCharacter)
  let markers: seq[LocationMarker] =
    connection.getManyFromOne(entry, MarkerRead).map(serializeLocationMarker)

  result = LocationSerializable(
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    pk: entry.id,
    name: entry.name,
    name_full: connection.stringifyLocation(entry),
    description: entry.description,
    parent_location: entry.parent_location_id.map(ploc => ploc.id),
    parent_location_details: entry.parent_location_id.serializeParentLocation(),
    parent_location_list: parentLocations.map(ploc => ploc.name),
    images: images,
    sublocations: sublocations,
    characters: characters,
    marker_details: markers,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
  )

proc serializeLocation*(connection: DbConn, entry: Location): LocationSerializable =
  let locationRead = connection.getEntryById(entry.id, LocationRead)
  result = connection.serializeLocationRead(locationRead)

type LocationOverviewSerializable* = object
  article_type: ArticleType
  description: Option[string]
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime
  parent_location_details: ParentLocationSerializable
  parent_location: Option[int64]
  images: seq[string]

proc overviewSerialize(
    entry: LocationRead, campaignLocations: seq[LocationRead], images: seq[Image] = @[]
): LocationOverviewSerializable =
  let imagePaths = images.map(getImagePath)

  let fullLocationName = stringifyLocation(entry, campaignLocations)
  result = LocationOverviewSerializable(
    article_type: ArticleType.atLocation,
    description: entry.description.map(truncate),
    pk: entry.id,
    name_full: fullLocationName,
    name: entry.name,
    campaign_details: entry.campaign_id,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
    parent_location_details: entry.parent_location_id.serializeParentLocation(),
    parent_location: entry.parent_location_id.map(ploc => ploc.id),
    images: imagePaths,
  )

proc overviewSerialize*(
    connection: DbConn, entry: LocationRead
): LocationOverviewSerializable =
  let campaignName = entry.campaign_id.name
  let campaignLocations = connection.getCampaignList(campaignName, LocationRead)
  result = overviewSerialize(entry, campaignLocations)

proc overviewSerialize*(
    connection: DbConn, entries: seq[LocationRead]
): seq[LocationOverviewSerializable] =
  if entries.len == 0:
    return @[]

  let locationIds: seq[int64] = entries.map(loc => loc.id)
  let locationImages: Table[int64, seq[Image]] =
    connection.getLocationImages(locationIds)

  let campaignName = entries[0].campaign_id.name
  let campaignLocations = connection.getCampaignList(campaignName, LocationRead)

  for location in entries:
    let images: seq[Image] =
      if locationImages.hasKey(location.id):
        locationImages[location.id]
      else:
        @[]
    result.add(overviewSerialize(location, campaignLocations, images))
