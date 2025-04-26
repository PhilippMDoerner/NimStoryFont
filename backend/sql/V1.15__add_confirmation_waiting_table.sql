CREATE TABLE user_confirmation_pending (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL REFERENCES auth_user (id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
  workflow varchar(200) NOT NULL,
  workflow_token varchar(200) NOT NULL,
  creation_datetime datetime NOT NULL,
  update_datetime datetime NOT NULL,
  confirmed bool NOT NULL
)