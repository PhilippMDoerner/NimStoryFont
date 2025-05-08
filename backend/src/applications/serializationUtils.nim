import norm/model
import std/sets
import ../utils/djangoDateTime/[djangoDateTimeType]
import ../utils/macroUtils

##This is the global module for all jsony hook procs

const fkFieldNames = toHashSet(
  [
    "author", "campaign", "character", "creature", "current_location", "diaryentry",
    "encounter", "end_session", "giver", "headquarter", "item", "location", "map",
    "marker", "markertype", "organization", "owner", "parentlocation",
    "parent_location", "player_class", "quest", "rule", "session", "sessionaudio",
    "session_audio", "start_session", "spell", "taker", "type",
  ]
)

proc renameHook*[T: Model](entry: var T, fieldName: var string) =
  ## Contains a mapping for all parts where the incoming fieldname does not
  ## match the field names in the models. For the most part that is translating
  ## "pk" to "id" and appending "_id" to choice words.
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
  ## A jsony newHook that provides default values for a norm-model.
  ## These default values are the current DateTime for update- and creation
  ## date as well as "none" values for all Optional values of the Article.
  entry = new(T)

  let currentDateTime: DjangoDateTime = djangoDateTimeType.now()
  when entry.hasField("creation_datetime"):
    entry.creation_datetime = currentDateTime
  when entry.hasField("update_datetime"):
    entry.update_datetime = currentDateTime

  setOptionalsToNone[T](entry)
