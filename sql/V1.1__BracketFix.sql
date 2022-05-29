UPDATE wikientries_item
SET name = REPLACE(name, '(', '{');

UPDATE wikientries_item
SET name = REPLACE(name, ')', '}');