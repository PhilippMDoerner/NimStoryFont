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
