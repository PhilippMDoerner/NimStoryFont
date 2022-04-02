import prologue
import ../../middleware/[loginMiddleware]
import sessionaudioControllers
import sessionaudioService
import std/strformat
import ../allUrlParams
import ../genericArticleControllers
import sessionaudioModel


proc addSessionAudioRoutes*(app: Prologue) =
    app.addRoute(
        re fmt"/sessionaudio/{CAMPAIGN_NAME_PATTERN}/",
        handler = createEntryCreationHandler(SessionAudio, getSessionaudioSerialization),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/{ID_PATTERN}/", 
        handler = createEntryDeletionHandler(SessionAudio, ID_PARAM),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/{ID_PATTERN}/", 
        handler = createEntryUpdateHandler(SessionAudio, ID_PARAM, getSessionaudioSerialization),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/{ID_PATTERN}/", 
        createEntryReadByIdHandler(ID_PARAM, getSessionaudioById),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/sessionaudio/{CAMPAIGN_NAME_PATTERN}/overview/", 
        createCampaignOverviewHandler(CAMPAIGN_NAME_PARAM, getCampaignSessionaudioListOverview),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/sessionaudio/{CAMPAIGN_NAME_PATTERN}/{SESSION_IS_MAIN_SESSION_PATTERN}/{SESSION_NUMBER_PATTERN}/", 
        sessionaudioControllers.getSessionAudioByParamController,  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
   
