import ruleModel
import norm/sqlite
import ../genericArticleRepository
import ../campaign/campaignModel
import ../../utils/djangoDateTime/[djangoDateTimeType]
import std/[options, sugar]

type RuleSerializable* = object
    pk: int64
    creation_datetime: DjangoDateTime
    update_datetime: DjangoDateTime
    description: Option[string]
    name: string
    campaign: int64
    campaign_details: MinimumCampaignOverview


proc serializeRuleRead*(connection: DbConn, entry: RuleRead): RuleSerializable =
    result = RuleSerializable(
        pk: entry.id,
        creation_datetime: entry.creation_datetime,
        update_datetime: entry.update_datetime,
        description: entry.description,
        name: entry.name,
        campaign: entry.campaign_id.id,
        campaign_details: entry.campaign_id
    )

proc serializeRule*(connection: DbConn, entry: Rule): RuleSerializable =
    let fullEntry = connection.getEntryById(entry.id, RuleRead)
    result = connection.serializeRuleRead(fullEntry)