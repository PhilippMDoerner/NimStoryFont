/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpErrorResponse, HttpClient, HTTP_ROOT_INTERCEPTOR_FNS, HttpResponse } from './module-CBsxN_3E.mjs';
export { FetchBackend, HTTP_INTERCEPTORS, HttpBackend, HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule, HttpContext, HttpContextToken, HttpFeatureKind, HttpHandler, HttpHeaderResponse, HttpResponseBase, HttpStatusCode, HttpUrlEncodingCodec, HttpXhrBackend, HttpXsrfTokenExtractor, JsonpClientBackend, JsonpInterceptor, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi, withJsonpSupport, withNoXsrfProtection, withRequestsMadeViaParent, withXsrfConfiguration, HttpInterceptorHandler as ɵHttpInterceptingHandler, HttpInterceptorHandler as ɵHttpInterceptorHandler, REQUESTS_CONTRIBUTE_TO_STABILITY as ɵREQUESTS_CONTRIBUTE_TO_STABILITY } from './module-CBsxN_3E.mjs';
import { assertInInjectionContext, inject, Injector, ɵResourceImpl as _ResourceImpl, linkedSignal, computed, signal, ɵencapsulateResourceError as _encapsulateResourceError, ɵRuntimeError as _RuntimeError, InjectionToken, ɵperformanceMarkFeature as _performanceMarkFeature, APP_BOOTSTRAP_LISTENER, ApplicationRef, TransferState, makeStateKey, ɵtruncateMiddle as _truncateMiddle, ɵformatRuntimeError as _formatRuntimeError } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import './xhr-CEmSPUGj.mjs';

/**
 * `httpResource` makes a reactive HTTP request and exposes the request status and response value as
 * a `WritableResource`. By default, it assumes that the backend will return JSON data. To make a
 * request that expects a different kind of data, you can use a sub-constructor of `httpResource`,
 * such as `httpResource.text`.
 *
 * @experimental 19.2
 * @initializerApiFunction
 */
const httpResource = (() => {
    const jsonFn = makeHttpResourceFn('json');
    jsonFn.arrayBuffer = makeHttpResourceFn('arraybuffer');
    jsonFn.blob = makeHttpResourceFn('blob');
    jsonFn.text = makeHttpResourceFn('text');
    return jsonFn;
})();
function makeHttpResourceFn(responseType) {
    return function httpResource(request, options) {
        if (ngDevMode && !options?.injector) {
            assertInInjectionContext(httpResource);
        }
        const injector = options?.injector ?? inject(Injector);
        return new HttpResourceImpl(injector, () => normalizeRequest(request, responseType), options?.defaultValue, options?.parse, options?.equal);
    };
}
function normalizeRequest(request, responseType) {
    let unwrappedRequest = typeof request === 'function' ? request() : request;
    if (unwrappedRequest === undefined) {
        return undefined;
    }
    else if (typeof unwrappedRequest === 'string') {
        unwrappedRequest = { url: unwrappedRequest };
    }
    const headers = unwrappedRequest.headers instanceof HttpHeaders
        ? unwrappedRequest.headers
        : new HttpHeaders(unwrappedRequest.headers);
    const params = unwrappedRequest.params instanceof HttpParams
        ? unwrappedRequest.params
        : new HttpParams({ fromObject: unwrappedRequest.params });
    return new HttpRequest(unwrappedRequest.method ?? 'GET', unwrappedRequest.url, unwrappedRequest.body ?? null, {
        headers,
        params,
        reportProgress: unwrappedRequest.reportProgress,
        withCredentials: unwrappedRequest.withCredentials,
        responseType,
        context: unwrappedRequest.context,
        transferCache: unwrappedRequest.transferCache,
    });
}
class HttpResourceImpl extends _ResourceImpl {
    client;
    _headers = linkedSignal({
        source: this.extRequest,
        computation: () => undefined,
    });
    _progress = linkedSignal({
        source: this.extRequest,
        computation: () => undefined,
    });
    _statusCode = linkedSignal({
        source: this.extRequest,
        computation: () => undefined,
    });
    headers = computed(() => this.status() === 'resolved' || this.status() === 'error' ? this._headers() : undefined);
    progress = this._progress.asReadonly();
    statusCode = this._statusCode.asReadonly();
    constructor(injector, request, defaultValue, parse, equal) {
        super(request, ({ params: request, abortSignal }) => {
            let sub;
            // Track the abort listener so it can be removed if the Observable completes (as a memory
            // optimization).
            const onAbort = () => sub.unsubscribe();
            abortSignal.addEventListener('abort', onAbort);
            // Start off stream as undefined.
            const stream = signal({ value: undefined });
            let resolve;
            const promise = new Promise((r) => (resolve = r));
            const send = (value) => {
                stream.set(value);
                resolve?.(stream);
                resolve = undefined;
            };
            sub = this.client.request(request).subscribe({
                next: (event) => {
                    switch (event.type) {
                        case HttpEventType.Response:
                            this._headers.set(event.headers);
                            this._statusCode.set(event.status);
                            try {
                                send({ value: parse ? parse(event.body) : event.body });
                            }
                            catch (error) {
                                send({ error: _encapsulateResourceError(error) });
                            }
                            break;
                        case HttpEventType.DownloadProgress:
                            this._progress.set(event);
                            break;
                    }
                },
                error: (error) => {
                    if (error instanceof HttpErrorResponse) {
                        this._headers.set(error.headers);
                        this._statusCode.set(error.status);
                    }
                    send({ error });
                    abortSignal.removeEventListener('abort', onAbort);
                },
                complete: () => {
                    if (resolve) {
                        send({
                            error: new _RuntimeError(991 /* ɵRuntimeErrorCode.RESOURCE_COMPLETED_BEFORE_PRODUCING_VALUE */, ngDevMode && 'Resource completed before producing a value'),
                        });
                    }
                    abortSignal.removeEventListener('abort', onAbort);
                },
            });
            return promise;
        }, defaultValue, equal, injector);
        this.client = injector.get(HttpClient);
    }
}

