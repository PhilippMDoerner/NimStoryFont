import applications/character/characterRoutes
import applications/creature/creatureRoutes
import applications/image/imageRoutes
import applications/authentication/authenticationRoutes
import applications/search/searchRoutes
import applications/location/locationRoutes
import applications/encounter/encounterRoutes

import prologue

proc addApplicationRoutes*(app: Prologue) =
  addAuthenticationRoutes(app)
  addCharacterRoutes(app)
  addCreatureRoutes(app)
  addImageRoutes(app)
  addLocationRoutes(app)
  addSearchRoutes(app)
  addEncounterRoutes(app)