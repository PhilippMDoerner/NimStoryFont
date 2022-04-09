import quoteModels
import norm/sqlite
import ../genericArticleRepository

type QuoteSerializable* = QuoteRead


proc serializeQuoteRead*(connection: DbConn, entry: QuoteRead): QuoteSerializable =
    result = entry

proc serializeQuote*(connection: DbConn, entry: Quote): QuoteSerializable =
    let fullEntry = connection.getEntryById(entry.id, QuoteRead)
    result = connection.serializeQuoteRead(fullEntry)
