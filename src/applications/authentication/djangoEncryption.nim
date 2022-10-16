import std/[base64, strutils]

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
from std/openssl import DLLSSLName, EVP_MD, EVP_sha256, EVP_MD_size, DLLUtilName


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

proc EVP_MD_size_fixed*(md: EVP_MD): cint {.cdecl, dynlib: DLLUtilName, importc: "EVP_MD_size".}
proc EVP_sha256_fixed*(): EVP_MD    {.cdecl, dynlib: DLLUtilName, importc: "EVP_sha256".}

proc opensslCalculateSHA256Pbkdf2Hash(password: string, salt: string, iterations: int, secretKey: string): string {.gcsafe.} =
  if iterations > cint.high: raise newException(ValueError, "iterations too high")
  let
    digest: EVP_MD = EVP_sha256_fixed()
    keylen: cint = EVP_MD_size_fixed(digest)
    output = newString(keylen)

    retVal = PKCS5_PBKDF2_HMAC(
      password.cstring,
      -1,
      salt.cstring,
      len(salt).cint,
      iterations.cint,
      digest,
      keylen,
      output[0].addr
    )

  doAssert retVal == 1
  result = encode(output)

### pbkdf2 usage
proc calcPasswordHash*(password: string, salt: string, iterations: int, secretKey: string): string =
  opensslCalculateSHA256Pbkdf2Hash(password, salt, iterations, secretKey)

proc isValidPassword*(password: string, databaseHash: string, secretKey: string): bool =
  let storedPasswordPieces: seq[string] = databaseHash.split('$')
  let iterations: int = parseInt(storedPasswordPieces[1])
  let salt: string = storedPasswordPieces[2]
  let dbHash: string = storedPasswordPieces[3]

  let incomingHash: string = calcPasswordHash(password, salt, iterations, secretKey)
  result = dbHash == incomingHash