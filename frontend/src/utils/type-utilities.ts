/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

// Utility type for getting the param type of a function... I think
export type SomeVersionOfU2I<U> = (
  U extends any ? (x: U) => any : never
) extends (x: infer I) => any
  ? I
  : never;
