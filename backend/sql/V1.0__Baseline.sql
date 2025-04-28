CREATE TABLE IF NOT EXISTS "django_migrations" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "applied" datetime NOT NULL);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" ("group_id", "permission_id");
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");
CREATE TABLE IF NOT EXISTS "django_admin_log" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "action_time" datetime NOT NULL, "object_id" text NULL, "object_repr" varchar(200) NOT NULL, "change_message" text NOT NULL, "content_type_id" integer NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "user_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "action_flag" smallint unsigned NOT NULL CHECK ("action_flag" >= 0));
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" ("content_type_id");
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log" ("user_id");
CREATE TABLE IF NOT EXISTS "django_content_type" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL);
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" ("app_label", "model");
CREATE TABLE IF NOT EXISTS "auth_permission" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "codename" varchar(100) NOT NULL, "name" varchar(255) NOT NULL);
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" ("content_type_id", "codename");
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");
CREATE TABLE IF NOT EXISTS "auth_group" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(150) NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS "guardian_groupobjectpermission" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "object_pk" varchar(255) NOT NULL, "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "guardian_groupobjectpermission_group_id_permission_id_object_pk_3f189f7c_uniq" ON "guardian_groupobjectpermission" ("group_id", "permission_id", "object_pk");
CREATE INDEX "guardian_groupobjectpermission_content_type_id_7ade36b8" ON "guardian_groupobjectpermission" ("content_type_id");
CREATE INDEX "guardian_groupobjectpermission_group_id_4bbbfb62" ON "guardian_groupobjectpermission" ("group_id");
CREATE INDEX "guardian_groupobjectpermission_permission_id_36572738" ON "guardian_groupobjectpermission" ("permission_id");
CREATE INDEX "guardian_gr_content_ae6aec_idx" ON "guardian_groupobjectpermission" ("content_type_id", "object_pk");
CREATE TABLE IF NOT EXISTS "django_session" ("session_key" varchar(40) NOT NULL PRIMARY KEY, "session_data" text NOT NULL, "expire_date" datetime NOT NULL);
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session" ("expire_date");
CREATE TABLE IF NOT EXISTS "wikientries_encounterconnection" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "character_id" integer NOT NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, "encounter_id" integer NOT NULL REFERENCES "wikientries_encounter" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "wikientries_encounterconnection_character_id_08d16373" ON "wikientries_encounterconnection" ("character_id");
CREATE INDEX "wikientries_encounterconnection_encounter_id_08c3a523" ON "wikientries_encounterconnection" ("encounter_id");
CREATE TABLE IF NOT EXISTS "fileserver_sessionaudiotimestamp" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "time" integer unsigned NOT NULL CHECK ("time" >= 0), "encounter_id" integer NULL REFERENCES "wikientries_encounter" ("id") DEFERRABLE INITIALLY DEFERRED, "session_audio_id" integer NOT NULL REFERENCES "fileserver_sessionaudio" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "fileserver_sessionaudiotimestamp_encounter_id_43b40c42" ON "fileserver_sessionaudiotimestamp" ("encounter_id");
CREATE INDEX "fileserver_sessionaudiotimestamp_session_audio_id_58617ce0" ON "fileserver_sessionaudiotimestamp" ("session_audio_id");
CREATE UNIQUE INDEX "fileserver_sessionaudiotimestamp_session_audio_id_name_adbc660e_uniq" ON "fileserver_sessionaudiotimestamp" ("session_audio_id", "name");
CREATE UNIQUE INDEX "wikientries_encounterconnection_character_id_encounter_id_f497032a_uniq" ON "wikientries_encounterconnection" ("character_id", "encounter_id");
CREATE TABLE IF NOT EXISTS "token_blacklist_blacklistedtoken" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "blacklisted_at" datetime NOT NULL, "token_id" integer NOT NULL UNIQUE REFERENCES "token_blacklist_outstandingtoken" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE IF NOT EXISTS "wikientries_spellclassconnection" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "player_class_id" integer NOT NULL REFERENCES "wikientries_playerclass" ("id") DEFERRABLE INITIALLY DEFERRED, "spell_id" integer NOT NULL REFERENCES "wikientries_spell" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_spellclassconnection_spell_id_player_class_id_0c7e4704_uniq" ON "wikientries_spellclassconnection" ("spell_id", "player_class_id");
CREATE INDEX "wikientries_spellclassconnection_player_class_id_a91fd0ec" ON "wikientries_spellclassconnection" ("player_class_id");
CREATE INDEX "wikientries_spellclassconnection_spell_id_6bf08c4f" ON "wikientries_spellclassconnection" ("spell_id");
CREATE TABLE IF NOT EXISTS "wikientries_characterplayerclassconnection" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "character_id" integer NOT NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, "player_class_id" integer NOT NULL REFERENCES "wikientries_playerclass" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "wikientries_characterplayerclassconnection_character_id_2acff204" ON "wikientries_characterplayerclassconnection" ("character_id");
CREATE INDEX "wikientries_characterplayerclassconnection_player_class_id_c9b661b7" ON "wikientries_characterplayerclassconnection" ("player_class_id");
CREATE UNIQUE INDEX "wikientries_characterplayerclassconnection_character_id_player_class_id_94ffe609_uniq" ON "wikientries_characterplayerclassconnection" ("character_id", "player_class_id");
CREATE TABLE IF NOT EXISTS "auth_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "password" varchar(128) NOT NULL, "last_login" datetime NULL, "is_superuser" bool NOT NULL, "username" varchar(150) NOT NULL UNIQUE, "last_name" varchar(150) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" bool NOT NULL, "is_active" bool NOT NULL, "date_joined" datetime NOT NULL, "first_name" varchar(150) NOT NULL);
CREATE TABLE IF NOT EXISTS "wikientries_diaryentry" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "session_id" integer NOT NULL REFERENCES "wikientries_session" ("id") DEFERRABLE INITIALLY DEFERRED, "author_id" integer NOT NULL REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "title" varchar(200) NULL UNIQUE);
CREATE UNIQUE INDEX "wikientries_diaryentry_author_id_session_id_818d82f0_uniq" ON "wikientries_diaryentry" ("author_id", "session_id");
CREATE INDEX "wikientries_diaryentry_session_id_b1d40d7e" ON "wikientries_diaryentry" ("session_id");
CREATE INDEX "wikientries_diaryentry_author_id_fec0bd8f" ON "wikientries_diaryentry" ("author_id");
CREATE INDEX "wikientries_diaryentry_update_datetime_ef1b4c90" ON "wikientries_diaryentry" ("update_datetime");
CREATE TABLE IF NOT EXISTS "wikientries_quote" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "quote" text NOT NULL, "description" varchar(500) NULL, "encounter_id" integer NULL REFERENCES "wikientries_encounter" ("id") DEFERRABLE INITIALLY DEFERRED, "session_id" integer NOT NULL REFERENCES "wikientries_session" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_quote_session_id_encounter_id_quote_description_67ca61b6_uniq" ON "wikientries_quote" ("session_id", "encounter_id", "quote", "description");
CREATE INDEX "wikientries_quote_update_datetime_f4ea8791" ON "wikientries_quote" ("update_datetime");
CREATE INDEX "wikientries_quote_encounter_id_3999b0c0" ON "wikientries_quote" ("encounter_id");
CREATE INDEX "wikientries_quote_session_id_af7962fc" ON "wikientries_quote" ("session_id");
CREATE VIEW v_all_articles as
                select 'wikientries_character' AS table_name,
                    character.id AS record_id,
                    character.update_datetime,
                    character.campaign_id,
                    'wikientries_character' || character.id AS guid
                FROM wikientries_character AS character

                UNION

                select 'wikientries_creature' AS table_name,
                    creature.id AS record_id,
                    creature.update_datetime,
                    creature.campaign_id,
                    'wikientries_creature' || creature.id AS guid
                FROM wikientries_creature AS creature

                UNION

                select 'wikientries_diaryentry' AS table_name,
                    diaryentry.id AS record_id,
                    diaryentry.update_datetime,
                    session.campaign_id,
                    'wikientries_diaryentry' || diaryentry.id AS guid
                FROM wikientries_diaryentry AS diaryentry
                INNER JOIN wikientries_session AS session ON session.id = diaryentry.session_id

                UNION

                select 'wikientries_encounter' AS table_name,
                    encounter.id AS record_id,
                    encounter.update_datetime,
                    wikientries_session.campaign_id,
                    'wikientries_encounter' || encounter.id AS guid
                FROM wikientries_encounter AS encounter
                INNER JOIN wikientries_diaryentry ON encounter.diaryentry_id = wikientries_diaryentry.id
                INNER JOIN wikientries_session ON wikientries_session.id = wikientries_diaryentry.session_id

                UNION

                select 'wikientries_item' AS table_name,
                    item.id AS record_id,
                    item.update_datetime,
                    item.campaign_id,
                    'wikientries_item' || item.id AS guid
                FROM wikientries_item AS item

                UNION

                select 'wikientries_location' AS table_name,
                    location.id AS record_id,
                    location.update_datetime,
                    location.campaign_id,
                    'wikientries_location' || location.id AS guid
                FROM wikientries_location AS location

                UNION

                select 'map_map' AS table_name,
                    map.id AS record_id,
                    map.update_datetime,
                    map.campaign_id,
                    'map_map' || map.id AS guid
                FROM map_map AS map

                UNION

                select 'wikientries_organization' AS table_name,
                    organization.id AS record_id,
                    organization.update_datetime,
                    organization.campaign_id,
                    'wikientries_organization' || organization.id AS guid
                FROM wikientries_organization AS organization

                UNION

                select 'wikientries_quest' AS table_name,
                    quest.id AS record_id,
                    quest.update_datetime,
                    quest.campaign_id,
                    'wikientries_quest' || quest.id AS guid
                FROM wikientries_quest AS quest

                UNION

                select 'wikientries_rules' AS table_name,
                    rule.id AS record_id,
                    rule.update_datetime,
                    rule.campaign_id,
                    'wikientries_rules' || rule.id AS guid
                FROM wikientries_rules AS rule

                UNION

                select 'fileserver_sessionaudio' AS table_name,
                    sessionaudio.id AS record_id,
                    sessionaudio.update_datetime,
                    wikientries_session.campaign_id,
                    'fileserver_sessionaudio' || sessionaudio.id AS guid
                FROM fileserver_sessionaudio AS sessionaudio
                INNER JOIN wikientries_session ON sessionaudio.session_id = wikientries_session.id

                UNION

                select 'wikientries_spell' AS table_name,
                    spell.id AS record_id,
                    spell.update_datetime,
                    spell.campaign_id,
                    'wikientries_spell' || spell.id AS guid
                FROM wikientries_spell AS spell
