import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { Rule, RuleRaw } from 'src/app/_models/rule';
import {
  slideOutFromBottom,
  slideUpFromBottom,
} from 'src/app/design/animations/slideDown';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { CollapsiblePanelComponent } from 'src/app/design/molecules';
import { getPseudoRandomId } from 'src/utils/math';
import { filterNil } from 'src/utils/rxjs-operators';
import {
  FocusItem,
  FocusListComponent,
  FocusListContextTypecastDirective,
} from '../focus-list/focus-list.component';
import { RuleComponent } from '../rule/rule.component';

interface RuleCard {
  rule: Rule;
  isOpen: boolean;
}

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  animations: [slideOutFromBottom, slideUpFromBottom],
  imports: [
    ButtonComponent,
    CollapsiblePanelComponent,
    RuleComponent,
    SpinnerComponent,
    HotkeyDirective,
    FocusListComponent,
    FocusListContextTypecastDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesComponent {
  DEFAULT_TITLE = 'New Rule';

  campaignId = input.required<number>();
  rules = input.required<Rule[]>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Rule | undefined>();

  readonly ruleDelete = output<Rule>();
  readonly ruleUpdate = output<Rule>();
  readonly ruleCreate = output<RuleRaw>();

  ruleElements = viewChildren<ElementRef<HTMLDivElement>>('rule');
  isCreatingRule = signal(false);
  createRuleData = computed(
    () =>
      ({
        name: this.DEFAULT_TITLE,
        campaign: this.campaignId(),
      }) as Rule,
  );

  ruleCards = computed<FocusItem<RuleCard>[]>(() =>
    this.rules().map((rule) => ({
      id: rule.pk ?? getPseudoRandomId(),
      data: { rule: rule, isOpen: false },
    })),
  );

  constructor() {
    const ruleNameParam = inject(ActivatedRoute).snapshot.params['name'];
    if (ruleNameParam) {
      this.scrollToRule(ruleNameParam);
    }
  }

  onRuleDelete(ruleToDelete: Rule) {
    this.ruleDelete.emit(ruleToDelete);
  }

  onRuleCreate(rule: Partial<RuleRaw>) {
    this.ruleCreate.emit({ ...rule, campaign: this.campaignId() } as RuleRaw);
    this.isCreatingRule.set(false);
  }

  cancelRuleCreation() {
    this.isCreatingRule.set(false);
  }

  addRule() {
    this.isCreatingRule.set(true);
  }

  private scrollToRule(ruleName: string): void {
    toObservable(this.ruleElements)
      .pipe(
        takeUntilDestroyed(),
        map((elements) =>
          elements.find((el) => el.nativeElement.id === ruleName),
        ),
        filterNil(),
        take(1),
      )
      .subscribe((ruleElement) => {
        const element = ruleElement.nativeElement;
        element.scrollIntoView({ behavior: 'instant' });
      });
  }
}
