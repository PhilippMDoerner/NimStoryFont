import sessionaudioModel
import sessionaudioRepository
import ../genericArticleRepository
import norm/sqlite
import prologue
import ../../utils/djangoDateTime/[djangoDateTimeType]
import ../allUrlParams
import ../../utils/[fileUpload]
import std/[strformat, options, os]

export sessionaudioModel

type SessionAudioDTO* = object
    sessionId*: Option[int64]
    sessionaudioFileName*: Option[string]
    audioDirectory*: string
    entryId*: Option[int64]


proc createSessionAudio*(connection: DbConn, requestParams: var SessionAudioDTO): Option[SessionAudioRead] =
    if requestParams.sessionaudioFileName.isNone() or requestParams.sessionId.isNone():
        return none(SessionAudioRead)
    
    let sessionId = requestParams.sessionId.get()
    let relativeFilePath = requestParams.sessionaudioFileName.get()
    
    let creationTime: DjangoDateTime = djangoDateTimeType.now()
    
    var newEntry = SessionAudio(
        audio_file: relativeFilePath,
        creation_datetime: creationTime,
        update_datetime: creationTime,
        session_id: sessionId,
    )
    
    try:
        let createdEntry = connection.createEntryInTransaction(newEntry)
        result = some(connection.getEntryById(createdEntry.id, SessionAudioRead))
    except Exception:
        deleteFile(relativeFilePath)
        raise

proc patchSessionAudio*(connection: DbConn, requestParams: var SessionAudioDTO, entry: var SessionAudio): SessionAudio =
    entry.update_datetime = djangoDateTimeType.now()

    var absoluteFilePath: string = ""
    if requestParams.sessionaudioFileName.isSome():
        raise newException(ValueError, "Updating an audio file is not implemented yet")
    
    if requestParams.sessionId.isSome():
        entry.session_id = requestParams.sessionId.get()
    
    try:
        result = connection.updateEntryInTransaction(entry)
    
    except Exception:
        if absoluteFilePath != "": deleteFile(absoluteFilePath)
        raise

proc getSessionAudioByParams*(connection: DbConn, requestParams: ReadSessionAudioByParams): SessionAudioRead =
    result = connection.getSessionAudio(requestParams.campaignName, requestParams.sessionNumber, requestParams.isMainSession)

proc getCampaignSessionAudio*(connection: DbConn, requestParams: ReadListParams): seq[SessionAudioRead] =
  result = connection.getSessionAudioForCampaign(requestParams.campaignName)
    
proc moveAudioFile*(tmpFilePath: string, targetFileName: string, audioDirectory: string): string =
  if not dirExists(audioDirectory):
    raise newException(FileNotFoundError, fmt"The media directory '{audioDirectory}' does not exist")
  
  if not fileExists(tmpFilePath):
    raise newException(FileNotFoundError, fmt"The temporary audio file '{tmpFilePath}' could not be found! This is a technical error, it must be in the temporary file directory!")

  var targetFilePath = buildUniqueFilepath(targetFileName, audioDirectory)
  moveFile(tmpFilePath, targetFilePath)  
  
  result = targetFilePath