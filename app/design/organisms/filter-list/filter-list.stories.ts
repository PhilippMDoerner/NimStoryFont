/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterTestingModule } from '@angular/router/testing';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FilterListComponent } from './filter-list.component';

const dummyEntries = [
  {
    label: 'Thorngrim Stonefist',
    link: 'https://example.com/Thorngrim',
    party: 'Party A',
  },
  {
    label: 'Eilistraee Moonwhisper',
    link: 'https://example.com/Eilistraee',
    party: 'Party B',
  },
  {
    label: 'Zarathustra the Unyielding',
    link: 'https://example.com/Zarathustra',
    party: 'Party A',
  },
  {
    label: 'Rufus Redbeard',
    link: 'https://example.com/Rufus',
    party: 'Party C',
  },
  {
    label: 'Iridessa Silverblade',
    link: 'https://example.com/Iridessa',
    party: 'Party A',
  },
  {
    label: 'Fintan Ironclad',
    link: 'https://example.com/Fintan',
    party: 'Party C',
  },
  {
    label: 'Baldor the Bold',
    link: 'https://example.com/Baldor',
    party: 'Party B',
  },
  {
    label: 'Gorg Ironfist',
    link: 'https://example.com/Gorg',
    party: 'Party A',
  },
  {
    label: 'Astrid the Archer',
    link: 'https://example.com/Astrid',
    party: 'Party C',
  },
  {
    label: 'Kethryllia Shadowstar',
    link: 'https://example.com/Kethryllia',
    party: 'Party B',
  },
  {
    label: 'Hrog the Hammer',
    link: 'https://example.com/Hrog',
    party: 'Party A',
  },
  {
    label: 'Lyra the Luminous',
    link: 'https://example.com/Lyra',
    party: 'Party B',
  },
  {
    label: 'Gethin the Grim',
    link: 'https://example.com/Gethin',
    party: 'Party A',
  },
  {
    label: 'Zephyr the Zealous',
    link: 'https://example.com/Zephyr',
    party: 'Party C',
  },
  {
    label: 'Eryndor the Evergreen',
    link: 'https://example.com/Eryndor',
    party: 'Party B',
  },
  {
    label: 'Sarai the Slayer',
    link: 'https://example.com/Sarai',
    party: 'Party A',
  },
  {
    label: 'Kael the Kind',
    link: 'https://example.com/Kael',
    party: 'Party C',
  },
  {
    label: 'Lirien the Loremaster',
    link: 'https://example.com/Lirien',
    party: 'Party B',
  },
  {
    label: 'Vesper the Valiant',
    link: 'https://example.com/Vesper',
    party: 'Party C',
  },
  {
    label: 'Gallio the Glorious',
    link: 'https://example.com/Gallio',
    party: 'Party A',
  },
];

export default {
  title: 'DesignSystem/Organisms/FilterListComponent',
  component: FilterListComponent,
  args: {
    heading: 'Some Heading',
    entries: dummyEntries,
    labelProp: 'label',
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [RouterTestingModule],
    }),
  ],
} as Meta<FilterListComponent<any>>;

const Template: StoryFn<FilterListComponent<any>> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NonLetterGroup = Template.bind({});
NonLetterGroup.args = {
  groupConfig: { mode: 'PROPERTY', groupProp: 'party' },
};
