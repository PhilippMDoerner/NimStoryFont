import imageControllers
import imageModel
import prologue
import imageUtils
import ../allUrlParams
import ../../middleware/loginMiddleware
import std/strformat
import ../genericArticleControllers
import ../genericArticleRepository

proc addImageRoutes*(app: Prologue) =
  app.addRoute(
    re"/image/upload/",
    handler = imageControllers.createImageView,
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/image/pk/{ID_PATTERN}/",
    handler = imageControllers.updateImageView,
    httpMethod = [HttpPut, HttpPatch],
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/image/pk/{ID_PATTERN}",
    handler = createDeleteByIdHandler[DeleteParams, Image](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )
