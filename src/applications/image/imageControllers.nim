import imageService
import imageModel
import prologue
import std/[strutils, options, json, strformat]
import ../../utils/[jwtContext, customResponses, errorResponses]
import jsony
import ../controllerTemplates
import ../allUrlParams
import imageDataTransferObjects


proc extractFileFromContext(ctx: JWTContext, fileFieldName: string): Option[UpLoadFile] =
  let hasFile: bool = ctx.request.formParams.data.hasKey(fileFieldName)
  if hasFile:
      result = some(ctx.getUploadFile(fileFieldName))
  else:
      result = none(UpLoadFile)


proc extractFKIdFieldFromContext(ctx: JWTContext, fieldName: string): Option[int64] =
    let imageIdStr: Option[string] = ctx.getFormParamsOption(fieldName)
    if imageIdStr.isSome():
        result = some(int64(parseInt(imageIdStr.get())))
    else: 
        result = none(int64)


proc createImageView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)
    let mediaDirectory: string = ctx.getSettings("mediaDir").getStr()

    var imageFormData = ImageDTO(
        imageFile: ctx.extractFileFromContext("image"),
        mediaDirectory: mediaDirectory,
        imageName: ctx.getFormParamsOption("name"),
        image_character_fk: ctx.extractFKIdFieldFromContext("character_article"),
        image_creature_fk: ctx.extractFKIdFieldFromContext("creature_article"),
        image_item_fk: ctx.extractFKIdFieldFromContext("item_article"),
        image_location_fk: ctx.extractFKIdFieldFromContext("location_article"),
        image_organization_fk: ctx.extractFKIdFieldFromContext("organization_article")
    )

    respondBadRequestOnDbError():
        let newImageEntry: Option[Image] = createImage(imageFormData)
        if newImageEntry.isSome():
            resp jsonyResponse[Image](ctx, newImageEntry.get())
        else:
            resp get400BadRequestResponse("The sent image could not be saved, because there was no image file in the sent form under the 'image' key.")


proc updateImageView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let imageToUpdateId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))
    let mediaDirectory: string = ctx.getSettings("mediaDir").getStr()

    var imageFormData = ImageDTO(
        imageFile: ctx.extractFileFromContext("image"),
        mediaDirectory: mediaDirectory,
        imageName: ctx.getFormParamsOption("name")
    )
        
    respondBadRequestOnDbError():
        let updatedImageEntry: Image = updateImageFileOrName(imageToUpdateId, imageFormData)
        resp jsonyResponse[Image](ctx , updatedImageEntry)


proc deleteImageView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let imageToDeleteId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))

    respondBadRequestOnDbError():
        deleteImage(imageToDeleteId)
        respDefault(Http204)
