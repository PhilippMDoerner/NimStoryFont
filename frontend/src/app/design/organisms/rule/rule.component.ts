import { NgTemplateOutlet } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Rule, RuleRaw } from 'src/app/_models/rule';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { HtmlTextComponent } from 'src/app/design/atoms/html-text/html-text.component';
import {
  CompareFormComponent,
  ConfirmationToggleButtonComponent,
  EditToggleComponent,
  FormComponent,
} from 'src/app/design/molecules';

type RuleState = 'DISPLAY' | 'CREATE' | 'UPDATE' | 'OUTDATED_UPDATE';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
  imports: [
    NgTemplateOutlet,
    EditToggleComponent,
    HtmlTextComponent,
    ConfirmationToggleButtonComponent,
    FormComponent,
    CompareFormComponent,
  ],
})
export class RuleComponent implements OnInit {
  rule = input.required<Rule | undefined>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  disabledHotkeys = input<boolean>(false);
  serverModel = input.required<Rule | undefined>();
  cancelButtonType = input<ElementKind>('SECONDARY');
  submitButtonType = input<ElementKind>('PRIMARY');

  readonly ruleDelete = output<Rule>();
  readonly ruleCreate = output<RuleRaw>();
  readonly ruleUpdate = output<Rule>();
  readonly ruleCreateCancel = output<void>();

  userModel = signal<Rule | undefined>(undefined);
  state = signal<RuleState>('DISPLAY');

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.buildInputConfig({
      key: 'name',
      inputKind: 'NAME',
    }),
    this.formlyService.buildEditorConfig({
      key: 'description',
    }),
  ];

  constructor(private formlyService: FormlyService) {}

  ngOnInit(): void {
    const isInCreateScenario = this.rule()?.pk == null && this.canCreate;
    if (isInCreateScenario) {
      this.changeState('CREATE', {} as Rule);
      return;
    }

    this.changeState('DISPLAY', undefined);
  }

  onToggle(toggled: boolean) {
    const isInCreateScenario = this.state() === 'CREATE';
    if (isInCreateScenario) {
      this.onRuleCreateCancel();
      return;
    }

    const isInDisplayState = this.state() === 'DISPLAY';
    const nextState = isInDisplayState ? 'UPDATE' : 'DISPLAY';
    const nextModel: Rule | undefined = toggled
      ? ({ ...this.rule() } as Rule)
      : undefined;
    this.changeState(nextState, nextModel);
  }

  changeState(newState: RuleState, newModel: Rule | undefined) {
    this.state.set(newState);
    this.userModel.set({ ...newModel } as Rule);
  }

  onRuleCreate(rule?: Partial<RuleRaw>) {
    this.ruleCreate.emit(rule as RuleRaw);
    this.changeState('DISPLAY', undefined);
  }

  onRuleDelete() {
    this.ruleDelete.emit(this.rule() as Rule);
  }

  onRuleUpdate(rule?: Partial<Rule>) {
    this.ruleUpdate.emit(rule as Rule);
    this.changeState('DISPLAY', undefined);
  }

  onRuleCreateCancel() {
    this.changeState('DISPLAY', undefined);
    this.ruleCreateCancel.emit();
  }
}
