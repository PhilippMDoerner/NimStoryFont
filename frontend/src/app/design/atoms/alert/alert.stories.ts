import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ELEMENT_TYPES, ElementKind } from '../_models/button';
import { AlertComponent } from './alert.component';

export default {
  title: 'DesignSystem/Atoms/AlertComponent',
  component: AlertComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      declarations: [],
    }),
  ],
  args: {
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci temporibus quas, quam veniam beatae necessitatibus. Ut cupiditate illo harum debitis. Temporibus accusamus, ab exercitationem vero assumenda saepe recusandae nostrum similique.',
    kind: 'PRIMARY' satisfies ElementKind,
  },
} as Meta<AlertComponent>;

type Story = StoryObj<AlertComponent>;

export const Default: Story = {};
const Stories: { [key in (typeof ELEMENT_TYPES)[number]]: Story } =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ELEMENT_TYPES.reduce((acc: any, type) => {
    acc[type] = {
      args: {
        type,
      },
    };
    return acc;
  }, {});

export const PRIMARY = Stories.PRIMARY;
export const SECONDARY = Stories.SECONDARY;
export const DANGER = Stories.DANGER;
export const DARK = Stories.DARK;
export const INFO = Stories.INFO;
export const LIGHT = Stories.LIGHT;
export const WARNING = Stories.WARNING;
