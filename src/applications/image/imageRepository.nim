import imageModel
import ../../utils/database
import norm/[model, sqlite]
import ../base_generics/genericArticleRepository


proc getArticleImage*(articleType: ImageType, articleId: int64): seq[Image] =
    let db = createRawDatabaseConnection()
    var entries: seq[Image] = @[]
    entries.add(newModel(Image))

    let condition: string = $articleType & "_article_id = ?"
    db.select(entries, condition, articleId)

    result = entries
