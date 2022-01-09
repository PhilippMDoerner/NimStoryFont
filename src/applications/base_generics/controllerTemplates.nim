import ../../utils/errorResponses
import std/typetraits
import norm/sqlite

template respondBadRequestOnDbError*(body: untyped) =
    try:
        body

    except DbError:
        resp get400BadRequestResponse(getCurrentExceptionMsg())
    
    except NotFoundError: #grep -Hnr "NotFoundError" ~/.nimble/pkgs
        resp get404NotFoundResponse()

    except CatchableError as e:
        echo "Error of type '" & $e.name & "'"
        raise e