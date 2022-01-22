import prologue
import ../applicationSettings
import std/[os, random]

type FileNotFoundError* = object of IOError
type FileAlreadyExists* = object of IOError


proc randomString(length: int): string =
    for _ in 0..length:
        add(result, char(rand(int('A') .. int('z'))))


proc uploadArticleImage*(file: var UpLoadFile): string =
  let articleImageDirectory = MEDIA_ROOT & "/article_images"
  if not dirExists(articleImageDirectory):
    raise newException(FileNotFoundError, "The article image directory '" & articleImageDirectory & "' does not exist")
  
  var filePath = articleImageDirectory & '/' & file.filename
  if fileExists(filePath):
    let (directory, name, extension) = file.filename.splitFile()
    let newFileName = name & '_' & randomString(10) & extension
    file.filename = newFileName
    filePath = articleImageDirectory & '/' & newFileName

  file.save(articleImageDirectory)
  
  result = filePath