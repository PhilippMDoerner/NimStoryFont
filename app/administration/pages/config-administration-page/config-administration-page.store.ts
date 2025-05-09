/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, pipe, switchMap } from 'rxjs';
import { NodeLinkTypeRaw } from 'src/app/_models/graph';
import { MapMarkerType } from 'src/app/_models/mapMarkerType';
import { PlayerClass } from 'src/app/_models/playerclass';
import { httpErrorToast } from 'src/app/_models/toast';
import { MarkerTypeService } from 'src/app/_services/article/marker-type.service';
import { PlayerClassService } from 'src/app/_services/article/player-class.service';
import { RelationshipTypeService } from 'src/app/_services/article/relationship-type.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { sortByProp } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { withQueries } from 'src/utils/store/withQueries';

export interface ConfigAdministrationPageState {}

const initialState: ConfigAdministrationPageState = {};

export const ConfigAdministrationPageStore = signalStore(
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasCampaignWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const playerClassService = inject(PlayerClassService);
    const markerTypeService = inject(MarkerTypeService);
    const relationshipTypeService = inject(RelationshipTypeService);
    const globalStore = inject(GlobalStore);
    const campaignName$ = toObservable(globalStore.campaignName);

    return {
      campaignPlayerClasses: () =>
        campaignName$.pipe(
          filterNil(),
          switchMap((campaignName) =>
            playerClassService.campaignList(campaignName),
          ),
          map((classes) => sortByProp(classes, 'name')),
        ),
      campaignMarkerTypes: () =>
        campaignName$.pipe(
          filterNil(),
          switchMap((campaignName) =>
            markerTypeService.campaignList(campaignName),
          ),
          map((types) => sortByProp(types, 'name')),
        ),
      campaignNodeLinkTypes: () =>
        campaignName$.pipe(
          filterNil(),
          switchMap((campaignName) =>
            relationshipTypeService.campaignList(campaignName),
          ),
          map((types) => sortByProp(types, 'name')),
        ),
      playerClasses: () =>
        playerClassService
          .list()
          .pipe(map((classes) => sortByProp(classes, 'name'))),
      markerTypes: () =>
        markerTypeService
          .list()
          .pipe(map((types) => sortByProp(types, 'name'))),
      nodeLinkTypes: () =>
        relationshipTypeService
          .list()
          .pipe(map((types) => sortByProp(types, 'name'))),
    };
  }),
  withMethods((state) => {
    const playerClassService = inject(PlayerClassService);
    const markerTypeService = inject(MarkerTypeService);
    const relationshipTypeService = inject(RelationshipTypeService);
    const toastService = inject(ToastService);
    const globalStore = inject(GlobalStore);

    const isGlobal = () => !globalStore.campaignName();

    return {
      reset: () =>
        patchState(state, {
          campaignMarkerTypes: undefined,
          campaignNodeLinkTypes: undefined,
          campaignPlayerClasses: undefined,
          nodeLinkTypes: undefined,
          markerTypes: undefined,
          playerClasses: undefined,
        }),
      createRelationshipType: rxMethod<NodeLinkTypeRaw>(
        pipe(
          switchMap((relationshipType) =>
            relationshipTypeService.create(relationshipType),
          ),
          tapResponse(
            (createdRelationshipType) => {
              const oldList: any[] | undefined = isGlobal()
                ? state.nodeLinkTypes()
                : state.campaignNodeLinkTypes();
              const newList = sortByProp(
                [createdRelationshipType, ...(oldList ?? [])],
                'name',
              );
              patchState(state, {
                nodeLinkTypes: newList,
                campaignNodeLinkTypes: newList,
              });
            },
            (error: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(error)),
          ),
        ),
      ),
      deleteRelationshipType: rxMethod<number>(
        pipe(
          switchMap((id) =>
            relationshipTypeService.delete(id).pipe(map(() => id)),
          ),
          tapResponse({
            next: (id) => {
              const oldList = (
                isGlobal()
                  ? state.nodeLinkTypes()
                  : state.campaignNodeLinkTypes()
              ) as any[];
              const newList = oldList.filter((u) => u.id !== id);
              patchState(state, {
                nodeLinkTypes: newList,
                campaignNodeLinkTypes: newList,
              });
            },
            error: (error: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(error)),
          }),
        ),
      ),
      createPlayerClass: rxMethod<PlayerClass>(
        pipe(
          switchMap((playerClass) => playerClassService.create(playerClass)),
          tapResponse({
            next: (createdPlayerClass) => {
              const oldList: any[] | undefined = isGlobal()
                ? state.playerClasses()
                : state.campaignPlayerClasses();
              const newList = sortByProp(
                [createdPlayerClass, ...(oldList ?? [])],
                'name',
              );
              patchState(state, {
                playerClasses: newList,
                campaignPlayerClasses: newList,
              });
            },
            error: (error: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(error)),
          }),
        ),
      ),
      deletePlayerClass: rxMethod<number>(
        pipe(
          switchMap((playerClassPk) =>
            playerClassService
              .delete(playerClassPk)
              .pipe(map(() => playerClassPk)),
          ),
          tapResponse({
            next: (playerClassPk) => {
              const oldList: any[] | undefined = isGlobal()
                ? state.playerClasses()
                : state.campaignPlayerClasses();
              const newList = (oldList ?? []).filter(
                (u) => u.pk !== playerClassPk,
              );
              patchState(state, {
                playerClasses: newList,
                campaignPlayerClasses: newList,
              });
            },
            error: (error: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(error)),
          }),
        ),
      ),
      createMarkerType: rxMethod<MapMarkerType>(
        pipe(
          switchMap((markerType) => markerTypeService.create(markerType)),
          tapResponse({
            next: (createdMarkerType) => {
              const oldList: any[] | undefined = isGlobal()
                ? state.markerTypes()
                : state.campaignMarkerTypes();

              const newList = sortByProp(
                [createdMarkerType, ...(oldList ?? [])],
                'name',
              );
              patchState(state, {
                markerTypes: newList,
                campaignMarkerTypes: newList,
              });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
      deleteMarkerType: rxMethod<number>(
        pipe(
          switchMap((markerTypePk) =>
            markerTypeService
              .delete(markerTypePk)
              .pipe(map(() => markerTypePk)),
          ),
          tapResponse({
            next: (markerTypePk) => {
              const oldList = (
                isGlobal() ? state.markerTypes() : state.campaignMarkerTypes()
              ) as any[];
              const newList = oldList.filter((u) => u.id !== markerTypePk);
              patchState(state, {
                markerTypes: newList,
                campaignMarkerTypes: newList,
              });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          }),
        ),
      ),
    };
  }),
);
