import prologue
import prologue/middlewares/[staticfile, cors]
import applicationSettings
import applicationEvents
import utils/jwtContext
import logging
import tinypool
import applications/allSignals #Necessary so that signals get loaded
import routes

# TODO: Check out if there is a performance difference on using --gc:orc
proc main() =
    let connectionPoolSize: int = settings.getOrDefault("databaseConnectionLimit").getInt()
    let databasePath: string = settings.getOrDefault("databasePath").getStr()
    initConnectionPool(databasePath, connectionPoolSize)

    var app: Prologue = newApp(
        settings, 
        startup = getStartUpEvents(), 
        shutdown = getShutDownEvents()
    )

    when not defined(release):
        app.use(staticFileMiddleware("media", "static"))

    app.use(CorsMiddleware(
            allowOrigins = @["*"],
            allowMethods = @["*"],
            allowHeaders = @["*"],
            exposeHeaders = @["*"],
            allowCredentials = false,
            maxAge = 7200,
        )
    )
    addApplicationRoutes(app)
    app.run(JWTContext)

    destroyConnectionPool()

main()
