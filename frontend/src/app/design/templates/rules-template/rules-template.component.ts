import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rule, RuleRaw } from 'src/app/_models/rule';
import { RoutingService } from 'src/app/_services/routing.service';
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
})
export class RulesTemplateComponent {
  campaignName = input.required<string>();
  campaignId = input.required<number>();
  rules = input.required<Rule[]>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Rule | undefined>();

  readonly ruleDelete = output<Rule>();
  readonly ruleUpdate = output<Rule>();
  readonly ruleCreate = output<RuleRaw>();

  routingService = inject(RoutingService);

  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', { campaign: this.campaignName() }),
  );
}
