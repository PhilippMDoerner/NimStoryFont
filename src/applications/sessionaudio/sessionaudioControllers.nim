import sessionaudioService
import sessionAudioSerialization
import prologue
import std/[strutils, options, json, strformat]
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import jsony
import ../authentication/authenticationUtils
import ../controllerTemplates
import ../allUrlParams
import ../../utils/djangoDateTime/[serialization]



proc extractFileFromContext(ctx: JWTContext, fileFieldName: string): Option[UpLoadFile] =
  let hasFile: bool = ctx.request.formParams.data.hasKey(fileFieldName)
  if hasFile:
      result = some(ctx.getUploadFile(fileFieldName))
  else:
      result = none(UpLoadFile)

proc createSessionAudioControlloer*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let campaignId: int64 = ctx.getFormParamsOption("campaign").get().parseInt().int64
    checkCreatePermission(ctx, campaignId)

    let sessionId: int64 = ctx.getFormParamsOption("session").get().parseInt().int64
    let audioDirectory: string = ctx.getSettings("audioDir").getStr()

    var sessionaudioFormData = SessionAudioDTO(
        sessionaudioFile: ctx.extractFileFromContext("audio_file"),
        audioDirectory: audioDirectory,
        sessionId: sessionId,
    )

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        let newEntry: Option[SessionAudioRead] = connection.createSessionAudio(sessionaudioFormData)
        if newEntry.isSome():
          let data = connection.serializeSessionAudioRead(newEntry.get())
          resp jsonyResponse(ctx, data)

        else:
          resp get400BadRequestResponse("The sent sessionaudio could not be saved, because there was no sessionaudio file in the sent form under the 'sessionaudio' key.")


# proc updateImageView*(ctx: Context) {.async, gcsafe.} =
#     let ctx = JWTContext(ctx)
#     let sessionaudioToUpdateId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))
#     let mediaDirectory: string = ctx.getSettings("mediaDir").getStr()

#     var sessionaudioFormData = ImageDTO(
#         sessionaudioFile: ctx.extractFileFromContext("sessionaudio"),
#         mediaDirectory: mediaDirectory,
#         sessionaudioName: ctx.getFormParamsOption("name")
#     )
        
#     respondBadRequestOnDbError():
#         let updatedImageEntry: Image = updateImageFileOrName(sessionaudioToUpdateId, sessionaudioFormData)
#         resp jsonyResponse[Image](ctx , updatedImageEntry)


# proc deleteImageView*(ctx: Context) {.async, gcsafe.} =
#     let ctx = JWTContext(ctx)
#     let sessionaudioToDeleteId: int64 = int64 parseInt(ctx.getPathParams(ID_PARAM))

#     respondBadRequestOnDbError():
#         deleteImage(sessionaudioToDeleteId)
#         respDefault(Http204)
