import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import {
  Encounter,
  EncounterConnection,
  EncounterConnectionRaw,
  EncounterRaw,
  getShiftedOrderIndex,
  nextOrderIndex,
  priorOrderIndex,
} from 'src/app/_models/encounter';
import { DiaryentryPageStore } from 'src/app/campaign/pages/diaryentry-page/diaryentry-page.store';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  merge,
  shareReplay,
  take,
  withLatestFrom,
} from 'rxjs';
import { HotkeyService } from 'src/app/_services/hotkey.service';
import { ScreenService } from 'src/app/_services/screen.service';
import { slideUpFromBottom } from 'src/app/design/animations/slideDown';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { componentId } from 'src/utils/DOM';
import { filterNil } from 'src/utils/rxjs-operators';
import {
  EncounterCardComponent,
  EncounterCardState,
} from '../encounter-card/encounter-card.component';

@Component({
  selector: 'app-diaryentry-encounters',
  templateUrl: './diaryentry-encounters.component.html',
  styleUrls: ['./diaryentry-encounters.component.scss'],
  imports: [
    ButtonComponent,
    SpinnerComponent,
    NgTemplateOutlet,
    EncounterCardComponent,
  ],
  animations: [slideUpFromBottom],
})
export class DiaryentryEncountersComponent {
  state = input<EncounterCardState>('READ');

  readonly connectionDelete = output<EncounterConnection>();
  readonly connectionCreate = output<EncounterConnectionRaw>();
  readonly encounterDelete = output<Encounter>();
  readonly encounterUpdate = output<Encounter>();
  readonly encounterCreate = output<EncounterRaw>();
  readonly encounterCutInsert = output<{
    encounter: Encounter;
    newOrderIndex: number;
  }>();
  addUnfinishedEncounter = output<{ encounter: EncounterRaw; index: number }>();

  store = inject(DiaryentryPageStore);
  route = inject(ActivatedRoute);
  hotkeyService = inject(HotkeyService);
  document = inject(DOCUMENT);
  destroyRef = inject(DestroyRef);
  injectorRef = inject(Injector);

  diaryEntryPk = computed(() => this.store.diaryentry()?.pk);
  campaignCharacters = this.store.campaignCharacters;
  campaignLocations = this.store.campaignLocations;
  encounterServerModel = this.store.encounterServerModel;
  canUpdate = this.store.hasWritePermission;
  canDelete = this.store.hasWritePermission;
  canCreate = this.store.hasWritePermission;
  state$ = toObservable(this.state);
  encounterElements = viewChildren<
    ElementRef<HTMLElement>,
    ElementRef<HTMLElement>
  >('encounter', {
    read: ElementRef<HTMLElement>,
  });
  encounterElements$ = toObservable(this.encounterElements);

  encounterIndexInFocus = signal<number | undefined>(undefined);
  encounterIndexInFocus$ = toObservable(this.encounterIndexInFocus).pipe(
    shareReplay(),
  );
  encountersToAdd = signal<EncounterRaw[]>([]);
  isUpdatingGlobally = this.store.isUpdatingGlobally;
  isUpdatingAnything = this.store.isUpdatingAnyEncounters;
  cutEncounterIndex = signal<number | undefined>(undefined);
  isCutInProgress = computed(() => this.cutEncounterIndex() != null);
  diaryEntryEncounters = this.store.diaryEntryEncounters;

  id = componentId();

  constructor() {
    const encounterTitle = this.route.snapshot.params['encounterTitle'];
    if (encounterTitle) {
      this.scrollToEncounter(encounterTitle);
    }

    if (!inject(ScreenService).isMobile()) {
      this.startHotkeyBehavior();
    }
  }

  addEmptyEncounterAtIndex(listIndex: number) {
    const newOrderIndex: number = this.getOrderIndexForNewEncounter(listIndex);
    //Create and add Encounter
    const newEncounter: EncounterRaw = {
      diaryentry: this.diaryEntryPk() as number,
      title: 'New Encounter',
      order_index: newOrderIndex,
      description: '',
    };

    this.store.addEmptyEncounterForCreation(newEncounter);
  }

  onInsertExcisedEncounter(insertionIndex: number) {
    const cutEncounterIndex = this.cutEncounterIndex();
    if (cutEncounterIndex == null) {
      return;
    }

    const cutPositions = [cutEncounterIndex, cutEncounterIndex - 1];
    const isInsertingIntoCutPosition = cutPositions.includes(insertionIndex);
    if (isInsertingIntoCutPosition) {
      return;
    }

    const isInsertingAtLastPosition =
      insertionIndex > this.diaryEntryEncounters().length;
    let newOrderIndex: number;
    if (isInsertingAtLastPosition) {
      const lastEncounter = this.diaryEntryEncounters()[
        this.diaryEntryEncounters().length - 1
      ].encounter as Encounter;
      newOrderIndex = nextOrderIndex(lastEncounter);
    } else {
      const encounterBeforeInsertion: Encounter = this.diaryEntryEncounters()[
        insertionIndex
      ].encounter as Encounter;
      newOrderIndex = encounterBeforeInsertion.order_index;
    }

    const encounterToInsert: Encounter = this.diaryEntryEncounters()[
      cutEncounterIndex
    ].encounter as Encounter;
    this.store.cutInsertEncounter(encounterToInsert, newOrderIndex);
  }

  onEncounterCreateCancel(encounterIndex: number) {
    const createEncounterToRemove =
      this.diaryEntryEncounters()[encounterIndex].encounter;
    this.store.removeEmptyEncounterForCreation(createEncounterToRemove);
  }

  onEncounterDelete(encounterIndex: number) {
    const encounterToDelete =
      this.diaryEntryEncounters()[encounterIndex].encounter;
    this.store.removeEncounter(encounterToDelete as Encounter);
  }

