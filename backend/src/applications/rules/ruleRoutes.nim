import std/strformat
import prologue
import ./ruleModel
import ./ruleSerialization
import ./ruleService
import ../allUrlParams
import ../genericArticleControllers
import ../../middleware/loginMiddleware

proc addRuleRoutes*(app: Prologue) =
  app.addRoute(
    re"/rule/",
    handler =
      createCreateArticleHandler[CreateParams, Rule, RuleSerializable](serializeRule),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Rule](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/pk/{ID_PATTERN}/",
    handler =
      createUpdateByIdHandler[UpdateParams, Rule, RuleSerializable](serializeRule),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/pk/{ID_PATTERN}/",
    handler =
      createPatchByIdHandler[UpdateParams, Rule, RuleSerializable](serializeRule),
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/pk/{ID_PATTERN}/",
    handler = createReadByIdHandler[ReadByIdParams, RuleRead, RuleSerializable](
      serializeRuleRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadCampaignListHandler[ReadListParams, RuleRead, RuleSerializable](
      serializeRuleReads
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/{CAMPAIGN_NAME_PATTERN}/",
    handler = createReadCampaignListHandler[ReadListParams, RuleRead, RuleSerializable](
      serializeRuleReads
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/rule/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/",
    handler = createReadByNameHandler[ReadByNameParams, RuleRead, RuleSerializable](
      serializeRuleRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )
