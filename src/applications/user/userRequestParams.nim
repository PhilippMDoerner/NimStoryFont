import constructor/defaults
import ../allUrlParams

export allUrlParams

type ReadUserByNameParams* {.defaults.} = object
  username*: string
implDefaults(ReadUserByNameParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
