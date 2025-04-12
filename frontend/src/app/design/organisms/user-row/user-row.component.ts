import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { PermissionGroup } from 'src/app/_models/auth';
import { User } from 'src/app/_models/user';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import {
  BadgeListComponent,
  BadgeListEntry,
  ConfirmationToggleButtonComponent,
} from '../../molecules';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    BadgeListComponent,
    TitleCasePipe,
    ConfirmationToggleButtonComponent,
    NgbTooltip,
  ],
})
export class UserRowComponent {
  user = input.required<User>();
  groups = input<PermissionGroup[] | undefined>();
  canCreate = input<boolean>(false);
  canDelete = input<boolean>(false);

  readonly addGroup = output<PermissionGroup>();
  readonly removeGroup = output<number>();
  readonly deleteUser = output<User>();

  userGroupEntries = computed<BadgeListEntry<number>[]>(() => {
    return (
      this.user().group_details?.map((group) => ({
        badgeValue: group.pk,
        text: group.name,
      })) ?? []
    );
  });
}
