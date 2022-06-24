import ../core/signalSystem
import ../../applicationSettings
import ../../utils/fileUpload
import std/[json]
import norm/sqlite
import sessionaudioModel
import prologue

proc deleteSessionAudioFile(connection: DbConn, modelInstance: SessionAudio) =
  ## Deletes an sessionAudio file off the harddrive if the corresponding sessionAudio entry
  ## in the database is deleted
  let sessionAudioFilepath: string = modelInstance.audio_file
  let mediaDirectory: string = settings["audioDir"].getStr()
  deleteFile(sessionAudioFilepath, mediaDirectory)

connect(SignalType.stPreDelete, SessionAudio, deleteSessionAudioFile)
connect(SignalType.stPostUpdate, SessionAudio, deleteSessionAudioFile)
