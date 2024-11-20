import constructor/defaults
import ../../applicationConstants

type UpdatedArticle* {.defaults.} = ref object
  table_name*: string = ""
  record_id*: int64 = MODEL_INIT_ID
  campaign_id*: int64 = MODEL_INIT_ID
  guid*: string = ""
implDefaults(UpdatedArticle, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
