import ../applications/campaign/campaignService

proc fetchAllCampaignData(campaign: CampaignRead): CampaignSerializable =

proc main() =
  let campaigns = getAllCampaignReads()
  
main()