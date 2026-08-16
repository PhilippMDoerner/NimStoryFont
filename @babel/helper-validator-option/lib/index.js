const {
  min
} = Math;
function levenshtein(a, b) {
  let t = [],
    u = [],
    i,
    j;
  const m = a.length,
    n = b.length;
  if (!m) {
    return n;
  }
  if (!n) {
    return m;
  }
  for (j = 0; j <= n; j++) {
    t[j] = j;
  }
  for (i = 1; i <= m; i++) {
    for (u = [i], j = 1; j <= n; j++) {
      u[j] = a[i - 1] === b[j - 1] ? t[j - 1] : min(t[j - 1], t[j], u[j - 1]) + 1;
    }
    t = u;
  }
  return u[n];
}
function findSuggestion(str, arr) {
  const distances = arr.map(el => levenshtein(el, str));
  return arr[distances.indexOf(min(...distances))];
}

class OptionValidator {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }
  validateTopLevelOptions(options, TopLevelOptionShape) {
    const validOptionNames = Object.keys(TopLevelOptionShape);
    for (const option of Object.keys(options)) {
      if (!validOptionNames.includes(option)) {
        throw new Error(this.formatMessage(`'${option}' is not a valid top-level option.
- Did you mean '${findSuggestion(option, validOptionNames)}'?`));
      }
    }
  }
  validateBooleanOption(name, value, defaultValue) {
    if (value === undefined) {
      return defaultValue;
    } else {
      this.invariant(typeof value === "boolean", `'${name}' option must be a boolean.`);
    }
    return value;
  }
  validateStringOption(name, value, defaultValue) {
    if (value === undefined) {
      return defaultValue;
    } else {
      this.invariant(typeof value === "string", `'${name}' option must be a string.`);
    }
    return value;
  }
  invariant(condition, message) {
    if (!condition) {
      throw new Error(this.formatMessage(message));
    }
  }
  formatMessage(message) {
    return `${this.descriptor}: ${message}`;
  }
}

export { OptionValidator, findSuggestion };
//# sourceMappingURL=index.js.map
