import quoteModel
import norm/[sqlite]
import ../allUrlParams
import ../genericArticleRepository
import ../character/characterModel
import std/[strutils, random, options]
export quoteModel

proc getCharacterQuotes*(
    connection: DbConn, requestParams: ReadByNameParams
): seq[QuoteRead] =
  let character: CharacterRead = connection.getEntryByName(
    requestParams.campaignName, requestParams.articleName, CharacterRead
  )
  result = connection.getManyToMany(character, QuoteConnectionRead, QuoteRead)

proc getRandomCharacterQuote*(
    connection: DbConn, requestParams: ReadByNameParams
): Option[QuoteRead] =
  let quotes = getCharacterQuotes(connection, requestParams)
  result =
    if quotes.len() == 0:
      none(QuoteRead)
    else:
      some(sample(quotes))

proc createQuoteConnection*(
    connection: DbConn, quoteId: int64, characterId: int64
): QuoteConnectionRead =
  var quoteConnection = QuoteConnection(character_id: characterId, quote_id: quoteId)
  let createdQuoteConnection = connection.createEntryInTransaction(quoteConnection)

  result = connection.getEntryById(createdQuoteConnection.id, QuoteConnectionRead)
