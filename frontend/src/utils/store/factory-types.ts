/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';

/** Transforms a type-union (A | B | C) into a type-intersection (A & B & C) */
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => any : never
) extends (x: infer I) => any
  ? I
  : never;

export type RequestState = 'init' | 'loading' | 'success' | 'error';
export type Request<Params, Response> = (
  params: Params,
) => Observable<Response>;
export type RequestMap = Record<string, Request<any, any>>;
