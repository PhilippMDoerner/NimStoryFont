import std/options
import prologue

type ImageDTO* = object
  imageFile*: Option[UpLoadFile]
  imageDirectory*: string
  imageName*: Option[string]
  image_character_fk*: Option[int64]
  image_creature_fk*: Option[int64]
  image_item_fk*: Option[int64]
  image_location_fk*: Option[int64]
  image_organization_fk*: Option[int64]

