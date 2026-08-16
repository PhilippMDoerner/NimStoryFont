import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MarkerComponent } from '../../../design/templates/marker/marker.component';
import { GlobalStore } from '../../../global.store';
import { MarkerPageStore } from './marker-page.store';

@Component({
  selector: 'app-marker-page',
  imports: [MarkerComponent],
  templateUrl: './marker-page.component.html',
  styleUrl: './marker-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerPageComponent {
  readonly store = inject(MarkerPageStore);
  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.store.marker() == null);

  constructor() {
    inject(GlobalStore).trackIsPageLoading(this.isPageLoading);
  }
}
