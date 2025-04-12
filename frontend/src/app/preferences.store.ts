import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { toBoolean } from 'src/utils/bool';
import { withQueries } from 'src/utils/store/withQueries';
import { httpErrorToast } from './_models/toast';
import { GeneralMetadata, MetaDataEntry } from './_models/userMetadata';
import { PreferencesService } from './_services/utils/preferences.service';
import { ToastService } from './design/organisms/toast-overlay/toast-overlay.component';

export interface PreferencesState {}

const initialState: PreferencesState = {};

export const PreferencesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const preferencesService = inject(PreferencesService);

    return {
      general: () => preferencesService.getGeneralUserMetadata(),
    };
  }),
  withMethods((store) => {
    const preferencesService = inject(PreferencesService);
    const toastService = inject(ToastService);

    return {
      createMetaDataEntry: rxMethod<MetaDataEntry>(
        pipe(
          switchMap((entry) =>
            preferencesService.createGeneralUserMetadataEntry(entry),
          ),
          tapResponse({
            next: (newEntry) => {
              switch (newEntry.category) {
                case 'general': {
                  const nextState = {
                    general: {
                      ...store.general(),
                      ...toGeneralMetadataSlice(newEntry),
                    } as GeneralMetadata,
                  };
                  patchState(store, nextState);
                }
              }
            },
            error: (err: HttpErrorResponse) => {
              const isBadRequest = err.status === 400;
              if (!isBadRequest) {
                toastService.addToast(httpErrorToast(err));
              }
            },
          }),
        ),
      ),
    };
  }),
);

function toGeneralMetadataSlice(
  newEntry: MetaDataEntry,
): Partial<GeneralMetadata> {
  switch (newEntry.name as keyof GeneralMetadata) {
    case 'hasSeenOnboarding':
      return {
        hasSeenOnboarding: toBoolean(newEntry.value),
      };
  }
}
