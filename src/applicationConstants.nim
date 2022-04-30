import prologue/middlewares/cors

const MODEL_INIT_ID*: int64 = -1
const NONE_STRING*: string = "none"
const ID_STRING_PREFIX*: string = "id_"
const SHORT_DESCRIPTION_WORD_COUNT*: int = 30

# CSP_DEFAULT_SRC = ("'none'", )
# CSP_STYLE_SRC = ("'self'", 'unpkg.com', 'stackpath.bootstrapcdn.com', 'fonts.googleapis.com', "'unsafe-inline'", 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'rawcdn.githack.com', 'maxcdn.bootstrapcdn.com',)
# CSP_SCRIPT_SRC = ("'self'",  'unpkg.com', 'localhost', 'stackpath.bootstrapcdn.com', 'code.jquery.com', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com','maxcdn.bootstrapcdn.com',)
# CSP_IMG_SRC = ("'self'", 'ipw3.org', 'data:', 'cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'i.imgur.com',)
# CSP_FONT_SRC = ("'self'", 'fonts.gstatic.com', 'maxcdn.bootstrapcdn.com',)
# CSP_MEDIA_SRC = ("'self'",)
# CSP_INCLUDE_NONCE_IN = ('style-src',)
# CSP_CONNECT_SRC = ("'self'",)
# CSP_EXCLUDE_URL_PREFIXES = ("/api/swagger", "/api/openapi")