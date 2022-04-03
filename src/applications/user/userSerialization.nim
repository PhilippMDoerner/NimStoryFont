import userModel
import norm/sqlite
import ../genericArticleRepository

type UserRead* = User
type UserOverview* = User
type UserSerializable* = UserRead
type UserOverviewSerializable* = UserOverview


proc serializeUserRead*(connection: DbConn, entry: UserRead): UserSerializable =
    result = entry

proc serializeUser*(connection: DbConn, entry: User): UserSerializable =
    let fullEntry = connection.getEntryById(entry.id, UserRead)
    result = connection.serializeUser(fullEntry)

proc overviewSerialize*(connection: DbConn, entry: UserOverview): UserOverviewSerializable =
    result = entry
