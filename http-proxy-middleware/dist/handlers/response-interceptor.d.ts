import type * as http from 'node:http';
type Interceptor<TReq = http.IncomingMessage, TRes = http.ServerResponse> = (buffer: Buffer, proxyRes: http.IncomingMessage, req: TReq, res: TRes) => Promise<Buffer | string>;
/**
 * Intercept responses from upstream.
 * Automatically decompress (deflate, gzip, brotli, zstd).
 * Give developer the opportunity to modify intercepted Buffer and http.ServerResponse
 *
 * NOTE: must set options.selfHandleResponse=true (prevent automatic call of res.end())
 *
 * @example
 *
 * ```ts
 * createProxyMiddleware({
 *   target: 'http://example.com',
 *   selfHandleResponse: true, // MUST set selfHandleResponse=true
 *   on: {
 *     proxyRes: responseInterceptor(async (buffer, proxyRes, req, res) => {
 *       // modify intercepted buffer and return modified buffer
 *       const modifiedBuffer = Buffer.from(buffer.toString().replace(/Example/g, 'Demo'), 'utf8');
 *       return modifiedBuffer;
 *     }),
 *   }
 * });
 * ```
 */
export declare function responseInterceptor<TReq extends http.IncomingMessage = http.IncomingMessage, TRes extends http.ServerResponse = http.ServerResponse>(interceptor: Interceptor<TReq, TRes>): (proxyRes: http.IncomingMessage, req: TReq, res: TRes) => Promise<void>;
export {};
