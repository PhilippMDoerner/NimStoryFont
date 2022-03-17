import ../core/signalSystem
import std/[os, db_sqlite, strutils]
import imageModel
import imageUtils

proc deleteImageFile(connection: DbConn, modelInstance: Image) =
  ## Deletes an image file off the harddrive if the corresponding image entry
  ## in the database is deleted
  let imageFilepath: string = modelInstance.image
  if fileExists(imageFilepath):
    removeFile(imageFilepath)

connect(SignalType.stPostDelete, Image, deleteImageFile)



proc isWebPImage(imageFilepath: string): bool = imageFilepath.endsWith(".webp")
proc convertReceivedImageToWebP(connection: DbConn, modelInstance: Image) =
  let imageFilepath: string = modelInstance.image
  if isWebPImage(imageFilepath): #No conversion necessary
    return

  let convertedImageFilepath = convertToWebP(imageFilepath)
  modelInstance.image = convertedImageFilepath

#connect(SignalType.stPreCreate, Image, convertReceivedImageToWebP)
#connect(SignalType.stPreUpdate, Image, convertReceivedImageToWebP)