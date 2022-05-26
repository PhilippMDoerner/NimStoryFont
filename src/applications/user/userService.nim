import ../genericArticleRepository
import ../genericArticleService
import ../../utils/databaseUtils
import userModel
import userRequestParams
import userRepository
import std/[options, tables, strutils, strformat, sugar]
import norm/model
import ../../utils/[macroUtils, djangoDateTime/djangoDateTimeType]
import ../../applicationConstants


export userModel

proc getUserById*(userId: int64): User =
  result = getEntryById(userId, User)

proc readUserById*(connection: DbConn, requestParams: ReadByIdParams | UpdateParams): User =
  result = connection.getEntryById(requestParams.id, User)

proc getUserByName*(userName: string): User =
  result = getEntryByField("username", userName, User)

proc getUsers*(connection: DbConn, requestParams: ReadWithoutParams): seq[User] =
  result = connection.getList(User)

proc getCampaignUserListOverview*(connection: DbConn, requestParams: ReadListParams): seq[User] =
  ## lists all campaign entries using a limited but performant representation of a User
  result = connection.getCampaignUsers(requestParams.campaignName)


proc createUser*(connection: DbConn, requestParams: CreateParams, newEntry: var User): User =
  newEntry.date_joined = djangoDateTimeType.now()
  newEntry.is_active = true
  result = connection.createEntryInTransaction(newEntry)


proc updateUser*(connection: Dbconn, requestData: UpdateParams, entry: var User): User =
  if entry.id == MODEL_INIT_ID:
    entry.id = requestData.id
  
  assert(entry.id == requestData.id, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  result = connection.updateEntryInTransaction(entry)

proc patchUser*(connection: Dbconn, requestData: UpdateParams, entry: User): User =
  assert(entry.id == requestData.id, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  result = connection.patchEntry(requestData, entry)


proc deleteUser*(connection: DbConn, userToDelete: var User) =
  connection.deleteEntryInTransaction(userToDelete)