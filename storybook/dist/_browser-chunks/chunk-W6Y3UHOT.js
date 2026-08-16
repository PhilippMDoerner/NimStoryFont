import {
  OpenServiceAsyncSchemaError,
  OpenServiceInvalidStaticPathError,
  OpenServiceLoadedDrainExceededError,
  OpenServiceMissingChannelError,
  OpenServiceMissingServiceError,
  OpenServiceRemoteCommandDisconnectedError,
  OpenServiceRemoteCommandUnhandledError,
  OpenServiceUnimplementedOperationError,
  OpenServiceValidationError
} from "./chunk-KUHYVZJN.js";
import {
  buildQueryState,
  toError
} from "./chunk-QC4HFS6K.js";
import {
  isEqual
} from "./chunk-Z3B64JMR.js";
import {
  getChannel
} from "./chunk-KK3JJ3E4.js";
import {
  OpenServiceStaticSnapshotInvalidError,
  OpenServiceStaticSnapshotLoadError
} from "./chunk-IUGBVGDA.js";

// ../../node_modules/nanoid/index.browser.js
var nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => (byte &= 63, byte < 36 ? id += byte.toString(36) : byte < 62 ? id += (byte - 26).toString(36).toUpperCase() : byte > 62 ? id += "-" : id += "_", id), "");

