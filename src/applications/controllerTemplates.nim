import ../utils/errorResponses
import norm/sqlite
import std/logging

template respondBadRequestOnDbError*(body: untyped) =
  ## template to handle some usual error cases. Returns HTTP400
  ## in case of any DBError, any HTTP404 in case of any NotFoundError
  try:
      body

  except DbError:
    debug("Error during db request ", getCurrentException().name, getCurrentExceptionMsg(), getStackTraceEntries()) 
    resp get400BadRequestResponse(getCurrentExceptionMsg())

  except NotFoundError: #grep -Hnr "NotFoundError" ~/.nimble/pkgs
    debug("Error during db request ", getCurrentException().name, getCurrentExceptionMsg(), getStackTraceEntries()) 
    resp get404NotFoundResponse() 

  except Exception:
    debug("Error during db request ", getCurrentException().name, getCurrentExceptionMsg(), getStackTraceEntries()) 
