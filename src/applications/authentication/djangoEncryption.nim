from std/openssl import DLLSSLName, EVP_MD, EVP_sha256, DLLUtilName
import std/[strformat, strutils, base64]

### nimcrypto based pbkdf2
# import nimcrypto
# import nimcrypto/pbkdf2
# proc calculate_SHA256_pbkdf2_hash(password: string, salt: string, iterations: int, secretKey: string): string =
#   var hctx: HMAC[sha256]
#   hctx.init(secretKey)

#   var output: array[32, byte] # Stores the actual hash somehow that you need to encode in b64 ?
#   discard pbkdf2(hctx, password, salt, iterations, output)
  
#   let base64Hash = encode(output)
#   result = base64Hash


### python based pbkdf2 
## IF YOU ENABLE THIS, YOU MUST ADJUST THE DOCKERFILE TO INSTALL `python3 py-pip` AND RUN `RUN pip install django`
# import nimpy

# proc python_calculate_SHA256_pbkdf2_hash(password: string, salt: string, iterations: int, secretKey: string): string {.gcsafe.} =
#     let hashlib = pyImport("hashlib")
#     let pyBase64 = pyImport("base64")
#     let djangoEncodingUtils = pyImport("django.utils.encoding")

#     let password = djangoEncodingUtils.force_bytes(password)
#     let salt = djangoEncodingUtils.force_bytes(salt)
#     let hash = hashlib.pbkdf2_hmac("sha256", password, salt, iterations)
#     let string_hash = pyBase64.b64encode(hash).decode("ascii").strip()
#     return $string_hash

### C openssl based pbkdf2


# Must be imported this way as EVP_MD_get_size is not available in std/openssl. It only has EVP_MD_size, which has been renamed into EVP_MD_get_size
proc EVP_MD_size_fixed*(md: EVP_MD): cint {.cdecl, dynlib: DLLUtilName, importc: "EVP_MD_size".}

proc PKCS5_PBKDF2_HMAC(
  pass: cstring,
  passLen: cint,
  salt: cstring,
  saltLen: cint,
  iter: cint,
  digest: EVP_MD,
  keylen: cint,
  output: cstring
): cint {.cdecl, dynlib: DLLSSLName, importc: "PKCS5_PBKDF2_HMAC".}

proc opensslCalculateSHA256Pbkdf2Hash(password: string, salt: string, iterations: int): string {.gcsafe.} =
  let hasTooManyIterations = iterations > cint.high
  if hasTooManyIterations: 
    raise newException(ValueError, fmt"You can not have more iterations than a c integer can carry. Choose a number below {cint.high}")

  let digest: EVP_MD = EVP_sha256()
  let hashLength: cint = EVP_MD_size_fixed(digest)
  let output = newString(hashLength)
  let outputStartingpoint: cstring = cast[cstring](output[0].addr)

  let hashOperationReturnCode = PKCS5_PBKDF2_HMAC(
      password.cstring,
      -1,
      salt.cstring,
      len(salt).cint,
      iterations.cint,
      digest,
      hashLength,
      outputStartingpoint
    )
  
  let wasHashSuccessful = hashOperationReturnCode == 1
  doAssert wasHashSuccessful

  result = encode(output)

### pbkdf2 usage
proc calcPasswordHash*(password: string, salt: string, iterations: int): string =
  result = opensslCalculateSHA256Pbkdf2Hash(password, salt, iterations)

proc isValidPassword*(password: string, databaseHash: string): bool =
  let storedPasswordPieces: seq[string] = databaseHash.split('$')
  let iterations: int = parseInt(storedPasswordPieces[1])
  let salt: string = storedPasswordPieces[2]
  let dbHash: string = storedPasswordPieces[3]
  let incomingHash: string = calcPasswordHash(password, salt, iterations)
  result = dbHash == incomingHash