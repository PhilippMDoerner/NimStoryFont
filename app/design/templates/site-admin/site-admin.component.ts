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
import { PermissionGroup } from 'src/app/_models/auth';
import {
  BaseCampaignData,
  Campaign,
  WikiStatistics,
} from 'src/app/_models/campaign';
import { User } from 'src/app/_models/user';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
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
  users = input.required<User[] | undefined>();
  campaigns = input.required<Campaign[] | undefined>();
  allGroups = input.required<PermissionGroup[] | undefined>();
  statistics = input.required<WikiStatistics | undefined>();
  serverUrl = input.required<string>();

  readonly createCampaign = output<BaseCampaignData>();
  readonly createUser = output<User>();
  readonly addUserGroup = output<{ user: User; groupId: number }>();
  readonly removeUserGroup = output<{ user: User; groupId: number }>();
  readonly downloadDatabase = output<void>();
  readonly deleteUser = output<User>();

  campaignOverviewUrl = this.routingService.getRoutePath('campaign-overview');

  userCards = computed<{ isOpen: boolean; user: User }[]>(() => {
    return (this.users() ?? [])
      .map((user) => ({ isOpen: false, user }))
      .sort((entry1, entry2) =>
        entry1.user.username.toLowerCase() > entry2.user.username.toLowerCase()
          ? 1
          : -1,
      );
  });
  userState = signal<UserState>('DISPLAY');
  userModel!: Partial<User>;
  userFields: FormlyFieldConfig[] = [
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

  createCampaignUrl = this.routingService.getRoutePath('campaign-create');
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
