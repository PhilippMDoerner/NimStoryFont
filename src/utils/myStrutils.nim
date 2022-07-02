import std/[strutils, htmlparser, xmltree, algorithm, random, enumerate]
import ../applicationConstants

proc reverseString*(s: string): string =
  for character in reversed(s):
    result.add(character)


proc truncate*(text: string): string =
  let cleanedString = text.parseHtml().innerText

  for i, str in enumerate(cleanedString.split(" ")):
    result.add(" " & str)
    if i >= SHORT_DESCRIPTION_WORD_COUNT:
      result.add("...")
      break

proc randomString*(length: int): string =
  for _ in 0..length:
    add(result, char(rand(int('A') .. int('z'))))

