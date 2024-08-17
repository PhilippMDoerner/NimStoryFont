import std/[options]
import prologue

type CampaignDTO* = ref object
  name*: string
  subtitle*: Option[string]
  backgroundImage*: UploadFile
  icon*: UploadFile
  mediaDirectory*: string
