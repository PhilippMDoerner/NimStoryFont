import ../base_generics/genericArticleRepository
import std/[strformat, options]
import encounterRepository

proc `$`*(encounter: EncounterRead): string =
    let sessionType: string = if encounter.diaryentry_id.session_id.is_main_session: "Main " else: "Side "
    result.add(fmt "{sessionType} Session {encounter.diaryentry_id.session_id.session_number} - {encounter.title}")


proc `$`*(encounter: Encounter): string =
    let diaryentry: EncounterDiaryentry = getEntryById[EncounterDiaryentry](encounter.diaryentry_id)
    let sessionType: string = if diaryentry.session_id.is_main_session: "Main " else: "Side "
    result.add(fmt "{sessionType} Session {diaryentry.session_id.session_number}")
    if encounter.title.isSome():
        result.add(fmt " - {encounter.title}")