/**
 * If your application uses different HTTP origins to make API calls (via `HttpClient`) on the server and
 * on the client, the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token allows you to establish a mapping
 * between those origins, so that `HttpTransferCache` feature can recognize those requests as the same
 * ones and reuse the data cached on the server during hydration on the client.
 *
 * **Important note**: the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token should *only* be provided in
 * the *server* code of your application (typically in the `app.server.config.ts` script). Angular throws an
 * error if it detects that the token is defined while running on the client.
 *
 * @usageNotes
 *
 * When the same API endpoint is accessed via `http://internal-domain.com:8080` on the server and
 * via `https://external-domain.com` on the client, you can use the following configuration:
 * ```ts
 * // in app.server.config.ts
 * {
 *     provide: HTTP_TRANSFER_CACHE_ORIGIN_MAP,
 *     useValue: {
 *         'http://internal-domain.com:8080': 'https://external-domain.com'
 *     }
 * }
 * ```
 *
 * @publicApi
 */
const HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken(ngDevMode ? 'HTTP_TRANSFER_CACHE_ORIGIN_MAP' : '');
/**
 * Keys within cached response data structure.
 */
const BODY = 'b';
const HEADERS = 'h';
const STATUS = 's';
const STATUS_TEXT = 'st';
const REQ_URL = 'u';
const RESPONSE_TYPE = 'rt';
const CACHE_OPTIONS = new InjectionToken(ngDevMode ? 'HTTP_TRANSFER_STATE_CACHE_OPTIONS' : '');
/**
 * A list of allowed HTTP methods to cache.
 */
