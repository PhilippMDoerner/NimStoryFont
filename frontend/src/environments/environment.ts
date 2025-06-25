import { Environment } from './environment.interface';

export const environment: Environment = {
  kind: 'PRODUCTION',
  apiUrl: `/wiki1/api`,
  configUrl: `/wiki1/feature_config.json`, //NOTE: This must be consistent with the Feature Config section in nginx.conf
};
