import std/[options]
import ../genericArticleRepository
import norm/[model, sqlite]
import imageModel

proc updateImage*(connection: DbConn, imageToUpdate: var Image, newImageFilePath: Option[string], newImageName: Option[string]): Image =
    if newImageFilePath.isSome():
      imageToUpdate.image = newImageFilePath.get()

    if newImageName.isSome():
      imageToUpdate.name = newImageName
    
    result = connection.updateEntryInTransaction(imageToUpdate)