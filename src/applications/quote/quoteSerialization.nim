import quoteModels
import norm/sqlite
import ../session/[sessionSerialization, sessionModel]
import ../genericArticleRepository
import ../character/characterUtils
import ../../utils/djangoDateTime/djangoDateTimeType
import std/[options, sequtils, sugar]

type QuoteConnectionCharacter* = object
    name: string
    name_full: string
    pk: int64

type QuoteConnectionSerializable* = object
    pk: int64
    character: int64
    character_details: QuoteConnectionCharacter
    quote: int64

proc serializeQuoteConnectionRead(entry: QuoteConnectionRead): QuoteConnectionSerializable =
    result = QuoteConnectionSerializable(
        pk: entry.id,#
        character: entry.character_id.id,
        quote: entry.quote_id.id,
        character_details: QuoteConnectionCharacter(
            pk: entry.character_id.id,
            name: entry.character_id.name,
            name_full: $entry.character_id
        )
    )

proc serializeQuoteConnectionRead*(connection: DbConn, entry: QuoteConnectionRead): QuoteConnectionSerializable =
    result = serializeQuoteConnectionRead(entry)

type QuoteSerializable* = object
    pk: int64
    quote: string
    description: Option[string]
    creation_datetime: DjangoDateTime
    update_datetime: DjangoDateTime
    session: int64
    session_details: SessionSerializable
    encounter: Option[int64]
    connections: seq[QuoteConnectionSerializable]

proc serializeQuoteRead*(entry: QuoteRead, serializedSession: SessionSerializable, quoteConnections: seq[QuoteConnectionRead]): QuoteSerializable =
    result = QuoteSerializable(
        pk: entry.id,
        quote: entry.quote,
        description: entry.description,
        creation_datetime: entry.creation_datetime,
        update_datetime: entry.update_datetime,
        session: entry.session_id.id,
        session_details: serializedSession,
        encounter: entry.encounter_id.map(enc => enc.id),
        connections: quoteConnections.map(serializeQuoteConnectionRead)
    )

proc serializeQuoteRead*(connection: DbConn, entry: QuoteRead): QuoteSerializable =
    let session = connection.getEntryById(entry.session_id.id, SessionRead)
    let serializedSession = connection.serializeSessionRead(session)
    let quoteConnections = connection.getManyFromOne(entry, QuoteConnectionRead)
    result = serializeQuoteRead(entry, serializedSession, quoteConnections)

proc serializeQuoteReads*(connection: DbConn, entries: seq[QuoteRead]): seq[QuoteSerializable] =
    #TODO: do multi queries for quotes to cut down on total query count
    result = entries.map(entry => connection.serializeQuoteRead(entry))

proc serializeQuote*(connection: DbConn, entry: Quote): QuoteSerializable =
    let fullEntry = connection.getEntryById(entry.id, QuoteRead)
    result = connection.serializeQuoteRead(fullEntry)


