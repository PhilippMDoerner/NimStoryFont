-- Create a new table map_marker2 with the Cascade Delete
CREATE TABLE "map_marker2" (
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

-- Copy the data from the old map_marker table to the new map_marker2 table
INSERT INTO map_marker2 (icon, longitude, latitude, map_id, location_id, type_id, creation_datetime, update_datetime, color)
SELECT 
    icon,
    longitude,
    latitude,
    map_id,
    location_id,
    type_id,
    creation_datetime,
    update_datetime,
    color
FROM map_marker;

-- Drop the old map_marker table
DROP TABLE map_marker;

-- Rename the new map_marker2 table to map_marker
ALTER TABLE map_marker2 RENAME TO map_marker;