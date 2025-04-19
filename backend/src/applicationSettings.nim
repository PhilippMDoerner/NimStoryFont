import prologue
import std/[os, strformat, sets]

#Prologue Settings
const DEFAULT_SETTINGS_FILE_PATH = "./configs/settings.json"
const SETTINGS_FILE_PATH_ENVIRONMENT_VARIABLE = "nimstoryfontsettings"

type SettingsFileError* = object of CatchableError
type SettingName* = enum
    snSettingSetName = "name", # Name of this set of settings
    snSecretKey = "secretKey",
    snAccesTokenLifetime = "accessTokenLifetimeInDays",
    snRefreshTokenLifetime ="refreshTokenLifetimeInDays",
    snConnectionLimit = "databaseConnectionLimit", # Number of connections that shall be available in the database connection pool 
    snDatabasePath = "databasePath", # Filepath to the sqlite3 database
    snBaseDir = "baseDir", 
    snImageDir = "imageDir", # Directory containing all images to upload images to 
    snAudioDir = "audioDir", # Directory containing all audio files
    snAudioUploadDir = "audioUploadDir", # Sub-Folder of snAudioDir. Directory that newly uploaded audio files shall be moved to
    snPageSize = "pageSize", # The amount of entries to send to the frontend as one "page" if number of entries sent must be limited
    snSmtpName = "smtp",
    snSmtpPort = "smtpPort",
    snEmailName = "emailName",
    snEmailPassword = "emailPassword"

type CoreSettingName* = enum
    csnSecretKey = "secretKey"


const INT_SETTINGS = [snAccesTokenLifetime, snRefreshTokenLifetime, snConnectionLimit, snPageSize, snSmtpPort].toHashSet
const STRING_SETTINGS = [snSettingSetName, snSecretKey, snDatabasePath, snBaseDir, snImageDir, snAudioDir, snAudioUploadDir, snSmtpName, snEmailName, snEmailPassword].toHashSet()

proc getSetting*(ctx: Context, setting: SettingName): JsonNode = ctx.getSettings($setting)
proc getCoreSetting(settings: Settings, setting: CoreSettingName): JsonNode = settings.getOrDefault("prologue")[$setting]
proc getSetting*(settings: Settings, setting: SettingName): JsonNode =
    case setting:
    of snSecretKey:
        return settings.getCoreSetting(csnSecretKey)
    else:
        return settings.getOrDefault($setting)

proc validateSettingValue*(settingName: SettingName, settingValue: JsonNode) =
    if INT_SETTINGS.contains(settingName):
        if settingValue.kind != JInt:
            raise newException(ValueError, fmt"Setting '{settingName}' with value '{settingValue}' was expected to be an integer, but was of type '{settingValue.kind}'!")
    
    elif STRING_SETTINGS.contains(settingName):
        if settingValue.kind != JString:
            raise newException(ValueError, fmt"Setting '{settingName}' with value '{settingValue}' was expected to be a string, but was of type '{settingValue.kind}'!")

    else:
        raise newException(ValueError, fmt"Type of setting '{settingName}' has not been defined! A setting with this name might not exist.")

proc validateSettings*(settings: Settings) =
  for setting in SettingName:
    let settingValue = settings.getSetting(setting)
    if settingValue == nil:
        raise newException(SettingsFileError, fmt"The loaded settings file at '{DEFAULT_SETTINGS_FILE_PATH}' is missing a value for the setting '{setting}'!")
    
    validateSettingValue(setting, settingValue)

proc getSettingsFilepath(): string =
    if existsEnv(SETTINGS_FILE_PATH_ENVIRONMENT_VARIABLE):
        let filePath = getEnv(SETTINGS_FILE_PATH_ENVIRONMENT_VARIABLE)
        if filepath == "":
            raise newException(ValueError, fmt"The environment variable '{SETTINGS_FILE_PATH_ENVIRONMENT_VARIABLE}' denotes the location of the settings file for nimstoryfont. It can not be an empty string. Either delete it to use the default location '{DEFAULT_SETTINGS_FILE_PATH}' or provide a valid path to a nimstoryfont settings file.")
        
        if not fileExists(filepath):
            raise newException(ValueError, fmt"The settings file '{filepath}' does not exist. It was provided by the environment variable '{SETTINGS_FILE_PATH_ENVIRONMENT_VARIABLE}'.")
        
        result = filepath
    else:
        result = DEFAULT_SETTINGS_FILE_PATH

proc loadNimstoryfontSettings(): Settings =
    let settings = loadSettings(getSettingsFilepath())
    settings.validateSettings()
    result = settings

let settings*: Settings = loadNimstoryfontSettings()

#Custom Settings
const MEDIA_URL* = "/media/"
const ARTICLE_IMAGES_SUBDIR* = "article_images"
const CAMPAIGN_ICONS_SUBDIR* = "campaign_icons"
const BACKGROUND_IMAGE_SUBDIR* = "campaign_backgrounds"
const TEMPORARY_FILENAME_HEADER*: string = "x-file-name"
#Hashing Settings
const DEFAULT_HASH_ITERATIONS* = 3
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
const USER_METADATA_TABLE* = "user_metadata"

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
const CAMPAIGN_VISIT_TABLE* = "wikientries_campaignvisit"
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
const ORGANIZATION_CHARACTER_TABLE* = "wikientries_organization_member"
const ORGANIZATION_RELATIONSHIP_TABLE* = "wikientries_organization_relationship"
const PLAYERCLASS_TABLE* = "wikientries_playerclass"
const QUEST_TABLE* = "wikientries_quest"
const QUOTE_TABLE* = "wikientries_quote"
const QUOTE_CHARACTER_TABLE* = "wikientries_quoteconnection"
const RULES_TABLE* = "wikientries_rules"
const SESSION_TABLE* = "wikientries_session"
const SPELL_TABLE* = "wikientries_spell"
const SPELL_PLAYERCLASS_TABLE* = "wikientries_spellclassconnection"
const RELATIONSHIP_TABLE* = "wikientries_relationships"
const RELATIONSHIP_KIND_TABLE* = "wikientries_relationship_type"

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