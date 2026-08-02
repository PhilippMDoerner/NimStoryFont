-- Drop dependent view(s)
DROP VIEW IF EXISTS v_all_articles;

-- If you have FTS5 triggers or an FTS5 virtual table that references
-- wikientries_diaryentry, drop those here as well.
-- Example:
-- DROP TRIGGER IF EXISTS wikientries_diaryentry_ai;
-- DROP TRIGGER IF EXISTS wikientries_diaryentry_au;
-- DROP TRIGGER IF EXISTS wikientries_diaryentry_ad;
-- DROP TABLE IF EXISTS wikientries_diaryentry_fts;

-- Create replacement table without UNIQUE(title)
CREATE TABLE wikientries_diaryentry_new (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL
        REFERENCES wikientries_session(id)
        DEFERRABLE INITIALLY DEFERRED,
    author_id INTEGER NOT NULL
        REFERENCES auth_user(id)
        DEFERRABLE INITIALLY DEFERRED,
    creation_datetime DATETIME NOT NULL,
    update_datetime DATETIME NOT NULL,
    title VARCHAR(200)
);

-- Copy data
INSERT INTO wikientries_diaryentry_new (
    id,
    session_id,
    author_id,
    creation_datetime,
    update_datetime,
    title
)
SELECT
    id,
    session_id,
    author_id,
    creation_datetime,
    update_datetime,
    title
FROM wikientries_diaryentry;

-- Drop old table
DROP TABLE wikientries_diaryentry;

-- Rename replacement
ALTER TABLE wikientries_diaryentry_new
RENAME TO wikientries_diaryentry;

-- Recreate indexes
CREATE UNIQUE INDEX wikientries_diaryentry_author_id_session_id_818d82f0_uniq
    ON wikientries_diaryentry(author_id, session_id);

CREATE INDEX wikientries_diaryentry_session_id_b1d40d7e
    ON wikientries_diaryentry(session_id);

CREATE INDEX wikientries_diaryentry_author_id_fec0bd8f
    ON wikientries_diaryentry(author_id);

CREATE INDEX wikientries_diaryentry_update_datetime_ef1b4c90
    ON wikientries_diaryentry(update_datetime);

CREATE INDEX wikientries_diaryentry_session_id_author_id_33bf5aa5_idx
    ON wikientries_diaryentry(session_id, author_id);

-- Recreate the view
CREATE VIEW v_all_articles AS
SELECT 'wikientries_character' AS table_name,
       character.id AS record_id,
       character.update_datetime,
       character.campaign_id,
       'wikientries_character' || character.id AS guid
FROM wikientries_character AS character

UNION

SELECT 'wikientries_creature',
       creature.id,
       creature.update_datetime,
       creature.campaign_id,
       'wikientries_creature' || creature.id
FROM wikientries_creature AS creature

UNION

SELECT 'wikientries_diaryentry',
       diaryentry.id,
       diaryentry.update_datetime,
       session.campaign_id,
       'wikientries_diaryentry' || diaryentry.id
FROM wikientries_diaryentry AS diaryentry
JOIN wikientries_session AS session
  ON session.id = diaryentry.session_id

UNION

SELECT 'wikientries_encounter',
       encounter.id,
       encounter.update_datetime,
       wikientries_session.campaign_id,
       'wikientries_encounter' || encounter.id
FROM wikientries_encounter AS encounter
JOIN wikientries_diaryentry
  ON encounter.diaryentry_id = wikientries_diaryentry.id
JOIN wikientries_session
  ON wikientries_session.id = wikientries_diaryentry.session_id

UNION

SELECT 'wikientries_item',
       item.id,
       item.update_datetime,
       item.campaign_id,
       'wikientries_item' || item.id
FROM wikientries_item AS item

UNION

SELECT 'wikientries_location',
       location.id,
       location.update_datetime,
       location.campaign_id,
       'wikientries_location' || location.id
FROM wikientries_location AS location

UNION

SELECT 'map_map',
       map.id,
       map.update_datetime,
       map.campaign_id,
       'map_map' || map.id
FROM map_map AS map

UNION

SELECT 'wikientries_organization',
       organization.id,
       organization.update_datetime,
       organization.campaign_id,
       'wikientries_organization' || organization.id
FROM wikientries_organization AS organization

UNION

SELECT 'wikientries_quest',
       quest.id,
       quest.update_datetime,
       quest.campaign_id,
       'wikientries_quest' || quest.id
FROM wikientries_quest AS quest

UNION

SELECT 'wikientries_rules',
       rule.id,
       rule.update_datetime,
       rule.campaign_id,
       'wikientries_rules' || rule.id
FROM wikientries_rules AS rule

UNION

SELECT 'fileserver_sessionaudio',
       sessionaudio.id,
       sessionaudio.update_datetime,
       wikientries_session.campaign_id,
       'fileserver_sessionaudio' || sessionaudio.id
FROM fileserver_sessionaudio AS sessionaudio
JOIN wikientries_session
  ON sessionaudio.session_id = wikientries_session.id

UNION

SELECT 'wikientries_spell',
       spell.id,
       spell.update_datetime,
       spell.campaign_id,
       'wikientries_spell' || spell.id
FROM wikientries_spell AS spell;
