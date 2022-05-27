import norm/model
import std/sets
import ../utils/djangoDateTime/[djangoDateTimeType, serialization]
import ../utils/macroUtils

const fkFieldNames = toHashSet([
  "author", 
  "character", 
  "creature",
  "diaryentry",
  "encounter",
  "item",
  "location",
  "parentlocation",
  "map",
  "marker",
  "markertype",
  "organization",
  "quest",
  "sessionaudio",
  "session",
  "spell",
  "rule",
  "taker",
  "giver",
  "session_audio",
  "start_session",
  "end_session",
  "player_class",
  "current_location",
  "owner",
  "parent_location",
  "type",
  "headquarter",

])

proc renameHook*[T: Model](entry: var T, fieldName: var string) =
  ## Renames incoming fk fields in json, which should have the "_id" suffix. 
  ## Necessary solely because Django secretly has that "_id" suffix in the database
  ## but intentionally hides it while implementing, leading to me specifying
  ## JSON previously that did not have the "_id" suffix which I now require
  if fkFieldNames.contains(fieldName):
    fieldName.add("_id")
  elif fieldName == "pk":
    fieldName = "id"


template setOptionalsToNone[T: Model](entry: var T) =
  ## Takes an initialized model-type and sets all its optional fields to none()
  for fieldName, fieldValue in T()[].fieldPairs:
    when fieldValue is Option:
      entry.getField(fieldName) = none(fieldValue.get().type())

proc newHook*[T: Model](entry: var T) =
  ## A jsony newHook that provides default values for an article-model.
  ## These default values are the current DateTime for update- and creation
  ## date as well as "none" values for all Optional values of the Article.
  entry = new(T)
  
  let currentDateTime: DjangoDateTime = djangoDateTimeType.now()
  when entry.hasField("creation_datetime"):
    entry.creation_datetime = currentDateTime
  when entry.hasField("update_datetime"):
    entry.update_datetime = currentDateTime

  setOptionalsToNone[T](entry)