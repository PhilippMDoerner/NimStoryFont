import { Environment } from './environment.interface';

export const environment: Environment = {
  kind: 'DEVELOPMENT',
  apiUrl: `/wiki1/api`,
  frontendPrefix: 'wiki2',
  configUrl: `assets/config/feature_config.json`,
};
