import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Rule } from 'src/app/_models/rule';
import { FORMLY_MODULE } from 'src/app/_modules/formly_constants';
import { RuleComponent } from './rule.component';

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
  title: 'DesignSystem/Organisms/RuleComponent',
  component: RuleComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule, FORMLY_MODULE, BrowserAnimationsModule],
      declarations: [],
    }),
  ],
  args: {
    rule: dummyRule,
    canCreate: true,
    canUpdate: true,
    canDelete: true,
    serverModel: undefined,
  },
} as Meta<RuleComponent>;

const Template: StoryFn<RuleComponent> = (args) => ({
  props: {
    ...args,
    ruleDelete: action('ruleDelete'),
    ruleCreate: action('ruleCreate'),
    ruleUpdate: action('ruleUpdate'),
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoPermission = Template.bind({});
NoPermission.args = {
  canCreate: false,
  canUpdate: false,
  canDelete: false,
};

export const NoRule = Template.bind({});
NoRule.args = {
  rule: undefined,
};

export const NoRuleNoCreate = Template.bind({});
NoRuleNoCreate.args = {
  rule: undefined,
  canCreate: false,
};
