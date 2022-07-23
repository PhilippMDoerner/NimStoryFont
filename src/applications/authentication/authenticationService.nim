import prologue except Group
import ../genericArticleRepository
import ../campaign/[campaignModel, campaignService, campaignUtils]
import authenticationEmailText
import authenticationRepository
import authenticationConstants
import std/[options, sequtils, tables, strutils, strformat]
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
        membershipTable.addCampaignGroup(guestGroupName, campaign.name, CampaignAccessLevel.GUEST)
    
    if campaign.member_group_id.isSome():
        let memberGroupName: string = campaign.member_group_id.get().name
        membershipTable.addCampaignGroup(memberGroupName, campaign.id, CampaignAccessLevel.MEMBER)
        membershipTable.addCampaignGroup(memberGroupName, campaign.name, CampaignAccessLevel.MEMBER)
        
    if campaign.admin_group_id.isSome():
        let adminGroupName: string = campaign.admin_group_id.get().name
        membershipTable.addCampaignGroup(adminGroupName, campaign.id, CampaignAccessLevel.ADMIN)
        membershipTable.addCampaignGroup(adminGroupName, campaign.name, CampaignAccessLevel.ADMIN)

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

  var permissionEntries: seq[Permission] = @[new(Permission)]
  connection.select(permissionEntries, sqlCondition)

  result = permissionEntries

proc readGroups*(connection: DbConn, requestParameters: ReadWithoutParams): seq[Group] =
  result = connection.getList(Group)

proc deleteGroupMembership*(connection: DbConn, userId: int64, groupId: int64) =
  authenticationRepository.deleteGroupMembership(connection, userId, groupId)

proc addCampaignMember*(connection: DbConn, campaign: CampaignRead, role: CampaignRole, newMember: var User) =
  let campaignGroup: Group = getCampaignGroupForRole(campaign, role)
  var newMembership = UserGroup(user_Id: newMember, group_id: campaignGroup)
  discard connection.createEntryInTransaction(newMembership)

proc removeCampaignMember*(connection: DbConn, campaign: CampaignRead, role: CampaignRole, member: var User) =
  let campaignGroup: Group = getCampaignGroupForRole(campaign, role)
  connection.deleteGroupMembership(member.id, campaignGroup.id)


proc sendPasswordResetEmail*(user: User, newPassword: string, settings: Settings) =
    let subject = getPasswordResetMailSubject(user.username)
    let body = getPasswordResetMailBody(newPassword)
    sendSystemEmail(subject, body, user.email, settings)
