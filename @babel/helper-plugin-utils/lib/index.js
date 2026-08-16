const apiPolyfills = {
  assertVersion: api => range => {
    throwVersionError(range, api.version);
  }
};
function declare(builder) {
  return (api, options, dirname) => {
    let clonedApi;
    for (const name of Object.keys(apiPolyfills)) {
      if (api[name]) continue;
      clonedApi ??= copyApiObject(api);
      clonedApi[name] = apiPolyfills[name](clonedApi);
    }
    return builder(clonedApi ?? api, options || {}, dirname);
  };
}
const declarePreset = declare;
function copyApiObject(api) {
  let proto = null;
  if (typeof api.version === "string" && api.version.startsWith("7.")) {
    proto = Object.getPrototypeOf(api);
    if (proto && (!Object.hasOwn(proto, "version") || !Object.hasOwn(proto, "transform") || !Object.hasOwn(proto, "template") || !Object.hasOwn(proto, "types"))) {
      proto = null;
    }
  }
  return {
    ...proto,
    ...api
  };
}
function throwVersionError(range, version) {
  if (typeof range === "number") {
    if (!Number.isInteger(range)) {
      throw new Error("Expected string or integer value.");
    }
    range = `^${range}.0.0-0`;
  }
  if (typeof range !== "string") {
    throw new Error("Expected string or integer value.");
  }
  const limit = Error.stackTraceLimit;
  if (typeof limit === "number" && limit < 25) {
    Error.stackTraceLimit = 25;
  }
  let err;
  if (version.startsWith("7.")) {
    err = new Error(`Requires Babel "^7.0.0-beta.41", but was loaded with "${version}". ` + `You'll need to update your @babel/core version.`);
  } else {
    err = new Error(`Requires Babel "${range}", but was loaded with "${version}". ` + `If you are sure you have a compatible version of @babel/core, ` + `it is likely that something in your build process is loading the ` + `wrong version. Inspect the stack trace of this error to look for ` + `the first entry that doesn't mention "@babel/core" or "babel-core" ` + `to see what is calling Babel.`);
  }
  if (typeof limit === "number") {
    Error.stackTraceLimit = limit;
  }
  throw Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version,
    range
  });
}

export { declare, declarePreset };
//# sourceMappingURL=index.js.map
