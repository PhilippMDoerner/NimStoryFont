import prologue
import ../../middleware/[loginMiddleware]
import ../allUrlParams
import diaryEntryModel
import diaryEntryService
import diaryEntrySerialization
import diaryEntryUtils
import ../genericArticleControllers
import std/strformat
import ../authentication/authenticationUtils

proc addDiaryEntryRoutes*(app: Prologue) =
    app.addRoute(
        re"/diaryentry/",
        handler = createCreateArticleHandler[CreateParams, DiaryEntry, DiaryEntrySerializable](serializeDiaryEntry),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, DiaryEntry](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/pk/{ID_PATTERN}/",
        handler = createUpdateByIdHandler[UpdateParams, DiaryEntry, DiaryEntrySerializable](serializeDiaryEntry),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/pk/{ID_PATTERN}/",
        handler = createPatchByIdHandler[UpdateParams, DiaryEntry, DiaryEntrySerializable](serializeDiaryEntry),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadListHandler(
            getCampaignDiaryEntries,
            checkDiaryEntryReadListPermission,
            overviewSerialize
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/diaryentry/{CAMPAIGN_NAME_PATTERN}/{SESSION_NUMBER_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{USERNAME_PATTERN}/", 
        handler = createReadHandler[ReadDiaryEntryParams, DiaryEntryRead, DiaryEntrySerializable](getDiaryEntry, checkReadPermission, serializeDiaryEntryRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
