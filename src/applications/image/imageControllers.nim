import imageRepository
import imageModel
import prologue
import std/[strutils]
import ../../utils/[jwtContext, customResponses, errorResponses, fileUpload]
import jsony
import ../controllerTemplates
import ../../applicationConstants


proc createImageView*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)
    
    respondBadRequestOnDbError():
        let newImageEntry: Image = createImage(ctx)
        resp jsonyResponse[Image](ctx, newImageEntry)

