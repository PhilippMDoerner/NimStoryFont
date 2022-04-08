import ../genericArticleRepository
#import ../genericArticleService
import ../../utils/databaseUtils
import userModel
import userRequestParams
import std/[options, tables, strutils, strformat, sugar]
import norm/model
import ../../utils/djangoDateTime/[djangoDateTimeType, serialization]
import ../../applicationConstants


export userModel


proc getUserById*(userId: int64): User =
  result = getEntryById(userId, User)

proc readUserById*(connection: DbConn, requestParams: ReadByIdParams | UpdateParams): User =
  result = connection.getEntryById(requestParams.id, User)

proc getUserByName*(userName: string): User =
  result = getEntryByField("username", userName, User)

proc getCampaignUserListOverview*(connection: DbConn, requestParams: ReadListParams): seq[User] =
  ## lists all campaign entries using a limited but performant representation of a User
  result = connection.getCampaignList(requestParams.campaignName, User)


proc createUser*(connection: DbConn, requestParams: CreateParams, newEntry: var User): User =
  newEntry.date_joined = djangoDateTimeType.now()
  result = connection.createEntryInTransaction(newEntry)


proc updateUser*(connection: Dbconn, requestData: UpdateParams, entry: var User): User =
  if entry.id == MODEL_INIT_ID:
    entry.id = requestData.id
  
  assert(entry.id == requestData.id, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  result = connection.updateEntryInTransaction(entry)

proc deleteUser*(connection: DbConn, userToDelete: var User) =
  connection.deleteEntryInTransaction(userToDelete)