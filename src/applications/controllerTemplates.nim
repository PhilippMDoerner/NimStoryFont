import ../utils/errorResponses
import std/[logging, strformat]
import norm/sqlite

template respondBadRequestOnDbError*(body: untyped) =
  ## template to handle some usual error cases. Returns HTTP400
  ## in case of any DBError, any HTTP404 in case of any NotFoundError
  try:
      body

  except DbError:
    resp get400BadRequestResponse(getCurrentExceptionMsg())

  except NotFoundError: #grep -Hnr "NotFoundError" ~/.nimble/pkgs
    resp get404NotFoundResponse()

  except Exception:
    log(lvlError, fmt "Error of type '{getCurrentException().name}': {getCurrentExceptionMsg()}") 
    raise