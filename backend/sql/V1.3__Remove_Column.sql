ALTER TABLE wikientries_image
RENAME TO wikientries_image_old;

CREATE TABLE "wikientries_image" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
  "image" varchar(400) NOT NULL, 
  "character_article_id" integer NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "creature_article_id" integer NULL REFERENCES "wikientries_creature" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "item_article_id" integer NULL REFERENCES "wikientries_item" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "location_article_id" integer NULL REFERENCES "wikientries_location" ("id") DEFERRABLE INITIALLY DEFERRED,
  "organization_article_id" integer NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "name" varchar(400) NULL, 
  CONSTRAINT "wikientries.models_Only_One_Article" CHECK ((
      ("character_article_id" IS NOT NULL AND "creature_article_id" IS NULL AND "item_article_id" IS NULL AND "location_article_id" IS NULL AND "organization_article_id" IS NULL) 
      OR ("character_article_id" IS NULL AND "creature_article_id" IS NOT NULL AND "item_article_id" IS NULL AND "location_article_id" IS NULL AND "organization_article_id" IS NULL)
      OR ("character_article_id" IS NULL AND "creature_article_id" IS NULL AND "item_article_id" IS NOT NULL AND "location_article_id" IS NULL AND "organization_article_id" IS NULL) 
      OR ("character_article_id" IS NULL AND "creature_article_id" IS NULL AND "item_article_id" IS NULL AND "location_article_id" IS NOT NULL AND "organization_article_id" IS NULL) 
      OR ("character_article_id" IS NULL AND "creature_article_id" IS NULL AND "item_article_id" IS NULL AND "location_article_id" IS NULL AND "organization_article_id" IS NOT NULL)
  ))
);

insert or ignore into wikientries_image (id, image, character_article_id, creature_article_id, item_article_id, location_article_id, organization_article_id, name) 
SELECT id, image, character_article_id, creature_article_id, item_article_id, location_article_id, organization_article_id, name
FROM wikientries_image_old;

DROP TABLE wikientries_image_old;