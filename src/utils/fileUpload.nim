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

proc uploadFile(file: var UpLoadFile, uploadDirectory: string): string =
  if not dirExists(uploadDirectory):
    raise newException(FileNotFoundError, fmt "The article image directory '{uploadDirectory}' does not exist")
  
  var filePath = fmt "{uploadDirectory}/{file.filename}"
  if fileExists(filePath):
    file.renameFile()
    filePath = fmt "{uploadDirectory}/{file.filename}" # TODO: Contemplate turning this into a while loop

  file.save(uploadDirectory)
  
  result = filePath

proc saveArticleImage*(file: var UpLoadFile, mediaDirectory: string): string =
  let articleImageDirectory = fmt "{mediaDirectory}/article_images"
  uploadFile(file, articleImageDirectory)

proc deleteArticleImage*(absoluteFilePath: string) =
  if fileExists(absoluteFilePath):
    removeFile(absoluteFilePath)

proc deleteArticleImage*(relativeFilePath: string, mediaDirectory: string) =
  deleteArticleImage(fmt"{mediaDirectory}/{relativeFilePath}")

proc uploadSessionAudio*(file: var UpLoadFile, mediaDirectory: string): string =
  let sessionaudioDirectory = fmt "{mediaDirectory}/session_audio" #TODO: Contemplate having this in a directory that can be configured separately
  uploadFile(file, sessionaudioDirectory)