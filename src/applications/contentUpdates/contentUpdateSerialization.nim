import std/[options, json]
import ../../utils/djangoDateTime/[djangoDateTimeType]

type ContentUpdateSerializable* = JsonNode

type VisitedState* = enum
  newUpdated = "NEW_UPDATED"
  newCreated = "NEW_CREATED"
  seen = "SEEN"

proc contentUpdateSerialize*(contentUpdate: JsonNode, lastVisit: Option[DjangoDateTime]): ContentUpdateSerializable =
  let hasSeenAnything = lastVisit.isSome
  if not hasSeenAnything:
    contentUpdate["visited_state"] = %VisitedState.newCreated
    return contentUpdate
  
  let lastVisitDate: DjangoDateTime = lastVisit.get()
  let updateTimestamp: DjangoDateTime = contentUpdate["update_datetime"].getStr().parseDefault()
  let createTimestamp: DjangoDateTime = contentUpdate["creation_datetime"].getStr().parseDefault()

  let hasSeenArticle = createTimestamp > lastVisitDate
  let hasSeenArticleUpdate = updateTimestamp > lastVisitDate
  if hasSeenArticleUpdate:
    contentUpdate["visited_state"] = %VisitedState.newUpdated
  elif hasSeenArticle:
    contentUpdate["visited_state"] = %VisitedState.newCreated
  else:
    contentUpdate["visited_state"] = %VisitedState.seen
    
  return contentUpdate