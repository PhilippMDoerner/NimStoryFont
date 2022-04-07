import norm/[model, pragmas]
import ../../applicationSettings
import std/options
import constructor/defaults
import ../campaign/campaignModel
import ../../applicationConstants

type ImageType* = enum
    CHARACTERTYPE = "character", 
    CREATURETYPE = "creature", 
    ITEMTYPE = "item", 
    LOCATIONTYPE = "location", 
    ORGANIZATIONTYPE = "organization"

type ##[Exist solely to inform Image model to which table a given fk-model points]##
    ImageCharacter* {.defaults, tableName: CHARACTER_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageLocation* {.defaults, tableName: LOCATION_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageItem* {.defaults, tableName: ITEM_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageCreature* {.defaults, tableName: CREATURE_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageOrganization* {.defaults, tableName: ORGANIZATION_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(ImageCharacter)
proc newModel*(T: typedesc[ImageCharacter]): ImageCharacter = newImageCharacter()

implDefaults(ImageLocation)
proc newModel*(T: typedesc[ImageLocation]): ImageLocation = newImageLocation()

implDefaults(ImageItem)
proc newModel*(T: typedesc[ImageItem]): ImageItem = newImageItem()

implDefaults(ImageCreature)
proc newModel*(T: typedesc[ImageCreature]): ImageCreature = newImageCreature()

implDefaults(ImageOrganization)
proc newModel*(T: typedesc[ImageOrganization]): ImageOrganization = newImageOrganization()


type Image* {.defaults, tableName: IMAGE_TABLE.} = ref object of Model
    image*: string = "" #The actual image path
    name*: Option[string] = some("")
    character_article_id* {.fk: ImageCharacter.}: Option[int64] = none(int64)
    creature_article_id* {.fk: ImageCreature.}: Option[int64] = none(int64)
    item_article_id* {.fk: ImageItem.} : Option[int64] = none(int64)
    location_article_id* {.fk: ImageLocation.}: Option[int64] = none(int64)
    organization_article_id* {.fk: ImageOrganization.}: Option[int64] = none(int64)

implDefaults(Image)
proc newModel*(T: typedesc[Image]): Image = newImage()
