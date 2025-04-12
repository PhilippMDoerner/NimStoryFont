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

implDefaults(OrganizationMembership, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type OrganizationMembershipRead*  {.defaults, readOnly, tableName: ORGANIZATION_CHARACTER_TABLE.} = ref object of Model
    organization_id*: OrganizationRead = new(OrganizationRead)
    member_id* {.fk: Character.}: int64 = MODEL_INIT_ID
    role*: Option[string] = some("")

implDefaults(OrganizationMembershipRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

type OrganizationMemberRead*  {.defaults, readOnly, tableName: ORGANIZATION_CHARACTER_TABLE.} = ref object of Model
    organization_id* {.fk: Organization.}: int64 = MODEL_INIT_ID
    member_id*: Character = new(Character)
    role*: Option[string] = some("")

implDefaults(OrganizationMemberRead, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})
