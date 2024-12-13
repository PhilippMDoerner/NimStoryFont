import std/[sequtils, json, options]
import norm/sqlite
import ./nodeMapModel
import ../genericArticleRepository

type NodeSerializable* = object
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
  let linkKind = con.getEntryById(link.link_type_id, CustomLinkType)
  let weight = link.weight.get(linkKind.weight)
  return Link(
    id: some(link.id),
    sourceGuid: link.sourceGuid,
    targetGuid: link.targetGuid,
    label: link.label,
    weight: weight,
    color: linkKind.color,
    icon: linkKind.icon,
    linkKind: linkKind.name
  )
  
proc noSerialization*[T](con: DbConn, link: T): T = link