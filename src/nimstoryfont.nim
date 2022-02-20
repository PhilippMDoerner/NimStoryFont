import prologue
import applicationSettings
import utils/jwtContext
import logging
import tinypool
import applications/allSignals #Necessary so that signals get loaded
import routes

# TODO: Check out if there is a performance difference on using --gc:orc
proc main() =
    initConnectionPool(applicationSettings.database, CONNECTION_POOL_SIZE)

    var app: Prologue = newApp(core_settings)
    addApplicationRoutes(app)
    app.run(JWTContext)

    destroyConnectionPool()

setLogFilter(lvlNotice)
addHandler(newConsoleLogger())

main()
