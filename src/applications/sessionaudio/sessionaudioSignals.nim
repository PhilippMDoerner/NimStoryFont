import ../core/signalSystem
import ../../applicationSettings
import ../../utils/fileUpload
import std/[json, strformat]
import norm/sqlite
import sessionaudioModel
import prologue

proc deleteSessionAudioFile(connection: DbConn, modelInstance: SessionAudio) =
  ## Deletes an sessionAudio file off the harddrive if the corresponding sessionAudio entry
  ## in the database is deleted
  let sessionAudioFilepath: string = modelInstance.audio_file
  deleteFile(fmt"/{sessionAudioFilepath}")

connect(SignalType.stPreDelete, SessionAudio, deleteSessionAudioFile)
connect(SignalType.stPostUpdate, SessionAudio, deleteSessionAudioFile)
