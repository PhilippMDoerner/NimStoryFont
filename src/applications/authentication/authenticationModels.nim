import norm/[model, pragmas]
import ../../utils/djangoDateTime/djangoDateTimeType
import ../../applicationSettings
import std/options


type User* {.tableName: USER_TABLE.} = ref object of Model
    ##[TableModel of the table of creatures ]##
    password*: string
    last_login*: Option[DjangoDateTime]
    is_superuser*: bool
    username*: string
    last_name*: string
    email*: string
    is_staff*: bool
    is_active*: bool
    date_joined*: DjangoDateTime
    first_name*: string


type Group* {.tableName: GROUP_TABLE.} = ref object of Model
    name*: string


type Permission* {.tableName: PERMISSION_TABLE.} = ref object of Model
    content_type_id*: int64
    codename*: string
    name*: string


type GroupPermission* {.tableName: GROUP_PERMISSION_TABLE.} = ref object of Model
    group_id*: int64
    permission_id*: int64


type UserGroup* {.tableName: USER_GROUP_TABLE.} = ref object of Model
    user_id*: int64
    group_id*: int64


type UserPermission* {.tableName: USER_USERPERMISSIONS_TABLE.} = ref object of Model
    user_id*: int64
    permission_id*: int64


proc newUser(
    password = "",
    lastLogin = none(DjangoDateTime),
    isSuperuser = false,
    username = "",
    firstName = "",
    lastName = "",
    email = "",
    isStaff = false,
    isActive = true,
    dateJoined = djangoDateTimeType.now()
): User = 
    result = User(
        password: password,
        last_login: lastLogin,
        is_superuser: isSuperuser,
        username: username,
        last_name: lastName,
        email: email,
        is_staff: isStaff,
        is_active: isActive,
        date_joined: dateJoined,
        first_name: firstName
    )


proc newPermission(
    contentTypeId = -1,
    codename = "",
    name = ""
): Permission =
    result = Permission(
        content_type_id: contentTypeId,
        codename: codename,
        name: name
    )


proc newGroup(name = ""): Group =
    result = Group(name: name)


proc newGroupPermission(groupId = -1, permissionId = -1): GroupPermission =
    result = GroupPermission(group_id: groupId, permission_id: permissionId)


proc newUserGroup(userId = -1, groupId = -1): UserGroup =
    result = UserGroup(user_id: userId, group_id: groupId)


proc newUserPermission(userId = -1, permissionId = -1): UserPermission =
    result = UserPermission(user_id: userId, permission_id: permissionId)

proc newTableModel*(T: typedesc[User]): User = newUser()

proc newModel*(T: typedesc[GroupPermission]): GroupPermission = newGroupPermission()
proc newModel*(T: typedesc[UserPermission]): UserPermission = newUserPermission()
proc newModel*(T: typedesc[User]): User = newUser()
proc newModel*(T: typedesc[Group]): Group = newGroup()
proc newModel*(T: typedesc[Permission]): Permission = newPermission()
proc newModel*(T: typedesc[UserGroup]): UserGroup = newUserGroup()