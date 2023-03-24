import std/[options, tables, strutils, strformat, sugar, json, sequtils, sets]
import norm/model
import ./userModel
import ./userRequestParams
import ./userUtils
import ./userRepository
import ../genericArticleRepository
import ../genericArticleService
import ../../utils/[macroUtils, djangoDateTime/djangoDateTimeType]
import ../../applicationConstants
import ../../database



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
  let plainTextPassword = newEntry.password
  newEntry.password = createPasswordDatabaseRepresentation(plainTextPassword)
  result = connection.createEntryInTransaction(newEntry)


proc updateUser*(connection: DbConn, requestData: UpdateParams): User =
  var entry = requestData.body.fromJson(User)
  
  if entry.id == MODEL_INIT_ID:
    entry.id = requestData.id
  
  assert(entry.id == requestData.id, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")

  result = connection.updateEntryInTransaction(entry)

proc updateUserGroups*(connection: DbConn, requestData: UpdateParams, entry: User): User =
  let parsedBody = requestData.body.parseJson()

  let newGroupIds: seq[int64] = parsedBody["groups"].elems.map(idNode => idNode.getInt().int64)
  let oldUserGroups: seq[UserGroup] = connection.getManyFromOne(entry, UserGroup)
  let oldGroupIds: HashSet[int64] = oldUserGroups.map(userGroup => userGroup.group_id.id).toHashSet()

  for newGroupId in newGroupIds:
    if not oldGroupIds.contains(newGroupId):
      let group = connection.getEntryById(newGroupId, Group)
      var newUserGroup = UserGroup(user_id: entry, group_id: group)
      discard connection.createEntryInTransaction(newUserGroup)
    
  for oldUserGroup in oldUserGroups:
    if not newGroupIds.contains(oldUserGroup.group_id.id):
      var entryToDelete = oldUserGroup
      connection.deleteEntryInTransaction(entryToDelete)
      
  result = connection.getEntryById(entry.id, User)

proc updateUserPassword*(connection: DbConn, user: var User, newPassword: string): User =
  let hashRepresentation = createPasswordDatabaseRepresentation(newPassword)
  user.password = hashRepresentation
  
  {.cast(gcsafe).}:
    result = connection.updateEntryInTransaction(user)

proc updateUserPassword*(connection: DbConn, username: string, newPassword: string): User =
  var user: User = connection.getEntryByField("username", username, User)
  connection.updateUserPassword(user, newPassword)

proc patchUser*(connection: DbConn, requestData: UpdateParams, entry: User): User =
  assert(entry.id == requestData.id, "Tried updating {modelType.name()} and change id from {entryId} to {entry.id}!")
  
  let isGroupUpdatePatch = requestData.body.parseJson().hasKey("groups")
  let isPasswordUpdatePatch = requestData.body.parseJson().hasKey("password")
  
  if isGroupUpdatePatch:
    result = connection.updateUserGroups(requestData, entry)
  
  elif isPasswordUpdatePatch:
    var user = entry
    let newPassword: string = requestData.body.parseJson()["password"].getStr()
    result = connection.updateUserPassword(user, newPassword)

  else:
    result = connection.patchEntry(requestData, entry)

proc deleteUser*(connection: DbConn, userToDelete: var User) =
  connection.deleteEntryInTransaction(userToDelete)