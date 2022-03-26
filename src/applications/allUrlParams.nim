import std/strformat

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

const PAGE_NUMBER_PARAM* = "pageNumber"
const PAGE_NUMBER_PATTERN* = fmt r"(?P<{PAGE_NUMBER_PARAM}>[\d]+)"

const SESSION_NUMBER_PARAM* = "sessionNumber"
const SESSION_NUMBER_PATTERN* = fmt r"(?P<{SESSION_NUMBER_PARAM}>[\d]+)"

const SESSION_IS_MAIN_SESSION_PARAM* = "isMainSession"
const SESSION_IS_MAIN_SESSION_PATTERN* = fmt r"(?P<{SESSION_IS_MAIN_SESSION_PARAM}>[\d]+)"


const USERNAME_PARAM* = "userName"
const USERNAME_PATTERN* = fmt r"(?P<{USERNAME_PARAM}>[^/]+)"
