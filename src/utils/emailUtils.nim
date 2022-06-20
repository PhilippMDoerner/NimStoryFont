import std/smtp
import prologue
import ../applicationSettings

type EmailDTO* = object
  subject*: string
  body*: string
  target*: seq[string]
  cc*: seq[string]
  bcc*: seq[string]



proc sendSystemEmail*(subject: string, body: string, target: string, settings: Settings) =
  var msg = createMessage(subject, body, @[target])
  let smtpConn = newSmtp(useSsl = true, debug=true)
  
  let smtpServerName = settings.getSetting(SettingName.snSmtpName).getStr()
  let smtpPort: Port = Port settings.getSetting(SettingName.snSmtpPort).getInt()
  smtpConn.connect(smtpServerName, Port 465)

  let emailUserName = settings.getSetting(SettingName.snEmailName).getStr()
  let emailPassword = settings.getSetting(SettingName.snEmailPassword).getStr()
  smtpConn.auth(emailUserName, emailPassword)

  smtpConn.sendmail(emailUserName, @[target], $msg)