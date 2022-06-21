import prologue except Group
import ../genericArticleRepository
import ../campaign/[campaignModel, campaignService]
import authenticationModels
import authenticationUtils
import authenticationEmailText
import std/[options, sequtils, tables, strutils, strformat, unicode]
import norm/model
import ../allUrlParams
import ../user/userService
import ../../utils/[emailUtils]

export authenticationModels


proc addCampaignGroup(
    membershipTable: var Table[string, CampaignMemberships], 
    groupName: string, 
    campaignIdentifier: int64 | string,
    accessLevel: CampaignAccessLevel
) =
    if not membershipTable.hasKey(groupName):
        membershipTable[groupName] = newMembershipTable()
    
    membershipTable[groupName][campaignIdentifier] = accessLevel


#You may want to cache the results of this proc somehow, for at least an hour
proc getCampaignIdMembershipTable(): Table[string, CampaignMemberships] =
  #Generates a map representation of which groups have access to which campaigns. 
  #Basically table[GroupName][campaignId] --> AccessLevel
  let campaigns: seq[CampaignRead] = getAllCampaignReads()

  var membershipTable = initTable[string, CampaignMemberships]()
  for campaign in campaigns:
    if campaign.guest_group_id.isSome():
        let guestGroupName: string = campaign.guest_group_id.get().name
        membershipTable.addCampaignGroup(guestGroupName, campaign.id, CampaignAccessLevel.GUEST)
        membershipTable.addCampaignGroup(guestGroupName, campaign.name.toLower(), CampaignAccessLevel.GUEST)
    
    if campaign.member_group_id.isSome():
        let memberGroupName: string = campaign.member_group_id.get().name
        membershipTable.addCampaignGroup(memberGroupName, campaign.id, CampaignAccessLevel.MEMBER)
        membershipTable.addCampaignGroup(memberGroupName, campaign.name.toLower(), CampaignAccessLevel.MEMBER)
        
    if campaign.admin_group_id.isSome():
        let adminGroupName: string = campaign.admin_group_id.get().name
        membershipTable.addCampaignGroup(adminGroupName, campaign.id, CampaignAccessLevel.ADMIN)
        membershipTable.addCampaignGroup(adminGroupName, campaign.name.toLower(), CampaignAccessLevel.ADMIN)

  result = membershipTable

proc getUserCampaignMemberships(user: User): CampaignMemberships =
    var userMemberships: CampaignMemberships = newMembershipTable()

    let campaignIdMembershipTable: Table[string, CampaignMemberships] = getCampaignIdMembershipTable()

    let userGroups: seq[Group] = getManyToMany(user, UserGroup, Group)
    for group in userGroups:
        let isCampaignGroup: bool = campaignIdMembershipTable.hasKey(group.name)
        if not isCampaignGroup:
            continue

        let campaignMemberships: CampaignMemberships = campaignIdMembershipTable[group.name]
        for campaignId in campaignMemberships.keys:
            userMemberships[campaignId] = campaignMemberships[campaignId]
    
    result = userMemberships
        

proc getUserContainer*(user: User): UserContainer =
    let campaignMemberships = getUserCampaignMemberships(user)
    result = UserContainer(
        user: user, 
        campaignMemberships: campaignMemberships
    )


proc getPermissions*(connection: DbConn, codeNames: seq[string]): seq[Permission] =
  const permissionTable = Permission.table()
  let partialConditions: seq[string] = codeNames.map(proc(s: string): string = fmt "{permissionTable}.codename = {s}")
  let sqlCondition = partialConditions.join(", ")

  var permissionEntries: seq[Permission] = @[newModel(Permission)]
  connection.select(permissionEntries, sqlCondition)

  result = permissionEntries

proc readGroups*(connection: Dbconn, requestParameters: ReadWithoutParams): seq[Group] =
  result = connection.getList(Group)




proc sendPasswordResetEmail*(user: User, newPassword: string, settings: Settings) =
    let subject = getPasswordResetMailSubject(user.username)
    let body = getPasswordResetMailBody(newPassword)
    sendSystemEmail(subject, body, user.email, settings)
