import prologue
import std/[os, random, strformat]

type FileNotFoundError* = object of IOError
type FileAlreadyExists* = object of IOError


proc randomString(length: int): string =
    for _ in 0..length:
        add(result, char(rand(int('A') .. int('z'))))

proc renameFile(file: var UpLoadFile) =
  let (directory, name, extension) = file.filename.splitFile()
  let newFileName = fmt "{name}_{randomString(10)}{extension}"
  file.filename = newFileName

proc saveFile*(file: var UpLoadFile, uploadDirectory: string): string =
  if not dirExists(uploadDirectory):
    raise newException(FileNotFoundError, fmt "The media directory '{uploadDirectory}' does not exist")
  
  var filePath = fmt "{uploadDirectory}/{file.filename}"
  while fileExists(filePath):
    file.renameFile()
    filePath = fmt "{uploadDirectory}/{file.filename}" # TODO: Contemplate turning this into a while loop

  file.save(uploadDirectory)
  
  result = filePath

proc deleteFile*(absoluteFilePath: string) =
  if fileExists(absoluteFilePath):
    removeFile(absoluteFilePath)

proc deleteFile*(relativeFilePath: string, mediaDirectory: string) = deleteFile(fmt"{mediaDirectory}/{relativeFilePath}")

proc getRelativeFilepathTo*(absoluteFilepath: string, mediaDirectory: string): string =
  result = absoluteFilepath.substr(mediaDirectory.len + 1)