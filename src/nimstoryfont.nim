import prologue
import applicationSettings
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

    var app: Prologue = newApp(settings)
    addApplicationRoutes(app)
    app.run(JWTContext)

    destroyConnectionPool()

setLogFilter(lvlAll)
addHandler(newConsoleLogger())

main()
