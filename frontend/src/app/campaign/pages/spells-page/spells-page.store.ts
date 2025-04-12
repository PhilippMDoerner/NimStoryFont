import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { switchMap, take } from 'rxjs';
import {
  Spell,
  SpellPlayerClassConnection,
  SpellRaw,
} from 'src/app/_models/spell';
import { httpErrorToast } from 'src/app/_models/toast';
import { PlayerClassService } from 'src/app/_services/article/player-class.service';
import { SpellPlayerClassConnectionService } from 'src/app/_services/article/spell-player-class-connection.service';
import { SpellService } from 'src/app/_services/article/spell.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem, sortByProp } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

interface SpellsPageState {
  updateSpellState: RequestState;
  spellServerModel: Spell | undefined;
  deleteSpellState: RequestState;
  createSpellState: RequestState;
}

const initialState: SpellsPageState = {
  spellServerModel: undefined,
  updateSpellState: 'init',
  deleteSpellState: 'init',
  createSpellState: 'init',
};

export const SpellsPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const spellService = inject(SpellService);
    const playerService = inject(PlayerClassService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
    );

    return {
      spells: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            spellService.campaignDetailList(campaignName),
          ),
        ),
      playerClasses: () => playerService.list(),
    };
  }),
  withMethods((store) => {
    const toastService = inject(ToastService);
    const spellService = inject(SpellService);
    const connectionService = inject(SpellPlayerClassConnectionService);

    return {
      reset: () =>
        patchState(store, {
          updateSpellState: 'init',
          spellServerModel: undefined,
          deleteSpellState: 'init',
          createSpellState: 'init',
          spells: undefined,
          spellsError: undefined,
          spellsQueryState: 'init',
        }),
      updateSpell: (spell: Spell) => {
        patchState(store, {
          updateSpellState: 'loading',
          spellsError: undefined,
          spellServerModel: undefined,
        });

        spellService
          .update(spell.pk as number, spell)
          .pipe(take(1))
          .subscribe({
            next: (updatedSpell) => {
              const spells = store.spells();
              if (!spells) return;

              const newSpells = replaceItem(spells, updatedSpell, 'pk');
              patchState(store, {
                updateSpellState: 'success',
                spells: newSpells,
              });
            },
            error: (err: HttpErrorResponse) => {
              if (err.status === 409) {
                patchState(store, {
                  updateSpellState: 'error',
                  spellServerModel: err.error,
                });
              } else {
                toastService.addToast(httpErrorToast(err));
              }
            },
          });
      },
      deleteSpell: (spellPk: number) => {
        patchState(store, {
          deleteSpellState: 'loading',
          spellsError: undefined,
        });

        spellService
          .delete(spellPk)
          .pipe(take(1))
          .subscribe({
            next: () =>
              patchState(store, {
                deleteSpellState: 'success',
                spells: store.spells()?.filter((spell) => spell.pk !== spellPk),
              }),
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
      createSpell: (spell: SpellRaw) => {
        patchState(store, {
          createSpellState: 'loading',
          spellServerModel: undefined,
        });
        spellService.create(spell).subscribe({
          next: (newSpell) => {
            const newSpells = sortByProp(
              [...(store.spells() ?? []), newSpell],
              'name',
            );
            patchState(store, {
              createSpellState: 'success',
              spells: newSpells,
            });
          },
          error: (err: HttpErrorResponse) =>
            toastService.addToast(httpErrorToast(err)),
        });
      },
      addPlayerClassConnection: (connection: SpellPlayerClassConnection) => {
        connectionService.create(connection).subscribe({
          next: (newConnection) => {
            const updateSpellPk = newConnection.spell;
            const spellToUpdate = store
              .spells()
              ?.find((spell) => spell.pk === updateSpellPk);
            if (!spellToUpdate) return;

            const updatedSpell = {
              ...spellToUpdate,
              player_class_connections: [
                ...spellToUpdate.player_class_connections,
                newConnection,
              ],
            };
            const newSpells = replaceItem(
              store.spells() ?? [],
              updatedSpell,
              'pk',
            );
            patchState(store, { spells: newSpells });
          },
          error: (err: HttpErrorResponse) =>
            toastService.addToast(httpErrorToast(err)),
        });
      },
      removePlayerClassConnection: (connection: SpellPlayerClassConnection) => {
        connectionService.delete(connection.pk as number).subscribe({
          next: () => {
            const updateSpellPk = connection.spell;
            const spellToUpdate = store
              .spells()
              ?.find((spell) => spell.pk === updateSpellPk);
            if (!spellToUpdate) return;

            const updatedSpell = {
              ...spellToUpdate,
              player_class_connections:
                spellToUpdate.player_class_connections.filter(
                  (con) => con.pk !== connection.pk,
                ),
            };
            const newSpells = replaceItem(
              store.spells() ?? [],
              updatedSpell,
              'pk',
            );
            patchState(store, { spells: newSpells });
          },
        });
      },
    };
  }),
);
