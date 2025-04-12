import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Rule } from 'src/app/_models/rule';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import * as all from 'tinymce/tinymce';
import { RulesTemplateComponent } from './rules-template.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const x = all;

const dummyRule: Rule = {
  getAbsoluteRouterUrl: () => '/dnd/rules/1',
  pk: 1,
  name: "The 'Critical Hit' Rule",
  creation_datetime: '2022-03-15T10:30:00Z',
  update_datetime: '2022-03-18T16:45:00Z',
  description: `
    <p>In our campaign, we've decided to implement a 'critical hit' rule that can add some extra excitement to combat encounters. Whenever a player rolls a natural 20 on an attack roll, they will score a critical hit. This means that they will automatically hit their target, regardless of the target's AC, and will deal maximum damage for that attack. This rule applies to both players and enemies, so everyone has a chance to land a critical hit! </p>

    <p>However, there is a risk involved in attempting a critical hit. If a player rolls a natural 1 on their attack roll while attempting a critical hit, they will suffer a critical failure. This means that their attack will miss and they will take some form of penalty, such as losing their balance and falling prone, or damaging their weapon in the process. This adds an element of unpredictability to combat, and encourages players to weigh the potential rewards and risks of attempting a critical hit." </p>

    <p> This rule adds an exciting element of chance to combat encounters in the campaign, while also providing some risk and uncertainty for players who attempt to score a critical hit. By implementing this rule, players will have to think strategically about when to attempt a critical hit and when to play it safe, adding an additional layer of strategy and excitement to combat encounters. </p>
  `,
  campaign: 2,
  campaign_details: { id: 2, name: 'The Quest for the Lost City' },
};

export default {
  title: 'DesignSystem/Templates/RulesTemplateComponent',
  component: RulesTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule, FORMLY_MODULE],
      declarations: [],
    }),
  ],
  args: {
    rules: Array(10).fill(dummyRule),
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    serverModel: undefined,
    campaignName: 'Aldrune',
  },
} as Meta<RulesTemplateComponent>;

const Template: StoryFn<RulesTemplateComponent> = (args) => ({
  props: {
    ...args,
    ruleDelete: action('ruleDelete'),
    ruleUpdate: action('ruleUpdate'),
    ruleCreate: action('ruleCreate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermissions = Template.bind({});
NoPermissions.args = {
  canUpdate: false,
  canCreate: false,
  canDelete: false,
};

export const NoRules = Template.bind({});
NoRules.args = {
  rules: [],
};
