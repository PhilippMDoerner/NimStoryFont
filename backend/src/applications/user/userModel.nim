import norm/[model, pragmas]
import ../../utils/djangoDateTime/djangoDateTimeType
import ../../applicationSettings
import std/[options]
import constructor/defaults

type User* {.defaults, tableName: USER_TABLE.} = ref object of Model
  password*: string = ""
  last_login*: Option[DjangoDateTime] = some(djangoDateTimeType.now())
  is_superuser*: bool = false
  username*: string = ""
  last_name*: string = ""
  email*: string = ""
  is_staff*: bool = false
  is_active*: bool = true
  date_joined*: DjangoDateTime = djangoDateTimeType.now()
  first_name*: string = ""

implDefaults(User, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type UserMetadata* {.defaults, tableName: USER_METADATA_TABLE.} = ref object of Model
  user_id* {.fk: User.}: int64 = MODEL_INIT_ID
  category*: string = "metadata"
  name*: string = ""
  value*: string = ""
