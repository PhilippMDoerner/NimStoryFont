import norm/[model, pragmas]
import ../../applicationSettings
import constructor/defaults

type DjangoContentType* {.defaults, tableName: DJ_CONTENT_TYPE_TABLE.} = ref object of Model
    app_label*: string = ""
    model*: string = ""
implDefaults(DjangoContentType)
proc newModel*(t: typedesc[DjangoContentType]): DjangoContentType = newDjangoContentType()
proc newTableModel*(t: typedesc[DjangoContentType]): DjangoContentType =  newDjangoContentType()
