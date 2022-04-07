import imageModel
import ../genericArticleRepository
import std/[strformat, options]

proc convertToWebP*(imageFilepath: string): string =
  #TODO: Actually implement this proc
  result = ""

type InvalidImageError* = object of CatchableError


proc campaign_id*(entry: Image): int64 =
  if (entry.character_article_id.isSome()):
    result = getEntryById(entry.character_article_id.get(), ImageCharacter).campaign_id
  elif(entry.creature_article_id.isSome()):
    result = getEntryById(entry.creature_article_id.get(), ImageCreature).campaign_id
  elif(entry.creature_article_id.isSome()):
    result = getEntryById(entry.item_article_id.get(), ImageItem).campaign_id
  elif(entry.creature_article_id.isSome()):
    result = getEntryById(entry.location_article_id.get(), ImageLocation).campaign_id
  elif(entry.creature_article_id.isSome()):
    result = getEntryById(entry.organization_article_id.get(), ImageOrganization).campaign_id
  else:
    raise newException(InvalidImageError, fmt"An impossible image occurred that wasn't associated with any article type. Image Id was {entry.id}")
