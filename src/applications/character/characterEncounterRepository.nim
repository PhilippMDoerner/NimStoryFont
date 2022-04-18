import norm/[model, sqlite]
import characterEncounterModel
import ../../utils/djangoDateTime/[normConversion]
import std/[sugar, sequtils, tables, strutils, strformat]

proc getEncounterConnectionsForEncounters*(connection: DbConn, encounterIds: seq[int64]): Table[int64, seq[CharacterEncounterRead]] =
  let allEncounterIdsStr = encounterIds.map(id => id.int.intToStr()).join(",")
  let condition = fmt"{CharacterEncounterRead.table()}.encounter_id IN ({allEncounterIdsStr})"

  var encounterConnections: seq[CharacterEncounterRead] = @[newModel(CharacterEncounterRead)]
  connection.select(encounterConnections, condition)

  for encounterId in encounterIds:
    let id = encounterId
    result[encounterId] = encounterConnections.filter(con => con.encounter_id.id == id)
