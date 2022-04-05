import questModel
import norm/sqlite
import ../genericArticleRepository

type QuestRead* = Quest
type QuestOverview* = Quest
type QuestSerializable* = QuestRead
type QuestOverviewSerializable* = QuestOverview


proc serializeQuestRead*(connection: DbConn, entry: QuestRead): QuestSerializable =
    result = entry

proc serializeQuest*(connection: DbConn, entry: Quest): QuestSerializable =
    let fullEntry = connection.getEntryById(entry.id, QuestRead)
    result = connection.serializeQuest(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: QuestOverview): QuestOverviewSerializable =
    result = entry
