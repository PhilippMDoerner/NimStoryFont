import norm/[model, pragmas]
import constructor/defaults
import ../../applicationSettings

type DjangoContentType* {.defaults, readOnly, tableName: DJ_CONTENT_TYPE_TABLE.} = ref object of Model
  app_label*: string = ""
  model*: string = ""

implDefaults(DjangoContentType, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
