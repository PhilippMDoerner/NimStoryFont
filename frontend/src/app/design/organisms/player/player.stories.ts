import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { environment } from 'src/environments/environment';
import { PlayerComponent } from './player.component';

export default {
  title: 'DesignSystem/Organisms/PlayerComponent',
  component: PlayerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  args: {
    audioSource: 'https://www.kozco.com/tech/piano2-CoolEdit.mp3',
    downloadSource: 'https://www.potato.testurl.com',
    playTime: undefined,
    serverUrl: environment.backendDomain,
  },
} as Meta<PlayerComponent>;

const Template: StoryFn<PlayerComponent> = (args) => ({
  props: {
    ...args,
  },
  template: `
    <div style="margin-top: 25rem;">
      <app-player 
        [audioSource]="audioSource" 
        [downloadSource]="downloadSource"
        [playTime]="playTime"
        [serverUrl]="serverUrl"
      ></app-player>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};
