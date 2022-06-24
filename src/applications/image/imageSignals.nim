import ../core/signalSystem
import ../../applicationSettings
import ../../utils/fileUpload
import std/[db_sqlite, json]
import imageModel
import prologue

proc deleteImageFile(connection: DbConn, modelInstance: Image) =
  ## Deletes an image file off the harddrive if the corresponding image entry
  ## in the database is deleted
  let imageFilepath: string = modelInstance.image
  let mediaDirectory: string = settings["imageDir"].getStr()
  deleteFile(imageFilepath, mediaDirectory)

connect(SignalType.stPreDelete, Image, deleteImageFile)


#TODO: Finish webp conversion
# proc isWebPImage(imageFilepath: string): bool = imageFilepath.endsWith(".webp")
# proc convertReceivedImageToWebP(connection: DbConn, modelInstance: Image) =
#   let imageFilepath: string = modelInstance.image
#   if isWebPImage(imageFilepath): #No conversion necessary
#     return

#   let convertedImageFilepath = convertToWebP(imageFilepath)
#   modelInstance.image = convertedImageFilepath

#connect(SignalType.stPreCreate, Image, convertReceivedImageToWebP)
#connect(SignalType.stPreUpdate, Image, convertReceivedImageToWebP)