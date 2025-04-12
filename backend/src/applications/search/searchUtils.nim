import ../articleModel
import std/strformat
import norm/model

proc getSearchGuid*(article: Article): string =
  const tableNameWithQuotations = article.type().table()
  const tableName = tableNameWithQuotations[1..^2]
  result = fmt "{tableName}_{article.id}"