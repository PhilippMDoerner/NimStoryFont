UPDATE wikientries_character
SET name = REPLACE(name, '(', '{');
UPDATE wikientries_character
SET name = REPLACE(name, ')', '}');

UPDATE wikientries_location
SET name = REPLACE(name, '(', '{');
UPDATE wikientries_location
SET name = REPLACE(name, ')', '}');

UPDATE wikientries_creature
SET name = REPLACE(name, '(', '{');
UPDATE wikientries_creature
SET name = REPLACE(name, ')', '}');

UPDATE wikientries_organization
SET name = REPLACE(name, '(', '{');
UPDATE wikientries_organization
SET name = REPLACE(name, ')', '}');

UPDATE wikientries_quest
SET name = REPLACE(name, '(', '{');
UPDATE wikientries_quest
SET name = REPLACE(name, ')', '}');