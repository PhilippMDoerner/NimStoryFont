import norm/[model, pragmas]
import ../../applicationSettings
import constructor/defaults

type DjangoContentType* {.defaults, readOnly, tableName: DJ_CONTENT_TYPE_TABLE.} = ref object of Model
  app_label*: string = ""
  model*: string = ""

implDefaults(DjangoContentType, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
