import norm/[model, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import std/[tables]
import constructor/defaults
import ../user/userModel

type CampaignAccessLevel* = enum
  GUEST = "guest", MEMBER = "member", ADMIN = "admin"



type Group* {.defaults, tableName: GROUP_TABLE.} = ref object of Model
    name*: string = ""

implDefaults(Group)
proc newModel*(T: typedesc[Group]): Group = newGroup()



type Permission* {.defaults, tableName: PERMISSION_TABLE.} = ref object of Model
    content_type_id*: int64 = MODEL_INIT_ID
    codename*: string = ""
    name*: string = ""

implDefaults(Permission)
proc newModel*(T: typedesc[Permission]): Permission = newPermission()



type GroupPermissionRead* {.defaults, tableName: GROUP_PERMISSION_TABLE.} = ref object of Model
    group_id*: Group = newModel(Group)
    permission_id*: Permission = newModel(Permission)

implDefaults(GroupPermissionRead)
proc newModel*(T: typedesc[GroupPermissionRead]): GroupPermissionRead = newGroupPermissionRead()

type GroupPermission* {.defaults, tableName: GROUP_PERMISSION_TABLE.} = ref object of Model
    group_id* {.fk: Group.}: int64 = MODEL_INIT_ID
    permission_id* {.fk: Permission.}: int64 = MODEL_INIT_ID

implDefaults(GroupPermission)
proc newModel*(T: typedesc[GroupPermission]): GroupPermission = newGroupPermission()



type UserGroup* {.defaults, tableName: USER_GROUP_TABLE.} = ref object of Model
    user_id*: User = newModel(User)
    group_id*: Group = newModel(Group)

implDefaults(UserGroup)
proc newModel*(T: typedesc[UserGroup]): UserGroup = newUserGroup()



type UserPermission* {.defaults, tableName: USER_USERPERMISSIONS_TABLE.} = ref object of Model
    user_id*: User = newModel(User)
    permission_id*: Permission = newModel(Permission)

implDefaults(UserPermission)
proc newModel*(T: typedesc[UserPermission]): UserPermission = newUserPermission()


type UserContainer* = object
    user*: User
    campaignMemberships*: Table[string, CampaignAccessLevel]
