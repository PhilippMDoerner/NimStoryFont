import ../base_generics/genericArticleRepository
import authenticationModels


proc getUserById*(userId: int64): User =
    result = getEntryById[User](userId)


proc getUserByName*(userName: string): User =
    result = getEntryByField[User, string]("username", userName)