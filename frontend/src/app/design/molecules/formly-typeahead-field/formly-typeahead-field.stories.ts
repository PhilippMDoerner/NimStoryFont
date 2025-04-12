import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { of } from 'rxjs';
import { CustomTypeaheadProps } from 'src/app/_models/formly';
import { requiredMessage } from 'src/app/_services/formly/validators';
import { FormlyTypeaheadFieldComponent } from './formly-typeahead-field.component';

const dummyData: { label: string; value: number }[] = [
  { label: 'Something with a nice label', value: 1 },
  { label: 'Something else', value: 2 },
  { label: 'Another thing', value: 3 },
];

export default {
  title: 'DesignSystem/Molecules/FormlyTypeaheadFieldComponent',
  component: FormlyTypeaheadFieldComponent,
  args: {
    form: new FormGroup({}),
    model: {},
    options: {},
    fields: [
      {
        key: 'typeahead',
        type: 'typeahead',
        wrappers: ['form-field'],
        validation: ['required'],
        props: {
          required: true,
          label: 'Typeahead',
          additionalProperties: {
            getOptions: () => of(dummyData),
            optionLabelProp: 'label',
            optionValueProp: 'value',
            initialOption$: of(null),
            formatSearchTerm: (searchTerm) => searchTerm,
          } satisfies CustomTypeaheadProps<{ label: string; value: number }>,
        },
      } satisfies FormlyFieldConfig,
    ],
  },
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        FormlyBootstrapModule,
        NgbTypeaheadModule,
        FormlyModule.forRoot({
          types: [
            {
              name: 'typeahead',
              component: FormlyTypeaheadFieldComponent,
              wrappers: ['form-field'],
            },
          ],
          validationMessages: [requiredMessage],
        }),
      ],
    }),
  ],
} as Meta<FormlyTypeaheadFieldComponent<{ value: number; label: string }>>;

const Template: StoryFn<
  FormlyTypeaheadFieldComponent<{ value: number; label: string }>
> = (args) => {
  return {
    props: {
      ...args,
      onSubmit: (event: Event) => console.log('submitted', event, args.form),
    },
    template: `
        <form [formGroup]="form" (submit)="onSubmit($event)">
          <formly-form 
            [model]="model" 
            [fields]="fields" 
            [options]="options" 
            [form]="form"
            (onSubmit)="args.onSubmit($event)"
          ></formly-form>
        </form>
    `,
  };
};

export const Default = Template.bind({});
Default.args = {};
