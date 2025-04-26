import std/strutils

type EmailPlaceholder = enum
  epPassword = "{PASSWORD_PLACEHOLDER}"
  epUsername = "{USERNAME}"
  epDomain = "{DOMAIN}"

const PASSWORD_RESET_SUBJECT* = "{USERNAME}, your password on {DOMAIN} was reset!"
const PASSWORD_RESET_BODY* = """
<p>
  Password reset was carried out as requested. <br />
  Your new password is:
</p>
<div>{PASSWORD_PLACEHOLDER}</div>
<p>Please swap it out as soon as possible.</p>
<p>
  <a
    style="
      display: block;
      padding: 0.5rem 1rem;
      text-align: center;
      text-decoration: none;
      background-color: rgb(56, 73, 90);
      color: white;
      max-width: 200px;
      border-radius: 7px;
    "
    href="https://{DOMAIN}"
  >
    Login
  </a>
</p>
"""

proc fillPlaceholder(coreString: string, placeholder: EmailPlaceholder, value: string): string =
  result = coreString.replace($placeholder, value)

proc getPasswordResetMailSubject*(username: string, domain: string): string = 
  result = PASSWORD_RESET_SUBJECT
    .fillPlaceholder(EmailPlaceholder.epUsername, username)
    .fillPlaceholder(EmailPlaceholder.epDomain, domain)

proc getPasswordResetMailBody*(password: string, domain: string): string =
  result = PASSWORD_RESET_BODY
    .fillPlaceholder(EmailPlaceholder.epPassword, password)
    .fillPlaceholder(EmailPlaceholder.epDomain, domain)
