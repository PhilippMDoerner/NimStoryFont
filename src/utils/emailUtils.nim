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

  let smtpConn = newSmtp()
  let smtpServerName = settings.getSetting(SettingName.snSmtpName).getStr()
  let smtpPort: Port = Port settings.getSetting(SettingName.snSmtpPort).getInt()
  smtpConn.connect(smtpServerName, smtpPort)
  
  smtpConn.startTls()

  let emailUserName = settings.getSetting(SettingName.snEmailName).getStr()
  let emailPassword = settings.getSetting(SettingName.snEmailPassword).getStr()
  smtpConn.auth(emailUserName, emailPassword)

  var msg = createMessage(subject, body, @[target])
  smtpConn.sendmail(emailUserName, @[target], $msg)