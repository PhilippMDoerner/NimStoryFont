import ../core/signalSystem
import ../../applicationSettings
import ../../utils/fileUpload
import std/[os, json, strformat]
import norm/sqlite
import sessionaudioModel
import prologue

proc deleteSessionAudioFile(connection: DbConn, modelInstance: SessionAudio) =
  ## Deletes an sessionAudio file off the harddrive if the corresponding sessionAudio entry
  ## in the database is deleted
  let sessionAudioFilepath: string = modelInstance.audio_file
  let mediaDirectory: string = settings["audioDir"].getStr()
  echo fmt"Audio File Deleting {sessionAudioFilepath} from {mediaDirectory}"
  deleteFile(sessionAudioFilepath, mediaDirectory)

connect(SignalType.stPreDelete, SessionAudio, deleteSessionAudioFile)
connect(SignalType.stPostUpdate, SessionAudio, deleteSessionAudioFile)