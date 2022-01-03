import ../../utils/errorResponses

template respondBadRequestOnDbError*(body: untyped) =
    try:
        body
    except DbError:
        resp get400BadRequestResponse(getCurrentExceptionMsg())
