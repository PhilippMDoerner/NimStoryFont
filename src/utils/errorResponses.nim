import prologue

proc get401UnauthorizedResponse*(ctx: Context): Response {.inline.} =
    result = jsonResponse(%*"The given token is not, or no longer, valid", Http401)

proc get400BadRequestResponse*(errorMsg: string): Response {.inline.}  =
    let responseText = "Something around the given data was invalid: " & errorMsg
    result = jsonResponse(%*responseText, Http400)

proc get403ForbiddenResponse*(): Response {.inline.} =
    result = jsonResponse(%*"You lack access rights for the requested action", Http403)

proc get404NotFoundResponse*(): Response {.inline.} =
    result = jsonResponse(%*"We couldn't find the requested resource", Http404)

proc get500ServerErrorResponse*(): Response {.inline.} =
    result = jsonResponse(%*"There was an issue with the request you made", Http500)