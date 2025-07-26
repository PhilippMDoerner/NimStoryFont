/**
 * @license Angular v20.0.3
 * (c) 2010-2025 Google LLC. https://angular.io/
 * License: MIT
 */

import { Observable } from 'rxjs';
import { HttpRequest, HttpEvent, HttpHeaders, HttpContext, HttpParams, HttpResponse, HttpProgressEvent } from '../module.d-yNBsZ8gb.js';
export { HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule, HttpContextToken, HttpDownloadProgressEvent, HttpErrorResponse, HttpEventType, HttpHeaderResponse, HttpParameterCodec, HttpParamsOptions, HttpResponseBase, HttpSentEvent, HttpStatusCode, HttpUploadProgressEvent, HttpUrlEncodingCodec, HttpUserEvent } from '../module.d-yNBsZ8gb.js';
import * as i0 from '@angular/core';
import { InjectionToken, EnvironmentInjector, Provider, EnvironmentProviders, Injector, ValueEqualityFn, WritableResource, ResourceRef, Signal } from '@angular/core';
import { XhrFactory } from '../xhr.d-D_1kTQR5.js';

/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * @publicApi
 */
declare abstract class HttpHandler {
    abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * @publicApi
 */
declare abstract class HttpBackend implements HttpHandler {
    abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}

/**
 * Performs HTTP requests.
 * This service is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies based on
 * the signature that is called (mainly the values of `observe` and `responseType`).
 *
 * Note that the `responseType` *options* value is a String that identifies the
 * single data type of the response.
 * A single overload version of the method handles each response type.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 *
 * @usageNotes
 *
 * ### HTTP Request Example
 *
 * ```ts
 *  // GET heroes whose name contains search term
 * searchHeroes(term: string): observable<Hero[]>{
 *
 *  const params = new HttpParams({fromString: 'name=term'});
 *    return this.httpClient.request('GET', this.heroesUrl, {responseType:'json', params});
 * }
 * ```
 *
 * Alternatively, the parameter string can be used without invoking HttpParams
 * by directly joining to the URL.
 * ```ts
 * this.httpClient.request('GET', this.heroesUrl + '?' + 'name=term', {responseType:'json'});
 * ```
 *
 *
 * ### JSONP Example
 * ```ts
 * requestJsonp(url, callback = 'callback') {
 *  return this.httpClient.jsonp(this.heroesURL, callback);
 * }
 * ```
 *
 * ### PATCH Example
 * ```ts
 * // PATCH one of the heroes' name
 * patchHero (id: number, heroName: string): Observable<{}> {
 * const url = `${this.heroesUrl}/${id}`;   // PATCH api/heroes/42
 *  return this.httpClient.patch(url, {name: heroName}, httpOptions)
 *    .pipe(catchError(this.handleError('patchHero')));
 * }
 * ```
 *
 * @see [HTTP Guide](guide/http)
 * @see [HTTP Request](api/common/http/HttpRequest)
 *
 * @publicApi
 */
declare class HttpClient {
    private handler;
    constructor(handler: HttpHandler);
    /**
     * Sends an `HttpRequest` and returns a stream of `HttpEvent`s.
     *
     * @return An `Observable` of the response, with the response body as a stream of `HttpEvent`s.
     */
    request<R>(req: HttpRequest<any>): Observable<HttpEvent<R>>;
    /**
     * Constructs a request that interprets the body as an `ArrayBuffer` and returns the response in
     * an `ArrayBuffer`.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a request that interprets the body as a blob and returns
     * the response as a blob.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type `Blob`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Blob>;
    /**
     * Constructs a request that interprets the body as a text string and
     * returns a string value.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type string.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<string>;
    /**
     * Constructs a request that interprets the body as an `ArrayBuffer` and returns the
     * the full event stream.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body as an array of `HttpEvent`s for
     * the request.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        observe: 'events';
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a request that interprets the body as a `Blob` and returns
     * the full event stream.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body of type `Blob`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a request which interprets the body as a text string and returns the full event
     * stream.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body of type string.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a request which interprets the body as a JavaScript object and returns the full
     * event stream.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the  request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body of type `Object`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        reportProgress?: boolean;
        observe: 'events';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<any>>;
    /**
     * Constructs a request which interprets the body as a JavaScript object and returns the full
     * event stream.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body of type `R`.
     */
    request<R>(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        reportProgress?: boolean;
        observe: 'events';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<R>>;
    /**
     * Constructs a request which interprets the body as an `ArrayBuffer`
     * and returns the full `HttpResponse`.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body as an `ArrayBuffer`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a request which interprets the body as a `Blob` and returns the full `HttpResponse`.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body of type `Blob`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a request which interprets the body as a text stream and returns the full
     * `HttpResponse`.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the HTTP response, with the response body of type string.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a request which interprets the body as a JavaScript object and returns the full
     * `HttpResponse`.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the full `HttpResponse`,
     * with the response body of type `Object`.
     */
    request(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a request which interprets the body as a JavaScript object and returns
     * the full `HttpResponse` with the response body in the requested type.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return  An `Observable` of the full `HttpResponse`, with the response body of type `R`.
     */
    request<R>(method: string, url: string, options: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        reportProgress?: boolean;
        observe: 'response';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<R>>;
    /**
     * Constructs a request which interprets the body as a JavaScript object and returns the full
     * `HttpResponse` as a JavaScript object.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body of type `Object`.
     */
    request(method: string, url: string, options?: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        responseType?: 'json';
        reportProgress?: boolean;
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Object>;
    /**
     * Constructs a request which interprets the body as a JavaScript object
     * with the response body of the requested type.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body of type `R`.
     */
    request<R>(method: string, url: string, options?: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        responseType?: 'json';
        reportProgress?: boolean;
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<R>;
    /**
     * Constructs a request where response type and requested observable are not known statically.
     *
     * @param method  The HTTP method.
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the requested response, with body of type `any`.
     */
    request(method: string, url: string, options?: {
        body?: any;
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        observe?: 'body' | 'events' | 'response';
        reportProgress?: boolean;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<any>;
    /**
     * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
     *  and returns the response as an `ArrayBuffer`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return  An `Observable` of the response body as an `ArrayBuffer`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a `DELETE` request that interprets the body as a `Blob` and returns
     * the response as a `Blob`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response body as a `Blob`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<Blob>;
    /**
     * Constructs a `DELETE` request that interprets the body as a text string and returns
     * a string.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type string.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<string>;
    /**
     * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer`
     *  and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with response body as an `ArrayBuffer`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a `DELETE` request that interprets the body as a `Blob`
     *  and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request, with the response body as a
     * `Blob`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a `DELETE` request that interprets the body as a text string
     * and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with the response
     * body of type string.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a `DELETE` request that interprets the body as JSON
     * and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with response body of
     * type `Object`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs a `DELETE`request that interprets the body as JSON
     * and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request, with a response
     * body in the requested type.
     */
    delete<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | (string | number | boolean)[]>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs a `DELETE` request that interprets the body as an `ArrayBuffer` and returns
     *  the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the full `HttpResponse`, with the response body as an `ArrayBuffer`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a `DELETE` request that interprets the body as a `Blob` and returns the full
     * `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body of type `Blob`.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a `DELETE` request that interprets the body as a text stream and
     *  returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the full `HttpResponse`, with the response body of type string.
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a `DELETE` request the interprets the body as a JavaScript object and returns
     * the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body of type `Object`.
     *
     */
    delete(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a `DELETE` request that interprets the body as JSON
     * and returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with the response body of the requested type.
     */
    delete<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<HttpResponse<T>>;
    /**
     * Constructs a `DELETE` request that interprets the body as JSON and
     * returns the response body as an object parsed from JSON.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type `Object`.
     */
    delete(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<Object>;
    /**
     * Constructs a DELETE request that interprets the body as JSON and returns
     * the response in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with response body in the requested type.
     */
    delete<T>(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        body?: any | null;
    }): Observable<T>;
    /**
     * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns the
     * response in an `ArrayBuffer`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a `GET` request that interprets the body as a `Blob`
     * and returns the response as a `Blob`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body as a `Blob`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Blob>;
    /**
     * Constructs a `GET` request that interprets the body as a text string
     * and returns the response as a string value.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type string.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<string>;
    /**
     * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and returns
     *  the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with the response
     * body as an `ArrayBuffer`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a `GET` request that interprets the body as a `Blob` and
     * returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body as a `Blob`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a `GET` request that interprets the body as a text string and returns
     * the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type string.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a `GET` request that interprets the body as JSON
     * and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type `Object`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns the full
     * event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with a response body in the requested type.
     */
    get<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs a `GET` request that interprets the body as an `ArrayBuffer` and
     * returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as an `ArrayBuffer`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a `GET` request that interprets the body as a `Blob` and
     * returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as a `Blob`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a `GET` request that interprets the body as a text stream and
     * returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body of type string.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a `GET` request that interprets the body as JSON and
     * returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the full `HttpResponse`,
     * with the response body of type `Object`.
     */
    get(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a `GET` request that interprets the body as JSON and
     * returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the full `HttpResponse` for the request,
     * with a response body in the requested type.
     */
    get<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<T>>;
    /**
     * Constructs a `GET` request that interprets the body as JSON and
     * returns the response body as an object parsed from JSON.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     *
     * @return An `Observable` of the response body as a JavaScript object.
     */
    get(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Object>;
    /**
     * Constructs a `GET` request that interprets the body as JSON and returns
     * the response body in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body in the requested type.
     */
    get<T>(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<T>;
    /**
     * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer` and
     * returns the response as an `ArrayBuffer`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
     * the response as a `Blob`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return  An `Observable` of the response, with the response body as a `Blob`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Blob>;
    /**
     * Constructs a `HEAD` request that interprets the body as a text string and returns the response
     * as a string value.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body of type string.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<string>;
    /**
     * Constructs a `HEAD` request that interprets the body as an  `ArrayBuffer`
     *  and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body as an `ArrayBuffer`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a `HEAD` request that interprets the body as a `Blob` and
     * returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body as a `Blob`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a `HEAD` request that interprets the body as a text string
     * and returns the full event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with the response body of type
     * string.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a `HEAD` request that interprets the body as JSON
     * and returns the full HTTP event stream.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with a response body of
     * type `Object`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs a `HEAD` request that interprets the body as JSON and
     * returns the full event stream.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request,
     * with a response body in the requested type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     */
    head<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs a `HEAD` request that interprets the body as an `ArrayBuffer`
     *  and returns the full HTTP response.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as an `ArrayBuffer`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a `HEAD` request that interprets the body as a `Blob` and returns
     * the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as a blob.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a `HEAD` request that interprets the body as text stream
     * and returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body of type string.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a `HEAD` request that interprets the body as JSON and
     * returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body of type `Object`.
     */
    head(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a `HEAD` request that interprets the body as JSON
     * and returns the full `HttpResponse`.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with a response body of the requested type.
     */
    head<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<T>>;
    /**
  
     * Constructs a `HEAD` request that interprets the body as JSON and
     * returns the response body as an object parsed from JSON.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response, with the response body as an object parsed from JSON.
     */
    head(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Object>;
    /**
     * Constructs a `HEAD` request that interprets the body as JSON and returns
     * the response in a given type.
     *
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with a response body of the given type.
     */
    head<T>(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<T>;
    /**
     * Constructs a `JSONP` request for the given URL and name of the callback parameter.
     *
     * @param url The resource URL.
     * @param callbackParam The callback function name.
     *
     * @return An `Observable` of the response object, with response body as an object.
     */
    jsonp(url: string, callbackParam: string): Observable<Object>;
    /**
     * Constructs a `JSONP` request for the given URL and name of the callback parameter.
     *
     * @param url The resource URL.
     * @param callbackParam The callback function name.
     *
     * You must install a suitable interceptor, such as one provided by `HttpClientJsonpModule`.
     * If no such interceptor is reached,
     * then the `JSONP` request can be rejected by the configured backend.
     *
     * @return An `Observable` of the response object, with response body in the requested type.
     */
    jsonp<T>(url: string, callbackParam: string): Observable<T>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as an
     * `ArrayBuffer` and returns the response as an `ArrayBuffer`.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as a `Blob` and returns
     * the response as a `Blob`.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as a `Blob`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<Blob>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as a text string and
     * returns a string value.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body of type string.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<string>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
     *  and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return  An `Observable` of all `HttpEvent`s for the request,
     * with the response body as an `ArrayBuffer`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as a `Blob` and
     * returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body as a `Blob`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as a text string
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request,
     * with the response body of type string.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as JSON
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request with the response
     * body of type `Object`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as JSON and
     * returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request,
     * with a response body in the requested type.
     */
    options<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as an `ArrayBuffer`
     *  and returns the full HTTP response.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as an `ArrayBuffer`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as a `Blob`
     *  and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as a `Blob`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as text stream
     * and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body of type string.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as JSON
     * and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body of type `Object`.
     */
    options(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as JSON and
     * returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with a response body in the requested type.
     */
    options<T>(url: string, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<T>>;
    /**
  
     * Constructs an `OPTIONS` request that interprets the body as JSON and returns the
     * response body as an object parsed from JSON.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as an object parsed from JSON.
     */
    options(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<Object>;
    /**
     * Constructs an `OPTIONS` request that interprets the body as JSON and returns the
     * response in a given type.
     *
     * @param url The endpoint URL.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse`, with a response body of the given type.
     */
    options<T>(url: string, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<T>;
    /**
     * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and returns
     * the response as an `ArrayBuffer`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the response
     * as a `Blob`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as a `Blob`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<Blob>;
    /**
     * Constructs a `PATCH` request that interprets the body as a text string and
     * returns the response as a string value.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with a response body of type string.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<string>;
    /**
     * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer` and
     *  returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request,
     * with the response body as an `ArrayBuffer`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a `PATCH` request that interprets the body as a `Blob`
     *  and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request, with the
     * response body as `Blob`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a `PATCH` request that interprets the body as a text string and
     * returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request, with a
     * response body of type string.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a `PATCH` request that interprets the body as JSON
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request,
     * with a response body of type `Object`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs a `PATCH` request that interprets the body as JSON
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of all the `HttpEvent`s for the request,
     * with a response body in the requested type.
     */
    patch<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs a `PATCH` request that interprets the body as an `ArrayBuffer`
     *  and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return  An `Observable` of the `HttpResponse` for the request,
     * with the response body as an `ArrayBuffer`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a `PATCH` request that interprets the body as a `Blob` and returns the full
     * `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return  An `Observable` of the `HttpResponse` for the request,
     * with the response body as a `Blob`.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a `PATCH` request that interprets the body as a text stream and returns the
     * full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return  An `Observable` of the `HttpResponse` for the request,
     * with a response body of type string.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a `PATCH` request that interprets the body as JSON
     * and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with a response body in the requested type.
     */
    patch(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a `PATCH` request that interprets the body as JSON
     * and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with a response body in the given type.
     */
    patch<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<T>>;
    /**
  
     * Constructs a `PATCH` request that interprets the body as JSON and
     * returns the response body as an object parsed from JSON.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as an object parsed from JSON.
     */
    patch(url: string, body: any | null, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<Object>;
    /**
     * Constructs a `PATCH` request that interprets the body as JSON
     * and returns the response in a given type.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options HTTP options.
     *
     * @return  An `Observable` of the `HttpResponse` for the request,
     * with a response body in the given type.
     */
    patch<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<T>;
    /**
     * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and returns
     * an `ArrayBuffer`.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options.
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a `POST` request that interprets the body as a `Blob` and returns the
     * response as a `Blob`.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of the response, with the response body as a `Blob`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Blob>;
    /**
     * Constructs a `POST` request that interprets the body as a text string and
     * returns the response as a string value.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of the response, with a response body of type string.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<string>;
    /**
     * Constructs a `POST` request that interprets the body as an `ArrayBuffer` and
     * returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body as an `ArrayBuffer`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a `POST` request that interprets the body as a `Blob`
     * and returns the response in an observable of the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with the response body as `Blob`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a `POST` request that interprets the body as a text string and returns the full
     * event stream.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return  An `Observable` of all `HttpEvent`s for the request,
     * with a response body of type string.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a POST request that interprets the body as JSON and returns the full
     * event stream.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return  An `Observable` of all `HttpEvent`s for the request,
     * with a response body of type `Object`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs a POST request that interprets the body as JSON and returns the full
     * event stream.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with a response body in the requested type.
     */
    post<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs a POST request that interprets the body as an `ArrayBuffer`
     *  and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return  An `Observable` of the `HttpResponse` for the request, with the response body as an
     * `ArrayBuffer`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a `POST` request that interprets the body as a `Blob` and returns the full
     * `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as a `Blob`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a `POST` request that interprets the body as a text stream and returns
     * the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return  An `Observable` of the `HttpResponse` for the request,
     * with a response body of type string.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a `POST` request that interprets the body as JSON
     * and returns the full `HttpResponse`.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request, with a response body of type
     * `Object`.
     */
    post(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a `POST` request that interprets the body as JSON and returns the
     * full `HttpResponse`.
     *
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request, with a response body in the
     * requested type.
     */
    post<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<HttpResponse<T>>;
    /**
     * Constructs a `POST` request that interprets the body as JSON
     * and returns the response body as an object parsed from JSON.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return An `Observable` of the response, with the response body as an object parsed from JSON.
     */
    post(url: string, body: any | null, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<Object>;
    /**
     * Constructs a `POST` request that interprets the body as JSON
     * and returns an observable of the response.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options HTTP options
     *
     * @return  An `Observable` of the `HttpResponse` for the request, with a response body in the
     * requested type.
     */
    post<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
        transferCache?: {
            includeHeaders?: string[];
        } | boolean;
    }): Observable<T>;
    /**
     * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and returns the
     * response as an `ArrayBuffer`.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the response, with the response body as an `ArrayBuffer`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<ArrayBuffer>;
    /**
     * Constructs a `PUT` request that interprets the body as a `Blob` and returns
     * the response as a `Blob`.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the response, with the response body as a `Blob`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<Blob>;
    /**
     * Constructs a `PUT` request that interprets the body as a text string and
     * returns the response as a string value.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the response, with a response body of type string.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<string>;
    /**
     * Constructs a `PUT` request that interprets the body as an `ArrayBuffer` and
     * returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body as an `ArrayBuffer`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<ArrayBuffer>>;
    /**
     * Constructs a `PUT` request that interprets the body as a `Blob` and returns the full event
     * stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with the response body as a `Blob`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<Blob>>;
    /**
     * Constructs a `PUT` request that interprets the body as a text string and returns the full event
     * stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with a response body
     * of type string.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<string>>;
    /**
     * Constructs a `PUT` request that interprets the body as JSON and returns the full
     * event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request, with a response body of
     * type `Object`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<Object>>;
    /**
     * Constructs a `PUT` request that interprets the body as JSON and returns the
     * full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of all `HttpEvent`s for the request,
     * with a response body in the requested type.
     */
    put<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'events';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpEvent<T>>;
    /**
     * Constructs a `PUT` request that interprets the body as an
     * `ArrayBuffer` and returns an observable of the full HTTP response.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request, with the response body as an
     * `ArrayBuffer`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'arraybuffer';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<ArrayBuffer>>;
    /**
     * Constructs a `PUT` request that interprets the body as a `Blob` and returns the
     * full HTTP response.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with the response body as a `Blob`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'blob';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Blob>>;
    /**
     * Constructs a `PUT` request that interprets the body as a text stream and returns the
     * full HTTP response.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request, with a response body of type
     * string.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType: 'text';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<string>>;
    /**
     * Constructs a `PUT` request that interprets the body as JSON and returns the full
     * HTTP response.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request, with a response body
     * of type 'Object`.
     */
    put(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<Object>>;
    /**
     * Constructs a `PUT` request that interprets the body as an instance of the requested type and
     * returns the full HTTP response.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the `HttpResponse` for the request,
     * with a response body in the requested type.
     */
    put<T>(url: string, body: any | null, options: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        observe: 'response';
        context?: HttpContext;
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<HttpResponse<T>>;
    /**
     * Constructs a `PUT` request that interprets the body as JSON
     * and returns an observable of JavaScript object.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the response as a JavaScript object.
     */
    put(url: string, body: any | null, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<Object>;
    /**
     * Constructs a `PUT` request that interprets the body as an instance of the requested type
     * and returns an observable of the requested type.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options HTTP options
     *
     * @return An `Observable` of the requested type.
     */
    put<T>(url: string, body: any | null, options?: {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        keepalive?: boolean;
    }): Observable<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpClient, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpClient>;
}

/**
 * Uses `fetch` to send requests to a backend server.
 *
 * This `FetchBackend` requires the support of the
 * [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) which is available on all
 * supported browsers and on Node.js v18 or later.
 *
 * @see {@link HttpHandler}
 *
 * @publicApi
 */
declare class FetchBackend implements HttpBackend {
    private readonly fetchImpl;
    private readonly ngZone;
    private readonly destroyRef;
    private destroyed;
    constructor();
    handle(request: HttpRequest<any>): Observable<HttpEvent<any>>;
    private doRequest;
    private parseBody;
    private createRequestInit;
    private concatChunks;
    static ɵfac: i0.ɵɵFactoryDeclaration<FetchBackend, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FetchBackend>;
}

/**
 * Intercepts and handles an `HttpRequest` or `HttpResponse`.
 *
 * Most interceptors transform the outgoing request before passing it to the
 * next interceptor in the chain, by calling `next.handle(transformedReq)`.
 * An interceptor may transform the
 * response event stream as well, by applying additional RxJS operators on the stream
 * returned by `next.handle()`.
 *
 * More rarely, an interceptor may handle the request entirely,
 * and compose a new event stream instead of invoking `next.handle()`. This is an
 * acceptable behavior, but keep in mind that further interceptors will be skipped entirely.
 *
 * It is also rare but valid for an interceptor to return multiple responses on the
 * event stream for a single request.
 *
 * @publicApi
 *
 * @see [HTTP Guide](guide/http/interceptors)
 * @see {@link HttpInterceptorFn}
 *
 * @usageNotes
 *
 * To use the same instance of `HttpInterceptors` for the entire app, import the `HttpClientModule`
 * only in your `AppModule`, and add the interceptors to the root application injector.
 * If you import `HttpClientModule` multiple times across different modules (for example, in lazy
 * loading modules), each import creates a new copy of the `HttpClientModule`, which overwrites the
 * interceptors provided in the root module.
 */
interface HttpInterceptor {
    /**
     * Identifies and handles a given HTTP request.
     * @param req The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend
     * if no interceptors remain in the chain.
     * @returns An observable of the event stream.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
/**
 * Represents the next interceptor in an interceptor chain, or the real backend if there are no
 * further interceptors.
 *
 * Most interceptors will delegate to this function, and either modify the outgoing request or the
 * response when it arrives. Within the scope of the current request, however, this function may be
 * called any number of times, for any number of downstream requests. Such downstream requests need
 * not be to the same URL or even the same origin as the current request. It is also valid to not
 * call the downstream handler at all, and process the current request entirely within the
 * interceptor.
 *
 * This function should only be called within the scope of the request that's currently being
 * intercepted. Once that request is complete, this downstream handler function should not be
 * called.
 *
 * @publicApi
 *
 * @see [HTTP Guide](guide/http/interceptors)
 */
type HttpHandlerFn = (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>;
/**
 * An interceptor for HTTP requests made via `HttpClient`.
 *
 * `HttpInterceptorFn`s are middleware functions which `HttpClient` calls when a request is made.
 * These functions have the opportunity to modify the outgoing request or any response that comes
 * back, as well as block, redirect, or otherwise change the request or response semantics.
 *
 * An `HttpHandlerFn` representing the next interceptor (or the backend which will make a real HTTP
 * request) is provided. Most interceptors will delegate to this function, but that is not required
 * (see `HttpHandlerFn` for more details).
 *
 * `HttpInterceptorFn`s are executed in an [injection context](guide/di/dependency-injection-context).
 * They have access to `inject()` via the `EnvironmentInjector` from which they were configured.
 *
 * @see [HTTP Guide](guide/http/interceptors)
 * @see {@link withInterceptors}
 *
 * @usageNotes
 * Here is a noop interceptor that passes the request through without modifying it:
 * ```ts
 * export const noopInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
 * HttpHandlerFn) => {
 *   return next(modifiedReq);
 * };
 * ```
 *
 * If you want to alter a request, clone it first and modify the clone before passing it to the
 * `next()` handler function.
 *
 * Here is a basic interceptor that adds a bearer token to the headers
 * ```ts
 * export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
 * HttpHandlerFn) => {
 *    const userToken = 'MY_TOKEN'; const modifiedReq = req.clone({
 *      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
 *    });
 *
 *    return next(modifiedReq);
 * };
 * ```
 */
type HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => Observable<HttpEvent<unknown>>;
/**
 * A multi-provider token that represents the array of registered
 * `HttpInterceptor` objects.
 *
 * @publicApi
 */
declare const HTTP_INTERCEPTORS: InjectionToken<readonly HttpInterceptor[]>;
/**
 * A multi-provided token of `HttpInterceptorFn`s that are only set in root.
 */
declare const HTTP_ROOT_INTERCEPTOR_FNS: InjectionToken<readonly HttpInterceptorFn[]>;
declare const REQUESTS_CONTRIBUTE_TO_STABILITY: InjectionToken<boolean>;
declare class HttpInterceptorHandler extends HttpHandler {
    private backend;
    private injector;
    private chain;
    private readonly pendingTasks;
    private readonly contributeToStability;
    constructor(backend: HttpBackend, injector: EnvironmentInjector);
    handle(initialRequest: HttpRequest<any>): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpInterceptorHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpInterceptorHandler>;
}

/**
 * DI token/abstract type representing a map of JSONP callbacks.
 *
 * In the browser, this should always be the `window` object.
 *
 *
 */
declare abstract class JsonpCallbackContext {
    [key: string]: (data: any) => void;
}
/**
 * Processes an `HttpRequest` with the JSONP method,
 * by performing JSONP style requests.
 * @see {@link HttpHandler}
 * @see {@link HttpXhrBackend}
 *
 * @publicApi
 */
declare class JsonpClientBackend implements HttpBackend {
    private callbackMap;
    private document;
    /**
     * A resolved promise that can be used to schedule microtasks in the event handlers.
     */
    private readonly resolvedPromise;
    constructor(callbackMap: JsonpCallbackContext, document: any);
    /**
     * Get the name of the next callback method, by incrementing the global `nextRequestId`.
     */
    private nextCallback;
    /**
     * Processes a JSONP request and returns an event stream of the results.
     * @param req The request object.
     * @returns An observable of the response events.
     *
     */
    handle(req: HttpRequest<never>): Observable<HttpEvent<any>>;
    private removeListeners;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonpClientBackend, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JsonpClientBackend>;
}
/**
 * Identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * @see {@link HttpInterceptor}
 *
 * @publicApi
 */
declare class JsonpInterceptor {
    private injector;
    constructor(injector: EnvironmentInjector);
    /**
     * Identifies and handles a given JSONP request.
     * @param initialRequest The outgoing request object to handle.
     * @param next The next interceptor in the chain, or the backend
     * if no interceptors remain in the chain.
     * @returns An observable of the event stream.
     */
    intercept(initialRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonpInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JsonpInterceptor>;
}

/**
 * Identifies a particular kind of `HttpFeature`.
 *
 * @publicApi
 */
declare enum HttpFeatureKind {
    Interceptors = 0,
    LegacyInterceptors = 1,
    CustomXsrfConfiguration = 2,
    NoXsrfProtection = 3,
    JsonpSupport = 4,
    RequestsMadeViaParent = 5,
    Fetch = 6
}
/**
 * A feature for use when configuring `provideHttpClient`.
 *
 * @publicApi
 */
interface HttpFeature<KindT extends HttpFeatureKind> {
    ɵkind: KindT;
    ɵproviders: Provider[];
}
/**
 * Configures Angular's `HttpClient` service to be available for injection.
 *
 * By default, `HttpClient` will be configured for injection with its default options for XSRF
 * protection of outgoing requests. Additional configuration options can be provided by passing
 * feature functions to `provideHttpClient`. For example, HTTP interceptors can be added using the
 * `withInterceptors(...)` feature.
 *
 * <div class="docs-alert docs-alert-helpful">
 *
 * It's strongly recommended to enable
 * [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for applications that use
 * Server-Side Rendering for better performance and compatibility. To enable `fetch`, add
 * `withFetch()` feature to the `provideHttpClient()` call at the root of the application:
 *
 * ```ts
 * provideHttpClient(withFetch());
 * ```
 *
 * </div>
 *
 * @see {@link withInterceptors}
 * @see {@link withInterceptorsFromDi}
 * @see {@link withXsrfConfiguration}
 * @see {@link withNoXsrfProtection}
 * @see {@link withJsonpSupport}
 * @see {@link withRequestsMadeViaParent}
 * @see {@link withFetch}
 */
declare function provideHttpClient(...features: HttpFeature<HttpFeatureKind>[]): EnvironmentProviders;
/**
 * Adds one or more functional-style HTTP interceptors to the configuration of the `HttpClient`
 * instance.
 *
 * @see {@link HttpInterceptorFn}
 * @see {@link provideHttpClient}
 * @publicApi
 */
declare function withInterceptors(interceptorFns: HttpInterceptorFn[]): HttpFeature<HttpFeatureKind.Interceptors>;
/**
 * Includes class-based interceptors configured using a multi-provider in the current injector into
 * the configured `HttpClient` instance.
 *
 * Prefer `withInterceptors` and functional interceptors instead, as support for DI-provided
 * interceptors may be phased out in a later release.
 *
 * @see {@link HttpInterceptor}
 * @see {@link HTTP_INTERCEPTORS}
 * @see {@link provideHttpClient}
 */
declare function withInterceptorsFromDi(): HttpFeature<HttpFeatureKind.LegacyInterceptors>;
/**
 * Customizes the XSRF protection for the configuration of the current `HttpClient` instance.
 *
 * This feature is incompatible with the `withNoXsrfProtection` feature.
 *
 * @see {@link provideHttpClient}
 */
declare function withXsrfConfiguration({ cookieName, headerName, }: {
    cookieName?: string;
    headerName?: string;
}): HttpFeature<HttpFeatureKind.CustomXsrfConfiguration>;
/**
 * Disables XSRF protection in the configuration of the current `HttpClient` instance.
 *
 * This feature is incompatible with the `withXsrfConfiguration` feature.
 *
 * @see {@link provideHttpClient}
 */
declare function withNoXsrfProtection(): HttpFeature<HttpFeatureKind.NoXsrfProtection>;
/**
 * Add JSONP support to the configuration of the current `HttpClient` instance.
 *
 * @see {@link provideHttpClient}
 */
declare function withJsonpSupport(): HttpFeature<HttpFeatureKind.JsonpSupport>;
/**
 * Configures the current `HttpClient` instance to make requests via the parent injector's
 * `HttpClient` instead of directly.
 *
 * By default, `provideHttpClient` configures `HttpClient` in its injector to be an independent
 * instance. For example, even if `HttpClient` is configured in the parent injector with
 * one or more interceptors, they will not intercept requests made via this instance.
 *
 * With this option enabled, once the request has passed through the current injector's
 * interceptors, it will be delegated to the parent injector's `HttpClient` chain instead of
 * dispatched directly, and interceptors in the parent configuration will be applied to the request.
 *
 * If there are several `HttpClient` instances in the injector hierarchy, it's possible for
 * `withRequestsMadeViaParent` to be used at multiple levels, which will cause the request to
 * "bubble up" until either reaching the root level or an `HttpClient` which was not configured with
 * this option.
 *
 * @see {@link provideHttpClient}
 * @publicApi 19.0
 */
declare function withRequestsMadeViaParent(): HttpFeature<HttpFeatureKind.RequestsMadeViaParent>;
/**
 * Configures the current `HttpClient` instance to make requests using the fetch API.
 *
 * Note: The Fetch API doesn't support progress report on uploads.
 *
 * @publicApi
 */
declare function withFetch(): HttpFeature<HttpFeatureKind.Fetch>;

/**
 * The structure of an `httpResource` request which will be sent to the backend.
 *
 * @experimental 19.2
 */
interface HttpResourceRequest {
    /**
     * URL of the request.
     *
     * This URL should not include query parameters. Instead, specify query parameters through the
     * `params` field.
     */
    url: string;
    /**
     * HTTP method of the request, which defaults to GET if not specified.
     */
    method?: string;
    /**
     * Body to send with the request, if there is one.
     *
     * If no Content-Type header is specified by the user, Angular will attempt to set one based on
     * the type of `body`.
     */
    body?: unknown;
    /**
     * Dictionary of query parameters which will be appeneded to the request URL.
     */
    params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>;
    /**
     * Dictionary of headers to include with the outgoing request.
     */
    headers?: HttpHeaders | Record<string, string | ReadonlyArray<string>>;
    /**
     * Context of the request stored in a dictionary of key-value pairs.
     */
    context?: HttpContext;
    /**
     * If `true`, progress events will be enabled for the request and delivered through the
     * `HttpResource.progress` signal.
     */
    reportProgress?: boolean;
    /**
     * Specifies whether the `withCredentials` flag should be set on the outgoing request.
     *
     * This flag causes the browser to send cookies and other authentication information along with
     * the request.
     */
    withCredentials?: boolean;
    /**
     * Configures the server-side rendering transfer cache for this request.
     *
     * See the documentation on the transfer cache for more information.
     */
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}
/**
 * Options for creating an `httpResource`.
 *
 * @experimental 19.2
 */
interface HttpResourceOptions<TResult, TRaw> {
    /**
     * Transform the result of the HTTP request before it's delivered to the resource.
     *
     * `parse` receives the value from the HTTP layer as its raw type (e.g. as `unknown` for JSON data).
     * It can be used to validate or transform the type of the resource, and return a more specific
     * type. This is also useful for validating backend responses using a runtime schema validation
     * library such as Zod.
     */
    parse?: (value: TRaw) => TResult;
    /**
     * Value that the resource will take when in Idle or Loading states.
     *
     * If not set, the resource will use `undefined` as its default value.
     */
    defaultValue?: NoInfer<TResult>;
    /**
     * The `Injector` in which to create the `httpResource`.
     *
     * If this is not provided, the current [injection context](guide/di/dependency-injection-context)
     * will be used instead (via `inject`).
     */
    injector?: Injector;
    /**
     * A comparison function which defines equality for the response value.
     */
    equal?: ValueEqualityFn<NoInfer<TResult>>;
}
/**
 * A `WritableResource` that represents the results of a reactive HTTP request.
 *
 * `HttpResource`s are backed by `HttpClient`, including support for interceptors, testing, and the
 * other features of the `HttpClient` API.
 *
 * @experimental 19.2
 */
interface HttpResourceRef<T> extends WritableResource<T>, ResourceRef<T> {
    /**
     * Signal of the response headers, when available.
     */
    readonly headers: Signal<HttpHeaders | undefined>;
    /**
     * Signal of the response status code, when available.
     */
    readonly statusCode: Signal<number | undefined>;
    /**
     * Signal of the latest progress update, if the request was made with `reportProgress: true`.
     */
    readonly progress: Signal<HttpProgressEvent | undefined>;
    hasValue(): this is HttpResourceRef<Exclude<T, undefined>>;
    destroy(): void;
}

/**
 * Type for the `httpRequest` top-level function, which includes the call signatures for the JSON-
 * based `httpRequest` as well as sub-functions for `ArrayBuffer`, `Blob`, and `string` type
 * requests.
 *
 * @experimental 19.2
 */
interface HttpResourceFn {
    /**
     * Create a `Resource` that fetches data with an HTTP GET request to the given URL.
     *
     * The resource will update when the URL changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed as JSON by default - use a sub-function of
     * `httpResource`, such as `httpResource.text()`, to parse the response differently.
     *
     * @experimental 19.2
     */
    <TResult = unknown>(url: () => string | undefined, options: HttpResourceOptions<TResult, unknown> & {
        defaultValue: NoInfer<TResult>;
    }): HttpResourceRef<TResult>;
    /**
     * Create a `Resource` that fetches data with an HTTP GET request to the given URL.
     *
     * The resource will update when the URL changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed as JSON by default - use a sub-function of
     * `httpResource`, such as `httpResource.text()`, to parse the response differently.
     *
     * @experimental 19.2
     */
    <TResult = unknown>(url: () => string | undefined, options?: HttpResourceOptions<TResult, unknown>): HttpResourceRef<TResult | undefined>;
    /**
     * Create a `Resource` that fetches data with the configured HTTP request.
     *
     * The resource will update when the request changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed as JSON by default - use a sub-function of
     * `httpResource`, such as `httpResource.text()`, to parse the response differently.
     *
     * @experimental 19.2
     */
    <TResult = unknown>(request: () => HttpResourceRequest | undefined, options: HttpResourceOptions<TResult, unknown> & {
        defaultValue: NoInfer<TResult>;
    }): HttpResourceRef<TResult>;
    /**
     * Create a `Resource` that fetches data with the configured HTTP request.
     *
     * The resource will update when the request changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed as JSON by default - use a sub-function of
     * `httpResource`, such as `httpResource.text()`, to parse the response differently.
     *
     * @experimental 19.2
     */
    <TResult = unknown>(request: () => HttpResourceRequest | undefined, options?: HttpResourceOptions<TResult, unknown>): HttpResourceRef<TResult | undefined>;
    /**
     * Create a `Resource` that fetches data with the configured HTTP request.
     *
     * The resource will update when the URL or request changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed into an `ArrayBuffer`.
     *
     * @experimental 19.2
     */
    arrayBuffer: {
        <TResult = ArrayBuffer>(url: () => string | undefined, options: HttpResourceOptions<TResult, ArrayBuffer> & {
            defaultValue: NoInfer<TResult>;
        }): HttpResourceRef<TResult>;
        <TResult = ArrayBuffer>(url: () => string | undefined, options?: HttpResourceOptions<TResult, ArrayBuffer>): HttpResourceRef<TResult | undefined>;
        <TResult = ArrayBuffer>(request: () => HttpResourceRequest | undefined, options: HttpResourceOptions<TResult, ArrayBuffer> & {
            defaultValue: NoInfer<TResult>;
        }): HttpResourceRef<TResult>;
        <TResult = ArrayBuffer>(request: () => HttpResourceRequest | undefined, options?: HttpResourceOptions<TResult, ArrayBuffer>): HttpResourceRef<TResult | undefined>;
    };
    /**
     * Create a `Resource` that fetches data with the configured HTTP request.
     *
     * The resource will update when the URL or request changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed into a `Blob`.
     *
     * @experimental 19.2
     */
    blob: {
        <TResult = Blob>(url: () => string | undefined, options: HttpResourceOptions<TResult, Blob> & {
            defaultValue: NoInfer<TResult>;
        }): HttpResourceRef<TResult>;
        <TResult = Blob>(url: () => string | undefined, options?: HttpResourceOptions<TResult, Blob>): HttpResourceRef<TResult | undefined>;
        <TResult = Blob>(request: () => HttpResourceRequest | undefined, options: HttpResourceOptions<TResult, Blob> & {
            defaultValue: NoInfer<TResult>;
        }): HttpResourceRef<TResult>;
        <TResult = Blob>(request: () => HttpResourceRequest | undefined, options?: HttpResourceOptions<TResult, Blob>): HttpResourceRef<TResult | undefined>;
    };
    /**
     * Create a `Resource` that fetches data with the configured HTTP request.
     *
     * The resource will update when the URL or request changes via signals.
     *
     * Uses `HttpClient` to make requests and supports interceptors, testing, and the other features
     * of the `HttpClient` API. Data is parsed as a `string`.
     *
     * @experimental 19.2
     */
    text: {
        <TResult = string>(url: () => string | undefined, options: HttpResourceOptions<TResult, string> & {
            defaultValue: NoInfer<TResult>;
        }): HttpResourceRef<TResult>;
        <TResult = string>(url: () => string | undefined, options?: HttpResourceOptions<TResult, string>): HttpResourceRef<TResult | undefined>;
        <TResult = string>(request: () => HttpResourceRequest | undefined, options: HttpResourceOptions<TResult, string> & {
            defaultValue: NoInfer<TResult>;
        }): HttpResourceRef<TResult>;
        <TResult = string>(request: () => HttpResourceRequest | undefined, options?: HttpResourceOptions<TResult, string>): HttpResourceRef<TResult | undefined>;
    };
}
/**
 * `httpResource` makes a reactive HTTP request and exposes the request status and response value as
 * a `WritableResource`. By default, it assumes that the backend will return JSON data. To make a
 * request that expects a different kind of data, you can use a sub-constructor of `httpResource`,
 * such as `httpResource.text`.
 *
 * @experimental 19.2
 * @initializerApiFunction
 */
declare const httpResource: HttpResourceFn;

/**
 * Options to configure how TransferCache should be used to cache requests made via HttpClient.
 *
 * @param includeHeaders Specifies which headers should be included into cached responses. No
 *     headers are included by default.
 * @param filter A function that receives a request as an argument and returns a boolean to indicate
 *     whether a request should be included into the cache.
 * @param includePostRequests Enables caching for POST requests. By default, only GET and HEAD
 *     requests are cached. This option can be enabled if POST requests are used to retrieve data
 *     (for example using GraphQL).
 * @param includeRequestsWithAuthHeaders Enables caching of requests containing either `Authorization`
 *     or `Proxy-Authorization` headers. By default, these requests are excluded from caching.
 *
 * @publicApi
 */
type HttpTransferCacheOptions = {
    includeHeaders?: string[];
    filter?: (req: HttpRequest<unknown>) => boolean;
    includePostRequests?: boolean;
    includeRequestsWithAuthHeaders?: boolean;
};
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
declare const HTTP_TRANSFER_CACHE_ORIGIN_MAP: InjectionToken<Record<string, string>>;
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
declare function withHttpTransferCache(cacheOptions: HttpTransferCacheOptions): Provider[];

/**
 * Uses `XMLHttpRequest` to send requests to a backend server.
 * @see {@link HttpHandler}
 * @see {@link JsonpClientBackend}
 *
 * @publicApi
 */
declare class HttpXhrBackend implements HttpBackend {
    private xhrFactory;
    constructor(xhrFactory: XhrFactory);
    /**
     * Processes a request and returns a stream of response events.
     * @param req The request object.
     * @returns An observable of the response events.
     */
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HttpXhrBackend, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HttpXhrBackend>;
}

/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * @publicApi
 */
declare abstract class HttpXsrfTokenExtractor {
    /**
     * Get the XSRF token to use with an outgoing request.
     *
     * Will be called for every request, so the token may change between requests.
     */
    abstract getToken(): string | null;
}

export { FetchBackend, HTTP_INTERCEPTORS, HTTP_TRANSFER_CACHE_ORIGIN_MAP, HttpBackend, HttpClient, HttpContext, HttpEvent, HttpFeatureKind, HttpHandler, HttpHeaders, HttpParams, HttpProgressEvent, HttpRequest, HttpResponse, HttpXhrBackend, HttpXsrfTokenExtractor, JsonpClientBackend, JsonpInterceptor, httpResource, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi, withJsonpSupport, withNoXsrfProtection, withRequestsMadeViaParent, withXsrfConfiguration, HTTP_ROOT_INTERCEPTOR_FNS as ɵHTTP_ROOT_INTERCEPTOR_FNS, HttpInterceptorHandler as ɵHttpInterceptingHandler, HttpInterceptorHandler as ɵHttpInterceptorHandler, REQUESTS_CONTRIBUTE_TO_STABILITY as ɵREQUESTS_CONTRIBUTE_TO_STABILITY, withHttpTransferCache as ɵwithHttpTransferCache };
export type { HttpFeature, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpResourceFn, HttpResourceOptions, HttpResourceRef, HttpResourceRequest, HttpTransferCacheOptions };
