import std/strformat
import constructor/defaults
import ../applicationConstants

const CAMPAIGN_NAME_PARAM* = "campaignName"
const CAMPAIGN_NAME_PATTERN* = fmt r"(?P<{CAMPAIGN_NAME_PARAM}>[^/]+)"

const ID_PARAM* = "id"
const ID_PATTERN* = fmt r"(?P<{ID_PARAM}>[\d]+)"

const ARTICLE_NAME_PARAM* = "articleName"
const ARTICLE_NAME_PATTERN* = fmt r"(?P<{ARTICLE_NAME_PARAM}>[^/]+)"

const SEARCH_TEXT_PARAM* = "searchText"
const SEARCH_TEXT_PATTERN* = fmt r"(?P<{SEARCH_TEXT_PARAM}>[^/]+)"

const PARENT_LOCATION_NAME_PARAM* = "parentLocationName"
const PARENT_LOCATION_NAME_PATTERN* = fmt r"(?P<{PARENT_LOCATION_NAME_PARAM}>[^/]+)"

const LOCATION_NAME_PARAM* = "parentLocationName"
const LOCATION_NAME_PATTERN* = fmt r"(?P<{LOCATION_NAME_PARAM}>[^/]+)"

const PAGE_NUMBER_PARAM* = "pageNumber"
const PAGE_NUMBER_PATTERN* = fmt r"(?P<{PAGE_NUMBER_PARAM}>[\d]+)"

const SESSION_NUMBER_PARAM* = "sessionNumber"
const SESSION_NUMBER_PATTERN* = fmt r"(?P<{SESSION_NUMBER_PARAM}>[\d]+)"

const SESSION_IS_MAIN_SESSION_PARAM* = "isMainSession"
const SESSION_IS_MAIN_SESSION_PATTERN* = fmt r"(?P<{SESSION_IS_MAIN_SESSION_PARAM}>[\d]+)"


const USERNAME_PARAM* = "userName"
const USERNAME_PATTERN* = fmt r"(?P<{USERNAME_PARAM}>[^/]+)"



type ReadByIdParams* {.defaults.} = object
  id*: int64 = MODEL_INIT_ID
implDefaults(ReadByIdParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type DeleteParams* = ReadByIdParams

type ReadByNameParams* {.defaults.} = object
  campaignName*: string = ""
  articleName*: string = ""
implDefaults(ReadByNameParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type CreateParams* {.defaults.} = object
  body*: string = ""
implDefaults(CreateParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type UpdateParams* {.defaults.} = object
  id*: int64 = MODEL_INIT_ID
  body*: string = ""
implDefaults(UpdateParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ReadListParams* {.defaults.} = object
  campaignName*: string = ""
implDefaults(ReadListParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ReadDiaryEntryParams* {.defaults.} = object
  campaignName*: string = ""
  sessionNumber*: int = -1
  isMainSession*: bool = true
  userName*: string = ""
implDefaults(ReadDiaryEntryParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