// ../../node_modules/valibot/dist/index.mjs
var store$4, DEFAULT_CONFIG = {
  lang: void 0,
  message: void 0,
  abortEarly: void 0,
  abortPipeEarly: void 0
};
function getGlobalConfig(config$1) {
  return !config$1 && !store$4 ? DEFAULT_CONFIG : {
    lang: config$1?.lang ?? store$4?.lang,
    message: config$1?.message,
    abortEarly: config$1?.abortEarly ?? store$4?.abortEarly,
    abortPipeEarly: config$1?.abortPipeEarly ?? store$4?.abortPipeEarly
  };
}
var store$3;
function getGlobalMessage(lang) {
  return store$3?.get(lang);
}
var store$2;
function getSchemaMessage(lang) {
  return store$2?.get(lang);
}
var store$1;
function getSpecificMessage(reference, lang) {
  return store$1?.get(reference)?.get(lang);
}
function _stringify(input) {
  let type = typeof input;
  return type === "string" ? `"${input}"` : type === "number" || type === "bigint" || type === "boolean" ? `${input}` : type === "object" || type === "function" ? (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null" : type;
}
function _addIssue(context, label, dataset, config$1, other) {
  let input = other && "input" in other ? other.input : dataset.value, expected = other?.expected ?? context.expects ?? null, received = other?.received ?? _stringify(input), issue = {
    kind: context.kind,
    type: context.type,
    input,
    expected,
    received,
    message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
    requirement: context.requirement,
    path: other?.path,
    issues: other?.issues,
    lang: config$1.lang,
    abortEarly: config$1.abortEarly,
    abortPipeEarly: config$1.abortPipeEarly
  }, isSchema = context.kind === "schema", message$1 = other?.message ?? context.message ?? getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? getSchemaMessage(issue.lang) : null) ?? config$1.message ?? getGlobalMessage(issue.lang);
  message$1 !== void 0 && (issue.message = typeof message$1 == "function" ? message$1(issue) : message$1), isSchema && (dataset.typed = !1), dataset.issues ? dataset.issues.push(issue) : dataset.issues = [issue];
}
var _standardCache = /* @__PURE__ */ new WeakMap();
function _getStandardProps(context) {
  let cached = _standardCache.get(context);
  return cached || (cached = {
    version: 1,
    vendor: "valibot",
    validate(value$1) {
      return context["~run"]({ value: value$1 }, getGlobalConfig());
    }
  }, _standardCache.set(context, cached)), cached;
}
function _isValidObjectKey(object$1, key) {
  return Object.prototype.hasOwnProperty.call(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
}
var EMOJI_REGEX = new RegExp("^(?:[\\u{1F1E6}-\\u{1F1FF}]{2}|\\u{1F3F4}[\\u{E0061}-\\u{E007A}]{2}[\\u{E0030}-\\u{E0039}\\u{E0061}-\\u{E007A}]{1,3}\\u{E007F}|(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|(?![\\p{Emoji_Modifier_Base}\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation})(?:\\u200D(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|(?![\\p{Emoji_Modifier_Base}\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation}))*)+$", "u");
function minValue(requirement, message$1) {
  return {
    kind: "validation",
    type: "min_value",
    reference: minValue,
    async: !1,
    expects: `>=${requirement instanceof Date ? requirement.toJSON() : _stringify(requirement)}`,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      return dataset.typed && !(dataset.value >= this.requirement) && _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value) }), dataset;
    }
  };
}
function safeInteger(message$1) {
  return {
    kind: "validation",
    type: "safe_integer",
    reference: safeInteger,
    async: !1,
    expects: null,
    requirement: Number.isSafeInteger,
    message: message$1,
    "~run"(dataset, config$1) {
      return dataset.typed && !this.requirement(dataset.value) && _addIssue(this, "safe integer", dataset, config$1), dataset;
    }
  };
}
function getFallback(schema, dataset, config$1) {
  return typeof schema.fallback == "function" ? schema.fallback(dataset, config$1) : schema.fallback;
}
function getDefault(schema, dataset, config$1) {
  return typeof schema.default == "function" ? schema.default(dataset, config$1) : schema.default;
}
function array(item, message$1) {
  return {
    kind: "schema",
    type: "array",
    reference: array,
    expects: "Array",
    async: !1,
    item,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (Array.isArray(input)) {
        dataset.typed = !0, dataset.value = [];
        for (let key = 0; key < input.length; key++) {
          let value$1 = input[key], itemDataset = this.item["~run"]({ value: value$1 }, config$1);
          if (itemDataset.issues) {
            let pathItem = {
              type: "array",
              origin: "value",
              input,
              key,
              value: value$1
            };
            for (let issue of itemDataset.issues)
              issue.path ? issue.path.unshift(pathItem) : issue.path = [pathItem], dataset.issues?.push(issue);
            if (dataset.issues || (dataset.issues = itemDataset.issues), config$1.abortEarly) {
              dataset.typed = !1;
              break;
            }
          }
          itemDataset.typed || (dataset.typed = !1), dataset.value.push(itemDataset.value);
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
function custom(check$1, message$1) {
  return {
    kind: "schema",
    type: "custom",
    reference: custom,
    expects: "unknown",
    async: !1,
    check: check$1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return this.check(dataset.value) ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function looseObject(entries$1, message$1) {
  return {
    kind: "schema",
    type: "loose_object",
    reference: looseObject,
    expects: "Object",
    async: !1,
    entries: entries$1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (input && typeof input == "object") {
        dataset.typed = !0, dataset.value = {};
        for (let key in this.entries) {
          let valueSchema = this.entries[key];
          if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
            let value$1 = key in input ? input[key] : getDefault(valueSchema), valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
            if (valueDataset.issues) {
              let pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value$1
              };
              for (let issue of valueDataset.issues)
                issue.path ? issue.path.unshift(pathItem) : issue.path = [pathItem], dataset.issues?.push(issue);
              if (dataset.issues || (dataset.issues = valueDataset.issues), config$1.abortEarly) {
                dataset.typed = !1;
                break;
              }
            }
            valueDataset.typed || (dataset.typed = !1), dataset.value[key] = valueDataset.value;
          } else if (valueSchema.fallback !== void 0) dataset.value[key] = getFallback(valueSchema);
          else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish" && (_addIssue(this, "key", dataset, config$1, {
            input: void 0,
            expected: `"${key}"`,
            path: [{
              type: "object",
              origin: "key",
              input,
              key,
              value: input[key]
            }]
          }), config$1.abortEarly))
            break;
        }
        if (!dataset.issues || !config$1.abortEarly)
          for (let key in input) _isValidObjectKey(input, key) && !(key in this.entries) && (dataset.value[key] = input[key]);
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
function number(message$1) {
  return {
    kind: "schema",
    type: "number",
    reference: number,
    expects: "number",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return typeof dataset.value == "number" && !isNaN(dataset.value) ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function object(entries$1, message$1) {
  return {
    kind: "schema",
    type: "object",
    reference: object,
    expects: "Object",
    async: !1,
    entries: entries$1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (input && typeof input == "object") {
        dataset.typed = !0, dataset.value = {};
        for (let key in this.entries) {
          let valueSchema = this.entries[key];
          if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
            let value$1 = key in input ? input[key] : getDefault(valueSchema), valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
            if (valueDataset.issues) {
              let pathItem = {
                type: "object",
                origin: "value",
                input,
                key,
                value: value$1
              };
              for (let issue of valueDataset.issues)
                issue.path ? issue.path.unshift(pathItem) : issue.path = [pathItem], dataset.issues?.push(issue);
              if (dataset.issues || (dataset.issues = valueDataset.issues), config$1.abortEarly) {
                dataset.typed = !1;
                break;
              }
            }
            valueDataset.typed || (dataset.typed = !1), dataset.value[key] = valueDataset.value;
          } else if (valueSchema.fallback !== void 0) dataset.value[key] = getFallback(valueSchema);
          else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish" && (_addIssue(this, "key", dataset, config$1, {
            input: void 0,
            expected: `"${key}"`,
            path: [{
              type: "object",
              origin: "key",
              input,
              key,
              value: input[key]
            }]
          }), config$1.abortEarly))
            break;
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
function optional(wrapped, default_) {
  return {
    kind: "schema",
    type: "optional",
    reference: optional,
    expects: `(${wrapped.expects} | undefined)`,
    async: !1,
    wrapped,
    default: default_,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === void 0 && (this.default !== void 0 && (dataset.value = getDefault(this, dataset, config$1)), dataset.value === void 0) ? (dataset.typed = !0, dataset) : this.wrapped["~run"](dataset, config$1);
    }
  };
}
function record(key, value$1, message$1) {
  return {
    kind: "schema",
    type: "record",
    reference: record,
    expects: "Object",
    async: !1,
    key,
    value: value$1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (input && typeof input == "object") {
        dataset.typed = !0, dataset.value = {};
        for (let entryKey in input) if (_isValidObjectKey(input, entryKey)) {
          let entryValue = input[entryKey], keyDataset = this.key["~run"]({ value: entryKey }, config$1);
          if (keyDataset.issues) {
            let pathItem = {
              type: "object",
              origin: "key",
              input,
              key: entryKey,
              value: entryValue
            };
            for (let issue of keyDataset.issues)
              issue.path = [pathItem], dataset.issues?.push(issue);
            if (dataset.issues || (dataset.issues = keyDataset.issues), config$1.abortEarly) {
              dataset.typed = !1;
              break;
            }
          }
          let valueDataset = this.value["~run"]({ value: entryValue }, config$1);
          if (valueDataset.issues) {
            let pathItem = {
              type: "object",
              origin: "value",
              input,
              key: entryKey,
              value: entryValue
            };
            for (let issue of valueDataset.issues)
              issue.path ? issue.path.unshift(pathItem) : issue.path = [pathItem], dataset.issues?.push(issue);
            if (dataset.issues || (dataset.issues = valueDataset.issues), config$1.abortEarly) {
              dataset.typed = !1;
              break;
            }
          }
          (!keyDataset.typed || !valueDataset.typed) && (dataset.typed = !1), keyDataset.typed && (dataset.value[keyDataset.value] = valueDataset.value);
        }
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
    }
  };
}
function string(message$1) {
  return {
    kind: "schema",
    type: "string",
    reference: string,
    expects: "string",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return typeof dataset.value == "string" ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function undefined_(message$1) {
  return {
    kind: "schema",
    type: "undefined",
    reference: undefined_,
    expects: "undefined",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === void 0 ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function unknown() {
  return {
    kind: "schema",
    type: "unknown",
    reference: unknown,
    expects: "unknown",
    async: !1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset) {
      return dataset.typed = !0, dataset;
    }
  };
}
function void_(message$1) {
  return {
    kind: "schema",
    type: "void",
    reference: void_,
    expects: "void",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === void 0 ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
    }
  };
}
function pipe(...pipe$1) {
  return {
    ...pipe$1[0],
    pipe: pipe$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      for (let item of pipe$1) if (item.kind !== "metadata") {
        if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
          dataset.typed = !1;
          break;
        }
        (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) && (dataset = item["~run"](dataset, config$1));
      }
      return dataset;
    }
  };
}
function safeParse(schema, input, config$1) {
  let dataset = schema["~run"]({ value: input }, getGlobalConfig(config$1));
  return {
    typed: dataset.typed,
    success: !dataset.issues,
    output: dataset.value,
    issues: dataset.issues
  };
}

// src/shared/open-service/service-channel.ts
var SERVICE_SYNC_START = "services:sync-start", SERVICE_SYNC_START_REPLY = "services:sync-start-reply", SERVICE_PATCHES = "services:patches", SERVICE_COMMAND_INVOKE = "services:command-invoke", SERVICE_COMMAND_ACK = "services:command-ack", SERVICE_COMMAND_RESULT = "services:command-result", SERVICE_COMMAND_ERROR = "services:command-error", stateSnapshotSchema = custom(
  (value) => typeof value == "object" && value !== null && !Array.isArray(value)
), syncStartSchema = object({
  serviceId: string(),
  clientId: string()
}), stampedSnapshotSchema = object({
  serviceId: string(),
  state: stateSnapshotSchema,
  version: pipe(number(), safeInteger(), minValue(0)),
  clientId: string()
}), commandInvokeSchema = object({
  serviceId: string(),
  commandName: string(),
  input: optional(unknown()),
  callId: string(),
  clientId: string()
}), commandAckSchema = object({
  serviceId: string(),
  callId: string(),
  clientId: string()
}), commandResultSchema = object({
  serviceId: string(),
  callId: string(),
  result: optional(unknown()),
  clientId: string()
}), commandErrorSchema = object({
  serviceId: string(),
  callId: string(),
  error: custom(
    (value) => typeof value == "object" && value !== null && !Array.isArray(value)
  ),
  clientId: string()
});
function generateClientId() {
  return nanoid();
}

// ../../node_modules/@preact/signals-core/dist/signals-core.module.js
var i = /* @__PURE__ */ Symbol.for("preact-signals");
function t() {
  if (s > 1)
    s--;
  else {
    var i3, t2 = !1;
    for ((function() {
      var i4 = c;
      for (c = void 0; i4 !== void 0; )
        i4.S.v === i4.v && (i4.S.i = i4.i), i4 = i4.o;
    })(); h !== void 0; ) {
      var n3 = h;
      for (h = void 0, v++; n3 !== void 0; ) {
        var r2 = n3.u;
        if (n3.u = void 0, n3.f &= -3, !(8 & n3.f) && w(n3)) try {
          n3.c();
        } catch (n4) {
          t2 || (i3 = n4, t2 = !0);
        }
        n3 = r2;
      }
    }
    if (v = 0, s--, t2) throw i3;
  }
}
function n(i3) {
  if (s > 0) return i3();
  e = ++u, s++;
  try {
    return i3();
  } finally {
    t();
  }
}
var r = void 0;
function o(i3) {
  var t2 = r;
  r = void 0;
  try {
    return i3();
  } finally {
    r = t2;
  }
}
var f, h = void 0, s = 0, v = 0, u = 0, e = 0, c = void 0, d = 0;
function a(i3) {
  if (r !== void 0) {
    var t2 = i3.n;
    if (t2 === void 0 || t2.t !== r)
      return t2 = { i: 0, S: i3, p: r.s, n: void 0, t: r, e: void 0, x: void 0, r: t2 }, r.s !== void 0 && (r.s.n = t2), r.s = t2, i3.n = t2, 32 & r.f && i3.S(t2), t2;
    if (t2.i === -1)
      return t2.i = 0, t2.n !== void 0 && (t2.n.p = t2.p, t2.p !== void 0 && (t2.p.n = t2.n), t2.p = r.s, t2.n = void 0, r.s.n = t2, r.s = t2), t2;
  }
}
function l(i3, t2) {
  this.v = i3, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = t2?.watched, this.Z = t2?.unwatched, this.name = t2?.name;
}
l.prototype.brand = i;
l.prototype.h = function() {
  return !0;
};
l.prototype.S = function(i3) {
  var t2 = this, n3 = this.t;
  n3 !== i3 && i3.e === void 0 && (i3.x = n3, this.t = i3, n3 !== void 0 ? n3.e = i3 : o(function() {
    var i4;
    (i4 = t2.W) == null || i4.call(t2);
  }));
};
l.prototype.U = function(i3) {
  var t2 = this;
  if (this.t !== void 0) {
    var n3 = i3.e, r2 = i3.x;
    n3 !== void 0 && (n3.x = r2, i3.e = void 0), r2 !== void 0 && (r2.e = n3, i3.x = void 0), i3 === this.t && (this.t = r2, r2 === void 0 && o(function() {
      var i4;
      (i4 = t2.Z) == null || i4.call(t2);
    }));
  }
};
l.prototype.subscribe = function(i3) {
  var t2 = this;
  return j(function() {
    var n3 = t2.value, o3 = r;
    r = void 0;
    try {
      i3(n3);
    } finally {
      r = o3;
    }
  }, { name: "sub" });
};
l.prototype.valueOf = function() {
  return this.value;
};
l.prototype.toString = function() {
  return this.value + "";
};
l.prototype.toJSON = function() {
  return this.value;
};
l.prototype.peek = function() {
  var i3 = this;
  return o(function() {
    return i3.value;
  });
};
Object.defineProperty(l.prototype, "value", { get: function() {
  var i3 = a(this);
  return i3 !== void 0 && (i3.i = this.i), this.v;
}, set: function(i3) {
  if (i3 !== this.v) {
    if (v > 100) throw new Error("Cycle detected");
    (function(i4) {
      s !== 0 && v === 0 && i4.l !== e && (i4.l = e, c = { S: i4, v: i4.v, i: i4.i, o: c });
    })(this), this.v = i3, this.i++, d++, s++;
    try {
      for (var n3 = this.t; n3 !== void 0; n3 = n3.x) n3.t.N();
    } finally {
      t();
    }
  }
} });
function y(i3, t2) {
  return new l(i3, t2);
}
function w(i3) {
  for (var t2 = i3.s; t2 !== void 0; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return !0;
  return !1;
}
function _(i3) {
  for (var t2 = i3.s; t2 !== void 0; t2 = t2.n) {
    var n3 = t2.S.n;
    if (n3 !== void 0 && (t2.r = n3), t2.S.n = t2, t2.i = -1, t2.n === void 0) {
      i3.s = t2;
      break;
    }
  }
}
function b(i3) {
  for (var t2 = i3.s, n3 = void 0; t2 !== void 0; ) {
    var r2 = t2.p;
    t2.i === -1 ? (t2.S.U(t2), r2 !== void 0 && (r2.n = t2.n), t2.n !== void 0 && (t2.n.p = r2)) : n3 = t2, t2.S.n = t2.r, t2.r !== void 0 && (t2.r = void 0), t2 = r2;
  }
  i3.s = n3;
}
function p(i3, t2) {
  l.call(this, void 0), this.x = i3, this.s = void 0, this.g = d - 1, this.f = 4, this.W = t2?.watched, this.Z = t2?.unwatched, this.name = t2?.name;
}
p.prototype = new l();
p.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === d)) return !0;
  if (this.g = d, this.f |= 1, this.i > 0 && !w(this))
    return this.f &= -2, !0;
  var i3 = r;
  try {
    _(this), r = this;
    var t2 = this.x();
    (16 & this.f || this.v !== t2 || this.i === 0) && (this.v = t2, this.f &= -17, this.i++);
  } catch (i4) {
    this.v = i4, this.f |= 16, this.i++;
  }
  return r = i3, b(this), this.f &= -2, !0;
};
p.prototype.S = function(i3) {
  if (this.t === void 0) {
    this.f |= 36;
    for (var t2 = this.s; t2 !== void 0; t2 = t2.n) t2.S.S(t2);
  }
  l.prototype.S.call(this, i3);
};
p.prototype.U = function(i3) {
  if (this.t !== void 0 && (l.prototype.U.call(this, i3), this.t === void 0)) {
    this.f &= -33;
    for (var t2 = this.s; t2 !== void 0; t2 = t2.n) t2.S.U(t2);
  }
};
p.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (var i3 = this.t; i3 !== void 0; i3 = i3.x) i3.t.N();
  }
};
Object.defineProperty(p.prototype, "value", { get: function() {
  if (1 & this.f) throw new Error("Cycle detected");
  var i3 = a(this);
  if (this.h(), i3 !== void 0 && (i3.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} });
function g(i3, t2) {
  return new p(i3, t2);
}
function S(i3) {
  var n3 = i3.m;
  if (i3.m = void 0, typeof n3 == "function") {
    s++;
    var o3 = r;
    r = void 0;
    try {
      n3();
    } catch (t2) {
      throw i3.f &= -2, i3.f |= 8, m(i3), t2;
    } finally {
      r = o3, t();
    }
  }
}
function m(i3) {
  for (var t2 = i3.s; t2 !== void 0; t2 = t2.n) t2.S.U(t2);
  i3.x = void 0, i3.s = void 0, S(i3);
}
function x(i3) {
  if (r !== this) throw new Error("Out-of-order effect");
  b(this), r = i3, this.f &= -2, 8 & this.f && m(this), t();
}
function E(i3, t2) {
  this.x = i3, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = t2?.name, f && f.push(this);
}
E.prototype.c = function() {
  var i3 = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    var t2 = this.x();
    typeof t2 == "function" && (this.m = t2);
  } finally {
    i3();
  }
};
E.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, S(this), _(this), s++;
  var i3 = r;
  return r = this, x.bind(this, i3);
};
E.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = h, h = this);
};
E.prototype.d = function() {
  this.f |= 8, 1 & this.f || m(this);
};
E.prototype.dispose = function() {
  this.d();
};
function j(i3, t2) {
  var n3 = new E(i3, t2);
  try {
    n3.c();
  } catch (i4) {
    throw n3.d(), i4;
  }
  var r2 = n3.d.bind(n3);
  return r2[Symbol.dispose] = r2, r2;
}

