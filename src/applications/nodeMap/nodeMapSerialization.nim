import std/[sequtils, json]
import norm/sqlite
import ./nodeMapModel

type NodeSerializable* = ref object
  record*: JsonNode
  guid*: string
  
type NodeMapSerializable* = object
  nodes*: seq[NodeSerializable]
  links*: seq[Link]

proc serializeNodeMap*(nodeMap: NodeMap): NodeMapSerializable =
  let serializedNodes = nodeMap.nodes.mapIt(NodeSerializable(
    guid: it.guid,
    record: it.record.parseJson()
  ))
  
  return NodeMapSerializable(
    nodes: serializedNodes,
    links: nodeMap.links
  )
  
proc serializeCustomLink*(con: DbConn, link: CustomLink): Link =
  return Link(
    node1Guid: link.node1Guid,
    node2Guid: link.node2Guid,
    label: link.label,
    weight: link.weight,
    linkKind: "custom",
  )