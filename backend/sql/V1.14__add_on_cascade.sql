-- 1) AUTH_USER_USER_PERMISSIONS
-- Create a new table with the cascade constraints
CREATE TABLE auth_user_user_permissions_new (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
-- Copy data from the original table to the new table
INSERT INTO auth_user_user_permissions_new (id, user_id, permission_id)
SELECT id,
  user_id,
  permission_id
FROM auth_user_user_permissions;
-- Drop the original table
DROP TABLE auth_user_user_permissions;
-- Rename the new table to the original name
ALTER TABLE auth_user_user_permissions_new
  RENAME TO auth_user_user_permissions;
-- 2) AUTH_USER_GROUPS
-- Create a new table with the cascade constraints
CREATE TABLE auth_user_groups_new (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "group_id" integer NOT NULL REFERENCES "auth_group" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
-- Copy data from the original table to the new table
INSERT INTO auth_user_groups_new (id, user_id, group_id)
SELECT id,
  user_id,
  group_id
FROM auth_user_groups;
-- Drop the original table
DROP TABLE auth_user_groups;
-- Rename the new table to the original name
ALTER TABLE auth_user_groups_new
  RENAME TO auth_user_groups;
-- 3) GUARDIAN USEROBJECTPERMISSION
-- Create a new table with the cascade constraints
CREATE TABLE guardian_userobjectpermission_new (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "object_pk" varchar(255) NOT NULL,
  "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
-- Copy data from the original table to the new table
INSERT INTO guardian_userobjectpermission_new (
    id,
    object_pk,
    content_type_id,
    permission_id,
    user_id
  )
SELECT id,
  object_pk,
  content_type_id,
  permission_id,
  user_id
FROM guardian_userobjectpermission;
-- Drop the original table
DROP TABLE guardian_userobjectpermission;
-- Rename the new table to the original name
ALTER TABLE guardian_userobjectpermission_new
  RENAME TO guardian_userobjectpermission;
-- 4) USER_METADATA
-- Create a new table with the cascade constraints
CREATE TABLE user_metadata_new (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL REFERENCES auth_user (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  category varchar(200) NOT NULL,
  name varchar(200) NOT NULL,
  value varchar(200) NOT NULL,
  CONSTRAINT unique_group_key UNIQUE (name, value)
);
-- Copy data from the original table to the new table
INSERT INTO user_metadata_new (id, user_id, category, name, value)
SELECT id,
  user_id,
  category,
  name,
  value
FROM user_metadata;
-- Drop the original table
DROP TABLE user_metadata;
-- Rename the new table to the original name
ALTER TABLE user_metadata_new
  RENAME TO user_metadata;
-- 5) WIKIENTRIES_CAMPAIGNVISIT
-- Create a new table with the cascade constraints
CREATE TABLE wikientries_campaignvisit_new (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  campaign_id integer NOT NULL REFERENCES wikientries_campaign (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  user_id integer NOT NULL REFERENCES auth_user (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  last_visit datetime NOT NULL,
  CONSTRAINT unique_campaign_user UNIQUE (campaign_id, user_id)
);
-- Copy data from the original table to the new table
INSERT INTO wikientries_campaignvisit_new (id, campaign_id, user_id, last_visit)
SELECT id,
  campaign_id,
  user_id,
  last_visit
FROM wikientries_campaignvisit;
-- Drop the original table
DROP TABLE wikientries_campaignvisit;
-- Rename the new table to the original name
ALTER TABLE wikientries_campaignvisit_new
  RENAME TO wikientries_campaignvisit;
-- 6) TOKEN_BLACKLIST_OUTSTANDINGTOKEN
-- Create a new table with the cascade constraints
CREATE TABLE token_blacklist_outstandingtoken_new (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "token" text NOT NULL,
  "created_at" datetime NULL,
  "expires_at" datetime NOT NULL,
  "jti" varchar(255) NOT NULL UNIQUE,
  "user_id" integer NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
-- Copy data from the original table to the new table
INSERT INTO token_blacklist_outstandingtoken_new (id, token, created_at, expires_at, jti, user_id)
SELECT id,
  token,
  created_at,
  expires_at,
  jti,
  user_id
FROM token_blacklist_outstandingtoken;
-- Drop the original table
DROP TABLE token_blacklist_outstandingtoken;
-- Rename the new table to the original name
ALTER TABLE token_blacklist_outstandingtoken_new
  RENAME TO token_blacklist_outstandingtoken;
-- 7) AUTHTOKEN TOKEN
-- Create a new table with the cascade constraints
CREATE TABLE authtoken_token_new (
  "key" varchar(40) NOT NULL PRIMARY KEY,
  "created" datetime NOT NULL,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  blacklisted bool NOT NULL DEFAULT FALSE,
  tokenType varchar(10) NOT NULL DEFAULT "access"
);
-- Copy data from the original table to the new table
INSERT INTO authtoken_token_new (key, created, user_id, blacklisted, tokenType)
SELECT key,
  created,
  user_id,
  blacklisted,
  tokenType
FROM authtoken_token;
-- Drop the original table
DROP TABLE authtoken_token;
-- Rename the new table to the original name
ALTER TABLE authtoken_token_new
  RENAME TO authtoken_token;