-- Create a temporary table to hold the data from the quoteconnection table
CREATE TABLE "wikientries_quoteconnection_temp" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "character_id" integer NOT NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED,
  "quote_id" integer NOT NULL
);

-- Copy the data from the quoteconnection table to the temporary table
INSERT INTO "wikientries_quoteconnection_temp" ("id", "character_id", "quote_id")
SELECT "id", "character_id", "quote_id" FROM "wikientries_quoteconnection";

-- Drop the old quoteconnection table
DROP TABLE "wikientries_quoteconnection";

-- Create the new quoteconnection table with the foreign key constraint
CREATE TABLE "wikientries_quoteconnection" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "character_id" integer NOT NULL REFERENCES "wikientries_character" ("id") DEFERRABLE INITIALLY DEFERRED,
  "quote_id" integer NOT NULL REFERENCES "wikientries_quote" ("id") ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED
);

-- Copy the data from the temporary table to the new quoteconnection table
INSERT INTO "wikientries_quoteconnection" ("id", "character_id", "quote_id")
SELECT "id", "character_id", "quote_id" FROM "wikientries_quoteconnection_temp";

-- Drop the temporary table
DROP TABLE "wikientries_quoteconnection_temp";