CREATE TABLE "wikientries_organization_member" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
  "member_id" integer NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "organization_id" integer NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "role" varchar(400) NULL
);

insert into wikientries_organization_member (member_id, organization_id, role)
SELECT id, organization_id, NULL
FROM wikientries_character
WHERE organization_id NOT NULL;
