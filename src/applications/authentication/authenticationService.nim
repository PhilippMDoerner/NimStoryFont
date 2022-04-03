import ../genericArticleRepository
import ../campaign/[campaignModel, campaignService]
import authenticationModels
import std/[options, sequtils, tables, strutils, strformat]
import norm/model
import ../user/userService

export authenticationModels


proc addCampaignGroup(
    membershipTable: var Table[string, CampaignMemberships], 
    groupName: string, 
    campaignId: int64,
    accessLevel: CampaignAccessLevel
) =
    if not membershipTable.hasKey(groupName):
        membershipTable[groupName] = initTable[int64, CampaignAccessLevel]()
    
    membershipTable[groupName][campaignId] = accessLevel


#You may want to cache the results of this proc somehow, for at least an hour
proc getCampaignMembershipTable(): Table[string, CampaignMemberships] =
  #Generates a map representation of which groups have access to which campaigns. 
  #Basically table[GroupName][CampaignName] --> AccessLevel
  let campaigns: seq[CampaignRead] = getAllCampaignReads()

  var membershipTable = initTable[string, CampaignMemberships]()
  for campaign in campaigns:
    if campaign.guest_group_id.isSome():
        let guestGroupName: string = campaign.guest_group_id.get().name
        membershipTable.addCampaignGroup(guestGroupName, campaign.id, CampaignAccessLevel.GUEST)
    
    if campaign.member_group_id.isSome():
        let memberGroupName: string = campaign.member_group_id.get().name
        membershipTable.addCampaignGroup(memberGroupName, campaign.id, CampaignAccessLevel.MEMBER)
        
    if campaign.admin_group_id.isSome():
        let adminGroupName: string = campaign.admin_group_id.get().name
        membershipTable.addCampaignGroup(adminGroupName, campaign.id, CampaignAccessLevel.ADMIN)

  result = membershipTable


proc getUserCampaignMemberships(user: User): CampaignMemberships =
    var userMemberships: CampaignMemberships = initTable[int64, CampaignAccessLevel]()

    let campaignMembershipTable: Table[string, CampaignMemberships] = getCampaignMembershipTable()

    let userGroups: seq[Group] = getManyToMany(user, UserGroup, Group)
    for group in userGroups:
        let isCampaignGroup: bool = campaignMembershipTable.hasKey(group.name)
        if not isCampaignGroup:
            continue

        let campaignMemberships: CampaignMemberships = campaignMembershipTable[group.name]
        for campaignId in campaignMemberships.keys:
            userMemberships[campaignId] = campaignMemberships[campaignId]
    
    result = userMemberships
        

proc getUserContainer*(user: User): UserContainer =
    let campaignMemberships = getUserCampaignMemberships(user)
    result = UserContainer(user: user, campaignMemberships: campaignMemberships)


proc getPermissions*(connection: DbConn, codeNames: seq[string]): seq[Permission] =
  const permissionTable = Permission.table()
  let partialConditions: seq[string] = codeNames.map(proc(s: string): string = fmt "{permissionTable}.codename = {s}")
  let sqlCondition = partialConditions.join(", ")

  var permissionEntries: seq[Permission] = @[newModel(Permission)]
  connection.select(permissionEntries, sqlCondition)

  result = permissionEntries