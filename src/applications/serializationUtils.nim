import norm/model
import std/sets

const fkFieldNames = toHashSet(["author", "character", "creature", "diaryentry", "encounter", "item", "location", "parentlocation", "map", "marker", "markertype", "organization", "quest", "sessionaudio", "session", "spell", "rule"])

proc renameHook*[T: Model](entry: var T, fieldName: var string) =
  ## Renames incoming fk fields in json, which should have the "_id" suffix. 
  ## Necessary solely because Django secretly has that "_id" suffix in the database
  ## but intentionally hides it while implementing, leading to me specifying
  ## JSON previously that did not have the "_id" suffix which I now require
  if fkFieldNames.contains(fieldName):
    fieldName.add("_id")
  elif fieldName == "pk":
    fieldName = "id"