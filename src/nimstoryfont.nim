import prologue
import applicationSettings
import applicationEvents
import utils/jwtContext
import logging
import tinypool
import applications/allSignals #Necessary so that signals get loaded
import routes
import prologue/middlewares/[staticfile, cors]
import middleware/compressionMiddleware


proc addGlobalMiddlewares(app: var Prologue) =
    when not defined(release):
      app.use(staticFileMiddleware("media", "static"))

    app.use(responseCompressionMiddleware())
    app.use(CorsMiddleware(
            allowOrigins = @["*"],
            allowMethods = @["*"],
            allowHeaders = @["*"],
            exposeHeaders = @["*"],
            allowCredentials = false,
            maxAge = 7200,
        )
    )

proc main() =
    let connectionPoolSize: int = settings.getOrDefault("databaseConnectionLimit").getInt()
    let databasePath: string = settings.getOrDefault("databasePath").getStr()
    initConnectionPool(databasePath, connectionPoolSize)

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
