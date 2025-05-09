export interface UserRaw {
  password: string;
  passwordConfirm: string;
  username: string;
  email?: string;
}

export interface User {
  username: string;
  password?: string;
  pk?: number;
  api_permissions?: string[];
  groups?: number[];
  group_details?: { name: string; pk: number }[];
  is_staff?: boolean;
  is_superuser?: boolean;
  email?: string;
  is_active?: boolean;
}
