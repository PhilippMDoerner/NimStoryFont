import applications/character/characterRoutes
import applications/campaign/campaignRoutes
import applications/creature/creatureRoutes
import applications/image/imageRoutes
import applications/authentication/authenticationRoutes
import applications/search/searchRoutes
import applications/location/locationRoutes
import applications/encounter/encounterRoutes
import applications/contentUpdates/contentUpdateRoutes
import applications/diaryentry/diaryEntryRoutes
import applications/item/itemRoutes
import applications/organization/organizationRoutes
import applications/spell/spellRoutes
import applications/rules/ruleRoutes
import applications/quest/questRoutes
import applications/session/sessionRoutes
import applications/map/mapRoutes
import applications/mapMarker/markerRoutes
import applications/mapMarkerType/markerTypeRoutes
import applications/sessionaudio/sessionaudioRoutes
import applications/sessionAudioTimestamp/timestampRoutes
import applications/user/userRoutes
import applications/quote/quoteRoutes
import applications/playerclass/playerClassRoutes
import applications/nodeMap/nodeMapRoutes
import prologue

proc addApplicationRoutes*(app: Prologue) =
  addAuthenticationRoutes(app)
  addCampaignRoutes(app)
  addCharacterRoutes(app)
  addCreatureRoutes(app)
  addImageRoutes(app)
  addLocationRoutes(app)
  addSearchRoutes(app)
  addEncounterRoutes(app)
  addArticleUpdateRoutes(app)
  addDiaryEntryRoutes(app)
  addItemRoutes(app)
  addOrganizationRoutes(app)
  addSpellRoutes(app)
  addRuleRoutes(app)
  addQuestRoutes(app)
  addSessionRoutes(app)
  addMapRoutes(app)
  addMarkerRoutes(app)
  addMarkerTypeRoutes(app)
  addSessionAudioRoutes(app)
  addUserRoutes(app)
  addTimestampRoutes(app)
  addQuoteRoutes(app)
  addPlayerClassRoutes(app)
  addNodeMapRoutes(app)