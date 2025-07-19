import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, tap } from 'rxjs';
import { toBoolean } from 'src/utils/bool';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';
import { encodeKeyCombination } from './_functions/keyMapper';
import {
  DEFAULT_MAPPINGS,
  KeyCombination,
  parseKeyCombinationStr,
  ShortcutAction,
  ShortcutMapping,
} from './_models/hotkey';
import { httpErrorToast } from './_models/toast';
import {
  GeneralMetadata,
  MetaDataEntry,
  ShortcutMetadataEntry,
} from './_models/userMetadata';
import { PreferencesService } from './_services/utils/preferences.service';
import { ToastService } from './design/organisms/toast-overlay/toast-overlay.component';

export interface UserPreferencesState {
  updateShortcutsState: RequestState;
  deleteShortcutsState: RequestState;
}

const initialState: UserPreferencesState = {
  updateShortcutsState: 'init',
  deleteShortcutsState: 'init',
};

export const UserPreferencesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const preferencesService = inject(PreferencesService);

    return {
      general: () => preferencesService.getGeneralUserMetadata(),
      shortcutEntries: () => preferencesService.getUserShortcuts(),
    };
  }),
  withComputed((state) => {
    return {
      shortcutMappings: computed(() => {
        const shortcutEntries = state.shortcutEntries();
        const modifiedShortcuts = shortcutEntries?.reduce((acc, entry) => {
          acc[entry.name as ShortcutAction] = {
            keys: entry.value,
            modified: true,
          };
          return acc;
        }, {} as ShortcutMapping);
        return {
          ...DEFAULT_MAPPINGS,
          ...modifiedShortcuts,
        };
      }),
    };
  }),
  withMethods((store) => {
    const preferencesService = inject(PreferencesService);
    const toastService = inject(ToastService);

    return {
      createMetaDataEntry: rxMethod<MetaDataEntry>(
        pipe(
          switchMap((entry) =>
            preferencesService.createUserMetadataEntry(entry),
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
                  break;
                }
                case 'shortcut': {
                  break;
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
      updateShortcut: rxMethod<{ action: string; keys: KeyCombination }>(
        pipe(
          map(({ action, keys }): MetaDataEntry => {
            const entryId = store
              .shortcutEntries()
              ?.find((entry) => entry.name === action)?.id;

            return {
              category: 'shortcut',
              name: action,
              value: encodeKeyCombination(keys),
              id: entryId,
            };
          }),
          tap(() => patchState(store, { updateShortcutsState: 'loading' })),
          switchMap((entry) => {
            const isNewEntry = entry.id == undefined;
            if (isNewEntry) {
              return preferencesService.createUserMetadataEntry(entry);
            } else {
              return preferencesService.updateUserMetadataEntry(entry);
            }
          }),
          map(
            (newEntry): ShortcutMetadataEntry => ({
              ...newEntry,
              value: parseKeyCombinationStr(newEntry.value) as KeyCombination,
            }),
          ),
          tapResponse({
            next: (newEntry) => {
              const oldList = store.shortcutEntries();
              const newList = oldList?.filter(
                (entry) => entry.name !== newEntry.name,
              );
              newList?.push(newEntry);
              patchState(store, {
                shortcutEntries: newList,
                updateShortcutsState: 'success',
              });
            },
            error: (err: HttpErrorResponse) => {
              const isBadRequest = err.status === 400;
              if (!isBadRequest) {
                toastService.addToast(httpErrorToast(err));
              }
              patchState(store, { updateShortcutsState: 'error' });
            },
          }),
        ),
      ),
      resetShortcut: rxMethod<ShortcutAction>(
        pipe(
          map(
            (action) =>
              store.shortcutEntries()?.find((entry) => entry.name === action)
                ?.id,
          ),
          filterNil(),
          tap(() => patchState(store, { deleteShortcutsState: 'loading' })),
          switchMap((entryId) =>
            preferencesService
              .deleteUserMetadataEntry(entryId)
              .pipe(map(() => entryId)),
          ),
          tapResponse({
            next: (entryId) => {
              const oldList = store.shortcutEntries();
              const newList = oldList?.filter((entry) => entry.id !== entryId);
              patchState(store, {
                shortcutEntries: newList,
                deleteShortcutsState: 'success',
              });
            },
            error: (err: HttpErrorResponse) => {
              const isBadRequest = err.status === 400;
              if (!isBadRequest) {
                toastService.addToast(httpErrorToast(err));
              }
              patchState(store, { deleteShortcutsState: 'error' });
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
