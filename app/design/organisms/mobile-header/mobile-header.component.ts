import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlineService } from 'src/app/_services/online.service';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { SearchModalComponent } from 'src/app/global-components/search/search-modal/search-modal.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'app-mobile-header',
  imports: [
    IconComponent,
    RouterLink,
    AsyncPipe,
    NgbTooltipModule,
    ButtonComponent,
  ],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderComponent {
  currentCampaignIconUrl = input.required<string | undefined>();
  title = input.required<string>();
  titleUrl = input.required<string>();
  canShowSidebar = input.required<boolean>();

  openSidebar = output<void>();
  serverUrl = '';

  online$ = inject(OnlineService).online$;
  modalService = inject(NgbModal);

  openModal(content: TemplateRef<HTMLElement>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      modalDialogClass: 'border border-info border-3 rounded mymodal',
    });
  }

  openSearchModal() {
    const ref = this.modalService.open(SearchModalComponent);
    const titleId = (ref.componentInstance as SearchModalComponent).titleId;
    ref.update({ ariaLabelledBy: titleId });
  }
}
