import ./authenticationModels
import ../user/userModel

type WorkflowConfirmDTO* = object
  token*: string
  user_id*: int64
  workflow*: WorkflowType
  workflowLifetimeInSeconds*: int

type WorfklowStartResetDTO* = object
  user*: User
  workflow*: WorkflowType
