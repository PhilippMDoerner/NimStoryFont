import mapModel
import ../base_generics/genericArticleRepository

proc getMapById*(mapId: int64): Map =
    result = getEntryById[Map](mapId)
