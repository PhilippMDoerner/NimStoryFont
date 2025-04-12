import { Meta, StoryFn } from '@storybook/angular';
import { HtmlTextComponent } from './html-text.component';

const htmlDummyText = `
<div class="content note-editor notes">
<h2>Official Description</h2>
<p>Morrigan is one of the four prime deities of Aldrune. The people worship her as the reality of war and for one who comforts those who died dizzy with fear and miles from home.<br /><br />It is said Morrigan was once a fierce warrior, who served her King faithfully. Wining him many battles and always when asked how the battle went she would tell him honestly. It was hell.</p>
<p>Morrigan does not shy away from blood, death, chaos and violence. She instead chooses to wear it as a mantle of responsibility. The same duty a warrior has when fighting for their liege. She can often be seen walking riverside battlefields, taking bloody clothes and washing them in the waters till they are stained red. Showing the world the sacrifice made by the people who died that day.</p>
<p>She has been related to the Crows that show up after the battle to scavenge, but this is not an association she chose, but more an association of circumstance.</p>
<h2>Tenets of Morrigan</h2>
<ul>
<li>War is blood and chaos, and we will not look away from it.</li>
<li>Fear is fire, let it burn to hot and it will consume all, but use it as fuel and you can accomplish much.</li>
<li>Duty over all, especially to your Lord and King.</li>
<li>Those who suffer for their duty deserve respect, regardless of which side they are on.</li>
<li>Ferocity on the battlefield is beauty.</li>
</ul>
<h2>Personal Description</h2>
<p>Morrigan is more than just a goddess for the living, she is also one for the dead. It is she that tries to appease the spirit of the restless undead after a horrible battle. It is she that has lived through all this chaos and horror and not looked away, who can empathize with what these people went through and give them the peace they need to return to the river of the dead.</p>
<p>She strongly adheres to the philosophy of "I am the only one that can do this, so I must do it because the world needs it". And with her as a role model, so does her church.</p>
<p>She for the most part wanders about in her civilian form, aiding those she can and giving them peace. But beware of angering her, as her battle-form will quickly give you a taste of Remorse.</p>
</div>
`;

export default {
  title: 'DesignSystem/Atoms/HtmlTextComponent',
  component: HtmlTextComponent,

  args: {
    text: htmlDummyText,
  },
} as Meta<HtmlTextComponent>;

const Template: StoryFn<HtmlTextComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};

export const NoText = Template.bind({});
NoText.args = {
  text: undefined,
};

export const EmptyText = Template.bind({});
EmptyText.args = {
  text: '',
};

export const NoHtml = Template.bind({});
NoHtml.args = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda eveniet commodi, aspernatur ipsum non, a adipisci tempora quo quis, temporibus nihil. Cumque nostrum ab, repellat ducimus recusandae dolor. Recusandae, sint!',
};
