import sessionaudioService
import sessionAudioSerialization
import sessionaudioUtils
import prologue
import std/[strutils, options, json, strformat]
import ../../utils/[jwtContext, customResponses, errorResponses, databaseUtils]
import jsony
import ../authentication/authenticationUtils
import ../controllerTemplates
import ../../utils/djangoDateTime/[djangoDateTimeType, serialization]
import ../genericArticleRepository


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
        sessionId: some(sessionId),
        entryId: none(int64)
    )

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        let newEntry: Option[SessionAudioRead] = connection.createSessionAudio(sessionaudioFormData)
        if newEntry.isSome():
          let data = connection.serializeSessionAudioRead(newEntry.get())
          resp jsonyResponse(ctx, data)

        else:
          resp get400BadRequestResponse("The sent sessionaudio could not be saved, because there was no sessionaudio file in the sent form under the 'sessionaudio' key.")

type PatchSessionOfAudio* = object
  session: int64
  pk: int64
  update_datetime: DjangoDateTime

proc parseJSONPatchBody(ctx: JWTContext): SessionAudioDTO =
  let parsedBody = ctx.request.body().fromJson(PatchSessionOfAudio)
  let newSessionId: int64 = parsedBody.session

  result = SessionAudioDTO(
      sessionaudioFile: none(UpLoadFile),
      audioDirectory: ctx.getSettings("audioDir").getStr(),
      sessionId: some(newSessionId),
      entryId: some(parsedBody.pk)
  )

proc parseFormPatchBody(ctx: JWTContext): SessionAudioDTO =
  let sessionId: int64 = ctx.getFormParamsOption("session").get().parseInt().int64
  let entryId: int64 = ctx.getFormParamsOption("sessionaudio").get().parseInt().int64
  
  result = SessionAudioDTO(
      sessionaudioFile: ctx.extractFileFromContext("audio_file"),
      audioDirectory: ctx.getSettings("audioDir").getStr(),
      sessionId: some(sessionId),
      entryId: some(entryId)
  )

proc patchSessionAudioController*(ctx: Context) {.async, gcsafe.}=
    let ctx = JWTContext(ctx)

    let isFormRequest = ctx.extractFileFromContext("audio_file").isSome()
    var sessionaudioUpdateParams = if isFormRequest: ctx.parseFormPatchBody() else: ctx.parseJSONPatchBody()

    respondBadRequestOnDbError():
      withDbTransaction(connection):
        var oldEntry: SessionAudio = connection.getEntryById(sessionaudioUpdateParams.entryId.get(), SessionAudio)
        checkUpdatePermission(ctx, oldEntry)

        let updatedEntry = connection.patchSessionAudio(sessionaudioUpdateParams, oldEntry)
        let data = connection.serializeSessionAudio(updatedEntry)
        resp jsonyResponse(ctx, data)