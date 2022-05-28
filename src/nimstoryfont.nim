import prologue
import applicationSettings
import applicationEvents
import utils/jwtContext
import std/[os, logging, strformat]
import tinypool
import applications/allSignals #Necessary so that signals get loaded
import routes
import prologue/middlewares/[staticfile, cors]
import middleware/compressionMiddleware


proc addGlobalMiddlewares(app: var Prologue) =
    when not defined(release):
      app.use(staticFileMiddleware("media", "static"))

    app.use(
        responseCompressionMiddleware(),
        CorsMiddleware(
            allowOrigins = @["*"],
            allowMethods = @["*"],
            allowHeaders = @["*"],
            exposeHeaders = @["*"],
            allowCredentials = false,
            maxAge = 7200,
        )
    )

proc initializeDirectory(directoryPath: string) =
    if not dirExists(directoryPath):
        log(lvlInfo, fmt"The directory '{directoryPath}' does not exist. It was created")
        createDir(directoryPath)

proc initializeMediaDirectories(settings: Settings) =
    settings.getOrDefault("imageDir").getStr().initializeDirectory()
    settings.getOrDefault("audioDir").getStr().initializeDirectory()

proc main() =
    let connectionPoolSize: int = settings.getOrDefault("databaseConnectionLimit").getInt()
    let databasePath: string = settings.getOrDefault("databasePath").getStr()
    initConnectionPool(databasePath, connectionPoolSize)

    initializeMediaDirectories(settings)

    var app: Prologue = newApp(
        settings, 
        startup = getStartUpEvents(), 
        shutdown = getShutDownEvents()
    )
    
    addGlobalMiddlewares(app)
    addApplicationRoutes(app)
    app.run(JWTContext)

    destroyConnectionPool()


main()
