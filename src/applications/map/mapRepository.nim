import mapModel
import ../base_generics/genericArticleRepository

export mapModel

proc getMapById*(mapId: int64): Map =
    result = getEntryById[Map](mapId)
