import markerModel
import ../mapMarkerType/[markerTypeModel, markerTypeSerialization]
import norm/sqlite
import ../location/[locationModel, locationRepository]
import ../genericArticleRepository
import std/[sugar, options, sequtils]

type MarkerLocation = object
    name: string
    description: Option[string]
    parent_location_name: Option[string]
    sublocations: seq[string]

proc serializeMarkerLocation(connection: DbConn, entry: LocationRead): MarkerLocation = 
    let sublocations: seq[string] = connection.getSubLocations(entry.id).map(sloc => sloc.name)
    result = MarkerLocation(
        name: entry.name,
        description: entry.description,
        parent_location_name: entry.parent_location_id.map(ploc => ploc.name),
        sublocations: sublocations
    )

type MarkerSerializable* = object
    pk: int64
    color: Option[string]
    icon: Option[string]
    longitude: int
    latitude: int
    map: int64
    location: int64
    location_details: MarkerLocation
    `type`: Option[int64]
    type_details: Option[MarkerTypeSerializable]


proc serializeMarkerRead*(connection: DbConn, entry: MarkerRead): MarkerSerializable =
    result = MarkerSerializable(
        pk: entry.id,
        color: entry.color,
        icon: entry.icon,
        longitude: entry.longitude,
        latitude: entry.latitude,
        map: entry.map_id.id,
        location: entry.location_id.id,
        location_details: connection.serializeMarkerLocation(entry.location_id),
        `type`: entry.type_id.map(markerType => markerType.id),
        type_details: entry.type_id.map(markerType => connection.serializeMarkerType(markerType))
    )

proc serializeMarker*(connection: DbConn, entry: Marker): MarkerSerializable =
    let fullEntry = connection.getEntryById(entry.id, MarkerRead)
    result = connection.serializeMarkerRead(fullEntry)
