/**
 * @license Angular v22.1.1
 * (c) 2010-2026 Google LLC. https://angular.dev/
 * License: MIT
 */

import * as i0 from '@angular/core';
import { Service, Injectable } from '@angular/core';

function parseCookieValue(cookieStr, name) {
  name = encodeURIComponent(name);
  for (const cookie of cookieStr.split(';')) {
    const eqIndex = cookie.indexOf('=');
    const [cookieName, cookieValue] = eqIndex == -1 ? [cookie, ''] : [cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1)];
    if (cookieName.trim() !== name) {
      continue;
    }
    let value = cookieValue;
    try {
      value = decodeURIComponent(cookieValue);
    } catch {}
    if (value.length > 1 && value[0] === '"' && value[value.length - 1] === '"') {
      value = value.slice(1, -1);
    }
    return value;
  }
  return null;
}

class BrowserXhr {
  build() {
    return new XMLHttpRequest();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: BrowserXhr,
    deps: [],
    target: i0.ɵɵFactoryTarget.Service
  });
  static ɵprov = i0.ɵɵngDeclareService({
    minVersion: "22.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: BrowserXhr
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: BrowserXhr,
  decorators: [{
    type: Service
  }]
});
class XhrFactory {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: XhrFactory,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: "12.0.0",
    version: "22.1.1",
    ngImport: i0,
    type: XhrFactory,
    providedIn: 'root',
    useExisting: BrowserXhr
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "22.1.1",
  ngImport: i0,
  type: XhrFactory,
  decorators: [{
    type: Injectable,
    args: [{
      providedIn: 'root',
      useExisting: BrowserXhr
    }]
  }]
});

export { XhrFactory, parseCookieValue };
//# sourceMappingURL=_xhr-chunk.mjs.map
