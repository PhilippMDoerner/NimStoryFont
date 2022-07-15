import norm/[model, pragmas]
import ../organization/organizationModel
import ../../applicationSettings
import ../../applicationConstants
import characterModel
import std/options
import constructor/defaults

export organizationModel

type OrganizationMembership* {.defaults, tableName: ORGANIZATION_CHARACTER_TABLE.} = ref object of Model
    member_id* {.fk: Character.}: int64 = MODEL_INIT_ID
    organization_id* {.fk: Organization.}: int64 = MODEL_INIT_ID
    role*: Option[string] = some("")

implDefaults(OrganizationMembership)
proc newModel*(T: typedesc[OrganizationMembership]): OrganizationMembership =
    result = newOrganizationMembership()
proc newTableModel*(T: typedesc[OrganizationMembership]): OrganizationMembership =
    result = newOrganizationMembership()

type OrganizationMembershipRead*  {.defaults, tableName: ORGANIZATION_CHARACTER_TABLE.} = ref object of Model
    organization_id*: OrganizationRead = newModel(OrganizationRead)
    member_id* {.fk: Character.}: int64 = MODEL_INIT_ID
    role*: Option[string] = some("")

implDefaults(OrganizationMembershipRead)
proc newModel*(T: typedesc[OrganizationMembershipRead]): OrganizationMembershipRead =
    result = newOrganizationMembershipRead()

type OrganizationMemberRead*  {.defaults, tableName: ORGANIZATION_CHARACTER_TABLE.} = ref object of Model
    organization_id* {.fk: Organization.}: int64 = MODEL_INIT_ID
    member_id*: Character = newModel(Character)
    role*: Option[string] = some("")

implDefaults(OrganizationMemberRead)
proc newModel*(T: typedesc[OrganizationMemberRead]): OrganizationMemberRead =
    result = newOrganizationMemberRead()
