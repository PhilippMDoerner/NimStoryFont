import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ElementKind } from '../_models/button';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    imports: [NgClass],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  kind = input.required<ElementKind>();
}
