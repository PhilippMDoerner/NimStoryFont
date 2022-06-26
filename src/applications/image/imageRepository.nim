import std/[options, tables, strformat, strutils]
import ../genericArticleRepository
import norm/[sqlite]
import imageModel
import ../../utils/[databaseUtils]
import tinypool/sqlitePool


proc getImagesForArticle*(articleType: ImageType, articleId: int64): seq[Image] =
  let condition: string = fmt "{$articleType}_article_id = ?"

  withDbConn(connection):
    result = connection.getList(Image, condition, articleId.dbValue())

proc getImagesForArticles*(connection: MyDbConn, articleType: static ImageType, articleIds: seq[int64]): Table[int64, seq[Image]] =
  const articleFkFieldname = fmt"{$articleType}_article_id"
  let condition: string = fmt"""{articleFkFieldname} IN {articleIds.join(",")}"""

  let articleImages = connection.getList(Image, condition)

  for id in articleIds:
    result[id] = seq[]
  
  for image in articleImages:
    let articleId = image.getField(articleFkFieldname)
    result[articleId].add(image)


proc updateImage*(connection: MyDbConn, imageToUpdate: var Image, newImageFilePath: Option[string], newImageName: Option[string]): Image =
  if newImageFilePath.isSome():
    imageToUpdate.image = newImageFilePath.get()

  if newImageName.isSome():
    imageToUpdate.name = newImageName
  
  result = connection.updateEntryInTransaction(imageToUpdate)