import ../core/signalSystem
import ../../applicationSettings
import ../../utils/fileUpload
import std/[json]
import norm/sqlite
import imageModel
import prologue

proc deleteImageFile(connection: DbConn, modelInstance: var Image) =
  ## Deletes an image file off the harddrive if the corresponding image entry
  ## in the database is deleted
  let imageFilepath: string = modelInstance.image
  let mediaDirectory: string = settings["imageDir"].getStr()
  deleteFile(imageFilepath, mediaDirectory)

proc connectImageSignals*() =
  connect(SignalType.stPreDelete, Image, deleteImageFile)
