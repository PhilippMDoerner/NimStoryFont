import diaryEntryModel
import ../encounter/encounterModel
import ../genericArticleRepository
import ../../applicationSettings
import norm/model
import tinypool
import std/strformat

export diaryEntryModel

proc getDiaryEntryById*(diaryentryId: int64): DiaryEntry =
  result = getEntryById[DiaryEntry](diaryentryId)


proc getDiaryEntryEncounters*(diaryentryId: int64): seq[Encounter] =
    var encounters: seq[Encounter] = @[newModel(Encounter)]
    let sqlCondition: string = fmt "{ENCOUNTER_TABLE}.diaryentry_id = ?"

    withDbConn(connection):
        connection.select(encounters, sqlCondition, diaryentryId)

    result = encounters