import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';

interface FeatureConfig {
  enableRegistration: boolean;
  enablePublicCampaignCreation: boolean;
}

// const DEFAULT_CONFIG: FeatureConfig = {
//   enableRegistration: false,
//   enablePublicCampaignCreation: false,
// };

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private readonly http = inject(HttpClient);
  private readonly _features$ = rxResource({
    params: () => environment.configUrl,
    stream: ({ params }) => this.http.get<FeatureConfig>(params),
  });

  public features$ = this._features$.asReadonly();
}
