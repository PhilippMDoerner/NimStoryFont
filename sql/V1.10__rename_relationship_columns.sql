ALTER TABLE wikientries_relationships
  RENAME COLUMN node1Guid TO sourceGuid;
ALTER TABLE wikientries_relationships
  RENAME COLUMN node2Guid TO targetGuid;