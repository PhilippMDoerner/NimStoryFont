import type { IncomingMessage, ServerResponse } from 'node:http';
import type { PathRewriteConfig } from './types.js';
/**
 * Create rewrite function, to cache parsed rewrite rules.
 */
export declare function createPathRewriter<TReq extends IncomingMessage = IncomingMessage, TRes extends ServerResponse = ServerResponse>(rewriteConfig: PathRewriteConfig<TReq, TRes> | undefined): ((path: string, req: TReq, res?: TRes | undefined, options?: import("./types.js").Options<TReq, TRes> | undefined) => string | undefined) | ((path: string, req: TReq, res?: TRes | undefined, options?: import("./types.js").Options<TReq, TRes> | undefined) => Promise<string | undefined>) | undefined;
