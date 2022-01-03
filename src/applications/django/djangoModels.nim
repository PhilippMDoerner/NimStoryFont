import norm/[model, pragmas]
import ../../applicationSettings

type DjangoContentType* {.tableName: DJ_CONTENT_TYPE_TABLE.}: 
    app_label: string
    model: string


proc newDjangoContentType(appLabel: "", model: ""): DjangoContentType =
    result = DjangoContentType(app_label: appLabel, model: model)


proc newModel*(DjangoContentType): DjangoContentType =
    result = newDjangoContentType()


proc newTableModel*(DjangoContentType): DjangoContentType =
    result = newDjangoContentType()