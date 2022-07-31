import std/[strformat]
import constructor/defaults
import ../applicationConstants
import authentication/[authenticationModels]

export authenticationModels

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

const LOCATION_NAME_PARAM* = "locationName"
const LOCATION_NAME_PATTERN* = fmt r"(?P<{LOCATION_NAME_PARAM}>[^/]+)"

const PAGE_NUMBER_PARAM* = "pageNumber"
const PAGE_NUMBER_PATTERN* = fmt r"(?P<{PAGE_NUMBER_PARAM}>[\d]+)"

const SESSION_NUMBER_PARAM* = "sessionNumber"
const SESSION_NUMBER_PATTERN* = fmt r"(?P<{SESSION_NUMBER_PARAM}>[\d]+)"

const SESSION_IS_MAIN_SESSION_PARAM* = "isMainSession"
const SESSION_IS_MAIN_SESSION_PATTERN* = fmt r"(?P<{SESSION_IS_MAIN_SESSION_PARAM}>[\d]+)"

const USERNAME_PARAM* = "userName"
const USERNAME_PATTERN* = fmt r"(?P<{USERNAME_PARAM}>[^/]+)"

const FILE_NAME_PARAM* = "fileName"
const FILE_NAME_PATTERN* = fmt r"(?P<{FILE_NAME_PARAM}>[^/]+)"

type ReadByIdParams* {.defaults.} = object
  id*: int64 = MODEL_INIT_ID
  userToken*: TokenData = newTokenData()
implDefaults(ReadByIdParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type DeleteParams* = ReadByIdParams

type ReadByNameParams* {.defaults.} = object
  campaignName*: string = ""
  articleName*: string = ""
  userToken*: TokenData = newTokenData()
implDefaults(ReadByNameParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type CreateParams* {.defaults.} = object
  body*: string = ""
  userToken*: TokenData = newTokenData()
implDefaults(CreateParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type UpdateParams* {.defaults.} = object
  id*: int64 = MODEL_INIT_ID
  body*: string = ""
  userToken*: TokenData = newTokenData()
implDefaults(UpdateParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ReadListParams* {.defaults.} = object
  campaignName*: string = ""
  userToken*: TokenData = newTokenData()
implDefaults(ReadListParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ReadDiaryEntryParams* {.defaults.} = object
  campaignName*: string = ""
  sessionNumber*: int = -1
  isMainSession*: bool = true
  userName*: string = ""
  userToken*: TokenData = newTokenData()
implDefaults(ReadDiaryEntryParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type ReadLocationByNameParams* {.defaults.} = object
  campaignName*: string = ""
  articleName*: string = ""
  parentLocationName*: string = ""
implDefaults(ReadLocationByNameParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


type ReadMarkerByNameParams* {.defaults.} = object
  campaignName*: string = ""
  articleName*: string = ""
  locationName*: string = ""
  parentLocationName*: string = ""
implDefaults(ReadMarkerByNameParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ReadSessionByParams* {.defaults.} = object
  campaignName*: string = ""
  sessionNumber*: int = -1
  isMainSession*: bool = true
implDefaults(ReadSessionByParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type ReadSessionAudioByParams* = ReadSessionByParams
type ReadTimestampListParams* = ReadSessionByParams

type ReadWithoutParams* {.defaults.} = object
  userToken*: TokenData = newTokenData()
implDefaults(ReadWithoutParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type CampaignNameParams* {.defaults.} = object
  campaignName*: string = ""
implDefaults(CampaignNameParams, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
