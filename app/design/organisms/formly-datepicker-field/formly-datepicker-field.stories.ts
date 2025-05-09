import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { FormlyDatepickerFieldComponent } from './formly-datepicker-field.component';

export default {
  title: 'DesignSystem/Organisms/FormlyDatepickerFieldComponent',
  component: FormlyDatepickerFieldComponent,
  args: {
    form: new FormGroup({}),
    model: {},
    options: {},
    fields: [
      {
        key: 'date',
        type: 'datepicker',
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
            { name: 'datepicker', component: FormlyDatepickerFieldComponent },
          ],
        }),
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
} as Meta<FormlyDatepickerFieldComponent>;

const Template: StoryFn<FormlyDatepickerFieldComponent> = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {};
