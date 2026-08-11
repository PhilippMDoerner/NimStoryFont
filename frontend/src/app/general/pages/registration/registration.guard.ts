import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { filterNil } from '../../../../utils/rxjs-operators';
import { FeatureService } from '../../../_services/utils/feature.service';

export const registrationGuard: CanActivateFn = () => {
  const featureService = inject(FeatureService);

  return toObservable(featureService.features$.value).pipe(
    filterNil(),
    map((config) => config.enableRegistration),
  );
};
