import searchModel
import norm/sqlite
import ../genericArticleRepository
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[options, sequtils, sugar]

# proc serializeSearchHit(entry: SearchHit): SearchSerializable =
