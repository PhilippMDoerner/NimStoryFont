import imageModel
import imageDataTransferObjects
import prologue
import std/[strutils, options, strformat]
import ../genericArticleRepository
import ../../utils/[fileUpload, databaseUtils]
import norm/[model, sqlite]
import tinypool
import ../../applicationConstants
import imageRepository

export imageModel

proc getRelativeFilepathTo(absoluteFilepath: string, mediaDirectory: string): string =
  result = absoluteFilepath.substr(mediaDirectory.len + 1)

proc getArticleImage*(articleType: ImageType, articleId: int64): seq[Image] = 
  result = getImagesForArticle(articleType, articleId)#

proc getImageById*(imageId: int64): Image = 
  result = getEntryById(imageId, Image)

proc createImage*(imageDTO: var ImageDTO): Option[Image] =
  if imageDTO.imageFile.isNone():
    return none(Image)

  let absoluteImagePath: string = saveArticleImage(imageDTO.imageFile.get(), imageDTO.mediaDirectory)
  let imagePathInDatabase = absoluteImagePath.getRelativeFilepathTo(imageDTO.mediaDirectory)
  var image: Image = Image(
    image: imagePathInDatabase,
    character_article_id: imageDTO.image_character_fk,
    creature_article_id: imageDTO.image_creature_fk,
    location_article_id: imageDTO.image_location_fk,
    organization_article_id: imageDTO.image_organization_fk,
    item_article_id: imageDTO.image_item_fk,
    name: imageDTO.imageName
  )

  try:
    result = some(createEntry(image))
  except DbError:
    deleteArticleImage(absoluteImagePath)
    raise

#TODO: Refactor this to more cleanly handle when to delete an old image if the image was swapped out
proc updateImageFileOrName*(imageId: int64, imageDTO: var ImageDTO): Image =
  ## This is a special form of updating, as it is for updating individual fields
  ## which may or may not be specified. If they are specified, edit the values
  ## in the entry and persist them to the database. If they aren't, ignore them.  
  var newImageRelativeFilePath: Option[string]
  let isImageBeingReplaced = imageDTO.imageFile.isSome()
  if isImageBeingReplaced: 
    let newImageAbsoluteFilePath = saveArticleImage(imageDTO.imageFile.get(), imageDTO.mediaDirectory)
    newImageRelativeFilePath = some(newImageAbsoluteFilePath.getRelativeFilepathTo(imageDTO.mediaDirectory))
  else:
    newImageRelativeFilePath = none(string)
  
  var oldImageRelativeFilePath: string
  try: 
    {.cast(gcsafe).}:
      withDbTransaction(connection):
        var imageToUpdate: Image = connection.getEntryById(imageId, Image)
        oldImageRelativeFilePath = imageToUpdate.image

        result = connection.updateImage(imageToUpdate, newImageRelativeFilePath, imageDTO.imageName)
  
  except DbError:
    if isImageBeingReplaced:
      deleteArticleImage(newImageRelativeFilePath.get(), imageDTO.mediaDirectory)
      raise

  if isImageBeingReplaced:
    deleteArticleImage(oldImageRelativeFilePath, imageDTO.mediaDirectory) #Delete last to make sure you only delete after the image was succesfully swapped out in the database

  