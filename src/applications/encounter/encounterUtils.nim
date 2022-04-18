import ../genericArticleRepository
import std/[strformat, options]
import encounterModel

proc `$`*(encounter: EncounterRead): string =
    result.add(if encounter.diaryentry_id.session_id.is_main_session: "Main " else: "Side ")
    result.add(fmt "Session {encounter.diaryentry_id.session_id.session_number}")
    if encounter.title.isSome():
        result.add(fmt" - {encounter.title.get()}")


proc `$`*(encounter: Encounter): string =
    let diaryentry: EncounterDiaryentry = getEntryById(encounter.diaryentry_id, EncounterDiaryentry)
    result.add(if diaryentry.session_id.is_main_session: "Main " else: "Side ")
    result.add(fmt "Session {diaryentry.session_id.session_number}")
    if encounter.title.isSome():
        result.add(fmt " - {encounter.title}")


proc campaign_id*(encounter: Encounter): int64 =
    let diaryentry: EncounterDiaryentry = getEntryById(encounter.diaryentry_id, EncounterDiaryentry)
    result = diaryentry.session_id.campaign_id.id

proc campaign_id*(encounter: EncounterRead): int64 =
    result = encounter.diaryentry_id.session_id.campaign_id.id