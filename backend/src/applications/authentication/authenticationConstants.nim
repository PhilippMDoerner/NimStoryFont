import std/sequtils

const CAMPAIGN_GUEST_PERMISSIONS*: seq[string] = @[
    "view_session",
    "view_character",
    "view_organization",
    "view_encounter",
    "view_location",
    "view_creature",
    "view_diaryentry",
    "view_items",
    "view_item",
    "view_quest",
    "view_rules",
    "view_map",
    "view_marker",
    "view_image",
    "view_spells",
    "view_spell",
    "view_encounterconnection",
    "view_sessionaudio",
    "view_sessionaudiotimestamp",
    "view_quote",
    "view_quoteconnection",
    "view_apipermissions",
    "view_diaryentryencounterconnection",
    "view_spellclassconnection",
    "view_characterplayerclassconnection",
    "view_campaign",
]

const CAMPAIGN_MEMBER_PERMISSIONS*: seq[string] = CAMPAIGN_GUEST_PERMISSIONS.concat @[
    "view_user",
 
    "add_session",
    "change_session",
    "delete_session",

    "add_character",
    "change_character",
    "delete_character",
    
    "add_organization",
    "change_organization",
    "delete_organization",

    "add_encounter",
    "change_encounter",
    "delete_encounter",

    "add_location",
    "change_location",
    "delete_location",

    "add_creature",
    "change_creature",
    "delete_creature",

    "add_diaryentry",
    "change_diaryentry",
    "delete_diaryentry",

    "add_items",
    "change_items",
    "delete_items",

    "add_item",
    "change_item",
    "delete_item",

    "add_quest",
    "change_quest",
    "delete_quest",

    "add_map",
    "change_map",
    "delete_map",

    "add_marker",
    "change_marker",
    "delete_marker",

    "add_image",
    "change_image",
    "delete_image",

    "add_spells",
    "change_spells",
    "delete_spells",

    "add_spell",
    "change_spell",
    "delete_spell",

    "add_encounterconnection",
    "change_encounterconnection",
    "delete_encounterconnection",

    "add_sessionaudio",
    "change_sessionaudio",
    "delete_sessionaudio",

    "add_sessionaudiotimestamp",
    "change_sessionaudiotimestamp",
    "delete_sessionaudiotimestamp",

    "add_quote",
    "change_quote",
    "delete_quote",

    "add_quoteconnection",
    "change_quoteconnection",
    "delete_quoteconnection",

    "add_apipermissions",
    "change_apipermissions",
    "delete_apipermissions",

    "add_diaryentryencounterconnection",
    "change_diaryentryencounterconnection",
    "delete_diaryentryencounterconnection",

    "add_spellclassconnection",
    "change_spellclassconnection",
    "delete_spellclassconnection",

    "add_characterplayerclassconnection",
    "change_characterplayerclassconnection",
    "delete_characterplayerclassconnection",
]

const CAMPAIGN_ADMIN_PERMISSIONS*: seq[string] = CAMPAIGN_MEMBER_PERMISSIONS.concat @[
    "add_user",

    "add_rules",
    "change_rules",
    "delete_rules",

    "change_campaign",

    "add_playerclass",
    "change_playerclass",
    "delete_playerclass",
    "view_playerclass",

    "add_markertype",
    "change_markertype",
    "delete_markertype",
    "view_markertype",
]


type CampaignRole* = enum
  crMEMBER = "member"
  crADMIN = "admin"
  crGUEST = "guest"