import norm/[model, pragmas]
import ../../applicationSettings
import ../../applicationConstants
import constructor/defaults
import ../user/userModel
import ../../utils/tokenTypes

export tokenTypes

type Group* {.defaults, tableName: GROUP_TABLE.} = ref object of Model
    name*: string = ""

implDefaults(Group, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type Permission* {.defaults, tableName: PERMISSION_TABLE.} = ref object of Model
    content_type_id*: int64 = MODEL_INIT_ID
    codename*: string = ""
    name*: string = ""

implDefaults(Permission, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type GroupPermissionRead* {.defaults, readOnly, tableName: GROUP_PERMISSION_TABLE.} = ref object of Model
    group_id*: Group = new(Group)
    permission_id*: Permission = new(Permission)

implDefaults(GroupPermissionRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type GroupPermission* {.defaults, tableName: GROUP_PERMISSION_TABLE.} = ref object of Model
    group_id* {.fk: Group.}: int64 = MODEL_INIT_ID
    permission_id* {.fk: Permission.}: int64 = MODEL_INIT_ID

implDefaults(GroupPermission, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})




type UserGroup* {.defaults, tableName: USER_GROUP_TABLE.} = ref object of Model
    user_id*: User = new(User)
    group_id*: Group = new(Group)

implDefaults(UserGroup, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})




type UserPermission* {.defaults, tableName: USER_USERPERMISSIONS_TABLE.} = ref object of Model
    user_id*: User = new(User)
    permission_id*: Permission = new(Permission)

implDefaults(UserPermission, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type UserContainer* = object
    user*: User
    campaignMemberships*: CampaignMemberships


type TokenContainer* = object
  `type`*: TokenType
  token*: string
  created*: int64