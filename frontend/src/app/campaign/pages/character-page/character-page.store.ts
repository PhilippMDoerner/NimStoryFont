import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, filter, map, pipe, switchMap, take } from 'rxjs';
import {
  CharacterDetails,
  CharacterEncounter,
  CharacterOrganizationMembership,
} from 'src/app/_models/character';
import { Encounter, EncounterConnection } from 'src/app/_models/encounter';
import { CharacterPlayerClassConnectionRaw } from 'src/app/_models/playerclass';
import { Quote, QuoteConnection, QuoteRaw } from 'src/app/_models/quote';
import { errorToast, httpErrorToast } from 'src/app/_models/toast';
import { CharacterPlayerClassConnectionService } from 'src/app/_services/article/character-player-class-connection.service';
import { CharacterService } from 'src/app/_services/article/character.service';
import { EncounterConnectionService } from 'src/app/_services/article/encounter-connection.service';
import { EncounterService } from 'src/app/_services/article/encounter.service';
import { LocationService } from 'src/app/_services/article/location.service';
import { OrganizationMembershipService } from 'src/app/_services/article/organization-membership.service';
import { OrganizationService } from 'src/app/_services/article/organization.service';
import { PlayerClassService } from 'src/app/_services/article/player-class.service';
import { QuoteConnectionService } from 'src/app/_services/article/quote-connection.service';
import { QuoteService } from 'src/app/_services/article/quote.service';
import { SessionService } from 'src/app/_services/article/session.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { findByProp, removeByProp, replaceItem } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { withImages } from 'src/utils/store/withImages';
import { withQueries } from 'src/utils/store/withQueries';
import { withUpdates } from 'src/utils/store/withUpdates';
export interface CharacterPageState {
  encounterServerModel: Encounter | undefined;
  quoteServerModel: Quote | undefined;
}

const initialState: CharacterPageState = {
  encounterServerModel: undefined,
  quoteServerModel: undefined,
};