const ALLOWED_METHODS = ['GET', 'HEAD'];
function transferCacheInterceptorFn(req, next) {
    const { isCacheActive, ...globalOptions } = inject(CACHE_OPTIONS);
    const { transferCache: requestOptions, method: requestMethod } = req;
    // In the following situations we do not want to cache the request
    if (!isCacheActive ||
        requestOptions === false ||
        // POST requests are allowed either globally or at request level
        (requestMethod === 'POST' && !globalOptions.includePostRequests && !requestOptions) ||
        (requestMethod !== 'POST' && !ALLOWED_METHODS.includes(requestMethod)) ||
        // Do not cache request that require authorization when includeRequestsWithAuthHeaders is falsey
        (!globalOptions.includeRequestsWithAuthHeaders && hasAuthHeaders(req)) ||
        globalOptions.filter?.(req) === false) {
        return next(req);
    }
    const transferState = inject(TransferState);
    const originMap = inject(HTTP_TRANSFER_CACHE_ORIGIN_MAP, {
        optional: true,
    });
    if (typeof ngServerMode !== 'undefined' && !ngServerMode && originMap) {
        throw new _RuntimeError(2803 /* RuntimeErrorCode.HTTP_ORIGIN_MAP_USED_IN_CLIENT */, ngDevMode &&
            'Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and ' +
                'present in the client side code. Please ensure that this token is only provided in the ' +
                'server code of the application.');
    }
    const requestUrl = typeof ngServerMode !== 'undefined' && ngServerMode && originMap
        ? mapRequestOriginUrl(req.url, originMap)
        : req.url;
    const storeKey = makeCacheKey(req, requestUrl);
    const response = transferState.get(storeKey, null);
    let headersToInclude = globalOptions.includeHeaders;
    if (typeof requestOptions === 'object' && requestOptions.includeHeaders) {
        // Request-specific config takes precedence over the global config.
        headersToInclude = requestOptions.includeHeaders;
    }
    if (response) {
        const { [BODY]: undecodedBody, [RESPONSE_TYPE]: responseType, [HEADERS]: httpHeaders, [STATUS]: status, [STATUS_TEXT]: statusText, [REQ_URL]: url, } = response;
        // Request found in cache. Respond using it.
        let body = undecodedBody;
        switch (responseType) {
            case 'arraybuffer':
                body = new TextEncoder().encode(undecodedBody).buffer;
                break;
            case 'blob':
                body = new Blob([undecodedBody]);
                break;
        }
        // We want to warn users accessing a header provided from the cache
        // That HttpTransferCache alters the headers
        // The warning will be logged a single time by HttpHeaders instance
        let headers = new HttpHeaders(httpHeaders);
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            // Append extra logic in dev mode to produce a warning when a header
            // that was not transferred to the client is accessed in the code via `get`
            // and `has` calls.
            headers = appendMissingHeadersDetection(req.url, headers, headersToInclude ?? []);
        }
        return of(new HttpResponse({
            body,
            headers,
            status,
            statusText,
            url,
        }));
    }
    // Request not found in cache. Make the request and cache it if on the server.
    return next(req).pipe(tap((event) => {
        if (event instanceof HttpResponse && typeof ngServerMode !== 'undefined' && ngServerMode) {
            transferState.set(storeKey, {
                [BODY]: event.body,
                [HEADERS]: getFilteredHeaders(event.headers, headersToInclude),
                [STATUS]: event.status,
                [STATUS_TEXT]: event.statusText,
                [REQ_URL]: requestUrl,
                [RESPONSE_TYPE]: req.responseType,
            });
        }
    }));
}
/** @returns true when the requests contains autorization related headers. */
function hasAuthHeaders(req) {
    return req.headers.has('authorization') || req.headers.has('proxy-authorization');
}
function getFilteredHeaders(headers, includeHeaders) {
    if (!includeHeaders) {
        return {};
    }
    const headersMap = {};
    for (const key of includeHeaders) {
        const values = headers.getAll(key);
        if (values !== null) {
            headersMap[key] = values;
        }
    }
    return headersMap;
}
function sortAndConcatParams(params) {
    return [...params.keys()]
        .sort()
        .map((k) => `${k}=${params.getAll(k)}`)
        .join('&');
}
function makeCacheKey(request, mappedRequestUrl) {
    // make the params encoded same as a url so it's easy to identify
    const { params, method, responseType } = request;
    const encodedParams = sortAndConcatParams(params);
    let serializedBody = request.serializeBody();
    if (serializedBody instanceof URLSearchParams) {
        serializedBody = sortAndConcatParams(serializedBody);
    }
    else if (typeof serializedBody !== 'string') {
        serializedBody = '';
    }
    const key = [method, responseType, mappedRequestUrl, serializedBody, encodedParams].join('|');
    const hash = generateHash(key);
    return makeStateKey(hash);
}
/**
 * A method that returns a hash representation of a string using a variant of DJB2 hash
 * algorithm.
 *
 * This is the same hashing logic that is used to generate component ids.
 */
