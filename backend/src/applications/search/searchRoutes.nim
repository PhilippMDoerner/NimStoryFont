import prologue
import ../../middleware/loginMiddleware
import searchControllers
import std/strformat
import ../allUrlParams

proc addSearchRoutes*(app: Prologue) =
  app.addRoute(
    re fmt"/search/single/{ARTICLE_TYPE_PATTERN}/{ID_PATTERN}",
    handler = searchControllers.findArticle,
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
  app.addRoute(
    re fmt"/search/{CAMPAIGN_NAME_PATTERN}/{SEARCH_TEXT_PATTERN}",
    handler = searchControllers.findArticles,
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
  app.addRoute(
    re fmt"/search/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_TYPE_PATTERN}/{SEARCH_TEXT_PATTERN}",
    handler = searchControllers.findArticlesOfType,
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
