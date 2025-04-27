import { TitleCasePipe } from '@angular/common';
import {
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
import { takeOnceOrUntilDestroyed } from 'src/utils/rxjs-operators';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CardComponent } from '../../atoms/card/card.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';
import { ArticleFooterComponent } from '../../molecules/article-footer/article-footer.component';
import { ConfirmationToggleButtonComponent } from '../../molecules/confirmation-toggle-button/confirmation-toggle-button.component';
import { FormComponent } from '../../molecules/form/form.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
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
    PageContainerComponent,
    IconComponent,
    ButtonComponent,
    SeparatorComponent,
    CardComponent,
    FormComponent,
    TitleCasePipe,
    ArticleFooterComponent,
    ConfirmationToggleButtonComponent,
  ],
})
export class ProfileComponent {
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

  formlyService = inject(FormlyService);

  showPasswordEditForm = signal<boolean>(false);
  showProfileEditForm = signal<boolean>(false);
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

  constructor() {
    const showPasswordEditFormOnInit$ = toObservable(
      this.canResetWithoutPassword,
    );
    showPasswordEditFormOnInit$
      .pipe(takeOnceOrUntilDestroyed())
      .subscribe((canResetWithoutPassword) => {
        this.showPasswordEditForm.set(canResetWithoutPassword);
      });
  }

  toggleProfileEditState(): void {
    this.showProfileEditForm.set(!this.showProfileEditForm());

    if (this.showProfileEditForm()) {
      this.profileModel = {
        username: this.user().username,
        email: this.user().email,
      };
    }
  }

  submitProfileUpdate(): void {
    this.profileUpdate.emit(this.profileModel);
    this.showProfileEditForm.set(false);
  }

  togglePasswordEditState(): void {
    this.showPasswordEditForm.set(!this.showPasswordEditForm());

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
    this.showPasswordEditForm.set(false);
  }

  leaveCampaign(membership: CampaignMembership): void {
    this.campaignLeave.emit(membership);
  }
}
