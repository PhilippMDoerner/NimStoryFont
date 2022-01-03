import prologue
import applicationSettings
import utils/jwtContext
import applications/character/characterRoutes
import applications/creature/creatureRoutes
import applications/authentication/authenticationRoutes
import logging


proc main() =
    var app: Prologue = newApp(core_settings)
    addAuthenticationRoutes(app)
    addCharacterRoutes(app)
    addCreatureRoutes(app)
    app.run(JWTContext)


main()