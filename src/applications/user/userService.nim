import ../genericArticleRepository
#import ../genericArticleService
import ../campaign/[campaignModel, campaignService]
import ../../utils/databaseUtils
import userModel
import userRequestParams
import std/[options, sequtils, tables, strutils, strformat, sugar]
import norm/model
import ../../utils/djangoDateTime/[djangoDateTimeType, serialization]
import ../../applicationConstants


export userModel


proc getUserById*(userId: int64): User =
  result = getEntryById(userId, User)

proc getUserById*(requestParams: UserRequestParams): User =
  result = getUserById(requestParams.id)

proc getUserByName*(userName: string): User =
  result = getEntryByField("username", userName, User)

proc getUserSerialization(connection: sqlite.DbConn, entry: User): User {.gcsafe.}=
  result = connection.getEntryById(entry.id, User)

proc getCampaignUserListOverview*(requestParams: UserListRequestParams): seq[User] =
  ## lists all campaign entries using a limited but performant representation of a User
  let users = getCampaignList(requestParams.campaignName, User)
  withDbConn(connection):
      result = users.map(user => connection.getUserSerialization(user))


proc createUser*(requestData: UserCreateRequestParams): User =
  var entryToCreate: User = requestData.body.fromJson(User)
  entryToCreate.date_joined = djangoDateTimeType.now()

  withDbTransaction(connection):
    let createdEntry: User = connection.createEntryInTransaction(entryToCreate)
    result = connection.getUserSerialization(createdEntry)


proc updateUser*(requestData: UserUpdateRequestParams): User =
  var entryToUpdate: User = requestData.body.fromJson(User)
  if entryToUpdate.id == MODEL_INIT_ID:
    entryToUpdate.id = requestData.id
  
  assert(entryToUpdate.id == requestData.id, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  withDbTransaction(connection):
    let updatedEntry: User = connection.updateEntryInTransaction(entryToUpdate)
    result = connection.getUserSerialization(updatedEntry)