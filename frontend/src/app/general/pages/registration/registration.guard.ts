import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { FeatureService } from 'src/app/_services/utils/feature.service';
import { filterNil } from 'src/utils/rxjs-operators';

export const registrationGuard: CanActivateFn = () => {
  const featureService = inject(FeatureService);

  return toObservable(featureService.features$.value).pipe(
    filterNil(),
    map((config) => config.enableRegistration),
  );
};
