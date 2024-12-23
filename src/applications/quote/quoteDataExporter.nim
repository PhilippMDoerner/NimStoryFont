import std/[strformat, json, options]
import norm/[sqlite]
import ./quoteSerialization
import ./quoteService
import ../allUrlParams
import ../character/characterModel
import ../campaign/campaignModel
import ../genericArticleRepository
import ../../utils/djangoDateTime/[serialization]
  
proc exportQuoteData*(con: DbConn, campaign: CampaignRead): JsonNode =
  result = newJObject()
  let campaignCharacters = con.getCampaignList(campaign.name, CharacterRead)
  for character in campaignCharacters:
    let quotes = con.getCharacterQuotes(ReadByNameParams(campaignName: campaign.name, articleName: character.name))
    let serializedQuotes = con.serializeQuoteReads(quotes)
    let characterQuotesUrl = fmt"/quote/{campaign.name}/{character.name}/"
    result[characterQuotesUrl]= %*serializedQuotes
      
    let randomQuoteUrl = fmt"/quote/{campaign.name}/{character.name}/random/"
    let randomQuote = if serializedQuotes.len > 0: 
        some(serializedQuotes[0])
      else:
        none(QuoteSerializable)
    result[randomQuoteUrl]= %*randomQuote