  onEncounterCreate(encounter: EncounterRaw) {
    const newEncounter = {
      ...encounter,
      order_index: nextOrderIndex(encounter),
    };
    this.encounterCreate.emit(newEncounter);
    this.store.removeEmptyEncounterForCreation(encounter);
  }

  setEncounterFocusIndex(index: number | undefined) {
    if (this.state() === 'EDIT') {
      this.encounterIndexInFocus.set(index);
    }
  }

  private startHotkeyBehavior() {
    this.navigateToFocusedEncounter();
    this.startHotkeyNavigation();
  }

  private navigateToFocusedEncounter() {
    const focusedEncounter$ = combineLatest({
      encounters: toObservable(this.encounterElements, {
        injector: this.injectorRef,
      }),
      index: this.encounterIndexInFocus$.pipe(filterNil()),
    }).pipe(
      map(({ encounters, index }) => encounters[index]?.nativeElement),
      filterNil(),
    );

    this.hotkeyService
      .watch('f')
      .pipe(withLatestFrom(focusedEncounter$), takeUntilDestroyed())
      .subscribe(([, element]) => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.focus();
      });
  }

  private startHotkeyNavigation() {
    const arrowPress$ = merge(
      this.hotkeyService.watch('ArrowDown').pipe(map(() => 'down' as const)),
      this.hotkeyService.watch('ArrowUp').pipe(map(() => 'up' as const)),
    );

    const htmlElements$ = this.encounterElements$.pipe(
      map((elements) => {
        return elements.map((el) => el.nativeElement);
      }),
    );

    arrowPress$
      .pipe(
        filter((arrowPress) => !!arrowPress),
        withLatestFrom(htmlElements$, this.encounterIndexInFocus$, this.state$),
        filter(([, , , state]) => state === 'EDIT'),
        map(([arrowPress, elements, focusedElementIndex]) => {
          const alreadyHasFocus =
            focusedElementIndex != null && focusedElementIndex >= 0;
          if (alreadyHasFocus) {
            const nextFocusedElementIndex = this.toNextIndex(
              focusedElementIndex,
              arrowPress,
            );
            return {
              nextFocusElement: elements[nextFocusedElementIndex],
              nextFocusIndex: focusedElementIndex,
            };
          }

          switch (arrowPress) {
            case 'down': {
              const firstElementIndex = 0;
              return {
                nextFocusElement: elements[firstElementIndex],
                nextFocusIndex: firstElementIndex,
              };
            }
            case 'up': {
              const lastElementIndex = elements.length - 1;
              return {
                nextFocusElement: elements[lastElementIndex],
                nextFocusIndex: lastElementIndex,
              };
            }
          }
        }),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ nextFocusElement, nextFocusIndex }) => {
        this.encounterIndexInFocus.set(nextFocusIndex);
        if (!nextFocusElement) return;
        nextFocusElement.focus();
        nextFocusElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
  }

  private toNextIndex(index: number, direction: 'up' | 'down'): number {
    switch (direction) {
      case 'up':
        return index - 1;
      case 'down':
        return index + 1;
    }
  }

  private scrollToEncounter(encounterTitle: string): void {
    toObservable(this.encounterElements)
      .pipe(
        map((elements) =>
          elements.find((el) => el.nativeElement.id === encounterTitle),
        ),
        filterNil(),
        takeUntilDestroyed(),
        take(1),
      )
      .subscribe((encounterElement) =>
        encounterElement.nativeElement.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        }),
      );
  }

  /**
   * Determines the order index the encounter should have based on the place where it is supposed to be inserted into
   * @param {number} encounterIndex - The index on this.encounters after which the new encounter shall be inserted.
   * This will increment the index of the encounter currently there and all after it by one, though not in this function
   */
  private getOrderIndexForNewEncounter(insertionIndex: number): number {
    const isNewFirstEncounter: boolean = insertionIndex < 0;
    const isEmptyDiaryEntry: boolean = this.store.realEncounters().length === 0;
    const isNewFirstEncounterInFullDiaryentry: boolean =
      isNewFirstEncounter && !isEmptyDiaryEntry;

    const isLastEncounterInFullDiaryentry =
      insertionIndex >= this.store.realEncounters().length &&
      !isEmptyDiaryEntry;

    if (isEmptyDiaryEntry) {
      return 0;
    } else if (isNewFirstEncounterInFullDiaryentry) {
      const firstEncounter: Encounter = this.store.realEncounters()[0];
      return priorOrderIndex(firstEncounter);
    } else if (isLastEncounterInFullDiaryentry) {
      const lastEncounter: Encounter =
        this.store.realEncounters()[this.store.realEncounters().length - 1];
      return nextOrderIndex(lastEncounter);
    } else {
      //is new encounter after some other encounter
      const priorEncounter = this.diaryEntryEncounters()[insertionIndex];
      return getShiftedOrderIndex(priorEncounter.encounter);
    }
  }

  private isRealEncounter(encounter: Encounter | EncounterRaw): boolean {
    return 'pk' in encounter;
  }

  private nextRealEncounter(encounterIndex: number): Encounter | undefined {
    const realEncountersAfterIndex = this.diaryEntryEncounters()
      .slice(encounterIndex)
      .filter((encounter) => this.isRealEncounter(encounter.encounter));

    return realEncountersAfterIndex[0]?.encounter as Encounter | undefined;
  }

  private priorRealEncounter(encounterIndex: number): Encounter | undefined {
    const realEncountersBeforeIndex = this.diaryEntryEncounters()
      .slice(0, encounterIndex + 1)
      .reverse()
      .filter((encounter) => this.isRealEncounter(encounter.encounter));

    return realEncountersBeforeIndex[0]?.encounter as Encounter | undefined;
  }
}
