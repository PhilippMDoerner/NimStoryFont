import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rule, RuleRaw } from '../../../_models/rule';
import { RoutingService } from '../../../_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { RulesComponent } from '../../organisms/rules/rules.component';

@Component({
  selector: 'app-rules-template',
  templateUrl: './rules-template.component.html',
  styleUrls: ['./rules-template.component.scss'],
  imports: [
    PageContainerComponent,
    RulesComponent,
    RouterLink,
    ButtonLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesTemplateComponent {
  readonly campaignName = input.required<string>();
  readonly campaignId = input.required<number>();
  readonly rules = input.required<Rule[]>();
  readonly canUpdate = input.required<boolean>();
  readonly canDelete = input.required<boolean>();
  readonly canCreate = input.required<boolean>();
  readonly serverModel = input.required<Rule | undefined>();

  readonly ruleDelete = output<Rule>();
  readonly ruleUpdate = output<Rule>();
  readonly ruleCreate = output<RuleRaw>();

  readonly routingService = inject(RoutingService);

  readonly homeUrl = computed(() =>
    this.routingService.getRoutePath('home', { campaign: this.campaignName() }),
  );
}
