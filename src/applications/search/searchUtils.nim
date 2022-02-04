import searchModel
import std/strformat
import norm/model

proc getSearchGuid*(article: Article): string =
  const tableName = article.type.table()
  result = fmt "{tableName}_{article.id}"