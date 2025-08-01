import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { User } from 'src/app/_models/user';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { ProfileTabLayoutComponent } from 'src/app/general/components/profile-tab-layout/profile-tab-layout.component';
import { takeOnceOrUntilDestroyed } from 'src/utils/rxjs-operators';
import { CardComponent } from '../../atoms/card/card.component';
import { MenuItem } from '../../molecules/_models/menu';
import { ConfirmationToggleButtonComponent } from '../../molecules/confirmation-toggle-button/confirmation-toggle-button.component';
import { ContextMenuComponent } from '../../molecules/context-menu/context-menu.component';
import { FormComponent } from '../../molecules/form/form.component';
import { CampaignMembership } from '../_models/campaign-membership';

export interface PasswordModel {
  password: string;
  oldPassword?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CardComponent,
    FormComponent,
    TitleCasePipe,
    ConfirmationToggleButtonComponent,
    ProfileTabLayoutComponent,
    ContextMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  formlyService = inject(FormlyService);
  routingService = inject(RoutingService);

  user = input.required<User>();
  memberships = input.required<CampaignMembership[]>();
  canDeleteProfile = input<boolean>(false);
  campaignName = input.required<string | undefined>();
  canResetWithoutPassword = input<boolean>(false);
  backUrl = input.required<string>();

  readonly profileUpdate = output<Partial<User>>();
  readonly passwordUpdate = output<PasswordModel>();
  readonly campaignLeave = output<CampaignMembership>();
  readonly profileDelete = output<User>();

  displayState = signal<'DISPLAY' | 'EDIT-PW' | 'EDIT-PROFILE'>('DISPLAY');
  showProfileEditForm = computed(() => this.displayState() === 'EDIT-PROFILE');
  showPasswordEditForm = computed(() => this.displayState() === 'EDIT-PW');
  passwordModel: Partial<PasswordModel & { passwordConfirm: string }> = {};
  oldPasswordField: FormlyFieldConfig =
    this.formlyService.buildSinglePasswordConfig({
      key: 'oldPassword',
      label: 'Your old password',
    });
  passwordFields = computed<FormlyFieldConfig[]>(() => {
    const fields = [
      this.formlyService.buildConfirmedPasswordConfig({
        label: 'New Password',
      }),
    ];

    if (!this.canResetWithoutPassword()) {
      fields.push(this.oldPasswordField);
    }

    return fields;
  });

  profileModel: Partial<User> = {};
  profileFields: FormlyFieldConfig[] = [
    this.formlyService.buildInputConfig({
      key: 'username',
      inputKind: 'STRING',
    }),
    this.formlyService.buildInputConfig({
      key: 'email',
      required: false,
      inputKind: 'STRING',
    }),
  ];
  contextMenuEntries = computed<MenuItem[]>(() => {
    const menuItems: MenuItem[] = [
      {
        kind: 'BUTTON',
        actionName: 'edit-data',
        label: this.showProfileEditForm()
          ? 'Cancel Profile Edit'
          : 'Edit profile',
        hotkeyAction: 'update',
        icon: this.showProfileEditForm() ? 'times' : 'pencil',
      },
      {
        kind: 'BUTTON',
        actionName: 'edit-password',
        label: this.showPasswordEditForm()
          ? 'Cancel Password Edit'
          : 'Edit password',
        icon: this.showPasswordEditForm() ? 'times' : 'pencil',
      },
    ];

    if (this.canDeleteProfile()) {
      menuItems.push({
        kind: 'BUTTON',
        actionName: 'delete',
        label: 'Delete your account',
        hotkeyAction: 'delete',
        icon: 'trash',
      });
    }
    return menuItems;
  });

  constructor() {
    const showPasswordEditFormOnInit$ = toObservable(
      this.canResetWithoutPassword,
    );
    showPasswordEditFormOnInit$
      .pipe(takeOnceOrUntilDestroyed())
      .subscribe((canResetWithoutPassword) => {
        this.displayState.set(canResetWithoutPassword ? 'EDIT-PW' : 'DISPLAY');
      });
  }

  onContextMenuAction(action: string) {
    switch (action) {
      case 'edit-data':
        this.toggleProfileEditState();
        break;
      case 'edit-password':
        this.togglePasswordEditState();
        break;
      case 'delete':
        this.profileDelete.emit(this.user());
        break;
    }
  }

  toggleProfileEditState(): void {
    this.displayState.update((state) => {
      switch (state) {
        case 'EDIT-PW':
        case 'EDIT-PROFILE':
          return 'DISPLAY';
        case 'DISPLAY':
          return 'EDIT-PROFILE';
      }
    });

    if (this.showProfileEditForm()) {
      this.profileModel = {
        username: this.user().username,
        email: this.user().email,
      };
    }
  }

  submitProfileUpdate(): void {
    this.profileUpdate.emit(this.profileModel);
    this.displayState.set('DISPLAY');
  }

  togglePasswordEditState(): void {
    this.displayState.update((state) => {
      switch (state) {
        case 'EDIT-PW':
        case 'EDIT-PROFILE':
          return 'DISPLAY';
        case 'DISPLAY':
          return 'EDIT-PW';
      }
    });

    if (this.showPasswordEditForm()) {
      this.passwordModel = {};
    }
  }

  updatePassword(model: Partial<PasswordModel>): void {
    const hasNewPassword = this.passwordModel.password != null;
    const hasOldPassword = this.passwordModel.oldPassword != null;
    const requiresOldPassword = !this.canResetWithoutPassword();
    if (!hasNewPassword || (!hasOldPassword && requiresOldPassword)) {
      return;
    }

    this.passwordUpdate.emit(model as PasswordModel);
    this.displayState.set('DISPLAY');
  }

  leaveCampaign(membership: CampaignMembership): void {
    this.campaignLeave.emit(membership);
  }
}
