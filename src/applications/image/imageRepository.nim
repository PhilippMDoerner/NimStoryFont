import std/[options, strformat]
import ../genericArticleRepository
import norm/[model, sqlite]
import imageModel
import ../../utils/[databaseUtils]
import tinypool


proc getImagesForArticle*(articleType: ImageType, articleId: int64): seq[Image] =
  var entries: seq[Image] = @[newModel(Image)]
  let condition: string = fmt "{$articleType}_article_id = ?"

  withDbConn(connection):
    connection.select(entries, condition, articleId)

  result = entries


proc updateImage*(connection: MyDbConn, imageToUpdate: var Image, newImageFilePath: Option[string], newImageName: Option[string]): Image =
  if newImageFilePath.isSome():
    imageToUpdate.image = newImageFilePath.get()

  if newImageName.isSome():
    imageToUpdate.name = newImageName
  
  result = connection.updateEntryInTransaction(imageToUpdate)