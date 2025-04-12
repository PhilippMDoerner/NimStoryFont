CREATE TABLE user_metadata (
  id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  user_id integer NOT NULL REFERENCES auth_user (id) DEFERRABLE INITIALLY DEFERRED,
  category varchar(200) NOT NULL,
  name varchar(200) NOT NULL,
  value varchar(200) NOT NULL,
  CONSTRAINT unique_group_key UNIQUE (name, value)
);