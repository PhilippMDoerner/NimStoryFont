import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { OverviewItem } from 'src/app/_models/overview';
import { GeneralOverviewComponent } from './general-overview.component';

const dummyCharacters: OverviewItem[] = [
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gandalf',
    pk: 1,
    name_full: 'Gandalf the Grey',
    player_character: true,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Frodo',
    pk: 2,
    name_full: 'Frodo Baggins',
    player_character: true,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gimli',
    pk: 3,
    name_full: 'Gimli son of Glóin',
    player_character: false,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Legolas',
    pk: 4,
    name_full: 'Legolas Greenleaf',
    player_character: false,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Bilbo',
    pk: 5,
    name_full: 'Bilbo Baggins',
    player_character: false,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Aragorn',
    pk: 6,
    name_full: 'Aragorn son of Arathorn',
    player_character: false,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Saruman',
    pk: 7,
    name_full: 'Saruman the White',
    player_character: false,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Sif',
    pk: 18,
    name_full: 'Sif the Swift',
    description:
      'Sif is a skilled warrior known for her lightning-fast strikes and agility. She is fiercely loyal to her friends and will stop at nothing to protect them.',
    update_datetime: '2022-03-15T10:30:00.000Z',
    player_character: true,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gorin',
    pk: 19,
    name_full: 'Gorin Ironfist',
    description:
      'Gorin is a dwarf from the Iron Hills, known for his strength and unwavering determination. He has a fondness for ale and a good brawl.',
    update_datetime: '2022-02-23T14:15:00.000Z',
    player_character: true,
    images: [
      '/assets/default_images/background_default.webp',
      '/assets/default_images/background_default.webp',
    ],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Lirien',
    pk: 20,
    name_full: 'Lirien Windrider',
    description:
      'Lirien is an elven archer, renowned for her skill with the bow. She is fiercely independent and often clashes with authority figures.',
    update_datetime: '2022-03-20T08:45:00.000Z',
    player_character: true,
    images: ['/assets/default_images/background_default.webp'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
];

const dummyCreatures: OverviewItem[] = [
  {
    article_type: 'creature',
    description:
      'A wolf infused by chaos. The final stage of its transformation into a being that embodies chaos. Can teleport and whip its tentacles around.',
    pk: 3,
    name: 'Chaos Wolf - Stage 3',
    name_full: 'Chaos Wolf - Stage 3',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-06-10T12:00:00.000000Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      "Chimeras are unnatural magical amalgamations of other creatures, such as dragons, lions and goats. These creatures were created by the academy once upon a time through dragon's blood, back in the...",
    pk: 16,
    name: 'Chimera',
    name_full: 'Chimera',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-01-01T15:53:09.343803Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      'Wyverns in general are creatures that work with venoms. However, coastal wyverns are more brutish than there more inland-cousins. They rely on shock-tactics and frontal assaults to kill their prety, using...',
    pk: 10,
    name: 'Coastal Wyvern',
    name_full: 'Coastal Wyvern',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-08-01T16:56:12.663451Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      'Devils are a wide spread group of creatures. They, particularly the warrior devils among them, define themselves almost entirely by participating in the bloodwar.\nThose that do not participate are ostracized as...',
    pk: 14,
    name: 'Devil Outcasts',
    name_full: 'Devil Outcasts',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-09-09T15:08:52.261056Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      'Dragons are less creatures and more forces of nature. It would be more apt to describe them to a sentient storm or earthquake in scale of their power than to a...',
    pk: 8,
    name: 'Dragons',
    name_full: 'Dragons',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-01-24T11:29:37.226502Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      'A gigantic type of worm that appears to reside within the ashen grey plane north of the dried out riverbed. We have seen one of them in there so far. Distinctly...',
    pk: 23,
    name: 'Gargantuan Dune Worm',
    name_full: 'Gargantuan Dune Worm',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-07-26T17:27:54.172382Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      "A bat like creature the size of a man. Bat-like wings, but also faceless. It evades divine sense and can't be seen normally. Does disappear at the sight of daylight apparently....",
    pk: 34,
    name: 'Gaunt',
    name_full: 'Gaunt',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-01-18T20:17:04.487036Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
  {
    article_type: 'creature',
    description:
      "A creature first encountered in the marsh-waters of the Wildheart Woodlands near the hag's camp. Massively oversized leeches, easily reaching the size of a wolf that are luckily blind, but easily...",
    pk: 18,
    name: 'Giant Leech',
    name_full: 'Giant Leech',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-01-07T19:05:49.047964Z',
    getAbsoluteRouterUrl: () => '/creature/123',
  },
];

const dummyLocations: OverviewItem[] = [
  {
    article_type: 'location',
    description:
      ' The ocean east of Aldrune, now accessible through the path carved by the world serpent.',
    pk: 206,
    name_full: 'Eastern sea',
    name: 'Eastern sea',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-11-12T20:20:56.008470Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description: ' A town on the eastern edge of Aldrune.',
    pk: 25,
    name_full: 'Eastfife',
    name: 'Eastfife',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:34:19.493763Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' The civilization that created it and structures on the island of heroes were known for their anti-magic. They suppressed the magical abilities of everybody and then beat them on that non-magical...',
    pk: 272,
    name_full: 'Elevator',
    name: 'Elevator',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-12-06T21:35:20.848467Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' A small village, farming community, near the equinox stones. Very reminiscent of Willow before it burned down.',
    pk: 257,
    name_full: 'Equinia',
    name: 'Equinia',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-04-16T14:50:13.971556Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      " A place of standing stones mentioned by Kace. They are said to have sealed away chaos and a creature of the black blood.\nThere's a saying surrounding it that we were told...",
    pk: 35,
    name_full: 'Equinox Stones',
    name: 'Equinox Stones',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-04-16T15:59:17.118115Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description: " The capital of Aldrune, guarded by Mannan's Gullet.",
    pk: 11,
    name_full: 'Etruscan',
    name: 'Etruscan',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:34:19.509444Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description: ' Headquarters of the Whisper-Rend Blood.',
    pk: 15,
    name_full: 'Farhold',
    name: 'Farhold',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:34:19.515376Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' The Farmland of Etruscan located in the upper dirtside. Not in use during winter and thus used as grounds for festivals such as Winter Solstice.',
    pk: 173,
    name_full: 'Etruscan - Upper Dirtside - Farmland',
    name: 'Farmland',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-02-14T14:12:03.252267Z',
    parent_location_details: {
      pk: 97,
      name: 'Upper Dirtside',
      name_full: 'Upper Dirtside',
      parent_location: 'Etruscan',
    },
    parent_location: 97,
  },
  {
    article_type: 'location',
    description:
      ' The house in which Felicia Foghound and her adjutants used to sleep during the day. It now sports several holes from our encounter with her where Murtagh blew the walls open...',
    pk: 185,
    name_full: 'Merren - Mud lands - Felicia Foghounds Manor',
    name: 'Felicia Foghounds Manor',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-06-20T18:18:40.578499Z',
    parent_location_details: {
      pk: 183,
      name: 'Mud lands',
      name_full: 'Mud lands',
      parent_location: 'Merren',
    },
    parent_location: 183,
  },
  {
    article_type: 'location',
    description:
      ' A shop to buy metal goods from, armor and weapon. Recommended by Trumble.',
    pk: 66,
    name_full: 'Hallan - Fellhammer',
    name: 'Fellhammer',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:58:13.279086Z',
    parent_location_details: {
      pk: 3,
      name: 'Hallan',
      name_full: 'Hallan',
      parent_location: 1,
    },
    parent_location: 3,
  },
  {
    article_type: 'location',
    description: ' ',
    pk: 22,
    name_full: 'Felliman Bay',
    name: 'Felliman Bay',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:34:19.521416Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description: ' ',
    pk: 21,
    name_full: 'Fellman',
    name: 'Fellman',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:34:19.527967Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      " A place that, according to Fen, was created by the Firbolg, who ruled the land before the Hobgoblins came. The black chaos griffon escaped towards this place and bled out here.\nRanger's...",
    pk: 19,
    name_full: 'Firbolg Cliff Face',
    name: 'Firbolg Cliff Face',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:34:19.534127Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' A ship made of - at least to some degree - enchanted whalebone, allowing it to fly. They do not pay tribute to Manannan and Manannan can not find them as...',
    pk: 193,
    name_full: 'Flying Whalebone Ship',
    name: 'Flying Whalebone Ship',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-07-31T11:53:53.751627Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' A very high-class inn owned by Fraich, an elven companion of Forallian.\nThe atmosphere is of one that would fit to old war-buddies exchanging stories or bygone sea-captains telling stories of old...',
    pk: 135,
    name_full: 'Etruscan - Guild Quarters - Fraich Arc',
    name: 'Fraich Arc',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-03-09T21:56:27.502563Z',
    parent_location_details: {
      pk: 126,
      name: 'Guild Quarters',
      name_full: 'Guild Quarters',
      parent_location: 'Etruscan',
    },
    parent_location: 126,
  },
  {
    article_type: 'location',
    description:
      ' A mountain range, part of which is Frank. The cave of Barbatos is located here, guarded by him.',
    pk: 162,
    name_full: "Frank's Mountain Range",
    name: "Frank's Mountain Range",
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-11-27T20:44:06.734835Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' An inn down the road of the fancyful ferret. We slept there after our first outing in the fancyful ferret. Fairly expensive.',
    pk: 78,
    name_full: 'Loom Arrow - Galdian',
    name: 'Galdian',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-23T10:58:13.443928Z',
    parent_location_details: {
      pk: 5,
      name: 'Loom Arrow',
      name_full: 'Loom Arrow',
      parent_location: 1,
    },
    parent_location: 5,
  },
  {
    article_type: 'location',
    description:
      " A hidden village in the east of Aldrune. They make draconic glass and have a strong ties to dragons.\nThe O'Dyny settled with them for a time, but then split off after...",
    pk: 267,
    name_full: 'Gallowglass',
    name: 'Gallowglass',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-08-30T20:34:09.958811Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      " The New Capital of Fen's High Kingdom\n \nGalway City Breakdown\nEastern Lakeway - 15 BuildingsWestern Lakeway - 40 BuildingsMyria Island - 7 BuildingsRiver District - 46 Buildings, several temporary Refugee SheltersForest District -...",
    pk: 50,
    name_full: 'Galway',
    name: 'Galway',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-05-31T16:10:30.061953Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' A location in the Galway region, a small settlement once, not really known for much but being traders with the Dwarrow',
    pk: 46,
    name_full: 'Teeth of Galway - Glenrie Ruins',
    name: 'Glenrie Ruins',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-09-13T10:55:52.560792Z',
    parent_location_details: {
      pk: 146,
      name: 'Teeth of Galway',
      name_full: 'Teeth of Galway',
      parent_location: 1,
    },
    parent_location: 146,
  },
  {
    article_type: 'location',
    description:
      ' A rocky beach, consists mostly of pebbles and has a lot of shellfish.',
    pk: 101,
    name_full: 'Etruscan - Glimhorgan Beach',
    name: 'Glimhorgan Beach',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-24T08:09:06.600687Z',
    parent_location_details: {
      pk: 11,
      name: 'Etruscan',
      name_full: 'Etruscan',
      parent_location: 1,
    },
    parent_location: 11,
  },
  {
    article_type: 'location',
    description:
      " A mountainrange in the southeast corner Aldrune.  In it's southern portion is a Volcano created by a young Fen",
    pk: 24,
    name_full: 'God Peaks',
    name: 'God Peaks',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-25T07:05:26.382064Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' The iron heart of aldrune, center of all forging activities here and key for metal equipment and tool supply chains. Currently headquarters of the stricken blood.',
    pk: 13,
    name_full: 'Godrick Vale',
    name: 'Godrick Vale',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-05-29T10:34:03.945996Z',
    parent_location_details: {
      pk: 1,
      name: 'none',
      name_full: 'none',
      parent_location: 1,
    },
    parent_location: 1,
  },
  {
    article_type: 'location',
    description:
      ' A statue of the blackhound, that Bathilde commissioned from Shale.',
    pk: 169,
    name_full:
      'Etruscan - Guild Quarters - Public Docks and Fishing Werfs - Wooden Statue of the Blackhound',
    name: 'Wooden Statue of the Blackhound',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-01-24T11:25:58.611061Z',
    parent_location_details: {
      pk: 111,
      name: 'Public Docks and Fishing Werfs',
      name_full: 'Public Docks and Fishing Werfs',
      parent_location: 'Guild Quarters',
    },
    parent_location: 111,
  },
  {
    article_type: 'location',
    description:
      ' A place where the last king of the storm giants used to house, waiting for their moment to make a return.\nAlso called "Odin\'s hold".',
    pk: 176,
    name_full: 'Aldrunian Sea - Wound of the world',
    name: 'Wound of the world',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-11-02T19:15:45.515776Z',
    parent_location_details: {
      pk: 157,
      name: 'Aldrunian Sea',
      name_full: 'Aldrunian Sea',
      parent_location: 1,
    },
    parent_location: 157,
  },
].map((loc) => ({ ...loc, getAbsoluteRouterUrl: () => '/location/123' }));

const dummyOrganizations: OverviewItem[] = [
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

const dummyItems: OverviewItem[] = [
  {
    article_type: 'item',
    description:
      ' These belong to head researcher Agrippina. They detail the complex we found an illithid base in. The core at the bottom is the "cold gold", a source of immense celestial power...',
    pk: 159,
    name_full: 'Abyssal Schematics',
    name: 'Abyssal Schematics',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-11-22T20:59:00.832111Z',
  },
  {
    article_type: 'item',
    description:
      ' A book gained from the Academy Wing in Galway, specifically a small library room with 4 shelves and exotic birds.\nHas a strange humanoid shark person on the cover, which I know...',
    pk: 149,
    name_full: 'Academy Wing Book on Aboleths',
    name: 'Academy Wing Book on Aboleths',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-10-11T21:41:23.089507Z',
  },
  {
    article_type: 'item',
    description:
      ' A set of adamantine plate that was on the violet storm when Murtagh acquired it.',
    pk: 55,
    name_full: 'Adamantine Plate',
    name: 'Adamantine Plate',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-04-20T18:32:17.650720Z',
  },
  {
    article_type: 'item',
    description:
      " An ornate lamp always hanging on Rhiannon's hip. It is larger on the inside, giving it enough space to be a beautiful home to Ahjuu as well as her complete collection...",
    pk: 18,
    name_full: "Ahjuu's Lamp",
    name: "Ahjuu's Lamp",
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-11-08T23:22:30.965195Z',
  },
  {
    article_type: 'item',
    description:
      " \n\nTo those trusted few,\nI've left off the broken path, same as I did months ago when I left home. I told you all that I left to explore the world, make...",
    pk: 31,
    name_full: "Ailis' Note To the Group",
    name: "Ailis' Note To the Group",
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-11-26T12:29:09.444727Z',
  },
  {
    article_type: 'item',
    description:
      ' These originally 4 shards were found in the vault of the temple of Anubis. They are consumable items.\nAs a bonus action they transform into any melee weapon. They deal an additional...',
    pk: 109,
    name_full: 'Amber Shards {1}',
    name: 'Amber Shards {1}',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-01-18T18:16:49.305128Z',
  },
  {
    article_type: 'item',
    description:
      ' A magical strange cross-bow like weapon found in the ruins of Salus, specifically in a safe in the Oversight section.\nIt functions as a crossbow or a pistol would. It has 2...',
    pk: 126,
    name_full: 'Anti-matter pistol',
    name: 'Anti-matter pistol',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-11-29T18:09:52.933907Z',
  },
  {
    article_type: 'item',
    description:
      ' Features\nIt is a +2 weapon, requires attunement to unsheathe.\nAs an action it can be drawn, strike and resheathe it. That acts as a steelwind-strike spell, can be done 1/week, any more...',
    pk: 16,
    name_full: 'Areppū',
    name: 'Areppū',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-08-09T19:52:52.086208Z',
  },
  {
    article_type: 'item',
    description:
      " A booklet that is synced up with Aridhel's personal diary. It updates itself every dawn and its contents are not to be shared. Through it she shares commands, information, personal musings...",
    pk: 72,
    name_full: "Aridhel's booklet",
    name: "Aridhel's booklet",
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-01-24T12:33:42.693831Z',
  },
  {
    article_type: 'item',
    description:
      ' Forged in the Anubis temple. +1 Studded leather armor.While attuned to it you can once per long rest cast Bless as a bonus action targeting only yourself, lasting 1 hour without...',
    pk: 145,
    name_full: 'Armor of Tears',
    name: 'Armor of Tears',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-02-21T22:23:59.974852Z',
  },
  {
    article_type: 'item',
    description:
      " The sword that held Lancelot's soul previously, having a huge capacity for magical energies of 300 charges. It is currently inert (100/300). When anyone touches the sword while casting a spell...",
    pk: 86,
    name_full: 'Arondight',
    name: 'Arondight',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-11-09T17:07:56.382942Z',
  },
  {
    article_type: 'item',
    description:
      ' A stake made of Aspenwood. If driven through the heart of a vampire, instead of killing them, it paralyzes them.',
    pk: 98,
    name_full: 'Aspenwood Stake',
    name: 'Aspenwood Stake',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-06-13T07:42:18.707462Z',
  },
  {
    article_type: 'item',
    description:
      " This glorious +3 axe is so full of magical energy it feels almost like it's about to burst to anyone with any magical sense in the vicinity. Rhiannon gained it by...",
    pk: 94,
    name_full: 'Axe of the dwarven lords',
    name: 'Axe of the dwarven lords',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-05-25T19:55:17.102622Z',
  },
  {
    article_type: 'item',
    description:
      ' A legendary estoc.\n+2 magic weapon.\nOnce per long rest you can pick a nat 1 or nat 20. You can give one target you see that result.\nApparently causes the wielder to astral...',
    pk: 136,
    name_full: 'Balmung',
    name: 'Balmung',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-04-25T21:26:33.807065Z',
  },
  {
    article_type: 'item',
    description: ' The lamp housing Barbatos, one of the unholy trine.',
    pk: 53,
    name_full: "Barbatos' Lamp",
    name: "Barbatos' Lamp",
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-11-27T20:55:18.201159Z',
  },
  {
    article_type: 'item',
    description:
      " A belt bought in the Silver Thread by Murtagh.\nThe bell has a will of its own. While it can't move on its own, it can still be used to deliver touch...",
    pk: 162,
    name_full: 'Belt of the Serpent',
    name: 'Belt of the Serpent',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-01-03T21:03:12.303851Z',
  },
  {
    article_type: 'item',
    description:
      " The assortment of gifts given by friends, acquaintances, and possible enemies on the wrong date celebrating Bathilde's birth.\nThese items include:\n\nA set of 7 rings given by Fen (3 black, 3 gold,...",
    pk: 80,
    name_full: 'Birthday gifts',
    name: 'Birthday gifts',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-02-28T09:40:11.002694Z',
  },
  {
    article_type: 'item',
    description:
      ' A beautifully made item made of silver and jet to resemble a raven with a W.\nBestowed by King Mordred as a birthday gift and reward for getting the woad at least...',
    pk: 79,
    name_full: 'Blackfeather Necklace',
    name: 'Blackfeather Necklace',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-02-18T23:50:29.413758Z',
  },
  {
    article_type: 'item',
    description:
      ' A moss that encourages blood clotting, helping to close up wounds quickly.',
    pk: 9,
    name_full: 'Blood Moss',
    name: 'Blood Moss',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-06-10T12:00:00.000000Z',
  },
  {
    article_type: 'item',
    description:
      ' Author: Bertrand Holloway\nThe book covers death in culture in general. Also blackhounds and alternate explanation as to what they are. It referrences tar as a substance to compare thei blood of...',
    pk: 20,
    name_full: 'Book - Memento Mori',
    name: 'Book - Memento Mori',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-07-22T12:00:00.000000Z',
  },
  {
    article_type: 'item',
    description:
      ' A leather-bound “book” that is more a collection of 19 trays, each containing a single scroll of a different spell. The spells it contains are denoted as:\n\n“Orb” (Chromatic Orb)\n“Cone” (Cone of...',
    pk: 57,
    name_full: 'Book of Spells',
    name: 'Book of Spells',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-11-15T23:41:05.385738Z',
  },
  {
    article_type: 'item',
    description:
      ' This magical handaxe returns to its wielder at the end of a round after it has been thrown. It retains its normal range of 20/60. Bought from a Stricken blacksmith for...',
    pk: 130,
    name_full: 'Boomerang Axe',
    name: 'Boomerang Axe',
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-01-25T10:34:10.897765Z',
  },
].map((entry) => ({ ...entry, getAbsoluteRouterUrl: () => '/item/123' }));

const dummyDiaryentries: OverviewItem[] = [
  {
    article_type: 'diaryentry',
    description:
      ' Back in my Era I was brought to the Dragon Chapel to help a cult of humans see if the dragon they worshipped would attain godhood as they believed, instead they...',
    pk: 49,
    name_full: 'Diary Entry #33 - I seened it',
    name: 'I seened it',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2021-03-01T22:29:48.485561Z',
    session_details: {
      start_day: 249,
      end_day: 252,
      session_number: 33,
      pk: 47,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 11, name: 'Fen' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' One of the first things I remembered being taught by Blaire once she took me in was about one of the biggest misconceptions surrounding following Silvanus. She mentioned while being in...',
    pk: 31,
    name_full: 'Diary Entry #14 - The Act of Companionship',
    name: 'The Act of Companionship',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2020-09-29T14:05:05.003143Z',
    session_details: {
      start_day: 83,
      end_day: 111,
      session_number: 14,
      pk: 17,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 10, name: 'Caitriona' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' After Caitriona had some dinner with her parents, Rhi and I grab Ciatriona and go on a walk. There we confront her with that she needs to make a choice regarding...',
    pk: 109,
    name_full: 'Diary Entry #105 - Interrogations',
    name: 'Interrogations',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-03-28T18:06:55.686426Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 105,
      pk: 128,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' Over the course of the long rest, we all do our own thing.\nCait organizes a fake ID as a merchant with Fen.\nMurtagh sources some blood through his vampire contacts, making it...',
    pk: 108,
    name_full: 'Diary Entry #104 - On to Douglas',
    name: 'On to Douglas',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-03-28T18:03:29.282284Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 104,
      pk: 126,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      " Caitriona and Fen both chat with Merlin.\nCaitriona confides her worries about being the one responsible for plunging us all into an eternal war, given what she's seen. He calms her down,...",
    pk: 107,
    name_full: 'Diary Entry #103 - The death of the wizard of the present',
    name: 'The death of the wizard of the present',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-02-21T20:26:29.164494Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 103,
      pk: 125,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      " We try to move the ball, Rhi touches it, get's ashed by it. We decide to stay the night until she's back and figure out how we can further break this...",
    pk: 106,
    name_full: 'Diary Entry #102 - Working Title',
    name: 'Working Title',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-02-14T20:31:38.010025Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 102,
      pk: 124,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' Bathilde wakes up again and tells us what she learned, that she is a niece of Penwaithe and the last hair of the Pendraig family. Upon hearing that, Merlin jokingly makes...',
    pk: 105,
    name_full: 'Diary Entry #101 - Aurelian the Archmind',
    name: 'Aurelian the Archmind',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-02-08T18:07:31.483248Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 101,
      pk: 123,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' We find ourselves in the Aspen Estate, owned by Lady Bathilde Aspen, basically Bathilde on a really, really bad trip.\nWe see Lady Bathilde Aspen, a suit jacket and a dress, red,...',
    pk: 104,
    name_full: 'Diary Entry #100 - Bathildes Bad Trip',
    name: 'Bathildes Bad Trip',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-01-24T20:17:54.079619Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 100,
      pk: 122,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' With the giant angel, which turns out to be called an archaic defeated, we have a brief respite, meeting up with Morgana and Mordred to talk about our next steps and...',
    pk: 103,
    name_full: 'Diary Entry #99 - Debating Betrayal',
    name: 'Debating Betrayal',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-01-17T21:01:57.152160Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 99,
      pk: 121,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' Fen meets with Mordred. Mordred acknowledges we bombed an illithid encampment with their weapon and thanks us for it.\nThey talk shop and war logistics, pondering whether to remove people from other...',
    pk: 102,
    name_full: 'Diary Entry #98 - An attempt at recording again',
    name: 'An attempt at recording again',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2023-01-10T20:19:27.864087Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 98,
      pk: 120,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      " Still breathing heavily Rhiannon's teleportation spell finishes and we find ourselves back in Etruscan, within the very familiar building of the guild of many steps.\nWith the life-and-death threat over, Rhi is...",
    pk: 101,
    name_full: 'Diary Entry #78 - Interrogating Hoert',
    name: 'Interrogating Hoert',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-06-12T12:56:09.422027Z',
    session_details: {
      start_day: undefined,
      end_day: undefined,
      session_number: 78,
      pk: 100,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      " Within the strange world of Hotel California, our heroes, agents in a detective agency, work on solving a murder mystery on orders of madame, in a 1950's kinda city with guns...",
    pk: 99,
    name_full: 'Diary Entry #77 - Murder in Hotel California',
    name: 'Murder in Hotel California',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-06-05T09:27:20.100114Z',
    session_details: {
      start_day: 0,
      end_day: 0,
      session_number: 77,
      pk: 98,
      is_main_session: false,
      is_main_session_int: 0,
    },
    author_details: { pk: 3, name: 'isofruit' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' The entire session consists solely of us fighting Hoert and his companions and creatures. Murtagh does send a message to Morgana at the start of the fight, asking what the fuck...',
    pk: 100,
    name_full: 'Diary Entry #77 - Fighting for Hoert',
    name: 'Fighting for Hoert',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-06-05T09:40:53.082283Z',
    session_details: {
      start_day: 360,
      end_day: 360,
      session_number: 77,
      pk: 99,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' The day of the mission arrives (In the meantime I sent 2 bars of gold to the local church of Morrigan for funds) and we meet in the morning to talk...',
    pk: 98,
    name_full: 'Diary Entry #76 - Aspen Infiltration',
    name: 'Aspen Infiltration',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-05-25T19:21:05.359068Z',
    session_details: {
      start_day: 360,
      end_day: 360,
      session_number: 76,
      pk: 97,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' The morning after last nights welcome in the grove approaches eventually. We spend a long part of the morning asking Merlin quite a lot of questions (see last session), drinking tea...',
    pk: 97,
    name_full: 'Diary Entry #75 - The party gets jailed!',
    name: 'The party gets jailed!',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-05-15T22:08:53.463991Z',
    session_details: {
      start_day: 351,
      end_day: 353,
      session_number: 75,
      pk: 96,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' This session was held short and thus mostly a QA for various things. The following questions were asked / information was gained:\n\nIs there a dangerous chaos portal in the Firbolg cave?\n\nNo\n\n\nWould...',
    pk: 96,
    name_full: 'Diary Entry #74 - Merlin QA',
    name: 'Merlin QA',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-05-14T21:23:08.230896Z',
    session_details: {
      start_day: 351,
      end_day: 351,
      session_number: 74,
      pk: 95,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      " After licking our wounds for a bit and deciding to leave the crystal-entrapped people be, we take our leave. Though it's a bit odd when Murtagh suddenly manifests a sheathe for...",
    pk: 95,
    name_full: 'Diary Entry #73 - Space Elves!',
    name: 'Space Elves!',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-05-01T10:20:22.069594Z',
    session_details: {
      start_day: 346,
      end_day: 351,
      session_number: 73,
      pk: 94,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
  {
    article_type: 'diaryentry',
    description:
      ' We follow Fen down the staircase into the bowels of whatever this secret space is. Soon enough we find another chamber. Its walls are of a brown stone, tinged with an...',
    pk: 94,
    name_full: 'Diary Entry #72 - Secrets underneath the Equinox Stones',
    name: 'Secrets underneath the Equinox Stones',
    campaign: 1,
    campaign_details: { name: 'Aldrune', id: 1 },
    update_datetime: '2022-04-23T06:56:22.727834Z',
    session_details: {
      start_day: 346,
      end_day: 346,
      session_number: 72,
      pk: 93,
      is_main_session: true,
      is_main_session_int: 1,
    },
    author_details: { pk: 15, name: 'Relentless' },
  },
].map((entry) => ({ ...entry, getAbsoluteRouterUrl: () => '/diaryentry/123' }));

export default {
  title: 'DesignSystem/Templates/GeneralOverviewComponent',
  component: GeneralOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [],
    }),
  ],
  args: {
    serverUrl: 'https://www.aldrune.com',
    entries: dummyCharacters,
    canCreate: true,
    campaignName: 'Aldrune',
    overviewType: 'CHARACTER',
  },
} as Meta<GeneralOverviewComponent>;

const Template: StoryFn<GeneralOverviewComponent> = (args) => ({
  props: {
    ...args,
    search: action('search'),
    loadArticlePage: action('loadArticlePage'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Characters = Template.bind({});
Characters.args = {};

export const CharactersWithoutPlayerCharacters = Template.bind({});
CharactersWithoutPlayerCharacters.args = {
  entries: dummyCharacters.map((character) => ({
    ...character,
    player_character: false,
  })),
};

export const Creatures = Template.bind({});
Creatures.args = {
  entries: dummyCreatures,
  overviewType: 'CREATURE',
};

export const Locations = Template.bind({});
Locations.args = {
  entries: dummyLocations,
  overviewType: 'LOCATION',
};

export const Organizations = Template.bind({});
Organizations.args = {
  entries: dummyOrganizations,
  overviewType: 'ORGANIZATION',
};

export const Items = Template.bind({});
Items.args = {
  entries: dummyItems,
  overviewType: 'ITEM',
};

export const Diaryentries = Template.bind({});
Diaryentries.args = {
  entries: dummyDiaryentries,
  overviewType: 'DIARYENTRY',
};
