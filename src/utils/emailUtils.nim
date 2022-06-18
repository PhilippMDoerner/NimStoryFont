import std/smtp
import prologue

type EmailDTO* = object
  subject*: string
  body*: string
  target*: seq[string]
  cc*: seq[string]
  bcc*: seq[string]



proc sendSystemEmail*(subject: string, body: string, target: string, settings: Settings) =
  var msg = createMessage(subject, body, @[target])
  let smtpConn = newSmtp(useSsl = true, debug=true)
  
  let smtpServerName = settings.getOrDefault("smtp").getStr()
  smtpConn.connect(smtpServerName, Port 465)

  let emailUserName = settings.getOrDefault("emailName").getStr()
  let emailPassword = settings.getOrDefault("emailPassword").getStr()
  smtpConn.auth(emailUserName, emailPassword)

  smtpConn.sendmail(emailUserName, @[target], $msg)