export type EnvironmentKind = 'PRODUCTION' | 'DEVELOPMENT';

export interface Environment {
  kind: EnvironmentKind;
  apiUrl: string;
  configUrl: string;
}
