import imageControllers
import prologue
import ../../middleware/loginMiddleware

proc addImageRoutes*(app: Prologue) =
    app.addRoute(
        re"/image/", 
        handler = imageControllers.createImageView,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )