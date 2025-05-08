import prologue except Session
import ./quoteModel
import ../session/sessionModel
import ../genericArticleRepository
import ../authentication/authenticationUtils
import ../allUrlParams
import ../../utils/jwtContext

proc campaign_id*(entry: Quote): int64 =
  result = getEntryById(entry.session_id, Session).campaign_id

proc campaign_id*(entry: QuoteRead): int64 =
  result = entry.session_id.campaign_id.id

proc campaign_id*(entry: QuoteConnection): int64 =
  result = getEntryById(entry.quote_id, QuoteRead).campaign_id()

proc checkQuoteListPermission*(ctx: JWTContext, entries: seq[QuoteRead]) =
  checkCampaignReadListPermission(ctx, entries)

proc checkQuotePermission*(ctx: JWTContext, entry: QuoteRead) =
  checkReadPermission(ctx, entry)
