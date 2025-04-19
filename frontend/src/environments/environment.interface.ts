export type EnvironmentKind = 'PRODUCTION' | 'DEVELOPMENT';

export interface Environment {
  kind: EnvironmentKind;
  apiUrl: string;
  frontendPrefix: string;
  configUrl: string;
}
