import diaryEntryModel
import ../genericArticleRepository
import norm/[sqlite]
import diaryEntryRepository
import diaryEntrySerialization
import ../allUrlParams

export diaryEntryModel
export diaryEntrySerialization

proc getDiaryEntry*(connection: DbConn, requestParams: ReadDiaryEntryParams): DiaryEntryRead =
  result = diaryEntryRepository.getDairyEntry(
    connection,
    requestParams.campaignName, 
    requestParams.sessionNumber, 
    requestParams.isMainSession, 
    requestParams.userName
  )

    
proc getCampaignDiaryEntries*(connection: DbConn, requestParams: ReadListParams): seq[DiaryentryRead] =
  result = connection.getDiaryEntriesForCampaign(requestParams.campaignName)