import campaignModel
import std/strformat

proc `$`*(model: CampaignOverview | MinimumCampaignOverview | CampaignRead | Campaign): string = 
  result = model.name

proc guestPermissionName*(instance: Campaign): string = fmt "Is {instance.name} guest"
proc memberPermissionName*(instance: Campaign): string = fmt "Is {instance.name} campaign member"
proc adminPermissionName*(instance: Campaign): string = fmt "Is {instance.name} admin"  

proc guestPermissionCodename*(instance: Campaign): string = fmt "{instance.name}_read_campaign_permission"
proc memberPermissionCodename*(instance: Campaign): string = "add_change_delete_{instance.name}_campaign_permission" 
proc adminPermissionCodename*(instance: Campaign): string = "admin_{instance.name}_campaign_permission"

proc guestGroupName*(instance: Campaign): string = "{instance.name}_guest_campaign_group"
proc memberGroupName*(instance: Campaign): string = "{instance.name}_campaign_group" 
proc adminGroupName*(instance: Campaign): string = "{instance.name}_campaign_admin_group" 
