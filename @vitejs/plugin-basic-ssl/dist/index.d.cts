import { Plugin } from 'vite';

interface Options {
    certDir: string;
    domains: string[];
    name: string;
    ttlDays: number;
}
declare function viteBasicSslPlugin(options?: Partial<Options>): Plugin;
declare function getCertificate(cacheDir: string, name?: string, domains?: string[], ttlDays?: number): Promise<string>;

// @ts-ignore
export = viteBasicSslPlugin;
export { getCertificate };
