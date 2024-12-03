import std/[sequtils, json]
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