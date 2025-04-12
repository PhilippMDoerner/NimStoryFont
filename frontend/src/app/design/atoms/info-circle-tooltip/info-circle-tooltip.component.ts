import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  TemplateRef,
} from '@angular/core';
import { NgbTooltip, Placement } from '@ng-bootstrap/ng-bootstrap';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-info-circle-tooltip',
    templateUrl: './info-circle-tooltip.component.html',
    styleUrls: ['./info-circle-tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent, NgbTooltip]
})
export class InfoCircleTooltipComponent<T> {
  tooltip = input.required<string | TemplateRef<T>>();
  text = input.required<string>();
  placement = input<Placement>('top');

  tooltipKind = computed(() =>
    this.tooltip() instanceof TemplateRef ? 'custom' : 'text',
  );
}
