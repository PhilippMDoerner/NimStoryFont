import std/[tables, strutils, strformat, json]
import constructor/defaults
import ../applicationConstants

type TokenType* {.pure.} = enum
  access = "access"
  refresh = "refresh"

type CampaignAccessLevel* = enum
  GUEST = "guest"
  MEMBER = "member"
  ADMIN = "admin"

type CampaignIdType* = enum
  citString
  citInt

type CampaignIdentifier* = object
  case kind*: CampaignIdType
  of citString: campaignName*: string
  of citInt: id*: int64

type CampaignMemberships* = TableRef[CampaignIdentifier, CampaignAccessLevel]

## CampaignIdentifier Utils
proc newCampaignIdentifier*(id: int64): CampaignIdentifier =
  result = CampaignIdentifier(kind: CampaignIdType.citInt, id: id)

proc newCampaignIdentifier*(campaignName: string): CampaignIdentifier =
  result =
    CampaignIdentifier(kind: CampaignIdType.citString, campaignName: campaignName)

proc `==`*(id1, id2: CampaignIdentifier): bool =
  if id1.kind != id2.kind:
    return false

  result =
    case id1.kind
    of CampaignIdType.citString:
      id1.campaignName == id2.campaignName
    of CampaignIdType.citInt:
      id1.id == id2.id

proc `$`*(id: CampaignIdentifier): string =
  result =
    case id.kind
    of citString:
      id.campaignName
    of citInt:
      fmt"{ID_STRING_PREFIX}{$id.id}"

proc dumpHook*(s: var string, identifier: CampaignIdentifier) =
  ## Implements serializing the identifier to JSON strings for jsony
  s.add('"')

  case identifier.kind
  of CampaignIdType.citString:
    s.add(identifier.campaignName)
  of CampaignIdType.citInt:
    s.add(fmt"{ID_STRING_PREFIX}{identifier.id}")

  s.add('"')

proc jsonFieldName*(identifier: CampaignIdentifier): string =
  case identifier.kind
  of CampaignIdType.citString:
    result = identifier.campaignName
  of CampaignIdType.citInt:
    result = fmt"{ID_STRING_PREFIX}{identifier.id}"

## CampaignMemberships utils
proc newMembershipTable*(): CampaignMemberships =
  result = newTable[CampaignIdentifier, CampaignAccessLevel]()

proc hasKey*(table: CampaignMemberships, key: int64 | string): bool =
  result = table.hasKey(newCampaignIdentifier(key))

proc `[]`*(
    table: CampaignMemberships, identifier: int64 | string
): CampaignAccessLevel =
  result = table[newCampaignIdentifier(identifier)]

proc `[]=`*(
    table: var CampaignMemberships, identifier: int64, value: CampaignAccessLevel
) =
  let id = newCampaignIdentifier(identifier)
  table[id] = value

proc `[]=`*(
    table: var CampaignMemberships, identifier: string, value: CampaignAccessLevel
) =
  let isIntIdentifier = identifier.startsWith(ID_STRING_PREFIX)
  if isIntIdentifier:
    var idCopy = identifier
    idCopy.removePrefix(ID_STRING_PREFIX)
    table[newCampaignIdentifier(idCopy.parseInt().int64)] = value
  else:
    table[newCampaignIdentifier(identifier)] = value

proc toJson*(memberships: CampaignMemberships): JsonNode =
  result = JsonNode(kind: JObject)
  for identifier, accessLevel in memberships.pairs:
    let fieldName = identifier.jsonFieldName()
    result.fields[fieldName] = JsonNode(kind: JString, str: $accessLevel)

## TokenData
type TokenData* {.defaults.} = object
  campaignMemberships*: CampaignMemberships = newMembershipTable()
  isAdmin*: bool = false
  isSuperUser*: bool = false
  userId*: int64 = MODEL_INIT_ID
  userName*: string = ""
  jti*: string = ""
  exp*: int64 = -1

implDefaults(TokenData)

proc newTokenData*(): TokenData =
  initTokenData()

proc isInitTokenData*(tokenData: TokenData): bool =
  tokenData.userId == MODEL_INIT_ID
