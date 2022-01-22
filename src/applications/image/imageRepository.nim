import imageModel
import prologue
import std/[strutils]
import ../../utils/[jwtContext, database, fileUpload]
import norm/[model, sqlite]
import ../base_generics/genericArticleRepository


proc getArticleImage*(articleType: ImageType, articleId: int64): seq[Image] =
    var entries: seq[Image] = @[]
    entries.add(newModel(Image))

    let condition: string = $articleType & "_article_id = ?"

    withDbConn(connection):
      connection.select(entries, condition, articleId)

    result = entries


proc getFormImageId(ctx: Context, imageIdFieldName: string): Option[int64] =
    let imageIdField: string = ctx.getFormParams(imageIdFieldName, "")
    if imageIdField == "":
        return none(int64)

    let imageId = int64(parseInt(imageIdField))
    return some(imageId)


proc createImage*(ctx: JWTContext): Image =
  var file: UpLoadFile = ctx.getUploadFile("image")
  let filePath: string = uploadArticleImage(file)
  
  var img: Image = newModel(Image)
  img.image = filePath
  img.character_article_id = ctx.getFormImageId("character_article")
  img.creature_article_id = ctx.getFormImageId("creature_article")
  img.location_article_id = ctx.getFormImageId("location_article")
  img.organization_article_id = ctx.getFormImageId("organization_article")
  img.item_article_id = ctx.getFormImageId("item_article")

  result = createEntry(img)
