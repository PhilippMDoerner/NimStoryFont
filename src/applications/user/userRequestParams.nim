import constructor/defaults
import ../../applicationConstants

type NameRequestParams* {.defaults.} = object
  username*: string

type UserRequestParams* {.defaults.} = object
  id*: int64 = MODEL_INIT_ID
implDefaults(UserRequestParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type UserCreateRequestParams* {.defaults.} = object
  body*: string = ""
implDefaults(UserCreateRequestParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type UserUpdateRequestParams* {.defaults.} = object
  id*: int64 = MODEL_INIT_ID
  body*: string = ""
implDefaults(UserUpdateRequestParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type UserListRequestParams* {.defaults.} = object
  campaignName*: string = ""
implDefaults(UserListRequestParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
