import imageService
import imageModel
import imageSerialization
import prologue
import std/[strutils, options, json]
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import ../../applicationSettings
import jsony
import ../controllerTemplates
import ../allUrlParams
import imageDataTransferObjects


proc extractFileFromContext(ctx: JWTContext, fileFieldName: string): Option[UploadFile] =
  let hasFile: bool = ctx.request.formParams.data.hasKey(fileFieldName)
  if hasFile:
      result = some(ctx.getUploadFile(fileFieldName))
  else:
      result = none(UploadFile)


proc extractFKIdFieldFromContext(ctx: JWTContext, fieldName: string): Option[int64] =
    let imageIdStr: Option[string] = ctx.getFormParamsOption(fieldName)
    if imageIdStr.isSome():
        result = some(int64(parseInt(imageIdStr.get())))
    else: 
        result = none(int64)


proc createImageView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)
    let imageDirectory: string = ctx.getSetting(SettingName.snImageDir).getStr()

    var imageFormData = ImageDTO(
        imageFile: ctx.extractFileFromContext("image"),
        mediaDirectory: imageDirectory,
        imageName: ctx.getFormParamsOption("name"),
        image_character_fk: ctx.extractFKIdFieldFromContext("character_article"),
        image_creature_fk: ctx.extractFKIdFieldFromContext("creature_article"),
        image_item_fk: ctx.extractFKIdFieldFromContext("item_article"),
        image_location_fk: ctx.extractFKIdFieldFromContext("location_article"),
        image_organization_fk: ctx.extractFKIdFieldFromContext("organization_article")
    )

    respondBadRequestOnDbError():
      withDbConn(connection):
        let newImageEntry: Option[Image] = connection.createImage(imageFormData)
        if newImageEntry.isSome():
            let imageSerializable: ImageSerializable = connection.serializeImage(newImageEntry.get())
            resp jsonyResponse(ctx, imageSerializable)
        else:
            resp get400BadRequestResponse("The sent image could not be saved, because there was no image file in the sent form under the 'image' key.")


proc updateImageView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let imageToUpdateId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))
    let mediaDirectory: string = ctx.getSetting(SettingName.snImageDir).getStr()

    var imageFormData = ImageDTO(
        imageFile: ctx.extractFileFromContext("image"),
        mediaDirectory: mediaDirectory,
        imageName: ctx.getFormParamsOption("name")
    )
        
    respondBadRequestOnDbError():
        let updatedImageEntry: Image = updateImageFileOrName(imageToUpdateId, imageFormData)
        let imageSerializable: ImageSerializable = updatedImageEntry.serializeImage()

        resp jsonyResponse(ctx , imageSerializable)


proc deleteImageView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let imageToDeleteId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
        deleteImage(imageToDeleteId)
        respDefault(Http204)
