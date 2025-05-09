import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { shareReplay, switchMap, take } from 'rxjs';
import { DiaryEntry } from 'src/app/_models/diaryentry';
import {
  Encounter,
  EncounterConnection,
  EncounterConnectionRaw,
  EncounterRaw,
} from 'src/app/_models/encounter';
import { httpErrorToast, successToast } from 'src/app/_models/toast';
import { CharacterService } from 'src/app/_services/article/character.service';
import { DiaryentryService } from 'src/app/_services/article/diaryentry.service';
import { EncounterConnectionService } from 'src/app/_services/article/encounter-connection.service';
import { EncounterService } from 'src/app/_services/article/encounter.service';
import { LocationService } from 'src/app/_services/article/location.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem, sortByProp } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

export interface DiaryEntryEncounter {
  encounter: Encounter | EncounterRaw;
  requestState: RequestState;
}

interface DiaryentryPageState {
  diaryEntryDeleteState: RequestState;
  encounterServerModel: Encounter | undefined;
  _encountersUpdateState: Record<number, RequestState>;
  _encountersBeingCreated: EncounterRaw[];
  isUpdatingGlobally: boolean;
}

const initialState: DiaryentryPageState = {
  diaryEntryDeleteState: 'init',
  encounterServerModel: undefined,
  _encountersUpdateState: {},
  _encountersBeingCreated: [],
  isUpdatingGlobally: false,
};

