import std/[options, sequtils, sugar]
import norm/sqlite
import ./searchModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/djangoDateTimeType

# proc serializeSearchHit(entry: SearchHit): SearchSerializable =
