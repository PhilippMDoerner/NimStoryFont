export interface ApiObject {
  getAbsoluteRouterUrl: () => string;
  pk?: number;
}

export interface ArticleObject extends ApiObject {
  name: string | undefined;
  creation_datetime: string | undefined;
  update_datetime: string | undefined;
  description: string | undefined;
  campaign: number | undefined;
  campaign_details: MinimumCampaignOverview | undefined;
}

export interface MinimumCampaignOverview {
  name: string;
  id: number;
}
