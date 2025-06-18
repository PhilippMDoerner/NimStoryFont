import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Rule, RuleRaw } from 'src/app/_models/rule';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { ElementKind } from 'src/app/design/atoms/_models/button';
import { HtmlTextComponent } from 'src/app/design/atoms/html-text/html-text.component';
import { CompareFormComponent, FormComponent } from 'src/app/design/molecules';
import {
  DEFAULT_DELETE_MODAL_DATA,
  MenuItem,
} from '../../molecules/_models/menu';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';

type RuleState = 'DISPLAY' | 'CREATE' | 'UPDATE' | 'OUTDATED_UPDATE';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
  imports: [
    NgTemplateOutlet,
    HtmlTextComponent,
    FormComponent,
    CompareFormComponent,
    ContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  contextMenuItems = computed<MenuItem[]>(() => {
    const menuItems: MenuItem[] = [];
    if (this.canUpdate()) {
      menuItems.push({
        kind: 'BUTTON',
        actionName: 'update',
        label: 'Edit',
        icon: 'pencil',
        active: this.state() === 'UPDATE' || this.state() === 'OUTDATED_UPDATE',
        hotkey: this.disabledHotkeys() ? undefined : 'e',
      });
    }

    if (this.canDelete()) {
      menuItems.push({
        kind: 'CONFIRM',
        actionName: 'delete',
        label: 'Delete',
        icon: 'trash',
        hotkey: this.disabledHotkeys() ? undefined : 'd',
        modal: {
          ...DEFAULT_DELETE_MODAL_DATA,
          heading: `Delete ${this.rule()?.name}`,
          body: `Are you sure you want to delete ${this.rule()?.name}?`,
        },
      });
    }

    return menuItems;
  });

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

  onActionTriggered(action: string): void {
    switch (action) {
      case 'update':
        this.toggleAwayFromState(this.state());
        break;
      case 'delete':
        this.onRuleDelete();
        break;
    }
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

  private toggleAwayFromState(state: RuleState) {
    switch (state) {
      case 'CREATE':
        this.onRuleCreateCancel();
        break;
      case 'DISPLAY':
        this.changeState('UPDATE', { ...(this.rule() as Rule) });
        break;
      case 'UPDATE':
      case 'OUTDATED_UPDATE':
        this.changeState('DISPLAY', undefined);
        break;
    }
  }
}