function generateHash(value) {
    let hash = 0;
    for (const char of value) {
        hash = (Math.imul(31, hash) + char.charCodeAt(0)) << 0;
    }
    // Force positive number hash.
    // 2147483647 = equivalent of Integer.MAX_VALUE.
    hash += 2147483647 + 1;
    return hash.toString();
}
/**
 * Returns the DI providers needed to enable HTTP transfer cache.
 *
 * By default, when using server rendering, requests are performed twice: once on the server and
 * other one on the browser.
 *
 * When these providers are added, requests performed on the server are cached and reused during the
 * bootstrapping of the application in the browser thus avoiding duplicate requests and reducing
 * load time.
 *
 */
function withHttpTransferCache(cacheOptions) {
    return [
        {
            provide: CACHE_OPTIONS,
            useFactory: () => {
                _performanceMarkFeature('NgHttpTransferCache');
                return { isCacheActive: true, ...cacheOptions };
            },
        },
        {
            provide: HTTP_ROOT_INTERCEPTOR_FNS,
            useValue: transferCacheInterceptorFn,
            multi: true,
        },
        {
            provide: APP_BOOTSTRAP_LISTENER,
            multi: true,
            useFactory: () => {
                const appRef = inject(ApplicationRef);
                const cacheState = inject(CACHE_OPTIONS);
                return () => {
                    appRef.whenStable().then(() => {
                        cacheState.isCacheActive = false;
                    });
                };
            },
        },
    ];
}
/**
 * This function will add a proxy to an HttpHeader to intercept calls to get/has
 * and log a warning if the header entry requested has been removed
 */
function appendMissingHeadersDetection(url, headers, headersToInclude) {
    const warningProduced = new Set();
    return new Proxy(headers, {
        get(target, prop) {
            const value = Reflect.get(target, prop);
            const methods = new Set(['get', 'has', 'getAll']);
            if (typeof value !== 'function' || !methods.has(prop)) {
                return value;
            }
            return (headerName) => {
                // We log when the key has been removed and a warning hasn't been produced for the header
                const key = (prop + ':' + headerName).toLowerCase(); // e.g. `get:cache-control`
                if (!headersToInclude.includes(headerName) && !warningProduced.has(key)) {
                    warningProduced.add(key);
                    const truncatedUrl = _truncateMiddle(url);
                    // TODO: create Error guide for this warning
                    console.warn(_formatRuntimeError(2802 /* RuntimeErrorCode.HEADERS_ALTERED_BY_TRANSFER_CACHE */, `Angular detected that the \`${headerName}\` header is accessed, but the value of the header ` +
                        `was not transferred from the server to the client by the HttpTransferCache. ` +
                        `To include the value of the \`${headerName}\` header for the \`${truncatedUrl}\` request, ` +
                        `use the \`includeHeaders\` list. The \`includeHeaders\` can be defined either ` +
                        `on a request level by adding the \`transferCache\` parameter, or on an application ` +
                        `level by adding the \`httpCacheTransfer.includeHeaders\` argument to the ` +
                        `\`provideClientHydration()\` call. `));
                }
                // invoking the original method
                return value.apply(target, [headerName]);
            };
        },
    });
}
function mapRequestOriginUrl(url, originMap) {
    const origin = new URL(url, 'resolve://').origin;
    const mappedOrigin = originMap[origin];
    if (!mappedOrigin) {
        return url;
    }
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
        verifyMappedOrigin(mappedOrigin);
    }
    return url.replace(origin, mappedOrigin);
}
function verifyMappedOrigin(url) {
    if (new URL(url, 'resolve://').pathname !== '/') {
        throw new _RuntimeError(2804 /* RuntimeErrorCode.HTTP_ORIGIN_MAP_CONTAINS_PATH */, 'Angular detected a URL with a path segment in the value provided for the ' +
            `\`HTTP_TRANSFER_CACHE_ORIGIN_MAP\` token: ${url}. The map should only contain origins ` +
            'without any other segments.');
    }
}

export { HTTP_TRANSFER_CACHE_ORIGIN_MAP, HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse, httpResource, HTTP_ROOT_INTERCEPTOR_FNS as ɵHTTP_ROOT_INTERCEPTOR_FNS, withHttpTransferCache as ɵwithHttpTransferCache };
//# sourceMappingURL=http.mjs.map
