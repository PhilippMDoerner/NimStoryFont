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
        re fmt"/quote/{CAMPAIGN_NAME_PATTERN}/",
        handler = createCreateArticleHandler[CreateParams, Quote, QuoteSerializable](serializeQuote),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Quote](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Quote, QuoteSerializable](serializeQuote),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/quote/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/random/", 
        handler = createReadHandler[ReadByNameParams, QuoteRead, QuoteSerializable](
          getRandomCharacterQuote,
          checkQuotePermission,
          serializeQuoteRead
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/quote/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadListHandler(
          getCharacterQuotes,
          checkQuoteListPermission,
          serializeQuoteRead
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
        re fmt"/quoteconnection/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, QuoteConnection](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )
