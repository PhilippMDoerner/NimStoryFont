import std/[strformat, strtabs, options, strutils, sequtils, asyncdispatch]
import smtp except Message
import prologue
import ../applicationSettings

type
  Message* = object
    msgTo: seq[Email]
    msgCc: seq[Email]
    msgBcc: seq[Email]
    msgFrom: seq[Email]
    msgReplyTo: seq[Email]
    msgSender: Email
    msgSubject: string
    msgOtherHeaders: StringTableRef
    msgBody: string

  Email* = object
    name: Option[string]
    address*: string

  MailAuthenticationError* = object of ReplyError

const NEW_LINE = "\c\L"

proc sender(msg: Message): Email =
  msg.msgSender

proc recipients(msg: Message): seq[Email] =
  ## Retrieves all recipients of the message, which are all recipients defined for to, cc and bcc
  return msg.msgTo & msg.msgCc & msg.msgBcc

proc containsNewline(str: string): bool =
  str.contains({'\c', '\L'})

proc containsNewline(xs: seq[string]): bool =
  for x in xs:
    if x.containsNewline():
      return true

proc createEmail*(address: string, name: string): Email =
  ## Creates a new email address
  ## 
  ## You need to make sure that `address` and `name` (if specified) do not contain any newline characters. 
  ## Failing to do so will raise `AssertionDefect`.
  doAssert(
    not address.containsNewline(), "'address' shouldn't contain any newline characters"
  )
  doAssert(
    not name.containsNewline(), "'name' shouldn't contain any newline characters"
  )

  result.address = address
  result.name = some(name)

proc createEmail*(address: string): Email =
  doAssert(
    not address.containsNewline(), "'address' shouldn't contain any newline characters"
  )

  result.address = address
  result.name = none(string)

proc toEmail(value: string | Email): Email =
  when typeof(value) is string:
    createEmail(value)
  else:
    value

proc createMessage*[T: Email | string](
    mSubject, mBody: string,
    sender: T,
    mTo: seq[T] = @[],
    mCc: seq[T] = @[],
    mBcc: seq[T] = @[],
    mReplyTo: seq[T] = @[],
    otherHeaders: openArray[tuple[name, value: string]] = @[],
): Message =
  ## Creates a new MIME compliant message.
  ##
  ## You need to make sure that `mSubject` does not contain any newline characters. 
  ## Failing to do so will raise `AssertionDefect`.
  doAssert(
    not mSubject.containsNewline(),
    "'mSubject' shouldn't contain any newline characters",
  )

  let senderMail = sender.toEmail()

  result.msgSubject = mSubject
  result.msgBody = mBody
  result.msgFrom = @[senderMail]
  result.msgTo = mTo.mapIt(toEmail(it))
  result.msgCc = mCc.mapIt(toEmail(it))
  result.msgBcc = mBcc.mapIt(toEmail(it))
  result.msgReplyTo = mReplyTo.mapIt(toEmail(it))
  result.msgSender = senderMail
  result.msgOtherHeaders = newStringTable()
  for n, v in items(otherHeaders):
    result.msgOtherHeaders[n] = v

proc `$`(email: Email): string =
  ## stringify for `Email`.
  if email.name.isSome():
    result = fmt""""{email.name.get()}" <{email.address}>"""
  else:
    result = email.address

proc toSmtpField(name: string, value: string): string =
  fmt"{name}: {value}{NEW_LINE}"

proc `$`(msg: Message): string =
  ## stringify for `Message`.
  result = ""
  let sender = $msg.msgSender
  result.add(toSmtpField("From", sender))
  if msg.msgTo.len() > 0:
    result.add(toSmtpField("To", msg.msgTo.join(", ")))
  if msg.msgReplyTo.len() > 0:
    result.add(toSmtpField("Reply-To", msg.msgReplyTo.join(", ")))
  if msg.msgCc.len() > 0:
    result.add(toSmtpField("Cc", msg.msgCc.join(", ")))
  if msg.msgBcc.len() > 0:
    result.add(toSmtpField("Bcc", msg.msgBcc.join(", ")))

  result.add(toSmtpField("Subject", msg.msgSubject))
  for key, value in pairs(msg.msgOtherHeaders):
    result.add(toSmtpField(key, value))

  result.add(NEW_LINE)
  result.add(msg.msgBody)

proc sendMail(smtp: Smtp | AsyncSmtp, msg: Message) {.multisync.} =
  let senderAddress = msg.sender().address
  let recipientAddresses = msg.recipients().mapIt(it.address)
  let msgBody = $msg
  await smtp.sendMail(senderAddress, recipientAddresses, msgBody)

proc connect(smtp: Smtp | AsyncSmtp, settings: Settings) {.async.} =
  let smtpServerName = settings.getSetting(SettingName.snSmtpName).getStr()
  let smtpPort: Port = Port settings.getSetting(SettingName.snSmtpPort).getInt()
  await smtp.connect(smtpServerName, smtpPort)

proc auth(smtp: Smtp | AsyncSmtp, settings: Settings) {.async.} =
  let emailUserName = settings.getSetting(SettingName.snEmailName).getStr()
  let emailPassword = settings.getSetting(SettingName.snEmailPassword).getStr()
  try:
    await smtp.auth(emailUserName, emailPassword)
  except ReplyError as e:
    raise newException(
      MailAuthenticationError, "Failed to authenticate for sending system mails", e
    )

proc adminEmail(settings: Settings): Email =
  let domain = settings.getSetting(SettingName.snEmailDomain).getStr()
  const adminName = "admin"
  let address = adminName & "@" & domain
  return createEmail(address, adminName)

proc sendSystemEmail*(
    subject: string, body: string, targets: seq[Email], settings: Settings
) {.async.} =
  let smtpConn = newAsyncSmtp()

  await smtpConn.connect(settings)
  await smtpConn.startTls()
  await smtpConn.auth(settings)

  let headers = @[("Content-Type", "text/html; charset=\"ISO-8859-1\";")]
  let msg =
    createMessage(subject, body, settings.adminEmail(), targets, otherHeaders = headers)

  await smtpConn.sendMail(msg)

proc sendSystemEmail*(
    subject: string, body: string, target: Email, settings: Settings
) {.async.} =
  await sendSystemEmail(subject, body, @[target], settings)
