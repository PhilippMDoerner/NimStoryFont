import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { CharacterDetails } from 'src/app/_models/character';
import { OverviewItem } from 'src/app/_models/overview';
import { Quote } from 'src/app/_models/quote';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { CharacterComponent } from './character.component';

const dummyCharacters: OverviewItem[] = [
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gandalf',
    pk: 1,
    name_full: 'Gandalf the Grey',
    player_character: true,
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Frodo',
    pk: 2,
    name_full: 'Frodo Baggins',
    player_character: true,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Gimli',
    pk: 3,
    name_full: 'Gimli son of Glóin',
    player_character: false,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Legolas',
    pk: 4,
    name_full: 'Legolas Greenleaf',
    player_character: false,
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Bilbo',
    pk: 5,
    name_full: 'Bilbo Baggins',
    player_character: false,
    images: [],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
  {
    getAbsoluteRouterUrl: () => '/search/character/123',
    article_type: 'Character',
    name: 'Aragorn',
    pk: 6,
    name_full: 'Aragorn son of Arathorn',
    player_character: false,
    images: ['https://example.com/images/lirien1.jpg'],
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
    images: [],
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
      'https://example.com/images/lirien1.jpg',
      'https://example.com/images/lirien1.jpg',
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
    images: ['https://example.com/images/lirien1.jpg'],
    campaign_details: { name: 'Aldrune', id: 1 },
  },
];

