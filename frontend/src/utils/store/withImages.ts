import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  patchState,
  SignalStoreFeature,
  signalStoreFeature,
  SignalStoreFeatureResult,
  withMethods,
  withState,
} from '@ngrx/signals';
import { take } from 'rxjs';
import { Image, ImageType } from 'src/app/_models/image';
import { httpErrorToast } from 'src/app/_models/toast';
import { ImageUploadService } from 'src/app/_services/article/image-upload.service';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { InnerStore } from './withQueries';

function addArticleId(
  image: Image,
  imageType: ImageType,
  articleId: number,
): Image {
  switch (imageType) {
    case 'character':
      return { ...image, character_article: articleId };
    case 'creature':
      return { ...image, creature_article: articleId };
    case 'encounter':
      return { ...image, encounter_article: articleId };
    case 'item':
      return { ...image, item_article: articleId };
    case 'location':
      return { ...image, location_article: articleId };
    case 'organization':
      return { ...image, organization_article: articleId };
  }
}

export interface ImageFeatureResult {
  props: {};
  methods: {
    createImage: (img: Image, articleId: number) => void;
    deleteImage: (imgPk: number) => void;
    updateImage: (img: Image) => void;
  };
  state: {
    imageServerModel: Image | undefined;
  };
}

const initialState: { imageServerModel: Image | undefined } = {
  imageServerModel: undefined,
};

export function withImages<Input extends SignalStoreFeatureResult>(
  imageType: ImageType,
  callbacks: {
    onCreateSuccess: (state: InnerStore<Input>, img: Image) => void;
    onDeleteSuccess: (state: InnerStore<Input>, imgPk: number) => void;
    onUpdateSuccess: (state: InnerStore<Input>, img: Image) => void;
  },
): SignalStoreFeature<Input, ImageFeatureResult> {
  return signalStoreFeature(
    withState(initialState),
    withMethods((state) => {
      const toastService = inject(ToastService);
      const imageService = inject(ImageUploadService);

      return {
        createImage: (img: Image, articleId: number) => {
          const image = addArticleId(img, imageType, articleId);
          imageService
            .create(image)
            .pipe(take(1))
            .subscribe({
              next: (newImage) =>
                callbacks.onCreateSuccess(state as InnerStore<Input>, newImage),
              error: (err) => toastService.addToast(httpErrorToast(err)),
            });
        },
        deleteImage: (imgPk: number) => {
          imageService
            .delete(imgPk)
            .pipe(take(1))
            .subscribe({
              next: () =>
                callbacks.onDeleteSuccess(state as InnerStore<Input>, imgPk),
              error: (err) => toastService.addToast(httpErrorToast(err)),
            });
        },
        updateImage: (img: Image) => {
          imageService.patch(img.pk, img).subscribe({
            next: (newImg) =>
              callbacks.onUpdateSuccess(state as InnerStore<Input>, newImg),
            error: (err: HttpErrorResponse) => {
              toastService.addToast(httpErrorToast(err));

              if (err.status !== 409) return;
              const serverModel: Image = err.error;
              patchState(state, { imageServerModel: serverModel });
            },
          });
        },
      };
    }),
  );
}
