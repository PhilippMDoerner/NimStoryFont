import quoteModels
import norm/[sqlite]
import ../allUrlParams
import ../genericArticleRepository
import ../character/characterModel
import std/random

export quoteModels

proc getCharacterQuotes*(connection: DbConn, requestParams: ReadByNameParams): seq[QuoteRead] =
  let character: CharacterRead = connection.getEntryByName(requestParams.campaignName, requestParams.articleName, CharacterRead)
  result = connection.getManyToMany(character, QuoteConnection, QuoteRead)

proc getRandomCharacterQuote*(connection: DbConn, requestParams: ReadByNameParams): QuoteRead =
  let quotes = getCharacterQuotes(connection, requestParams)
  result = sample(quotes)