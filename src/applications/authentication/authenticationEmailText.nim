import std/strutils

type EmailPlaceholder = enum
  epPassword = "{PASSWORD_PLACEHOLDER}"

const PASSWORD_RESET_SUBJECT* = ""
const PASSWORD_RESET_BODY* = "{PASSWORD_PLACEHOLDER}"

proc fillPlaceholder(coreString: string, placeholder: EmailPlaceholder, value: string): string =
  result = coreString.replace($placeholder, value)

proc getPasswordResetMailSubject*(): string = PASSWORD_RESET_SUBJECT

proc getPasswordResetMailBody*(password: string): string =
  result = PASSWORD_RESET_BODY.fillPlaceholder(EmailPlaceholder.epPassword, password)
