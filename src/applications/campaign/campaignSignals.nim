import ../genericArticleRepository
import ../django/djangoModels
import ../authentication/authenticationModels
import campaignUtils
import campaignModel
import ../core/signalSystem

proc createCampaignGroup(connection: DbConn, groupName: string) =
  var group: Group = Group(name: groupName)
  discard createEntryInTransaction(connection, group)

proc createGuestGroup(connection: DbConn, instance: Campaign) = createCampaignGroup(connection, instance.guestGroupName)
proc createMemberGroup(connection: DbConn, instance: Campaign) = createCampaignGroup(connection, instance.memberGroupName)
proc createAdminGroup(connection: DbConn, instance: Campaign) = createCampaignGroup(connection, instance.adminGroupName)

connect(SignalType.stPostCreate, Campaign, createGuestGroup)
connect(SignalType.stPostCreate, Campaign, createMemberGroup)
connect(SignalType.stPostCreate, Campaign, createAdminGroup)


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

connect(SignalType.stPostCreate, Campaign, createGuestPermission)
connect(SignalType.stPostCreate, Campaign, createMemberPermission)
connect(SignalType.stPostCreate, Campaign, createAdminPermission)