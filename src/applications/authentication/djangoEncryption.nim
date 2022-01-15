import nimcrypto
import nimcrypto/pbkdf2
import std/[base64, strutils]
import ../../applicationSettings


proc calculate_SHA256_pbkdf2_hash(password: string, salt: string, iterations: int): string =
  var hctx: HMAC[sha256]
  hctx.init(SECRET_KEY)

  var output: array[32, byte] # Stores the actual hash somehow that you need to encode in b64 ?
  discard pbkdf2(hctx, password, salt, iterations, output)
  
  let base64Hash = encode(output)
  result = base64Hash


proc isValidPassword*(password: string, databaseHash: string): bool =
  let storedPasswordPieces: seq[string] = databaseHash.split('$')
  let iterations: int = parseInt(storedPasswordPieces[1])
  let salt: string = storedPasswordPieces[2]
  let dbHash: string = storedPasswordPieces[3]

  let incomingHash: string = calculate_SHA256_pbkdf2_hash(password, salt, iterations)
  result = dbHash == incomingHash