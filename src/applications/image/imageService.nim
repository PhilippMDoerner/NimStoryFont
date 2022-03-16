import imageModel
import imageDataTransferObjects
import prologue
import std/[strutils, options]
import ../genericArticleRepository
import ../../utils/[jwtContext, fileUpload, databaseUtils]
import norm/[model, sqlite]
import tinypool
import ../../applicationConstants

export imageModel


proc getArticleImage*(articleType: ImageType, articleId: int64): seq[Image] =
    var entries: seq[Image] = @[]
    entries.add(newModel(Image))

    let condition: string = $articleType & "_article_id = ?"

    withDbConn(connection):
      connection.select(entries, condition, articleId)

    result = entries


proc getImageById*(imageId: int64): Image = getEntryById(imageId, Image)


proc getFormImageId(ctx: Context, imageIdFieldName: string): Option[int64] =
    let imageIdField: string = ctx.getFormParams(imageIdFieldName, "")
    if imageIdField == "":
        return none(int64)

    let imageId = int64(parseInt(imageIdField))
    return some(imageId)


proc createImage*(ctx: JWTContext): Image =
  var file: UpLoadFile = ctx.getUploadFile("image")
  let mediaDirectory: string = ctx.getSettings("mediaDir").getStr()
  let filePath: string = uploadArticleImage(file, mediaDirectory)
  
  var img: Image = newModel(Image)
  img.image = filePath
  img.character_article_id = ctx.getFormImageId("character_article")
  img.creature_article_id = ctx.getFormImageId("creature_article")
  img.location_article_id = ctx.getFormImageId("location_article")
  img.organization_article_id = ctx.getFormImageId("organization_article")
  img.item_article_id = ctx.getFormImageId("item_article")

  result = createEntry(img)

proc updateImage*(imageId: int64, imageDTO: var ImageDTO): Image =

  var imageToUpdate: Image
  
  withDbTransaction(connection):
    imageToUpdate = connection.getEntryById(imageId, Image)

    if imageDTO.imageFile.isSome():
      let newImageFilePath: string = uploadArticleImage(imageDTO.imageFile.get(), imageDTO.imageDirectory)
      imageToUpdate.image = newImageFilePath

    if imageDTO.imageName.isSome():
      imageToUpdate.name = imageDTO.imageName

    if imageDTO.image_character_fk.isSome():
      imageToUpdate.character_article_id = imageDTO.image_character_fk
    
    if imageDTO.image_creature_fk.isSome():
      imageToUpdate.creature_article_id = imageDTO.image_creature_fk
    
    if imageDTO.image_item_fk.isSome():
      imageToUpdate.item_article_id = imageDTO.image_item_fk
    
    if imageDTO.image_location_fk.isSome():
      imageToUpdate.location_article_id = imageDTO.image_location_fk
    
    if imageDTO.image_organization_fk.isSome():
      imageToUpdate.organization_article_id = imageDTO.image_organization_fk
    
    connection.update(imageToUpdate)
  
  result = imageToUpdate
