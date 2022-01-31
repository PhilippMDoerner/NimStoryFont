import campaignModel

proc `$`*(model: CampaignOverview | MinimumCampaignOverview | CampaignRead | Campaign): string = 
    result = model.name
