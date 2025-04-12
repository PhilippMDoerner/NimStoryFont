CREATE TABLE "wikientries_organization_relationship" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "organization_id" integer NOT NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED,
  "parent_organization_id" integer NOT NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED,
  "relationship" varchar(400) NULL
)