import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-placeholder',
    imports: [],
    host: {
        class: 'placeholder-wave',
        'aria-hidden': 'true',
    },
    templateUrl: './placeholder.component.html',
    styleUrl: './placeholder.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {}
