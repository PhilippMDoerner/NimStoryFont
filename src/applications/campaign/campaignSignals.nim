import ../genericArticleRepository
import ../django/djangoModels
import ../authentication/[authenticationService, authenticationConstants, authenticationModels]
import campaignUtils
import campaignModel
import ../core/signalSystem
import std/[options, sequtils]

proc createCampaignPermission*(connection: DbConn, permissionName: string, codeName: string) =
  var campaignContentType = getEntryByField[DjangoContentType, string]("model", "campaign")
  var permission = Permission(
    name: permissionName, 
    codeName: codeName,
    content_type_id: campaignContentType.id
  )
  discard createEntryInTransaction(connection, permission)

proc createGuestPermission*(connection: DbConn, instance: Campaign) =
  createCampaignPermission(connection, instance.guestPermissionName, instance.guestPermissionCodename)

proc createMemberPermission*(connection: DbConn, instance: Campaign) =
  createCampaignPermission(connection, instance.memberPermissionName, instance.memberPermissionCodename)

proc createAdminPermission*(connection: DbConn, instance: Campaign) =
  createCampaignPermission(connection, instance.adminPermissionName, instance.adminPermissionCodename)

proc createCampaignGroup(connection: DbConn, groupName: string): Group =
  var group: Group = Group(name: groupName)
  result = createEntryInTransaction(connection, group)

proc addCampaignPermissions(connection: DbConn, group: Group, permissionCodeNames: seq[string]) =
  let permissions: seq[Permission] = getPermissions(connection, permissionCodeNames)
  for permission in permissions:
    var groupPermission = GroupPermission(group_id: group.id, permission_id: permission.id)
    discard createEntryInTransaction(connection, groupPermission)

proc createGuestGroup(connection: DbConn, instance: Campaign) = 
  ## Creates the guest group for a campaign. Also grants it all the permissions
  ## that this group would have on the given campaign in addition to the guest Permission
  let guestGroup: Group = createCampaignGroup(connection, instance.guestGroupName)
  
  let guestPermissionCodenames: seq[string] = concat(CAMPAIGN_GUEST_PERMISSIONS, @[instance.guestPermissionCodename])
  addCampaignPermissions(connection, guestGroup, guestPermissionCodenames)

proc createMemberGroup(connection: DbConn, instance: Campaign) =
  ## Creates the member group for a campaign. Also grants it all the permissions
  ## that this group would have on the given campaign in addition to the member Permission
  let memberGroup: Group = createCampaignGroup(connection, instance.memberGroupName)
  
  let memberPermissionCodenames: seq[string] = concat(CAMPAIGN_MEMBER_PERMISSIONS, @[instance.memberPermissionCodename])
  addCampaignPermissions(connection, memberGroup, memberPermissionCodenames)

proc createAdminGroup(connection: DbConn, instance: Campaign) =
  ## Creates the admin group for a campaign. Also grants it all the permissions
  ## that this group would have on the given campaign in addition to the admin Permission
  let adminGroup: Group = createCampaignGroup(connection, instance.adminGroupName)
  
  let adminPermissionCodenames: seq[string] = concat(CAMPAIGN_ADMIN_PERMISSIONS, @[instance.adminPermissionCodename])
  addCampaignPermissions(connection, adminGroup, adminPermissionCodenames)



proc createCampaignGroupsAndPermissions(connection: DbConn, modelInstance: Campaign) =
  createGuestPermission(connection, modelInstance)
  createMemberPermission(connection, modelInstance)
  createAdminPermission(connection, modelInstance)

  createGuestGroup(connection, modelInstance)
  createMemberGroup(connection, modelInstance)
  createAdminGroup(connection, modelInstance)
  
connect(SignalType.stPostCreate, Campaign, createCampaignGroupsAndPermissions)



proc deleteCampaignPermissions(connection: DbConn, modelInstance: Campaign) =
  if modelInstance.guest_group_id.isSome():
    deleteEntry[Group](modelInstance.guest_group_id.get())

  if modelInstance.member_group_id.isSome():
    deleteEntry[Group](modelInstance.member_group_id.get())

  if modelInstance.admin_group_id.isSome():
    deleteEntry[Group](modelInstance.admin_group_id.get())

  if modelInstance.guest_permission_id.isSome():
    deleteEntry[Permission](modelInstance.guest_permission_id.get())

  if modelInstance.member_permission_id.isSome():
    deleteEntry[Permission](modelInstance.member_permission_id.get())

  if modelInstance.admin_permission_id.isSome():
    deleteEntry[Permission](modelInstance.admin_permission_id.get())

connect(SignalType.stPreDelete, Campaign, deleteCampaignPermissions)
