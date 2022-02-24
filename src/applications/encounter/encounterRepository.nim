import encounterModel
import std/[options, strformat]
import norm/sqlite
import ../../applicationSettings

#TODO: Implement this properly, then commit
proc getNextEncounter*(connection: DbConn, encounter: Encounter): Option[Encounter] =
  result = none(Encounter)


proc getEncountersAtAndAfterOrderIndex*(connection: DbConn, diaryentryId: int64, orderIndex: int): seq[Encounter] =
    var followingEncounters: seq[Encounter] = @[newModel(Encounter)]    
    const sqlCondition = fmt "{ENCOUNTER_TABLE}.diaryentry_id = ? AND {ENCOUNTER_TABLE}.order_index >= ?"
    connection.select(followingEncounters, sqlCondition, diaryentryId, orderIndex)
    result = followingEncounters
