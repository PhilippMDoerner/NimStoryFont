import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

export interface MoveEvent<T> {
  encounter1: T;
  encounter1Index: number;
  encounter2: T;
  encounter2Index: number;
}

@Component({
  selector: 'app-drag-and-drop-list',
  imports: [
    CdkDrag,
    CdkDragHandle,
    CdkDragPlaceholder,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './drag-and-drop-list.component.html',
  styleUrl: './drag-and-drop-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [CdkDropList],
  host: {
    role: 'list',
  },
})
export class DragAndDropListComponent<T> {
  entries = input.required<T[]>();
  labelProp = input.required<keyof T>();
  idProp = input.required<keyof T>();
  isUpdating = input.required<boolean>();

  changed = output<CdkDragDrop<T[]>>();
  swapEntries = output<MoveEvent<T>>();

  constructor(directive: CdkDropList<T[]>) {
    directive.dropped
      .pipe(
        filter((event) => event.previousIndex !== event.currentIndex),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.changed.emit(event));
  }

  moveEncounterUp(index: number) {
    const isFirstEncounter = index === 0;
    if (isFirstEncounter) return;

    const otherEncounterIndex = index - 1;
    const encounter1 = this.entries()[index];
    const encounter2 = this.entries()[otherEncounterIndex];
    this.swapEntries.emit({
      encounter1,
      encounter1Index: index,
      encounter2,
      encounter2Index: otherEncounterIndex,
    });
  }

  moveEncounterDown(index: number) {
    const isLastEncounter = index === this.entries().length - 1;
    if (isLastEncounter) return;

    const otherEncounterIndex = index + 1;
    const encounter1 = this.entries()[index];
    const encounter2 = this.entries()[otherEncounterIndex];
    this.swapEntries.emit({
      encounter1,
      encounter1Index: index,
      encounter2,
      encounter2Index: otherEncounterIndex,
    });
  }
}
