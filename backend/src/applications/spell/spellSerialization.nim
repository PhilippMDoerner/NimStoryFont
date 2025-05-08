import spellModel
import spellUtils
import norm/[model, sqlite]
import ../genericArticleRepository
import ../playerclass/[playerClassSerialization]
import std/[options, sugar, sequtils, tables]
import ../campaign/campaignModel
import ../../utils/[myStrutils, djangoDateTime/djangoDateTimeType]
import ../articleModel
import spellConstants

type SpellConnectionSerializable* = object
  pk: int64
  player_class: int64
  spell: int64
  player_class_details: PlayerClassSerializable

proc serializeSpellConnectionRead*(
    entry: SpellConnectionRead
): SpellConnectionSerializable =
  result = SpellConnectionSerializable(
    pk: entry.id,
    player_class: entry.player_class_id.id,
    spell: entry.spell_id.id,
    player_class_details: serializePlayerClass(entry.player_class_id),
  )

proc serializeSpellConnectionRead*(
    connection: DbConn, entry: SpellConnectionRead
): SpellConnectionSerializable =
  result = entry.serializeSpellConnectionRead()

proc serializeSpellConnection*(
    connection: DbConn, entry: SpellConnection
): SpellConnectionSerializable =
  let spellConnectionRead = connection.getEntryById(entry.id, SpellConnectionRead)
  result = connection.serializeSpellConnectionRead(spellConnectionRead)

type SpellSerializable* = object
  article_type: ArticleType
  name: string
  pk: int64
  player_class_connections: seq[SpellConnectionSerializable]
  spell_level: SpellLevel
  casting_time: CastingTime
  `range`: Range
  components: string
  duration: SpellDuration
  concentration: bool
  ritual: bool
  school: MagicSchool
  saving_throw: Option[SavingThrow]
  damage: Option[string]
  description: string
  creation_datetime: DjangoDateTime
  update_datetime: DjangoDateTime
  campaign: int64
  campaign_details: MinimumCampaignOverview

proc serializeSpellRead*(
    entry: SpellRead, spellConnections: seq[SpellConnectionRead]
): SpellSerializable =
  let serializedSpellConnections = spellConnections.map(serializeSpellConnectionRead)

  result = SpellSerializable(
    article_type: ArticleType.atSpell,
    name: entry.name,
    pk: entry.id,
    spell_level: entry.spell_level,
    casting_time: entry.casting_time,
    `range`: entry.`range`,
    components: entry.components,
    duration: entry.duration,
    concentration: entry.concentration,
    ritual: entry.ritual,
    school: entry.school,
    saving_throw: entry.saving_throw,
    damage: entry.damage,
    description: entry.description,
    creation_datetime: entry.creation_datetime,
    update_datetime: entry.update_datetime,
    campaign: entry.campaign_id.id,
    campaign_details: entry.campaign_id,
    player_class_connections: serializedSpellConnections,
  )

proc serializeSpellRead*(connection: DbConn, entry: SpellRead): SpellSerializable =
  let spellConnections = connection.getManyFromOne(entry, SpellConnectionRead)
  result = serializeSpellRead(entry, spellConnections)

proc serializeSpellReads*(
    connection: DbConn, entries: seq[SpellRead]
): seq[SpellSerializable] =
  let allSpellConnections: Table[int64, seq[SpellConnectionRead]] =
    connection.getManyFromOne(entries, SpellConnectionRead, "spell_id")
  for entry in entries:
    let serializedSpell = serializeSpellRead(entry, allSpellConnections[entry.id])
    result.add(serializedSpell)

proc serializeSpell*(connection: DbConn, entry: Spell): SpellSerializable =
  let fullEntry = connection.getEntryById(entry.id, SpellRead)
  result = connection.serializeSpellRead(fullEntry)

type SpellOverviewSerializable* = object
  article_type: ArticleType
  description: string
  pk: int64
  name_full: string
  name: string
  campaign_details: MinimumCampaignOverview
  update_datetime: DjangoDateTime
  creation_datetime: DjangoDateTime

proc overviewSerialize*(
    connection: DbConn, entry: SpellRead
): SpellOverviewSerializable =
  result = SpellOverviewSerializable(
    article_type: ArticleType.atSpell,
    description: truncate(entry.description),
    pk: entry.id,
    name_full: $entry,
    name: entry.name,
    campaign_details: entry.campaign_id,
    update_datetime: entry.update_datetime,
    creation_datetime: entry.creation_datetime,
  )

proc overviewSerialize*(
    connection: DbConn, entries: seq[SpellRead]
): seq[SpellOverviewSerializable] =
  for entry in entries:
    result.add(connection.overviewSerialize(entry))
