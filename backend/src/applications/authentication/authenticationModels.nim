import norm/[model, pragmas]
import constructor/defaults
import ./authenticationConstants
import ../user/userModel
import ../../applicationSettings
import ../../applicationConstants
import ../../utils/tokenTypes
import ../../utils/djangoDateTime/djangoDateTimeType

export tokenTypes
export WorkflowType

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

type TokenEntry* {.defaults.} = ref object
  key*: string = ""
  created*: int64 = -1
  user_id*: int64 = -1
  blacklisted*: bool = false
  tokenType*: string = ""

implDefaults(TokenEntry, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type Confirmation* {.defaults, tableName: USER_CONFIRMATION_TABLE.} = ref object of Model
  user_id* {.fk: User.}: int64 = MODEL_INIT_ID
  workflow*: WorkflowType
  workflow_token*: string
    # Token that you can send to confirm this specific workflow entry even without being authenticated
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  confirmed*: bool = false

implDefaults(Confirmation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
