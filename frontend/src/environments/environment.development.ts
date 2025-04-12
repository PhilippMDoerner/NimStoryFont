import { Environment } from './environment.interface';

const backendDomain = 'https://www.aldrune.com';

export const environment: Environment = {
  kind: 'DEVELOPMENT',
  backendDomain: backendDomain,
  apiUrl: `/wiki1/api`,
  defaultTitle: 'StoryFont',
  frontendPrefix: 'wiki2',
  configUrl: `assets/config/feature_config.json`,
};