const dummyCharacter: CharacterDetails = {
  getAbsoluteRouterUrl: () => 'character/83',
  pk: 83,
  player_character: false,
  campaign: 1,
  player_class_connections: [
    {
      pk: 12,
      player_class: 11,
      character: 83,
      player_class_details: {
        name: 'Sorcerer',
        pk: 11,
        update_datetime: '2021-04-20T14:32:11.740394Z',
      },
    },
    {
      pk: 13,
      player_class: 12,
      character: 83,
      player_class_details: {
        name: 'Warlock',
        pk: 12,
        update_datetime: '2021-04-20T14:32:13.937586Z',
      },
    },
  ],
  alive: false,
  name: 'Suleman',
  gender: 'Male',
  race: 'Tiefling',
  title: 'Wizard of the past',
  description:
    '<p>A purple-skinned, golden-eyed Tiefling that managed to have many a spirit as his servant and commanded unimaginable power. Tended to wear simple clothing, but a lot of golden jewelry.</p>\r\n<p>Among his most powerful servants were the primordial four and the unholy trinity, which he later sealed away.</p>',
  current_location: undefined,
  current_location_details: undefined,
  creation_datetime: '2020-06-10T12:00:00.000000Z',
  update_datetime: '2022-02-13T13:37:28.357483Z',
  campaign_id: 1,
  campaign_details: { name: 'Aldrune', id: 1 },
  organizations: [
    { pk: 138, organization_id: 54, role: 'Member', name: 'The Party' },
    {
      pk: 146,
      organization_id: 3,
      role: 'Paladin 3rd class',
      name: 'Church of Morrigan',
    },
  ],
  items: [],
  encounters: [
    {
      pk: 684,
      description:
        "<p>He appears as majestic as you'd have thought somebody approaching god-like powers would be. He is clad in gold, golden caps on his horns, dangling finery, a beautiful lavender robe that exerts extraordinary magical pressure that is almost uncomfortable, forcing the room to be filled with...<em>something</em>.</p>\n<p>We barely have enough time to take all of this in, before Rhiannon's lamp rattles. Barbatos does not just leave, he bursts forth, ready to inflict murder and pain on this copy of Suleman to the very best of his ability.</p>\n<p>In the altercation that ensures, given that Fraich and Bedivere are still pretty exhausted and hurt, it is mostly us and Forallian that approach this...altercation between Suleman and Barbatos.</p>\n<p>The first and second salvo of hits that is exchanged is already frightening enough, the two trading blows with powerful spells before Barbatos cuts into Suleman with speed and ferocity that I have never seen anyone wield a sword with. Suleman summons several items to himself instead and responds with a gigantic beam of light that cuts straight through Barbatos, nearly severing a wing of his. That likely would have evaporated anyone less powerful.</p>\n<p>Outside of that, we do our best to get him to see reason. Fen, shouting with an enhanced voice thanks to me, gets through enough to him to make him falter for a moment. Rhi contemplates for a moment whether she should in, but holds back when Barbatos shouts at her pleadingly to not take this moment of revenge from him. Neither Caitriona's shouting at him, nor my snide remarks picking at his arrogance really have an effect on him. All it does is reveal he's fully aware this is a copy, but wishes to kill it anyway for it is his only chance at some sort of token revenge that he can have. It takes Caitriona stepping in between them, willing to risk her life as he is preparing to use his dark star ability, to finally get him to stop.</p>\n<p>Gritting his teeth, still displaying barely restrained fury and range, he disappears. The danger is gone, for the moment.</p>",
      encounterConnections: [
        {
          pk: 729,
          encounter: 684,
          encounter_details: {
            name: 'Main Session 53 - A last measure of revenge',
            name_full: 'Main Session 53 - A last measure of revenge',
            pk: 684,
          },
          character: 80,
          character_details: {
            name: 'Barbatos',
            name_full: 'Destroyer of the first gate - Barbatos',
            pk: 80,
          },
        },
        {
          pk: 730,
          encounter: 684,
          encounter_details: {
            name: 'Main Session 53 - A last measure of revenge',
            name_full: 'Main Session 53 - A last measure of revenge',
            pk: 684,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
        {
          pk: 731,
          encounter: 684,
          encounter_details: {
            name: 'Main Session 53 - A last measure of revenge',
            name_full: 'Main Session 53 - A last measure of revenge',
            pk: 684,
          },
          character: 99,
          character_details: { name: 'Fraich', name_full: 'Fraich', pk: 99 },
        },
        {
          pk: 732,
          encounter: 684,
          encounter_details: {
            name: 'Main Session 53 - A last measure of revenge',
            name_full: 'Main Session 53 - A last measure of revenge',
            pk: 684,
          },
          character: 154,
          character_details: {
            name: 'Bedivere Whiteridge',
            name_full: 'Dragonknight of hope - Bedivere Whiteridge',
            pk: 154,
          },
        },
      ],
      name: 'Main Session 53 - A last measure of revenge',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'A last measure of revenge',
      creation_datetime: '2021-09-18T10:25:53.866269Z',
      update_datetime: '2021-09-18T10:34:27.917004Z',
      diaryentry: 73,
      order_index: 20,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 685,
      description:
        "<p>With that somewhat tense situation over we make our introductions. During this, Caitriona shakes Suleman's hands and proceeds to somehow give him a very weird impression of blushing puppy eyes that I've never seen her do before... ever. Like he's the most amazing person she's ever seen. It's quite unsettling to be honest.&nbsp;</p>\n<p>That is until Suleman points out Rhiannon and launches into a lecture over how it is dangerous and nonsensical to be carrying Barbatos lamp. Which paints him as a bit of a hypocrite given he made it, until he specifies that it is nonsensical for&nbsp;<strong>her</strong> to be carrying Barbatos' lamp as only he himself has the capacity to do so. Which paints him as a massive arrogant douchenozzle, which isn't much better.&nbsp;</p>\n<p>On my request he confirms that he locked the lamps away because they became too powerful, not believing anyone else ever could be capable enough to properly wield them.&nbsp;</p>\n<p>Some banter between us later, Rhi asks him how he died, which he becomes a smidge cagey about. Questions on if he knows Yaga or Morghana trigger no memories of his. Does trigger a dig at our expense that our clothes are still out of date, roughly 12000 years after his death.</p>",
      encounterConnections: [
        {
          pk: 733,
          encounter: 685,
          encounter_details: {
            name: 'Main Session 53 - Introductions and Lectures',
            name_full: 'Main Session 53 - Introductions and Lectures',
            pk: 685,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Introductions and Lectures',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Introductions and Lectures',
      creation_datetime: '2021-09-18T10:35:37.111121Z',
      update_datetime: '2021-09-19T08:59:03.295660Z',
      diaryentry: 73,
      order_index: 30,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 686,
      description:
        '<p>With that out of the way, we get to the heart of the issue that we can debate with him, Morgana and her desire for the temple of time. Talking about it gets Suleman somewhat excited from the start, declaring it his finest work, which intensifies Caitriona\'s puppy stare into one filled with awe and amazement at how somebody so incredible can exist right in front of her.</p>\n<p>On my question on what to expect coming out of there, he reveals that the main task of the temple&nbsp; is to record all knowledge of things that ever happened. It does not house any particular artifacts, just knowledge. Which can be dangerous in itself, but more in what follows after Morgana acquires it, not immediately in something she can destroy with it. It also means that chances are that temple has records of where the lance is... and that we currently own it... and if Morgana finds that one out, well boy are we fucked.</p>\n<p>Fen seems to get an epiphany at that, before smugly declaring that "his" is better. Which apparently is his ability to pull knowledge out of nowhere that he should have no way of accessing. His... thumb apparently gives him knowledge of all things past, present and future. A dick measuring contest ensues between him and Suleman on whose ability to acquire knowledge is "actually" better.</p>',
      encounterConnections: [
        {
          pk: 734,
          encounter: 686,
          encounter_details: {
            name: 'Main Session 53 - Getting to the heart of the issue',
            name_full: 'Main Session 53 - Getting to the heart of the issue',
            pk: 686,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Getting to the heart of the issue',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Getting to the heart of the issue',
      creation_datetime: '2021-09-19T08:27:32.535679Z',
      update_datetime: '2021-09-19T08:47:49.405613Z',
      diaryentry: 73,
      order_index: 40,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 687,
      description:
        "<p>Once that knowledge-contest is over, Suleman places himself in a freshly summoned comfy chair and I ask him for advice on the Agari situation. That is, after he gives me advice on how to stop the horn fraying which has been a <strong>serious</strong> pain in the keister since I've been born. Coconut oil is supposed to help there... whatever coconuts are. Useful information though.</p>\n<p>Anyway, I inform him of a possible confrontation between Agari and Barbatos, during which he remarks that Agari might have enough power from Barbatos' sins to destroy his lamp. His advice on how to avoid that: Anti Magic zone on whoever's sin Agari wishes to unleash with her \"Cat's call\" ability.</p>",
      encounterConnections: [
        {
          pk: 735,
          encounter: 687,
          encounter_details: {
            name: 'Main Session 53 - Advice against Agari',
            name_full: 'Main Session 53 - Advice against Agari',
            pk: 687,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Advice against Agari',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Advice against Agari',
      creation_datetime: '2021-09-19T08:57:41.422952Z',
      update_datetime: '2021-09-19T08:57:41.423061Z',
      diaryentry: 73,
      order_index: 50,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 688,
      description:
        "<p>The Agari question is followed by Rhiannon asking for Suleman's reason to destroy Babylon.</p>\n<p>Hesitantly, Suleman says that he was tricked by Barbatos, being made to believe that the people of Babylon were attempting a physical construction of Ptolemy's model of the universe. This could've allowed them to get to a universe not controlled by... \"this\" universe. A way to escape the cycle of rising and falling civilizations, which the universe squashes before the civilization learns \"too much\". He was aware that if that happened, it would likely have lead to the eradication of everything in existence... somehow. Suleman states he believed Barbatos because he had never felt appreciated by this place anyway, only experienced jealousy and more.</p>\n<p>It was only when he was walking among the ruins of his people that he realized that Barbatos had only been pushing him to see how far he could take it. Suleman notes he is uncertain as to why Barbatos would do this, but guesses he might've found the resemblance to hell distasteful. He does acknowledge that it could've been an honest mistake of Barbatos', who might've truly believed that this was the case. But even if that were the case, Barbatos' lack of remorse following made it certain to Suleman that Barbatos needed to be sealed away.</p>\n<p>He also remarks that he and Barbatos had their disagreements about the temple of time, which those were are unclear.</p>\n<p>As to how he was so certain that Barbatos had tricked him, he just denotes that he realized such while walking among the piles of corpses his destruction caused, seeing it was all for naught.</p>\n<p>On Fen's question of the purpose of the tower, Suleman elaborates that the tower was a water-reclamation center initially, then became a gathering place for people which lead to the extension of the surrounding hanging gardens, making it a popular place for rich folk to celebrate in. It also doubled as observatory. At that description, Fen asks him for schematics as he wishes to build something similar, which Suleman agrees on doing.</p>\n<p>What he does not agree to is tell Rhi where Babylon used to be, as he does not wish for us to disturb the peace of the place or get anywhere even remotely close to where his body might be. As for the temple of time, that temple exists in some kind of border to nothingness, so that's apparently accessible from anywhere you want.&nbsp;</p>",
      encounterConnections: [
        {
          pk: 736,
          encounter: 688,
          encounter_details: {
            name: 'Main Session 53 - Why Suleman destroyed Babylon',
            name_full: 'Main Session 53 - Why Suleman destroyed Babylon',
            pk: 688,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Why Suleman destroyed Babylon',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Why Suleman destroyed Babylon',
      creation_datetime: '2021-09-19T09:35:39.279083Z',
      update_datetime: '2021-09-19T09:53:49.827757Z',
      diaryentry: 73,
      order_index: 60,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 689,
      description:
        "<p>Eager to distract himself from his thoughts of Babylon, he accepts Murtagh's question, who ask him about the squid people we encountered.</p>\n<p>Suleman is a bit stumped at first, but does recognize them as a species of parasites that evolved since he last saw them. Seemingly satisfied with that, Murtagh nods to himself.</p>\n<p>After that I ask for why Barbatos isn't just being released back into the hells to have him everywhere but here. The reason is quite self evident. The lamp manages to contain some of his power, leaving him still with a considerable amount of it. The issue is, that he's too powerful now, due to the dark star. To elaborate on that, he tells a bit of a story. There used to be originally a group of protectors, divine beings called \"angels\". The one chief among them, Lucifer, wanted to influence the universe more than just protecting it. He became the first devil and was given \"the compulsion\", an innate desire to fight chaos. Suleman, after capturing the Djinn and the Trine captured Lucifer and... turned him into a staff. When Lucifer fell from his position as an angel and became a devil, he left behind \"the dark star\", a relic now in Barbatos' possession. So it is not like releasing him back would get him forced under the rule of a more powerful archdevil. He would likely be more powerful than some, if not most of them. And with that power would come the ability to act, potentially in revenge against Suleman. Not necessarily enough to overcome the compulsion, but there are ways to leave the tree intact and still destroy everything Suleman ever created. This may not be true for Agari and Lairann, but they are dogmatically loyal to Barbatos and thus would likely work to free Barbatos if released themselves. And weakening them isn't really a possibility.</p>\n<p>At my loudly contemplating that last bit, Rhi keeps squinting harshly at me, but I just shrug it off. If she actually has a problem she'd speak up.</p>\n<p>On Cait's question why one would prefer Ahjuu's lamp over Barbatos', to which Suleman confirms that Barbatos is the most powerful, but they all have their own fields of excellence. He also points out that both a Djin and a Fiend-lamp is needed for access.</p>",
      encounterConnections: [
        {
          pk: 737,
          encounter: 689,
          encounter_details: {
            name: 'Main Session 53 - Knowledge of Illithids and releasing fiends',
            name_full:
              'Main Session 53 - Knowledge of Illithids and releasing fiends',
            pk: 689,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Knowledge of Illithids and releasing fiends',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Knowledge of Illithids and releasing fiends',
      creation_datetime: '2021-09-19T09:54:02.602675Z',
      update_datetime: '2021-11-29T18:52:55.892937Z',
      diaryentry: 73,
      order_index: 70,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 690,
      description:
        "<p>As we chat about the possibility of releasing Barbatos, Fen tells Suleman of the daggers and how they piggyback off the universe's mechanism to evaluate something&nbsp; as an incarnation of a concept. More specifically, he asks what knowledge that could do something like this would seek from the temple.</p>\n<p>That question, for the first time, is strange enough that not even Suleman has a direct answer to it. Fen goes on to reveal that he is aware somebody tried to make an incarnation of <strong>him</strong> as a concept to get access to his... knowledge ability. He assumes the temple of time is their backup plan, now that this failed. Suleman muses that they are trying this on people that almost achieved godhood as those that are gods likely wouldn't be available through this mechanism.</p>\n<p>At that Caitriona hands him the fire-dagger she took from Fen all those months ago. Suleman looks at it for a couple seconds before noting it to be the flame of a dragon, taken from it and carved with runes to simulate ancestral memory. It effectively reaches back in time to find somebody that best embodies the concept that was ripped from the dragon. As no thing can exist twice at once, this also means that the dragon no longer can breathe fire.</p>\n<p>He assumes that if the dragon were exposed to flame it would bring forth a being most aligned with a dragon's fire, aka primordial flame. Which... explains the dead, chained up, adult/ancient dragon Fen mentioned seeing on his trip through Galway, where he also got the daggers from.</p>\n<p>As for the daggers themselves, he notes that mixing in a humanoid's blood would dilute this effect and the draconic heritage, which conjures forth images of Astaroth almost immediately. That's about the time he notices Bedivere who was trying his best to fade into the background. He points out that this conjuring up made the person suddenly gain draconic ancestroy, but not turn they themselves draconic. Cleansing water effects like those in the bath would remove this.</p>\n<p>Suleman also notes that draconic heritage tends to be able to extract feelings and memories also from blood. So if somebody were to, say, create one of these daggers from a dragon that had a vendetta, and the person transforming the dagger cut themselves with had a similar vendetta, that would have a \"much closer and more profound\" effect... of some sorts. That effect likely being that somebody stronger that embodies the concept better would be summoned. Images of Astaroth don't just come to mind at this point, they start rampaging through the territory of other thoughts and slicing them into pieces.</p>",
      encounterConnections: [
        {
          pk: 738,
          encounter: 690,
          encounter_details: {
            name: 'Main Session 53 - Questions about daggers',
            name_full: 'Main Session 53 - Questions about daggers',
            pk: 690,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Questions about daggers',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Questions about daggers',
      creation_datetime: '2021-09-19T14:50:47.493037Z',
      update_datetime: '2021-09-20T09:39:15.642340Z',
      diaryentry: 73,
      order_index: 80,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 691,
      description:
        "<p>At that point Caitriona theorizes about mixing the creature that would be created by blood intermingling and how maybe a blood curse could carry over or not. After exasperating Suleman a bit and him drinking some of her blood he correctly identifies her \"curse\" and identifies her as being horribly irreversibly cursed.</p>\n<p>Before they can continue on the dagger matter, Suleman can't help but get into the debate on how permanently Caitriona is intertwined with somebody that is <strong>really</strong> trying to piss off the universe. Which sounds accurate, so I just nod along. Cait reveals that she swapped Fate's with somebody, which it appears is the thing that is really angering the universe. Not necessarily Caitriona turning into a beast of blackened blood herself, as that appears to be an honest error and shit happens. But her purposeful swapping of fate and thus intentional messing with things is what <em>really</em> grinds the universe's gears. Which never ends well, as Suleman speaks from experience and reveals he was attacked and mashed into paste by a construct made of gears and anti-magic.</p>\n<p>Cait then theorizes on what would happen if one of these two fates were to end, aka she killed Fillaih as she'd had on her agenda for ages now. Which turns out to depend on the intent of the person doing the killing, according to Fillaih. If the killer wanted to make sure Fillaih's fate was never fulfilled, that would make things worse. But if the intent was to restore balance/appease, that would improve things. This is utterly insane and arbitrary, which Suleman acknowledges.</p>",
      encounterConnections: [
        {
          pk: 739,
          encounter: 691,
          encounter_details: {
            name: "Main Session 53 - Caitriona's Curse",
            name_full: "Main Session 53 - Caitriona's Curse",
            pk: 691,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: "Main Session 53 - Caitriona's Curse",
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: "Caitriona's Curse",
      creation_datetime: '2021-09-20T09:39:51.274721Z',
      update_datetime: '2021-09-20T09:48:43.851322Z',
      diaryentry: 73,
      order_index: 90,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 693,
      description:
        '<p>Wanting to take another chance, Rhi asks Suleman what Barbatos would want from the temple of time. Sheepishly, Suleman tells her that Barbatos never saw it with his own eyes. He had made Barbatos blind while constructing the temple, as a punishment for tricking him into destroying Babylon. When Rhi complains about that being unfair, Suleman exasperatedly points at the uncountable death the destruction of Babylon caused, stating he only wanted to use Barbatos to do one good thing and then lock him away forever... which failed, given Rhi having the lamp now.</p>\n<p>At Fen pointing it out that the lock was flawed, Suleman responds he left Frank with him and that he thought that would be enough. Which it obviously wasn\'t. This confuses Fen massively, as based on our introductions to Frank he seemed to quickly make his name up on the spot. At our mentioning that Frank feels like he has been downgraded since being turned into a cave, Suleman exasperatedly points out he\'s the largest thing in the mountain range, how could he be disappointed?! Pointing out his interest in becoming a caterpillar for the metamorphosis Suleman puts his face in his hands, muttering something about addiction to changing.</p>\n<p>At Cait pointing out that Rhi promised Frank a new body and how having a wish really would help with that, Suleman vehemently denies our request. With words he may only be declaring us "fuckwitts", but the subtext about us being irresponsible idiots with this kind of stuff could be counted in volumes. He does offer another spell instead, to which I ask for teleport, which he empowers by making it subtle, thus making it impossible to counter.</p>',
      encounterConnections: [
        {
          pk: 740,
          encounter: 693,
          encounter_details: {
            name: 'Main Session 53 - What Barbatos would want',
            name_full: 'Main Session 53 - What Barbatos would want',
            pk: 693,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - What Barbatos would want',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'What Barbatos would want',
      creation_datetime: '2021-09-20T10:07:13.232541Z',
      update_datetime: '2021-09-20T10:11:28.467109Z',
      diaryentry: 73,
      order_index: 110,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 695,
      description:
        "<p>It's at this point a question goes through my mind regarding my own ancestry. I explain Suleman my own story, how I've been told I was payment for a contract an ancestor of mine made, how my mother made me get a tattoo to protect me and how the influence of a god supposedly saved me. </p>\n<p>Suleman points out that what we're talking about, the magnitude of the contract, is on the order of a volcano erupting, a tsunami, something big. A rune, in comparison, might be the purest form of order, a shape now having meaning, and that would indeed protect chaos or things corrupting order. However, it is an umbrella compared to the catastrophe awaiting me. The influence of a god whoever is something else entirely. <strong>That</strong> could protect, being more of a wall or a conservatory.</p>\n<p>When I tell him why I had doubts, given that this was a contract, he notes that it depends on who the contract was with. Since mine was not with a devil but with a hag, things change, particularly since these types of contracts tend to piss off the universe. This contract uses broken down order as fuel, me being infused with pure order thus goes against this.</p>",
      encounterConnections: [
        {
          pk: 741,
          encounter: 695,
          encounter_details: {
            name: "Main Session 53 - Rellam's Curse",
            name_full: "Main Session 53 - Rellam's Curse",
            pk: 695,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: "Main Session 53 - Rellam's Curse",
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: "Rellam's Curse",
      creation_datetime: '2021-09-20T10:25:20.734878Z',
      update_datetime: '2021-09-20T10:25:20.735002Z',
      diaryentry: 73,
      order_index: 130,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 697,
      description:
        "<p>That being said, Rhi's curiosity tickles her once more and she asks Suleman on why he bound 1000 imps when he had the Djinn at his disposal. That just makes the man smile and his eyes shine with excitement. Turns out there's a question with an answer having 1000 words to be able to bind the Djinn. However, the price for that answer was exorbitant. So instead, he bounds these 1000 imps individually to get 1 word from each of them in exchange for a much smaller price each.</p>\n<p>With the answer finally complete he created the lamps to bind the Djinn, from whom he could get even more knowledge. With that knowledge he bound Barbatos, Lairan and Agari, whom he extracted even more knowledge from. Finally, with all of this power, he crafted the staff of seven rings which allowed him to enslave Lucifer. Which permanently weakened the fiendish frontlines on our side.</p>\n<p>While Rhi is busy trying to wrap her mind around the fact that Suleman is wielding that very staff containing Lucifer right now, I ask my own question on how this has now compromised the security in all of reality. At that he just looks pitifully at me, confirming verbally that I really am a follower of a god and boring.</p>\n<p>Just in time for Rhi to finish grappling with the concept of all these artifacts being real and not part of the Ooble...bli... the hotel and wanting to get them from Suleman. A short disagreement follows in which unflattering words such as \"hag\", \"graverobber\" and \"you're dead\" fall before Suleman invites her to try and take it from him, which Rhi didn't want to do in the first place since she'd like to live. Good ol' survival instinct.</p>\n<p>Being fully in agreement with him, I strongly reaffirm his decision to not give the staff to anyone. And that he instead should break it, so that nobody could have it. And we'd get a staunch defender of reality back in business. I don't think I've seen any person roll their eyes harder than him at me before shooing me off, pointing out that reality has been fine in the meantime.</p>\n<p>In a very transparent attempt of just trying to find another way of stealing these artifacts from his skeletal, dead hands if she can find his body, Rhi asks him where he died. At which he just squints at her, telling her to \"Fuck around and find out\".</p>\n<p>A debate about Suleman's death erupts and at Fen's question as to why Suleman didn't just physically try to overcome the Golem that killed Suleman, Suleman just points out his more studious and charming nature. When Rhi tries to draw parallels between the two of them, Suleman just points out how the conversation between the two of them went so far and her thinly veiled interest at the staff.</p>",
      encounterConnections: [
        {
          pk: 742,
          encounter: 697,
          encounter_details: {
            name: 'Main Session 53 - Why Suleman had 1000 imps',
            name_full: 'Main Session 53 - Why Suleman had 1000 imps',
            pk: 697,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: 'Main Session 53 - Why Suleman had 1000 imps',
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: 'Why Suleman had 1000 imps',
      creation_datetime: '2021-09-20T10:41:19.315007Z',
      update_datetime: '2021-09-20T10:47:13.241566Z',
      diaryentry: 73,
      order_index: 150,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
    {
      pk: 700,
      description:
        "<p>All of a sudden Caitriona pulls out her mirror that she received from the hags <strong>and still hasn't gotten rid off, lords above help me.</strong> Apparently she wants to know what kind of fiend that is.</p>\n<p>Suleman licks it, thinks for a second, then announces that this is a mirror demon. He proceeds to demonstrate something with a devil plushie on how mirror demons are made from devils mixed with the concept of \"change\". He points out this demon has then been stuffed inside the mirror. It has the ability to access the watchers memories, thoughts and the appearance you put into the mirror to perform an action or fill a role it's been given.</p>\n<p>On Murtagh's question why this would be given to Caitriona, Suleman points out that luck is the concept of changing order/fate in your favor, and that this is likely siphoning off Cait's ability to change fates. Which is the shocking revelation of a century right there, truly. What else, other than the fact it came from hags and is made of energy absorbant material and was getting fatter to the point it cracked could possibly hint at that? Truly, nobody could have known. Suleman proceeds to compare this less to Cait being a battery and more her being an orange pressed out on a juicer.</p>\n<p>For some reason Cait then proceeds to, instead of just destroying the mirror, to talk with it, trying to think of ways on freeing it and what it would do if given the choice. Some way too long conversation follows that concludes with Cait deciding to free the mirror demon eventually, convinced it won't come after her as she believes they were both shoved into this situation without their input and thus would want to be friends and meet up later. And because the mirror demon mirrors her, it mirrors that sentiment.</p>",
      encounterConnections: [
        {
          pk: 743,
          encounter: 700,
          encounter_details: {
            name: "Main Session 53 - Cait's mirror",
            name_full: "Main Session 53 - Cait's mirror",
            pk: 700,
          },
          character: 83,
          character_details: {
            name: 'Suleman',
            name_full: 'Wizard of the past - Suleman (†)',
            pk: 83,
          },
        },
      ],
      name: "Main Session 53 - Cait's mirror",
      location: 199,
      location_details: {
        name: 'Hotel California',
        name_full: 'River Styx',
        pk: 199,
        parent_location_name: 'River Styx',
      },
      title: "Cait's mirror",
      creation_datetime: '2021-09-20T11:07:05.142658Z',
      update_datetime: '2021-09-21T15:35:00.353516Z',
      diaryentry: 73,
      order_index: 180,
      campaign_details: { name: 'Aldrune', id: 1 },
    },
  ],
  images: [
    {
      pk: 570,
      image: '/media/article_images/suleman.webp',
      name: undefined,
      character_article: 83,
      creature_article: undefined,
      item_article: undefined,
      location_article: undefined,
      organization_article: undefined,
    },
  ],
};

const dummyQuote: Quote = {
  pk: 58,
  quote:
    "<p>Rel: \"Rhiannon, can I ask you to stay close to me when we are near Barbatos' cave?\"<br />Rhi: \"You don't want me to leave you, huh?\" <em>winks</em><br />Rel *<em>puts on voice*</em>: \"Yes, I don't want you to my side. I don't know what I'd do without you. Probably lead a less problematic live, but I don't know what I'd do without you.\"</p>",
  description:
    "Rel and Rhi before leaving the woad camp towards Barbato's cave",
  creation_datetime: '2020-11-23T19:25:25.980375Z',
  update_datetime: '2020-12-01T17:57:15.652614Z',
  session: 39,
  session_details: {
    title: undefined,
    session_number: 26,
    session_date: '2020-11-10T00:00:00.000000Z',
    is_main_session: true,
    is_main_session_int: 1,
    end_day: 198,
    start_day: 196,
    creation_datetime: '2021-04-30T19:56:29.591276Z',
    update_datetime: '2021-04-30T19:56:29.605701Z',
    campaign: 1,
    campaign_details: {
      name: 'Aldrune',
      pk: 1,
    },
    pk: 39,
    name: 'Main Session 26',
    diaryentries: [
      {
        author_name: 'Relentless',
        name: 'Diary Entry #26 - Woads with a new tomorrow',
      },
    ],
    has_recording: false,
  },
  encounter: undefined,
  connections: [
    {
      pk: 68,
      character: 3,
      character_details: {
        name: 'Rhiannon Ó Conaill',
        name_full: 'Champion of Galway - Rhiannon Ó Conaill',
        pk: 3,
      },
      quote: 58,
    },
    {
      pk: 69,
      character: 77,
      character_details: {
        name: 'Rellam Serbior',
        name_full: 'Relentless - Rellam Serbior',
        pk: 77,
      },
      quote: 58,
    },
  ],
};

export default {
  title: 'DesignSystem/Templates/CharacterComponent',
  component: CharacterComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, BrowserAnimationsModule, FORMLY_MODULE],
      declarations: [],
    }),
  ],
  args: {
    imageServerModel: undefined,
    quoteServerModel: undefined,
    encounterServerModel: undefined,
    serverUrl: 'https://www.aldrune.com',
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    campaignNPCCharacters: dummyCharacters,
    character: dummyCharacter,
    characterServerModel: undefined,
    campaignCharacters: dummyCharacters,
    campaignLocations: [],
    campaignOrganizations: [],
    campaignClasses: [],
    sessions: [],
    encounters: [],

    characterQuote: dummyQuote,
  },
} as Meta<CharacterComponent>;

const Template: StoryFn<CharacterComponent> = (args) => ({
  props: {
    ...args,
    createImage: action('createImage'),
    deleteImage: action('deleteImage'),
    updateImage: action('updateImage'),
    quoteDelete: action('quoteDelete'),
    quoteCreate: action('quoteCreate'),
    quoteUpdate: action('quoteUpdate'),
    quoteConnectionDelete: action('quoteConnectionDelete'),
    quoteConnectionCreate: action('quoteConnectionCreate'),
    encounterConnectionDelete: action('encounterConnectionDelete'),
    encounterConnectionCreate: action('encounterConnectionCreate'),
    refreshQuote: action('refreshQuote'),
    characterDelete: action('characterDelete'),
    encounterDelete: action('encounterDelete'),
    encounterUpdate: action('encounterUpdate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canDelete: false,
  canUpdate: false,
  canCreate: false,
};

export const NoItems = Template.bind({});
NoItems.args = {
  character: {
    ...dummyCharacter,
    items: [],
  },
};

export const NoQuote = Template.bind({});
NoQuote.args = {
  characterQuote: undefined,
};
