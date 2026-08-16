import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SpellsTemplateComponent } from '../../../design/templates/spells-template/spells-template.component';
import { GlobalStore } from '../../../global.store';
import { SpellsPageStore } from './spells-page.store';

@Component({
  selector: 'app-spells-page',
  imports: [SpellsTemplateComponent],
  templateUrl: './spells-page.component.html',
  styleUrl: './spells-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsPageComponent {
  readonly store = inject(SpellsPageStore);
  readonly globalStore = inject(GlobalStore);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () =>
        this.store.spells() == null ||
        this.globalStore.currentCampaign() == null,
    );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
