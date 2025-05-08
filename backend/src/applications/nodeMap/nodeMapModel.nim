import std/options
import norm/[model, pragmas]
import ../campaign/campaignModel
import ../../applicationSettings
import ../../utils/djangoDateTime/djangoDateTimeType
import constructor/defaults

type CustomLinkType* {.defaults, tableName: RELATIONSHIP_KIND_TABLE.} = ref object of Model
  name*: string = ""
  icon*: Option[string] = ""
  color*: string = ""
  weight*: int = 1
  campaign_id* {.fk: Campaign.}: Option[int64] = none(int64)
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()

type CustomLink* {.defaults, tableName: RELATIONSHIP_TABLE.} = ref object of Model
  sourceGuid*: string = ""
  targetGuid*: string = ""
  label*: string = ""
  weight*: Option[int] = none(int)
  link_type_id* {.fk: CustomLinkType.}: int64
  creation_datetime*: DjangoDateTime = djangoDateTimeType.now()
  update_datetime*: DjangoDateTime = djangoDateTimeType.now()
  campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

type Node* = ref object
  record*: string
  guid*: string

type Link* = ref object
  id*: Option[int64]
  sourceGuid*: string
  targetGuid*: string
  label*: string
  weight*: int
  color*: string
  icon*: Option[string]
  linkKind*: string

type NodeMap* = object
  nodes*: seq[Node]
  links*: seq[Link]
