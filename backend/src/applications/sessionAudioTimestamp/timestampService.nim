import ./timestampModel
import ./timestampRepository
import ../genericArticleRepository
import ../allUrlParams

export timestampModel

proc createTimestamp*(
    connection: DbConn, requestParams: CreateParams, entry: var Timestamp
): Timestamp =
  result = connection.createEntryInTransaction(entry)

proc getTimestampsForSessionAudio*(
    connection: DbConn, requestParams: ReadTimestampListParams
): seq[TimestampRead] =
  result = connection.readTimestampsForSessionAudio(
    requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession
  )
