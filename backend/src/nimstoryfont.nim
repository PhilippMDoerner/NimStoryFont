import std/[os, logging, strformat]
import prologue
import prologue/middlewares/[cors]
import ./applicationSettings
import ./applicationConstants
import ./applicationEvents
import ./database
import ./utils/jwtContext
import ./applications/allSignals #Necessary so that signals get loaded
import ./routes
import ./middleware/[timingMiddleware, compressionMiddleware]

when not defined(release):
  import prologue/middlewares/staticfile

proc addGlobalMiddlewares(app: var Prologue) =
    when not defined(release):
      app.use(staticFileMiddleware("media", "static"))

    app.use(
        timingMiddleware(),
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
    settings.getSetting(SettingName.snImageDir).getStr().initializeDirectory()
    settings.getSetting(SettingName.snAudioDir).getStr().initializeDirectory()

proc main() =
    addLogger()

    let connectionPoolSize: int = settings.getSetting(SettingName.snConnectionLimit).getInt()
    let databasePath: string = settings.getSetting(SettingName.snDatabasePath).getStr()
    initConnectionPool(databasePath, connectionPoolSize)
    
    initializeMediaDirectories(settings)

    var app: Prologue = newApp(
        settings, 
        startup = getStartUpEvents(), 
        shutdown = getShutDownEvents()
    )
    
    addGlobalMiddlewares(app)
    addApplicationRoutes(app)
    connectAllSignals()

    app.run(JWTContext)

    destroyConnectionPool()


main()
