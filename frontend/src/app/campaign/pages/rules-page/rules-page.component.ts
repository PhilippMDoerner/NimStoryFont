import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { RulesTemplateComponent } from 'src/app/design/templates/rules-template/rules-template.component';
import { GlobalStore } from 'src/app/global.store';
import { RulesPageStore } from './rules-page.store';

@Component({
  selector: 'app-rules-page',
  imports: [RulesTemplateComponent],
  templateUrl: './rules-page.component.html',
  styleUrl: './rules-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RulesPageComponent {
  store = inject(RulesPageStore);
  globalStore = inject(GlobalStore);

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(
      () =>
        this.store.rules() == null ||
        this.globalStore.currentCampaign() == null,
    );

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);
  }
}
