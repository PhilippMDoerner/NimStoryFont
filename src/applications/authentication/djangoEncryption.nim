import nimcrypto
import nimcrypto/pbkdf2
import std/[base64, strutils,]

### nimcrypto based pbkdf2
proc calculate_SHA256_pbkdf2_hash(password: string, salt: string, iterations: int, secretKey: string): string =
  var hctx: HMAC[sha256]
  hctx.init(secretKey)

  var output: array[32, byte] # Stores the actual hash somehow that you need to encode in b64 ?
  discard pbkdf2(hctx, password, salt, iterations, output)
  
  let base64Hash = encode(output)
  result = base64Hash


### python based pbkdf2 
import nimpy

proc python_calculate_SHA256_pbkdf2_hash(password: string, salt: string, iterations: int, secretKey: string): string {.gcsafe.} =
    let hashlib = pyImport("hashlib")
    let pyBase64 = pyImport("base64")
    let djangoEncodingUtils = pyImport("django.utils.encoding")

    let password = djangoEncodingUtils.force_bytes(password)
    let salt = djangoEncodingUtils.force_bytes(salt)
    let hash = hashlib.pbkdf2_hmac("sha256", password, salt, iterations)
    let string_hash = pyBase64.b64encode(hash).decode("ascii").strip()
    return $string_hash


### pbkdf2 usage
proc calcPasswordHash*(password: string, salt: string, iterations: int, secretKey: string): string =
  python_calculate_SHA256_pbkdf2_hash(password, salt, iterations, secretKey)

proc isValidPassword*(password: string, databaseHash: string, secretKey: string): bool =
  let storedPasswordPieces: seq[string] = databaseHash.split('$')
  let iterations: int = parseInt(storedPasswordPieces[1])
  let salt: string = storedPasswordPieces[2]
  let dbHash: string = storedPasswordPieces[3]

  let incomingHash: string = calcPasswordHash(password, salt, iterations, secretKey)
  result = dbHash == incomingHash