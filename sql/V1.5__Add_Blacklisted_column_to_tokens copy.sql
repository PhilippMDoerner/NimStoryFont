DROP TABLE authtoken_token;

CREATE TABLE "authtoken_token" (
    "key" varchar(40) NOT NULL PRIMARY KEY, 
    "created" datetime NOT NULL, 
    "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, 
    blacklisted bool NOT NULL DEFAULT FALSE,
    tokenType varchar(10) NOT NULL DEFAULT "access"
)