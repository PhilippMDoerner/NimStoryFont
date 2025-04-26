import std/strutils
import ./authenticationModels

type EmailPlaceholder = enum
  epPassword = "{PASSWORD_PLACEHOLDER}"
  epUsername = "{USERNAME}"
  epDomain = "{DOMAIN}"
  epToken = "{TOKEN}"
  epWorkflow = "{WORKFLOW}"
  epUserId = "{USER_ID}"

const REQUEST_PASSWORD_RESET_SUBJECT = "Your password on {DOMAIN}"
const REQUEST_PASSWORD_RESET_BODY = """
<p>Hey {USERNAME},</p>

<p>
  You requested to reset the password for your account on {DOMAIN} just now.
</p>
<p>If you want reset your password, click the button below.</p>
<p>If you do not want to reset your password, ignore this email.</p>
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
    href="https://{DOMAIN}/wiki1/api/mail/reset/confirm?token={TOKEN}&workflow={WORKFLOW}&user={USER_ID}"
  >
    Reset Password
  </a>
</p>
"""

const PASSWORD_RESET_SUBJECT = "{USERNAME}, your password on {DOMAIN} was reset!"
const PASSWORD_RESET_BODY = """
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

proc getPasswordResetConfirmationRequestEmail*(domain: string, username: string, userId: int64, token: string): tuple[subject: string, body: string] =
  result.subject = REQUEST_PASSWORD_RESET_SUBJECT
    .fillPlaceholder(EmailPlaceholder.epDomain, domain)
    
  result.body = REQUEST_PASSWORD_RESET_BODY
    .fillPlaceholder(EmailPlaceholder.epUsername, username)
    .fillPlaceholder(EmailPlaceholder.epDomain, domain)
    .fillPlaceholder(EmailPlaceholder.epToken, token)
    .fillPlaceholder(EmailPlaceholder.epWorkflow, $WorkflowType.wtPASSWORD_RESET)
    .fillPlaceholder(EmailPlaceholder.epUserId, $userId)

proc getPasswordResetMail*(newPassword: string, username: string, domain: string): tuple[subject: string, body: string] = 
  result.subject = PASSWORD_RESET_SUBJECT
    .fillPlaceholder(EmailPlaceholder.epUsername, username)
    .fillPlaceholder(EmailPlaceholder.epDomain, domain)

  result.body = PASSWORD_RESET_BODY
    .fillPlaceholder(EmailPlaceholder.epPassword, newPassword)
    .fillPlaceholder(EmailPlaceholder.epDomain, domain)
