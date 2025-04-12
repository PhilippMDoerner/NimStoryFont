export interface BadgeListEntry<T> {
  text: string;
  link?: string;
  badgeValue: T;
}

export interface BadgeListSelectOptions<T> {
  options: T[];
  labelProp: keyof T;
  valueProp: keyof T;
}
