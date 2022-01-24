import prologue
import applicationSettings
import utils/[database, jwtContext]
import applications/character/characterRoutes
import applications/creature/creatureRoutes
import applications/image/imageRoutes
import applications/authentication/authenticationRoutes
import applications/search/searchRoutes
import logging


proc main() =
    initConnectionPool()

    var app: Prologue = newApp(core_settings)
    addAuthenticationRoutes(app)
    addCharacterRoutes(app)
    addCreatureRoutes(app)
    addImageRoutes(app)
    addSearchRoutes(app)
    app.run(JWTContext)

    destroyConnectionPool()

main()