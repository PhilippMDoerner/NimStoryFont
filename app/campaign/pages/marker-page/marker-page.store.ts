import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { httpErrorToast } from 'src/app/_models/toast';
import { MarkerService } from 'src/app/_services/article/marker.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { NavigationStore } from 'src/app/navigation.store';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

interface MarkerState {}

const initialState: MarkerState = {};

export const MarkerPageStore = signalStore(
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const globalStore = inject(GlobalStore);
    const markerService = inject(MarkerService);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      marker: (param: {
        parentLocationName: string;
        locationName: string;
        name: string;
      }) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            markerService.readByParam(campaignName, param),
          ),
        ),
    };
  }),
  withMethods((store) => {
    const routingService = inject(RoutingService);
    const markerService = inject(MarkerService);
    const navigationStore = inject(NavigationStore);
    const router = inject(Router);
    const toastService = inject(ToastService);
    const globalStore = inject(GlobalStore);
    return {
      reset: () =>
        patchState(store, {
          marker: undefined,
          markerError: undefined,
          markerQueryState: 'init',
        }),
      deleteMarker: (markerPk: number) => {
        markerService.delete(markerPk).subscribe({
          next: () => {
            const fallback = routingService.getRoutePath('location', {
              campaign: globalStore.campaignName(),
              parent_name:
                store.marker()?.location_details?.parent_location_name,
              name: store.marker()?.location_details?.name,
            });
            router.navigateByUrl(navigationStore.priorUrl() ?? fallback);
          },
          error: (err: HttpErrorResponse) =>
            toastService.addToast(httpErrorToast(err)),
        });
      },
    };
  }),
);
