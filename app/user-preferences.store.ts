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
import { toBoolean } from '../utils/bool';
import { filterNil } from '../utils/rxjs-operators';
import { RequestState } from '../utils/store/factory-types';
import { withQueries } from '../utils/store/withQueries';
import { encodeKeyCombination } from './_functions/keyMapper';
import {
  DEFAULT_HOTKEY_MAPPINGS,
  HotkeyAction,
  HotkeyMapping,
  KeyCombination,
  parseKeyCombinationStr,
} from './_models/hotkey';
import { httpErrorToast } from './_models/toast';
import {
  GeneralMetadata,
  MetaDataEntry,
  MetaDataEntryRaw,
  ShortcutMetadataEntry,
} from './_models/userMetadata';
import { PreferencesService } from './_services/utils/preferences.service';
import { ToastService } from './design/organisms/toast-overlay/toast.service';

export interface UserPreferencesState {
  updateHotkeysState: RequestState;
  deleteHotkeysState: RequestState;
}

const initialState: UserPreferencesState = {
  updateHotkeysState: 'init',
  deleteHotkeysState: 'init',
};

export const UserPreferencesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withQueries(() => {
    const preferencesService = inject(PreferencesService);

    return {
      general: () => preferencesService.getGeneralUserMetadata(),
      hotkeyEntries: () => preferencesService.getUserHotkeys(),
    };
  }),
  withComputed((state) => {
    return {
      hotkeyMappings: computed(() => {
        const hotkeyEntries = state.hotkeyEntries();
        const modifiedHotkeys = hotkeyEntries?.reduce((acc, entry) => {
          acc[entry.name as HotkeyAction] = {
            keys: entry.value,
            modified: true,
          };
          return acc;
        }, {} as HotkeyMapping);
        return {
          ...DEFAULT_HOTKEY_MAPPINGS,
          ...modifiedHotkeys,
        };
      }),
    };
  }),
  withMethods((store) => {
    const preferencesService = inject(PreferencesService);
    const toastService = inject(ToastService);

    return {
      createMetaDataEntry: rxMethod<MetaDataEntryRaw>(
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
                case 'editor-shortcuts': {
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
      updateHotkey: rxMethod<{ action: string; keys: KeyCombination }>(
        pipe(
          map(({ action, keys }): MetaDataEntry => {
            const entry = store
              .hotkeyEntries()
              ?.find((entry) => entry.name === action) as ShortcutMetadataEntry;

            return {
              category: 'shortcut',
              name: action,
              value: encodeKeyCombination(keys),
              id: entry?.id,
              user_id: entry?.user_id,
            };
          }),
          tap(() => patchState(store, { updateHotkeysState: 'loading' })),
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
              const oldList = store.hotkeyEntries();
              const newList = oldList?.filter(
                (entry) => entry.name !== newEntry.name,
              );
              newList?.push(newEntry);
              patchState(store, {
                hotkeyEntries: newList,
                updateHotkeysState: 'success',
              });
            },
            error: (err: HttpErrorResponse) => {
              const isBadRequest = err.status === 400;
              if (!isBadRequest) {
                toastService.addToast(httpErrorToast(err));
              }
              patchState(store, { updateHotkeysState: 'error' });
            },
          }),
        ),
      ),
      resetShortcut: rxMethod<HotkeyAction>(
        pipe(
          map(
            (action) =>
              store.hotkeyEntries()?.find((entry) => entry.name === action)?.id,
          ),
          filterNil(),
          tap(() => patchState(store, { deleteHotkeysState: 'loading' })),
          switchMap((entryId) =>
            preferencesService
              .deleteUserMetadataEntry(entryId)
              .pipe(map(() => entryId)),
          ),
          tapResponse({
            next: (entryId) => {
              const oldList = store.hotkeyEntries();
              const newList = oldList?.filter((entry) => entry.id !== entryId);
              patchState(store, {
                hotkeyEntries: newList,
                deleteHotkeysState: 'success',
              });
            },
            error: (err: HttpErrorResponse) => {
              const isBadRequest = err.status === 400;
              if (!isBadRequest) {
                toastService.addToast(httpErrorToast(err));
              }
              patchState(store, { deleteHotkeysState: 'error' });
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
