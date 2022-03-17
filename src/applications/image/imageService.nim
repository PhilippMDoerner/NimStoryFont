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


proc createImage*(imageDTO: var ImageDTO): Option[Image] =
  if imageDTO.imageFile.isNone():
    return none(Image)

  let filePath: string = uploadArticleImage(imageDTO.imageFile.get(), imageDTO.imageDirectory)
  
  var img: Image = Image(
    image: filePath,
    character_article_id: imageDTO.image_character_fk,
    creature_article_id: imageDTO.image_creature_fk,
    location_article_id: imageDTO.image_location_fk,
    organization_article_id: imageDTO.image_organization_fk,
    item_article_id: imageDTO.image_item_fk,
    name: imageDTO.imageName
  )

  result = some(createEntry(img))

proc updateImageFileOrName*(imageId: int64, imageDTO: var ImageDTO): Image =
  ## This is a special form of updating, as it is for updating individual fields
  ## which may or may not be specified. If they are specified, edit the values
  ## in the entry and persist them to the database. If they aren't, ignore them.
  var imageToUpdate: Image

  {.cast(gcsafe).}:
    withDbTransaction(connection):
      imageToUpdate = connection.getEntryById(imageId, Image)

      if imageDTO.imageFile.isSome():
        let newImageFilePath: string = uploadArticleImage(imageDTO.imageFile.get(), imageDTO.imageDirectory)
        imageToUpdate.image = newImageFilePath

      if imageDTO.imageName.isSome():
        imageToUpdate.name = imageDTO.imageName
      
      result = connection.updateEntryInTransaction(imageToUpdate)
  