import norm/[model, pragmas]
import ../../utils/djangoDateTime/djangoDateTimeType
import ../../applicationSettings
import std/options
import constructor/defaults



type User* {.defaults, tableName: USER_TABLE.} = ref object of Model
    ##[TableModel of the table of creatures ]##
    password*: string = ""
    last_login*: Option[DjangoDateTime] = none(DjangoDateTime)
    is_superuser*: bool = false 
    username*: string = ""
    last_name*: string = ""
    email*: string = ""
    is_staff*: bool = false
    is_active*: bool = true
    date_joined*: DjangoDateTime = djangoDateTimeType.now()
    first_name*: string = ""

implDefaults(User)
proc newTableModel*(T: typedesc[User]): User = newUser()
proc newModel*(T: typedesc[User]): User = newUser()



type Group* {.defaults, tableName: GROUP_TABLE.} = ref object of Model
    name*: string = ""

implDefaults(Group)
proc newModel*(T: typedesc[Group]): Group = newGroup()



type Permission* {.defaults, tableName: PERMISSION_TABLE.} = ref object of Model
    content_type_id*: int64 = -1
    codename*: string = ""
    name*: string = ""

implDefaults(Permission)
proc newModel*(T: typedesc[Permission]): Permission = newPermission()



type GroupPermission* {.defaults, tableName: GROUP_PERMISSION_TABLE.} = ref object of Model
    group_id* {.fk: Group.}: int64 = -1
    permission_id* {.fk: Permission.}: int64 = -1

implDefaults(GroupPermission)
proc newModel*(T: typedesc[GroupPermission]): GroupPermission = newGroupPermission()



type UserGroup* {.defaults, tableName: USER_GROUP_TABLE.} = ref object of Model
    user_id* {.fk: User.}: int64 = -1
    group_id* {.fk: Group.}: int64 = -1

implDefaults(UserGroup)
proc newModel*(T: typedesc[UserGroup]): UserGroup = newUserGroup()



type UserPermission* {.defaults, tableName: USER_USERPERMISSIONS_TABLE.} = ref object of Model
    user_id* {.fk: User.}: int64 = -1
    permission_id* {.fk: Permission.}: int64 = -1

implDefaults(UserPermission)
proc newModel*(T: typedesc[UserPermission]): UserPermission = newUserPermission()
