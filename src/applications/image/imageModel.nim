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
    ImageCharacter* {.defaults, readOnly, tableName: CHARACTER_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageLocation* {.defaults, readOnly, tableName: LOCATION_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageItem* {.defaults, readOnly, tableName: ITEM_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageCreature* {.defaults, readOnly, tableName: CREATURE_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

    ImageOrganization* {.defaults, readOnly, tableName: ORGANIZATION_TABLE.} = ref object of Model
        campaign_id* {.fk: Campaign.}: int64 = MODEL_INIT_ID

implDefaults(ImageCharacter, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


implDefaults(ImageLocation, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


implDefaults(ImageItem, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


implDefaults(ImageCreature, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})


implDefaults(ImageOrganization, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})



type Image* {.defaults, tableName: IMAGE_TABLE.} = ref object of Model
    image*: string = "" #The actual image path
    name*: Option[string] = some("")
    character_article_id* {.fk: ImageCharacter.}: Option[int64] = some(MODEL_INIT_ID)
    creature_article_id* {.fk: ImageCreature.}: Option[int64] = some(MODEL_INIT_ID)
    item_article_id* {.fk: ImageItem.} : Option[int64] = some(MODEL_INIT_ID)
    location_article_id* {.fk: ImageLocation.}: Option[int64] = some(MODEL_INIT_ID)
    organization_article_id* {.fk: ImageOrganization.}: Option[int64] = some(MODEL_INIT_ID)

implDefaults(Image, {DefaultFlag.defExported, DefaultFlag.defTypeConstr})