// ../../node_modules/deepsignal/core/dist/deepsignal-core.module.js
var n2 = /* @__PURE__ */ new WeakMap(), a2 = /* @__PURE__ */ new WeakMap(), o2 = /* @__PURE__ */ new WeakMap(), s2 = /* @__PURE__ */ new WeakSet(), u2 = /* @__PURE__ */ new WeakMap(), f2 = /^\$/, c2 = Object.getOwnPropertyDescriptor, i2 = !1, l2 = function(e2) {
  if (!R(e2)) throw new Error("This object can't be observed.");
  return a2.has(e2) || a2.set(e2, p2(e2, w2)), a2.get(e2);
};
var p2 = function(e2, t2) {
  var r2 = new Proxy(e2, t2);
  return s2.add(r2), r2;
}, v2 = function() {
  throw new Error("Don't mutate the signals directly.");
}, y2 = function(e2) {
  return function(s3, u3, l3) {
    var g2;
    if (i2) return Reflect.get(s3, u3, l3);
    var h2 = e2 || u3[0] === "$";
    if (!e2 && h2 && Array.isArray(s3)) {
      if (u3 === "$") return o2.has(s3) || o2.set(s3, p2(s3, d2)), o2.get(s3);
      h2 = u3 === "$length";
    }
    n2.has(l3) || n2.set(l3, /* @__PURE__ */ new Map());
    var v3 = n2.get(l3), y3 = h2 ? u3.replace(f2, "") : u3;
    if (v3.has(y3) || typeof ((g2 = c2(s3, y3)) == null ? void 0 : g2.get) != "function") {
      var m3 = Reflect.get(s3, y3, l3);
      if (h2 && typeof m3 == "function") return;
      if (typeof y3 == "symbol" && b2.has(y3)) return m3;
      v3.has(y3) || (R(m3) && (a2.has(m3) || a2.set(m3, p2(m3, w2)), m3 = a2.get(m3)), v3.set(y3, y(m3)));
    } else v3.set(y3, g(function() {
      return Reflect.get(s3, y3, l3);
    }));
    return h2 ? v3.get(y3) : v3.get(y3).value;
  };
}, w2 = { get: y2(!1), set: function(r2, o3, s3, i3) {
  var l3;
  if (typeof ((l3 = c2(r2, o3)) == null ? void 0 : l3.set) == "function") return Reflect.set(r2, o3, s3, i3);
  n2.has(i3) || n2.set(i3, /* @__PURE__ */ new Map());
  var g2 = n2.get(i3);
  if (o3[0] === "$") {
    s3 instanceof l || v2();
    var h2 = o3.replace(f2, "");
    return g2.set(h2, s3), Reflect.set(r2, h2, s3.peek(), i3);
  }
  var y3 = s3;
  R(s3) && (a2.has(s3) || a2.set(s3, p2(s3, w2)), y3 = a2.get(s3));
  var d3 = !(o3 in r2), b3 = Reflect.set(r2, o3, s3, i3);
  return g2.has(o3) ? g2.get(o3).value = y3 : g2.set(o3, y(y3)), d3 && u2.has(r2) && u2.get(r2).value++, Array.isArray(r2) && g2.has("length") && (g2.get("length").value = r2.length), b3;
}, deleteProperty: function(e2, t2) {
  t2[0] === "$" && v2();
  var r2 = n2.get(a2.get(e2)), o3 = Reflect.deleteProperty(e2, t2);
  return r2 && r2.has(t2) && (r2.get(t2).value = void 0), u2.has(e2) && u2.get(e2).value++, o3;
}, ownKeys: function(e2) {
  return u2.has(e2) || u2.set(e2, y(0)), u2._ = u2.get(e2).value, Reflect.ownKeys(e2);
} }, d2 = { get: y2(!0), set: v2, deleteProperty: v2 }, b2 = new Set(Object.getOwnPropertyNames(Symbol).map(function(e2) {
  return Symbol[e2];
}).filter(function(e2) {
  return typeof e2 == "symbol";
})), m2 = /* @__PURE__ */ new Set([Object, Array]), R = function(e2) {
  return typeof e2 == "object" && e2 !== null && m2.has(e2.constructor) && !s2.has(e2);
};

