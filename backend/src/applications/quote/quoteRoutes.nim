import prologue
import ../../middleware/[loginMiddleware]
import quoteService
import quoteSerialization
import quoteUtils
import quoteControllers
import std/strformat
import ../allUrlParams
import ../genericArticleControllers

proc addQuoteRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/quote/",
        handler = createCreateArticleHandler[CreateParams, Quote, QuoteSerializable](serializeQuote),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Quote](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Quote, QuoteSerializable](serializeQuote),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/pk/{ID_PATTERN}/", 
        handler = createPatchByIdHandler[UpdateParams, Quote, QuoteSerializable](serializeQuote),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/random/", 
        handler = getRandomQuote,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/quote/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadListHandler(
            getCharacterQuotes,
            checkQuoteListPermission,
            serializeQuoteReads
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
    app.addRoute(
        re fmt"/quoteconnection/",
        handler = createQuoteConnection,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quoteconnection/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, QuoteConnection](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )
