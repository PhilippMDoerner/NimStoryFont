import { Observable, of } from 'rxjs';
import { OverviewItem } from 'src/app/_models/overview';
import { OrganizationService } from './organization.service';

export const dummyOrganizations: OverviewItem[] = [
  {
    article_type: 'organization',
    description:
      ' Magic is Chaos and sometimes people are in touch with this force. Though understanding and control we order the Chaos. It is only when we allow it to overcome us that...',
    pk: 17,
    name_full: 'Academy Of Schools',
    name: 'Academy Of Schools',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-10-12T15:33:07.176299Z',
  },
  {
    article_type: 'organization',
    description:
      ' The ruling family of Hallan. Loyal to Duke Aspen. Somewhat politically powerful as Hallan is an important trading post. Further make an effort to be very presentable and are well-practiced in...',
    pk: 13,
    name_full: 'Affingtons',
    name: 'Affingtons',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-12-22T16:40:48.834877Z',
  },
  {
    article_type: 'organization',
    description:
      ' The Aspen blood line is one of the main noble blood lines in Aldrune.\nTheir innate ability to sense motion and vibration has led to them being excellent hunters in the dark...',
    pk: 5,
    name_full: 'Aspen Blood',
    name: 'Aspen Blood',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-08-11T16:55:59.479546Z',
  },
  {
    article_type: 'organization',
    description:
      ' \nThe black feather blood line is one of the main noble blood lines in Aldrune.\nThose of this lineage have innate control over animals and can communicate with them freely and without...',
    pk: 6,
    name_full: 'Black Feather Blood',
    name: 'Black Feather Blood',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-07-19T10:15:03.064474Z',
  },
  {
    article_type: 'organization',
    description:
      " A guild of mercenaries protecting caravan's.\nAround for 20 years or so. Part of the guild faction supporting Mordred. Used to be led by Orman Ethelwick until I killed him.",
    pk: 14,
    name_full: 'Bronze Hoof guild',
    name: 'Bronze Hoof guild',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-12-06T21:19:17.466740Z',
  },
  {
    article_type: 'organization',
    description:
      ' A village made up of an unknown species, located somewhere in the desert hellscape we were telported to after our fight with Prince Somnis.\nRoughly somewhere upwards of 50 people in size,...',
    pk: 41,
    name_full: 'Bug people village',
    name: 'Bug people village',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-07-31T12:53:45.845264Z',
  },
  {
    article_type: 'organization',
    description:
      " The group of archangels that have their own stars. All of them have their own solar systems, as Lucifer's planetoid had.\nFen managed to find where Lucifer's star used to be.  Fen...",
    pk: 55,
    name_full: 'Celestial Archangelic Beings',
    name: 'Celestial Archangelic Beings',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-10-12T09:23:03.231654Z',
  },
  {
    article_type: 'organization',
    description:
      ' \nHolding more favour with the people than even that of the Aspen family, the Church of Brigantia has a presence in every common folks life. Their clerics care for the land...',
    pk: 1,
    name_full: 'Church of Brigantia',
    name: 'Church of Brigantia',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-08-03T16:15:22.612710Z',
  },
  {
    article_type: 'organization',
    description:
      ' \nThis Church keeps mostly to itself and its worshipers, exercising as little force over others as possible, however in times of tense relations between the Dwarves of the mountain who supply...',
    pk: 2,
    name_full: 'Church of Dunatis',
    name: 'Church of Dunatis',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-08-03T16:15:07.906083Z',
  },
  {
    article_type: 'organization',
    description:
      ' \nGeneral\nAdjudicators of battles. Healers of the wounded and in times gone by, hunters of the chaos touched who had given in to the power.\nThe Church of Morrigan has a bloody history,...',
    pk: 3,
    name_full: 'Church of Morrigan',
    name: 'Church of Morrigan',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-05-21T18:46:34.125916Z',
  },
  {
    article_type: 'organization',
    description:
      " \nThe Church of Silvanus holds power over the North in particular, where it's cathedral is located. The Church attracts many talented hunters and skilled explorers. The Church is in charge of...",
    pk: 4,
    name_full: 'Church of Silvanus',
    name: 'Church of Silvanus',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-08-03T16:14:50.614549Z',
  },
  {
    article_type: 'organization',
    description:
      ' An institution designed to create a diverse and thus group of individuals from all stratum who will determine who will be the next King when no clear line of succession is...',
    pk: 18,
    name_full: 'Council Of Succession',
    name: 'Council Of Succession',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-06-10T12:00:00.000000Z',
  },
  {
    article_type: 'organization',
    description:
      ' A group of scoundrels in Merren that are of key importance. Their leader is pretty well liked within the underground ecosystem, as they have the best scouts. She used to work...',
    pk: 37,
    name_full: 'Dock Hawks',
    name: 'Dock Hawks',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-05-02T12:04:47.463005Z',
  },
  {
    article_type: 'organization',
    description: " Were a group of dwarves from Fen's Era famed for their gems",
    pk: 23,
    name_full: 'Dwarrow {Status Unknown}',
    name: 'Dwarrow {Status Unknown}',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-13T12:00:00.000000Z',
  },
].map((entry) => ({
  ...entry,
  getAbsoluteRouterUrl: () => '/organization/123',
}));

export class OrganizationServiceMock implements Partial<OrganizationService> {
  campaignList(): Observable<OverviewItem[]> {
    return of(dummyOrganizations);
  }
}
