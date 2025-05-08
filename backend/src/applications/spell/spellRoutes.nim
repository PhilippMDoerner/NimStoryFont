import std/strformat
import prologue
import ./spellModel
import ./spellUtils
import ./spellService
import ./spellSerialization
import ./spellConstants
import ../genericArticleControllers
import ../allUrlParams
import ../../middleware/loginMiddleware

proc addSpellRoutes*(app: Prologue) =
  app.addRoute(
    re"/spell/",
    handler =
      createCreateArticleHandler[CreateParams, Spell, SpellSerializable](serializeSpell),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, Spell](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/pk/{ID_PATTERN}/",
    handler =
      createUpdateByIdHandler[UpdateParams, Spell, SpellSerializable](serializeSpell),
    httpMethod = HttpPut,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/pk/{ID_PATTERN}/",
    handler =
      createPatchByIdHandler[UpdateParams, Spell, SpellSerializable](serializeSpell),
    httpMethod = HttpPatch,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/pk/{ID_PATTERN}/",
    handler = createReadByIdHandler[ReadByIdParams, SpellRead, SpellSerializable](
      serializeSpellRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/overview/",
    handler = createReadCampaignListHandler[
      ReadListParams, SpellRead, SpellSerializable
    ](serializeSpellReads),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/",
    handler = createReadCampaignListHandler[
      ReadListParams, SpellRead, SpellSerializable
    ](serializeSpellReads),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/",
    handler = createReadByNameHandler[ReadByNameParams, SpellRead, SpellSerializable](
      serializeSpellRead
    ),
    httpMethod = HttpGet,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    "/spellclassconnection/",
    handler = createCreateHandler[
      CreateParams, SpellConnection, SpellConnectionSerializable
    ](
      checkPermission = checkSpellConnectionCreatePermission,
      createProc = createSpellConnection,
      serialize = serializeSpellConnection,
    ),
    httpMethod = HttpPost,
    middlewares = @[loginMiddleware()],
  )

  app.addRoute(
    re fmt"/spellclassconnection/pk/{ID_PATTERN}/",
    handler = createDeleteByIdHandler[DeleteParams, SpellConnection](),
    httpMethod = HttpDelete,
    middlewares = @[loginMiddleware()],
  )
