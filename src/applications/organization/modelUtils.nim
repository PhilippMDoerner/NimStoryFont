import organizationModel

proc `$`*(model: OrganizationRead | Organization | OrganizationOverview): string =
    result = model.name