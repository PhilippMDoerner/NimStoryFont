import std/[options, strformat]
import ../genericArticleRepository
import norm/[model, sqlite]
import imageModel
import ../../utils/[databaseUtils]
import tinypool/sqlitePool


proc getImagesForArticle*(articleType: ImageType, articleId: int64): seq[Image] =
  let condition: string = fmt "{$articleType}_article_id = ?"

  withDbConn(connection):
    result = connection.getList(Image, condition, articleId.dbValue())



proc updateImage*(connection: MyDbConn, imageToUpdate: var Image, newImageFilePath: Option[string], newImageName: Option[string]): Image =
  if newImageFilePath.isSome():
    imageToUpdate.image = newImageFilePath.get()

  if newImageName.isSome():
    imageToUpdate.name = newImageName
  
  result = connection.updateEntryInTransaction(imageToUpdate)