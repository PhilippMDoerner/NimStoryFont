-- WIKIENTRIES_RELATIONSHIP_TYPE
CREATE TABLE "wikientries_relationship_type" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(50) NOT NULL,
  "icon" varchar(20),
  "color" varchar(20) NOT NULL,
  "weight" integer NOT NULL DEFAULT 1,
  "campaign_id" integer REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL
);
-- Add first default value for all campaigns --
INSERT INTO wikientries_relationship_type (
    name,
    icon,
    color,
    campaign_id,
    creation_datetime,
    update_datetime
  )
VALUES (
    'default',
    NULL,
    '#999999',
    NULL,
    '2024-12-13 12:00:00',
    '2024-12-13 12:00:00'
  );
-- WIKIENTRIES_RELATIONSHIP - ADD LINK_TYPE_ID AND CAMPAIGN_ID 
-- Migrate wikientries_relationships to a table that has a link_type_id fk column
CREATE TABLE wikientries_relationships_new (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "sourceGuid" varchar(50) NOT NULL,
  "targetGuid" varchar(50) NOT NULL,
  "label" varchar(200) NOT NULL,
  "weight" integer,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL,
  "campaign_id" integer REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED,
  "link_type_id" integer NOT NULL DEFAULT 1,
  FOREIGN KEY (link_type_id) REFERENCES wikientries_relationship_type (id)
);
-- Copy the data from the old table to the new table
INSERT INTO wikientries_relationships_new (
    "id",
    "sourceGuid",
    "targetGuid",
    "label",
    "weight",
    "creation_datetime",
    "update_datetime",
    "campaign_id",
    "link_type_id"
  )
SELECT "id",
  "sourceGuid",
  "targetGuid",
  "label",
  "weight",
  "creation_datetime",
  "update_datetime",
  "campaign_id",
  1 --The id of the default entry
FROM wikientries_relationships;
-- Drop the old table
DROP TABLE wikientries_relationships;
-- Rename the new table to the old table's name
ALTER TABLE wikientries_relationships_new
  RENAME TO wikientries_relationships;
-- MAP_MARKERTYPE ADD CAMPAIGN_ID COLUMN
-- Extend map marker type to have an optional campaign_id column
CREATE TABLE map_markertype_new (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(50) NOT NULL,
  "icon" varchar(20) NOT NULL,
  "is_text_marker" bool NOT NULL,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL,
  "fontawesome_type" varchar(4) NOT NULL,
  "color" varchar(20) NOT NULL,
  "campaign_id" integer REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED
);
-- Copy the data from the old table to the new table
INSERT INTO map_markertype_new (
    "id",
    "name",
    "icon",
    "is_text_marker",
    "creation_datetime",
    "update_datetime",
    "fontawesome_type",
    "color",
    "campaign_id"
  )
SELECT "id",
  "name",
  "icon",
  "is_text_marker",
  "creation_datetime",
  "update_datetime",
  "fontawesome_type",
  "color",
  NULL AS "campaign_id"
FROM map_markertype;
-- Drop the old table
DROP TABLE map_markertype;
-- Rename the new table to the old table's name
ALTER TABLE map_markertype_new
  RENAME TO map_markertype;
-- WIKIENTRIES_PLAYERCLASS ADD CAMPAIGN_ID COLUMN
CREATE TABLE "wikientries_playerclass_new" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(200) NOT NULL UNIQUE,
  "campaign_id" integer REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL
);
-- Copy the data from the old table to the new table
INSERT INTO wikientries_playerclass_new (
    "id",
    "name",
    "campaign_id",
    "creation_datetime",
    "update_datetime"
  )
SELECT "id",
  "name",
  NULL,
  "creation_datetime",
  "update_datetime"
FROM wikientries_playerclass;
-- Drop the old table
DROP TABLE wikientries_playerclass;
-- Rename the new table to the old table's name
ALTER TABLE wikientries_playerclass_new
  RENAME TO wikientries_playerclass;