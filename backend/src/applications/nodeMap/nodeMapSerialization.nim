import std/[sequtils, json, options, tables]
import norm/sqlite
import ./nodeMapModel
import ../genericArticleRepository

type NodeSerializable* = object
  record*: JsonNode
  guid*: string

type LinkGroup* = object
  name*: string
  links*: seq[Link]

type NodeMapSerializable* = object
  nodes*: seq[NodeSerializable]
  links*: seq[LinkGroup]

proc toLinkGroup*(links: seq[Link]): seq[LinkGroup] =
  var linkGroups = initTable[string, seq[Link]]()
  for link in links:
    let isNewLinkGroup = not linkGroups.hasKey(link.linkKind)
    if isNewLinkGroup:
      linkGroups[link.linkKind] = @[]
    linkGroups[link.linkKind].add(link)

  for linkGroupName, links in linkGroups.pairs:
    result.add(LinkGroup(name: linkGroupName, links: links))

  return result

proc serializeNodeMap*(nodeMap: NodeMap): NodeMapSerializable =
  let serializedNodes =
    nodeMap.nodes.mapIt(NodeSerializable(guid: it.guid, record: it.record.parseJson()))

  let serializedLinks = toLinkGroup(nodeMap.links)

  return NodeMapSerializable(nodes: serializedNodes, links: serializedLinks)

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
    linkKind: linkKind.name,
  )

proc noSerialization*[T](con: DbConn, link: T): T =
  link
