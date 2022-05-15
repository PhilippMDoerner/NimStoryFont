import prologue
import ../../middleware/loginMiddleware
import ../allUrlParams
import characterService
import characterSerialization
import characterDeserialization
import characterControllers
import characterUtils
import std/strformat
import ../genericArticleControllers

proc addCharacterRoutes*(app: Prologue) =
    app.addRoute(
        re"/character/",
        handler = createCreateArticleHandler[CreateParams, Character, CharacterSerializable](serializeCharacter),
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, Character](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/pk/{ID_PATTERN}/", 
        handler = createUpdateByIdHandler[UpdateParams, Character, CharacterSerializable](serializeCharacter),
        httpMethod = HttpPut,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/pk/{ID_PATTERN}/", 
        handler = createPatchByIdHandler[UpdateParams, Character, CharacterSerializable](serializeCharacter),
        httpMethod = HttpPatch,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/pk/{ID_PATTERN}/", 
        handler = createReadByIdHandler[ReadByIdParams, CharacterRead, CharacterSerializable](serializeCharacterRead), 
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/overview/", 
        handler = createReadCampaignListHandler[ReadListParams, CharacterOverview, CharacterOverviewSerializable](overviewSerialize),
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )
    
    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/nonplayercharacters/", 
        handler = createReadListHandler[ReadListParams, CharacterOverview, CharacterOverviewSerializable](
            getNonPlayerCharacters,
            checkCharacterReadListPermission,
            overviewSerialize
        ),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/character/{CAMPAIGN_NAME_PATTERN}/{ARTICLE_NAME_PATTERN}/", 
        handler = createReadByNameHandler[ReadByNameParams, CharacterRead, CharacterSerializable](serializeCharacterRead),  
        httpMethod = HttpGet,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re"/encounterconnection/",
        handler = createCharacterConnection,
        httpMethod = HttpPost,
        middlewares = @[loginMiddleware()]
    )

    app.addRoute(
        re fmt"/encounterconnection/pk/{ID_PATTERN}/", 
        handler = createDeleteByIdHandler[DeleteParams, CharacterEncounterConnection](),
        httpMethod = HttpDelete,
        middlewares = @[loginMiddleware()]
    )