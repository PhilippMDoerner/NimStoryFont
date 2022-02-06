import norm/[model, pragmas]
import ../../applicationSettings
import std/options
import constructor/defaults

type ImageType* = enum
    CHARACTERTYPE = "character", 
    CREATURETYPE = "creature", 
    ITEMTYPE = "item", 
    LOCATIONTYPE = "location", 
    ORGANIZATIONTYPE = "organization"

type ##[Exist solely to inform Image model to which table a given fk-model points]##
    ImageCharacter {.tableName: CHARACTER_TABLE.} = ref object of Model
    ImageLocation {.tableName: LOCATION_TABLE.} = ref object of Model
    ImageItem {.tableName: ITEM_TABLE.} = ref object of Model
    ImageCreature {.tableName: CREATURE_TABLE.} = ref object of Model
    ImageOrganization {.tableName: ORGANIZATION_TABLE.} = ref object of Model

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
