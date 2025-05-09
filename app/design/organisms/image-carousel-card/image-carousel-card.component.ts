import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NgbSlideEvent, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';

import { Image } from 'src/app/_models/image';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { SpinnerComponent } from 'src/app/design/atoms/spinner/spinner.component';
import { FormComponent } from 'src/app/design/molecules';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';

type State = 'DISPLAY' | 'DELETE' | 'UPDATE' | 'UPDATE_OUTDATED' | 'CREATE';

@Component({
  selector: 'app-image-carousel-card',
  templateUrl: './image-carousel-card.component.html',
  styleUrls: ['./image-carousel-card.component.scss'],
  imports: [
    ImageCarouselComponent,
    SpinnerComponent,
    IconComponent,
    FormComponent,
    ButtonComponent,
    NgTemplateOutlet,
    NgbTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarouselCardComponent {
  images = input.required<Image[]>();
  serverUrl = input.required<string>();
  serverModel = input.required<Image | undefined>();
  canUpdate = input.required<boolean>();
  canCreate = input.required<boolean>();
  canDelete = input.required<boolean>();

  readonly createImage = output<Image>();
  readonly deleteImage = output<Image>();
  readonly updateImage = output<Image>();

  currentImageIndex = signal(0);
  currentImage = computed(() => this.images()[this.currentImageIndex()]);
  state = signal<State>('DISPLAY');
  userModel = signal<Partial<Image> | null>({});
  isLoading = signal(false);

  createFields: FormlyFieldConfig[] = [
    this.formlyService.buildInputConfig({
      key: 'name',
      label: 'Image Description',
      required: true,
      inputKind: 'STRING',
    }),
    this.formlyService.buildInputConfig({
      key: 'character_article',
      label: 'Character Article',
      hide: true,
      inputKind: 'NUMBER',
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'location_article',
      label: 'Location Article',
      hide: true,
      inputKind: 'NUMBER',
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'creature_article',
      label: 'Creature Article',
      hide: true,
      inputKind: 'NUMBER',
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'organization_article',
      label: 'Organization Article',
      hide: true,
      inputKind: 'NUMBER',
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'encounter_article',
      label: 'Encounter Article',
      hide: true,
      inputKind: 'NUMBER',
      required: false,
    }),
    this.formlyService.buildInputConfig({
      key: 'item_article',
      label: 'Item Article',
      hide: true,
      inputKind: 'NUMBER',
      required: false,
      placeholder: undefined,
    }),
    this.formlyService.buildFileFieldConfig({
      label: 'Image file',
      key: 'image',
      fileButtonType: 'DARK',
    }),
  ];

  updateFields: FormlyFieldConfig[] = this.formlyService.toUpdateForm(
    this.createFields,
  );

  constructor(private formlyService: FormlyService) {}

  changeState(event: null | Image | Partial<Image>, newState: State) {
    this.userModel.set(event ? { ...event } : null);
    this.state.set(newState);
  }

  onSlide(slideEvent: { event: NgbSlideEvent; index: number }) {
    this.currentImageIndex.set(slideEvent.index);
  }

  onCancel(): void {
    this.changeState(null, 'DISPLAY');
  }

  onSubmit(): void {
    switch (this.state()) {
      case 'DELETE':
        this.deleteImage.emit(this.currentImage());
        break;
      case 'UPDATE':
      case 'UPDATE_OUTDATED':
        this.updateImage.emit(this.userModel() as Image);
        break;
      case 'CREATE':
        this.createImage.emit(this.userModel() as Image);
        break;
      default:
        throw `ImageCarouselCard - Submitted form while in state '${this.state}', which is not possible.`;
    }

    this.userModel.set({});
    this.changeState(null, 'DISPLAY');
  }
}
