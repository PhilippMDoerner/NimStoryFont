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
import { getPseudoRandomId } from '../../../../utils/math';
import { filterNil } from '../../../../utils/rxjs-operators';
import { HotkeyDirective } from '../../../_directives/hotkey.directive';
import { Rule, RuleRaw } from '../../../_models/rule';
import {
  slideOutFromBottom,
  slideUpFromBottom,
} from '../../animations/slideDown';
import { ButtonComponent } from '../../atoms/button/button.component';
import { SpinnerComponent } from '../../atoms/spinner/spinner.component';
import { CollapsiblePanelComponent } from '../../molecules';
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
  readonly DEFAULT_TITLE = 'New Rule';

  readonly campaignId = input.required<number>();
  readonly rules = input.required<Rule[]>();
  readonly canUpdate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly serverModel = input.required<Rule | undefined>();

  readonly ruleDelete = output<Rule>();
  readonly ruleUpdate = output<Rule>();
  readonly ruleCreate = output<RuleRaw>();

  readonly ruleElements = viewChildren<ElementRef<HTMLDivElement>>('rule');
  readonly isCreatingRule = signal(false);
  readonly createRuleData = computed(
    () =>
      ({
        name: this.DEFAULT_TITLE,
        campaign: this.campaignId(),
      }) as Rule,
  );

  readonly ruleCards = computed<FocusItem<RuleCard>[]>(() =>
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
