CREATE TABLE wikientries_campaignvisit (
    id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
    campaign_id integer NOT NULL REFERENCES wikientries_campaign (id) DEFERRABLE INITIALLY DEFERRED,
    user_id integer NOT NULL REFERENCES auth_user (id) DEFERRABLE INITIALLY DEFERRED,
    last_visit datetime NOT NULL,
    CONSTRAINT unique_campaign_user UNIQUE (campaign_id, user_id)
);