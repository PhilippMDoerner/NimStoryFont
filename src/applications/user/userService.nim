import ../genericArticleRepository
import ../campaign/[campaignModel, campaignService]
import userModel
import std/[options, sequtils, tables, strutils, strformat]
import norm/model

export userModel

proc getUserById*(userId: int64): User =
    result = getEntryById(userId, User)


proc getUserByName*(userName: string): User =
    result = getEntryByField("username", userName, User)


proc getCampaignUserListOverview*(campaignName: string): seq[User] =
    ## lists all campaign entries using a limited but performant representation of a User
    result = getCampaignList(campaignName, User)

proc getUserSerialization*(connection: sqlite.DbConn, entry: User): User {.gcsafe.}=
    result = connection.getEntryById(entry.id, User)

