import std/[strutils, htmlparser, xmltree, algorithm]
import ../applicationConstants

proc reverseString*(s: string): string =
  for character in reversed(s):
    result.add(character)


proc truncate*(text: string): string =
  let cleanedString = text.parseHtml().innerText
  let splitString = cleanedString.split(" ")
  
  if splitString.len() <= SHORT_DESCRIPTION_WORD_COUNT:
    result = cleanedString
  else:
    result.add(splitString[0..SHORT_DESCRIPTION_WORD_COUNT-1].join(" "))
    result.add("...")