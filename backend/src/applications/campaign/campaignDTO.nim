import std/[options]
import prologue

type CampaignDTO* = ref object
  name*: string
  subtitle*: Option[string]
  backgroundImage*: UploadFile
  icon*: UploadFile
  mediaDirectory*: string

type CampaignUpdateDTO* = ref object
  pk*: int64
  name*: Option[string]
  subtitle*: Option[string]
  backgroundImage*: Option[UploadFile]
  icon*: Option[UploadFile]
  mediaDirectory*: string
  userTimestamp*: int
  default_map_id*: Option[int64]
