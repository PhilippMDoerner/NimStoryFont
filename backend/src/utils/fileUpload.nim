import prologue
import std/[os, random, strformat]

type FileNotFoundError* = object of IOError
type FileAlreadyExists* = object of IOError


proc randomString(length: int): string =
    for _ in 0..length:
        add(result, char(rand(int('A') .. int('z'))))

proc renameFile(fileName: string): string =
  let (_, name, extension) = fileName.splitFile()
  result = fmt "{name}_{randomString(10)}{extension}"

proc saveFile*(file: var UploadFile, uploadDirectory: string): string =
  if not dirExists(uploadDirectory):
    raise newException(FileNotFoundError, fmt "The directory '{uploadDirectory}' does not exist")
  
  var filePath = fmt "{uploadDirectory}/{file.filename}"
  while fileExists(filePath):
    file.filename = file.filename.renameFile()
    filePath = fmt "{uploadDirectory}/{file.filename}" 
  
  try:
    file.save(uploadDirectory)
  except IOError as e:
    raise newException(IOError, fmt"Error saving file '{file.filename}' to '{uploadDirectory}':", e)
  
  result = filePath
  
proc buildUniqueFilepath*(startFileName: string, targetDirectory: string): string =
  ## Simply manipulates the filename over and over until a path is found that has no existing file
  var filePath = fmt "{targetDirectory}/{startFileName}"
  var fileName = startFileName
  const maxRenameAttempts = 10

  for i in 0..maxRenameAttempts:
    if not fileExists(filePath): 
      return filePath
    else:
      fileName = fileName.renameFile()
      filePath = fmt "{targetDirectory}/{fileName}" 
  
  raise newException(ValueError, fmt"Was unable to build a unqiue filepath for '{startFileName}' in '{targetDirectory}' within {maxRenameAttempts} attempts!")
 

proc deleteFile*(absoluteFilePath: string) =
  if fileExists(absoluteFilePath):
    removeFile(absoluteFilePath)

proc deleteFile*(relativeFilePath: string, containingDirectory: string) = deleteFile(fmt"{containingDirectory}/{relativeFilePath}")

proc getRelativeFilepathTo*(absoluteFilepath: string, containingDirectory: string): string =
  result = absoluteFilepath.substr(containingDirectory.len + 1)