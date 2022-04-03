import ../genericArticleRepository
import characterModel
import norm/[model, sqlite]
import ../allUrlParams

export characterModel



proc getCharacterList(connection: DbConn, requestParams: ReadListParams) =
    discard connection.getCampaignList(requestParams.campaignName, CharacterOverview)