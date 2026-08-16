import type * as http from 'node:http';
export type BodyParserLikeRequest = http.IncomingMessage & {
    body?: any;
};
/**
 * Fix proxied body if bodyParser is involved.
 *
 * @example
 * ```ts
 * createProxyMiddleware({
 *   target: 'http://example.com',
 *   on: {
 *     proxyReq: fixRequestBody,
 *   }
 * });
 * ```
 *
 * Alternative solution without using `fixRequestBody()`: put `http-proxy-middleware` before `bodyParser` in the middleware stack.
 *
 * @see {@link https://github.com/chimurai/http-proxy-middleware/issues/40 Github issue #40 - POST request body is not proxied}
 */
export declare function fixRequestBody<TReq extends BodyParserLikeRequest = BodyParserLikeRequest>(proxyReq: http.ClientRequest, req: TReq): void;
