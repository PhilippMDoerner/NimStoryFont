import norm/[model, pragmas]
import ../../utils/djangoDateTime/djangoDateTimeType
import ../../applicationSettings
import ../../applicationConstants
import std/[tables, options]
import constructor/defaults

type User* {.defaults, tableName: USER_TABLE.} = ref object of Model
    ##[TableModel of the table of creatures ]##
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

implDefaults(User)
proc newTableModel*(T: typedesc[User]): User = newUser()
proc newModel*(T: typedesc[User]): User = newUser()

