import { FormlyService } from './formly-service.service';

export const FormlyProvider = {
  provide: FormlyService,
  useFactory: () => {
    return new FormlyService();
  },
};
