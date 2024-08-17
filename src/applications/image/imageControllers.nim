import std/[strutils, options, json]
import prologue
import jsony
import ./imageService
import ./imageModel
import ./imageSerialization
import ./imageDataTransferObjects
import ../allUrlParams
import ../controllerTemplates
import ../../utils/[jwtContext, customResponses, errorResponses]
import ../../applicationSettings
import ../../database

proc createImageView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)
    let imageDirectory: string = ctx.getSetting(SettingName.snImageDir).getStr()

    var imageFormData = ImageDTO(
        imageFile: ctx.extractFormFile("image"),
        mediaDirectory: imageDirectory,
        imageName: ctx.getFormParamsOption("name"),
        image_character_fk: ctx.extractIdFormParam("character_article"),
        image_creature_fk: ctx.extractIdFormParam("creature_article"),
        image_item_fk: ctx.extractIdFormParam("item_article"),
        image_location_fk: ctx.extractIdFormParam("location_article"),
        image_organization_fk: ctx.extractIdFormParam("organization_article")
    )

    respondOnError():
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
        imageFile: ctx.extractFormFile("image"),
        mediaDirectory: mediaDirectory,
        imageName: ctx.getFormParamsOption("name")
    )
        
    respondOnError():
        let updatedImageEntry: Image = updateImageFileOrName(imageToUpdateId, imageFormData)
        let imageSerializable: ImageSerializable = updatedImageEntry.serializeImage()

        resp jsonyResponse(ctx , imageSerializable)


proc deleteImageView*(ctx: Context) {.async, gcsafe.} =
    let ctx = JWTContext(ctx)
    let imageToDeleteId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))

    respondOnError():
        deleteImage(imageToDeleteId)
        respDefault(Http204)