// src/shared/open-service/service-validation.ts
function rethrowAsync(error) {
  queueMicrotask(() => {
    throw error;
  });
}
async function validateSchema(schema, value, meta) {
  let validationResult = await schema["~standard"].validate(value);
  if (validationResult.issues)
    throw new OpenServiceValidationError({ ...meta, issues: validationResult.issues });
  return validationResult.value;
}
function validateSchemaSync(schema, value, meta) {
  let validationResult = schema["~standard"].validate(value);
  if (validationResult instanceof Promise)
    throw new OpenServiceAsyncSchemaError({
      kind: meta.kind,
      serviceId: meta.serviceId,
      name: meta.name,
      phase: meta.phase
    });
  if (validationResult.issues)
    throw new OpenServiceValidationError({ ...meta, issues: validationResult.issues });
  return validationResult.value;
}

// src/shared/open-service/query-runtime.ts
var MAX_DRAIN_ITERATIONS = 32, inFlightLoads = /* @__PURE__ */ new Map(), activeHandlerLoadSession, EMPTY_SET = /* @__PURE__ */ new Set();
function stableHash(value) {
  let encode = (raw) => {
    if (raw === void 0)
      return { __t: "undefined" };
    if (raw === null || typeof raw != "object")
      return raw;
    if (Array.isArray(raw))
      return raw.map(encode);
    let sorted = {};
    for (let k of Object.keys(raw).sort())
      sorted[k] = encode(raw[k]);
    return { __t: "object", value: sorted };
  };
  return JSON.stringify(encode(value));
}
function makeLoadKey(serviceId, queryName, validatedInput) {
  return `${serviceId}::${queryName}::${stableHash(validatedInput)}`;
}
function surfaceRejections(settlements) {
  let rejections = settlements.filter((s3) => s3.status === "rejected");
  if (rejections.length === 0)
    return;
  let [first, ...rest] = rejections.map((r2) => r2.reason);
  if (rest.length > 0 && first instanceof Error && Reflect.get(first, "cause") === void 0)
    try {
      Reflect.set(first, "cause", { aggregated: rest });
    } catch {
    }
  throw first;
}
async function drainCollector(collector, settledKeys, serviceId, queryName) {
  let iterations = 0;
  for (; collector.size > 0; ) {
    if (iterations++ > MAX_DRAIN_ITERATIONS)
      throw new OpenServiceLoadedDrainExceededError({
        serviceId,
        name: queryName,
        iterations: MAX_DRAIN_ITERATIONS
      });
    let pending = [...collector];
    collector.clear();
    let settlements = await Promise.allSettled(pending.map((entry) => entry.promise));
    if (settledKeys)
      for (let entry of pending)
        settledKeys.add(entry.key);
    surfaceRejections(settlements);
  }
}
function detachSnapshot(value) {
  return value === null || typeof value != "object" ? value : JSON.parse(JSON.stringify(value));
}
function validateQueryInput(refs, queryName, queryDef, input) {
  return validateSchemaSync(queryDef.input, input, {
    kind: "query",
    serviceId: refs.serviceId,
    name: queryName,
    phase: "input"
  });
}
function validateQueryOutput(refs, queryName, queryDef, output) {
  return validateSchemaSync(queryDef.output, output, {
    kind: "query",
    serviceId: refs.serviceId,
    name: queryName,
    phase: "output"
  });
}
function runHandlerSync(refs, queryName, queryDef, validatedInput, selfQueries, getService2) {
  if (!queryDef.handler)
    throw new OpenServiceUnimplementedOperationError({
      kind: "query",
      serviceId: refs.serviceId,
      name: queryName
    });
  let handlerCtx = { self: {
    get state() {
      return refs.state;
    },
    queries: selfQueries
  }, getService: getService2 };
  return queryDef.handler(validatedInput, handlerCtx);
}
function createQueryGet(refs, queryName, queryDef, selfQueries, fireLoad) {
  return function(input) {
    let validatedInput = validateQueryInput(
      refs,
      queryName,
      queryDef,
      arguments.length === 0 ? void 0 : input
    );
    return queryDef.load && fireLoad?.(validatedInput), validateQueryOutput(
      refs,
      queryName,
      queryDef,
      runHandlerSync(
        refs,
        queryName,
        queryDef,
        validatedInput,
        selfQueries,
        refs.registryApi.getService
      )
    );
  };
}
function triggerLoad(refs, queryName, queryDef, validatedInput, loadKey, parentAncestorChain) {
  let existing = inFlightLoads.get(loadKey);
  if (existing)
    return existing;
  let extendedChain = new Set(parentAncestorChain);
  extendedChain.add(loadKey);
  let promise = Promise.resolve().then(() => runLoadBody(refs, queryName, queryDef, validatedInput, extendedChain)).finally(() => {
    inFlightLoads.get(loadKey) === promise && inFlightLoads.delete(loadKey);
  });
  return inFlightLoads.set(loadKey, promise), promise;
}
async function runLoadBody(refs, queryName, queryDef, validatedInput, ancestorChain) {
  if (!queryDef.load)
    return;
  let collector = /* @__PURE__ */ new Set(), wrappedQueries = buildLoadWrappedQueries(refs, ancestorChain, collector), loadCtx = { self: {
    get state() {
      return refs.state;
    },
    queries: wrappedQueries,
    commands: refs.getLoadCommands()
  }, getService: refs.registryApi.getService };
  await Promise.resolve(queryDef.load(validatedInput, loadCtx)), await drainCollector(collector, void 0, refs.serviceId, queryName);
}
async function runReactiveLoad(refs, queryName, queryDef, validatedInput, isCurrent) {
  if (!queryDef.load)
    return;
  let loadCtx = { self: {
    get state() {
      return refs.state;
    },
    // Reactive-load reads must keep dependency loads warm. `.get()` on a default query is a pure
    // read and never fires a load, so the body sees fire-and-forget wrappers instead: reading a
    // dependency triggers its load (deduped while in flight) without awaiting a drain.
    queries: refs.reactiveLoadQueries,
    commands: refs.buildGatedCommands(isCurrent)
  }, getService: refs.registryApi.getService };
  await Promise.resolve(queryDef.load(validatedInput, loadCtx));
}
function buildReactiveLoadQueries(refs) {
  let wrappedQueries = {};
  for (let [name, queryDef] of refs.queryDefinitions) {
    let defaultQuery = refs.defaultQueries[name], get = createQueryGet(refs, name, queryDef, wrappedQueries, (validatedInput) => {
      let loadKey = makeLoadKey(refs.serviceId, name, validatedInput);
      triggerLoad(refs, name, queryDef, validatedInput, loadKey, EMPTY_SET).catch(rethrowAsync);
    });
    wrappedQueries[name] = {
      get,
      loaded: defaultQuery.loaded,
      subscribe: defaultQuery.subscribe
    };
  }
  return wrappedQueries;
}
function buildLoadWrappedQueries(refs, ancestorChain, collector) {
  let wrappedQueries = {};
  for (let [name, queryDef] of refs.queryDefinitions) {
    let defaultQuery = refs.defaultQueries[name], wrapped = {
      get: createQueryGet(refs, name, queryDef, wrappedQueries, (validatedInput) => {
        let loadKey = makeLoadKey(refs.serviceId, name, validatedInput), promise = triggerLoad(refs, name, queryDef, validatedInput, loadKey, ancestorChain);
        ancestorChain.has(loadKey) || collector.add({ key: loadKey, promise });
      }),
      loaded(input) {
        return runLoaded(
          refs,
          name,
          queryDef,
          arguments.length === 0 ? void 0 : input,
          ancestorChain
        );
      },
      subscribe: defaultQuery.subscribe
    };
    wrappedQueries[name] = wrapped;
  }
  return wrappedQueries;
}
async function runLoaded(refs, queryName, queryDef, rawInput, parentAncestorChain = EMPTY_SET) {
  let validatedInput = validateQueryInput(refs, queryName, queryDef, rawInput), loadKey = makeLoadKey(refs.serviceId, queryName, validatedInput), ancestorChain = new Set(parentAncestorChain);
  ancestorChain.add(loadKey);
  let session = {
    ancestorChain,
    collector: /* @__PURE__ */ new Set(),
    settledKeys: /* @__PURE__ */ new Set()
  };
  if (queryDef.load && !parentAncestorChain.has(loadKey)) {
    let promise = triggerLoad(
      refs,
      queryName,
      queryDef,
      validatedInput,
      loadKey,
      parentAncestorChain
    );
    session.collector.add({ key: loadKey, promise });
  }
  let iterations = 0, hasMoreWork = !0;
  for (; hasMoreWork; ) {
    if (iterations++ > MAX_DRAIN_ITERATIONS)
      throw new OpenServiceLoadedDrainExceededError({
        serviceId: refs.serviceId,
        name: queryName,
        iterations: MAX_DRAIN_ITERATIONS
      });
    for (; session.collector.size > 0; ) {
      let pending = [...session.collector];
      session.collector.clear();
      let settlements = await Promise.allSettled(pending.map((entry) => entry.promise));
      for (let entry of pending)
        session.settledKeys.add(entry.key);
      surfaceRejections(settlements);
    }
    let previousSession2 = activeHandlerLoadSession;
    activeHandlerLoadSession = session;
    try {
      runHandlerSync(
        refs,
        queryName,
        queryDef,
        validatedInput,
        refs.defaultQueries,
        refs.registryApi.getService
      );
    } catch {
    } finally {
      activeHandlerLoadSession = previousSession2;
    }
    hasMoreWork = session.collector.size > 0;
  }
  let previousSession = activeHandlerLoadSession;
  activeHandlerLoadSession = session;
  try {
    return validateQueryOutput(
      refs,
      queryName,
      queryDef,
      runHandlerSync(
        refs,
        queryName,
        queryDef,
        validatedInput,
        refs.defaultQueries,
        refs.registryApi.getService
      )
    );
  } finally {
    activeHandlerLoadSession = previousSession;
  }
}
function createDefaultQuery(refs, queryName, queryDef) {
  let resolveInput = (input, argsLength) => argsLength === 0 ? void 0 : input;
  return {
    get: createQueryGet(refs, queryName, queryDef, refs.defaultQueries, (validatedInput) => {
      let session = activeHandlerLoadSession;
      if (!session)
        return;
      let loadKey = makeLoadKey(refs.serviceId, queryName, validatedInput);
      if (!session.ancestorChain.has(loadKey) && !session.settledKeys.has(loadKey)) {
        let promise = triggerLoad(
          refs,
          queryName,
          queryDef,
          validatedInput,
          loadKey,
          session.ancestorChain
        );
        session.collector.add({ key: loadKey, promise });
      }
    }),
    loaded(input) {
      return runLoaded(refs, queryName, queryDef, resolveInput(input, arguments.length));
    },
    subscribe: ((...args) => {
      if (args.length === 1 && typeof args[0] == "function")
        return subscribeToQuery(
          refs,
          queryName,
          queryDef,
          void 0,
          void 0,
          args[0]
        );
      if (args.length === 2 && typeof args[0] == "function" && typeof args[1] == "function")
        return subscribeToQuery(
          refs,
          queryName,
          queryDef,
          void 0,
          args[0],
          args[1]
        );
      let [input, selectorOrCallback, maybeCallback] = args;
      return subscribeToQuery(
        refs,
        queryName,
        queryDef,
        input,
        maybeCallback ? selectorOrCallback : void 0,
        maybeCallback ?? selectorOrCallback
      );
    })
  };
}
function subscribeToQuery(refs, queryName, queryDef, rawInput, selector, callback) {
  let active = !0, validatedInput;
  try {
    validatedInput = validateQueryInput(refs, queryName, queryDef, rawInput);
  } catch (error) {
    return callback(
      buildQueryState(void 0, { status: "error", error: toError(error), loadStatus: "idle" })
    ), () => {
      active = !1;
    };
  }
  let lifecycle = y({
    status: queryDef.load ? "pending" : "success",
    error: void 0,
    loadStatus: "idle"
  }), loadTeardown;
  if (queryDef.load) {
    let epoch = 0;
    loadTeardown = j(() => {
      let myEpoch = ++epoch, isCurrent = () => myEpoch === epoch, previous = o(() => lifecycle.value);
      lifecycle.value = {
        status: previous.status,
        error: previous.error,
        loadStatus: "loading"
      }, runReactiveLoad(refs, queryName, queryDef, validatedInput, isCurrent).then(
        () => {
          isCurrent() && (lifecycle.value = { status: "success", error: void 0, loadStatus: "idle" });
        },
        (error) => {
          isCurrent() && (lifecycle.value = { status: "error", error: toError(error), loadStatus: "idle" });
        }
      );
    });
  }
  let comp = g(() => {
    let output = runHandlerSync(
      refs,
      queryName,
      queryDef,
      validatedInput,
      refs.defaultQueries,
      refs.registryApi.getService
    );
    if (selector) {
      let validated = o(() => validateQueryOutput(refs, queryName, queryDef, output));
      return selector(output), detachSnapshot(selector(validated));
    }
    return detachSnapshot(validateQueryOutput(refs, queryName, queryDef, output));
  }), hasEmitted = !1, lastEmitted, lastData, teardown = j(() => {
    let life = lifecycle.value, data, status = life.status, error = life.error;
    try {
      data = comp.value, lastData = data;
    } catch (handlerError) {
      data = lastData, status = "error", error = toError(handlerError);
    }
    if (!active)
      return;
    let state = buildQueryState(data, { status, error, loadStatus: life.loadStatus });
    hasEmitted && isEqual(state, lastEmitted) || (hasEmitted = !0, lastEmitted = state, callback(state));
  });
  return () => {
    active = !1, teardown(), loadTeardown?.();
  };
}
function buildQueries(refs) {
  let result = {};
  for (let [name, queryDef] of refs.queryDefinitions)
    result[name] = createDefaultQuery(refs, name, queryDef);
  return result;
}

