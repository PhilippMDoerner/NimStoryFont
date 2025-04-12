import prologue
import ../../middleware/[loginMiddleware]
import sessionaudioService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import sessionAudioSerialization
import sessionaudioModel
import sessionaudioUtils
import sessionaudioControllers
import jsony


proc addSessionAudioRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/sessionaudio/",
        handler = createSessionAudioController,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, SessionAudio](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/pk/{ID_PATTERN}/", 
        handler = patchSessionAudioController,
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/pk/{ID_PATTERN}/", 
        handler =  createPatchByIdHandler[UpdateParams, SessionAudio, SessionAudioSerializable](serializeSessionAudio),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, SessionAudioRead, SessionAudioSerializable](serializeSessionAudioRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadListHandler[ReadListParams, SessionAudioRead, SessionAudioOverviewSerializable](
            getCampaignSessionAudio,
            checkSessionAudioReadListPermission,
            overviewSerialize
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/sessionaudio/{CAMPAIGN_NAME_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{SESSION_NUMBER_PATTERN}/", 
        handler = createReadHandler[ReadSessionAudioByParams, SessionAudioRead, SessionAudioSerializable](
            getSessionAudioByParams, 
            checkReadPermission, 
            serializeSessionAudioRead
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/file/{FILE_NAME_PATTERN}",
        handler = moveAudioFileAfterUpload,
        httpMethod = HttpPost
    )
