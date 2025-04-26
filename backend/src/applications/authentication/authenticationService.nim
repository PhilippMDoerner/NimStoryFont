import std/[options, sequtils, tables, strutils, strformat, logging, times]
import prologue except Group
import norm/model
import ./authenticationEmailText
import ./authenticationRepository
import ./authenticationConstants
import ./authenticationModels
import ./authenticationUtils
import ./authenticationDTO
import ../genericArticleRepository
import ../campaign/[campaignModel, campaignService, campaignUtils]
import ../allUrlParams
import ../user/[userUtils, userService]
import ../../utils/[emailUtils, tokenTypes, myStrutils]
import ../../utils/djangoDateTime/djangoDateTimeType
import ../../applicationSettings


export emailUtils.MailAuthenticationError
export authenticationModels

type MissingEmailError* = object of MissingValueError

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
proc getCampaignIdMembershipTable(connection: DbConn): Table[string, CampaignMemberships] =
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


proc getUserCampaignMemberships(connection: DbConn, user: User): CampaignMemberships =
    var userMemberships: CampaignMemberships = newMembershipTable()

    let campaignIdMembershipTable: Table[string, CampaignMemberships] = connection.getCampaignIdMembershipTable()

    let userGroups: seq[Group] = connection.getManyToMany(user, UserGroup, Group)
    for group in userGroups:
        let isCampaignGroup: bool = campaignIdMembershipTable.hasKey(group.name)
        if not isCampaignGroup:
            continue

        let campaignMemberships: CampaignMemberships = campaignIdMembershipTable[group.name]
        for campaignId in campaignMemberships.keys:
            userMemberships[campaignId] = campaignMemberships[campaignId]
    
    result = userMemberships

proc getUserContainer*(connection: DbConn, user: User): UserContainer =
    result.user = user
    result.campaignMemberships = connection.getUserCampaignMemberships(user)

proc getPermissions*(connection: DbConn, codeNames: seq[string]): seq[Permission] =
  const permissionTable = Permission.table()
  let partialConditions: seq[string] = codeNames.map(proc(s: string): string = fmt """{permissionTable}.codename = "{s}" """)
  let sqlCondition = partialConditions.join(" OR ")

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

proc sendPasswordResetConfirmationRequestEmail*(workflowDto: WorfklowStartResetDTO, confirmationRequestEntry: Confirmation) {.async.}=
  if workflowDto.user.email == "":
    raise newException(MissingEmailError, fmt"User '{workflowDto.user.username}' does not have an email address")

  let domain = settings.getSetting(SettingName.snServerDomain).getStr()

  let (subject, body) = getPasswordResetConfirmationRequestEmail(
    domain, 
    workflowDto.user.username, 
    workflowDto.user.id,
    confirmationRequestEntry.workflow_token
  )
  await sendSystemEmail(subject, body, workflowDto.user.toEmail(), settings)
  
  info fmt"User '{workflowDto.user.username}' requested a password reset. Email was sent to '{workflowDto.user.email}'"


proc sendPasswordResetEmail*(user: User, newPassword: string, settings: Settings) {.async.}=
  if user.email == "":
    raise newException(MissingEmailError, fmt"User '{user.username}' does not have an email address")

  let domain = settings.getSetting(SettingName.snServerDomain).getStr()

  let (subject, body) = getPasswordResetMail(newPassword, user.username, domain)
  await sendSystemEmail(subject, body, user.toEmail(), settings)
  
  info fmt"User '{user.username}' reset password and sent email to '{user.email}'"

proc resetUserPassword*(connection: DbConn, user: User): User =
  let newPassword = myStrutils.randomString(DEFAULT_RESET_PASSWORD_LENGTH)  
  var userMut = user
  return connection.updateUserPassword(userMut, newPassword)

proc resetUserPassword*(connection: DbConn, user_id: int64): User =
  var user: User = connection.getEntryById(user_id, User)
  return connection.resetUserPassword(user)

proc getAccessTokenData*(connection: DbConn, tokenLifetimeInDays: int64, token: string): TokenData =
  result = connection.getTokenData(tokenLifetimeInDays, token, access)

proc getRefreshTokenData*(connection: DbConn, tokenLifetimeInDays: int64, token: string): TokenData =
  result = connection.getTokenData(tokenLifetimeInDays, token, refresh)

proc invalidateToken*(connection: DbConn, token: string) =
  connection.blacklistToken(token)

proc createAuthToken*(connection: DbConn, userId: int64, tokenType: TokenType): TokenContainer =
  let creationTime = getTime().toUnix()
  result.`type` = tokenType
  result.created = creationTime
  
  for i in 0..1000:
    let token = generateToken()

    try:
      connection.insertToken(token, creationTime, userId, tokenType)
      result.token = token
      break

    except DbError:
      let isDuplicateToken: bool = getCurrentExceptionMsg() == "UNIQUE constraint failed: authtoken_token.key"
      if isDuplicateToken:
        continue
      else:
        raise

proc createAuthToken*(connection: DbConn, user: User, tokenType: TokenType): TokenContainer =
  result = connection.createAuthToken(user.id, tokenType)

proc createConfirmationRequest*(connection: DbConn, workflowDto: WorfklowStartResetDTO): Confirmation =
  let token = generateToken()
  var confirmation = Confirmation(
    user_id: workflowDto.user.id,
    workflow: workflowDto.workflow,
    workflow_token: token,
    creation_datetime: djangoDateTimeType.now(),
    update_datetime: djangoDateTimeType.now()
  )
  connection.insert(confirmation)
  return confirmation

proc getCurrentConfirmationState*(connection: DbConn, workflowDto: WorkflowConfirmDTO): Confirmation =
  result = connection.getWorkflowConfirmation(
    workflowDto.user_id, 
    workflowDto.token, 
    workflowDto.workflow, 
    workflowDto.workflowLifetimeInSeconds
  )

proc confirmWorkflow*(connection: DbConn, confirmationEntry: var Confirmation) =
  confirmationEntry.confirmed = true
  confirmationEntry.update_datetime = djangoDateTimeType.now()
  discard connection.updateEntryInTransaction(confirmationEntry)