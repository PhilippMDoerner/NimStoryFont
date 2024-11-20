import ruleModel
import ruleUtils
import norm/sqlite
import ../genericArticleRepository
import ../campaign/campaignModel
import ../../utils/[myStrutils, djangoDateTime/djangoDateTimeType]
import std/[options, sugar]
import ../articleModel

type RuleSerializable* = object
    article_type: ArticleType
    pk: int64
    creation_datetime: DjangoDateTime
    update_datetime: DjangoDateTime
    description: Option[string]
    name: string
    campaign: int64
    campaign_details: MinimumCampaignOverview


proc serializeRuleRead*(connection: DbConn, entry: RuleRead): RuleSerializable =
    result = RuleSerializable(
        article_type: ArticleType.atRule,
        pk: entry.id,
        creation_datetime: entry.creation_datetime,
        update_datetime: entry.update_datetime,
        description: entry.description,
        name: entry.name,
        campaign: entry.campaign_id.id,
        campaign_details: entry.campaign_id
    )

proc serializeRuleReads*(connection: DbConn, entries: seq[RuleRead]): seq[RuleSerializable] =
    for entry in entries:
        result.add(connection.serializeRuleRead(entry)) 

proc serializeRule*(connection: DbConn, entry: Rule): RuleSerializable =
    let fullEntry = connection.getEntryById(entry.id, RuleRead)
    result = connection.serializeRuleRead(fullEntry)


type RuleOverviewSerializable* = object
    article_type: ArticleType
    description: Option[string]
    pk: int64
    name_full: string
    name: string
    campaign_details: MinimumCampaignOverview
    update_datetime: DjangoDateTime
    creation_datetime: DjangoDateTime


proc overviewSerialize*(connection: DbConn, entry: RuleRead): RuleOverviewSerializable =
    result = RuleOverviewSerializable(
        article_type: ArticleType.atRule,
        description: entry.description.map(txt => truncate(txt)),
        pk: entry.id,
        name_full: $entry,
        name: entry.name,
        campaign_details: entry.campaign_id,
        update_datetime: entry.update_datetime,
        creation_datetime: entry.creation_datetime
    )


proc overviewSerialize*(connection: DbConn, entries: seq[RuleRead]): seq[RuleOverviewSerializable] =
    for entry in entries:
        result.add(connection.overviewSerialize(entry))