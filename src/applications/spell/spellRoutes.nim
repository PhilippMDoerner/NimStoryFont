import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import spellModel
import spellService
import std/strformat
import spellSerialization
import ../genericArticleControllers

proc addSpellRoutes*(app: Prologue) =
    app.addRoute(
        re"/spell/",
        handler = createCreateArticleHandler[CreateParams, Spell, SpellSerializable](serializeSpell),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Spell](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Spell, SpellSerializable](serializeSpell),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, SpellRead, SpellSerializable](serializeSpellRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, SpellRead, SpellSerializable](serializeSpellRead),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/", 
        handler = createReadCampaignListHandler[ReadListParams, SpellRead, SpellSerializable](serializeSpellRead),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/spell/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, SpellRead, SpellSerializable](serializeSpellRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
