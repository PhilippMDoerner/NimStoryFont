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
import { shareReplay, switchMap, take } from 'rxjs';
import { Rule, RuleRaw } from 'src/app/_models/rule';
import { httpErrorToast } from 'src/app/_models/toast';
import { RuleService } from 'src/app/_services/article/rule.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { GlobalStore } from 'src/app/global.store';
import { replaceItem, sortByProp } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { RequestState } from 'src/utils/store/factory-types';
import { withQueries } from 'src/utils/store/withQueries';

interface RulesPageState {
  updateRuleState: RequestState;
  ruleServerModel: undefined | Rule;
  deleteRuleState: RequestState;
  createRuleState: RequestState;
}

const initialState: RulesPageState = {
  updateRuleState: 'init' as RequestState,
  ruleServerModel: undefined,
  deleteRuleState: 'init' as RequestState,
  createRuleState: 'init' as RequestState,
};

export const RulesPageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(() => {
    const globalStore = inject(GlobalStore);
    return {
      hasWritePermission: globalStore.canPerformActionsOfRole('member'),
    };
  }),
  withQueries(() => {
    const ruleService = inject(RuleService);
    const globalStore = inject(GlobalStore);

    const campaignName$ = toObservable(globalStore.campaignName).pipe(
      filterNil(),
      shareReplay(1),
    );
    return {
      rules: () =>
        campaignName$.pipe(
          take(1),
          switchMap((campaignName) =>
            ruleService.campaignDetailList(campaignName),
          ),
        ),
    };
  }),
  withMethods((store) => {
    const ruleService = inject(RuleService);
    const toastService = inject(ToastService);

    return {
      reset: () =>
        patchState(store, {
          updateRuleState: 'init',
          ruleServerModel: undefined,
          deleteRuleState: 'init',
          createRuleState: 'init',
          rules: undefined,
          rulesError: undefined,
          rulesQueryState: 'init',
        }),
      createRule: (rule: RuleRaw) => {
        patchState(store, {
          createRuleState: 'loading',
          ruleServerModel: undefined,
        });
        ruleService
          .create(rule)
          .pipe(take(1))
          .subscribe({
            next: (newRule) => {
              const newRules = sortByProp(
                [...(store.rules() ?? []), newRule],
                'name',
              );
              patchState(store, {
                createRuleState: 'success',
                rules: newRules,
              });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
      updateRule: (rule: Rule) => {
        patchState(store, {
          updateRuleState: 'loading',
          rulesError: undefined,
          ruleServerModel: undefined,
        });
        ruleService
          .update(rule.pk as number, rule)
          .pipe(take(1))
          .subscribe({
            next: (updatedRule) => {
              const rules = store.rules();
              if (!rules) return;

              const newRules = replaceItem(rules, updatedRule, 'pk');
              patchState(store, {
                updateRuleState: 'success',
                rules: newRules,
              });
            },
            error: (err: HttpErrorResponse) => {
              if (err.status === 409) {
                patchState(store, {
                  updateRuleState: 'error',
                  ruleServerModel: err.error,
                });
              } else {
                toastService.addToast(httpErrorToast(err));
              }
            },
          });
      },
      deleteRule: (rulePk: number) => {
        patchState(store, {
          deleteRuleState: 'loading',
          rulesError: undefined,
        });
        ruleService
          .delete(rulePk)
          .pipe(take(1))
          .subscribe({
            next: () => {
              patchState(store, {
                deleteRuleState: 'success',
                rules: store.rules()?.filter((rule) => rule.pk !== rulePk),
              });
            },
            error: (err: HttpErrorResponse) =>
              toastService.addToast(httpErrorToast(err)),
          });
      },
    };
  }),
);
