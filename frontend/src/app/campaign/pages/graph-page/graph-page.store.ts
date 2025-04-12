import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap, take, tap } from 'rxjs';
import {
  LinkGroup,
  NodeLinkRaw,
  NORMAL_LINK_KIND_SET,
  toLinkLabel,
} from 'src/app/_models/graph';
import { httpErrorToast } from 'src/app/_models/toast';
import { RelationshipTypeService } from 'src/app/_services/article/relationship-type.service';
import { RelationshipService } from 'src/app/_services/article/relationship.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem, sortAlphabetically } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

export interface GraphPageState {
  createLinkState: RequestState;
}

const initialState: GraphPageState = {
  createLinkState: 'init',
};

export const GraphPageStore = signalStore(
  withState(initialState),
  withQueries(() => {
    const relationshipService = inject(RelationshipService);
    const relationshipTypeService = inject(RelationshipTypeService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
    );
    return {
      graph: () =>
        campaignName$.pipe(
          takeUntilDestroyed(),
          take(1),
          switchMap((campaignName) =>
            relationshipService.getNodeMap(campaignName),
          ),
        ),
      customLinkTypes: () =>
        campaignName$.pipe(
          takeUntilDestroyed(),
          take(1),
          switchMap((campaign) =>
            relationshipTypeService.campaignList(campaign),
          ),
        ),
    };
  }),
  withComputed((state) => {
    return {
      customLinkGroups: computed(() => {
        const customGroups = state
          .graph()
          ?.links.filter(
            (linkGroup) => !NORMAL_LINK_KIND_SET.has(linkGroup.name),
          );
        return customGroups
          ?.map((group) => ({
            ...group,
            links: group.links.map((link) => ({
              link,
              label: toLinkLabel(link),
            })),
          }))
          .sort((a, b) => sortAlphabetically(a.name, b.name));
      }),
    };
  }),
  withMethods((state) => {
    const relationshipService = inject(RelationshipService);
    const toastService = inject(ToastService);

    return {
      createConnection: rxMethod<NodeLinkRaw>(
        pipe(
          tap(() => patchState(state, { createLinkState: 'loading' })),
          switchMap((data) => relationshipService.create(data)),
          map((newLink) =>
            relationshipService.parseLink(newLink, state.graph()?.nodes ?? []),
          ),
          filterNil(),
          tapResponse({
            next: (newLink) => {
              const oldLinkGroup = state
                .graph()
                ?.links.find(
                  (linkGroup) => linkGroup.name === newLink.linkKind,
                );
              if (!oldLinkGroup) return;

              const newLinkGroup: LinkGroup = {
                ...oldLinkGroup,
                links: [...(oldLinkGroup?.links ?? []), newLink],
              };

              const newLinkGroups = replaceItem(
                state.graph()?.links ?? [],
                newLinkGroup,
                'name',
              );

              patchState(state, {
                createLinkState: 'success',
                graph: {
                  nodes: state.graph()?.nodes ?? [],
                  links: newLinkGroups,
                },
              });
            },
            error: (err: HttpErrorResponse) => {
              patchState(state, { createLinkState: 'error' });
              toastService.addToast(httpErrorToast(err));
            },
          }),
        ),
      ),
      deleteConnection: rxMethod<number | undefined>(
        pipe(
          filterNil(),
          switchMap((id) => relationshipService.delete(id).pipe(map(() => id))),
          tapResponse({
            next: (id) => {
              const oldLinkGroups = state.graph()?.links ?? [];
              const oldLinkGroup = oldLinkGroups.find((linkGroup) =>
                linkGroup.links.some((link) => link.id === id),
              );
              if (!oldLinkGroup) return;

              const newLinkGroup: LinkGroup = {
                ...oldLinkGroup,
                links: (oldLinkGroup?.links ?? []).filter(
                  (link) => link.id !== id,
                ),
              };
              const newLinkGroups = replaceItem(
                oldLinkGroups,
                newLinkGroup,
                'name',
              );

              patchState(state, {
                graph: {
                  nodes: state.graph()?.nodes ?? [],
                  links: newLinkGroups,
                },
              });
            },
            error: (err: HttpErrorResponse) => {
              toastService.addToast(httpErrorToast(err));
            },
          }),
        ),
      ),
    };
  }),
);
