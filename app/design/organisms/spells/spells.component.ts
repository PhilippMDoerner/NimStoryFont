import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import { PlayerClass } from 'src/app/_models/playerclass';
import {
  Spell,
  SpellPlayerClassConnection,
  SpellRaw,
} from 'src/app/_models/spell';
import {
  slideOutFromBottom,
  slideUpFromBottom,
} from 'src/app/design/animations/slideDown';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { HotkeyDirective } from 'src/app/_directives/hotkey.directive';
import { BadgeComponent } from 'src/app/design/atoms/badge/badge.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import {
  BadgeListEntry,
  CollapsiblePanelComponent,
} from 'src/app/design/molecules';
import { getPseudoRandomId } from 'src/utils/math';
import { filterNil } from 'src/utils/rxjs-operators';
import {
  FocusItem,
  FocusListComponent,
  FocusListContextTypecastDirective,
} from '../focus-list/focus-list.component';
import { SpellComponent } from '../spell/spell.component';

interface SpellCard {
  spell: Spell;
  isOpen: boolean;
  classes: BadgeListEntry<undefined>[];
}

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss'],
  animations: [slideUpFromBottom, slideOutFromBottom],
  imports: [
    ButtonComponent,
    CollapsiblePanelComponent,
    SpellComponent,
    BadgeComponent,
    SpinnerComponent,
    HotkeyDirective,
    FocusListComponent,
    FocusListContextTypecastDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpellsComponent {
  DEFAULT_TITLE = 'New Article Item';
  campaignId = input.required<number>();
  spells = input.required<Spell[]>();
  playerClasses = input.required<PlayerClass[]>();
  canUpdate = input.required<boolean>();
  canDelete = input.required<boolean>();
  canCreate = input.required<boolean>();
  serverModel = input.required<Spell | undefined>();

  readonly spellDelete = output<Spell>();
  readonly spellUpdate = output<Spell>();
  readonly spellCreate = output<SpellRaw>();
  readonly connectionDelete = output<SpellPlayerClassConnection>();
  readonly connectionCreate = output<SpellPlayerClassConnection>();
  readonly spellClassClick = output<PlayerClass>();

  spellElements = viewChildren<ElementRef<HTMLDivElement>>('spell');
  isCreatingSpell = signal(false);
  createSpellData = computed(
    () => ({ name: this.DEFAULT_TITLE, campaign: this.campaignId() }) as Spell,
  );

  spellCards = computed<FocusItem<SpellCard>[]>(() => {
    const spells = this.spells().map((spell) => ({
      id: spell.pk ?? getPseudoRandomId(),
      data: {
        spell: spell,
        isOpen: false,
        classes: this.parsePlayerClasses(spell.player_class_connections),
      },
    }));

    return spells;
  });

  constructor() {
    const spellNameParam = inject(ActivatedRoute).snapshot.params['name'];
    if (spellNameParam) {
      this.scrollToSpell(spellNameParam);
    }
  }

  onSpellDelete(spellToDelete: Spell) {
    this.spellDelete.emit(spellToDelete);
  }

  cancelSpellCreation() {
    this.isCreatingSpell.set(false);
  }

  addSpell() {
    this.isCreatingSpell.set(true);
  }

  onSpellClassClick(event: MouseEvent, connection: SpellPlayerClassConnection) {
    event.preventDefault();
    if (connection.player_class_details) {
      this.spellClassClick.emit(connection.player_class_details);
    }
  }

  onSpellCreate(spell: Partial<SpellRaw>) {
    this.spellCreate.emit(spell as SpellRaw);
    this.isCreatingSpell.set(false);
  }

  private parsePlayerClasses(
    classes: SpellPlayerClassConnection[],
  ): BadgeListEntry<undefined>[] {
    return classes.map((entry) => ({
      text: entry.player_class_details?.name as string,
      badgeValue: undefined,
    }));
  }

  private scrollToSpell(spellName: string): void {
    toObservable(this.spellElements)
      .pipe(
        takeUntilDestroyed(),
        map((elements) =>
          elements.find((el) => el.nativeElement.id === spellName),
        ),
        filterNil(),
        take(1),
      )
      .subscribe((spellElement) => {
        const element = spellElement.nativeElement;
        element.scrollIntoView({ behavior: 'instant' });
      });
  }
}
