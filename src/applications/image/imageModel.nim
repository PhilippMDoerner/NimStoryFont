import norm/[model, pragmas]
import ../../applicationSettings
import std/options
import ../character/characterModel

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

type Image* {.tableName: IMAGE_TABLE.} = ref object of Model
    image*: string
    name*: Option[string]
    character_article_id* {.fk: ImageCharacter.}: Option[int64]
    creature_article_id* {.fk: ImageCreature.}: Option[int64]
    item_article_id* {.fk: ImageItem.} : Option[int64]
    location_article_id* {.fk: ImageLocation.}: Option[int64]
    organization_article_id* {.fk: ImageOrganization.}: Option[int64]


proc newImage*(
    image = "",
    name = none(string),
    character_article_id = none(int64),
    creature_article_id = none(int64),
    item_article_id = none(int64),
    location_article_id = none(int64),
    organization_article_id = none(int64),
): Image = 
    result = Image(
        image: image,
        name: name,
        character_article_id: character_article_id,
        creature_article_id: creature_article_id,
        item_article_id: item_article_id,
        location_article_id: location_article_id,
        organization_article_id: organization_article_id
    )



proc newModel*(T: typedesc[Image]): Image =
    ##[Enables generic instantiation of the model. This enable the use of 
    generic methods that only read the database in genericArticleRepository ]##
    result = newImage()
