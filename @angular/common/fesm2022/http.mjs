/**
 * @license Angular v22.1.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import { HTTP_ROOT_INTERCEPTOR_FNS, HttpResponse, HttpHeaders, HttpErrorResponse, HttpEventType, HttpClient, HttpParams, HttpRequest } from './_module-chunk.mjs';
export { FetchBackend, HTTP_INTERCEPTORS, HttpBackend, HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule, HttpContext, HttpContextToken, HttpFeatureKind, HttpHandler, HttpHeaderResponse, HttpResponseBase, HttpStatusCode, HttpUrlEncodingCodec, HttpXhrBackend, HttpXsrfTokenExtractor, JsonpClientBackend, JsonpInterceptor, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi, withJsonpSupport, withNoXsrfProtection, withRequestsMadeViaParent, withXhr, withXsrfConfiguration, HTTP_FETCH_MAX_RESPONSE_SIZE as ɵHTTP_FETCH_MAX_RESPONSE_SIZE, HttpInterceptorHandler as ɵHttpInterceptingHandler, REQUESTS_CONTRIBUTE_TO_STABILITY as ɵREQUESTS_CONTRIBUTE_TO_STABILITY } from './_module-chunk.mjs';
import { InjectionToken, APP_BOOTSTRAP_LISTENER, ɵperformanceMarkFeature as _performanceMarkFeature, inject, ApplicationRef, TransferState, makeStateKey, ɵRuntimeError as _RuntimeError, ɵtruncateMiddle as _truncateMiddle, ɵformatRuntimeError as _formatRuntimeError, assertInInjectionContext, Injector, signal, ɵResourceImpl as _ResourceImpl, linkedSignal, computed, ɵencapsulateResourceError as _encapsulateResourceError } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import './_xhr-chunk.mjs';
import './_platform_location-chunk.mjs';

const HTTP_TRANSFER_CACHE_ORIGIN_MAP = new InjectionToken(typeof ngDevMode !== 'undefined' && ngDevMode ? 'HTTP_TRANSFER_CACHE_ORIGIN_MAP' : '');
const BODY = 'b';
const HEADERS = 'h';
const STATUS = 's';
const STATUS_TEXT = 'st';
const REQ_URL = 'u';
const RESPONSE_TYPE = 'rt';
const CACHE_OPTIONS = new InjectionToken(typeof ngDevMode !== 'undefined' && ngDevMode ? 'HTTP_TRANSFER_STATE_CACHE_OPTIONS' : '');
const ALLOWED_METHODS = ['GET', 'HEAD'];
function canUseOrCacheRequest(req, options) {
  const {
    isCacheActive,
    filter,
    includePostRequests,
    includeRequestsWithAuthHeaders,
    includeRequestsWithCredentials,
    includeNonCacheableRequests
  } = options;
  const {
    transferCache: requestOptions,
    method: requestMethod
  } = req;
  if (!isCacheActive || requestOptions === false || requestMethod === 'POST' && !includePostRequests && !requestOptions || requestMethod !== 'POST' && !ALLOWED_METHODS.includes(requestMethod) || !includeRequestsWithAuthHeaders && hasAuthHeaders(req) || !includeRequestsWithCredentials && hasOutgoingCredentials(req) || !includeNonCacheableRequests && (hasUncacheableCacheControl(req.headers) || isNonCacheableRequest(req.cache)) || filter?.(req) === false) {
    return false;
  }
  return true;
}
function getHeadersToInclude(options, requestOptions) {
  return typeof requestOptions === 'object' && requestOptions.includeHeaders ? requestOptions.includeHeaders : options.includeHeaders;
}
function retrieveStateFromCache(req, options, transferState, originMap, storeKey, skipUseCacheChecks = false) {
  if (!skipUseCacheChecks && !canUseOrCacheRequest(req, options)) {
    return null;
  }
  if (typeof ngServerMode !== 'undefined' && !ngServerMode && originMap) {
    throw new _RuntimeError(2803, ngDevMode && 'Angular detected that the `HTTP_TRANSFER_CACHE_ORIGIN_MAP` token is configured and ' + 'present in the client side code. Please ensure that this token is only provided in the ' + 'server code of the application.');
  }
  if (!storeKey) {
    const requestUrl = typeof ngServerMode !== 'undefined' && ngServerMode && originMap ? mapRequestOriginUrl(req.url, originMap) : req.url;
    storeKey = makeCacheKey(req, requestUrl);
  }
  const response = transferState.get(storeKey, null);
  if (!response) {
    return null;
  }
  const {
    [BODY]: undecodedBody,
    [RESPONSE_TYPE]: responseType,
    [HEADERS]: httpHeaders,
    [STATUS]: status,
    [STATUS_TEXT]: statusText,
    [REQ_URL]: url
  } = response;
  let body = undecodedBody;
  switch (responseType) {
    case 'arraybuffer':
      body = fromBase64(undecodedBody);
      break;
    case 'blob':
      body = new Blob([fromBase64(undecodedBody)]);
      break;
  }
  let headers = new HttpHeaders(httpHeaders);
  if (typeof ngDevMode === 'undefined' || ngDevMode) {
    const {
      transferCache: requestOptions
    } = req;
    const headersToInclude = getHeadersToInclude(options, requestOptions);
    headers = appendMissingHeadersDetection(req.url, headers, headersToInclude ?? []);
  }
  return new HttpResponse({
    body,
    headers,
    status,
    statusText,
    url
  });
}
function transferCacheInterceptorFn(req, next) {
  const options = inject(CACHE_OPTIONS);
  if (!canUseOrCacheRequest(req, options)) {
    return next(req);
  }
  const transferState = inject(TransferState);
  const originMap = inject(HTTP_TRANSFER_CACHE_ORIGIN_MAP, {
    optional: true
  });
  const requestUrl = typeof ngServerMode !== 'undefined' && ngServerMode && originMap ? mapRequestOriginUrl(req.url, originMap) : req.url;
  const storeKey = makeCacheKey(req, requestUrl);
  const cachedResponse = retrieveStateFromCache(req, options, transferState, null, storeKey, true);
  if (cachedResponse) {
    return of(cachedResponse);
  }
  const event$ = next(req);
  if (typeof ngServerMode !== 'undefined' && ngServerMode) {
    return event$.pipe(tap(event => {
      if (event instanceof HttpResponse) {
        const {
          headers,
          body,
          status,
          statusText
        } = event;
        if (!options.includeNonCacheableRequests && (hasUncacheableCacheControl(headers) || hasSetCookieHeader(headers))) {
          return;
        }
        const {
          transferCache: requestOptions,
          responseType
        } = req;
        const headersToInclude = getHeadersToInclude(options, requestOptions);
        transferState.set(storeKey, {
          [BODY]: responseType === 'arraybuffer' || responseType === 'blob' ? toBase64(body) : body,
          [HEADERS]: getFilteredHeaders(headers, headersToInclude),
          [STATUS]: status,
          [STATUS_TEXT]: statusText,
          [REQ_URL]: requestUrl,
          [RESPONSE_TYPE]: responseType
        });
      }
    }));
  }
  return event$;
}
function hasAuthHeaders(req) {
  const headers = req.headers;
  return headers.has('authorization') || headers.has('proxy-authorization') || headers.has('cookie');
}
const UNCACHEABLE_CACHE_CONTROL_DIRECTIVES = new Set(['no-store', 'private', 'no-cache']);
function hasUncacheableCacheControl(headers) {
  const cacheControl = headers.get('cache-control');
  if (!cacheControl) {
    return false;
  }
  return cacheControl.split(',').some(directive => {
    const directiveName = directive.split('=', 1)[0].trim().toLowerCase();
    return UNCACHEABLE_CACHE_CONTROL_DIRECTIVES.has(directiveName);
  });
}
function hasSetCookieHeader(headers) {
  return headers.has('set-cookie');
}
function isNonCacheableRequest(cache) {
  return cache === 'no-cache' || cache === 'no-store';
}
function hasOutgoingCredentials(req) {
  const {
    withCredentials,
    credentials
  } = req;
  return withCredentials || credentials === 'include' || credentials === 'same-origin';
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
  const searchParams = new URLSearchParams(params instanceof URLSearchParams ? params : params.toString());
  searchParams.sort();
  return searchParams.toString();
}
function makeCacheKey(request, mappedRequestUrl) {
  const {
    params,
    method,
    responseType
  } = request;
  const encodedParams = sortAndConcatParams(params);
  let serializedBody = request.serializeBody();
  if (serializedBody instanceof URLSearchParams) {
    serializedBody = sortAndConcatParams(serializedBody);
  } else if (typeof serializedBody !== 'string') {
    serializedBody = '';
  }
  const key = [method, responseType, mappedRequestUrl, serializedBody, encodedParams].join('\0');
  const hash = generateHash(key);
  return makeStateKey(hash);
}
function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const CHUNK_SIZE = 0x8000;
  let binaryString = '';
  for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
    const chunk = bytes.subarray(i, i + CHUNK_SIZE);
    binaryString += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binaryString);
}
function fromBase64(base64) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return bytes.buffer;
}
function withHttpTransferCache(cacheOptions) {
  return [{
    provide: CACHE_OPTIONS,
    useFactory: () => {
      _performanceMarkFeature('NgHttpTransferCache');
      return {
        isCacheActive: true,
        ...cacheOptions
      };
    }
  }, {
    provide: HTTP_ROOT_INTERCEPTOR_FNS,
    useValue: transferCacheInterceptorFn,
    multi: true
  }, {
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
    }
  }];
}
function appendMissingHeadersDetection(url, headers, headersToInclude) {
  const warningProduced = new Set();
  return new Proxy(headers, {
    get(target, prop) {
      const value = Reflect.get(target, prop);
      const methods = new Set(['get', 'has', 'getAll']);
      if (typeof value !== 'function' || !methods.has(prop)) {
        return value;
      }
      return headerName => {
        const key = (prop + ':' + headerName).toLowerCase();
        if (!headersToInclude.includes(headerName) && !warningProduced.has(key)) {
          warningProduced.add(key);
          const truncatedUrl = _truncateMiddle(url);
          console.warn(_formatRuntimeError(-2802, `Angular detected that the \`${headerName}\` header is accessed, but the value of the header ` + `was not transferred from the server to the client by the HttpTransferCache. ` + `To include the value of the \`${headerName}\` header for the \`${truncatedUrl}\` request, ` + `use the \`includeHeaders\` list. The \`includeHeaders\` can be defined either ` + `on a request level by adding the \`transferCache\` parameter, or on an application ` + `level by adding the \`httpCacheTransfer.includeHeaders\` argument to the ` + `\`provideClientHydration()\` call. `));
        }
        return value.apply(target, [headerName]);
      };
    }
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
    throw new _RuntimeError(2804, 'Angular detected a URL with a path segment in the value provided for the ' + `\`HTTP_TRANSFER_CACHE_ORIGIN_MAP\` token: ${url}. The map should only contain origins ` + 'without any other segments.');
  }
}
const SHA256_ROUND_CONSTANTS = /* @__PURE__ */new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
let textEncoder;
function generateHash(value) {
  textEncoder ??= new TextEncoder();
  const inputBytes = textEncoder.encode(value);
  let hashState0 = 0x6a09e667;
  let hashState1 = 0xbb67ae85;
  let hashState2 = 0x3c6ef372;
  let hashState3 = 0xa54ff53a;
  let hashState4 = 0x510e527f;
  let hashState5 = 0x9b05688c;
  let hashState6 = 0x1f83d9ab;
  let hashState7 = 0x5be0cd19;
  const messageLengthInBits = inputBytes.length * 8;
  const paddedLengthInBytes = (inputBytes.length + 8 >> 6) + 1 << 6;
  const paddedBytes = new Uint8Array(paddedLengthInBytes);
  paddedBytes.set(inputBytes);
  paddedBytes[inputBytes.length] = 0x80;
  const paddedBytesView = new DataView(paddedBytes.buffer);
  const lowBits = messageLengthInBits >>> 0;
  const highBits = messageLengthInBits / 0x100000000 >>> 0;
  paddedBytesView.setUint32(paddedLengthInBytes - 8, highBits, false);
  paddedBytesView.setUint32(paddedLengthInBytes - 4, lowBits, false);
  const messageSchedule = new Uint32Array(64);
  for (let chunkOffset = 0; chunkOffset < paddedLengthInBytes; chunkOffset += 64) {
    for (let i = 0; i < 16; i++) {
      messageSchedule[i] = paddedBytesView.getUint32(chunkOffset + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const prevWord15 = messageSchedule[i - 15];
      const sigma0 = ((prevWord15 >>> 7 | prevWord15 << 25) ^ (prevWord15 >>> 18 | prevWord15 << 14) ^ prevWord15 >>> 3) >>> 0;
      const prevWord2 = messageSchedule[i - 2];
      const sigma1 = ((prevWord2 >>> 17 | prevWord2 << 15) ^ (prevWord2 >>> 19 | prevWord2 << 13) ^ prevWord2 >>> 10) >>> 0;
      messageSchedule[i] = messageSchedule[i - 16] + sigma0 + messageSchedule[i - 7] + sigma1 >>> 0;
    }
    let workingStateA = hashState0;
    let workingStateB = hashState1;
    let workingStateC = hashState2;
    let workingStateD = hashState3;
    let workingStateE = hashState4;
    let workingStateF = hashState5;
    let workingStateG = hashState6;
    let workingStateH = hashState7;
    for (let i = 0; i < 64; i++) {
      const capitalSigma1 = ((workingStateE >>> 6 | workingStateE << 26) ^ (workingStateE >>> 11 | workingStateE << 21) ^ (workingStateE >>> 25 | workingStateE << 7)) >>> 0;
      const chFunction = (workingStateE & workingStateF ^ ~workingStateE & workingStateG) >>> 0;
      const temp1 = workingStateH + capitalSigma1 + chFunction + SHA256_ROUND_CONSTANTS[i] + messageSchedule[i] >>> 0;
      const capitalSigma0 = ((workingStateA >>> 2 | workingStateA << 30) ^ (workingStateA >>> 13 | workingStateA << 19) ^ (workingStateA >>> 22 | workingStateA << 10)) >>> 0;
      const majFunction = (workingStateA & workingStateB ^ workingStateA & workingStateC ^ workingStateB & workingStateC) >>> 0;
      const temp2 = capitalSigma0 + majFunction >>> 0;
      workingStateH = workingStateG;
      workingStateG = workingStateF;
      workingStateF = workingStateE;
      workingStateE = workingStateD + temp1 >>> 0;
      workingStateD = workingStateC;
      workingStateC = workingStateB;
      workingStateB = workingStateA;
      workingStateA = temp1 + temp2 >>> 0;
    }
    hashState0 = hashState0 + workingStateA >>> 0;
    hashState1 = hashState1 + workingStateB >>> 0;
    hashState2 = hashState2 + workingStateC >>> 0;
    hashState3 = hashState3 + workingStateD >>> 0;
    hashState4 = hashState4 + workingStateE >>> 0;
    hashState5 = hashState5 + workingStateF >>> 0;
    hashState6 = hashState6 + workingStateG >>> 0;
    hashState7 = hashState7 + workingStateH >>> 0;
  }
  return [hashState0, hashState1, hashState2, hashState3, hashState4, hashState5, hashState6, hashState7].map(x => x.toString(16).padStart(8, '0')).join('');
}

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
    const cacheOptions = injector.get(CACHE_OPTIONS, null, {
      optional: true
    });
    const transferState = injector.get(TransferState, null, {
      optional: true
    });
    const originMap = injector.get(HTTP_TRANSFER_CACHE_ORIGIN_MAP, null, {
      optional: true
    });
    const getInitialStream = req => {
      if (cacheOptions && transferState && req) {
        const cachedResponse = retrieveStateFromCache(req, cacheOptions, transferState, originMap);
        if (cachedResponse) {
          try {
            const body = cachedResponse.body;
            const parsed = options?.parse ? options.parse(body) : body;
            return signal({
              value: parsed
            });
          } catch (e) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
              console.warn(`Angular detected an error while parsing the cached response for the httpResource at \`${req.url}\`. ` + `The resource will fall back to its default value and try again asynchronously.`, e);
            }
          }
        }
      }
      return undefined;
    };
    return new HttpResourceImpl(injector, ctx => normalizeRequest(ctx, request, responseType), options?.defaultValue, options?.debugName, options?.parse, options?.equal, getInitialStream);
  };
}
function normalizeRequest(ctx, request, responseType) {
  let unwrappedRequest = typeof request === 'function' ? request(ctx) : request;
  if (unwrappedRequest === undefined) {
    return undefined;
  } else if (typeof unwrappedRequest === 'string') {
    unwrappedRequest = {
      url: unwrappedRequest
    };
  }
  const headers = unwrappedRequest.headers instanceof HttpHeaders ? unwrappedRequest.headers : new HttpHeaders(unwrappedRequest.headers);
  const params = unwrappedRequest.params instanceof HttpParams ? unwrappedRequest.params : new HttpParams({
    fromObject: unwrappedRequest.params
  });
  return new HttpRequest(unwrappedRequest.method ?? 'GET', unwrappedRequest.url, unwrappedRequest.body ?? null, {
    headers,
    params,
    reportProgress: unwrappedRequest.reportProgress,
    withCredentials: unwrappedRequest.withCredentials,
    keepalive: unwrappedRequest.keepalive,
    cache: unwrappedRequest.cache,
    priority: unwrappedRequest.priority,
    mode: unwrappedRequest.mode,
    redirect: unwrappedRequest.redirect,
    responseType,
    context: unwrappedRequest.context,
    transferCache: unwrappedRequest.transferCache,
    credentials: unwrappedRequest.credentials,
    referrer: unwrappedRequest.referrer,
    referrerPolicy: unwrappedRequest.referrerPolicy,
    integrity: unwrappedRequest.integrity,
    timeout: unwrappedRequest.timeout
  });
}
class HttpResourceImpl extends _ResourceImpl {
  client;
  _headers = linkedSignal({
    ...(ngDevMode ? {
      debugName: "_headers"
    } : {}),
    source: this.extRequest,
    computation: () => undefined
  });
  _progress = linkedSignal({
    ...(ngDevMode ? {
      debugName: "_progress"
    } : {}),
    source: this.extRequest,
    computation: () => undefined
  });
  _statusCode = linkedSignal({
    ...(ngDevMode ? {
      debugName: "_statusCode"
    } : {}),
    source: this.extRequest,
    computation: () => undefined
  });
  headers = computed(() => this.status() === 'resolved' || this.status() === 'error' ? this._headers() : undefined, ...(ngDevMode ? [{
    debugName: "headers"
  }] : []));
  progress = this._progress.asReadonly();
  statusCode = this._statusCode.asReadonly();
  constructor(injector, request, defaultValue, debugName, parse, equal, getInitialStream) {
    super(request, ({
      params: request,
      abortSignal
    }) => {
      let sub;
      let aborted = false;
      const onAbort = () => {
        aborted = true;
        sub?.unsubscribe();
      };
      abortSignal.addEventListener('abort', onAbort);
      const stream = signal({
        value: undefined
      }, ...(ngDevMode ? [{
        debugName: "stream"
      }] : []));
      let resolve;
      const promise = new Promise(r => resolve = r);
      const send = value => {
        stream.set(value);
        resolve?.(stream);
        resolve = undefined;
      };
      sub = this.client.request(request).subscribe({
        next: event => {
          switch (event.type) {
            case HttpEventType.Response:
              this._headers.set(event.headers);
              this._statusCode.set(event.status);
              try {
                send({
                  value: parse ? parse(event.body) : event.body
                });
              } catch (error) {
                send({
                  error: _encapsulateResourceError(error)
                });
              }
              break;
            case HttpEventType.DownloadProgress:
              this._progress.set(event);
              break;
          }
        },
        error: error => {
          if (error instanceof HttpErrorResponse) {
            this._headers.set(error.headers);
            this._statusCode.set(error.status);
          }
          send({
            error
          });
          abortSignal.removeEventListener('abort', onAbort);
        },
        complete: () => {
          if (resolve) {
            send({
              error: new _RuntimeError(991, ngDevMode && 'Resource completed before producing a value')
            });
          }
          abortSignal.removeEventListener('abort', onAbort);
        }
      });
      if (aborted) {
        sub.unsubscribe();
      }
      return promise;
    }, defaultValue, equal, debugName, injector, undefined, getInitialStream);
    this.client = injector.get(HttpClient);
  }
  set(value) {
    super.set(value);
    this._headers.set(undefined);
    this._progress.set(undefined);
    this._statusCode.set(undefined);
  }
}

export { HTTP_TRANSFER_CACHE_ORIGIN_MAP, HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse, httpResource, HTTP_ROOT_INTERCEPTOR_FNS as ɵHTTP_ROOT_INTERCEPTOR_FNS, withHttpTransferCache as ɵwithHttpTransferCache };
//# sourceMappingURL=http.mjs.map
