import prologue
import std/[json, strutils, sugar]
import ../../utils/[jwtContext, myStrutils, errorResponses, databaseUtils, customResponses]
import mapService
import mapSerialization
import ../../applicationSettings
import ../genericArticleRepository
import jsony
import tinypool/sqlitePool
import ../allUrlParams
import ../controllerTemplates
import ../authentication/authenticationUtils

proc extractFileFromContext(ctx: JWTContext, fileFieldName: string): Option[UploadFile] =
  let hasFile: bool = ctx.request.formParams.data.hasKey(fileFieldName)
  if hasFile:
      result = some(ctx.getUploadFile(fileFieldName))
  else:
      result = none(UploadFile)

proc extractIdFieldFromContext(ctx: JWTContext, fieldName: string): Option[int64] =
    let fkFieldValue: Option[string] = ctx.getFormParamsOption(fieldName)
    result = fkFieldValue.map(val => parseInt(val).int64)

proc createMapController*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let campaignId: Option[int64] = ctx.extractIdFieldFromContext("campaign")
    if campaignId.isNone():
      resp get400BadRequestResponse("Can not create map without 'campaign' field")

    let mapName: Option[string] = ctx.getFormParamsOption("name")
    if mapName.isNone():
      resp get400BadRequestResponse("Can not create map without 'name' field")

    let mapImage: Option[UploadFile] = ctx.extractFileFromContext("image")
    if mapImage.isNone():
      resp get400BadRequestResponse("Can not create map without 'image' field")

    let mapIcon: Option[string] = ctx.getFormParamsOption("icon")
    let mediaDirectory: string = ctx.getSetting(SettingName.snImageDir).getStr()

    var mapData: MapDTO = MapDTO(
      campaignId: campaignId.get(),
      mapName: mapName.get(),
      mapIcon: mapIcon,
      mapImage: mapImage.get(),
      mediaDirectory: mediaDirectory
    )

    respondOnError():
      checkCreatePermission(ctx, campaignId.get())

      withDbTransaction(connection):
        let createdMap = connection.createMap(mapData)
        let serializedMap = connection.serializeMap(createdMap)
        resp jsonyResponse(ctx, serializedMap)