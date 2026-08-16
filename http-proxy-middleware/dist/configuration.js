import { HttpProxyMiddlewareError } from './errors.js';
export function verifyConfig(options) {
    if (!options.target && !options.router) {
        throw new HttpProxyMiddlewareError('[HPM] Missing "target" option. Example: {target: "http://www.example.org"}', 'ERR_CONFIG_FACTORY_TARGET_MISSING');
    }
}
