import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults

type LinkKind* = enum
  ItemOwnership = "itemOwnership"
  OrganizationMembership = "organizationMembership"
  LocationPlacement = "locationPlacement"
  Sublocation = "sublocation"

type Link* = ref object
  node1Guid*: string
  node2Guid*: string
  label*: string
  weight*: int
  linkKind*: string
  
type Node* = ref object
  record*: string
  guid*: string
  
type NodeMap* = object
  nodes*: seq[Node]
  links*: seq[Link]
  
type CustomLink* {.defaults, tableName: RELATIONSHIP_TABLE.} = ref object of Model
  node1Guid*: string = ""
  node2Guid*: string = ""
  label*: string = "" 
  weight*: int = 1
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID # The id of the campaign that this character occurred in
