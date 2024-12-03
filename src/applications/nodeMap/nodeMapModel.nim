type LinkKind* = enum
  ItemOwnership = "itemOwnership"
  OrganizationMembership = "orgnizationMembership"

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
  