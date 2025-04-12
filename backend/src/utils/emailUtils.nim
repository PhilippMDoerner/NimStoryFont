import smtp
import prologue
import ../applicationSettings

type EmailDTO* = object
  subject*: string
  body*: string
  target*: seq[string]
  cc*: seq[string]
  bcc*: seq[string]

type MailAuthenticationError* = object of ReplyError

proc sendSystemEmail*(subject: string, body: string, target: string, settings: Settings) {.async.} =  

  let smtpConn = newAsyncSmtp()
  let smtpServerName = settings.getSetting(SettingName.snSmtpName).getStr()
  let smtpPort: Port = Port settings.getSetting(SettingName.snSmtpPort).getInt()
  await smtpConn.connect(smtpServerName, smtpPort)
  
  await smtpConn.startTls()

  let emailUserName = settings.getSetting(SettingName.snEmailName).getStr()
  let emailPassword = settings.getSetting(SettingName.snEmailPassword).getStr()

  try:
    await smtpConn.auth(emailUserName, emailPassword)
  except ReplyError as e:
    raise newException(MailAuthenticationError, "Failed to authenticate for sending system mails", e)
  
  var msg = createMessage(subject, body, @[target])
  await smtpConn.sendMail(emailUserName, @[target], $msg)