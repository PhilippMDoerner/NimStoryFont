import ../genericArticleRepository
import ../django/djangoModels
import ../authentication/[authenticationService, authenticationConstants, authenticationModels]
import campaignUtils
import campaignModel
import ../core/signalSystem
import std/[options, sequtils, logging]

proc createCampaignPermission*(connection: DbConn, permissionName: string, codeName: string): Permission =
  var campaignContentType = getEntryByField("model", "campaign", DjangoContentType)
  var permission = Permission(
    name: permissionName, 
    codeName: codeName,
    content_type_id: campaignContentType.id
  )
  return connection.createEntryInTransaction(permission)

proc createGuestPermission*(connection: DbConn, instance: var Campaign) =
  debug "Campaign: ", instance.name
  let permission = connection.createCampaignPermission(instance.guestPermissionName(), instance.guestPermissionCodename())
  
  instance.guest_permission_id = some(permission.id)
  
proc createMemberPermission*(connection: DbConn, instance: var Campaign) =
  let permission = createCampaignPermission(connection, instance.memberPermissionName(), instance.memberPermissionCodename())
  
  instance.member_permission_id = some(permission.id)
  
proc createAdminPermission*(connection: DbConn, instance: var Campaign) =
  let permission = createCampaignPermission(connection, instance.adminPermissionName(), instance.adminPermissionCodename())

  instance.admin_permission_id = some(permission.id)

proc createCampaignGroup(connection: DbConn, groupName: string): Group =
  var group: Group = Group(name: groupName)
  result = createEntryInTransaction(connection, group)

proc addCampaignPermissions(connection: DbConn, group: Group, permissionCodeNames: seq[string]) =
  let permissions: seq[Permission] = getPermissions(connection, permissionCodeNames)
  for permission in permissions:
    var groupPermission = GroupPermission(group_id: group.id, permission_id: permission.id)
    discard createEntryInTransaction(connection, groupPermission)

proc createGuestGroup(connection: DbConn, instance: var Campaign) = 
  ## Creates the guest group for a campaign. Also grants it all the permissions
  ## that this group would have on the given campaign in addition to the guest Permission
  let guestGroup: Group = createCampaignGroup(connection, instance.guestGroupName())
  
  let guestPermissionCodenames: seq[string] = concat(CAMPAIGN_GUEST_PERMISSIONS, @[instance.guestPermissionCodename()])
  addCampaignPermissions(connection, guestGroup, guestPermissionCodenames)

  instance.guest_group_id = some(guestGroup.id)

proc createMemberGroup(connection: DbConn, instance: var Campaign) =
  ## Creates the member group for a campaign. Also grants it all the permissions
  ## that this group would have on the given campaign in addition to the member Permission
  let memberGroup: Group = createCampaignGroup(connection, instance.memberGroupName())
  
  let memberPermissionCodenames: seq[string] = concat(CAMPAIGN_MEMBER_PERMISSIONS, @[instance.memberPermissionCodename])
  addCampaignPermissions(connection, memberGroup, memberPermissionCodenames)

  instance.member_group_id = some(memberGroup.id)
  
proc createAdminGroup(connection: DbConn, instance: var Campaign) =
  ## Creates the admin group for a campaign. Also grants it all the permissions
  ## that this group would have on the given campaign in addition to the admin Permission
  let adminGroup: Group = createCampaignGroup(connection, instance.adminGroupName())
  
  let adminPermissionCodenames: seq[string] = concat(CAMPAIGN_ADMIN_PERMISSIONS, @[instance.adminPermissionCodename])
  addCampaignPermissions(connection, adminGroup, adminPermissionCodenames)

  instance.admin_group_id = some(adminGroup.id)


proc createCampaignGroupsAndPermissions(connection: DbConn, modelInstance: var Campaign) =
  createGuestPermission(connection, modelInstance)
  createMemberPermission(connection, modelInstance)
  createAdminPermission(connection, modelInstance)

  createGuestGroup(connection, modelInstance)
  createMemberGroup(connection, modelInstance)
  createAdminGroup(connection, modelInstance)

proc deleteCampaignPermissions(connection: DbConn, modelInstance: Campaign) =
  if modelInstance.guest_group_id.isSome():
    deleteEntry(modelInstance.guest_group_id.get(), Group)

  if modelInstance.member_group_id.isSome():
    deleteEntry(modelInstance.member_group_id.get(), Group)

  if modelInstance.admin_group_id.isSome():
    deleteEntry(modelInstance.admin_group_id.get(), Group)

  if modelInstance.guest_permission_id.isSome():
    deleteEntry(modelInstance.guest_permission_id.get(), Permission)

  if modelInstance.member_permission_id.isSome():
    deleteEntry(modelInstance.member_permission_id.get(), Permission)

  if modelInstance.admin_permission_id.isSome():
    deleteEntry(modelInstance.admin_permission_id.get(), Permission)


proc connectCampaignSignals*() =
  connect(SignalType.stPreCreate, Campaign, createCampaignGroupsAndPermissions)
  connect(SignalType.stPreDelete, Campaign, deleteCampaignPermissions)