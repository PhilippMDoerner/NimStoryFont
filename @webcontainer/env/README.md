# @webcontainer/env

> ⚠️ Important ⚠️
>
> We strongly recommend that you update to version `1.1.0` or greater as we
> recently introduced a breaking change in WebContainer, making older versions of
> `@webcontainer/api` generate invalid `HostURL.href` and `HostURL.hostname`
> when those methods are called inside a WebContainer.

Set of environment utilities for [WebContainers](https://blog.stackblitz.com/posts/introducing-webcontainers/).

## Install

```shell
$ npm install @webcontainer/env
```

## API

### `isWebContainer(): boolean` (method)

Returns a `boolean` indicating whether the program runs in a WebContainer.

### `HostURL` (class)

The `HostURL` class represents a host specific URL. It can be used to parse a regular URL, such as
`http://localhost:1234`, into a `HostURL`. Only if the program is executed in a WebContainer,
the `hostname` is resolved to a WebContainer hostname, e.g. `http://blitz--1234.local.webcontainer.io`.
This can be useful to create platform-dependent OAuth callback URLs.

#### [`HostURL.port(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/port) (getter)

#### [`HostURL.hash(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash) (getter)

#### [`HostURL.host(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/host) (getter)

#### [`HostURL.hostname(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname) (getter)

#### [`HostURL.href(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/href) (getter)

#### [`HostURL.origin(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/origin) (getter)

#### [`HostURL.username(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/username) (getter)

#### [`HostURL.password(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/password) (getter)

#### [`HostURL.pathname(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname) (getter)

#### [`HostURL.protocol(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol) (getter)

#### [`HostURL.search(): string`](https://developer.mozilla.org/en-US/docs/Web/API/URL/search) (getter)

#### [`HostURL.searchParams(): URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams) (getter)

#### `HostURL.parse(url: string | URL): HostURL` (static method)

Parses a `url` into a `HostURL`. On local this is a no-op but when running in a WebContainer it resolves `localhost`
to a WebContainer hostname.

**Example**

```js
import { HostURL, isWebContainer } from '@webcontainer/env';

const hostURL = HostURL.parse('http://localhost:1234');

/**
 * Note that this branching would not be necessary as the host URL gets parsed
 * and resolved automatically through `HostURL.parse()` (see above). So `href`
 * will return a different value depending on the environment. This is illustrated
 * with the following `if` statement.
 */
if (isWebContainer()) {
  console.log(hostURL.href); // http://blitz--1234.local.webcontainer.io
} else {
  console.log(hostURL.href); // http://localhost:1234
}
```

#### `HostURL.update(change: Partial<UpdateableURLProperties>): HostURL` (method)

Updates the `HostURL`.

##### **change**

Object containing the URL changes. Note that some properties are immutable (read-only), e.g. `origin` or `searchParams`. When updating the `port` it automatically updates the `host`.

Type: `Partial<UpdateableURLProperties>`

```js
interface UpdateableURLProperties {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  username: string;
}
```

#### `HostURL.toString(): string` (method)

Stringifies the HostURL. It is effectively a read-only version of `HostURL.href`.

#### `HostURL.toJSON(): string` (method)

Returns a string containing a serialized version of the `HostURL`.
