import imageControllers
import imageModel
import prologue
import ../allUrlParams
import ../../middleware/loginMiddleware
import std/strformat
import ../genericArticleControllers

proc addImageRoutes*(app: Prologue) =
    app.addRoute(
        re"/image/", 
        handler = imageControllers.createImageView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/image/{ID_PATTERN}/",
        handler = imageControllers.updateImageView,
        httpMethod = [HttpPut, HttpPatch],
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/image/{ID_PATTERN}/",
        handler = createEntryDeletionHandler(Image, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )
