import std/[options, tables, strformat, strutils]
import ../genericArticleRepository
import norm/[sqlite]
import imageModel
import ../../utils/[databaseUtils, macroUtils]
import tinypool/sqlitePool


proc queryImagesForArticle*(articleType: ImageType, articleId: int64): seq[Image] =
  let condition: string = fmt "{$articleType}_article_id = ?"

  withDbConn(connection):
    result = connection.getList(Image, condition, articleId.dbValue())

proc queryImagesForArticles*(connection: MyDbConn, articleType: static ImageType, articleIds: seq[int64]): Table[int64, seq[Image]] =
  const articleFkFieldname = fmt"{$articleType}_article_id"
  let articleIdStr: string = articleIds.join(",")
  let condition: string = fmt """{articleFkFieldname} IN ({articleIdStr})"""

  let articleImages = connection.getList(Image, condition)

  for id in articleIds:
    result[id] = @[]
  
  for image in articleImages:
    let articleId: int64 = image.getField(articleFkFieldname).get()
    result[articleId].add(image)


proc updateImage*(connection: MyDbConn, imageToUpdate: var Image, newImageFilePath: Option[string], newImageName: Option[string]): Image =
  if newImageFilePath.isSome():
    imageToUpdate.image = newImageFilePath.get()

  if newImageName.isSome():
    imageToUpdate.name = newImageName
  
  result = connection.updateEntryInTransaction(imageToUpdate)