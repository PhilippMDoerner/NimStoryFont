export type EnvironmentKind = 'PRODUCTION' | 'DEVELOPMENT';

export interface Environment {
  kind: EnvironmentKind;
  backendDomain: string;
  apiUrl: string;
  defaultTitle: string; //The default title shown in the tab heading in the browser
  frontendPrefix: string;
  configUrl: string;
}
