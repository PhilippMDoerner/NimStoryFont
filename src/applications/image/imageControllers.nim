import imageService
import imageModel
import prologue
import std/[strutils, options]
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


proc extractFKIdFieldFromContext(ctx: JWTContext, fileFieldName: string): Option[int64] =
    let imageIdStr: Option[string] = ctx.getFormParamsOption("character_article")
    if imageIdStr.isSome():
        result = some(int64(parseInt(imageIdStr.get())))
    else: 
        result = none(int64)


proc createImageView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)
    
    respondBadRequestOnDbError():
        let newImageEntry: Image = createImage(ctx)
        resp jsonyResponse[Image](ctx, newImageEntry)


proc updateImageView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)
    let imageToUpdateId: int = parseInt(ctx.getPathParams(ID_PARAM))
    let mediaDirectory: string = ctx.getSettings("mediaDir").getStr()

    var imageFormData = ImageDTO(
        imageFile: ctx.extractFileFromContext("image"),
        imageDirectory: mediaDirectory,
        imageName: ctx.getFormParamsOption("name"),
        image_character_fk: ctx.extractFKIdFieldFromContext("character_article"),
        image_creature_fk: ctx.extractFKIdFieldFromContext("creature_article"),
        image_item_fk: ctx.extractFKIdFieldFromContext("item_article"),
        image_location_fk: ctx.extractFKIdFieldFromContext("location_article"),
        image_organization_fk: ctx.extractFKIdFieldFromContext("organization_article")
    )
        
    respondBadRequestOnDbError():
        let updatedImageEntry: Image = updateImage(imageToUpdateId, imageFormData)
        resp jsonyResponse[Image](ctx , updatedImageEntry)
