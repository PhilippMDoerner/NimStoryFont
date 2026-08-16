import path from 'node:path';
import { promises } from 'node:fs';
import { X509Certificate } from 'node:crypto';

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function isCertificateExpired(content) {
  const cert = new X509Certificate(content);
  const expirationDate = getCertificateExpirationDate(cert);
  return /* @__PURE__ */ new Date() > expirationDate;
}
function getCertificateExpirationDate(cert) {
  if (cert.validToDate) {
    return cert.validToDate;
  }
  return parseNonStandardDateString(cert.validTo);
}
function parseNonStandardDateString(str) {
  const [month, day, time, year] = str.split(" ").filter((part) => !!part);
  const monthIndex = MONTHS.indexOf(month) + 1;
  return /* @__PURE__ */ new Date(
    `${year}-${monthIndex.toString().padStart(2, "0")}-${day.padStart(2, "0")}T${time}Z`
  );
}

const defaultCacheDir = "node_modules/.vite";
function viteBasicSslPlugin(options) {
  return {
    name: "vite:basic-ssl",
    async configResolved(config) {
      const certificate = await getCertificate(
        options?.certDir ?? (config.cacheDir ?? defaultCacheDir) + "/basic-ssl",
        options?.name,
        options?.domains,
        options?.ttlDays
      );
      const https = () => ({ cert: certificate, key: certificate });
      if (config.server.https === void 0 || !!config.server.https) {
        config.server.https = Object.assign({}, config.server.https, https());
      }
      if (config.preview.https === void 0 || !!config.preview.https) {
        config.preview.https = Object.assign({}, config.preview.https, https());
      }
    }
  };
}
async function getCertificate(cacheDir, name, domains, ttlDays) {
  const cachePath = path.join(cacheDir, "_cert.pem");
  try {
    const content = await promises.readFile(cachePath, "utf8");
    const isExpired = isCertificateExpired(content);
    if (isExpired) {
      throw new Error("cache is outdated.");
    }
    return content;
  } catch {
    const content = (await import('./chunks/certificate.mjs')).createCertificate(
      name,
      domains,
      ttlDays
    );
    promises.mkdir(cacheDir, { recursive: true }).then(() => promises.writeFile(cachePath, content)).catch(() => {
    });
    return content;
  }
}

export { viteBasicSslPlugin as default, getCertificate };