export const CharacterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const characterService = inject(CharacterService);
    const quoteService = inject(QuoteService);
    const encounterService = inject(EncounterService);
    const organizationService = inject(OrganizationService);
    const sessionService = inject(SessionService);
    const playerClassService = inject(PlayerClassService);
    const locationService = inject(LocationService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      take(1),
    );
    return {
      character: (name: string) =>
        campaignName$.pipe(
          switchMap((campaign) =>
            characterService.readByParam(campaign, { name }),
          ),
        ),
      campaignNPCCharacters: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            characterService.getNonPlayerCharacters(campaignName),
          ),
        ),
      campaignCharacters: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            characterService.campaignList(campaignName),
          ),
        ),
      campaignPlayerClasses: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            playerClassService.campaignList(campaignName),
          ),
        ),
      campaignSessions: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            sessionService.campaignList(campaignName),
          ),
        ),
      campaignLocations: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            locationService.campaignList(campaignName),
          ),
        ),
      campaignOrganizations: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            organizationService.campaignList(campaignName),
          ),
        ),
      campaignEncounters: () =>
        campaignName$.pipe(
          switchMap((campaignName) =>
            encounterService.campaignList(campaignName),
          ),
        ),
      characterQuote: (name: string) =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            quoteService.getRandomQuote(campaignName, name),
          ),
        ),
    };
  }),
  withImages('character', {
    onCreateSuccess: (state, newImage) => {
      const character = state.character();
      if (character == null) return;
      const updatedChar = {
        ...character,
        images: [...(character.images ?? []), newImage],
      };
      patchState(state, { character: updatedChar });
    },
    onDeleteSuccess: (state, imgPk) => {
      const character = state.character();
      if (character == null) return;

      const updatedChar = {
        ...character,
        images: [
          ...(character.images?.filter((img) => img.pk !== imgPk) ?? []),
        ],
      };
      updatedChar.images = updatedChar.images?.filter(
        (img) => img.pk !== imgPk,
      );
      patchState(state, { character: updatedChar });
    },
    onUpdateSuccess: (state, newImg) => {
      const character = state.character();
      if (character == null) return;

      const updatedChar = {
        ...character,
        images: replaceItem(character.images ?? [], newImg, 'pk'),
      };
      patchState(state, { character: updatedChar });
    },
  }),
  withUpdates(() => {
    const characterService = inject(CharacterService);
    return {
      character: (update: CharacterDetails) =>
        characterService.patch(update.pk!, update),
    };
  }),
  withMethods((state) => {
    const quoteConnectionService = inject(QuoteConnectionService);
    const toastService = inject(ToastService);

    return {
      createQuoteConnection: rxMethod<QuoteConnection>(
        pipe(
          switchMap((con) => quoteConnectionService.create(con)),
          tapResponse({
            next: (newConnection) => {
              const oldQuote = state.characterQuote();
              const newQuote = {
                ...oldQuote,
                connections: [...(oldQuote?.connections ?? []), newConnection],
              } as Quote;
              patchState(state, { characterQuote: newQuote });
            },
            error: () =>
              toastService.addToast(errorToast('Failed to create connection')),
          }),
        ),
      ),
      deleteQuoteConnection: rxMethod<number>(
        pipe(
          switchMap((connectionPk) =>
            quoteConnectionService
              .delete(connectionPk)
              .pipe(map(() => connectionPk)),
          ),
          tapResponse({
            next: (connectionPk) => {
              const oldQuote = state.characterQuote();
              if (oldQuote == null) return;
              const newQuote = {
                ...oldQuote,
                connections: [
                  ...(oldQuote.connections?.filter(
                    (con) => con.pk !== connectionPk,
                  ) ?? []),
                ],
              };

              patchState(state, { characterQuote: newQuote });
            },
            error: () =>
              toastService.addToast(errorToast('Failed to delete connection')),
          }),
        ),
      ),
    };
  }),
  withMethods((state) => {
    const characterService = inject(CharacterService);
    const membershipService = inject(OrganizationMembershipService);
    const quoteService = inject(QuoteService);
    const encounterService = inject(EncounterService);
    const encounterConnectionService = inject(EncounterConnectionService);
    const toastService = inject(ToastService);
    const playerClassConnectionService = inject(
      CharacterPlayerClassConnectionService,
    );

    return {
      reset: () => {
        patchState(state, {
          character: undefined,
          characterError: undefined,
          characterQueryState: 'init',
          characterQuote: undefined,
          characterQuoteError: undefined,
          characterQuoteQueryState: 'init',
          characterServerModel: undefined,
          characterUpdateError: undefined,
          characterUpdateState: 'init',
          encounterServerModel: undefined,
          imageServerModel: undefined,
          quoteServerModel: undefined,
        });
      },
      deleteCharacter: rxMethod<void>(
        pipe(
          map(() => state.character()?.pk),
          filter((characterPk) => characterPk != null),
          switchMap((characterPk) => characterService.delete(characterPk)),
          tapResponse({
            next: () => {
              patchState(state, { character: undefined });
            },
            error: () =>
              toastService.addToast(errorToast('Failed to delete character')),
          }),
        ),
      ),
      updateQuote: rxMethod<Quote>(
        pipe(
          switchMap((quote) => quoteService.update(quote.pk, quote)),
          tapResponse({
            next: (newQuote) => patchState(state, { characterQuote: newQuote }),
            error: () =>
              toastService.addToast(errorToast('Failed to update Quote')),
          }),
        ),
      ),
      deleteQuote: rxMethod<number>(
        pipe(
          switchMap((quotePk) => quoteService.delete(quotePk)),
          tapResponse({
            next: () => patchState(state, { characterQuote: undefined }),
            error: () =>
              toastService.addToast(errorToast('Failed to delete Quote')),
          }),
        ),
      ),
      createQuote: rxMethod<QuoteRaw>(
        pipe(
          switchMap((quote) => quoteService.create(quote)),
          tapResponse({
            next: (newQuote) => {
              patchState(state, { characterQuote: newQuote });
              const newCon: QuoteConnection = {
                character: state.character()?.pk as number,
                quote: newQuote.pk,
              };
              state.createQuoteConnection(newCon);
            },
            error: () =>
              toastService.addToast(errorToast('Failed to create Quote')),
          }),
        ),
      ),
      updateEncounter: rxMethod<Encounter>(
        pipe(
          switchMap((encounter) =>
            encounterService.update(encounter.pk, encounter),
          ),
          tapResponse({
            next: (newEncounter) => {
              const updatedChar = {
                ...(state.character() as CharacterDetails),
              };
              updatedChar.encounters = replaceItem(
                updatedChar.encounters ?? [],
                newEncounter,
                'pk',
              );
              patchState(state, { character: updatedChar });
            },
            error: () =>
              toastService.addToast(errorToast('Failed to update Encounter')),
          }),
        ),
      ),
      deleteEncounter: rxMethod<number>(
        pipe(
          switchMap((encounterPk) =>
            encounterService.delete(encounterPk).pipe(map(() => encounterPk)),
          ),
          tapResponse({
            next: (encounterPk) => {
              const updatedChar = state.character();
              if (updatedChar == null) return;
              updatedChar.encounters = updatedChar.encounters?.filter(
                (encounter) => encounter.pk !== encounterPk,
              );
              patchState(state, { character: updatedChar });
            },
            error: () =>
              toastService.addToast(errorToast('Failed to delete Encounter')),
          }),
        ),
      ),
      createEncounterConnection: rxMethod<EncounterConnection>(
        pipe(
          switchMap((connection) =>
            encounterConnectionService.create(connection),
          ),
          tapResponse({
            next: (newConnection) => {
              const oldCharacter = state.character();
              if (oldCharacter == null) return;
              const oldEncounter = oldCharacter.encounters?.find(
                (encounter) => encounter.pk === newConnection.encounter,
              );
              if (oldEncounter == null) return;

              const updatedEncounter = {
                ...oldEncounter,
                encounterConnections: [
                  ...(oldEncounter.encounterConnections ?? []),
                  newConnection,
                ],
              };
              const updatedEncounters = replaceItem<CharacterEncounter>(
                oldCharacter.encounters ?? [],
                updatedEncounter,
                'pk',
              );

              const updatedCharacter = {
                ...oldCharacter,
                encounters: updatedEncounters,
              };
              patchState(state, { character: updatedCharacter });
            },
            error: () => toastService.addToast(errorToast('Failed to create')),
          }),
        ),
      ),
      deleteEncounterConnection: rxMethod<EncounterConnection>(
        pipe(
          filter((con) => con.pk != null),
          switchMap((con) =>
            encounterConnectionService
              .delete(con.pk as number)
              .pipe(map(() => con)),
          ),
          tapResponse({
            next: (connection) => {
              const oldCharacter = state.character();
              if (oldCharacter == null) return;

              const oldEncounter = findByProp(
                oldCharacter.encounters ?? [],
                'pk',
                connection.encounter,
              ) as CharacterEncounter;
              if (oldEncounter == null) return;

              const newEncounter = {
                ...oldEncounter,
                encounterConnections: removeByProp(
                  oldEncounter.encounterConnections ?? [],
                  'pk',
                  connection.pk,
                ),
              };

              const updatedEncounters = replaceItem<CharacterEncounter>(
                oldCharacter.encounters ?? [],
                newEncounter,
                'pk',
              );

              const newCharacter = {
                ...oldCharacter,
                encounters: updatedEncounters,
              };
              patchState(state, { character: newCharacter });
            },
            error: () =>
              toastService.addToast(
                errorToast('Failed to delete encounter connection'),
              ),
          }),
        ),
      ),
      createMembership: rxMethod<CharacterOrganizationMembership>(
        pipe(
          map((membership) => ({
            member_id: state.character()?.pk as number,
            organization_id: membership.organization_id,
            role: membership.role,
          })),
          switchMap((membership) => membershipService.create(membership)),
          tapResponse({
            next: (updatedCharacter) =>
              patchState(state, { character: updatedCharacter }),
            error: () =>
              toastService.addToast(errorToast('Failed to create membership')),
          }),
        ),
      ),
      deleteMembership: rxMethod<CharacterOrganizationMembership>(
        pipe(
          switchMap((membership) =>
            membershipService
              .delete(membership.pk as number)
              .pipe(map(() => membership)),
          ),
          tapResponse({
            next: (deletedMembership) => {
              const oldCharacter = state.character();
              if (oldCharacter == null) return;

              const newCharacter = {
                ...oldCharacter,
                organizations: oldCharacter.organizations?.filter(
                  (org) =>
                    org.organization_id !== deletedMembership.organization_id,
                ),
              };
              patchState(state, { character: newCharacter });
            },
            error: () =>
              toastService.addToast(errorToast('Failed to delete membership')),
          }),
        ),
      ),
      addClass: rxMethod<number>(
        pipe(
          switchMap((classId) => {
            const connection: CharacterPlayerClassConnectionRaw = {
              character: state.character()?.pk as number,
              player_class: classId,
            };
            return playerClassConnectionService.create(connection);
          }),
          tapResponse({
            next: (newConnection) => {
              const newCharacter = {
                ...state.character(),
                player_class_connections: [
                  ...(state.character()?.player_class_connections ?? []),
                  newConnection,
                ],
              } as CharacterDetails;
              patchState(state, { character: newCharacter });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      removeClass: rxMethod<number>(
        pipe(
          switchMap((connectionId) =>
            playerClassConnectionService
              .delete(connectionId)
              .pipe(map(() => connectionId)),
          ),
          tapResponse({
            next: (connectionId) => {
              const newCharacter = {
                ...state.character(),
                player_class_connections: state
                  .character()
                  ?.player_class_connections?.filter(
                    (connection) => connection.pk !== connectionId,
                  ),
              } as CharacterDetails;
              patchState(state, { character: newCharacter });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
    };
  }),
  withHooks((store) => {
    const character$ = toObservable(store.character).pipe(filterNil());
    return {
      onInit: () => {
        character$
          .pipe(
            takeUntilDestroyed(),
            map((char) => char.name),
            filterNil(),
            distinctUntilChanged(),
          )
          .subscribe((characterName) => {
            store.loadCharacterQuote(characterName);
          });
      },
    };
  }),
);
