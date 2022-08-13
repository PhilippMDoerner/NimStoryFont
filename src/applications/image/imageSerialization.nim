import imageModel
import imageUtils
import std/[options]
import tinypool/sqlitePool
import norm/sqlite

type ImageSerializable* = object
  pk: int64
  image*: string
  name*: Option[string]
  character_article: Option[int64]
  creature_article*: Option[int64]
  item_article*: Option[int64] 
  location_article*: Option[int64]
  organization_article*: Option[int64]

proc serializeImage*(entry: Image): ImageSerializable =
  result = ImageSerializable(
    pk: entry.id,
    image: entry.image.getImagePath(),
    name: entry.name,
    character_article: entry.character_article_id,
    creature_article: entry.creature_article_id,
    item_article: entry.item_article_id,
    location_article: entry.location_article_id,
    organization_article: entry.organization_article_id
  )

proc serializeImage*(connection: DbConn, entry: Image): ImageSerializable =
  result = entry.serializeImage()