import std/[options, json]
import ../../utils/djangoDateTime/[djangoDateTimeType]

type ContentUpdateSerializable* = JsonNode

type VisitedState* = enum
  newUpdated = "NEW_UPDATED"
  newCreated = "NEW_CREATED"
  seen = "SEEN"

proc contentUpdateSerialize*(
    contentUpdate: JsonNode, lastVisit: Option[DjangoDateTime]
): ContentUpdateSerializable =
  let hasSeenAnything = lastVisit.isSome
  if not hasSeenAnything:
    contentUpdate["visited_state"] = %VisitedState.newCreated
    return contentUpdate

  let lastVisitDate: DjangoDateTime = lastVisit.get()
  let updateDateTime: DjangoDateTime =
    contentUpdate["update_datetime"].getStr().parseDefault()
  let createDateTime: DjangoDateTime =
    contentUpdate["creation_datetime"].getStr().parseDefault()

  let isNewArticle = updateDateTime == createDateTime
  let hasSeenArticle = lastVisitDate > createDateTime
  let hasSeenLatestArticleUpdate = lastVisitDate > updateDateTime
  if not isNewArticle and not hasSeenLatestArticleUpdate:
    contentUpdate["visited_state"] = %VisitedState.newUpdated
  elif isNewArticle and not hasSeenArticle:
    contentUpdate["visited_state"] = %VisitedState.newCreated
  else:
    contentUpdate["visited_state"] = %VisitedState.seen

  return contentUpdate
