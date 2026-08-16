import isGlob from 'is-glob';
import micromatch from 'micromatch';
import { HttpProxyMiddlewareError } from './errors.js';
export function matchPathFilter(pathFilter = '/', uri, req) {
    // single path
    if (isStringPath(pathFilter)) {
        return matchSingleStringPath(pathFilter, uri);
    }
    // single glob path
    if (isGlobPath(pathFilter)) {
        return matchSingleGlobPath(pathFilter, uri);
    }
    // multi path
    if (Array.isArray(pathFilter)) {
        if (pathFilter.every(isStringPath)) {
            return matchMultiPath(pathFilter, uri);
        }
        if (pathFilter.every(isGlobPath)) {
            return matchMultiGlobPath(pathFilter, uri);
        }
        throw new HttpProxyMiddlewareError('[HPM] Invalid pathFilter. Plain paths (e.g. "/api") can not be mixed with globs (e.g. "/api/**"). Expecting something like: ["/api", "/ajax"] or ["/api/**", "!**.html"].', 'HPM_INVALID_PATH_FILTER_ARRAY_CONFIG');
    }
    // custom matching
    if (typeof pathFilter === 'function') {
        const pathname = getUrlPathName(uri);
        return Boolean(pathFilter(pathname, req));
    }
    throw new HttpProxyMiddlewareError('[HPM] Invalid pathFilter. Expecting something like: "/api" or ["/api", "/ajax"]', 'HPM_INVALID_PATH_FILTER_CONFIG');
}
/**
 * @param  {String} pathFilter '/api'
 * @param  {String} uri     'http://example.org/api/b/c/d.html'
 * @return {Boolean}
 */
function matchSingleStringPath(pathFilter, uri) {
    const pathname = getUrlPathName(uri);
    return pathname?.indexOf(pathFilter) === 0;
}
function matchSingleGlobPath(pattern, uri) {
    const pathname = getUrlPathName(uri);
    const matches = micromatch([pathname], pattern);
    return matches && matches.length > 0;
}
function matchMultiGlobPath(patternList, uri) {
    return matchSingleGlobPath(patternList, uri);
}
/**
 * @param  {String} pathFilterList ['/api', '/ajax']
 * @param  {String} uri     'http://example.org/api/b/c/d.html'
 * @return {Boolean}
 */
function matchMultiPath(pathFilterList, uri) {
    let isMultiPath = false;
    for (const context of pathFilterList) {
        if (matchSingleStringPath(context, uri)) {
            isMultiPath = true;
            break;
        }
    }
    return isMultiPath;
}
/**
 * Parses URI and returns RFC 3986 path
 *
 * @param  {String} uri from req.url
 * @return {String}     RFC 3986 path
 */
function getUrlPathName(uri) {
    return uri && new URL(uri, 'http://0.0.0.0').pathname;
}
function isStringPath(pathFilter) {
    return typeof pathFilter === 'string' && !isGlob(pathFilter);
}
function isGlobPath(pathFilter) {
    return isGlob(pathFilter);
}
