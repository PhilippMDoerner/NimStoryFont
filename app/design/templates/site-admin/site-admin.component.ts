import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PermissionGroup } from '../../../_models/auth';
import {
  BaseCampaignData,
  Campaign,
  WikiStatistics,
} from '../../../_models/campaign';
import { User } from '../../../_models/user';
import { FormlyService } from '../../../_services/formly/formly-service.service';
import { RoutingService } from '../../../_services/routing.service';
import { ButtonLinkComponent } from '../../atoms/button-link/button-link.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CardComponent } from '../../atoms/card/card.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { SeparatorComponent } from '../../atoms/separator/separator.component';
import { CollapsiblePanelComponent } from '../../molecules/collapsible-panel/collapsible-panel.component';
import { FormComponent } from '../../molecules/form/form.component';
import { PageContainerComponent } from '../../organisms/page-container/page-container.component';
import { UserRowComponent } from '../../organisms/user-row/user-row.component';

type UserState = 'CREATE' | 'DISPLAY';

@Component({
  selector: 'app-site-admin',
  templateUrl: './site-admin.component.html',
  styleUrls: ['./site-admin.component.scss'],
  imports: [
    PageContainerComponent,
    RouterLink,
    ButtonComponent,
    IconComponent,
    SeparatorComponent,
    CardComponent,
    ButtonLinkComponent,
    FormComponent,
    CollapsiblePanelComponent,
    UserRowComponent,
    TitleCasePipe,
    KeyValuePipe,
    ButtonLinkComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteAdminComponent {
  readonly users = input.required<User[] | undefined>();
  readonly campaigns = input.required<Campaign[] | undefined>();
  readonly allGroups = input.required<PermissionGroup[] | undefined>();
  readonly statistics = input.required<WikiStatistics | undefined>();
  readonly serverUrl = input.required<string>();

  readonly createCampaign = output<BaseCampaignData>();
  readonly createUser = output<User>();
  readonly addUserGroup = output<{ user: User; groupId: number }>();
  readonly removeUserGroup = output<{ user: User; groupId: number }>();
  readonly downloadDatabase = output<void>();
  readonly deleteUser = output<User>();

  readonly campaignOverviewUrl =
    this.routingService.getRoutePath('campaign-overview');

  readonly userCards = computed<{ isOpen: boolean; user: User }[]>(() => {
    return (this.users() ?? [])
      .map((user) => ({ isOpen: false, user }))
      .sort((entry1, entry2) =>
        entry1.user.username.toLowerCase() > entry2.user.username.toLowerCase()
          ? 1
          : -1,
      );
  });
  readonly userState = signal<UserState>('DISPLAY');
  userModel!: Partial<User>;
  readonly userFields: FormlyFieldConfig[] = [
    this.formlyService.buildInputConfig({
      key: 'username',
      inputKind: 'NAME',
      required: true,
    }),
    this.formlyService.buildConfirmedPasswordConfig({}),
    this.formlyService.buildInputConfig({
      key: 'email',
      inputKind: 'NAME',
      required: false,
    }),
  ];

  readonly createCampaignUrl =
    this.routingService.getRoutePath('campaign-create');
  constructor(
    private routingService: RoutingService,
    private formlyService: FormlyService,
  ) {}

  setUserState(newState: UserState): void {
    this.userState.set(newState);

    if (this.userState() === 'CREATE') {
      this.userModel = {};
    }
  }

  createNewUser(newUser: Partial<User>): void {
    this.setUserState('DISPLAY');
    this.createUser.emit(newUser as User);
  }
}
