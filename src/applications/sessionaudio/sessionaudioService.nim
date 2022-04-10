import sessionaudioModel
import sessionaudioRepository
import ../genericArticleRepository
import norm/sqlite
import prologue
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../allUrlParams
import ../../utils/[fileUpload, databaseUtils]
import std/options

export sessionaudioModel

type SessionAudioDTO* = object
    sessionId*: Option[int64]
    sessionaudioFile*: Option[UpLoadFile]
    audioDirectory*: string
    entryId*: Option[int64]


proc createSessionAudio*(connection: DbConn, requestParams: var SessionAudioDTO): Option[SessionAudioRead] =
    if requestParams.sessionaudioFile.isNone() or requestParams.sessionId.isNone():
        return none(SessionAudioRead)

    let creationTime: DjangoDateTime = djangoDateTimeType.now();
    let absoluteFilePath: string = uploadSessionAudio(requestParams.sessionaudioFile.get(), requestParams.audioDirectory)
    let pathInDatabase: string = absoluteFilePath.getRelativeFilepathTo(requestParams.audioDirectory)
    
    var newEntry = SessionAudio(
        audio_file: pathInDatabase,
        creation_datetime: creationTime,
        update_datetime: creationTime,
        session_id: requestParams.sessionId.get(),
    )
    
    try:
        let createdEntry = connection.createEntryInTransaction(newEntry)
        result = some(connection.getEntryById(createdEntry.id, SessionAudioRead))
    except Exception:
        deleteArticleImage(absoluteFilePath)
        raise

proc patchSessionAudio*(connection: DbConn, requestParams: var SessionAudioDTO, entry: var SessionAudio): SessionAudio =
    entry.update_datetime = djangoDateTimeType.now()

    var absoluteFilePath: string = ""
    if requestParams.sessionaudioFile.isSome():
        absoluteFilePath = uploadSessionAudio(requestParams.sessionaudioFile.get(), requestParams.audioDirectory)
        let pathInDatabase: string = absoluteFilePath.getRelativeFilepathTo(requestParams.audioDirectory)
        entry.audio_file = pathInDatabase
    
    if requestParams.sessionId.isSome():
        entry.session_id = requestParams.sessionId.get()
    
    try:
        result = connection.updateEntryInTransaction(entry)
    
    except Exception:
        if absoluteFilePath != "": deleteArticleImage(absoluteFilePath)
        raise

proc getSessionAudioByParams*(connection: DbConn, requestParams: ReadSessionAudioByParams): SessionAudioRead =
    result = connection.getSessionAudio(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession)
