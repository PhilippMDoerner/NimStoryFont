import std/strutils

type EmailPlaceholder = enum
  epPassword = "{PASSWORD_PLACEHOLDER}"
  epUsername = "{USERNAME}"

const PASSWORD_RESET_SUBJECT* = "{USERNAME}, your password on nimstoryfont was reset!"
const PASSWORD_RESET_BODY* = "Password reset was carried out as requested.<br> Your new password is: {PASSWORD_PLACEHOLDER}. Please swap it out as soon as possible. <br><br> Click <a href='https://wwww.aldrune.com/wiki2'> here </a> to get to the login page"

proc fillPlaceholder(coreString: string, placeholder: EmailPlaceholder, value: string): string =
  result = coreString.replace($placeholder, value)

proc getPasswordResetMailSubject*(username: string): string = 
  result = PASSWORD_RESET_SUBJECT.fillPlaceholder(EmailPlaceholder.epUsername, username)

proc getPasswordResetMailBody*(password: string): string =
  result = PASSWORD_RESET_BODY.fillPlaceholder(EmailPlaceholder.epPassword, password)
