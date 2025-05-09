import { FormlyModule } from '@ngx-formly/core';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { Timestamp } from 'src/app/_models/sessionAudio';
import {
  integerValidator,
  invalidTimeMessage,
  notIntegerMessage,
  requiredMessage,
  requiredValidator,
  timeValidator,
} from 'src/app/_services/formly/validators';
import { SessionaudioPlayerComponent } from './sessionaudio-player.component';

const dummyTimestamps: Timestamp[] = [
  {
    pk: 1,
    name: 'Timestamp 1',
    time: 1.5,
    encounter: 'Encounter 1',
    session_audio: 123,
  },
  {
    pk: 2,
    name: 'Timestamp 2',
    time: 2.3,
    encounter: 'Encounter 1',
    session_audio: 123,
  },
  {
    pk: 3,
    name: 'Timestamp 3',
    time: 3.2,
    encounter: 'Encounter 2',
    session_audio: 456,
  },
  {
    pk: 4,
    name: 'Timestdsfa fasdfdas fsdafsdamp 4',
    time: 4.1,
    encounter: 'Encounter 2',
    session_audio: 456,
  },
  { pk: 5, name: 'Timestamp 5', time: 4.8, session_audio: 789 },
];

export default {
  title: 'DesignSystem/Organisms/SessionaudioPlayerComponent',
  component: SessionaudioPlayerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormlyModule.forRoot({
          validationMessages: [
            requiredMessage,
            notIntegerMessage,
            invalidTimeMessage,
          ],
          validators: [requiredValidator, integerValidator, timeValidator],
        }),
      ],
    }),
  ],
  args: {
    audioSource: '/tech/piano2-CoolEdit.mp3',
    downloadSource: 'https://www.potato.testurl.com',
    canDelete: true,
    canCreate: true,
    timestamps: dummyTimestamps,
    serverUrl: 'https://www.kozco.com',
  },
} as Meta<SessionaudioPlayerComponent>;

const Template: StoryFn<SessionaudioPlayerComponent> = (args) => ({
  props: {
    ...args,
    deleteTimestamp: action('deleteTimestamp'),
    createTimestamp: action('createTimestamp'),
  },
});

export const Default = Template.bind({});
Default.args = {};
