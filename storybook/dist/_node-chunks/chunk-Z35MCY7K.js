import CJS_COMPAT_NODE_URL_o3kjpxmk9t from 'node:url';
import CJS_COMPAT_NODE_PATH_o3kjpxmk9t from 'node:path';
import CJS_COMPAT_NODE_MODULE_o3kjpxmk9t from "node:module";

var __filename = CJS_COMPAT_NODE_URL_o3kjpxmk9t.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_o3kjpxmk9t.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_o3kjpxmk9t.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------

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
function _joinExpects(values$1, separator) {
  let list = [...new Set(values$1)];
  return list.length > 1 ? `(${list.join(` ${separator} `)})` : list[0] ?? "never";
}
function getDotPath(issue) {
  if (issue.path) {
    let key = "";
    for (let item of issue.path) if (typeof item.key == "string" || typeof item.key == "number") key ? key += `.${item.key}` : key += item.key;
    else return null;
    return key;
  }
  return null;
}
var EMOJI_REGEX = new RegExp("^(?:[\\u{1F1E6}-\\u{1F1FF}]{2}|\\u{1F3F4}[\\u{E0061}-\\u{E007A}]{2}[\\u{E0030}-\\u{E0039}\\u{E0061}-\\u{E007A}]{1,3}\\u{E007F}|(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|(?![\\p{Emoji_Modifier_Base}\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation})(?:\\u200D(?:\\p{Emoji}\\uFE0F\\u20E3?|\\p{Emoji_Modifier_Base}\\p{Emoji_Modifier}?|(?![\\p{Emoji_Modifier_Base}\\u{1F1E6}-\\u{1F1FF}])\\p{Emoji_Presentation}))*)+$", "u");
function description(description_) {
  return {
    kind: "metadata",
    type: "description",
    reference: description,
    description: description_
  };
}
function integer(message$1) {
  return {
    kind: "validation",
    type: "integer",
    reference: integer,
    async: !1,
    expects: null,
    requirement: Number.isInteger,
    message: message$1,
    "~run"(dataset, config$1) {
      return dataset.typed && !this.requirement(dataset.value) && _addIssue(this, "integer", dataset, config$1), dataset;
    }
  };
}
function maxValue(requirement, message$1) {
  return {
    kind: "validation",
    type: "max_value",
    reference: maxValue,
    async: !1,
    expects: `<=${requirement instanceof Date ? requirement.toJSON() : _stringify(requirement)}`,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      return dataset.typed && !(dataset.value <= this.requirement) && _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value) }), dataset;
    }
  };
}
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
function regex(requirement, message$1) {
  return {
    kind: "validation",
    type: "regex",
    reference: regex,
    async: !1,
    expects: `${requirement}`,
    requirement,
    message: message$1,
    "~run"(dataset, config$1) {
      return dataset.typed && !this.requirement.test(dataset.value) && _addIssue(this, "format", dataset, config$1), dataset;
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
function transform(operation) {
  return {
    kind: "transformation",
    type: "transform",
    reference: transform,
    async: !1,
    operation,
    "~run"(dataset) {
      return dataset.value = this.operation(dataset.value), dataset;
    }
  };
}
function trim() {
  return {
    kind: "transformation",
    type: "trim",
    reference: trim,
    async: !1,
    "~run"(dataset) {
      return dataset.value = dataset.value.trim(), dataset;
    }
  };
}
var ABORT_EARLY_CONFIG = { abortEarly: !0 };
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
function boolean(message$1) {
  return {
    kind: "schema",
    type: "boolean",
    reference: boolean,
    expects: "boolean",
    async: !1,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return typeof dataset.value == "boolean" ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
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
function lazy(getter) {
  return {
    kind: "schema",
    type: "lazy",
    reference: lazy,
    expects: "unknown",
    async: !1,
    getter,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return this.getter(dataset.value)["~run"](dataset, config$1);
    }
  };
}
function literal(literal_, message$1) {
  return {
    kind: "schema",
    type: "literal",
    reference: literal,
    expects: _stringify(literal_),
    async: !1,
    literal: literal_,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return dataset.value === this.literal ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
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
function picklist(options, message$1) {
  return {
    kind: "schema",
    type: "picklist",
    reference: picklist,
    expects: _joinExpects(options.map(_stringify), "|"),
    async: !1,
    options,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return this.options.includes(dataset.value) ? dataset.typed = !0 : _addIssue(this, "type", dataset, config$1), dataset;
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
function _subIssues(datasets) {
  let issues;
  if (datasets) for (let dataset of datasets) if (issues) for (let issue of dataset.issues) issues.push(issue);
  else issues = dataset.issues;
  return issues;
}
function union(options, message$1) {
  return {
    kind: "schema",
    type: "union",
    reference: union,
    expects: _joinExpects(options.map((option) => option.expects), "|"),
    async: !1,
    options,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let validDataset, typedDatasets, untypedDatasets;
      for (let schema of this.options) {
        let optionDataset = schema["~run"]({ value: dataset.value }, config$1);
        if (optionDataset.typed) if (optionDataset.issues) typedDatasets ? typedDatasets.push(optionDataset) : typedDatasets = [optionDataset];
        else {
          validDataset = optionDataset;
          break;
        }
        else untypedDatasets ? untypedDatasets.push(optionDataset) : untypedDatasets = [optionDataset];
      }
      if (validDataset) return validDataset;
      if (typedDatasets) {
        if (typedDatasets.length === 1) return typedDatasets[0];
        _addIssue(this, "type", dataset, config$1, { issues: _subIssues(typedDatasets) }), dataset.typed = !0;
      } else {
        if (untypedDatasets?.length === 1) return untypedDatasets[0];
        _addIssue(this, "type", dataset, config$1, { issues: _subIssues(untypedDatasets) });
      }
      return dataset;
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
function variant(key, options, message$1) {
  return {
    kind: "schema",
    type: "variant",
    reference: variant,
    expects: "Object",
    async: !1,
    key,
    options,
    message: message$1,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      let input = dataset.value;
      if (input && typeof input == "object") {
        let outputDataset, maxDiscriminatorPriority = 0, invalidDiscriminatorKey = this.key, expectedDiscriminators = [], parseOptions = (variant$1, allKeys) => {
          for (let schema of variant$1.options) {
            if (schema.type === "variant") parseOptions(schema, new Set(allKeys).add(schema.key));
            else {
              let keysAreValid = !0, currentPriority = 0;
              for (let currentKey of allKeys) {
                let discriminatorSchema = schema.entries[currentKey];
                if (currentKey in input ? discriminatorSchema["~run"]({
                  typed: !1,
                  value: input[currentKey]
                }, ABORT_EARLY_CONFIG).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
                  keysAreValid = !1, invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input)) && (maxDiscriminatorPriority = currentPriority, invalidDiscriminatorKey = currentKey, expectedDiscriminators = []), invalidDiscriminatorKey === currentKey && expectedDiscriminators.push(schema.entries[currentKey].expects);
                  break;
                }
                currentPriority++;
              }
              if (keysAreValid) {
                let optionDataset = schema["~run"]({ value: input }, config$1);
                (!outputDataset || !outputDataset.typed && optionDataset.typed) && (outputDataset = optionDataset);
              }
            }
            if (outputDataset && !outputDataset.issues) break;
          }
        };
        if (parseOptions(this, /* @__PURE__ */ new Set([this.key])), outputDataset) return outputDataset;
        _addIssue(this, "type", dataset, config$1, {
          input: input[invalidDiscriminatorKey],
          expected: _joinExpects(expectedDiscriminators, "|"),
          path: [{
            type: "object",
            origin: "value",
            input,
            key: invalidDiscriminatorKey,
            value: input[invalidDiscriminatorKey]
          }]
        });
      } else _addIssue(this, "type", dataset, config$1);
      return dataset;
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
function message(schema, message_) {
  return {
    ...schema,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config$1) {
      return schema["~run"](dataset, {
        ...config$1,
        message: message_
      });
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
function summarize(issues) {
  let summary = "";
  for (let issue of issues) {
    summary && (summary += `
`), summary += `\xD7 ${issue.message}`;
    let dotPath = getDotPath(issue);
    dotPath && (summary += `
  \u2192 at ${dotPath}`);
  }
  return summary;
}

export {
  description,
  integer,
  maxValue,
  minValue,
  regex,
  safeInteger,
  transform,
  trim,
  array,
  boolean,
  custom,
  lazy,
  literal,
  looseObject,
  number,
  object,
  optional,
  picklist,
  record,
  string,
  undefined_,
  union,
  unknown,
  variant,
  void_,
  message,
  pipe,
  safeParse,
  summarize
};