/* v_all_articles(table_name,record_id,update_datetime,campaign_id,guid) */;
CREATE TABLE IF NOT EXISTS "wikientries_rules" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "description" text NOT NULL, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED, "name" varchar(200) NOT NULL);
CREATE UNIQUE INDEX "wikientries_rules_name_campaign_id_2cef25b7_uniq" ON "wikientries_rules" ("name", "campaign_id");
CREATE INDEX "wikientries_rules_update_datetime_58e54799" ON "wikientries_rules" ("update_datetime");
CREATE INDEX "wikientries_rules_campaign_id_5be92391" ON "wikientries_rules" ("campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_session" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "session_number" integer NOT NULL, "session_date" date NOT NULL, "is_main_session" bool NOT NULL, "end_day" integer NULL, "start_day" integer NULL, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "wikientries_session_session_number_bb0a14de" ON "wikientries_session" ("session_number");
CREATE INDEX "wikientries_session_is_main_session_62d8af22" ON "wikientries_session" ("is_main_session");
CREATE INDEX "wikientries_session_update_datetime_cd132f39" ON "wikientries_session" ("update_datetime");
CREATE INDEX "wikientries_session_campaign_id_005da328" ON "wikientries_session" ("campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_spell" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "spell_level" integer NOT NULL, "casting_time" varchar(20) NOT NULL, "range" varchar(20) NOT NULL, "duration" varchar(20) NOT NULL, "concentration" bool NOT NULL, "school" varchar(20) NOT NULL, "saving_throw" varchar(3) NULL, "damage" varchar(50) NULL, "description" text NOT NULL, "ritual" bool NOT NULL, "components" varchar(4) NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED, "name" varchar(200) NOT NULL);
CREATE UNIQUE INDEX "wikientries_spell_name_campaign_id_c980f529_uniq" ON "wikientries_spell" ("name", "campaign_id");
CREATE INDEX "wikientries_spell_update_datetime_d1c6456b" ON "wikientries_spell" ("update_datetime");
CREATE INDEX "wikientries_spell_campaign_id_16df1fea" ON "wikientries_spell" ("campaign_id");
CREATE UNIQUE INDEX "wikientries_session_campaign_id_session_number_is_main_session_b51e2bca_uniq" ON "wikientries_session" ("campaign_id", "session_number", "is_main_session");
CREATE INDEX "wikientries_diaryentry_session_id_author_id_33bf5aa5_idx" ON "wikientries_diaryentry" ("session_id", "author_id");
CREATE INDEX "wikientries_rules_name_campaign_id_2cef25b7_idx" ON "wikientries_rules" ("name", "campaign_id");
CREATE INDEX "wikientries_session_session_number_is_main_session_campaign_id_946c63d4_idx" ON "wikientries_session" ("session_number", "is_main_session", "campaign_id");
CREATE INDEX "wikientries_spell_name_campaign_id_c980f529_idx" ON "wikientries_spell" ("name", "campaign_id");
CREATE TABLE IF NOT EXISTS "fileserver_sessionaudio" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "audio_file" varchar(100) NOT NULL, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "session_id" integer NOT NULL UNIQUE REFERENCES "wikientries_session" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "fileserver_sessionaudio_update_datetime_c68c4978" ON "fileserver_sessionaudio" ("update_datetime");
CREATE TABLE IF NOT EXISTS "map_map" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "icon" varchar(200) NULL, "image" varchar(100) NOT NULL, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED, "name" varchar(200) NOT NULL);
CREATE UNIQUE INDEX "map_map_name_campaign_id_4ed083e8_uniq" ON "map_map" ("name", "campaign_id");
CREATE INDEX "map_map_update_datetime_110fdedd" ON "map_map" ("update_datetime");
CREATE INDEX "map_map_campaign_id_3f819ed3" ON "map_map" ("campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_campaign" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL UNIQUE, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "is_deactivated" bool NOT NULL, "admin_group_id" integer NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "admin_permission_id" integer NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED, "member_group_id" integer NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "member_permission_id" integer NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED, "background_image" varchar(400) NOT NULL, "guest_group_id" integer NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "guest_permission_id" integer NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED, "icon" varchar(400) NULL, "subtitle" varchar(1000) NULL, "default_map_id" integer NULL REFERENCES "map_map" ("id") DEFERRABLE INITIALLY DEFERRED, "has_audio_recording_permission" bool NOT NULL);
CREATE INDEX "wikientries_campaign_admin_group_id_43417742" ON "wikientries_campaign" ("admin_group_id");
CREATE INDEX "wikientries_campaign_admin_permission_id_5bc9abac" ON "wikientries_campaign" ("admin_permission_id");
CREATE INDEX "wikientries_campaign_member_group_id_ff7f6e56" ON "wikientries_campaign" ("member_group_id");
CREATE INDEX "wikientries_campaign_member_permission_id_d69890ed" ON "wikientries_campaign" ("member_permission_id");
CREATE INDEX "wikientries_campaign_guest_group_id_ebbc0427" ON "wikientries_campaign" ("guest_group_id");
CREATE INDEX "wikientries_campaign_guest_permission_id_d42b6216" ON "wikientries_campaign" ("guest_permission_id");
CREATE INDEX "wikientries_campaign_default_map_id_49c80f4a" ON "wikientries_campaign" ("default_map_id");
CREATE TABLE IF NOT EXISTS "wikientries_emptysearchresponse" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "text" varchar(1000) NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "wikientries_emptysearchresponse_campaign_id_34108df5" ON "wikientries_emptysearchresponse" ("campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_character" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "player_character" bool NOT NULL, "alive" bool NOT NULL, "name" varchar(200) NOT NULL, "gender" varchar(10) NOT NULL, "race" varchar(50) NOT NULL, "title" varchar(200) NULL, "description" text NULL, "current_location_id" integer NULL REFERENCES "wikientries_location" ("id") DEFERRABLE INITIALLY DEFERRED, "organization_id" integer NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_character_name_campaign_id_e3310678_uniq" ON "wikientries_character" ("name", "campaign_id");
CREATE INDEX "wikientries_character_current_location_id_039a02f1" ON "wikientries_character" ("current_location_id");
CREATE INDEX "wikientries_character_organization_id_dd076653" ON "wikientries_character" ("organization_id");
CREATE INDEX "wikientries_character_update_datetime_a956cd57" ON "wikientries_character" ("update_datetime");
CREATE INDEX "wikientries_character_campaign_id_1f3f7920" ON "wikientries_character" ("campaign_id");
CREATE INDEX "wikientries_character_name_campaign_id_e3310678_idx" ON "wikientries_character" ("name", "campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_creature" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "description" text NULL, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_creature_name_campaign_id_f7d681e8_uniq" ON "wikientries_creature" ("name", "campaign_id");
CREATE INDEX "wikientries_creature_update_datetime_5e07fc44" ON "wikientries_creature" ("update_datetime");
CREATE INDEX "wikientries_creature_campaign_id_72ac37d9" ON "wikientries_creature" ("campaign_id");
CREATE INDEX "wikientries_creature_name_campaign_id_f7d681e8_idx" ON "wikientries_creature" ("name", "campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_encounter" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "description" text NULL, "location_id" integer NULL REFERENCES "wikientries_location" ("id") DEFERRABLE INITIALLY DEFERRED, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "title" varchar(200) NULL, "diaryentry_id" integer NOT NULL REFERENCES "wikientries_diaryentry" ("id") DEFERRABLE INITIALLY DEFERRED, "order_index" integer NULL);
CREATE UNIQUE INDEX "wikientries_encounter_diaryentry_id_title_6012597d_uniq" ON "wikientries_encounter" ("diaryentry_id", "title");
CREATE UNIQUE INDEX "wikientries_encounter_diaryentry_id_order_index_5981bbca_uniq" ON "wikientries_encounter" ("diaryentry_id", "order_index");
CREATE INDEX "wikientries_encounter_location_id_97836c90" ON "wikientries_encounter" ("location_id");
CREATE INDEX "wikientries_encounter_update_datetime_a9f48e4d" ON "wikientries_encounter" ("update_datetime");
CREATE INDEX "wikientries_encounter_diaryentry_id_7d46dada" ON "wikientries_encounter" ("diaryentry_id");
CREATE TABLE IF NOT EXISTS "wikientries_item" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "description" text NULL, "owner_id" integer NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_item_name_campaign_id_da3bb68f_uniq" ON "wikientries_item" ("name", "campaign_id");
CREATE INDEX "wikientries_item_owner_id_e5c708b0" ON "wikientries_item" ("owner_id");
CREATE INDEX "wikientries_item_update_datetime_a94b43d4" ON "wikientries_item" ("update_datetime");
CREATE INDEX "wikientries_item_campaign_id_f4ac74c2" ON "wikientries_item" ("campaign_id");
CREATE INDEX "wikientries_item_name_campaign_id_da3bb68f_idx" ON "wikientries_item" ("name", "campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_location" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "description" text NULL, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED, "parent_location_id" integer NULL REFERENCES "wikientries_location" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_location_campaign_id_name_parent_location_id_5d549864_uniq" ON "wikientries_location" ("campaign_id", "name", "parent_location_id");
CREATE INDEX "wikientries_location_update_datetime_e0012ea3" ON "wikientries_location" ("update_datetime");
CREATE INDEX "wikientries_location_campaign_id_1fe294b8" ON "wikientries_location" ("campaign_id");
CREATE INDEX "wikientries_location_parent_location_id_fa89e7ac" ON "wikientries_location" ("parent_location_id");
CREATE INDEX "wikientries_location_campaign_id_name_parent_location_id_5d549864_idx" ON "wikientries_location" ("campaign_id", "name", "parent_location_id");
CREATE TABLE IF NOT EXISTS "wikientries_organization" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "leader" varchar(200) NULL, "description" text NULL, "headquarter_id" integer NULL REFERENCES "wikientries_location" ("id") DEFERRABLE INITIALLY DEFERRED, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_organization_name_campaign_id_ab42a448_uniq" ON "wikientries_organization" ("name", "campaign_id");
CREATE INDEX "wikientries_organization_headquarter_id_cfdb46be" ON "wikientries_organization" ("headquarter_id");
CREATE INDEX "wikientries_organization_update_datetime_55b32cb3" ON "wikientries_organization" ("update_datetime");
CREATE INDEX "wikientries_organization_campaign_id_39744dec" ON "wikientries_organization" ("campaign_id");
CREATE INDEX "wikientries_organization_name_campaign_id_ab42a448_idx" ON "wikientries_organization" ("name", "campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_quest" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(200) NOT NULL, "status" varchar(20) NOT NULL, "taker_id" integer NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, "abstract" varchar(65) NULL, "description" text NULL, "end_session_id" integer NULL REFERENCES "wikientries_session" ("id") DEFERRABLE INITIALLY DEFERRED, "giver_id" integer NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, "start_session_id" integer NOT NULL REFERENCES "wikientries_session" ("id") DEFERRABLE INITIALLY DEFERRED, "creation_datetime" datetime NOT NULL, "update_datetime" datetime NOT NULL, "campaign_id" integer NOT NULL REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE UNIQUE INDEX "wikientries_quest_name_campaign_id_8c1216b2_uniq" ON "wikientries_quest" ("name", "campaign_id");
CREATE INDEX "wikientries_quest_taker_id_08e02571" ON "wikientries_quest" ("taker_id");
CREATE INDEX "wikientries_quest_end_session_id_20644f95" ON "wikientries_quest" ("end_session_id");
CREATE INDEX "wikientries_quest_giver_id_b8a63a5d" ON "wikientries_quest" ("giver_id");
CREATE INDEX "wikientries_quest_start_session_id_26a5524d" ON "wikientries_quest" ("start_session_id");
CREATE INDEX "wikientries_quest_update_datetime_ffc780c5" ON "wikientries_quest" ("update_datetime");
CREATE INDEX "wikientries_quest_campaign_id_b68389bb" ON "wikientries_quest" ("campaign_id");
CREATE INDEX "wikientries_quest_name_campaign_id_8c1216b2_idx" ON "wikientries_quest" ("name", "campaign_id");
CREATE TABLE IF NOT EXISTS "wikientries_image" (
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
CREATE TABLE IF NOT EXISTS "wikientries_organization_member" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, 
  "member_id" integer NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "organization_id" integer NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED, 
  "role" varchar(400) NULL
);
CREATE VIRTUAL TABLE search_article_content USING fts5(
    title,
    title_rev,
    body,
    body_rev,
    table_name,
    record UNINDEXED,
    record_id,
    campaign_id,
    guid,
    tokenize = 'porter unicode61'
  )
/* search_article_content(title,title_rev,body,body_rev,table_name,record,record_id,campaign_id,guid) */;
CREATE TABLE IF NOT EXISTS 'search_article_content_data'(id INTEGER PRIMARY KEY, block BLOB);
CREATE TABLE IF NOT EXISTS 'search_article_content_idx'(segid, term, pgno, PRIMARY KEY(segid, term)) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS 'search_article_content_content'(id INTEGER PRIMARY KEY, c0, c1, c2, c3, c4, c5, c6, c7, c8);
CREATE TABLE IF NOT EXISTS 'search_article_content_docsize'(id INTEGER PRIMARY KEY, sz BLOB);
CREATE TABLE IF NOT EXISTS 'search_article_content_config'(k PRIMARY KEY, v) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS "map_marker" (
    "id" integer PRIMARY KEY AUTOINCREMENT,
    "icon" varchar(200),
    "longitude" integer NOT NULL,
    "latitude" integer NOT NULL,
    "map_id" integer NOT NULL,
    "location_id" integer NOT NULL,
    "type_id" integer,
    "creation_datetime" datetime NOT NULL,
    "update_datetime" datetime NOT NULL,
    "color" varchar(50),
    FOREIGN KEY ("type_id") REFERENCES "map_markertype" ("id") DEFERRABLE INITIALLY DEFERRED,
    FOREIGN KEY ("location_id") REFERENCES "wikientries_location" ("id") DEFERRABLE INITIALLY DEFERRED,
    FOREIGN KEY ("map_id") REFERENCES "map_map" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "wikientries_quoteconnection" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "character_id" integer NOT NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED,
  "quote_id" integer NOT NULL REFERENCES "wikientries_quote" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "wikientries_organization_relationship" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "organization_id" integer NOT NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED,
  "parent_organization_id" integer NOT NULL REFERENCES "wikientries_organization" ("id") DEFERRABLE INITIALLY DEFERRED,
  "relationship" varchar(400) NULL
);
CREATE TABLE IF NOT EXISTS "wikientries_relationship_type" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(50) NOT NULL,
  "icon" varchar(20),
  "color" varchar(20) NOT NULL,
  "weight" integer NOT NULL DEFAULT 1,
  "campaign_id" integer REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL
);
CREATE TABLE IF NOT EXISTS "wikientries_relationships" (
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
CREATE TABLE IF NOT EXISTS "map_markertype" (
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
CREATE TABLE IF NOT EXISTS "wikientries_playerclass" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" varchar(200) NOT NULL UNIQUE,
  "campaign_id" integer REFERENCES "wikientries_campaign" ("id") DEFERRABLE INITIALLY DEFERRED,
  "creation_datetime" datetime NOT NULL,
  "update_datetime" datetime NOT NULL
);
CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_groups" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "group_id" integer NOT NULL REFERENCES "auth_group" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "guardian_userobjectpermission" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "object_pk" varchar(255) NOT NULL,
  "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "wikientries_campaignvisit" (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  campaign_id integer NOT NULL REFERENCES wikientries_campaign (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  user_id integer NOT NULL REFERENCES auth_user (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  last_visit datetime NOT NULL,
  CONSTRAINT unique_campaign_user UNIQUE (campaign_id, user_id)
);
CREATE TABLE IF NOT EXISTS "token_blacklist_outstandingtoken" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "token" text NOT NULL,
  "created_at" datetime NULL,
  "expires_at" datetime NOT NULL,
  "jti" varchar(255) NOT NULL UNIQUE,
  "user_id" integer NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "authtoken_token" (
  "key" varchar(40) NOT NULL PRIMARY KEY,
  "created" datetime NOT NULL,
  "user_id" integer NOT NULL REFERENCES "auth_user" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  blacklisted bool NOT NULL DEFAULT FALSE,
  tokenType varchar(10) NOT NULL DEFAULT "access"
);
CREATE TABLE user_confirmation_pending (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL REFERENCES auth_user (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  workflow varchar(200) NOT NULL,
  workflow_token varchar(200) NOT NULL,
  creation_datetime datetime NOT NULL,
  update_datetime datetime NOT NULL,
  confirmed bool NOT NULL
);
CREATE TABLE user_metadata (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL REFERENCES auth_user (id) DEFERRABLE INITIALLY DEFERRED,
  category varchar(200) NOT NULL,
  name varchar(200) NOT NULL,
  value varchar(200) NOT NULL,
  CONSTRAINT unique_group_key UNIQUE (user_id, name, value)
);
