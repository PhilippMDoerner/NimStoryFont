import prologue

#Prologue Settings
type SettingName* = enum
    snSettingSetName = "name",
    snSecretKey = "secretKey",
    snAccesTokenLifetime = "accessTokenLifetimeInDays",
    snRefreshTokenLifetime ="refreshTokenLifetimeInDays",
    snConnectionLimit = "databaseConnectionLimit",
    snDatabasePath = "databasePath",
    snBaseDir = "baseDir",
    snImageDir = "imageDir",
    snAudioDir = "audioDir",
    snAudioUploadDir = "audioUploadDir",
    snAudioUrlPrefix = "audioUrlPrefix",
    snPageSize = "pageSize",
    snSmtpName = "smtp",
    snEmailName = "emailName",
    snEmailPassword = "emailPassword"

let settings*: Settings = loadSettings("./settings.json")
proc getSetting*(ctx: Context, setting: SettingName): JsonNode = ctx.getSettings($setting)

#Custom Settings
const MEDIA_URL* = "/media/"
const AUTHORIZATION_HEADER*: string = "Authorization"

#Hashing Settings
const DEFAULT_HASH_ITERATIONS* = 180000
const DEFAULT_SALT_LENGTH* = 12
const DEFAULT_RESET_PASSWORD_LENGTH* = 20

#Constants
const PRIMARY_DB_TIME_FORMAT* = "yyyy-MM-dd HH:mm:ss'.'ffffff" #Datetime format as Django stores it in DB
const SECONDARY_DB_TIME_FORMAT* = "yyyy-MM-dd HH:mm:ss" # Datetime format as Django sometimes stores it in DB
const OUTPUT_TIME_FORMAT* = "yyyy-MM-dd'T'HH:mm:ss'.'ffffff'Z'"
const SESSION_DATE_FORMAT* = "yyyy-MM-dd"
###TABLE NAMES
#Auth
const GROUP_TABLE* = "auth_group"
const GROUP_PERMISSION_TABLE* = "auth_group_permissions"
const PERMISSION_TABLE* = "auth_permission"
const USER_TABLE* = "auth_user"
const USER_GROUP_TABLE* = "auth_user_groups"
const USER_USERPERMISSIONS_TABLE* = "auth_user_user_permissions"

const TOKEN_TABLE* = "authtoken_token"
const TOKEN_BLACKLIST_TABLE* = "token_blacklist_blacklistedtoken"
const TOKEN_OUTSTANDING_TABLE* = "token_blacklist_outstandingtoken"

#Django
const DJ_ADMIN_LOG_TABLE* = "django_admin_log"
const DJ_CONTENT_TYPE_TABLE* = "django_content_type"
const DJ_MIGRATION_TABLE* = "django_migrations"
const DJ_SESSION_TABLE* = "django_session"

const DJ_GROUPOBJECTPERMISSION* = "guardian_groupobjectpermission"
const DJ_USEROBJECTPERMISSION* = "guardian_userobjectpermission"

#Wikientries
const CAMPAIGN_TABLE* = "wikientries_campaign"
const CHARACTER_TABLE* = "wikientries_character"
const CHARACTER_PLAYERCLASS_TABLE* = "wikientries_characterplayerclassconnection"
const CREATURE_TABLE* = "wikientries_creature"
const DIARYENTRY_TABLE* = "wikientries_diaryentry"
const ENCOUNTER_TABLE* = "wikientries_encounter"
const ENCOUNTER_CHARACTER_TABLE* = "wikientries_encounterconnection"
const IMAGE_TABLE* = "wikientries_image"
const ITEM_TABLE* = "wikientries_item"
const LOCATION_TABLE* = "wikientries_location"
const ORGANIZATION_TABLE* = "wikientries_organization"
const PLAYERCLASS_TABLE* = "wikientries_playerclass"
const QUEST_TABLE* = "wikientries_quest"
const QUOTE_TABLE* = "wikientries_quote"
const QUOTE_CHARACTER_TABLE* = "wikientries_quoteconnection"
const RULES_TABLE* = "wikientries_rules"
const SESSION_TABLE* = "wikientries_session"
const SPELL_TABLE* = "wikientries_spell"
const SPELL_PLAYERCLASS_TABLE* = "wikientries_spellclassconnection"

#Fileserver
const SESSIONAUDIO_TABLE* = "fileserver_sessionaudio"
const TIMESTAMP_TABLE* = "fileserver_sessionaudiotimestamp"

#Map
const MAP_TABLE* = "map_map"
const MARKER_TABLE* = "map_marker"
const MARKERTYPE_TABLE* = "map_markertype"

#Search
const SEARCH_TABLE* = "search_article_content"
const EMPTY_SEARCH_RESPONSE_TABLE* = "wikientries_emptysearchresponse"

#Sqlite
const SQLITE_SEQUENCE_TABLE* = "sqlite_sequence"

#Views
const V_ALL_ARTICLES_TABLE* = "v_all_articles"