export const DiaryentryPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withQueries(() => {
    const diaryentryService = inject(DiaryentryService);
    const characterService = inject(CharacterService);
    const locationService = inject(LocationService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      diaryentry: (params: {
        name: string;
        isMainSession: 0 | 1;
        sessionNumber: number;
      }) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            diaryentryService.readByParam(campaignName, params),
          ),
        ),
      campaignCharacters: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            characterService.getNonPlayerCharacters(campaignName),
          ),
        ),
      campaignLocations: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            locationService.campaignList(campaignName),
          ),
        ),
    };
  }),
  withComputed((store) => {
    return {
      sortedEncounters: computed<Encounter[]>(() =>
        sortByProp(store.diaryentry()?.encounters ?? [], 'order_index'),
      ),
    };
  }),
  withComputed((store) => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
      diaryEntryEncounters: computed<DiaryEntryEncounter[]>(() => {
        const allEncounters: (Encounter | EncounterRaw)[] = [
          ...(store.diaryentry()?.encounters ?? []),
          ...store._encountersBeingCreated(),
        ];
        const sortedEncounters = sortByProp(allEncounters, 'order_index');
        return sortedEncounters.map((encounter) => {
          const updateStates = store._encountersUpdateState();
          return {
            encounter,
            requestState: updateStates[(encounter as Encounter).pk] ?? 'init',
          };
        });
      }),
      isUpdatingAnyEncounters: computed(() => {
        const encounterUpdateStates = store._encountersUpdateState();
        const encounterIds = Object.keys(encounterUpdateStates).map(Number);
        return encounterIds.some(
          (id) => encounterUpdateStates[id] === 'loading',
        );
      }),
      realEncounters: computed<Encounter[]>(
        () => store.diaryentry()?.encounters ?? [],
      ),
    };
  }),
  withMethods((store) => {
    const toastService = inject(ToastService);
    const diaryentryService = inject(DiaryentryService);
    const encounterConnectionService = inject(EncounterConnectionService);
    const encounterService = inject(EncounterService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );

    const updateEncounterList = (newEncounterList: Encounter[]) => {
      const newDiaryEntry = {
        ...(store.diaryentry() as DiaryEntry),
        encounters: newEncounterList,
      };
      patchState(store, { diaryentry: newDiaryEntry });
    };

    const setRequestState = (encounterPk: number, state: RequestState) => {
      const updatedIds = { ...store._encountersUpdateState() };
      updatedIds[encounterPk] = state;
      patchState(store, { _encountersUpdateState: updatedIds });
    };

    return {
      reset: () =>
        patchState(store, {
          diaryentry: undefined,
          diaryentryError: undefined,
          diaryEntryDeleteState: 'init',
          encounterServerModel: undefined,
          diaryentryQueryState: 'init',
        }),
      addEmptyEncounterForCreation: (encounter: EncounterRaw) => {
        patchState(store, {
          _encountersBeingCreated: [
            ...store._encountersBeingCreated(),
            encounter,
          ],
        });
      },
      removeEmptyEncounterForCreation: (encounter: EncounterRaw) => {
        patchState(store, {
          _encountersBeingCreated: store
            ._encountersBeingCreated()
            .filter((enc) => enc.order_index !== encounter.order_index),
        });
      },
      addEncounter: (encounter: EncounterRaw) => {
        encounterService
          .createForDiaryentry(encounter)
          .pipe(take(1))
          .subscribe({
            next: (newEncounterList) => {
              updateEncounterList(newEncounterList);
              toastService.addToast(successToast('Encounter created!'));
              patchState(store, {
                _encountersBeingCreated: store
                  ._encountersBeingCreated()
                  .filter((enc) => enc.order_index !== encounter.order_index),
              });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
      removeEncounter: (encounter: Encounter) => {
        setRequestState(encounter.pk, 'loading');
        encounterService
          .delete(encounter.pk)
          .pipe(take(1))
          .subscribe({
            next: () => {
              setRequestState(encounter.pk, 'success');
              const newEncounterList =
                store
                  .diaryentry()
                  ?.encounters?.filter(
                    (listEnc) => listEnc.pk !== encounter.pk,
                  ) ?? [];
              updateEncounterList(newEncounterList);
            },
            error: () => setRequestState(encounter.pk, 'error'),
          });
      },
      updateEncounter: (encounter: Encounter) => {
        setRequestState(encounter.pk, 'loading');
        encounterService
          .update(encounter.pk, encounter)
          .pipe(take(1))
          .subscribe({
            next: (newEncounter) => {
              setRequestState(encounter.pk, 'success');
              const diaryentry = store.diaryentry() as DiaryEntry;
              const newEncounterList = replaceItem(
                diaryentry.encounters ?? [],
                newEncounter,
                'pk',
              );
              updateEncounterList(newEncounterList);
            },
            error: () => setRequestState(encounter.pk, 'error'),
          });
      },
      swapEncounters: (encounter1Pk: number, encounter2Pk: number) => {
        setRequestState(encounter1Pk, 'loading');
        setRequestState(encounter2Pk, 'loading');
        patchState(store, { isUpdatingGlobally: true });
        campaignName$
          .pipe(
            take(1),
            switchMap((campaignName) =>
              encounterService.swapEncounterOrder(
                campaignName,
                encounter1Pk,
                encounter2Pk,
              ),
            ),
          )
          .subscribe({
            next: ([updatedEnc1, updatedEnc2]) => {
              setRequestState(encounter1Pk, 'success');
              setRequestState(encounter2Pk, 'success');
              const newEncounterList1 = replaceItem(
                store.realEncounters(),
                updatedEnc1,
                'pk',
              );
              const newEncounterList2 = replaceItem(
                newEncounterList1,
                updatedEnc2,
                'pk',
              );
              updateEncounterList(newEncounterList2);
              patchState(store, { isUpdatingGlobally: false });
            },
            error: () => {
              setRequestState(encounter1Pk, 'error');
              setRequestState(encounter2Pk, 'error');
            },
          });
      },
      cutInsertEncounter: (encounter: Encounter, newOrderIndex: number) => {
        setRequestState(encounter.pk, 'loading');
        patchState(store, { isUpdatingGlobally: true });
        campaignName$
          .pipe(
            take(1),
            switchMap((campaignName) =>
              encounterService.cutInsertEncounter(
                campaignName,
                encounter,
                newOrderIndex,
              ),
            ),
          )
          .subscribe({
            next: (newEncounterList) => {
              setRequestState(encounter.pk, 'success');
              updateEncounterList(newEncounterList);
              patchState(store, { isUpdatingGlobally: false });
            },
            error: () => setRequestState(encounter.pk, 'error'),
          });
      },
      addEncounterConnection: (connection: EncounterConnectionRaw) =>
        encounterConnectionService
          .create(connection)
          .pipe(take(1))
          .subscribe({
            next: (newConnection) => {
              const diaryentry = store.diaryentry() as DiaryEntry;
              const encounter = diaryentry.encounters.find(
                (enc) => enc.pk === newConnection.encounter,
              ) as Encounter;
              const newEncounter = {
                ...encounter,
                encounterConnections: [
                  ...(encounter.encounterConnections ?? []),
                  newConnection,
                ],
              };
              const newEncounterList = replaceItem(
                diaryentry.encounters ?? [],
                newEncounter,
                'pk',
              );
              updateEncounterList(newEncounterList);
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
      removeEncounterConnection: (connection: EncounterConnection) => {
        encounterConnectionService
          .delete(connection.pk as number)
          .pipe(take(1))
          .subscribe(() => {
            const diaryentry = store.diaryentry() as DiaryEntry;
            const encounter = diaryentry.encounters.find(
              (enc) => enc.pk === connection.encounter,
            ) as Encounter;
            const newEncounter = {
              ...encounter,
              encounterConnections: encounter.encounterConnections?.filter(
                (con) => con.pk !== connection.pk,
              ),
            };
            const newEncounterList = replaceItem(
              diaryentry.encounters ?? [],
              newEncounter,
              'pk',
            );
            updateEncounterList(newEncounterList);
          });
      },
      deleteDiaryEntry: () => {
        patchState(store, { diaryEntryDeleteState: 'loading' });
        diaryentryService
          .delete(store.diaryentry()?.pk as number)
          .pipe(take(1))
          .subscribe({
            next: () =>
              patchState(store, {
                diaryentry: undefined,
                diaryentryError: undefined,
                diaryEntryDeleteState: 'success',
              }),
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
    };
  }),
);
