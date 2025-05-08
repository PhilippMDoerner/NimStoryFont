import std/[json, logging]
import norm/sqlite
import authentication/authenticationUtils
import ../utils/errorResponses
import ../database

template debugErrorLog*(msg: string) =
  debug(
    msg & " : ",
    getCurrentException().name,
    getCurrentExceptionMsg(),
    getCurrentException().getStackTraceEntries(),
  )

template respondOnError*(body: untyped) =
  ## template to handle some usual error cases. Returns HTTP400
  ## in case of any DBError, any HTTP404 in case of any NotFoundError
  try:
    body
  except DuplicateEntryError:
    debugErrorLog("Tried to create existing entry")
    resp get400BadRequestResponse("Tried to create existing entry")
  except DbError:
    debugErrorLog("Error during db request")
    resp get400BadRequestResponse(getCurrentExceptionMsg())
  except NotFoundError: #grep -Hnr "NotFoundError" ~/.nimble/pkgs
    debugErrorLog("Requested entry could not be found")
    resp get404NotFoundResponse()
  except UnauthorizedError:
    debugErrorLog("User could not be authorized")
    resp get401UnauthorizedResponse()
  except CampaignPermissionError:
    debugErrorLog("User does not have the necessary permission for this campaign")
    resp get403ForbiddenResponse()
  except JsonParsingError:
    debugErrorLog("Error during parsing of input")
    resp get400BadRequestResponse(getCurrentExceptionMsg())
  except CatchableError:
    debugErrorLog("Unkonwn Error during db request")
    resp get500ServerErrorResponse()
