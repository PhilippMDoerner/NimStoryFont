import { forwardRef } from '@angular/core';
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { FormlyEditorFieldComponent } from './formly-editor-field.component';

export default {
  title: 'DesignSystem/Organisms/FormlyEditorFieldComponent',
  component: FormlyEditorFieldComponent,
  args: {
    form: new FormGroup({}),
    model: {},
    options: {},
    fields: [
      {
        key: 'text',
        type: 'text-editor',
      },
    ],
  },
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormlyBootstrapModule,
        FormlyModule.forRoot({
          types: [
            { name: 'text-editor', component: FormlyEditorFieldComponent },
          ],
        }),
      ],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => FormlyEditorFieldComponent),
          multi: true,
        },
      ],
    }),
    componentWrapperDecorator(
      () => `
      <form [formGroup]="form">
        <formly-form
          [model]="model"
          [fields]="fields"
          [options]="options"
          [form]="form"
        ></formly-form>
      </form>
    `,
    ),
  ],
} as Meta<FormlyEditorFieldComponent>;

const Template: StoryFn<FormlyEditorFieldComponent> = (
  args: FormlyEditorFieldComponent,
) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
