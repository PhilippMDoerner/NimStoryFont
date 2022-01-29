import std/algorithm

proc reverseString*(s: string): string =
  for character in reversed(s):
    result.add(character)
