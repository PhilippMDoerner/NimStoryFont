import prologue
import ../../middleware/[loginMiddleware]
import ../allUrlParams
import diaryEntryModel
import diaryEntryService
import diaryEntryUtils
import ../genericArticleControllers
import std/strformat

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re"/diaryentry/",
        handler = createCreateArticleHandler[CreateParams, DiaryEntry, DiaryEntrySerializable](serialize),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, DiaryEntry](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{ID_PATTERN}/",
        handler = createUpdateByIdHandler[UpdateParams, DiaryEntry, DiaryEntrySerializable](serialize),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, DiaryEntryRead, DiaryEntryOverviewSerializable](overviewSerialize),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/{SESSION_NUMBER_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{USERNAME_PATTERN}/", 
        handler = createReadHandler[ReadDiaryEntryParams, DiaryEntryRead, DiaryEntrySerializable](getDiaryEntry, serialize),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
