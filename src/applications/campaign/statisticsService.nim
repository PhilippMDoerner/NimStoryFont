import statisticsRepository
import norm/[model, sqlite]
import ../genericArticleRepository
import campaignModel
import campaignRepository
import ../character/characterModel
import ../creature/creatureModel
import ../diaryentry/diaryEntryModel
import ../encounter/encounterModel
import ../item/itemModel
import ../location/locationModel
import ../map/mapModel
import ../mapMarker/markerModel
import ../organization/organizationModel
import ../quest/questModel
import ../quote/quoteModels
import ../rules/ruleModel
import ../sessionaudio/sessionaudioModel
import ../sessionAudioTimestamp/timestampModel
import ../spell/spellModel

proc getCampaignStatistics*(connection: DbConn, campaignName: string): CampaignStatistics =
  let campaignId = connection.getEntryByField("name", campaignName, Campaign).id

  result = CampaignStatistics(
    character_count: connection.count(CharacterRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    creature_count: connection.count(CreatureRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    diaryentry_count: connection.getDiaryEntryCount(campaignId),
    encounter_count: connection.getEncounterCount(campaignId),
    item_count: connection.count(ItemRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    location_count: connection.count(LocationRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    map_count: connection.count(Map, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    marker_count: connection.getMarkerCount(campaignId),
    organization_count: connection.count(OrganizationRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    quest_count: connection.count(QuestRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    quote_count: connection.getQuoteCount(campaignId),
    rule_count: connection.count(RuleRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
    session_audio_count: connection.getSessionAudioCount(campaignId),
    timestamp_count: connection.getTimestampCount(campaignId),
    spell_count: connection.count(SpellRead, cond = "campaign_id = ?", params = campaignId.dbValue()).int,
  )

proc get