// src/shared/open-service/service-sync.ts
function isNewer(incoming, local) {
  return incoming.version !== local.version ? incoming.version > local.version : incoming.clientId > local.clientId;
}
var FORBIDDEN_KEYS = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]);
function isPlainObject(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
function applyStatePatch(target, source, options) {
  if (!options.preserveMissingKeys)
    for (let key of Object.keys(target))
      FORBIDDEN_KEYS.has(key) || Object.prototype.hasOwnProperty.call(source, key) || delete target[key];
  for (let key of Object.keys(source)) {
    if (FORBIDDEN_KEYS.has(key))
      continue;
    let sourceValue = source[key], tarvalue = target[key];
    isPlainObject(sourceValue) && isPlainObject(tarvalue) ? applyStatePatch(tarvalue, sourceValue, options) : tarvalue !== sourceValue && (target[key] = sourceValue);
  }
}
function createSnapshotReconciler(options) {
  let { setState, initialStamp } = options, localStamp = initialStamp;
  return {
    get stamp() {
      return localStamp;
    },
    advanceLocal(clientId) {
      return localStamp = { version: localStamp.version + 1, clientId }, localStamp;
    },
    tryAdopt(incoming, state) {
      return isNewer(incoming, localStamp) ? (localStamp = { version: incoming.version, clientId: incoming.clientId }, setState((current) => applyStatePatch(current, state, { preserveMissingKeys: !1 })), !0) : !1;
    }
  };
}

// src/shared/open-service/service-runtime.ts
function normalizeStaticStoragePath(serviceId, name, rawPath) {
  let segments = rawPath.replaceAll("\\", "/").split("/").filter((segment) => segment.length > 0 && segment !== ".");
  if (segments.length === 0 || segments.some((segment) => segment === ".."))
    throw new OpenServiceInvalidStaticPathError({ serviceId, name, path: rawPath });
  return segments.join("/");
}
function resolveStaticPath(serviceId, name, queryDef, input) {
  let rawPath = queryDef.staticPath(input), relativePath = normalizeStaticStoragePath(serviceId, name, rawPath);
  return `${serviceId}/${relativePath}`;
}
function createCommandSelf(state) {
  return {
    get state() {
      return state;
    },
    setState(mutate) {
      n(() => {
        mutate(state);
      });
    },
    queries: {},
    commands: {}
  };
}
function buildCommands(serviceId, commands, createCommandCtx) {
  return Object.fromEntries(
    Object.entries(commands).map(([name, def]) => [
      name,
      async (input) => {
        if (!def.handler)
          throw new OpenServiceUnimplementedOperationError({
            kind: "command",
            serviceId,
            name
          });
        let validatedInput = await validateSchema(def.input, input, {
          kind: "command",
          serviceId,
          name,
          phase: "input"
        }), output = await def.handler(validatedInput, createCommandCtx());
        return validateSchema(def.output, output, {
          kind: "command",
          serviceId,
          name,
          phase: "output"
        });
      }
    ])
  );
}
function buildQueryDefinitionsWithStaticLoader(serviceId, queries, staticLoader, setState) {
  return new Map(
    Object.entries(queries).map(([name, queryDef]) => {
      if (!queryDef.staticPath)
        return [name, queryDef];
      let { staticPath } = queryDef;
      return [
        name,
        {
          ...queryDef,
          load: async (input) => {
            let logicalPath = resolveStaticPath(serviceId, name, { staticPath }, input), snapshot = await staticLoader(logicalPath, {
              serviceId,
              queryName: name,
              input
            });
            setState((state) => {
              applyStatePatch(state, snapshot, {
                preserveMissingKeys: !0
              });
            });
          }
        }
      ];
    })
  );
}
function createServiceRuntime(def, runtimeOptions, initialState = def.initialState) {
  let rawState = initialState, state = l2(rawState), getStateSnapshot = () => structuredClone(rawState), commandSelf = createCommandSelf(state), { registryApi, staticLoader } = runtimeOptions, createCommandCtx = () => ({
    self: commandSelf,
    getService: registryApi.getService
  }), commands = buildCommands(def.id, def.commands, createCommandCtx);
  commandSelf.commands = commands;
  let loadCommands = commands, remoteCommandNames = /* @__PURE__ */ new Set(), queryDefinitions = staticLoader ? buildQueryDefinitionsWithStaticLoader(
    def.id,
    def.queries,
    staticLoader,
    commandSelf.setState
  ) : new Map(
    Object.entries(def.queries)
  ), defaultQueries = {}, reactiveLoadQueries = {}, buildGatedCommands = (isCurrent) => {
    let gatedSelf = {
      get state() {
        return state;
      },
      setState(mutate) {
        isCurrent() && n(() => {
          mutate(state);
        });
      },
      queries: defaultQueries,
      commands: {}
    }, gated = buildCommands(def.id, def.commands, () => ({
      self: gatedSelf,
      getService: registryApi.getService
    }));
    return gatedSelf.commands = gated, remoteCommandNames.size === 0 ? gated : Object.fromEntries(
      Object.keys(def.commands).map((name) => [
        name,
        remoteCommandNames.has(name) ? loadCommands[name] : gated[name]
      ])
    );
  }, refs = {
    serviceId: def.id,
    commandSelf,
    state,
    registryApi,
    queryDefinitions,
    defaultQueries,
    reactiveLoadQueries,
    getLoadCommands: () => loadCommands,
    buildGatedCommands
  }, builtQueries = buildQueries(refs);
  for (let [name, query] of Object.entries(builtQueries))
    defaultQueries[name] = query;
  for (let [name, query] of Object.entries(buildReactiveLoadQueries(refs)))
    reactiveLoadQueries[name] = query;
  commandSelf.queries = defaultQueries;
  let queries = defaultQueries, queryCtx = { self: {
    get state() {
      return state;
    },
    queries: defaultQueries
  }, getService: registryApi.getService }, loadCtxForStatic = {
    self: {
      get state() {
        return state;
      },
      queries: defaultQueries,
      commands
    },
    getService: registryApi.getService
  };
  return {
    getStateSnapshot,
    commandSelf,
    queryCtx,
    loadCtxForStatic,
    commands,
    queries,
    runLoadOnce: async (queryName, validatedInput) => {
      let queryDef = queryDefinitions.get(queryName);
      if (!queryDef || !queryDef.load)
        return;
      let loadKey = makeLoadKey(def.id, queryName, validatedInput), ancestorChain = /* @__PURE__ */ new Set([loadKey]), previous = inFlightLoads.get(loadKey), promise = Promise.resolve().then(() => runLoadBody(refs, queryName, queryDef, validatedInput, ancestorChain)).finally(() => {
        inFlightLoads.get(loadKey) === promise && (previous ? inFlightLoads.set(loadKey, previous) : inFlightLoads.delete(loadKey));
      });
      inFlightLoads.set(loadKey, promise), await promise;
    },
    attachChannelCommands: (channelCommands, implementedCommandNames) => {
      loadCommands = channelCommands, remoteCommandNames.clear();
      for (let name of Object.keys(def.commands))
        implementedCommandNames.has(name) || remoteCommandNames.add(name);
    }
  };
}

// src/shared/open-service/service-error-serialization.ts
var ERROR_MARKER = "__openServiceError__", RESERVED_KEYS = /* @__PURE__ */ new Set([ERROR_MARKER, "name", "message", "stack", "cause"]);
function isPlainObject2(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
function isSerializedError(value) {
  return isPlainObject2(value) && value[ERROR_MARKER] === !0;
}
function toTransportSafe(value) {
  if (value instanceof Error)
    return serializeError(value);
  if (Array.isArray(value))
    return value.map((entry) => toTransportSafe(entry));
  if (isPlainObject2(value)) {
    let result = {};
    for (let [key, entry] of Object.entries(value))
      result[key] = toTransportSafe(entry);
    return result;
  }
  if (value === null)
    return null;
  let kind = typeof value;
  if (kind === "string" || kind === "number" || kind === "boolean")
    return value;
  if (kind === "bigint")
    return value.toString();
}
function serializeError(value) {
  if (!(value instanceof Error))
    return { [ERROR_MARKER]: !0, name: "Error", message: String(value) };
  let properties = {};
  for (let key of Object.keys(value))
    RESERVED_KEYS.has(key) || (properties[key] = toTransportSafe(value[key]));
  return {
    [ERROR_MARKER]: !0,
    name: value.name,
    message: value.message,
    ...value.stack !== void 0 ? { stack: value.stack } : {},
    ...value.cause !== void 0 ? { cause: toTransportSafe(value.cause) } : {},
    ...Object.keys(properties).length > 0 ? { properties } : {}
  };
}
function fromTransportSafe(value) {
  if (isSerializedError(value))
    return deserializeError(value);
  if (Array.isArray(value))
    return value.map((entry) => fromTransportSafe(entry));
  if (isPlainObject2(value)) {
    let result = {};
    for (let [key, entry] of Object.entries(value))
      result[key] = fromTransportSafe(entry);
    return result;
  }
  return value;
}
function deserializeError(serialized) {
  let error = new Error(serialized.message);
  if (error.name = serialized.name, serialized.stack !== void 0 && (error.stack = serialized.stack), "cause" in serialized && (error.cause = fromTransportSafe(serialized.cause)), serialized.properties)
    for (let [key, value] of Object.entries(serialized.properties))
      error[key] = fromTransportSafe(value);
  return error;
}

// src/shared/open-service/service-transport.ts
var REMOTE_COMMAND_ACK_TIMEOUT_MS = 300;
function wrapCommandsForBroadcast(commands, context) {
  let { serviceId, ownClientId, reconciler, getSnapshot, channel } = context;
  return Object.fromEntries(
    Object.entries(commands).map(([name, cmd]) => [
      name,
      async (input) => {
        let result = await cmd(input), stamp = reconciler.advanceLocal(ownClientId);
        return channel.emit(SERVICE_PATCHES, {
          serviceId,
          state: getSnapshot(),
          version: stamp.version,
          clientId: stamp.clientId
        }), result;
      }
    ])
  );
}
function connectRuntimeToChannel(context) {
  let { serviceId, ownClientId, reconciler, getSnapshot, channel, relay } = context, emitSyncStart = () => {
    channel.emit(SERVICE_SYNC_START, {
      serviceId,
      clientId: ownClientId
    });
  }, relayAdopted = () => {
    channel.emit(SERVICE_PATCHES, {
      serviceId,
      state: getSnapshot(),
      version: reconciler.stamp.version,
      clientId: reconciler.stamp.clientId
    });
  }, adoptPeerSnapshot = (snapshot) => {
    let adopted = reconciler.tryAdopt(
      { version: snapshot.version, clientId: snapshot.clientId },
      snapshot.state
    );
    return adopted && relay && relayAdopted(), adopted;
  }, onSyncStart = (payload) => {
    let request = safeParse(syncStartSchema, payload);
    !request.success || request.output.serviceId !== serviceId || request.output.clientId === ownClientId || channel.emit(SERVICE_SYNC_START_REPLY, {
      serviceId,
      state: getSnapshot(),
      version: reconciler.stamp.version,
      clientId: reconciler.stamp.clientId
    });
  }, onSyncStartReply = (payload) => {
    let snapshot = safeParse(stampedSnapshotSchema, payload);
    !snapshot.success || snapshot.output.serviceId !== serviceId || adoptPeerSnapshot(snapshot.output);
  }, onPatches = (payload) => {
    let snapshot = safeParse(stampedSnapshotSchema, payload);
    !snapshot.success || snapshot.output.serviceId !== serviceId || adoptPeerSnapshot(snapshot.output);
  };
  return channel.on(SERVICE_SYNC_START, onSyncStart), channel.on(SERVICE_SYNC_START_REPLY, onSyncStartReply), channel.on(SERVICE_PATCHES, onPatches), emitSyncStart(), relay && reconciler.stamp.version > 0 && relayAdopted(), () => {
    channel.off(SERVICE_SYNC_START, onSyncStart), channel.off(SERVICE_SYNC_START_REPLY, onSyncStartReply), channel.off(SERVICE_PATCHES, onPatches);
  };
}
function connectCommandTransport(context) {
  let { serviceId, ownClientId, channel, localCommands, implementedCommandNames, commandNames } = context, pending = /* @__PURE__ */ new Map(), settle = (callId, apply) => {
    let entry = pending.get(callId);
    entry && (pending.delete(callId), clearTimeout(entry.noAckTimer), apply(entry));
  }, onInvoke = (payload) => {
    let parsed = safeParse(commandInvokeSchema, payload);
    if (!parsed.success || parsed.output.serviceId !== serviceId || !implementedCommandNames.has(parsed.output.commandName))
      return;
    let invoke = parsed.output;
    channel.emit(SERVICE_COMMAND_ACK, {
      serviceId,
      callId: invoke.callId,
      clientId: ownClientId
    }), Promise.resolve().then(() => localCommands[invoke.commandName](invoke.input)).then(
      (result) => {
        channel.emit(SERVICE_COMMAND_RESULT, {
          serviceId,
          callId: invoke.callId,
          result,
          clientId: ownClientId
        });
      },
      (error) => {
        channel.emit(SERVICE_COMMAND_ERROR, {
          serviceId,
          callId: invoke.callId,
          error: serializeError(error),
          clientId: ownClientId
        });
      }
    );
  }, onResult = (payload) => {
    let result = safeParse(commandResultSchema, payload);
    !result.success || result.output.serviceId !== serviceId || settle(result.output.callId, (entry) => entry.resolve(result.output.result));
  }, onError = (payload) => {
    let failure = safeParse(commandErrorSchema, payload);
    !failure.success || failure.output.serviceId !== serviceId || settle(failure.output.callId, (entry) => entry.reject(deserializeError(failure.output.error)));
  }, onAck = (payload) => {
    let ack = safeParse(commandAckSchema, payload);
    if (!ack.success || ack.output.serviceId !== serviceId)
      return;
    let entry = pending.get(ack.output.callId);
    entry && clearTimeout(entry.noAckTimer);
  };
  channel.on(SERVICE_COMMAND_INVOKE, onInvoke), channel.on(SERVICE_COMMAND_RESULT, onResult), channel.on(SERVICE_COMMAND_ERROR, onError), channel.on(SERVICE_COMMAND_ACK, onAck);
  let requestRemote = (commandName, input) => {
    let callId = generateClientId();
    return new Promise((resolve, reject) => {
      let noAckTimer = setTimeout(() => {
        settle(
          callId,
          (entry) => entry.reject(
            new OpenServiceRemoteCommandUnhandledError({
              serviceId,
              commandName: entry.commandName
            })
          )
        );
      }, REMOTE_COMMAND_ACK_TIMEOUT_MS);
      pending.set(callId, { commandName, resolve, reject, noAckTimer }), channel.emit(SERVICE_COMMAND_INVOKE, {
        serviceId,
        commandName,
        input,
        callId,
        clientId: ownClientId
      });
    });
  }, commands = {};
  for (let name of commandNames)
    commands[name] = implementedCommandNames.has(name) ? localCommands[name] : (input) => requestRemote(name, input);
  return {
    commands,
    disconnect: () => {
      channel.off(SERVICE_COMMAND_INVOKE, onInvoke), channel.off(SERVICE_COMMAND_RESULT, onResult), channel.off(SERVICE_COMMAND_ERROR, onError), channel.off(SERVICE_COMMAND_ACK, onAck);
      for (let [, entry] of pending)
        clearTimeout(entry.noAckTimer), entry.reject(new OpenServiceRemoteCommandDisconnectedError({ serviceId }));
      pending.clear();
    }
  };
}
function connectServiceToChannel(context) {
  let {
    serviceId,
    ownClientId,
    reconciler,
    getSnapshot,
    channel,
    relay,
    commands,
    implementedCommandNames,
    commandNames,
    runtime
  } = context, broadcastCommands = wrapCommandsForBroadcast(commands, {
    serviceId,
    ownClientId,
    reconciler,
    getSnapshot,
    channel
  }), commandTransport = connectCommandTransport({
    serviceId,
    ownClientId,
    channel,
    localCommands: broadcastCommands,
    implementedCommandNames,
    commandNames
  }), disconnectSync = connectRuntimeToChannel({
    serviceId,
    ownClientId,
    reconciler,
    getSnapshot,
    channel,
    relay
  });
  return runtime.attachChannelCommands(commandTransport.commands, implementedCommandNames), {
    commands: commandTransport.commands,
    disconnect: () => {
      disconnectSync(), commandTransport.disconnect();
    }
  };
}

// src/shared/open-service/service-registry.ts
var REGISTRY_SYMBOL = /* @__PURE__ */ Symbol.for("storybook.open-service.registry");
function getRegistry() {
  let registryGlobal = globalThis;
  return registryGlobal[REGISTRY_SYMBOL] ??= /* @__PURE__ */ new Map(), registryGlobal[REGISTRY_SYMBOL];
}
function describeDefinition(definition) {
  return {
    id: definition.id,
    description: definition.description,
    queries: Object.fromEntries(
      Object.entries(definition.queries).filter(([, query]) => !query.internal).map(([name, query]) => [
        name,
        {
          name,
          description: query.description,
          input: query.input,
          output: query.output,
          ...query.staticPath ? { staticPath: !0 } : {}
        }
      ])
    ),
    commands: Object.fromEntries(
      Object.entries(definition.commands).filter(([, command]) => !command.internal).map(([name, command]) => [
        name,
        {
          name,
          description: command.description,
          input: command.input,
          output: command.output
        }
      ])
    )
  };
}
function summarizeDescriptor(descriptor) {
  return {
    id: descriptor.id,
    description: descriptor.description,
    queryNames: Object.keys(descriptor.queries),
    commandNames: Object.keys(descriptor.commands)
  };
}
function applyRegistration(definition, registration) {
  return registration ? {
    ...definition,
    queries: Object.fromEntries(
      Object.entries(definition.queries).map(([name, query]) => {
        let override = registration.queries?.[name];
        return [
          name,
          override && "staticInputs" in override ? { ...query, staticInputs: override.staticInputs } : query
        ];
      })
    ),
    commands: Object.fromEntries(
      Object.entries(definition.commands).map(([name, command]) => {
        let override = registration.commands?.[name];
        return [
          name,
          override && "handler" in override ? { ...command, handler: override.handler } : command
        ];
      })
    )
  } : definition;
}
var serviceRegistryApi = {
  listServices,
  describeService,
  getService
};
function registerService(definition, registration, { relay = !1, staticLoader } = {}) {
  let registry = getRegistry(), existingEntry = registry.get(definition.id);
  if (existingEntry)
    return existingEntry.instance;
  let ownClientId = generateClientId(), resolvedDefinition = applyRegistration(definition, registration), runtime = createServiceRuntime(
    resolvedDefinition,
    { registryApi: serviceRegistryApi, staticLoader },
    structuredClone(resolvedDefinition.initialState)
  ), reconciler = createSnapshotReconciler({
    setState: (mutate) => runtime.commandSelf.setState((state) => mutate(state)),
    initialStamp: { version: 0, clientId: ownClientId }
  }), getSnapshot = () => runtime.getStateSnapshot(), descriptor = describeDefinition(resolvedDefinition), channel = getChannel();
  if (!channel)
    throw new OpenServiceMissingChannelError({ serviceId: definition.id });
  let implementedCommandNames = new Set(
    Object.entries(resolvedDefinition.commands).filter(([, command]) => typeof command.handler == "function").map(([name]) => name)
  ), { commands, disconnect } = connectServiceToChannel({
    serviceId: definition.id,
    ownClientId,
    reconciler,
    getSnapshot,
    channel,
    relay,
    commands: runtime.commands,
    implementedCommandNames,
    commandNames: Object.keys(resolvedDefinition.commands),
    runtime
  }), instance = {
    queries: runtime.queries,
    commands,
    ...serviceRegistryApi
  };
  return registry.set(definition.id, {
    definition: resolvedDefinition,
    instance,
    descriptor,
    summary: summarizeDescriptor(descriptor),
    disconnect
  }), instance;
}
async function listServices() {
  return Array.from(getRegistry().values()).filter(({ definition }) => !definition.internal).map(({ summary }) => summary);
}
async function describeService(serviceId) {
  let entry = getRegistry().get(serviceId);
  if (!entry)
    throw new OpenServiceMissingServiceError({ serviceId });
  return entry.descriptor;
}
function getService(serviceId) {
  let entry = getRegistry().get(serviceId);
  if (!entry)
    throw new OpenServiceMissingServiceError({ serviceId });
  return entry.instance;
}

// src/shared/open-service/static-fetch.ts
var STATIC_SERVICES_PREFIX = "/services/";
function shouldUseBrowserStaticLoader() {
  return globalThis.CONFIG_TYPE === "PRODUCTION";
}
function createBrowserStaticLoader() {
  if (shouldUseBrowserStaticLoader())
    return async (logicalPath, context) => {
      let url = `${STATIC_SERVICES_PREFIX}${logicalPath}`, res;
      try {
        res = await fetch(url);
      } catch (cause) {
        throw new OpenServiceStaticSnapshotLoadError({ ...context, logicalPath, url, cause });
      }
      if (!res.ok) {
        let cause = { status: res.status, statusText: res.statusText };
        throw new OpenServiceStaticSnapshotLoadError({
          ...context,
          logicalPath,
          url,
          cause,
          status: res.status,
          statusText: res.statusText
        });
      }
      let snapshot;
      try {
        snapshot = await res.json();
      } catch (cause) {
        throw new OpenServiceStaticSnapshotLoadError({ ...context, logicalPath, url, cause });
      }
      if (snapshot && typeof snapshot == "object" && !Array.isArray(snapshot))
        return snapshot;
      throw new OpenServiceStaticSnapshotInvalidError({
        ...context,
        logicalPath,
        url,
        received: snapshot
      });
    };
}

export {
  array,
  custom,
  looseObject,
  object,
  optional,
  record,
  string,
  undefined_,
  void_,
  registerService,
  getService,
  createBrowserStaticLoader
};
