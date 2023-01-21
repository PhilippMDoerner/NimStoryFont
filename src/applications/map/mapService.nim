import std/[strutils]
import prologue
import norm/sqlite
import ./mapModel
import ../mapMarker/markerModel
import ../mapMarkerType/markerTypeModel
import ../../utils/djangoDateTime/djangoDateTimeType
import ../../utils/[fileUpload]
import ../genericArticleRepository
import ../../database

export mapModel
export markerTypeModel
export markerModel

type MapDTO* = object
  campaignId*: int64
  mapName*: string
  mapIcon*: Option[string]
  mapImage*: UploadFile
  mediaDirectory*: string

proc createMap*(connection: DbConn, requestParams: var MapDTO): Map =
  let creationTime: DjangoDateTime = now()

  let absoluteImagePath: string = saveFile(requestParams.mapImage, requestParams.mediaDirectory)
  var relativeImagePath = absoluteImagePath.getRelativeFilepathTo(requestParams.mediaDirectory)
  relativeImagePath.removePrefix("/")

  var map = Map(
    icon: requestParams.mapIcon,
    image: relativeImagePath,
    name: requestParams.mapName,
    creationDateTime: creationTime,
    updateDateTime: creationTime,
    campaignId: requestParams.campaignId
  )

  try:
    result = createEntry(map)
  except Exception:
    deleteFile(absoluteImagePath)
    raise
