import norm/[sqlite]
import std/options
import ../src/applications/character/characterModel
import ../src/applications/creature/creatureModel
import ../src/applications/diaryentry/[diaryEntryUtils, diaryEntryModel]
import ../src/applications/encounter/[encounterUtils, encounterModel]
import ../src/applications/item/itemModel
import ../src/applications/location/locationModel
import ../src/applications/map/mapModel
import ../src/applications/organization/organizationModel
import ../src/applications/quest/questModel
import ../src/applications/sessionaudio/[sessionaudioUtils, sessionaudioModel]
import ../src/applications/sessionAudioTimestamp/[timestampUtils, timestampModel]
import ../src/applications/spell/spellModel
import ../src/applications/rules/ruleModel
import ../src/applications/mapMarker/markerModel
import ../src/applications/search/searchService
import ../src/applications/[articleModel, articleUtils, genericArticleRepository]
import ../src/database

const ADD_NEW_FTS_TABLE = """
  CREATE VIRTUAL TABLE search_article_content USING fts5(
    title,
    title_rev,
    body,
    body_rev,
    table_name,
    record UNINDEXED,
    record_id,
    campaign_id,
    guid,
    tokenize = 'porter unicode61'
  );
"""

const REMOVE_OLD_FTS_TABLE = "DROP TABLE search_article_content;"

initConnectionPool("/home/philipp/dev/nimstoryfont/backend/db.sqlite3", 5)

proc addSearchEntry[T](entries: seq[T]) =
  withDbConn(connection):
    for entry in entries:
      connection.addSearchEntry(entry)

proc recreateEmptyFTS5Table() =
  withDbConn(connection):
    connection.exec(sql REMOVE_OLD_FTS_TABLE)
    connection.exec(sql ADD_NEW_FTS_TABLE)

proc refillFTS5Table() =
  withDbConn(connection):
    let characters = connection.getList(Character)
    let creatures = connection.getList(Creature)
    let diaryentries = connection.getList(DiaryEntry)
    let encounters = connection.getList(Encounter)
    let items = connection.getList(Item)
    let organizations = connection.getList(Organization)
    let spells = connection.getList(Spell)
    let rules = connection.getList(Rule)
    let locations = connection.getList(Location)
    let quests = connection.getList(Quest)
    let maps = connection.getList(Map)
    let recordings = connection.getList(SessionAudio)

    characters.addSearchEntry()
    creatures.addSearchEntry()
    diaryentries.addSearchEntry()
    encounters.addSearchEntry()
    items.addSearchEntry()
    organizations.addSearchEntry()
    spells.addSearchEntry()
    rules.addSearchEntry()
    locations.addSearchEntry()
    quests.addSearchEntry()
    maps.addSearchEntry()
    recordings.addSearchEntry()

recreateEmptyFTS5Table()
refillFTS5Table()