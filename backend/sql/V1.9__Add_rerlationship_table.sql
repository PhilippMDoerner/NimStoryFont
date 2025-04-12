CREATE TABLE "wikientries_relationships" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "node1Guid" varchar(50) NOT NULL,
  "node2Guid" varchar(50) NOT NULL,
  "label" varchar(200) NOT NULL,
  "weight" integer NOT NULL,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL,
  "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED
);