import ../base_generics/genericArticleRepository
import ../campaign/[campaignModel, campaignRepository]
import authenticationModels
import std/[options, sequtils, tables, strutils]

export authenticationModels

proc getUserById*(userId: int64): User =
    result = getEntryById[User](userId)


proc getUserByName*(userName: string): User =
    result = getEntryByField[User, string]("username", userName)


proc addCampaignGroup(
    membershipTable: var Table[string, Table[string, CampaignAccessLevel]], 
    groupName: string, 
    campaignName: string,
    accessLevel: CampaignAccessLevel
) =
    if not membershipTable.hasKey(groupName):
        membershipTable[groupName] = initTable[string, CampaignAccessLevel]()
    
    membershipTable[groupName][campaignName] = accessLevel


#You may want to cache the results of this proc somehow, for at least an hour
proc getCampaignMembershipTable(): Table[string, Table[string, CampaignAccessLevel]] =
  #Generates a map representation of which groups have access to which campaigns. 
  #Basically table[GroupName][CampaignName] --> AccessLevel
  let campaigns: seq[CampaignRead] = getAllCampaignReads()

  var membershipTable = initTable[string, Table[string, CampaignAccessLevel]]()
  for campaign in campaigns:
    if campaign.guest_group_id.isSome():
        let guestGroupName: string = campaign.guest_group_id.get().name
        membershipTable.addCampaignGroup(guestGroupName, campaign.name, CampaignAccessLevel.GUEST)
    
    if campaign.member_group_id.isSome():
        let memberGroupName: string = campaign.member_group_id.get().name
        membershipTable.addCampaignGroup(memberGroupName, campaign.name, CampaignAccessLevel.MEMBER)
        
    if campaign.admin_group_id.isSome():
        let adminGroupName: string = campaign.admin_group_id.get().name
        membershipTable.addCampaignGroup(adminGroupName, campaign.name, CampaignAccessLevel.ADMIN)

  result = membershipTable


proc getUserCampaignMemberships(user: User): Table[string, CampaignAccessLevel] =
    var userMemberships = initTable[string, CampaignAccessLevel]()

    let campaignMembershipTable: Table[string, Table[string, CampaignAccessLevel]] = getCampaignMembershipTable()

    let userGroups: seq[Group] = getManyToMany(user, UserGroup, Group)
    for group in userGroups:
        let isCampaignGroup: bool = campaignMembershipTable.hasKey(group.name)
        if not isCampaignGroup:
            continue

        let campaignMemberships: Table[string, CampaignAccessLevel] = campaignMembershipTable[group.name]
        for campaignName in campaignMemberships.keys:
            userMemberships[campaignName] = campaignMemberships[campaignName]
    
    result = userMemberships
        

proc getUserContainer*(user: User): UserContainer =
    let campaignMemberships = getUserCampaignMemberships(user)
    result = UserContainer(user: user, campaignMemberships: campaignMemberships)

