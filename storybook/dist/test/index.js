import {
  assertTypes,
  diff,
  getDefaultExportFromCjs,
  getType,
  isObject,
  noop,
  printDiffOrStringify,
  processError,
  stringify
} from "../_browser-chunks/chunk-QGGIYUMM.js";
import {
  require_picocolors_browser
} from "../_browser-chunks/chunk-SC67XZST.js";
import {
  dedent
} from "../_browser-chunks/chunk-3LY4VQVK.js";
import {
  __commonJS,
  __export,
  __toESM
} from "../_browser-chunks/chunk-IMSF75WX.js";

// ../../node_modules/min-indent/index.js
var require_min_indent = __commonJS({
  "../../node_modules/min-indent/index.js"(exports, module) {
    "use strict";
    module.exports = (string) => {
      let match = string.match(/^[ \t]*(?=\S)/gm);
      return match ? match.reduce((r, a2) => Math.min(r, a2.length), 1 / 0) : 0;
    };
  }
});

// ../../node_modules/strip-indent/index.js
var require_strip_indent = __commonJS({
  "../../node_modules/strip-indent/index.js"(exports, module) {
    "use strict";
    var minIndent = require_min_indent();
    module.exports = (string) => {
      let indent = minIndent(string);
      if (indent === 0)
        return string;
      let regex = new RegExp(`^[ \\t]{${indent}}`, "gm");
      return string.replace(regex, "");
    };
  }
});

// ../../node_modules/indent-string/index.js
var require_indent_string = __commonJS({
  "../../node_modules/indent-string/index.js"(exports, module) {
    "use strict";
    module.exports = (string, count = 1, options) => {
      if (options = {
        indent: " ",
        includeEmptyLines: !1,
        ...options
      }, typeof string != "string")
        throw new TypeError(
          `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
        );
      if (typeof count != "number")
        throw new TypeError(
          `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
        );
      if (typeof options.indent != "string")
        throw new TypeError(
          `Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
        );
      if (count === 0)
        return string;
      let regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
      return string.replace(regex, options.indent.repeat(count));
    };
  }
});

// ../../node_modules/redent/index.js
var require_redent = __commonJS({
  "../../node_modules/redent/index.js"(exports, module) {
    "use strict";
    var stripIndent = require_strip_indent(), indentString = require_indent_string();
    module.exports = (string, count = 0, options) => indentString(stripIndent(string), count, options);
  }
});

// ../../node_modules/aria-query/lib/util/iteratorProxy.js
var require_iteratorProxy = __commonJS({
  "../../node_modules/aria-query/lib/util/iteratorProxy.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    function iteratorProxy() {
      var values = this, index = 0, iter = {
        "@@iterator": function() {
          return iter;
        },
        next: function() {
          if (index < values.length) {
            var value = values[index];
            return index = index + 1, {
              done: !1,
              value
            };
          } else
            return {
              done: !0
            };
        }
      };
      return iter;
    }
    var _default = exports.default = iteratorProxy;
  }
});

// ../../node_modules/aria-query/lib/util/iterationDecorator.js
var require_iterationDecorator = __commonJS({
  "../../node_modules/aria-query/lib/util/iterationDecorator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = iterationDecorator;
    var _iteratorProxy = _interopRequireDefault(require_iteratorProxy());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof3(o) {
      "@babel/helpers - typeof";
      return _typeof3 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof3(o);
    }
    function iterationDecorator(collection, entries) {
      return typeof Symbol == "function" && _typeof3(Symbol.iterator) === "symbol" && Object.defineProperty(collection, Symbol.iterator, {
        value: _iteratorProxy.default.bind(entries)
      }), collection;
    }
  }
});

// ../../node_modules/aria-query/lib/ariaPropsMap.js
var require_ariaPropsMap = __commonJS({
  "../../node_modules/aria-query/lib/ariaPropsMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function _unsupportedIterableToArray(r, a2) {
      if (r) {
        if (typeof r == "string") return _arrayLikeToArray(r, a2);
        var t = {}.toString.call(r).slice(8, -1);
        return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
      }
    }
    function _arrayLikeToArray(r, a2) {
      (a2 == null || a2 > r.length) && (a2 = r.length);
      for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
      return n;
    }
    function _iterableToArrayLimit(r, l) {
      var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (t != null) {
        var e, n, i, u2, a2 = [], f3 = !0, o = !1;
        try {
          if (i = (t = t.call(r)).next, l === 0) {
            if (Object(t) !== t) return;
            f3 = !1;
          } else for (; !(f3 = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f3 = !0) ;
        } catch (r2) {
          o = !0, n = r2;
        } finally {
          try {
            if (!f3 && t.return != null && (u2 = t.return(), Object(u2) !== u2)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a2;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    var properties = [["aria-activedescendant", {
      type: "id"
    }], ["aria-atomic", {
      type: "boolean"
    }], ["aria-autocomplete", {
      type: "token",
      values: ["inline", "list", "both", "none"]
    }], ["aria-braillelabel", {
      type: "string"
    }], ["aria-brailleroledescription", {
      type: "string"
    }], ["aria-busy", {
      type: "boolean"
    }], ["aria-checked", {
      type: "tristate"
    }], ["aria-colcount", {
      type: "integer"
    }], ["aria-colindex", {
      type: "integer"
    }], ["aria-colspan", {
      type: "integer"
    }], ["aria-controls", {
      type: "idlist"
    }], ["aria-current", {
      type: "token",
      values: ["page", "step", "location", "date", "time", !0, !1]
    }], ["aria-describedby", {
      type: "idlist"
    }], ["aria-description", {
      type: "string"
    }], ["aria-details", {
      type: "id"
    }], ["aria-disabled", {
      type: "boolean"
    }], ["aria-dropeffect", {
      type: "tokenlist",
      values: ["copy", "execute", "link", "move", "none", "popup"]
    }], ["aria-errormessage", {
      type: "id"
    }], ["aria-expanded", {
      type: "boolean",
      allowundefined: !0
    }], ["aria-flowto", {
      type: "idlist"
    }], ["aria-grabbed", {
      type: "boolean",
      allowundefined: !0
    }], ["aria-haspopup", {
      type: "token",
      values: [!1, !0, "menu", "listbox", "tree", "grid", "dialog"]
    }], ["aria-hidden", {
      type: "boolean",
      allowundefined: !0
    }], ["aria-invalid", {
      type: "token",
      values: ["grammar", !1, "spelling", !0]
    }], ["aria-keyshortcuts", {
      type: "string"
    }], ["aria-label", {
      type: "string"
    }], ["aria-labelledby", {
      type: "idlist"
    }], ["aria-level", {
      type: "integer"
    }], ["aria-live", {
      type: "token",
      values: ["assertive", "off", "polite"]
    }], ["aria-modal", {
      type: "boolean"
    }], ["aria-multiline", {
      type: "boolean"
    }], ["aria-multiselectable", {
      type: "boolean"
    }], ["aria-orientation", {
      type: "token",
      values: ["vertical", "undefined", "horizontal"]
    }], ["aria-owns", {
      type: "idlist"
    }], ["aria-placeholder", {
      type: "string"
    }], ["aria-posinset", {
      type: "integer"
    }], ["aria-pressed", {
      type: "tristate"
    }], ["aria-readonly", {
      type: "boolean"
    }], ["aria-relevant", {
      type: "tokenlist",
      values: ["additions", "all", "removals", "text"]
    }], ["aria-required", {
      type: "boolean"
    }], ["aria-roledescription", {
      type: "string"
    }], ["aria-rowcount", {
      type: "integer"
    }], ["aria-rowindex", {
      type: "integer"
    }], ["aria-rowspan", {
      type: "integer"
    }], ["aria-selected", {
      type: "boolean",
      allowundefined: !0
    }], ["aria-setsize", {
      type: "integer"
    }], ["aria-sort", {
      type: "token",
      values: ["ascending", "descending", "none", "other"]
    }], ["aria-valuemax", {
      type: "number"
    }], ["aria-valuemin", {
      type: "number"
    }], ["aria-valuenow", {
      type: "number"
    }], ["aria-valuetext", {
      type: "string"
    }]], ariaPropsMap = {
      entries: function() {
        return properties;
      },
      forEach: function(fn3) {
        for (var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _i = 0, _properties = properties; _i < _properties.length; _i++) {
          var _properties$_i = _slicedToArray(_properties[_i], 2), key = _properties$_i[0], values = _properties$_i[1];
          fn3.call(thisArg, values, key, properties);
        }
      },
      get: function(key) {
        var item = properties.filter(function(tuple) {
          return tuple[0] === key;
        })[0];
        return item && item[1];
      },
      has: function(key) {
        return !!ariaPropsMap.get(key);
      },
      keys: function() {
        return properties.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function() {
        return properties.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    }, _default = exports.default = (0, _iterationDecorator.default)(ariaPropsMap, ariaPropsMap.entries());
  }
});

// ../../node_modules/aria-query/lib/domMap.js
var require_domMap = __commonJS({
  "../../node_modules/aria-query/lib/domMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function _unsupportedIterableToArray(r, a2) {
      if (r) {
        if (typeof r == "string") return _arrayLikeToArray(r, a2);
        var t = {}.toString.call(r).slice(8, -1);
        return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
      }
    }
    function _arrayLikeToArray(r, a2) {
      (a2 == null || a2 > r.length) && (a2 = r.length);
      for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
      return n;
    }
    function _iterableToArrayLimit(r, l) {
      var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (t != null) {
        var e, n, i, u2, a2 = [], f3 = !0, o = !1;
        try {
          if (i = (t = t.call(r)).next, l === 0) {
            if (Object(t) !== t) return;
            f3 = !1;
          } else for (; !(f3 = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f3 = !0) ;
        } catch (r2) {
          o = !0, n = r2;
        } finally {
          try {
            if (!f3 && t.return != null && (u2 = t.return(), Object(u2) !== u2)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a2;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    var dom = [["a", {
      reserved: !1
    }], ["abbr", {
      reserved: !1
    }], ["acronym", {
      reserved: !1
    }], ["address", {
      reserved: !1
    }], ["applet", {
      reserved: !1
    }], ["area", {
      reserved: !1
    }], ["article", {
      reserved: !1
    }], ["aside", {
      reserved: !1
    }], ["audio", {
      reserved: !1
    }], ["b", {
      reserved: !1
    }], ["base", {
      reserved: !0
    }], ["bdi", {
      reserved: !1
    }], ["bdo", {
      reserved: !1
    }], ["big", {
      reserved: !1
    }], ["blink", {
      reserved: !1
    }], ["blockquote", {
      reserved: !1
    }], ["body", {
      reserved: !1
    }], ["br", {
      reserved: !1
    }], ["button", {
      reserved: !1
    }], ["canvas", {
      reserved: !1
    }], ["caption", {
      reserved: !1
    }], ["center", {
      reserved: !1
    }], ["cite", {
      reserved: !1
    }], ["code", {
      reserved: !1
    }], ["col", {
      reserved: !0
    }], ["colgroup", {
      reserved: !0
    }], ["content", {
      reserved: !1
    }], ["data", {
      reserved: !1
    }], ["datalist", {
      reserved: !1
    }], ["dd", {
      reserved: !1
    }], ["del", {
      reserved: !1
    }], ["details", {
      reserved: !1
    }], ["dfn", {
      reserved: !1
    }], ["dialog", {
      reserved: !1
    }], ["dir", {
      reserved: !1
    }], ["div", {
      reserved: !1
    }], ["dl", {
      reserved: !1
    }], ["dt", {
      reserved: !1
    }], ["em", {
      reserved: !1
    }], ["embed", {
      reserved: !1
    }], ["fieldset", {
      reserved: !1
    }], ["figcaption", {
      reserved: !1
    }], ["figure", {
      reserved: !1
    }], ["font", {
      reserved: !1
    }], ["footer", {
      reserved: !1
    }], ["form", {
      reserved: !1
    }], ["frame", {
      reserved: !1
    }], ["frameset", {
      reserved: !1
    }], ["h1", {
      reserved: !1
    }], ["h2", {
      reserved: !1
    }], ["h3", {
      reserved: !1
    }], ["h4", {
      reserved: !1
    }], ["h5", {
      reserved: !1
    }], ["h6", {
      reserved: !1
    }], ["head", {
      reserved: !0
    }], ["header", {
      reserved: !1
    }], ["hgroup", {
      reserved: !1
    }], ["hr", {
      reserved: !1
    }], ["html", {
      reserved: !0
    }], ["i", {
      reserved: !1
    }], ["iframe", {
      reserved: !1
    }], ["img", {
      reserved: !1
    }], ["input", {
      reserved: !1
    }], ["ins", {
      reserved: !1
    }], ["kbd", {
      reserved: !1
    }], ["keygen", {
      reserved: !1
    }], ["label", {
      reserved: !1
    }], ["legend", {
      reserved: !1
    }], ["li", {
      reserved: !1
    }], ["link", {
      reserved: !0
    }], ["main", {
      reserved: !1
    }], ["map", {
      reserved: !1
    }], ["mark", {
      reserved: !1
    }], ["marquee", {
      reserved: !1
    }], ["menu", {
      reserved: !1
    }], ["menuitem", {
      reserved: !1
    }], ["meta", {
      reserved: !0
    }], ["meter", {
      reserved: !1
    }], ["nav", {
      reserved: !1
    }], ["noembed", {
      reserved: !0
    }], ["noscript", {
      reserved: !0
    }], ["object", {
      reserved: !1
    }], ["ol", {
      reserved: !1
    }], ["optgroup", {
      reserved: !1
    }], ["option", {
      reserved: !1
    }], ["output", {
      reserved: !1
    }], ["p", {
      reserved: !1
    }], ["param", {
      reserved: !0
    }], ["picture", {
      reserved: !0
    }], ["pre", {
      reserved: !1
    }], ["progress", {
      reserved: !1
    }], ["q", {
      reserved: !1
    }], ["rp", {
      reserved: !1
    }], ["rt", {
      reserved: !1
    }], ["rtc", {
      reserved: !1
    }], ["ruby", {
      reserved: !1
    }], ["s", {
      reserved: !1
    }], ["samp", {
      reserved: !1
    }], ["script", {
      reserved: !0
    }], ["section", {
      reserved: !1
    }], ["select", {
      reserved: !1
    }], ["small", {
      reserved: !1
    }], ["source", {
      reserved: !0
    }], ["spacer", {
      reserved: !1
    }], ["span", {
      reserved: !1
    }], ["strike", {
      reserved: !1
    }], ["strong", {
      reserved: !1
    }], ["style", {
      reserved: !0
    }], ["sub", {
      reserved: !1
    }], ["summary", {
      reserved: !1
    }], ["sup", {
      reserved: !1
    }], ["table", {
      reserved: !1
    }], ["tbody", {
      reserved: !1
    }], ["td", {
      reserved: !1
    }], ["textarea", {
      reserved: !1
    }], ["tfoot", {
      reserved: !1
    }], ["th", {
      reserved: !1
    }], ["thead", {
      reserved: !1
    }], ["time", {
      reserved: !1
    }], ["title", {
      reserved: !0
    }], ["tr", {
      reserved: !1
    }], ["track", {
      reserved: !0
    }], ["tt", {
      reserved: !1
    }], ["u", {
      reserved: !1
    }], ["ul", {
      reserved: !1
    }], ["var", {
      reserved: !1
    }], ["video", {
      reserved: !1
    }], ["wbr", {
      reserved: !1
    }], ["xmp", {
      reserved: !1
    }]], domMap = {
      entries: function() {
        return dom;
      },
      forEach: function(fn3) {
        for (var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _i = 0, _dom = dom; _i < _dom.length; _i++) {
          var _dom$_i = _slicedToArray(_dom[_i], 2), key = _dom$_i[0], values = _dom$_i[1];
          fn3.call(thisArg, values, key, dom);
        }
      },
      get: function(key) {
        var item = dom.filter(function(tuple) {
          return tuple[0] === key;
        })[0];
        return item && item[1];
      },
      has: function(key) {
        return !!domMap.get(key);
      },
      keys: function() {
        return dom.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key = _ref2[0];
          return key;
        });
      },
      values: function() {
        return dom.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    }, _default = exports.default = (0, _iterationDecorator.default)(domMap, domMap.entries());
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js
var require_commandRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/commandRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var commandRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    }, _default = exports.default = commandRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js
var require_compositeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/compositeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var compositeRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    }, _default = exports.default = compositeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js
var require_inputRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/inputRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var inputRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null
      },
      relatedConcepts: [{
        concept: {
          name: "input"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget"]]
    }, _default = exports.default = inputRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js
var require_landmarkRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/landmarkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var landmarkRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = landmarkRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js
var require_rangeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/rangeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var rangeRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuemax": null,
        "aria-valuemin": null,
        "aria-valuenow": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = rangeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js
var require_roletypeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/roletypeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var roletypeRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {
        "aria-atomic": null,
        "aria-busy": null,
        "aria-controls": null,
        "aria-current": null,
        "aria-describedby": null,
        "aria-details": null,
        "aria-dropeffect": null,
        "aria-flowto": null,
        "aria-grabbed": null,
        "aria-hidden": null,
        "aria-keyshortcuts": null,
        "aria-label": null,
        "aria-labelledby": null,
        "aria-live": null,
        "aria-owns": null,
        "aria-relevant": null,
        "aria-roledescription": null
      },
      relatedConcepts: [{
        concept: {
          name: "role"
        },
        module: "XHTML"
      }, {
        concept: {
          name: "type"
        },
        module: "Dublin Core"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    }, _default = exports.default = roletypeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js
var require_sectionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/sectionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var sectionRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "frontmatter"
        },
        module: "DTB"
      }, {
        concept: {
          name: "level"
        },
        module: "DTB"
      }, {
        concept: {
          name: "level"
        },
        module: "SMIL"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = sectionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js
var require_sectionheadRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/sectionheadRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var sectionheadRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = sectionheadRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js
var require_selectRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/selectRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var selectRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "group"]]
    }, _default = exports.default = selectRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js
var require_structureRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/structureRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var structureRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    }, _default = exports.default = structureRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js
var require_widgetRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/widgetRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var widgetRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    }, _default = exports.default = widgetRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js
var require_windowRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/abstract/windowRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var windowRole = {
      abstract: !0,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-modal": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype"]]
    }, _default = exports.default = windowRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js
var require_ariaAbstractRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaAbstractRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _commandRole = _interopRequireDefault(require_commandRole()), _compositeRole = _interopRequireDefault(require_compositeRole()), _inputRole = _interopRequireDefault(require_inputRole()), _landmarkRole = _interopRequireDefault(require_landmarkRole()), _rangeRole = _interopRequireDefault(require_rangeRole()), _roletypeRole = _interopRequireDefault(require_roletypeRole()), _sectionRole = _interopRequireDefault(require_sectionRole()), _sectionheadRole = _interopRequireDefault(require_sectionheadRole()), _selectRole = _interopRequireDefault(require_selectRole()), _structureRole = _interopRequireDefault(require_structureRole()), _widgetRole = _interopRequireDefault(require_widgetRole()), _windowRole = _interopRequireDefault(require_windowRole());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ariaAbstractRoles = [["command", _commandRole.default], ["composite", _compositeRole.default], ["input", _inputRole.default], ["landmark", _landmarkRole.default], ["range", _rangeRole.default], ["roletype", _roletypeRole.default], ["section", _sectionRole.default], ["sectionhead", _sectionheadRole.default], ["select", _selectRole.default], ["structure", _structureRole.default], ["widget", _widgetRole.default], ["window", _windowRole.default]], _default = exports.default = ariaAbstractRoles;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js
var require_alertRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/alertRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var alertRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-atomic": "true",
        "aria-live": "assertive"
      },
      relatedConcepts: [{
        concept: {
          name: "alert"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = alertRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js
var require_alertdialogRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/alertdialogRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var alertdialogRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "alert"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "alert"], ["roletype", "window", "dialog"]]
    }, _default = exports.default = alertdialogRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js
var require_applicationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/applicationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var applicationRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "Device Independence Delivery Unit"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = applicationRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js
var require_articleRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/articleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var articleRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "article"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]]
    }, _default = exports.default = articleRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js
var require_bannerRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/bannerRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var bannerRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["scoped to the body element"],
          name: "header"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = bannerRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js
var require_blockquoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/blockquoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var blockquoteRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "blockquote"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = blockquoteRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js
var require_buttonRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/buttonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var buttonRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-pressed": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "button"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "image"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "reset"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "type",
            value: "submit"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "button"
        },
        module: "HTML"
      }, {
        concept: {
          name: "trigger"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    }, _default = exports.default = buttonRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js
var require_captionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/captionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var captionRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "caption"
        },
        module: "HTML"
      }],
      requireContextRole: ["figure", "grid", "table"],
      requiredContextRole: ["figure", "grid", "table"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = captionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js
var require_cellRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/cellRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var cellRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-colspan": null,
        "aria-rowindex": null,
        "aria-rowspan": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["ancestor table element has table role"],
          name: "td"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = cellRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js
var require_checkboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/checkboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var checkboxRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "checkbox"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "option"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input"]]
    }, _default = exports.default = checkboxRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js
var require_codeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/codeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var codeRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "code"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = codeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js
var require_columnheaderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/columnheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var columnheaderRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-sort": null
      },
      relatedConcepts: [{
        concept: {
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "col"
          }],
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "colgroup"
          }],
          name: "th"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
    }, _default = exports.default = columnheaderRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js
var require_comboboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/comboboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var comboboxRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-expanded": "false",
        "aria-haspopup": "listbox"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "email"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "search"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "tel"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "text"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "multiple"
          }, {
            constraints: ["undefined"],
            name: "size"
          }],
          constraints: ["the multiple attribute is not set and the size attribute does not have a value greater than 1"],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-controls": null,
        "aria-expanded": "false"
      },
      superClass: [["roletype", "widget", "input"]]
    }, _default = exports.default = comboboxRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js
var require_complementaryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/complementaryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var complementaryRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["scoped to the body element", "scoped to the main element"],
          name: "aside"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "aside"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          constraints: ["scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "aside"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = complementaryRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js
var require_contentinfoRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/contentinfoRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var contentinfoRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          constraints: ["scoped to the body element"],
          name: "footer"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = contentinfoRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js
var require_definitionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/definitionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var definitionRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dd"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = definitionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js
var require_deletionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/deletionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var deletionRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "del"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = deletionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js
var require_dialogRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/dialogRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var dialogRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dialog"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "window"]]
    }, _default = exports.default = dialogRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js
var require_directoryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/directoryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var directoryRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        module: "DAISY Guide"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]]
    }, _default = exports.default = directoryRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js
var require_documentRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/documentRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var documentRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "Device Independence Delivery Unit"
        }
      }, {
        concept: {
          name: "html"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = documentRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js
var require_emphasisRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/emphasisRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var emphasisRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "em"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = emphasisRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js
var require_feedRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/feedRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var feedRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["article"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "list"]]
    }, _default = exports.default = feedRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js
var require_figureRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/figureRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var figureRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "figure"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = figureRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/formRole.js
var require_formRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/formRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var formRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          name: "form"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          name: "form"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "name"
          }],
          name: "form"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = formRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js
var require_genericRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/genericRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var genericRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "a"
        },
        module: "HTML"
      }, {
        concept: {
          name: "area"
        },
        module: "HTML"
      }, {
        concept: {
          name: "aside"
        },
        module: "HTML"
      }, {
        concept: {
          name: "b"
        },
        module: "HTML"
      }, {
        concept: {
          name: "bdo"
        },
        module: "HTML"
      }, {
        concept: {
          name: "body"
        },
        module: "HTML"
      }, {
        concept: {
          name: "data"
        },
        module: "HTML"
      }, {
        concept: {
          name: "div"
        },
        module: "HTML"
      }, {
        concept: {
          constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "footer"
        },
        module: "HTML"
      }, {
        concept: {
          constraints: ["scoped to the main element", "scoped to a sectioning content element", "scoped to a sectioning root element other than body"],
          name: "header"
        },
        module: "HTML"
      }, {
        concept: {
          name: "hgroup"
        },
        module: "HTML"
      }, {
        concept: {
          name: "i"
        },
        module: "HTML"
      }, {
        concept: {
          name: "pre"
        },
        module: "HTML"
      }, {
        concept: {
          name: "q"
        },
        module: "HTML"
      }, {
        concept: {
          name: "samp"
        },
        module: "HTML"
      }, {
        concept: {
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          name: "small"
        },
        module: "HTML"
      }, {
        concept: {
          name: "span"
        },
        module: "HTML"
      }, {
        concept: {
          name: "u"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = genericRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js
var require_gridRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/gridRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var gridRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-multiselectable": null,
        "aria-readonly": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "structure", "section", "table"]]
    }, _default = exports.default = gridRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js
var require_gridcellRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/gridcellRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var gridcellRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-selected": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["ancestor table element has grid role", "ancestor table element has treegrid role"],
          name: "td"
        },
        module: "HTML"
      }],
      requireContextRole: ["row"],
      requiredContextRole: ["row"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "widget"]]
    }, _default = exports.default = gridcellRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js
var require_groupRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/groupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var groupRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-disabled": null
      },
      relatedConcepts: [{
        concept: {
          name: "details"
        },
        module: "HTML"
      }, {
        concept: {
          name: "fieldset"
        },
        module: "HTML"
      }, {
        concept: {
          name: "optgroup"
        },
        module: "HTML"
      }, {
        concept: {
          name: "address"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = groupRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js
var require_headingRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/headingRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var headingRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-level": "2"
      },
      relatedConcepts: [{
        concept: {
          name: "h1"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h2"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h3"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h4"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h5"
        },
        module: "HTML"
      }, {
        concept: {
          name: "h6"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-level": "2"
      },
      superClass: [["roletype", "structure", "sectionhead"]]
    }, _default = exports.default = headingRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js
var require_imgRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/imgRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var imgRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "alt"
          }],
          name: "img"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "alt"
          }],
          name: "img"
        },
        module: "HTML"
      }, {
        concept: {
          name: "imggroup"
        },
        module: "DTB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = imgRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js
var require_insertionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/insertionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var insertionRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "ins"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = insertionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js
var require_linkRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/linkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var linkRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "href"
          }],
          name: "a"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "href"
          }],
          name: "area"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    }, _default = exports.default = linkRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/listRole.js
var require_listRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/listRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var listRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menu"
        },
        module: "HTML"
      }, {
        concept: {
          name: "ol"
        },
        module: "HTML"
      }, {
        concept: {
          name: "ul"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["listitem"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = listRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js
var require_listboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/listboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var listboxRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-orientation": "vertical"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: [">1"],
            name: "size"
          }],
          constraints: ["the size attribute value is greater than 1"],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "multiple"
          }],
          name: "select"
        },
        module: "HTML"
      }, {
        concept: {
          name: "datalist"
        },
        module: "HTML"
      }, {
        concept: {
          name: "list"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["option", "group"], ["option"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    }, _default = exports.default = listboxRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js
var require_listitemRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/listitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var listitemRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          constraints: ["direct descendant of ol", "direct descendant of ul", "direct descendant of menu"],
          name: "li"
        },
        module: "HTML"
      }, {
        concept: {
          name: "item"
        },
        module: "XForms"
      }],
      requireContextRole: ["directory", "list"],
      requiredContextRole: ["directory", "list"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = listitemRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/logRole.js
var require_logRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/logRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var logRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-live": "polite"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = logRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js
var require_mainRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/mainRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var mainRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "main"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = mainRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/markRole.js
var require_markRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/markRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var markRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: [],
      props: {
        "aria-braillelabel": null,
        "aria-brailleroledescription": null,
        "aria-description": null
      },
      relatedConcepts: [{
        concept: {
          name: "mark"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = markRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js
var require_marqueeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/marqueeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var marqueeRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = marqueeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js
var require_mathRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/mathRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var mathRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "math"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = mathRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js
var require_menuRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var menuRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "vertical"
      },
      relatedConcepts: [{
        concept: {
          name: "MENU"
        },
        module: "JAPI"
      }, {
        concept: {
          name: "list"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "select"
        },
        module: "XForms"
      }, {
        concept: {
          name: "sidebar"
        },
        module: "DTB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    }, _default = exports.default = menuRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js
var require_menubarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menubarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var menubarRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        concept: {
          name: "toolbar"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["menuitem", "group"], ["menuitemradio", "group"], ["menuitemcheckbox", "group"], ["menuitem"], ["menuitemcheckbox"], ["menuitemradio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select", "menu"], ["roletype", "structure", "section", "group", "select", "menu"]]
    }, _default = exports.default = menubarRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js
var require_menuitemRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var menuitemRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "MENU_ITEM"
        },
        module: "JAPI"
      }, {
        concept: {
          name: "listitem"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "option"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command"]]
    }, _default = exports.default = menuitemRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js
var require_menuitemcheckboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuitemcheckboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var menuitemcheckboxRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox"], ["roletype", "widget", "command", "menuitem"]]
    }, _default = exports.default = menuitemcheckboxRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js
var require_menuitemradioRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/menuitemradioRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var menuitemradioRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "menuitem"
        },
        module: "ARIA"
      }],
      requireContextRole: ["group", "menu", "menubar"],
      requiredContextRole: ["group", "menu", "menubar"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox", "menuitemcheckbox"], ["roletype", "widget", "command", "menuitem", "menuitemcheckbox"], ["roletype", "widget", "input", "radio"]]
    }, _default = exports.default = menuitemradioRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js
var require_meterRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/meterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var meterRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null,
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [{
        concept: {
          name: "meter"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-valuenow": null
      },
      superClass: [["roletype", "structure", "range"]]
    }, _default = exports.default = meterRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js
var require_navigationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/navigationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var navigationRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "nav"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = navigationRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js
var require_noneRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/noneRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var noneRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: [],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    }, _default = exports.default = noneRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js
var require_noteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/noteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var noteRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = noteRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js
var require_optionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/optionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var optionRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false"
      },
      relatedConcepts: [{
        concept: {
          name: "item"
        },
        module: "XForms"
      }, {
        concept: {
          name: "listitem"
        },
        module: "ARIA"
      }, {
        concept: {
          name: "option"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-selected": "false"
      },
      superClass: [["roletype", "widget", "input"]]
    }, _default = exports.default = optionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js
var require_paragraphRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/paragraphRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var paragraphRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "p"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = paragraphRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js
var require_presentationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/presentationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var presentationRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "alt",
            value: ""
          }],
          name: "img"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = presentationRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js
var require_progressbarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/progressbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var progressbarRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-valuetext": null
      },
      relatedConcepts: [{
        concept: {
          name: "progress"
        },
        module: "HTML"
      }, {
        concept: {
          name: "status"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
    }, _default = exports.default = progressbarRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js
var require_radioRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/radioRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var radioRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-checked": null,
        "aria-posinset": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "radio"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input"]]
    }, _default = exports.default = radioRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js
var require_radiogroupRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/radiogroupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var radiogroupRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          name: "list"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["radio"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    }, _default = exports.default = radiogroupRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js
var require_regionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/regionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var regionRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-label"
          }],
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["set"],
            name: "aria-labelledby"
          }],
          name: "section"
        },
        module: "HTML"
      }, {
        concept: {
          name: "Device Independence Glossart perceivable unit"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = regionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js
var require_rowRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/rowRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var rowRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-colindex": null,
        "aria-expanded": null,
        "aria-level": null,
        "aria-posinset": null,
        "aria-rowindex": null,
        "aria-selected": null,
        "aria-setsize": null
      },
      relatedConcepts: [{
        concept: {
          name: "tr"
        },
        module: "HTML"
      }],
      requireContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredContextRole: ["grid", "rowgroup", "table", "treegrid"],
      requiredOwnedElements: [["cell"], ["columnheader"], ["gridcell"], ["rowheader"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"], ["roletype", "widget"]]
    }, _default = exports.default = rowRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js
var require_rowgroupRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/rowgroupRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var rowgroupRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "tbody"
        },
        module: "HTML"
      }, {
        concept: {
          name: "tfoot"
        },
        module: "HTML"
      }, {
        concept: {
          name: "thead"
        },
        module: "HTML"
      }],
      requireContextRole: ["grid", "table", "treegrid"],
      requiredContextRole: ["grid", "table", "treegrid"],
      requiredOwnedElements: [["row"]],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = rowgroupRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js
var require_rowheaderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/rowheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var rowheaderRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-sort": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "scope",
            value: "row"
          }],
          name: "th"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            name: "scope",
            value: "rowgroup"
          }],
          name: "th"
        },
        module: "HTML"
      }],
      requireContextRole: ["row", "rowgroup"],
      requiredContextRole: ["row", "rowgroup"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "cell"], ["roletype", "structure", "section", "cell", "gridcell"], ["roletype", "widget", "gridcell"], ["roletype", "structure", "sectionhead"]]
    }, _default = exports.default = rowheaderRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js
var require_scrollbarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/scrollbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var scrollbarRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-valuetext": null,
        "aria-orientation": "vertical",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-controls": null,
        "aria-valuenow": null
      },
      superClass: [["roletype", "structure", "range"], ["roletype", "widget"]]
    }, _default = exports.default = scrollbarRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js
var require_searchRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/searchRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var searchRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = searchRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js
var require_searchboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/searchboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var searchboxRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "search"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input", "textbox"]]
    }, _default = exports.default = searchboxRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js
var require_separatorRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/separatorRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var separatorRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0",
        "aria-valuenow": null,
        "aria-valuetext": null
      },
      relatedConcepts: [{
        concept: {
          name: "hr"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure"]]
    }, _default = exports.default = separatorRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js
var require_sliderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/sliderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var sliderRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-valuetext": null,
        "aria-orientation": "horizontal",
        "aria-valuemax": "100",
        "aria-valuemin": "0"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "range"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-valuenow": null
      },
      superClass: [["roletype", "widget", "input"], ["roletype", "structure", "range"]]
    }, _default = exports.default = sliderRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js
var require_spinbuttonRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/spinbuttonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var spinbuttonRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-readonly": null,
        "aria-required": null,
        "aria-valuetext": null,
        "aria-valuenow": "0"
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            name: "type",
            value: "number"
          }],
          name: "input"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"], ["roletype", "widget", "input"], ["roletype", "structure", "range"]]
    }, _default = exports.default = spinbuttonRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js
var require_statusRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/statusRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var statusRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-atomic": "true",
        "aria-live": "polite"
      },
      relatedConcepts: [{
        concept: {
          name: "output"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = statusRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js
var require_strongRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/strongRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var strongRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "strong"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = strongRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js
var require_subscriptRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/subscriptRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var subscriptRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "sub"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = subscriptRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js
var require_superscriptRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/superscriptRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var superscriptRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: ["aria-label", "aria-labelledby"],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "sup"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = superscriptRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js
var require_switchRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/switchRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var switchRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "button"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-checked": null
      },
      superClass: [["roletype", "widget", "input", "checkbox"]]
    }, _default = exports.default = switchRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js
var require_tabRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tabRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var tabRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-posinset": null,
        "aria-setsize": null,
        "aria-selected": "false"
      },
      relatedConcepts: [],
      requireContextRole: ["tablist"],
      requiredContextRole: ["tablist"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"], ["roletype", "widget"]]
    }, _default = exports.default = tabRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js
var require_tableRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tableRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var tableRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-colcount": null,
        "aria-rowcount": null
      },
      relatedConcepts: [{
        concept: {
          name: "table"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = tableRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js
var require_tablistRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tablistRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var tablistRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-level": null,
        "aria-multiselectable": null,
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        module: "DAISY",
        concept: {
          name: "guide"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["tab"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite"]]
    }, _default = exports.default = tablistRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js
var require_tabpanelRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tabpanelRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var tabpanelRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = tabpanelRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/termRole.js
var require_termRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/termRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var termRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "dfn"
        },
        module: "HTML"
      }, {
        concept: {
          name: "dt"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = termRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js
var require_textboxRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/textboxRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var textboxRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-activedescendant": null,
        "aria-autocomplete": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null,
        "aria-multiline": null,
        "aria-placeholder": null,
        "aria-readonly": null,
        "aria-required": null
      },
      relatedConcepts: [{
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "type"
          }, {
            constraints: ["undefined"],
            name: "list"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "email"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "tel"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "text"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          attributes: [{
            constraints: ["undefined"],
            name: "list"
          }, {
            name: "type",
            value: "url"
          }],
          constraints: ["the list attribute is not set"],
          name: "input"
        },
        module: "HTML"
      }, {
        concept: {
          name: "input"
        },
        module: "XForms"
      }, {
        concept: {
          name: "textarea"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "input"]]
    }, _default = exports.default = textboxRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js
var require_timeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/timeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var timeRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "time"
        },
        module: "HTML"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = timeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js
var require_timerRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/timerRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var timerRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "status"]]
    }, _default = exports.default = timerRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js
var require_toolbarRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/toolbarRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var toolbarRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-orientation": "horizontal"
      },
      relatedConcepts: [{
        concept: {
          name: "menubar"
        },
        module: "ARIA"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]]
    }, _default = exports.default = toolbarRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js
var require_tooltipRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/tooltipRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var tooltipRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = tooltipRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js
var require_treeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/treeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var treeRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null,
        "aria-multiselectable": null,
        "aria-required": null,
        "aria-orientation": "vertical"
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["treeitem", "group"], ["treeitem"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "select"], ["roletype", "structure", "section", "group", "select"]]
    }, _default = exports.default = treeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js
var require_treegridRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/treegridRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var treegridRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["row"], ["row", "rowgroup"]],
      requiredProps: {},
      superClass: [["roletype", "widget", "composite", "grid"], ["roletype", "structure", "section", "table", "grid"], ["roletype", "widget", "composite", "select", "tree"], ["roletype", "structure", "section", "group", "select", "tree"]]
    }, _default = exports.default = treegridRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js
var require_treeitemRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/literal/treeitemRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var treeitemRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-expanded": null,
        "aria-haspopup": null
      },
      relatedConcepts: [],
      requireContextRole: ["group", "tree"],
      requiredContextRole: ["group", "tree"],
      requiredOwnedElements: [],
      requiredProps: {
        "aria-selected": null
      },
      superClass: [["roletype", "structure", "section", "listitem"], ["roletype", "widget", "input", "option"]]
    }, _default = exports.default = treeitemRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js
var require_ariaLiteralRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaLiteralRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _alertRole = _interopRequireDefault(require_alertRole()), _alertdialogRole = _interopRequireDefault(require_alertdialogRole()), _applicationRole = _interopRequireDefault(require_applicationRole()), _articleRole = _interopRequireDefault(require_articleRole()), _bannerRole = _interopRequireDefault(require_bannerRole()), _blockquoteRole = _interopRequireDefault(require_blockquoteRole()), _buttonRole = _interopRequireDefault(require_buttonRole()), _captionRole = _interopRequireDefault(require_captionRole()), _cellRole = _interopRequireDefault(require_cellRole()), _checkboxRole = _interopRequireDefault(require_checkboxRole()), _codeRole = _interopRequireDefault(require_codeRole()), _columnheaderRole = _interopRequireDefault(require_columnheaderRole()), _comboboxRole = _interopRequireDefault(require_comboboxRole()), _complementaryRole = _interopRequireDefault(require_complementaryRole()), _contentinfoRole = _interopRequireDefault(require_contentinfoRole()), _definitionRole = _interopRequireDefault(require_definitionRole()), _deletionRole = _interopRequireDefault(require_deletionRole()), _dialogRole = _interopRequireDefault(require_dialogRole()), _directoryRole = _interopRequireDefault(require_directoryRole()), _documentRole = _interopRequireDefault(require_documentRole()), _emphasisRole = _interopRequireDefault(require_emphasisRole()), _feedRole = _interopRequireDefault(require_feedRole()), _figureRole = _interopRequireDefault(require_figureRole()), _formRole = _interopRequireDefault(require_formRole()), _genericRole = _interopRequireDefault(require_genericRole()), _gridRole = _interopRequireDefault(require_gridRole()), _gridcellRole = _interopRequireDefault(require_gridcellRole()), _groupRole = _interopRequireDefault(require_groupRole()), _headingRole = _interopRequireDefault(require_headingRole()), _imgRole = _interopRequireDefault(require_imgRole()), _insertionRole = _interopRequireDefault(require_insertionRole()), _linkRole = _interopRequireDefault(require_linkRole()), _listRole = _interopRequireDefault(require_listRole()), _listboxRole = _interopRequireDefault(require_listboxRole()), _listitemRole = _interopRequireDefault(require_listitemRole()), _logRole = _interopRequireDefault(require_logRole()), _mainRole = _interopRequireDefault(require_mainRole()), _markRole = _interopRequireDefault(require_markRole()), _marqueeRole = _interopRequireDefault(require_marqueeRole()), _mathRole = _interopRequireDefault(require_mathRole()), _menuRole = _interopRequireDefault(require_menuRole()), _menubarRole = _interopRequireDefault(require_menubarRole()), _menuitemRole = _interopRequireDefault(require_menuitemRole()), _menuitemcheckboxRole = _interopRequireDefault(require_menuitemcheckboxRole()), _menuitemradioRole = _interopRequireDefault(require_menuitemradioRole()), _meterRole = _interopRequireDefault(require_meterRole()), _navigationRole = _interopRequireDefault(require_navigationRole()), _noneRole = _interopRequireDefault(require_noneRole()), _noteRole = _interopRequireDefault(require_noteRole()), _optionRole = _interopRequireDefault(require_optionRole()), _paragraphRole = _interopRequireDefault(require_paragraphRole()), _presentationRole = _interopRequireDefault(require_presentationRole()), _progressbarRole = _interopRequireDefault(require_progressbarRole()), _radioRole = _interopRequireDefault(require_radioRole()), _radiogroupRole = _interopRequireDefault(require_radiogroupRole()), _regionRole = _interopRequireDefault(require_regionRole()), _rowRole = _interopRequireDefault(require_rowRole()), _rowgroupRole = _interopRequireDefault(require_rowgroupRole()), _rowheaderRole = _interopRequireDefault(require_rowheaderRole()), _scrollbarRole = _interopRequireDefault(require_scrollbarRole()), _searchRole = _interopRequireDefault(require_searchRole()), _searchboxRole = _interopRequireDefault(require_searchboxRole()), _separatorRole = _interopRequireDefault(require_separatorRole()), _sliderRole = _interopRequireDefault(require_sliderRole()), _spinbuttonRole = _interopRequireDefault(require_spinbuttonRole()), _statusRole = _interopRequireDefault(require_statusRole()), _strongRole = _interopRequireDefault(require_strongRole()), _subscriptRole = _interopRequireDefault(require_subscriptRole()), _superscriptRole = _interopRequireDefault(require_superscriptRole()), _switchRole = _interopRequireDefault(require_switchRole()), _tabRole = _interopRequireDefault(require_tabRole()), _tableRole = _interopRequireDefault(require_tableRole()), _tablistRole = _interopRequireDefault(require_tablistRole()), _tabpanelRole = _interopRequireDefault(require_tabpanelRole()), _termRole = _interopRequireDefault(require_termRole()), _textboxRole = _interopRequireDefault(require_textboxRole()), _timeRole = _interopRequireDefault(require_timeRole()), _timerRole = _interopRequireDefault(require_timerRole()), _toolbarRole = _interopRequireDefault(require_toolbarRole()), _tooltipRole = _interopRequireDefault(require_tooltipRole()), _treeRole = _interopRequireDefault(require_treeRole()), _treegridRole = _interopRequireDefault(require_treegridRole()), _treeitemRole = _interopRequireDefault(require_treeitemRole());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ariaLiteralRoles = [["alert", _alertRole.default], ["alertdialog", _alertdialogRole.default], ["application", _applicationRole.default], ["article", _articleRole.default], ["banner", _bannerRole.default], ["blockquote", _blockquoteRole.default], ["button", _buttonRole.default], ["caption", _captionRole.default], ["cell", _cellRole.default], ["checkbox", _checkboxRole.default], ["code", _codeRole.default], ["columnheader", _columnheaderRole.default], ["combobox", _comboboxRole.default], ["complementary", _complementaryRole.default], ["contentinfo", _contentinfoRole.default], ["definition", _definitionRole.default], ["deletion", _deletionRole.default], ["dialog", _dialogRole.default], ["directory", _directoryRole.default], ["document", _documentRole.default], ["emphasis", _emphasisRole.default], ["feed", _feedRole.default], ["figure", _figureRole.default], ["form", _formRole.default], ["generic", _genericRole.default], ["grid", _gridRole.default], ["gridcell", _gridcellRole.default], ["group", _groupRole.default], ["heading", _headingRole.default], ["img", _imgRole.default], ["insertion", _insertionRole.default], ["link", _linkRole.default], ["list", _listRole.default], ["listbox", _listboxRole.default], ["listitem", _listitemRole.default], ["log", _logRole.default], ["main", _mainRole.default], ["mark", _markRole.default], ["marquee", _marqueeRole.default], ["math", _mathRole.default], ["menu", _menuRole.default], ["menubar", _menubarRole.default], ["menuitem", _menuitemRole.default], ["menuitemcheckbox", _menuitemcheckboxRole.default], ["menuitemradio", _menuitemradioRole.default], ["meter", _meterRole.default], ["navigation", _navigationRole.default], ["none", _noneRole.default], ["note", _noteRole.default], ["option", _optionRole.default], ["paragraph", _paragraphRole.default], ["presentation", _presentationRole.default], ["progressbar", _progressbarRole.default], ["radio", _radioRole.default], ["radiogroup", _radiogroupRole.default], ["region", _regionRole.default], ["row", _rowRole.default], ["rowgroup", _rowgroupRole.default], ["rowheader", _rowheaderRole.default], ["scrollbar", _scrollbarRole.default], ["search", _searchRole.default], ["searchbox", _searchboxRole.default], ["separator", _separatorRole.default], ["slider", _sliderRole.default], ["spinbutton", _spinbuttonRole.default], ["status", _statusRole.default], ["strong", _strongRole.default], ["subscript", _subscriptRole.default], ["superscript", _superscriptRole.default], ["switch", _switchRole.default], ["tab", _tabRole.default], ["table", _tableRole.default], ["tablist", _tablistRole.default], ["tabpanel", _tabpanelRole.default], ["term", _termRole.default], ["textbox", _textboxRole.default], ["time", _timeRole.default], ["timer", _timerRole.default], ["toolbar", _toolbarRole.default], ["tooltip", _tooltipRole.default], ["tree", _treeRole.default], ["treegrid", _treegridRole.default], ["treeitem", _treeitemRole.default]], _default = exports.default = ariaLiteralRoles;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js
var require_docAbstractRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAbstractRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docAbstractRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "abstract [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docAbstractRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js
var require_docAcknowledgmentsRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAcknowledgmentsRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docAcknowledgmentsRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "acknowledgments [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docAcknowledgmentsRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js
var require_docAfterwordRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAfterwordRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docAfterwordRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "afterword [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docAfterwordRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js
var require_docAppendixRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docAppendixRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docAppendixRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "appendix [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docAppendixRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js
var require_docBacklinkRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBacklinkRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docBacklinkRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "referrer [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    }, _default = exports.default = docBacklinkRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js
var require_docBiblioentryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBiblioentryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docBiblioentryRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "EPUB biblioentry [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: ["doc-bibliography"],
      requiredContextRole: ["doc-bibliography"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]]
    }, _default = exports.default = docBiblioentryRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js
var require_docBibliographyRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliographyRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docBibliographyRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "bibliography [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-biblioentry"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docBibliographyRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js
var require_docBibliorefRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docBibliorefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docBibliorefRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "biblioref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    }, _default = exports.default = docBibliorefRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js
var require_docChapterRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docChapterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docChapterRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "chapter [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docChapterRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js
var require_docColophonRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docColophonRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docColophonRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "colophon [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docColophonRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js
var require_docConclusionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docConclusionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docConclusionRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "conclusion [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docConclusionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js
var require_docCoverRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docCoverRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docCoverRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "cover [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]]
    }, _default = exports.default = docCoverRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js
var require_docCreditRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docCreditRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "credit [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docCreditRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js
var require_docCreditsRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docCreditsRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docCreditsRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "credits [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docCreditsRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js
var require_docDedicationRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docDedicationRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docDedicationRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "dedication [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docDedicationRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js
var require_docEndnoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docEndnoteRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "rearnote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: ["doc-endnotes"],
      requiredContextRole: ["doc-endnotes"],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "listitem"]]
    }, _default = exports.default = docEndnoteRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js
var require_docEndnotesRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEndnotesRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docEndnotesRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "rearnotes [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["doc-endnote"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docEndnotesRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js
var require_docEpigraphRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEpigraphRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docEpigraphRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "epigraph [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docEpigraphRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js
var require_docEpilogueRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docEpilogueRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docEpilogueRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "epilogue [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docEpilogueRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js
var require_docErrataRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docErrataRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docErrataRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "errata [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docErrataRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js
var require_docExampleRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docExampleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docExampleRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docExampleRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js
var require_docFootnoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docFootnoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docFootnoteRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "footnote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docFootnoteRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js
var require_docForewordRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docForewordRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docForewordRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "foreword [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docForewordRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js
var require_docGlossaryRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossaryRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docGlossaryRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "glossary [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [["definition"], ["term"]],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docGlossaryRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js
var require_docGlossrefRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docGlossrefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docGlossrefRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "glossref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    }, _default = exports.default = docGlossrefRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js
var require_docIndexRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docIndexRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docIndexRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "index [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    }, _default = exports.default = docIndexRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js
var require_docIntroductionRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docIntroductionRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docIntroductionRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "introduction [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docIntroductionRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js
var require_docNoterefRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docNoterefRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docNoterefRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "noteref [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "widget", "command", "link"]]
    }, _default = exports.default = docNoterefRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js
var require_docNoticeRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docNoticeRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docNoticeRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "notice [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]]
    }, _default = exports.default = docNoticeRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js
var require_docPagebreakRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPagebreakRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPagebreakRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "pagebreak [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "separator"]]
    }, _default = exports.default = docPagebreakRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPagefooterRole.js
var require_docPagefooterRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPagefooterRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPagefooterRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: [],
      props: {
        "aria-braillelabel": null,
        "aria-brailleroledescription": null,
        "aria-description": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docPagefooterRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPageheaderRole.js
var require_docPageheaderRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPageheaderRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPageheaderRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["prohibited"],
      prohibitedProps: [],
      props: {
        "aria-braillelabel": null,
        "aria-brailleroledescription": null,
        "aria-description": null,
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docPageheaderRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js
var require_docPagelistRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPagelistRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPagelistRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "page-list [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    }, _default = exports.default = docPagelistRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js
var require_docPartRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPartRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPartRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "part [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docPartRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js
var require_docPrefaceRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPrefaceRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPrefaceRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "preface [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docPrefaceRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js
var require_docPrologueRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPrologueRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPrologueRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "prologue [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark"]]
    }, _default = exports.default = docPrologueRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js
var require_docPullquoteRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docPullquoteRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docPullquoteRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {},
      relatedConcepts: [{
        concept: {
          name: "pullquote [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["none"]]
    }, _default = exports.default = docPullquoteRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js
var require_docQnaRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docQnaRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docQnaRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "qna [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section"]]
    }, _default = exports.default = docQnaRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js
var require_docSubtitleRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docSubtitleRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docSubtitleRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "subtitle [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "sectionhead"]]
    }, _default = exports.default = docSubtitleRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js
var require_docTipRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docTipRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docTipRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "help [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "note"]]
    }, _default = exports.default = docTipRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js
var require_docTocRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/dpub/docTocRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var docTocRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        concept: {
          name: "toc [EPUB-SSV]"
        },
        module: "EPUB"
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "landmark", "navigation"]]
    }, _default = exports.default = docTocRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js
var require_ariaDpubRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaDpubRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _docAbstractRole = _interopRequireDefault(require_docAbstractRole()), _docAcknowledgmentsRole = _interopRequireDefault(require_docAcknowledgmentsRole()), _docAfterwordRole = _interopRequireDefault(require_docAfterwordRole()), _docAppendixRole = _interopRequireDefault(require_docAppendixRole()), _docBacklinkRole = _interopRequireDefault(require_docBacklinkRole()), _docBiblioentryRole = _interopRequireDefault(require_docBiblioentryRole()), _docBibliographyRole = _interopRequireDefault(require_docBibliographyRole()), _docBibliorefRole = _interopRequireDefault(require_docBibliorefRole()), _docChapterRole = _interopRequireDefault(require_docChapterRole()), _docColophonRole = _interopRequireDefault(require_docColophonRole()), _docConclusionRole = _interopRequireDefault(require_docConclusionRole()), _docCoverRole = _interopRequireDefault(require_docCoverRole()), _docCreditRole = _interopRequireDefault(require_docCreditRole()), _docCreditsRole = _interopRequireDefault(require_docCreditsRole()), _docDedicationRole = _interopRequireDefault(require_docDedicationRole()), _docEndnoteRole = _interopRequireDefault(require_docEndnoteRole()), _docEndnotesRole = _interopRequireDefault(require_docEndnotesRole()), _docEpigraphRole = _interopRequireDefault(require_docEpigraphRole()), _docEpilogueRole = _interopRequireDefault(require_docEpilogueRole()), _docErrataRole = _interopRequireDefault(require_docErrataRole()), _docExampleRole = _interopRequireDefault(require_docExampleRole()), _docFootnoteRole = _interopRequireDefault(require_docFootnoteRole()), _docForewordRole = _interopRequireDefault(require_docForewordRole()), _docGlossaryRole = _interopRequireDefault(require_docGlossaryRole()), _docGlossrefRole = _interopRequireDefault(require_docGlossrefRole()), _docIndexRole = _interopRequireDefault(require_docIndexRole()), _docIntroductionRole = _interopRequireDefault(require_docIntroductionRole()), _docNoterefRole = _interopRequireDefault(require_docNoterefRole()), _docNoticeRole = _interopRequireDefault(require_docNoticeRole()), _docPagebreakRole = _interopRequireDefault(require_docPagebreakRole()), _docPagefooterRole = _interopRequireDefault(require_docPagefooterRole()), _docPageheaderRole = _interopRequireDefault(require_docPageheaderRole()), _docPagelistRole = _interopRequireDefault(require_docPagelistRole()), _docPartRole = _interopRequireDefault(require_docPartRole()), _docPrefaceRole = _interopRequireDefault(require_docPrefaceRole()), _docPrologueRole = _interopRequireDefault(require_docPrologueRole()), _docPullquoteRole = _interopRequireDefault(require_docPullquoteRole()), _docQnaRole = _interopRequireDefault(require_docQnaRole()), _docSubtitleRole = _interopRequireDefault(require_docSubtitleRole()), _docTipRole = _interopRequireDefault(require_docTipRole()), _docTocRole = _interopRequireDefault(require_docTocRole());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ariaDpubRoles = [["doc-abstract", _docAbstractRole.default], ["doc-acknowledgments", _docAcknowledgmentsRole.default], ["doc-afterword", _docAfterwordRole.default], ["doc-appendix", _docAppendixRole.default], ["doc-backlink", _docBacklinkRole.default], ["doc-biblioentry", _docBiblioentryRole.default], ["doc-bibliography", _docBibliographyRole.default], ["doc-biblioref", _docBibliorefRole.default], ["doc-chapter", _docChapterRole.default], ["doc-colophon", _docColophonRole.default], ["doc-conclusion", _docConclusionRole.default], ["doc-cover", _docCoverRole.default], ["doc-credit", _docCreditRole.default], ["doc-credits", _docCreditsRole.default], ["doc-dedication", _docDedicationRole.default], ["doc-endnote", _docEndnoteRole.default], ["doc-endnotes", _docEndnotesRole.default], ["doc-epigraph", _docEpigraphRole.default], ["doc-epilogue", _docEpilogueRole.default], ["doc-errata", _docErrataRole.default], ["doc-example", _docExampleRole.default], ["doc-footnote", _docFootnoteRole.default], ["doc-foreword", _docForewordRole.default], ["doc-glossary", _docGlossaryRole.default], ["doc-glossref", _docGlossrefRole.default], ["doc-index", _docIndexRole.default], ["doc-introduction", _docIntroductionRole.default], ["doc-noteref", _docNoterefRole.default], ["doc-notice", _docNoticeRole.default], ["doc-pagebreak", _docPagebreakRole.default], ["doc-pagefooter", _docPagefooterRole.default], ["doc-pageheader", _docPageheaderRole.default], ["doc-pagelist", _docPagelistRole.default], ["doc-part", _docPartRole.default], ["doc-preface", _docPrefaceRole.default], ["doc-prologue", _docPrologueRole.default], ["doc-pullquote", _docPullquoteRole.default], ["doc-qna", _docQnaRole.default], ["doc-subtitle", _docSubtitleRole.default], ["doc-tip", _docTipRole.default], ["doc-toc", _docTocRole.default]], _default = exports.default = ariaDpubRoles;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js
var require_graphicsDocumentRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsDocumentRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var graphicsDocumentRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        module: "GRAPHICS",
        concept: {
          name: "graphics-object"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "img"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "article"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "document"]]
    }, _default = exports.default = graphicsDocumentRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js
var require_graphicsObjectRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsObjectRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var graphicsObjectRole = {
      abstract: !1,
      accessibleNameRequired: !1,
      baseConcepts: [],
      childrenPresentational: !1,
      nameFrom: ["author", "contents"],
      prohibitedProps: [],
      props: {
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [{
        module: "GRAPHICS",
        concept: {
          name: "graphics-document"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "group"
        }
      }, {
        module: "ARIA",
        concept: {
          name: "img"
        }
      }, {
        module: "GRAPHICS",
        concept: {
          name: "graphics-symbol"
        }
      }],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "group"]]
    }, _default = exports.default = graphicsObjectRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js
var require_graphicsSymbolRole = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/graphics/graphicsSymbolRole.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var graphicsSymbolRole = {
      abstract: !1,
      accessibleNameRequired: !0,
      baseConcepts: [],
      childrenPresentational: !0,
      nameFrom: ["author"],
      prohibitedProps: [],
      props: {
        "aria-disabled": null,
        "aria-errormessage": null,
        "aria-expanded": null,
        "aria-haspopup": null,
        "aria-invalid": null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [["roletype", "structure", "section", "img"]]
    }, _default = exports.default = graphicsSymbolRole;
  }
});

// ../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js
var require_ariaGraphicsRoles = __commonJS({
  "../../node_modules/aria-query/lib/etc/roles/ariaGraphicsRoles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _graphicsDocumentRole = _interopRequireDefault(require_graphicsDocumentRole()), _graphicsObjectRole = _interopRequireDefault(require_graphicsObjectRole()), _graphicsSymbolRole = _interopRequireDefault(require_graphicsSymbolRole());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ariaGraphicsRoles = [["graphics-document", _graphicsDocumentRole.default], ["graphics-object", _graphicsObjectRole.default], ["graphics-symbol", _graphicsSymbolRole.default]], _default = exports.default = ariaGraphicsRoles;
  }
});

// ../../node_modules/aria-query/lib/rolesMap.js
var require_rolesMap = __commonJS({
  "../../node_modules/aria-query/lib/rolesMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _ariaAbstractRoles = _interopRequireDefault(require_ariaAbstractRoles()), _ariaLiteralRoles = _interopRequireDefault(require_ariaLiteralRoles()), _ariaDpubRoles = _interopRequireDefault(require_ariaDpubRoles()), _ariaGraphicsRoles = _interopRequireDefault(require_ariaGraphicsRoles()), _iterationDecorator = _interopRequireDefault(require_iterationDecorator());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _createForOfIteratorHelper(r, e) {
      var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && typeof r.length == "number") {
          t && (r = t);
          var _n = 0, F = function() {
          };
          return { s: F, n: function() {
            return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] };
          }, e: function(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var o, a2 = !0, u2 = !1;
      return { s: function() {
        t = t.call(r);
      }, n: function() {
        var r2 = t.next();
        return a2 = r2.done, r2;
      }, e: function(r2) {
        u2 = !0, o = r2;
      }, f: function() {
        try {
          a2 || t.return == null || t.return();
        } finally {
          if (u2) throw o;
        }
      } };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function _unsupportedIterableToArray(r, a2) {
      if (r) {
        if (typeof r == "string") return _arrayLikeToArray(r, a2);
        var t = {}.toString.call(r).slice(8, -1);
        return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
      }
    }
    function _arrayLikeToArray(r, a2) {
      (a2 == null || a2 > r.length) && (a2 = r.length);
      for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
      return n;
    }
    function _iterableToArrayLimit(r, l) {
      var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (t != null) {
        var e, n, i, u2, a2 = [], f3 = !0, o = !1;
        try {
          if (i = (t = t.call(r)).next, l === 0) {
            if (Object(t) !== t) return;
            f3 = !1;
          } else for (; !(f3 = (e = i.call(t)).done) && (a2.push(e.value), a2.length !== l); f3 = !0) ;
        } catch (r2) {
          o = !0, n = r2;
        } finally {
          try {
            if (!f3 && t.return != null && (u2 = t.return(), Object(u2) !== u2)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a2;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    var roles2 = [].concat(_ariaAbstractRoles.default, _ariaLiteralRoles.default, _ariaDpubRoles.default, _ariaGraphicsRoles.default);
    roles2.forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), roleDefinition = _ref2[1], _iterator = _createForOfIteratorHelper(roleDefinition.superClass), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var superClassIter = _step.value, _iterator2 = _createForOfIteratorHelper(superClassIter), _step2;
          try {
            var _loop = function() {
              var superClassName = _step2.value, superClassRoleTuple = roles2.filter(function(_ref3) {
                var _ref4 = _slicedToArray(_ref3, 1), name = _ref4[0];
                return name === superClassName;
              })[0];
              if (superClassRoleTuple)
                for (var superClassDefinition = superClassRoleTuple[1], _i = 0, _Object$keys = Object.keys(superClassDefinition.props); _i < _Object$keys.length; _i++) {
                  var prop = _Object$keys[_i];
                  Object.prototype.hasOwnProperty.call(roleDefinition.props, prop) || (roleDefinition.props[prop] = superClassDefinition.props[prop]);
                }
            };
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; )
              _loop();
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
    var rolesMap = {
      entries: function() {
        return roles2;
      },
      forEach: function(fn3) {
        var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _iterator3 = _createForOfIteratorHelper(roles2), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var _step3$value = _slicedToArray(_step3.value, 2), key = _step3$value[0], values = _step3$value[1];
            fn3.call(thisArg, values, key, roles2);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      },
      get: function(key) {
        var item = roles2.filter(function(tuple) {
          return tuple[0] === key;
        })[0];
        return item && item[1];
      },
      has: function(key) {
        return !!rolesMap.get(key);
      },
      keys: function() {
        return roles2.map(function(_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1), key = _ref6[0];
          return key;
        });
      },
      values: function() {
        return roles2.map(function(_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2), values2 = _ref8[1];
          return values2;
        });
      }
    }, _default = exports.default = (0, _iterationDecorator.default)(rolesMap, rolesMap.entries());
  }
});

// ../../node_modules/aria-query/lib/elementRoleMap.js
var require_elementRoleMap = __commonJS({
  "../../node_modules/aria-query/lib/elementRoleMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator()), _rolesMap = _interopRequireDefault(require_rolesMap());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function _unsupportedIterableToArray(r, a2) {
      if (r) {
        if (typeof r == "string") return _arrayLikeToArray(r, a2);
        var t = {}.toString.call(r).slice(8, -1);
        return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
      }
    }
    function _arrayLikeToArray(r, a2) {
      (a2 == null || a2 > r.length) && (a2 = r.length);
      for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
      return n;
    }
    function _iterableToArrayLimit(r, l) {
      var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (t != null) {
        var e, n, i2, u2, a2 = [], f3 = !0, o = !1;
        try {
          if (i2 = (t = t.call(r)).next, l === 0) {
            if (Object(t) !== t) return;
            f3 = !1;
          } else for (; !(f3 = (e = i2.call(t)).done) && (a2.push(e.value), a2.length !== l); f3 = !0) ;
        } catch (r2) {
          o = !0, n = r2;
        } finally {
          try {
            if (!f3 && t.return != null && (u2 = t.return(), Object(u2) !== u2)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a2;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    var elementRoles2 = [], keys2 = _rolesMap.default.keys();
    for (i = 0; i < keys2.length; i++)
      if (key = keys2[i], role = _rolesMap.default.get(key), role)
        for (concepts = [].concat(role.baseConcepts, role.relatedConcepts), _loop = function() {
          var relation = concepts[k];
          if (relation.module === "HTML") {
            var concept = relation.concept;
            if (concept) {
              var elementRoleRelation = elementRoles2.filter(function(relation2) {
                return ariaRoleRelationConceptEquals(relation2[0], concept);
              })[0], roles2;
              elementRoleRelation ? roles2 = elementRoleRelation[1] : roles2 = [];
              for (var isUnique = !0, _i = 0; _i < roles2.length; _i++)
                if (roles2[_i] === key) {
                  isUnique = !1;
                  break;
                }
              isUnique && roles2.push(key), elementRoleRelation || elementRoles2.push([concept, roles2]);
            }
          }
        }, k = 0; k < concepts.length; k++)
          _loop();
    var key, role, concepts, _loop, k, i, elementRoleMap = {
      entries: function() {
        return elementRoles2;
      },
      forEach: function(fn3) {
        for (var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _i2 = 0, _elementRoles = elementRoles2; _i2 < _elementRoles.length; _i2++) {
          var _elementRoles$_i = _slicedToArray(_elementRoles[_i2], 2), _key = _elementRoles$_i[0], values = _elementRoles$_i[1];
          fn3.call(thisArg, values, _key, elementRoles2);
        }
      },
      get: function(key2) {
        var item = elementRoles2.filter(function(tuple) {
          return key2.name === tuple[0].name && ariaRoleRelationConceptAttributeEquals(key2.attributes, tuple[0].attributes);
        })[0];
        return item && item[1];
      },
      has: function(key2) {
        return !!elementRoleMap.get(key2);
      },
      keys: function() {
        return elementRoles2.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
          return key2;
        });
      },
      values: function() {
        return elementRoles2.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    };
    function ariaRoleRelationConceptEquals(a2, b) {
      return a2.name === b.name && ariaRoleRelationConstraintsEquals(a2.constraints, b.constraints) && ariaRoleRelationConceptAttributeEquals(a2.attributes, b.attributes);
    }
    function ariaRoleRelationConstraintsEquals(a2, b) {
      if (a2 === void 0 && b !== void 0 || a2 !== void 0 && b === void 0)
        return !1;
      if (a2 !== void 0 && b !== void 0) {
        if (a2.length !== b.length)
          return !1;
        for (var _i3 = 0; _i3 < a2.length; _i3++)
          if (a2[_i3] !== b[_i3])
            return !1;
      }
      return !0;
    }
    function ariaRoleRelationConceptAttributeEquals(a2, b) {
      if (a2 === void 0 && b !== void 0 || a2 !== void 0 && b === void 0)
        return !1;
      if (a2 !== void 0 && b !== void 0) {
        if (a2.length !== b.length)
          return !1;
        for (var _i4 = 0; _i4 < a2.length; _i4++) {
          if (a2[_i4].name !== b[_i4].name || a2[_i4].value !== b[_i4].value || a2[_i4].constraints === void 0 && b[_i4].constraints !== void 0 || a2[_i4].constraints !== void 0 && b[_i4].constraints === void 0)
            return !1;
          if (a2[_i4].constraints !== void 0 && b[_i4].constraints !== void 0) {
            if (a2[_i4].constraints.length !== b[_i4].constraints.length)
              return !1;
            for (var j = 0; j < a2[_i4].constraints.length; j++)
              if (a2[_i4].constraints[j] !== b[_i4].constraints[j])
                return !1;
          }
        }
      }
      return !0;
    }
    var _default = exports.default = (0, _iterationDecorator.default)(elementRoleMap, elementRoleMap.entries());
  }
});

// ../../node_modules/aria-query/lib/roleElementMap.js
var require_roleElementMap = __commonJS({
  "../../node_modules/aria-query/lib/roleElementMap.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.default = void 0;
    var _iterationDecorator = _interopRequireDefault(require_iterationDecorator()), _rolesMap = _interopRequireDefault(require_rolesMap());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    function _unsupportedIterableToArray(r, a2) {
      if (r) {
        if (typeof r == "string") return _arrayLikeToArray(r, a2);
        var t = {}.toString.call(r).slice(8, -1);
        return t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set" ? Array.from(r) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a2) : void 0;
      }
    }
    function _arrayLikeToArray(r, a2) {
      (a2 == null || a2 > r.length) && (a2 = r.length);
      for (var e = 0, n = Array(a2); e < a2; e++) n[e] = r[e];
      return n;
    }
    function _iterableToArrayLimit(r, l) {
      var t = r == null ? null : typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
      if (t != null) {
        var e, n, i2, u2, a2 = [], f3 = !0, o = !1;
        try {
          if (i2 = (t = t.call(r)).next, l === 0) {
            if (Object(t) !== t) return;
            f3 = !1;
          } else for (; !(f3 = (e = i2.call(t)).done) && (a2.push(e.value), a2.length !== l); f3 = !0) ;
        } catch (r2) {
          o = !0, n = r2;
        } finally {
          try {
            if (!f3 && t.return != null && (u2 = t.return(), Object(u2) !== u2)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a2;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    var roleElement = [], keys2 = _rolesMap.default.keys();
    for (i = 0; i < keys2.length; i++)
      if (key = keys2[i], role = _rolesMap.default.get(key), relationConcepts = [], role) {
        for (concepts = [].concat(role.baseConcepts, role.relatedConcepts), k = 0; k < concepts.length; k++)
          relation = concepts[k], relation.module === "HTML" && (concept = relation.concept, concept != null && relationConcepts.push(concept));
        relationConcepts.length > 0 && roleElement.push([key, relationConcepts]);
      }
    var key, role, relationConcepts, concepts, relation, concept, k, i, roleElementMap = {
      entries: function() {
        return roleElement;
      },
      forEach: function(fn3) {
        for (var thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, _i = 0, _roleElement = roleElement; _i < _roleElement.length; _i++) {
          var _roleElement$_i = _slicedToArray(_roleElement[_i], 2), _key = _roleElement$_i[0], values = _roleElement$_i[1];
          fn3.call(thisArg, values, _key, roleElement);
        }
      },
      get: function(key2) {
        var item = roleElement.filter(function(tuple) {
          return tuple[0] === key2;
        })[0];
        return item && item[1];
      },
      has: function(key2) {
        return !!roleElementMap.get(key2);
      },
      keys: function() {
        return roleElement.map(function(_ref) {
          var _ref2 = _slicedToArray(_ref, 1), key2 = _ref2[0];
          return key2;
        });
      },
      values: function() {
        return roleElement.map(function(_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2), values2 = _ref4[1];
          return values2;
        });
      }
    }, _default = exports.default = (0, _iterationDecorator.default)(roleElementMap, roleElementMap.entries());
  }
});

// ../../node_modules/aria-query/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/aria-query/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    exports.roles = exports.roleElements = exports.elementRoles = exports.dom = exports.aria = void 0;
    var _ariaPropsMap = _interopRequireDefault(require_ariaPropsMap()), _domMap = _interopRequireDefault(require_domMap()), _rolesMap = _interopRequireDefault(require_rolesMap()), _elementRoleMap = _interopRequireDefault(require_elementRoleMap()), _roleElementMap = _interopRequireDefault(require_roleElementMap());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var aria = exports.aria = _ariaPropsMap.default, dom = exports.dom = _domMap.default, roles2 = exports.roles = _rolesMap.default, elementRoles2 = exports.elementRoles = _elementRoleMap.default, roleElements = exports.roleElements = _roleElementMap.default;
  }
});

// ../../node_modules/css.escape/css.escape.js
var require_css_escape = __commonJS({
  "../../node_modules/css.escape/css.escape.js"(exports, module) {
    (function(root, factory) {
      typeof exports == "object" ? module.exports = factory(root) : typeof define == "function" && define.amd ? define([], factory.bind(root, root)) : factory(root);
    })(typeof global < "u" ? global : exports, function(root) {
      if (root.CSS && root.CSS.escape)
        return root.CSS.escape;
      var cssEscape = function(value) {
        if (arguments.length == 0)
          throw new TypeError("`CSS.escape` requires an argument.");
        for (var string = String(value), length = string.length, index = -1, codeUnit, result = "", firstCodeUnit = string.charCodeAt(0); ++index < length; ) {
          if (codeUnit = string.charCodeAt(index), codeUnit == 0) {
            result += "\uFFFD";
            continue;
          }
          if (
            // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
            // U+007F, […]
            codeUnit >= 1 && codeUnit <= 31 || codeUnit == 127 || // If the character is the first character and is in the range [0-9]
            // (U+0030 to U+0039), […]
            index == 0 && codeUnit >= 48 && codeUnit <= 57 || // If the character is the second character and is in the range [0-9]
            // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
            index == 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit == 45
          ) {
            result += "\\" + codeUnit.toString(16) + " ";
            continue;
          }
          if (
            // If the character is the first character and is a `-` (U+002D), and
            // there is no second character, […]
            index == 0 && length == 1 && codeUnit == 45
          ) {
            result += "\\" + string.charAt(index);
            continue;
          }
          if (codeUnit >= 128 || codeUnit == 45 || codeUnit == 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
            result += string.charAt(index);
            continue;
          }
          result += "\\" + string.charAt(index);
        }
        return result;
      };
      return root.CSS || (root.CSS = {}), root.CSS.escape = cssEscape, cssEscape;
    });
  }
});

// src/test/index.ts
import { instrument as instrument2 } from "storybook/internal/instrumenter";

// ../../node_modules/chai/index.js
var __defProp = Object.defineProperty, __name = (target, value) => __defProp(target, "name", { value, configurable: !0 }), __export2 = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, utils_exports = {};
__export2(utils_exports, {
  addChainableMethod: () => addChainableMethod,
  addLengthGuard: () => addLengthGuard,
  addMethod: () => addMethod,
  addProperty: () => addProperty,
  checkError: () => check_error_exports,
  compareByInspect: () => compareByInspect,
  eql: () => deep_eql_default,
  expectTypes: () => expectTypes,
  flag: () => flag,
  getActual: () => getActual,
  getMessage: () => getMessage2,
  getName: () => getName,
  getOperator: () => getOperator,
  getOwnEnumerableProperties: () => getOwnEnumerableProperties,
  getOwnEnumerablePropertySymbols: () => getOwnEnumerablePropertySymbols,
  getPathInfo: () => getPathInfo,
  hasProperty: () => hasProperty,
  inspect: () => inspect2,
  isNaN: () => isNaN22,
  isNumeric: () => isNumeric,
  isProxyEnabled: () => isProxyEnabled,
  isRegExp: () => isRegExp2,
  objDisplay: () => objDisplay,
  overwriteChainableMethod: () => overwriteChainableMethod,
  overwriteMethod: () => overwriteMethod,
  overwriteProperty: () => overwriteProperty,
  proxify: () => proxify,
  test: () => test,
  transferFlags: () => transferFlags,
  type: () => type
});
var check_error_exports = {};
__export2(check_error_exports, {
  compatibleConstructor: () => compatibleConstructor,
  compatibleInstance: () => compatibleInstance,
  compatibleMessage: () => compatibleMessage,
  getConstructorName: () => getConstructorName,
  getMessage: () => getMessage
});
function isErrorInstance(obj) {
  return obj instanceof Error || Object.prototype.toString.call(obj) === "[object Error]";
}
__name(isErrorInstance, "isErrorInstance");
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
}
__name(isRegExp, "isRegExp");
function compatibleInstance(thrown, errorLike) {
  return isErrorInstance(errorLike) && thrown === errorLike;
}
__name(compatibleInstance, "compatibleInstance");
function compatibleConstructor(thrown, errorLike) {
  return isErrorInstance(errorLike) ? thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor : (typeof errorLike == "object" || typeof errorLike == "function") && errorLike.prototype ? thrown.constructor === errorLike || thrown instanceof errorLike : !1;
}
__name(compatibleConstructor, "compatibleConstructor");
function compatibleMessage(thrown, errMatcher) {
  let comparisonString = typeof thrown == "string" ? thrown : thrown.message;
  return isRegExp(errMatcher) ? errMatcher.test(comparisonString) : typeof errMatcher == "string" ? comparisonString.indexOf(errMatcher) !== -1 : !1;
}
__name(compatibleMessage, "compatibleMessage");
function getConstructorName(errorLike) {
  let constructorName = errorLike;
  return isErrorInstance(errorLike) ? constructorName = errorLike.constructor.name : typeof errorLike == "function" && (constructorName = errorLike.name, constructorName === "" && (constructorName = new errorLike().name || constructorName)), constructorName;
}
__name(getConstructorName, "getConstructorName");
function getMessage(errorLike) {
  let msg = "";
  return errorLike && errorLike.message ? msg = errorLike.message : typeof errorLike == "string" && (msg = errorLike), msg;
}
__name(getMessage, "getMessage");
function flag(obj, key, value) {
  let flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
  if (arguments.length === 3)
    flags[key] = value;
  else
    return flags[key];
}
__name(flag, "flag");
function test(obj, args) {
  let negate = flag(obj, "negate"), expr = args[0];
  return negate ? !expr : expr;
}
__name(test, "test");
function type(obj) {
  if (typeof obj > "u")
    return "undefined";
  if (obj === null)
    return "null";
  let stringTag = obj[Symbol.toStringTag];
  return typeof stringTag == "string" ? stringTag : Object.prototype.toString.call(obj).slice(8, -1);
}
__name(type, "type");
var canElideFrames = "captureStackTrace" in Error, _a, AssertionError = (_a = class extends Error {
  message;
  get name() {
    return "AssertionError";
  }
  get ok() {
    return !1;
  }
  constructor(message = "Unspecified AssertionError", props, ssf) {
    super(message), this.message = message, canElideFrames && Error.captureStackTrace(this, ssf || _a);
    for (let key in props)
      key in this || (this[key] = props[key]);
  }
  toJSON(stack) {
    return {
      ...this,
      name: this.name,
      message: this.message,
      ok: !1,
      stack: stack !== !1 ? this.stack : void 0
    };
  }
}, __name(_a, "AssertionError"), _a);
function expectTypes(obj, types) {
  let flagMsg = flag(obj, "message"), ssfi = flag(obj, "ssfi");
  flagMsg = flagMsg ? flagMsg + ": " : "", obj = flag(obj, "object"), types = types.map(function(t) {
    return t.toLowerCase();
  }), types.sort();
  let str = types.map(function(t, index) {
    let art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a";
    return (types.length > 1 && index === types.length - 1 ? "or " : "") + art + " " + t;
  }).join(", "), objType = type(obj).toLowerCase();
  if (!types.some(function(expected) {
    return objType === expected;
  }))
    throw new AssertionError(
      flagMsg + "object tested must be " + str + ", but " + objType + " given",
      void 0,
      ssfi
    );
}
__name(expectTypes, "expectTypes");
function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
}
__name(getActual, "getActual");
var ansiColors = {
  bold: ["1", "22"],
  dim: ["2", "22"],
  italic: ["3", "23"],
  underline: ["4", "24"],
  // 5 & 6 are blinking
  inverse: ["7", "27"],
  hidden: ["8", "28"],
  strike: ["9", "29"],
  // 10-20 are fonts
  // 21-29 are resets for 1-9
  black: ["30", "39"],
  red: ["31", "39"],
  green: ["32", "39"],
  yellow: ["33", "39"],
  blue: ["34", "39"],
  magenta: ["35", "39"],
  cyan: ["36", "39"],
  white: ["37", "39"],
  brightblack: ["30;1", "39"],
  brightred: ["31;1", "39"],
  brightgreen: ["32;1", "39"],
  brightyellow: ["33;1", "39"],
  brightblue: ["34;1", "39"],
  brightmagenta: ["35;1", "39"],
  brightcyan: ["36;1", "39"],
  brightwhite: ["37;1", "39"],
  grey: ["90", "39"]
}, styles = {
  special: "cyan",
  number: "yellow",
  bigint: "yellow",
  boolean: "yellow",
  undefined: "grey",
  null: "bold",
  string: "green",
  symbol: "green",
  date: "magenta",
  regexp: "red"
}, truncator = "\u2026";
function colorise(value, styleType) {
  let color = ansiColors[styles[styleType]] || ansiColors[styleType] || "";
  return color ? `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m` : String(value);
}
__name(colorise, "colorise");
function normaliseOptions({
  showHidden = !1,
  depth = 2,
  colors = !1,
  customInspect = !0,
  showProxy = !1,
  maxArrayLength = 1 / 0,
  breakLength = 1 / 0,
  seen = [],
  // eslint-disable-next-line no-shadow
  truncate: truncate2 = 1 / 0,
  stylize = String
} = {}, inspect32) {
  let options = {
    showHidden: !!showHidden,
    depth: Number(depth),
    colors: !!colors,
    customInspect: !!customInspect,
    showProxy: !!showProxy,
    maxArrayLength: Number(maxArrayLength),
    breakLength: Number(breakLength),
    truncate: Number(truncate2),
    seen,
    inspect: inspect32,
    stylize
  };
  return options.colors && (options.stylize = colorise), options;
}
__name(normaliseOptions, "normaliseOptions");
function isHighSurrogate(char) {
  return char >= "\uD800" && char <= "\uDBFF";
}
__name(isHighSurrogate, "isHighSurrogate");
function truncate(string, length, tail = truncator) {
  string = String(string);
  let tailLength = tail.length, stringLength = string.length;
  if (tailLength > length && stringLength > tailLength)
    return tail;
  if (stringLength > length && stringLength > tailLength) {
    let end = length - tailLength;
    return end > 0 && isHighSurrogate(string[end - 1]) && (end = end - 1), `${string.slice(0, end)}${tail}`;
  }
  return string;
}
__name(truncate, "truncate");
function inspectList(list, options, inspectItem, separator = ", ") {
  inspectItem = inspectItem || options.inspect;
  let size = list.length;
  if (size === 0)
    return "";
  let originalLength = options.truncate, output = "", peek = "", truncated = "";
  for (let i = 0; i < size; i += 1) {
    let last = i + 1 === list.length, secondToLast = i + 2 === list.length;
    truncated = `${truncator}(${list.length - i})`;
    let value = list[i];
    options.truncate = originalLength - output.length - (last ? 0 : separator.length);
    let string = peek || inspectItem(value, options) + (last ? "" : separator), nextLength = output.length + string.length, truncatedLength = nextLength + truncated.length;
    if (last && nextLength > originalLength && output.length + truncated.length <= originalLength || !last && !secondToLast && truncatedLength > originalLength || (peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator), !last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength))
      break;
    if (output += string, !last && !secondToLast && nextLength + peek.length >= originalLength) {
      truncated = `${truncator}(${list.length - i - 1})`;
      break;
    }
    truncated = "";
  }
  return `${output}${truncated}`;
}
__name(inspectList, "inspectList");
function quoteComplexKey(key) {
  return key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) ? key : JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
}
__name(quoteComplexKey, "quoteComplexKey");
function inspectProperty([key, value], options) {
  return options.truncate -= 2, typeof key == "string" ? key = quoteComplexKey(key) : typeof key != "number" && (key = `[${options.inspect(key, options)}]`), options.truncate -= key.length, value = options.inspect(value, options), `${key}: ${value}`;
}
__name(inspectProperty, "inspectProperty");
function inspectArray(array, options) {
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length)
    return "[]";
  options.truncate -= 4;
  let listContents = inspectList(array, options);
  options.truncate -= listContents.length;
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty)), `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
__name(inspectArray, "inspectArray");
var getArrayName = __name((array) => typeof Buffer == "function" && array instanceof Buffer ? "Buffer" : array[Symbol.toStringTag] ? array[Symbol.toStringTag] : array.constructor.name, "getArrayName");
function inspectTypedArray(array, options) {
  let name = getArrayName(array);
  options.truncate -= name.length + 4;
  let nonIndexProperties = Object.keys(array).slice(array.length);
  if (!array.length && !nonIndexProperties.length)
    return `${name}[]`;
  let output = "";
  for (let i = 0; i < array.length; i++) {
    let string = `${options.stylize(truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
    if (options.truncate -= string.length, array[i] !== array.length && options.truncate <= 3) {
      output += `${truncator}(${array.length - array[i] + 1})`;
      break;
    }
    output += string;
  }
  let propertyContents = "";
  return nonIndexProperties.length && (propertyContents = inspectList(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty)), `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
}
__name(inspectTypedArray, "inspectTypedArray");
function inspectDate(dateObject, options) {
  let stringRepresentation = dateObject.toJSON();
  if (stringRepresentation === null)
    return "Invalid Date";
  let split = stringRepresentation.split("T"), date = split[0];
  return options.stylize(`${date}T${truncate(split[1], options.truncate - date.length - 1)}`, "date");
}
__name(inspectDate, "inspectDate");
function inspectFunction(func, options) {
  let functionType = func[Symbol.toStringTag] || "Function", name = func.name;
  return name ? options.stylize(`[${functionType} ${truncate(name, options.truncate - 11)}]`, "special") : options.stylize(`[${functionType}]`, "special");
}
__name(inspectFunction, "inspectFunction");
function inspectMapEntry([key, value], options) {
  return options.truncate -= 4, key = options.inspect(key, options), options.truncate -= key.length, value = options.inspect(value, options), `${key} => ${value}`;
}
__name(inspectMapEntry, "inspectMapEntry");
function mapToEntries(map) {
  let entries = [];
  return map.forEach((value, key) => {
    entries.push([key, value]);
  }), entries;
}
__name(mapToEntries, "mapToEntries");
function inspectMap(map, options) {
  return map.size === 0 ? "Map{}" : (options.truncate -= 7, `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry)} }`);
}
__name(inspectMap, "inspectMap");
var isNaN2 = Number.isNaN || ((i) => i !== i);
function inspectNumber(number, options) {
  return isNaN2(number) ? options.stylize("NaN", "number") : number === 1 / 0 ? options.stylize("Infinity", "number") : number === -1 / 0 ? options.stylize("-Infinity", "number") : number === 0 ? options.stylize(1 / number === 1 / 0 ? "+0" : "-0", "number") : options.stylize(truncate(String(number), options.truncate), "number");
}
__name(inspectNumber, "inspectNumber");
function inspectBigInt(number, options) {
  let nums = truncate(number.toString(), options.truncate - 1);
  return nums !== truncator && (nums += "n"), options.stylize(nums, "bigint");
}
__name(inspectBigInt, "inspectBigInt");
function inspectRegExp(value, options) {
  let flags = value.toString().split("/")[2], sourceLength = options.truncate - (2 + flags.length), source = value.source;
  return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, "regexp");
}
__name(inspectRegExp, "inspectRegExp");
function arrayFromSet(set2) {
  let values = [];
  return set2.forEach((value) => {
    values.push(value);
  }), values;
}
__name(arrayFromSet, "arrayFromSet");
function inspectSet(set2, options) {
  return set2.size === 0 ? "Set{}" : (options.truncate -= 7, `Set{ ${inspectList(arrayFromSet(set2), options)} }`);
}
__name(inspectSet, "inspectSet");
var stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g"), escapeCharacters = {
  "\b": "\\b",
  "	": "\\t",
  "\n": "\\n",
  "\f": "\\f",
  "\r": "\\r",
  "'": "\\'",
  "\\": "\\\\"
}, hex = 16, unicodeLength = 4;
function escape(char) {
  return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
}
__name(escape, "escape");
function inspectString(string, options) {
  return stringEscapeChars.test(string) && (string = string.replace(stringEscapeChars, escape)), options.stylize(`'${truncate(string, options.truncate - 2)}'`, "string");
}
__name(inspectString, "inspectString");
function inspectSymbol(value) {
  return "description" in Symbol.prototype ? value.description ? `Symbol(${value.description})` : "Symbol()" : value.toString();
}
__name(inspectSymbol, "inspectSymbol");
var getPromiseValue = __name(() => "Promise{\u2026}", "getPromiseValue"), promise_default = getPromiseValue;
function inspectObject(object, options) {
  let properties = Object.getOwnPropertyNames(object), symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
  if (properties.length === 0 && symbols.length === 0)
    return "{}";
  if (options.truncate -= 4, options.seen = options.seen || [], options.seen.includes(object))
    return "[Circular]";
  options.seen.push(object);
  let propertyContents = inspectList(properties.map((key) => [key, object[key]]), options, inspectProperty), symbolContents = inspectList(symbols.map((key) => [key, object[key]]), options, inspectProperty);
  options.seen.pop();
  let sep = "";
  return propertyContents && symbolContents && (sep = ", "), `{ ${propertyContents}${sep}${symbolContents} }`;
}
__name(inspectObject, "inspectObject");
var toStringTag = typeof Symbol < "u" && Symbol.toStringTag ? Symbol.toStringTag : !1;
function inspectClass(value, options) {
  let name = "";
  return toStringTag && toStringTag in value && (name = value[toStringTag]), name = name || value.constructor.name, (!name || name === "_class") && (name = "<Anonymous Class>"), options.truncate -= name.length, `${name}${inspectObject(value, options)}`;
}
__name(inspectClass, "inspectClass");
function inspectArguments(args, options) {
  return args.length === 0 ? "Arguments[]" : (options.truncate -= 13, `Arguments[ ${inspectList(args, options)} ]`);
}
__name(inspectArguments, "inspectArguments");
var errorKeys = [
  "stack",
  "line",
  "column",
  "name",
  "message",
  "fileName",
  "lineNumber",
  "columnNumber",
  "number",
  "description",
  "cause"
];
function inspectObject2(error, options) {
  let properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys.indexOf(key) === -1), name = error.name;
  options.truncate -= name.length;
  let message = "";
  if (typeof error.message == "string" ? message = truncate(error.message, options.truncate) : properties.unshift("message"), message = message ? `: ${message}` : "", options.truncate -= message.length + 5, options.seen = options.seen || [], options.seen.includes(error))
    return "[Circular]";
  options.seen.push(error);
  let propertyContents = inspectList(properties.map((key) => [key, error[key]]), options, inspectProperty);
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
}
__name(inspectObject2, "inspectObject");
function inspectAttribute([key, value], options) {
  return options.truncate -= 3, value ? `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}` : `${options.stylize(String(key), "yellow")}`;
}
__name(inspectAttribute, "inspectAttribute");
function inspectNodeCollection(collection, options) {
  return inspectList(collection, options, inspectNode, `
`);
}
__name(inspectNodeCollection, "inspectNodeCollection");
function inspectNode(node, options) {
  switch (node.nodeType) {
    case 1:
      return inspectHTML(node, options);
    case 3:
      return options.inspect(node.data, options);
    default:
      return options.inspect(node, options);
  }
}
__name(inspectNode, "inspectNode");
function inspectHTML(element, options) {
  let properties = element.getAttributeNames(), name = element.tagName.toLowerCase(), head = options.stylize(`<${name}`, "special"), headClose = options.stylize(">", "special"), tail = options.stylize(`</${name}>`, "special");
  options.truncate -= name.length * 2 + 5;
  let propertyContents = "";
  properties.length > 0 && (propertyContents += " ", propertyContents += inspectList(properties.map((key) => [key, element.getAttribute(key)]), options, inspectAttribute, " ")), options.truncate -= propertyContents.length;
  let truncate2 = options.truncate, children = inspectNodeCollection(element.children, options);
  return children && children.length > truncate2 && (children = `${truncator}(${element.children.length})`), `${head}${propertyContents}${headClose}${children}${tail}`;
}
__name(inspectHTML, "inspectHTML");
var symbolsSupported = typeof Symbol == "function" && typeof Symbol.for == "function", chaiInspect = symbolsSupported ? /* @__PURE__ */ Symbol.for("chai/inspect") : "@@chai/inspect", nodeInspect = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), constructorMap = /* @__PURE__ */ new WeakMap(), stringTagMap = {}, baseTypesMap = {
  undefined: __name((value, options) => options.stylize("undefined", "undefined"), "undefined"),
  null: __name((value, options) => options.stylize("null", "null"), "null"),
  boolean: __name((value, options) => options.stylize(String(value), "boolean"), "boolean"),
  Boolean: __name((value, options) => options.stylize(String(value), "boolean"), "Boolean"),
  number: inspectNumber,
  Number: inspectNumber,
  bigint: inspectBigInt,
  BigInt: inspectBigInt,
  string: inspectString,
  String: inspectString,
  function: inspectFunction,
  Function: inspectFunction,
  symbol: inspectSymbol,
  // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
  Symbol: inspectSymbol,
  Array: inspectArray,
  Date: inspectDate,
  Map: inspectMap,
  Set: inspectSet,
  RegExp: inspectRegExp,
  Promise: promise_default,
  // WeakSet, WeakMap are totally opaque to us
  WeakSet: __name((value, options) => options.stylize("WeakSet{\u2026}", "special"), "WeakSet"),
  WeakMap: __name((value, options) => options.stylize("WeakMap{\u2026}", "special"), "WeakMap"),
  Arguments: inspectArguments,
  Int8Array: inspectTypedArray,
  Uint8Array: inspectTypedArray,
  Uint8ClampedArray: inspectTypedArray,
  Int16Array: inspectTypedArray,
  Uint16Array: inspectTypedArray,
  Int32Array: inspectTypedArray,
  Uint32Array: inspectTypedArray,
  Float32Array: inspectTypedArray,
  Float64Array: inspectTypedArray,
  Generator: __name(() => "", "Generator"),
  DataView: __name(() => "", "DataView"),
  ArrayBuffer: __name(() => "", "ArrayBuffer"),
  Error: inspectObject2,
  HTMLCollection: inspectNodeCollection,
  NodeList: inspectNodeCollection
}, inspectCustom = __name((value, options, type32) => chaiInspect in value && typeof value[chaiInspect] == "function" ? value[chaiInspect](options) : nodeInspect in value && typeof value[nodeInspect] == "function" ? value[nodeInspect](options.depth, options) : "inspect" in value && typeof value.inspect == "function" ? value.inspect(options.depth, options) : "constructor" in value && constructorMap.has(value.constructor) ? constructorMap.get(value.constructor)(value, options) : stringTagMap[type32] ? stringTagMap[type32](value, options) : "", "inspectCustom"), toString = Object.prototype.toString;
function inspect(value, opts = {}) {
  let options = normaliseOptions(opts, inspect), { customInspect } = options, type32 = value === null ? "null" : typeof value;
  if (type32 === "object" && (type32 = toString.call(value).slice(8, -1)), type32 in baseTypesMap)
    return baseTypesMap[type32](value, options);
  if (customInspect && value) {
    let output = inspectCustom(value, options, type32);
    if (output)
      return typeof output == "string" ? output : inspect(output, options);
  }
  let proto = value ? Object.getPrototypeOf(value) : !1;
  return proto === Object.prototype || proto === null ? inspectObject(value, options) : value && typeof HTMLElement == "function" && value instanceof HTMLElement ? inspectHTML(value, options) : "constructor" in value ? value.constructor !== Object ? inspectClass(value, options) : inspectObject(value, options) : value === Object(value) ? inspectObject(value, options) : options.stylize(String(value), type32);
}
__name(inspect, "inspect");
var config = {
  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {boolean}
   * @public
   */
  includeStack: !1,
  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {boolean}
   * @public
   */
  showDiff: !0,
  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {number}
   * @public
   */
  truncateThreshold: 40,
  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {boolean}
   * @public
   */
  useProxy: !0,
  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @public
   */
  proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"],
  /**
   * ### config.deepEqual
   *
   * User configurable property, defines which a custom function to use for deepEqual
   * comparisons.
   * By default, the function used is the one from the `deep-eql` package without custom comparator.
   *
   *     // use a custom comparator
   *     chai.config.deepEqual = (expected, actual) => {
   *         return chai.util.eql(expected, actual, {
   *             comparator: (expected, actual) => {
   *                 // for non number comparison, use the default behavior
   *                 if(typeof expected !== 'number') return null;
   *                 // allow a difference of 10 between compared numbers
   *                 return typeof actual === 'number' && Math.abs(actual - expected) < 10
   *             }
   *         })
   *     };
   *
   * @param {Function}
   * @public
   */
  deepEqual: null
};
function inspect2(obj, showHidden, depth, colors) {
  let options = {
    colors,
    depth: typeof depth > "u" ? 2 : depth,
    showHidden,
    truncate: config.truncateThreshold ? config.truncateThreshold : 1 / 0
  };
  return inspect(obj, options);
}
__name(inspect2, "inspect");
function objDisplay(obj) {
  let str = inspect2(obj), type32 = Object.prototype.toString.call(obj);
  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type32 === "[object Function]")
      return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
    if (type32 === "[object Array]")
      return "[ Array(" + obj.length + ") ]";
    if (type32 === "[object Object]") {
      let keys2 = Object.keys(obj);
      return "{ Object (" + (keys2.length > 2 ? keys2.splice(0, 2).join(", ") + ", ..." : keys2.join(", ")) + ") }";
    } else
      return str;
  } else
    return str;
}
__name(objDisplay, "objDisplay");
function getMessage2(obj, args) {
  let negate = flag(obj, "negate"), val = flag(obj, "object"), expected = args[3], actual = getActual(obj, args), msg = negate ? args[2] : args[1], flagMsg = flag(obj, "message");
  return typeof msg == "function" && (msg = msg()), msg = msg || "", msg = msg.replace(/#\{this\}/g, function() {
    return objDisplay(val);
  }).replace(/#\{act\}/g, function() {
    return objDisplay(actual);
  }).replace(/#\{exp\}/g, function() {
    return objDisplay(expected);
  }), flagMsg ? flagMsg + ": " + msg : msg;
}
__name(getMessage2, "getMessage");
function transferFlags(assertion, object, includeAll) {
  let flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
  object.__flags || (object.__flags = /* @__PURE__ */ Object.create(null)), includeAll = arguments.length === 3 ? includeAll : !0;
  for (let flag3 in flags)
    (includeAll || flag3 !== "object" && flag3 !== "ssfi" && flag3 !== "lockSsfi" && flag3 != "message") && (object.__flags[flag3] = flags[flag3]);
}
__name(transferFlags, "transferFlags");
function type2(obj) {
  if (typeof obj > "u")
    return "undefined";
  if (obj === null)
    return "null";
  let stringTag = obj[Symbol.toStringTag];
  return typeof stringTag == "string" ? stringTag : Object.prototype.toString.call(obj).slice(8, -1);
}
__name(type2, "type");
function FakeMap() {
  this._key = "chai/deep-eql__" + Math.random() + Date.now();
}
__name(FakeMap, "FakeMap");
FakeMap.prototype = {
  get: __name(function(key) {
    return key[this._key];
  }, "get"),
  set: __name(function(key, value) {
    Object.isExtensible(key) && Object.defineProperty(key, this._key, {
      value,
      configurable: !0
    });
  }, "set")
};
var MemoizeMap = typeof WeakMap == "function" ? WeakMap : FakeMap;
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand))
    return null;
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result == "boolean")
      return result;
  }
  return null;
}
__name(memoizeCompare, "memoizeCompare");
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  if (!(!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand))) {
    var leftHandMap = memoizeMap.get(leftHandOperand);
    leftHandMap ? leftHandMap.set(rightHandOperand, result) : (leftHandMap = new MemoizeMap(), leftHandMap.set(rightHandOperand, result), memoizeMap.set(leftHandOperand, leftHandMap));
  }
}
__name(memoizeSet, "memoizeSet");
var deep_eql_default = deepEqual;
function deepEqual(leftHandOperand, rightHandOperand, options) {
  if (options && options.comparator)
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  return simpleResult !== null ? simpleResult : extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}
__name(deepEqual, "deepEqual");
function simpleEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand === rightHandOperand ? leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand : leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
  rightHandOperand !== rightHandOperand ? !0 : isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand) ? !1 : null;
}
__name(simpleEqual, "simpleEqual");
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {}, options.memoize = options.memoize === !1 ? !1 : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator, memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null)
    return memoizeResultLeft;
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null)
    return memoizeResultRight;
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    if (comparatorResult === !1 || comparatorResult === !0)
      return memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult), comparatorResult;
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null)
      return simpleResult;
  }
  var leftHandType = type2(leftHandOperand);
  if (leftHandType !== type2(rightHandOperand))
    return memoizeSet(leftHandOperand, rightHandOperand, options.memoize, !1), !1;
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, !0);
  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  return memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result), result;
}
__name(extensiveDeepEqual, "extensiveDeepEqual");
function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case "String":
    case "Number":
    case "Boolean":
    case "Date":
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case "Promise":
    case "Symbol":
    case "function":
    case "WeakMap":
    case "WeakSet":
      return leftHandOperand === rightHandOperand;
    case "Error":
      return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
    case "Arguments":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "Array":
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case "RegExp":
      return regexpEqual(leftHandOperand, rightHandOperand);
    case "Generator":
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case "DataView":
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case "ArrayBuffer":
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case "Set":
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case "Map":
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case "Temporal.PlainDate":
    case "Temporal.PlainTime":
    case "Temporal.PlainDateTime":
    case "Temporal.Instant":
    case "Temporal.ZonedDateTime":
    case "Temporal.PlainYearMonth":
    case "Temporal.PlainMonthDay":
      return leftHandOperand.equals(rightHandOperand);
    case "Temporal.Duration":
      return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
    case "Temporal.TimeZone":
    case "Temporal.Calendar":
      return leftHandOperand.toString() === rightHandOperand.toString();
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}
__name(extensiveDeepEqualByType, "extensiveDeepEqualByType");
function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}
__name(regexpEqual, "regexpEqual");
function entriesEqual(leftHandOperand, rightHandOperand, options) {
  try {
    if (leftHandOperand.size !== rightHandOperand.size)
      return !1;
    if (leftHandOperand.size === 0)
      return !0;
  } catch {
    return !1;
  }
  var leftHandItems = [], rightHandItems = [];
  return leftHandOperand.forEach(__name(function(key, value) {
    leftHandItems.push([key, value]);
  }, "gatherEntries")), rightHandOperand.forEach(__name(function(key, value) {
    rightHandItems.push([key, value]);
  }, "gatherEntries")), iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}
__name(entriesEqual, "entriesEqual");
function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length)
    return !1;
  if (length === 0)
    return !0;
  for (var index = -1; ++index < length; )
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === !1)
      return !1;
  return !0;
}
__name(iterableEqual, "iterableEqual");
function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}
__name(generatorEqual, "generatorEqual");
function hasIteratorFunction(target) {
  return typeof Symbol < "u" && typeof target == "object" && typeof Symbol.iterator < "u" && typeof target[Symbol.iterator] == "function";
}
__name(hasIteratorFunction, "hasIteratorFunction");
function getIteratorEntries(target) {
  if (hasIteratorFunction(target))
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch {
      return [];
    }
  return [];
}
__name(getIteratorEntries, "getIteratorEntries");
function getGeneratorEntries(generator) {
  for (var generatorResult = generator.next(), accumulator = [generatorResult.value]; generatorResult.done === !1; )
    generatorResult = generator.next(), accumulator.push(generatorResult.value);
  return accumulator;
}
__name(getGeneratorEntries, "getGeneratorEntries");
function getEnumerableKeys(target) {
  var keys2 = [];
  for (var key in target)
    keys2.push(key);
  return keys2;
}
__name(getEnumerableKeys, "getEnumerableKeys");
function getEnumerableSymbols(target) {
  for (var keys2 = [], allKeys = Object.getOwnPropertySymbols(target), i = 0; i < allKeys.length; i += 1) {
    var key = allKeys[i];
    Object.getOwnPropertyDescriptor(target, key).enumerable && keys2.push(key);
  }
  return keys2;
}
__name(getEnumerableSymbols, "getEnumerableSymbols");
function keysEqual(leftHandOperand, rightHandOperand, keys2, options) {
  var length = keys2.length;
  if (length === 0)
    return !0;
  for (var i = 0; i < length; i += 1)
    if (deepEqual(leftHandOperand[keys2[i]], rightHandOperand[keys2[i]], options) === !1)
      return !1;
  return !0;
}
__name(keysEqual, "keysEqual");
function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand), rightHandKeys = getEnumerableKeys(rightHandOperand), leftHandSymbols = getEnumerableSymbols(leftHandOperand), rightHandSymbols = getEnumerableSymbols(rightHandOperand);
  if (leftHandKeys = leftHandKeys.concat(leftHandSymbols), rightHandKeys = rightHandKeys.concat(rightHandSymbols), leftHandKeys.length && leftHandKeys.length === rightHandKeys.length)
    return iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort()) === !1 ? !1 : keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  var leftHandEntries = getIteratorEntries(leftHandOperand), rightHandEntries = getIteratorEntries(rightHandOperand);
  return leftHandEntries.length && leftHandEntries.length === rightHandEntries.length ? (leftHandEntries.sort(), rightHandEntries.sort(), iterableEqual(leftHandEntries, rightHandEntries, options)) : leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0;
}
__name(objectEqual, "objectEqual");
function isPrimitive(value) {
  return value === null || typeof value != "object";
}
__name(isPrimitive, "isPrimitive");
function mapSymbols(arr) {
  return arr.map(__name(function(entry) {
    return typeof entry == "symbol" ? entry.toString() : entry;
  }, "mapSymbol"));
}
__name(mapSymbols, "mapSymbols");
function hasProperty(obj, name) {
  return typeof obj > "u" || obj === null ? !1 : name in Object(obj);
}
__name(hasProperty, "hasProperty");
function parsePath(path) {
  return path.replace(/([^\\])\[/g, "$1.[").match(/(\\\.|[^.]+?)+/g).map((value) => {
    if (value === "constructor" || value === "__proto__" || value === "prototype")
      return {};
    let mArr = /^\[(\d+)\]$/.exec(value), parsed = null;
    return mArr ? parsed = { i: parseFloat(mArr[1]) } : parsed = { p: value.replace(/\\([.[\]])/g, "$1") }, parsed;
  });
}
__name(parsePath, "parsePath");
function internalGetPathValue(obj, parsed, pathDepth) {
  let temporaryValue = obj, res = null;
  pathDepth = typeof pathDepth > "u" ? parsed.length : pathDepth;
  for (let i = 0; i < pathDepth; i++) {
    let part = parsed[i];
    temporaryValue && (typeof part.p > "u" ? temporaryValue = temporaryValue[part.i] : temporaryValue = temporaryValue[part.p], i === pathDepth - 1 && (res = temporaryValue));
  }
  return res;
}
__name(internalGetPathValue, "internalGetPathValue");
function getPathInfo(obj, path) {
  let parsed = parsePath(path), last = parsed[parsed.length - 1], info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed)
  };
  return info.exists = hasProperty(info.parent, info.name), info;
}
__name(getPathInfo, "getPathInfo");
var _a2, Assertion = (_a2 = class {
  /** @type {{}} */
  __flags = {};
  /**
   * Creates object for chaining.
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   * the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   * contain `numKittens` so that the `equal` assertion can reference it when
   * needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   * prepended to the error message that's generated by the assertion when it
   * fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   * contains a function reference that serves as the starting point for
   * removing frames from the stack trace of the error that's created by the
   * assertion when it fails. The goal is to provide a cleaner stack trace to
   * end users by removing Chai's internal functions. Note that it only works
   * in environments that support `Error.captureStackTrace`, and only when
   * `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   * should retain its current value, even as assertions are chained off of
   * this object. This is usually set to `true` when creating a new assertion
   * from within another assertion. It's also temporarily set to `true` before
   * an overwritten assertion gets called by the overwriting assertion.
   *
   * - `eql`: This flag contains the deepEqual function to be used by the assertion.
   *
   * @param {unknown} obj target of the assertion
   * @param {string} [msg] (optional) custom error message
   * @param {Function} [ssfi] (optional) starting point for removing stack frames
   * @param {boolean} [lockSsfi] (optional) whether or not the ssfi flag is locked
   */
  constructor(obj, msg, ssfi, lockSsfi) {
    return flag(this, "ssfi", ssfi || _a2), flag(this, "lockSsfi", lockSsfi), flag(this, "object", obj), flag(this, "message", msg), flag(this, "eql", config.deepEqual || deep_eql_default), proxify(this);
  }
  /** @returns {boolean} */
  static get includeStack() {
    return console.warn(
      "Assertion.includeStack is deprecated, use chai.config.includeStack instead."
    ), config.includeStack;
  }
  /** @param {boolean} value */
  static set includeStack(value) {
    console.warn(
      "Assertion.includeStack is deprecated, use chai.config.includeStack instead."
    ), config.includeStack = value;
  }
  /** @returns {boolean} */
  static get showDiff() {
    return console.warn(
      "Assertion.showDiff is deprecated, use chai.config.showDiff instead."
    ), config.showDiff;
  }
  /** @param {boolean} value */
  static set showDiff(value) {
    console.warn(
      "Assertion.showDiff is deprecated, use chai.config.showDiff instead."
    ), config.showDiff = value;
  }
  /**
   * @param {string} name
   * @param {Function} fn
   */
  static addProperty(name, fn3) {
    addProperty(this.prototype, name, fn3);
  }
  /**
   * @param {string} name
   * @param {Function} fn
   */
  static addMethod(name, fn3) {
    addMethod(this.prototype, name, fn3);
  }
  /**
   * @param {string} name
   * @param {Function} fn
   * @param {Function} chainingBehavior
   */
  static addChainableMethod(name, fn3, chainingBehavior) {
    addChainableMethod(this.prototype, name, fn3, chainingBehavior);
  }
  /**
   * @param {string} name
   * @param {Function} fn
   */
  static overwriteProperty(name, fn3) {
    overwriteProperty(this.prototype, name, fn3);
  }
  /**
   * @param {string} name
   * @param {Function} fn
   */
  static overwriteMethod(name, fn3) {
    overwriteMethod(this.prototype, name, fn3);
  }
  /**
   * @param {string} name
   * @param {Function} fn
   * @param {Function} chainingBehavior
   */
  static overwriteChainableMethod(name, fn3, chainingBehavior) {
    overwriteChainableMethod(this.prototype, name, fn3, chainingBehavior);
  }
  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {unknown} _expr to be tested
   * @param {string | Function} msg or function that returns message to display if expression fails
   * @param {string | Function} _negateMsg or function that returns negatedMessage to display if negated expression fails
   * @param {unknown} expected value (remember to check for negation)
   * @param {unknown} _actual (optional) will default to `this.obj`
   * @param {boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @returns {void}
   */
  assert(_expr, msg, _negateMsg, expected, _actual, showDiff) {
    let ok = test(this, arguments);
    if (showDiff !== !1 && (showDiff = !0), expected === void 0 && _actual === void 0 && (showDiff = !1), config.showDiff !== !0 && (showDiff = !1), !ok) {
      msg = getMessage2(this, arguments);
      let assertionErrorObjectProperties = {
        actual: getActual(this, arguments),
        expected,
        showDiff
      }, operator = getOperator(this, arguments);
      throw operator && (assertionErrorObjectProperties.operator = operator), new AssertionError(
        msg,
        assertionErrorObjectProperties,
        // @ts-expect-error Not sure what to do about these types yet
        config.includeStack ? this.assert : flag(this, "ssfi")
      );
    }
  }
  /**
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @returns {unknown}
   */
  get _obj() {
    return flag(this, "object");
  }
  /**
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @param {unknown} val
   */
  set _obj(val) {
    flag(this, "object", val);
  }
}, __name(_a2, "Assertion"), _a2);
function isProxyEnabled() {
  return config.useProxy && typeof Proxy < "u" && typeof Reflect < "u";
}
__name(isProxyEnabled, "isProxyEnabled");
function addProperty(ctx, name, getter) {
  getter = getter === void 0 ? function() {
  } : getter, Object.defineProperty(ctx, name, {
    get: __name(function propertyGetter() {
      !isProxyEnabled() && !flag(this, "lockSsfi") && flag(this, "ssfi", propertyGetter);
      let result = getter.call(this);
      if (result !== void 0) return result;
      let newAssertion = new Assertion();
      return transferFlags(this, newAssertion), newAssertion;
    }, "propertyGetter"),
    configurable: !0
  });
}
__name(addProperty, "addProperty");
var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
}, "length");
function addLengthGuard(fn3, assertionName, isChainable) {
  return fnLengthDesc.configurable && Object.defineProperty(fn3, "length", {
    get: __name(function() {
      throw Error(
        isChainable ? "Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.' : "Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".'
      );
    }, "get")
  }), fn3;
}
__name(addLengthGuard, "addLengthGuard");
function getProperties(object) {
  let result = Object.getOwnPropertyNames(object);
  function addProperty2(property) {
    result.indexOf(property) === -1 && result.push(property);
  }
  __name(addProperty2, "addProperty");
  let proto = Object.getPrototypeOf(object);
  for (; proto !== null; )
    Object.getOwnPropertyNames(proto).forEach(addProperty2), proto = Object.getPrototypeOf(proto);
  return result;
}
__name(getProperties, "getProperties");
var builtins = ["__flags", "__methods", "_obj", "assert"];
function proxify(obj, nonChainableMethodName) {
  return isProxyEnabled() ? new Proxy(obj, {
    get: __name(function proxyGetter(target, property) {
      if (typeof property == "string" && config.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
        if (nonChainableMethodName)
          throw Error(
            "Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".'
          );
        let suggestion = null, suggestionDistance = 4;
        throw getProperties(target).forEach(function(prop) {
          if (
            // we actually mean to check `Object.prototype` here
            // eslint-disable-next-line no-prototype-builtins
            !Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1
          ) {
            let dist = stringDistanceCapped(property, prop, suggestionDistance);
            dist < suggestionDistance && (suggestion = prop, suggestionDistance = dist);
          }
        }), Error(
          suggestion !== null ? "Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?' : "Invalid Chai property: " + property
        );
      }
      return builtins.indexOf(property) === -1 && !flag(target, "lockSsfi") && flag(target, "ssfi", proxyGetter), Reflect.get(target, property);
    }, "proxyGetter")
  }) : obj;
}
__name(proxify, "proxify");
function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap)
    return cap;
  let memo = [];
  for (let i = 0; i <= strA.length; i++)
    memo[i] = Array(strB.length + 1).fill(0), memo[i][0] = i;
  for (let j = 0; j < strB.length; j++)
    memo[0][j] = j;
  for (let i = 1; i <= strA.length; i++) {
    let ch = strA.charCodeAt(i - 1);
    for (let j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(
        memo[i - 1][j] + 1,
        memo[i][j - 1] + 1,
        memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1)
      );
    }
  }
  return memo[strA.length][strB.length];
}
__name(stringDistanceCapped, "stringDistanceCapped");
function addMethod(ctx, name, method) {
  let methodWrapper = __name(function() {
    flag(this, "lockSsfi") || flag(this, "ssfi", methodWrapper);
    let result = method.apply(this, arguments);
    if (result !== void 0) return result;
    let newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "methodWrapper");
  addLengthGuard(methodWrapper, name, !1), ctx[name] = proxify(methodWrapper, name);
}
__name(addMethod, "addMethod");
function overwriteProperty(ctx, name, getter) {
  let _get = Object.getOwnPropertyDescriptor(ctx, name), _super = __name(function() {
  }, "_super");
  _get && typeof _get.get == "function" && (_super = _get.get), Object.defineProperty(ctx, name, {
    get: __name(function overwritingPropertyGetter() {
      !isProxyEnabled() && !flag(this, "lockSsfi") && flag(this, "ssfi", overwritingPropertyGetter);
      let origLockSsfi = flag(this, "lockSsfi");
      flag(this, "lockSsfi", !0);
      let result = getter(_super).call(this);
      if (flag(this, "lockSsfi", origLockSsfi), result !== void 0)
        return result;
      let newAssertion = new Assertion();
      return transferFlags(this, newAssertion), newAssertion;
    }, "overwritingPropertyGetter"),
    configurable: !0
  });
}
__name(overwriteProperty, "overwriteProperty");
function overwriteMethod(ctx, name, method) {
  let _method = ctx[name], _super = __name(function() {
    throw new Error(name + " is not a function");
  }, "_super");
  _method && typeof _method == "function" && (_super = _method);
  let overwritingMethodWrapper = __name(function() {
    flag(this, "lockSsfi") || flag(this, "ssfi", overwritingMethodWrapper);
    let origLockSsfi = flag(this, "lockSsfi");
    flag(this, "lockSsfi", !0);
    let result = method(_super).apply(this, arguments);
    if (flag(this, "lockSsfi", origLockSsfi), result !== void 0)
      return result;
    let newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingMethodWrapper");
  addLengthGuard(overwritingMethodWrapper, name, !1), ctx[name] = proxify(overwritingMethodWrapper, name);
}
__name(overwriteMethod, "overwriteMethod");
var canSetPrototype = typeof Object.setPrototypeOf == "function", testFn = __name(function() {
}, "testFn"), excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  let propDesc = Object.getOwnPropertyDescriptor(testFn, name);
  return typeof propDesc != "object" ? !0 : !propDesc.configurable;
}), call = Function.prototype.call, apply = Function.prototype.apply;
function addChainableMethod(ctx, name, method, chainingBehavior) {
  typeof chainingBehavior != "function" && (chainingBehavior = __name(function() {
  }, "chainingBehavior"));
  let chainableBehavior = {
    method,
    chainingBehavior
  };
  ctx.__methods || (ctx.__methods = {}), ctx.__methods[name] = chainableBehavior, Object.defineProperty(ctx, name, {
    get: __name(function() {
      chainableBehavior.chainingBehavior.call(this);
      let chainableMethodWrapper = __name(function() {
        flag(this, "lockSsfi") || flag(this, "ssfi", chainableMethodWrapper);
        let result = chainableBehavior.method.apply(this, arguments);
        if (result !== void 0)
          return result;
        let newAssertion = new Assertion();
        return transferFlags(this, newAssertion), newAssertion;
      }, "chainableMethodWrapper");
      if (addLengthGuard(chainableMethodWrapper, name, !0), canSetPrototype) {
        let prototype = Object.create(this);
        prototype.call = call, prototype.apply = apply, Object.setPrototypeOf(chainableMethodWrapper, prototype);
      } else
        Object.getOwnPropertyNames(ctx).forEach(function(asserterName) {
          if (excludeNames.indexOf(asserterName) !== -1)
            return;
          let pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
          Object.defineProperty(chainableMethodWrapper, asserterName, pd);
        });
      return transferFlags(this, chainableMethodWrapper), proxify(chainableMethodWrapper);
    }, "chainableMethodGetter"),
    configurable: !0
  });
}
__name(addChainableMethod, "addChainableMethod");
function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  let chainableBehavior = ctx.__methods[name], _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = __name(function() {
    let result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== void 0)
      return result;
    let newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingChainableMethodGetter");
  let _method = chainableBehavior.method;
  chainableBehavior.method = __name(function() {
    let result = method(_method).apply(this, arguments);
    if (result !== void 0)
      return result;
    let newAssertion = new Assertion();
    return transferFlags(this, newAssertion), newAssertion;
  }, "overwritingChainableMethodWrapper");
}
__name(overwriteChainableMethod, "overwriteChainableMethod");
function compareByInspect(a2, b) {
  return inspect2(a2) < inspect2(b) ? -1 : 1;
}
__name(compareByInspect, "compareByInspect");
function getOwnEnumerablePropertySymbols(obj) {
  return typeof Object.getOwnPropertySymbols != "function" ? [] : Object.getOwnPropertySymbols(obj).filter(function(sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
}
__name(getOwnEnumerablePropertySymbols, "getOwnEnumerablePropertySymbols");
function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
}
__name(getOwnEnumerableProperties, "getOwnEnumerableProperties");
var isNaN22 = Number.isNaN;
function isObjectType(obj) {
  let objectType = type(obj);
  return ["Array", "Object", "Function"].indexOf(objectType) !== -1;
}
__name(isObjectType, "isObjectType");
function getOperator(obj, args) {
  let operator = flag(obj, "operator"), negate = flag(obj, "negate"), expected = args[3], msg = negate ? args[2] : args[1];
  if (operator)
    return operator;
  if (typeof msg == "function" && (msg = msg()), msg = msg || "", !msg || /\shave\s/.test(msg))
    return;
  let isObject2 = isObjectType(expected);
  return /\snot\s/.test(msg) ? isObject2 ? "notDeepStrictEqual" : "notStrictEqual" : isObject2 ? "deepStrictEqual" : "strictEqual";
}
__name(getOperator, "getOperator");
function getName(fn3) {
  return fn3.name;
}
__name(getName, "getName");
function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
}
__name(isRegExp2, "isRegExp");
function isNumeric(obj) {
  return ["Number", "BigInt"].includes(type(obj));
}
__name(isNumeric, "isNumeric");
var { flag: flag2 } = utils_exports;
[
  "to",
  "be",
  "been",
  "is",
  "and",
  "has",
  "have",
  "with",
  "that",
  "which",
  "at",
  "of",
  "same",
  "but",
  "does",
  "still",
  "also"
].forEach(function(chain) {
  Assertion.addProperty(chain);
});
Assertion.addProperty("not", function() {
  flag2(this, "negate", !0);
});
Assertion.addProperty("deep", function() {
  flag2(this, "deep", !0);
});
Assertion.addProperty("nested", function() {
  flag2(this, "nested", !0);
});
Assertion.addProperty("own", function() {
  flag2(this, "own", !0);
});
Assertion.addProperty("ordered", function() {
  flag2(this, "ordered", !0);
});
Assertion.addProperty("any", function() {
  flag2(this, "any", !0), flag2(this, "all", !1);
});
Assertion.addProperty("all", function() {
  flag2(this, "all", !0), flag2(this, "any", !1);
});
var functionTypes = {
  function: [
    "function",
    "asyncfunction",
    "generatorfunction",
    "asyncgeneratorfunction"
  ],
  asyncfunction: ["asyncfunction", "asyncgeneratorfunction"],
  generatorfunction: ["generatorfunction", "asyncgeneratorfunction"],
  asyncgeneratorfunction: ["asyncgeneratorfunction"]
};
function an(type32, msg) {
  msg && flag2(this, "message", msg), type32 = type32.toLowerCase();
  let obj = flag2(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type32.charAt(0)) ? "an " : "a ", detectedType = type(obj).toLowerCase();
  functionTypes.function.includes(type32) ? this.assert(
    functionTypes[type32].includes(detectedType),
    "expected #{this} to be " + article + type32,
    "expected #{this} not to be " + article + type32
  ) : this.assert(
    type32 === detectedType,
    "expected #{this} to be " + article + type32,
    "expected #{this} not to be " + article + type32
  );
}
__name(an, "an");
Assertion.addChainableMethod("an", an);
Assertion.addChainableMethod("a", an);
function SameValueZero(a2, b) {
  return isNaN22(a2) && isNaN22(b) || a2 === b;
}
__name(SameValueZero, "SameValueZero");
function includeChainingBehavior() {
  flag2(this, "contains", !0);
}
__name(includeChainingBehavior, "includeChainingBehavior");
function include(val, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), objType = type(obj).toLowerCase(), flagMsg = flag2(this, "message"), negate = flag2(this, "negate"), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), descriptor = isDeep ? "deep " : "", isEql = isDeep ? flag2(this, "eql") : SameValueZero;
  flagMsg = flagMsg ? flagMsg + ": " : "";
  let included = !1;
  switch (objType) {
    case "string":
      included = obj.indexOf(val) !== -1;
      break;
    case "weakset":
      if (isDeep)
        throw new AssertionError(
          flagMsg + "unable to use .deep.include with WeakSet",
          void 0,
          ssfi
        );
      included = obj.has(val);
      break;
    case "map":
      obj.forEach(function(item) {
        included = included || isEql(item, val);
      });
      break;
    case "set":
      isDeep ? obj.forEach(function(item) {
        included = included || isEql(item, val);
      }) : included = obj.has(val);
      break;
    case "array":
      isDeep ? included = obj.some(function(item) {
        return isEql(item, val);
      }) : included = obj.indexOf(val) !== -1;
      break;
    default: {
      if (val !== Object(val))
        throw new AssertionError(
          flagMsg + "the given combination of arguments (" + objType + " and " + type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + type(val).toLowerCase(),
          void 0,
          ssfi
        );
      let props = Object.keys(val), firstErr = null, numErrs = 0;
      if (props.forEach(function(prop) {
        let propAssertion = new Assertion(obj);
        if (transferFlags(this, propAssertion, !0), flag2(propAssertion, "lockSsfi", !0), !negate || props.length === 1) {
          propAssertion.property(prop, val[prop]);
          return;
        }
        try {
          propAssertion.property(prop, val[prop]);
        } catch (err) {
          if (!check_error_exports.compatibleConstructor(err, AssertionError))
            throw err;
          firstErr === null && (firstErr = err), numErrs++;
        }
      }, this), negate && props.length > 1 && numErrs === props.length)
        throw firstErr;
      return;
    }
  }
  this.assert(
    included,
    "expected #{this} to " + descriptor + "include " + inspect2(val),
    "expected #{this} to not " + descriptor + "include " + inspect2(val)
  );
}
__name(include, "include");
Assertion.addChainableMethod("include", include, includeChainingBehavior);
Assertion.addChainableMethod("contain", include, includeChainingBehavior);
Assertion.addChainableMethod("contains", include, includeChainingBehavior);
Assertion.addChainableMethod("includes", include, includeChainingBehavior);
Assertion.addProperty("ok", function() {
  this.assert(
    flag2(this, "object"),
    "expected #{this} to be truthy",
    "expected #{this} to be falsy"
  );
});
Assertion.addProperty("true", function() {
  this.assert(
    flag2(this, "object") === !0,
    "expected #{this} to be true",
    "expected #{this} to be false",
    !flag2(this, "negate")
  );
});
Assertion.addProperty("numeric", function() {
  let object = flag2(this, "object");
  this.assert(
    ["Number", "BigInt"].includes(type(object)),
    "expected #{this} to be numeric",
    "expected #{this} to not be numeric",
    !flag2(this, "negate")
  );
});
Assertion.addProperty("callable", function() {
  let val = flag2(this, "object"), ssfi = flag2(this, "ssfi"), message = flag2(this, "message"), msg = message ? `${message}: ` : "", negate = flag2(this, "negate"), assertionMessage = negate ? `${msg}expected ${inspect2(val)} not to be a callable function` : `${msg}expected ${inspect2(val)} to be a callable function`, isCallable2 = [
    "Function",
    "AsyncFunction",
    "GeneratorFunction",
    "AsyncGeneratorFunction"
  ].includes(type(val));
  if (isCallable2 && negate || !isCallable2 && !negate)
    throw new AssertionError(assertionMessage, void 0, ssfi);
});
Assertion.addProperty("false", function() {
  this.assert(
    flag2(this, "object") === !1,
    "expected #{this} to be false",
    "expected #{this} to be true",
    !!flag2(this, "negate")
  );
});
Assertion.addProperty("null", function() {
  this.assert(
    flag2(this, "object") === null,
    "expected #{this} to be null",
    "expected #{this} not to be null"
  );
});
Assertion.addProperty("undefined", function() {
  this.assert(
    flag2(this, "object") === void 0,
    "expected #{this} to be undefined",
    "expected #{this} not to be undefined"
  );
});
Assertion.addProperty("NaN", function() {
  this.assert(
    isNaN22(flag2(this, "object")),
    "expected #{this} to be NaN",
    "expected #{this} not to be NaN"
  );
});
function assertExist() {
  let val = flag2(this, "object");
  this.assert(
    val != null,
    "expected #{this} to exist",
    "expected #{this} to not exist"
  );
}
__name(assertExist, "assertExist");
Assertion.addProperty("exist", assertExist);
Assertion.addProperty("exists", assertExist);
Assertion.addProperty("empty", function() {
  let val = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), itemsCount;
  switch (flagMsg = flagMsg ? flagMsg + ": " : "", type(val).toLowerCase()) {
    case "array":
    case "string":
      itemsCount = val.length;
      break;
    case "map":
    case "set":
      itemsCount = val.size;
      break;
    case "weakmap":
    case "weakset":
      throw new AssertionError(
        flagMsg + ".empty was passed a weak collection",
        void 0,
        ssfi
      );
    case "function": {
      let msg = flagMsg + ".empty was passed a function " + getName(val);
      throw new AssertionError(msg.trim(), void 0, ssfi);
    }
    default:
      if (val !== Object(val))
        throw new AssertionError(
          flagMsg + ".empty was passed non-string primitive " + inspect2(val),
          void 0,
          ssfi
        );
      itemsCount = Object.keys(val).length;
  }
  this.assert(
    itemsCount === 0,
    "expected #{this} to be empty",
    "expected #{this} not to be empty"
  );
});
function checkArguments() {
  let obj = flag2(this, "object"), type32 = type(obj);
  this.assert(
    type32 === "Arguments",
    "expected #{this} to be arguments but got " + type32,
    "expected #{this} to not be arguments"
  );
}
__name(checkArguments, "checkArguments");
Assertion.addProperty("arguments", checkArguments);
Assertion.addProperty("Arguments", checkArguments);
function assertEqual(val, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object");
  if (flag2(this, "deep")) {
    let prevLockSsfi = flag2(this, "lockSsfi");
    flag2(this, "lockSsfi", !0), this.eql(val), flag2(this, "lockSsfi", prevLockSsfi);
  } else
    this.assert(
      val === obj,
      "expected #{this} to equal #{exp}",
      "expected #{this} to not equal #{exp}",
      val,
      this._obj,
      !0
    );
}
__name(assertEqual, "assertEqual");
Assertion.addMethod("equal", assertEqual);
Assertion.addMethod("equals", assertEqual);
Assertion.addMethod("eq", assertEqual);
function assertEql(obj, msg) {
  msg && flag2(this, "message", msg);
  let eql = flag2(this, "eql");
  this.assert(
    eql(obj, flag2(this, "object")),
    "expected #{this} to deeply equal #{exp}",
    "expected #{this} to not deeply equal #{exp}",
    obj,
    this._obj,
    !0
  );
}
__name(assertEql, "assertEql");
Assertion.addMethod("eql", assertEql);
Assertion.addMethod("eqls", assertEql);
function assertAbove(n, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase();
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, !0).to.have.property("length"), !doLength && objType === "date" && nType !== "date")
    throw new AssertionError(
      msgPrefix + "the argument to above must be a date",
      void 0,
      ssfi
    );
  if (!isNumeric(n) && (doLength || isNumeric(obj)))
    throw new AssertionError(
      msgPrefix + "the argument to above must be a number",
      void 0,
      ssfi
    );
  if (!doLength && objType !== "date" && !isNumeric(obj)) {
    let printObj = objType === "string" ? "'" + obj + "'" : obj;
    throw new AssertionError(
      msgPrefix + "expected " + printObj + " to be a number or a date",
      void 0,
      ssfi
    );
  }
  if (doLength) {
    let descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(
      itemsCount > n,
      "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}",
      "expected #{this} to not have a " + descriptor + " above #{exp}",
      n,
      itemsCount
    );
  } else
    this.assert(
      obj > n,
      "expected #{this} to be above #{exp}",
      "expected #{this} to be at most #{exp}",
      n
    );
}
__name(assertAbove, "assertAbove");
Assertion.addMethod("above", assertAbove);
Assertion.addMethod("gt", assertAbove);
Assertion.addMethod("greaterThan", assertAbove);
function assertLeast(n, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = !0;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, !0).to.have.property("length"), !doLength && objType === "date" && nType !== "date")
    errorMessage = msgPrefix + "the argument to least must be a date";
  else if (!isNumeric(n) && (doLength || isNumeric(obj)))
    errorMessage = msgPrefix + "the argument to least must be a number";
  else if (!doLength && objType !== "date" && !isNumeric(obj)) {
    let printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else
    shouldThrow = !1;
  if (shouldThrow)
    throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    let descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(
      itemsCount >= n,
      "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}",
      "expected #{this} to have a " + descriptor + " below #{exp}",
      n,
      itemsCount
    );
  } else
    this.assert(
      obj >= n,
      "expected #{this} to be at least #{exp}",
      "expected #{this} to be below #{exp}",
      n
    );
}
__name(assertLeast, "assertLeast");
Assertion.addMethod("least", assertLeast);
Assertion.addMethod("gte", assertLeast);
Assertion.addMethod("greaterThanOrEqual", assertLeast);
function assertBelow(n, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = !0;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, !0).to.have.property("length"), !doLength && objType === "date" && nType !== "date")
    errorMessage = msgPrefix + "the argument to below must be a date";
  else if (!isNumeric(n) && (doLength || isNumeric(obj)))
    errorMessage = msgPrefix + "the argument to below must be a number";
  else if (!doLength && objType !== "date" && !isNumeric(obj)) {
    let printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else
    shouldThrow = !1;
  if (shouldThrow)
    throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    let descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(
      itemsCount < n,
      "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}",
      "expected #{this} to not have a " + descriptor + " below #{exp}",
      n,
      itemsCount
    );
  } else
    this.assert(
      obj < n,
      "expected #{this} to be below #{exp}",
      "expected #{this} to be at least #{exp}",
      n
    );
}
__name(assertBelow, "assertBelow");
Assertion.addMethod("below", assertBelow);
Assertion.addMethod("lt", assertBelow);
Assertion.addMethod("lessThan", assertBelow);
function assertMost(n, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = !0;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, !0).to.have.property("length"), !doLength && objType === "date" && nType !== "date")
    errorMessage = msgPrefix + "the argument to most must be a date";
  else if (!isNumeric(n) && (doLength || isNumeric(obj)))
    errorMessage = msgPrefix + "the argument to most must be a number";
  else if (!doLength && objType !== "date" && !isNumeric(obj)) {
    let printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else
    shouldThrow = !1;
  if (shouldThrow)
    throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    let descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(
      itemsCount <= n,
      "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}",
      "expected #{this} to have a " + descriptor + " above #{exp}",
      n,
      itemsCount
    );
  } else
    this.assert(
      obj <= n,
      "expected #{this} to be at most #{exp}",
      "expected #{this} to be above #{exp}",
      n
    );
}
__name(assertMost, "assertMost");
Assertion.addMethod("most", assertMost);
Assertion.addMethod("lte", assertMost);
Assertion.addMethod("lessThanOrEqual", assertMost);
Assertion.addMethod("within", function(start, finish, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), startType = type(start).toLowerCase(), finishType = type(finish).toLowerCase(), errorMessage, shouldThrow = !0, range = startType === "date" && finishType === "date" ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
  if (doLength && objType !== "map" && objType !== "set" && new Assertion(obj, flagMsg, ssfi, !0).to.have.property("length"), !doLength && objType === "date" && (startType !== "date" || finishType !== "date"))
    errorMessage = msgPrefix + "the arguments to within must be dates";
  else if ((!isNumeric(start) || !isNumeric(finish)) && (doLength || isNumeric(obj)))
    errorMessage = msgPrefix + "the arguments to within must be numbers";
  else if (!doLength && objType !== "date" && !isNumeric(obj)) {
    let printObj = objType === "string" ? "'" + obj + "'" : obj;
    errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
  } else
    shouldThrow = !1;
  if (shouldThrow)
    throw new AssertionError(errorMessage, void 0, ssfi);
  if (doLength) {
    let descriptor = "length", itemsCount;
    objType === "map" || objType === "set" ? (descriptor = "size", itemsCount = obj.size) : itemsCount = obj.length, this.assert(
      itemsCount >= start && itemsCount <= finish,
      "expected #{this} to have a " + descriptor + " within " + range,
      "expected #{this} to not have a " + descriptor + " within " + range
    );
  } else
    this.assert(
      obj >= start && obj <= finish,
      "expected #{this} to be within " + range,
      "expected #{this} to not be within " + range
    );
});
function assertInstanceOf(constructor, msg) {
  msg && flag2(this, "message", msg);
  let target = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), isInstanceOf;
  try {
    isInstanceOf = target instanceof constructor;
  } catch (err) {
    throw err instanceof TypeError ? (flagMsg = flagMsg ? flagMsg + ": " : "", new AssertionError(
      flagMsg + "The instanceof assertion needs a constructor but " + type(constructor) + " was given.",
      void 0,
      ssfi
    )) : err;
  }
  let name = getName(constructor);
  name == null && (name = "an unnamed constructor"), this.assert(
    isInstanceOf,
    "expected #{this} to be an instance of " + name,
    "expected #{this} to not be an instance of " + name
  );
}
__name(assertInstanceOf, "assertInstanceOf");
Assertion.addMethod("instanceof", assertInstanceOf);
Assertion.addMethod("instanceOf", assertInstanceOf);
function assertProperty(name, val, msg) {
  msg && flag2(this, "message", msg);
  let isNested = flag2(this, "nested"), isOwn = flag2(this, "own"), flagMsg = flag2(this, "message"), obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), nameType = typeof name;
  if (flagMsg = flagMsg ? flagMsg + ": " : "", isNested) {
    if (nameType !== "string")
      throw new AssertionError(
        flagMsg + "the argument to property must be a string when using nested syntax",
        void 0,
        ssfi
      );
  } else if (nameType !== "string" && nameType !== "number" && nameType !== "symbol")
    throw new AssertionError(
      flagMsg + "the argument to property must be a string, number, or symbol",
      void 0,
      ssfi
    );
  if (isNested && isOwn)
    throw new AssertionError(
      flagMsg + 'The "nested" and "own" flags cannot be combined.',
      void 0,
      ssfi
    );
  if (obj == null)
    throw new AssertionError(
      flagMsg + "Target cannot be null or undefined.",
      void 0,
      ssfi
    );
  let isDeep = flag2(this, "deep"), negate = flag2(this, "negate"), pathInfo = isNested ? getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name], isEql = isDeep ? flag2(this, "eql") : (val1, val2) => val1 === val2, descriptor = "";
  isDeep && (descriptor += "deep "), isOwn && (descriptor += "own "), isNested && (descriptor += "nested "), descriptor += "property ";
  let hasProperty2;
  isOwn ? hasProperty2 = Object.prototype.hasOwnProperty.call(obj, name) : isNested ? hasProperty2 = pathInfo.exists : hasProperty2 = hasProperty(obj, name), (!negate || arguments.length === 1) && this.assert(
    hasProperty2,
    "expected #{this} to have " + descriptor + inspect2(name),
    "expected #{this} to not have " + descriptor + inspect2(name)
  ), arguments.length > 1 && this.assert(
    hasProperty2 && isEql(val, value),
    "expected #{this} to have " + descriptor + inspect2(name) + " of #{exp}, but got #{act}",
    "expected #{this} to not have " + descriptor + inspect2(name) + " of #{act}",
    val,
    value
  ), flag2(this, "object", value);
}
__name(assertProperty, "assertProperty");
Assertion.addMethod("property", assertProperty);
function assertOwnProperty(_name, _value, _msg) {
  flag2(this, "own", !0), assertProperty.apply(this, arguments);
}
__name(assertOwnProperty, "assertOwnProperty");
Assertion.addMethod("ownProperty", assertOwnProperty);
Assertion.addMethod("haveOwnProperty", assertOwnProperty);
function assertOwnPropertyDescriptor(name, descriptor, msg) {
  typeof descriptor == "string" && (msg = descriptor, descriptor = null), msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name), eql = flag2(this, "eql");
  actualDescriptor && descriptor ? this.assert(
    eql(descriptor, actualDescriptor),
    "expected the own property descriptor for " + inspect2(name) + " on #{this} to match " + inspect2(descriptor) + ", got " + inspect2(actualDescriptor),
    "expected the own property descriptor for " + inspect2(name) + " on #{this} to not match " + inspect2(descriptor),
    descriptor,
    actualDescriptor,
    !0
  ) : this.assert(
    actualDescriptor,
    "expected #{this} to have an own property descriptor for " + inspect2(name),
    "expected #{this} to not have an own property descriptor for " + inspect2(name)
  ), flag2(this, "object", actualDescriptor);
}
__name(assertOwnPropertyDescriptor, "assertOwnPropertyDescriptor");
Assertion.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
Assertion.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
function assertLengthChain() {
  flag2(this, "doLength", !0);
}
__name(assertLengthChain, "assertLengthChain");
function assertLength(n, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), objType = type(obj).toLowerCase(), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), descriptor = "length", itemsCount;
  switch (objType) {
    case "map":
    case "set":
      descriptor = "size", itemsCount = obj.size;
      break;
    default:
      new Assertion(obj, flagMsg, ssfi, !0).to.have.property("length"), itemsCount = obj.length;
  }
  this.assert(
    itemsCount == n,
    "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}",
    "expected #{this} to not have a " + descriptor + " of #{act}",
    n,
    itemsCount
  );
}
__name(assertLength, "assertLength");
Assertion.addChainableMethod("length", assertLength, assertLengthChain);
Assertion.addChainableMethod("lengthOf", assertLength, assertLengthChain);
function assertMatch(re, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object");
  this.assert(
    re.exec(obj),
    "expected #{this} to match " + re,
    "expected #{this} not to match " + re
  );
}
__name(assertMatch, "assertMatch");
Assertion.addMethod("match", assertMatch);
Assertion.addMethod("matches", assertMatch);
Assertion.addMethod("string", function(str, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(obj, flagMsg, ssfi, !0).is.a("string"), this.assert(
    ~obj.indexOf(str),
    "expected #{this} to contain " + inspect2(str),
    "expected #{this} to not contain " + inspect2(str)
  );
});
function assertKeys(keys2) {
  let obj = flag2(this, "object"), objType = type(obj), keysType = type(keys2), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), str, deepStr = "", actual, ok = !0, flagMsg = flag2(this, "message");
  flagMsg = flagMsg ? flagMsg + ": " : "";
  let mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
  if (objType === "Map" || objType === "Set")
    deepStr = isDeep ? "deeply " : "", actual = [], obj.forEach(function(val, key) {
      actual.push(key);
    }), keysType !== "Array" && (keys2 = Array.prototype.slice.call(arguments));
  else {
    switch (actual = getOwnEnumerableProperties(obj), keysType) {
      case "Array":
        if (arguments.length > 1)
          throw new AssertionError(mixedArgsMsg, void 0, ssfi);
        break;
      case "Object":
        if (arguments.length > 1)
          throw new AssertionError(mixedArgsMsg, void 0, ssfi);
        keys2 = Object.keys(keys2);
        break;
      default:
        keys2 = Array.prototype.slice.call(arguments);
    }
    keys2 = keys2.map(function(val) {
      return typeof val == "symbol" ? val : String(val);
    });
  }
  if (!keys2.length)
    throw new AssertionError(flagMsg + "keys required", void 0, ssfi);
  let len = keys2.length, any = flag2(this, "any"), all = flag2(this, "all"), expected = keys2, isEql = isDeep ? flag2(this, "eql") : (val1, val2) => val1 === val2;
  if (!any && !all && (all = !0), any && (ok = expected.some(function(expectedKey) {
    return actual.some(function(actualKey) {
      return isEql(expectedKey, actualKey);
    });
  })), all && (ok = expected.every(function(expectedKey) {
    return actual.some(function(actualKey) {
      return isEql(expectedKey, actualKey);
    });
  }), flag2(this, "contains") || (ok = ok && keys2.length == actual.length)), len > 1) {
    keys2 = keys2.map(function(key) {
      return inspect2(key);
    });
    let last = keys2.pop();
    all && (str = keys2.join(", ") + ", and " + last), any && (str = keys2.join(", ") + ", or " + last);
  } else
    str = inspect2(keys2[0]);
  str = (len > 1 ? "keys " : "key ") + str, str = (flag2(this, "contains") ? "contain " : "have ") + str, this.assert(
    ok,
    "expected #{this} to " + deepStr + str,
    "expected #{this} to not " + deepStr + str,
    expected.slice(0).sort(compareByInspect),
    actual.sort(compareByInspect),
    !0
  );
}
__name(assertKeys, "assertKeys");
Assertion.addMethod("keys", assertKeys);
Assertion.addMethod("key", assertKeys);
function assertThrows(errorLike, errMsgMatcher, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), negate = flag2(this, "negate") || !1;
  new Assertion(obj, flagMsg, ssfi, !0).is.a("function"), (isRegExp2(errorLike) || typeof errorLike == "string") && (errMsgMatcher = errorLike, errorLike = null);
  let caughtErr, errorWasThrown = !1;
  try {
    obj();
  } catch (err) {
    errorWasThrown = !0, caughtErr = err;
  }
  let everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0, everyArgIsDefined = !!(errorLike && errMsgMatcher), errorLikeFail = !1, errMsgMatcherFail = !1;
  if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
    let errorLikeString = "an error";
    errorLike instanceof Error ? errorLikeString = "#{exp}" : errorLike && (errorLikeString = check_error_exports.getConstructorName(errorLike));
    let actual = caughtErr;
    if (caughtErr instanceof Error)
      actual = caughtErr.toString();
    else if (typeof caughtErr == "string")
      actual = caughtErr;
    else if (caughtErr && (typeof caughtErr == "object" || typeof caughtErr == "function"))
      try {
        actual = check_error_exports.getConstructorName(caughtErr);
      } catch {
      }
    this.assert(
      errorWasThrown,
      "expected #{this} to throw " + errorLikeString,
      "expected #{this} to not throw an error but #{act} was thrown",
      errorLike && errorLike.toString(),
      actual
    );
  }
  if (errorLike && caughtErr && (errorLike instanceof Error && check_error_exports.compatibleInstance(
    caughtErr,
    errorLike
  ) === negate && (everyArgIsDefined && negate ? errorLikeFail = !0 : this.assert(
    negate,
    "expected #{this} to throw #{exp} but #{act} was thrown",
    "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""),
    errorLike.toString(),
    caughtErr.toString()
  )), check_error_exports.compatibleConstructor(
    caughtErr,
    errorLike
  ) === negate && (everyArgIsDefined && negate ? errorLikeFail = !0 : this.assert(
    negate,
    "expected #{this} to throw #{exp} but #{act} was thrown",
    "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
    errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike),
    caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr)
  ))), caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
    let placeholder = "including";
    isRegExp2(errMsgMatcher) && (placeholder = "matching"), check_error_exports.compatibleMessage(
      caughtErr,
      errMsgMatcher
    ) === negate && (everyArgIsDefined && negate ? errMsgMatcherFail = !0 : this.assert(
      negate,
      "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}",
      "expected #{this} to throw error not " + placeholder + " #{exp}",
      errMsgMatcher,
      check_error_exports.getMessage(caughtErr)
    ));
  }
  errorLikeFail && errMsgMatcherFail && this.assert(
    negate,
    "expected #{this} to throw #{exp} but #{act} was thrown",
    "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
    errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike),
    caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr)
  ), flag2(this, "object", caughtErr);
}
__name(assertThrows, "assertThrows");
Assertion.addMethod("throw", assertThrows);
Assertion.addMethod("throws", assertThrows);
Assertion.addMethod("Throw", assertThrows);
function respondTo(method, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), itself = flag2(this, "itself"), context = typeof obj == "function" && !itself ? obj.prototype[method] : obj[method];
  this.assert(
    typeof context == "function",
    "expected #{this} to respond to " + inspect2(method),
    "expected #{this} to not respond to " + inspect2(method)
  );
}
__name(respondTo, "respondTo");
Assertion.addMethod("respondTo", respondTo);
Assertion.addMethod("respondsTo", respondTo);
Assertion.addProperty("itself", function() {
  flag2(this, "itself", !0);
});
function satisfy(matcher, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), result = matcher(obj);
  this.assert(
    result,
    "expected #{this} to satisfy " + objDisplay(matcher),
    "expected #{this} to not satisfy" + objDisplay(matcher),
    !flag2(this, "negate"),
    result
  );
}
__name(satisfy, "satisfy");
Assertion.addMethod("satisfy", satisfy);
Assertion.addMethod("satisfies", satisfy);
function closeTo(expected, delta, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(obj, flagMsg, ssfi, !0).is.numeric;
  let message = "A `delta` value is required for `closeTo`";
  if (delta == null)
    throw new AssertionError(
      flagMsg ? `${flagMsg}: ${message}` : message,
      void 0,
      ssfi
    );
  if (new Assertion(delta, flagMsg, ssfi, !0).is.numeric, message = "A `expected` value is required for `closeTo`", expected == null)
    throw new AssertionError(
      flagMsg ? `${flagMsg}: ${message}` : message,
      void 0,
      ssfi
    );
  new Assertion(expected, flagMsg, ssfi, !0).is.numeric;
  let abs = __name((x) => x < 0n ? -x : x, "abs"), strip = __name((number) => parseFloat(parseFloat(number).toPrecision(12)), "strip");
  this.assert(
    strip(abs(obj - expected)) <= delta,
    "expected #{this} to be close to " + expected + " +/- " + delta,
    "expected #{this} not to be close to " + expected + " +/- " + delta
  );
}
__name(closeTo, "closeTo");
Assertion.addMethod("closeTo", closeTo);
Assertion.addMethod("approximately", closeTo);
function isSubsetOf(_subset, _superset, cmp, contains, ordered) {
  let superset = Array.from(_superset), subset = Array.from(_subset);
  if (!contains) {
    if (subset.length !== superset.length) return !1;
    superset = superset.slice();
  }
  return subset.every(function(elem, idx) {
    if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
    if (!cmp) {
      let matchIdx = superset.indexOf(elem);
      return matchIdx === -1 ? !1 : (contains || superset.splice(matchIdx, 1), !0);
    }
    return superset.some(function(elem2, matchIdx) {
      return cmp(elem, elem2) ? (contains || superset.splice(matchIdx, 1), !0) : !1;
    });
  });
}
__name(isSubsetOf, "isSubsetOf");
Assertion.addMethod("members", function(subset, msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(obj, flagMsg, ssfi, !0).to.be.iterable, new Assertion(subset, flagMsg, ssfi, !0).to.be.iterable;
  let contains = flag2(this, "contains"), ordered = flag2(this, "ordered"), subject, failMsg, failNegateMsg;
  contains ? (subject = ordered ? "an ordered superset" : "a superset", failMsg = "expected #{this} to be " + subject + " of #{exp}", failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}") : (subject = ordered ? "ordered members" : "members", failMsg = "expected #{this} to have the same " + subject + " as #{exp}", failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}");
  let cmp = flag2(this, "deep") ? flag2(this, "eql") : void 0;
  this.assert(
    isSubsetOf(subset, obj, cmp, contains, ordered),
    failMsg,
    failNegateMsg,
    subset,
    obj,
    !0
  );
});
Assertion.addProperty("iterable", function(msg) {
  msg && flag2(this, "message", msg);
  let obj = flag2(this, "object");
  this.assert(
    obj != null && obj[Symbol.iterator],
    "expected #{this} to be an iterable",
    "expected #{this} to not be an iterable",
    obj
  );
});
function oneOf(list, msg) {
  msg && flag2(this, "message", msg);
  let expected = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), contains = flag2(this, "contains"), isDeep = flag2(this, "deep"), eql = flag2(this, "eql");
  new Assertion(list, flagMsg, ssfi, !0).to.be.an("array"), contains ? this.assert(
    list.some(function(possibility) {
      return expected.indexOf(possibility) > -1;
    }),
    "expected #{this} to contain one of #{exp}",
    "expected #{this} to not contain one of #{exp}",
    list,
    expected
  ) : isDeep ? this.assert(
    list.some(function(possibility) {
      return eql(expected, possibility);
    }),
    "expected #{this} to deeply equal one of #{exp}",
    "expected #{this} to deeply equal one of #{exp}",
    list,
    expected
  ) : this.assert(
    list.indexOf(expected) > -1,
    "expected #{this} to be one of #{exp}",
    "expected #{this} to not be one of #{exp}",
    list,
    expected
  );
}
__name(oneOf, "oneOf");
Assertion.addMethod("oneOf", oneOf);
function assertChanges(subject, prop, msg) {
  msg && flag2(this, "message", msg);
  let fn3 = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(fn3, flagMsg, ssfi, !0).is.a("function");
  let initial;
  prop ? (new Assertion(subject, flagMsg, ssfi, !0).to.have.property(prop), initial = subject[prop]) : (new Assertion(subject, flagMsg, ssfi, !0).is.a("function"), initial = subject()), fn3();
  let final = prop == null ? subject() : subject[prop], msgObj = prop == null ? initial : "." + prop;
  flag2(this, "deltaMsgObj", msgObj), flag2(this, "initialDeltaValue", initial), flag2(this, "finalDeltaValue", final), flag2(this, "deltaBehavior", "change"), flag2(this, "realDelta", final !== initial), this.assert(
    initial !== final,
    "expected " + msgObj + " to change",
    "expected " + msgObj + " to not change"
  );
}
__name(assertChanges, "assertChanges");
Assertion.addMethod("change", assertChanges);
Assertion.addMethod("changes", assertChanges);
function assertIncreases(subject, prop, msg) {
  msg && flag2(this, "message", msg);
  let fn3 = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(fn3, flagMsg, ssfi, !0).is.a("function");
  let initial;
  prop ? (new Assertion(subject, flagMsg, ssfi, !0).to.have.property(prop), initial = subject[prop]) : (new Assertion(subject, flagMsg, ssfi, !0).is.a("function"), initial = subject()), new Assertion(initial, flagMsg, ssfi, !0).is.a("number"), fn3();
  let final = prop == null ? subject() : subject[prop], msgObj = prop == null ? initial : "." + prop;
  flag2(this, "deltaMsgObj", msgObj), flag2(this, "initialDeltaValue", initial), flag2(this, "finalDeltaValue", final), flag2(this, "deltaBehavior", "increase"), flag2(this, "realDelta", final - initial), this.assert(
    final - initial > 0,
    "expected " + msgObj + " to increase",
    "expected " + msgObj + " to not increase"
  );
}
__name(assertIncreases, "assertIncreases");
Assertion.addMethod("increase", assertIncreases);
Assertion.addMethod("increases", assertIncreases);
function assertDecreases(subject, prop, msg) {
  msg && flag2(this, "message", msg);
  let fn3 = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
  new Assertion(fn3, flagMsg, ssfi, !0).is.a("function");
  let initial;
  prop ? (new Assertion(subject, flagMsg, ssfi, !0).to.have.property(prop), initial = subject[prop]) : (new Assertion(subject, flagMsg, ssfi, !0).is.a("function"), initial = subject()), new Assertion(initial, flagMsg, ssfi, !0).is.a("number"), fn3();
  let final = prop == null ? subject() : subject[prop], msgObj = prop == null ? initial : "." + prop;
  flag2(this, "deltaMsgObj", msgObj), flag2(this, "initialDeltaValue", initial), flag2(this, "finalDeltaValue", final), flag2(this, "deltaBehavior", "decrease"), flag2(this, "realDelta", initial - final), this.assert(
    final - initial < 0,
    "expected " + msgObj + " to decrease",
    "expected " + msgObj + " to not decrease"
  );
}
__name(assertDecreases, "assertDecreases");
Assertion.addMethod("decrease", assertDecreases);
Assertion.addMethod("decreases", assertDecreases);
function assertDelta(delta, msg) {
  msg && flag2(this, "message", msg);
  let msgObj = flag2(this, "deltaMsgObj"), initial = flag2(this, "initialDeltaValue"), final = flag2(this, "finalDeltaValue"), behavior2 = flag2(this, "deltaBehavior"), realDelta = flag2(this, "realDelta"), expression;
  behavior2 === "change" ? expression = Math.abs(final - initial) === Math.abs(delta) : expression = realDelta === Math.abs(delta), this.assert(
    expression,
    "expected " + msgObj + " to " + behavior2 + " by " + delta,
    "expected " + msgObj + " to not " + behavior2 + " by " + delta
  );
}
__name(assertDelta, "assertDelta");
Assertion.addMethod("by", assertDelta);
Assertion.addProperty("extensible", function() {
  let obj = flag2(this, "object"), isExtensible = obj === Object(obj) && Object.isExtensible(obj);
  this.assert(
    isExtensible,
    "expected #{this} to be extensible",
    "expected #{this} to not be extensible"
  );
});
Assertion.addProperty("sealed", function() {
  let obj = flag2(this, "object"), isSealed = obj === Object(obj) ? Object.isSealed(obj) : !0;
  this.assert(
    isSealed,
    "expected #{this} to be sealed",
    "expected #{this} to not be sealed"
  );
});
Assertion.addProperty("frozen", function() {
  let obj = flag2(this, "object"), isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : !0;
  this.assert(
    isFrozen,
    "expected #{this} to be frozen",
    "expected #{this} to not be frozen"
  );
});
Assertion.addProperty("finite", function(_msg) {
  let obj = flag2(this, "object");
  this.assert(
    typeof obj == "number" && isFinite(obj),
    "expected #{this} to be a finite number",
    "expected #{this} to not be a finite number"
  );
});
function compareSubset(expected, actual) {
  return expected === actual ? !0 : typeof actual != typeof expected ? !1 : typeof expected != "object" || expected === null ? expected === actual : actual ? Array.isArray(expected) ? Array.isArray(actual) ? expected.every(function(exp) {
    return actual.some(function(act) {
      return compareSubset(exp, act);
    });
  }) : !1 : expected instanceof Date ? actual instanceof Date ? expected.getTime() === actual.getTime() : !1 : Object.keys(expected).every(function(key) {
    let expectedValue = expected[key], actualValue = actual[key];
    return typeof expectedValue == "object" && expectedValue !== null && actualValue !== null ? compareSubset(expectedValue, actualValue) : typeof expectedValue == "function" ? expectedValue(actualValue) : actualValue === expectedValue;
  }) : !1;
}
__name(compareSubset, "compareSubset");
Assertion.addMethod("containSubset", function(expected) {
  let actual = flag(this, "object"), showDiff = config.showDiff;
  this.assert(
    compareSubset(expected, actual),
    "expected #{act} to contain subset #{exp}",
    "expected #{act} to not contain subset #{exp}",
    expected,
    actual,
    showDiff
  );
});
function expect(val, message) {
  return new Assertion(val, message);
}
__name(expect, "expect");
expect.fail = function(actual, expected, message, operator) {
  throw arguments.length < 2 && (message = actual, actual = void 0), message = message || "expect.fail()", new AssertionError(
    message,
    {
      actual,
      expected,
      operator
    },
    expect.fail
  );
};
var should_exports = {};
__export2(should_exports, {
  Should: () => Should,
  should: () => should
});
function loadShould() {
  function shouldGetter() {
    return this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol == "function" && this instanceof Symbol || typeof BigInt == "function" && this instanceof BigInt ? new Assertion(this.valueOf(), null, shouldGetter) : new Assertion(this, null, shouldGetter);
  }
  __name(shouldGetter, "shouldGetter");
  function shouldSetter(value) {
    Object.defineProperty(this, "should", {
      value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    });
  }
  __name(shouldSetter, "shouldSetter"), Object.defineProperty(Object.prototype, "should", {
    set: shouldSetter,
    get: shouldGetter,
    configurable: !0
  });
  let should2 = {};
  return should2.fail = function(actual, expected, message, operator) {
    throw arguments.length < 2 && (message = actual, actual = void 0), message = message || "should.fail()", new AssertionError(
      message,
      {
        actual,
        expected,
        operator
      },
      should2.fail
    );
  }, should2.equal = function(actual, expected, message) {
    new Assertion(actual, message).to.equal(expected);
  }, should2.Throw = function(fn3, errt, errs, msg) {
    new Assertion(fn3, msg).to.Throw(errt, errs);
  }, should2.exist = function(val, msg) {
    new Assertion(val, msg).to.exist;
  }, should2.not = {}, should2.not.equal = function(actual, expected, msg) {
    new Assertion(actual, msg).to.not.equal(expected);
  }, should2.not.Throw = function(fn3, errt, errs, msg) {
    new Assertion(fn3, msg).to.not.Throw(errt, errs);
  }, should2.not.exist = function(val, msg) {
    new Assertion(val, msg).to.not.exist;
  }, should2.throw = should2.Throw, should2.not.throw = should2.not.Throw, should2;
}
__name(loadShould, "loadShould");
var should = loadShould, Should = loadShould;
function assert(express, errmsg) {
  new Assertion(null, null, assert, !0).assert(express, errmsg, "[ negation message unavailable ]");
}
__name(assert, "assert");
assert.fail = function(actual, expected, message, operator) {
  throw arguments.length < 2 && (message = actual, actual = void 0), message = message || "assert.fail()", new AssertionError(
    message,
    {
      actual,
      expected,
      operator
    },
    assert.fail
  );
};
assert.isOk = function(val, msg) {
  new Assertion(val, msg, assert.isOk, !0).is.ok;
};
assert.isNotOk = function(val, msg) {
  new Assertion(val, msg, assert.isNotOk, !0).is.not.ok;
};
assert.equal = function(act, exp, msg) {
  let test2 = new Assertion(act, msg, assert.equal, !0);
  test2.assert(
    exp == flag(test2, "object"),
    "expected #{this} to equal #{exp}",
    "expected #{this} to not equal #{act}",
    exp,
    act,
    !0
  );
};
assert.notEqual = function(act, exp, msg) {
  let test2 = new Assertion(act, msg, assert.notEqual, !0);
  test2.assert(
    exp != flag(test2, "object"),
    "expected #{this} to not equal #{exp}",
    "expected #{this} to equal #{act}",
    exp,
    act,
    !0
  );
};
assert.strictEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.strictEqual, !0).to.equal(exp);
};
assert.notStrictEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.notStrictEqual, !0).to.not.equal(exp);
};
assert.deepEqual = assert.deepStrictEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.deepEqual, !0).to.eql(exp);
};
assert.notDeepEqual = function(act, exp, msg) {
  new Assertion(act, msg, assert.notDeepEqual, !0).to.not.eql(exp);
};
assert.isAbove = function(val, abv, msg) {
  new Assertion(val, msg, assert.isAbove, !0).to.be.above(abv);
};
assert.isAtLeast = function(val, atlst, msg) {
  new Assertion(val, msg, assert.isAtLeast, !0).to.be.least(atlst);
};
assert.isBelow = function(val, blw, msg) {
  new Assertion(val, msg, assert.isBelow, !0).to.be.below(blw);
};
assert.isAtMost = function(val, atmst, msg) {
  new Assertion(val, msg, assert.isAtMost, !0).to.be.most(atmst);
};
assert.isTrue = function(val, msg) {
  new Assertion(val, msg, assert.isTrue, !0).is.true;
};
assert.isNotTrue = function(val, msg) {
  new Assertion(val, msg, assert.isNotTrue, !0).to.not.equal(!0);
};
assert.isFalse = function(val, msg) {
  new Assertion(val, msg, assert.isFalse, !0).is.false;
};
assert.isNotFalse = function(val, msg) {
  new Assertion(val, msg, assert.isNotFalse, !0).to.not.equal(!1);
};
assert.isNull = function(val, msg) {
  new Assertion(val, msg, assert.isNull, !0).to.equal(null);
};
assert.isNotNull = function(val, msg) {
  new Assertion(val, msg, assert.isNotNull, !0).to.not.equal(null);
};
assert.isNaN = function(val, msg) {
  new Assertion(val, msg, assert.isNaN, !0).to.be.NaN;
};
assert.isNotNaN = function(value, message) {
  new Assertion(value, message, assert.isNotNaN, !0).not.to.be.NaN;
};
assert.exists = function(val, msg) {
  new Assertion(val, msg, assert.exists, !0).to.exist;
};
assert.notExists = function(val, msg) {
  new Assertion(val, msg, assert.notExists, !0).to.not.exist;
};
assert.isUndefined = function(val, msg) {
  new Assertion(val, msg, assert.isUndefined, !0).to.equal(void 0);
};
assert.isDefined = function(val, msg) {
  new Assertion(val, msg, assert.isDefined, !0).to.not.equal(void 0);
};
assert.isCallable = function(value, message) {
  new Assertion(value, message, assert.isCallable, !0).is.callable;
};
assert.isNotCallable = function(value, message) {
  new Assertion(value, message, assert.isNotCallable, !0).is.not.callable;
};
assert.isObject = function(val, msg) {
  new Assertion(val, msg, assert.isObject, !0).to.be.a("object");
};
assert.isNotObject = function(val, msg) {
  new Assertion(val, msg, assert.isNotObject, !0).to.not.be.a("object");
};
assert.isArray = function(val, msg) {
  new Assertion(val, msg, assert.isArray, !0).to.be.an("array");
};
assert.isNotArray = function(val, msg) {
  new Assertion(val, msg, assert.isNotArray, !0).to.not.be.an("array");
};
assert.isString = function(val, msg) {
  new Assertion(val, msg, assert.isString, !0).to.be.a("string");
};
assert.isNotString = function(val, msg) {
  new Assertion(val, msg, assert.isNotString, !0).to.not.be.a("string");
};
assert.isNumber = function(val, msg) {
  new Assertion(val, msg, assert.isNumber, !0).to.be.a("number");
};
assert.isNotNumber = function(val, msg) {
  new Assertion(val, msg, assert.isNotNumber, !0).to.not.be.a("number");
};
assert.isNumeric = function(val, msg) {
  new Assertion(val, msg, assert.isNumeric, !0).is.numeric;
};
assert.isNotNumeric = function(val, msg) {
  new Assertion(val, msg, assert.isNotNumeric, !0).is.not.numeric;
};
assert.isFinite = function(val, msg) {
  new Assertion(val, msg, assert.isFinite, !0).to.be.finite;
};
assert.isBoolean = function(val, msg) {
  new Assertion(val, msg, assert.isBoolean, !0).to.be.a("boolean");
};
assert.isNotBoolean = function(val, msg) {
  new Assertion(val, msg, assert.isNotBoolean, !0).to.not.be.a("boolean");
};
assert.typeOf = function(val, type32, msg) {
  new Assertion(val, msg, assert.typeOf, !0).to.be.a(type32);
};
assert.notTypeOf = function(value, type32, message) {
  new Assertion(value, message, assert.notTypeOf, !0).to.not.be.a(type32);
};
assert.instanceOf = function(val, type32, msg) {
  new Assertion(val, msg, assert.instanceOf, !0).to.be.instanceOf(type32);
};
assert.notInstanceOf = function(val, type32, msg) {
  new Assertion(val, msg, assert.notInstanceOf, !0).to.not.be.instanceOf(
    type32
  );
};
assert.include = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.include, !0).include(inc);
};
assert.notInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notInclude, !0).not.include(inc);
};
assert.deepInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.deepInclude, !0).deep.include(inc);
};
assert.notDeepInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notDeepInclude, !0).not.deep.include(inc);
};
assert.nestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.nestedInclude, !0).nested.include(inc);
};
assert.notNestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notNestedInclude, !0).not.nested.include(
    inc
  );
};
assert.deepNestedInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.deepNestedInclude, !0).deep.nested.include(
    inc
  );
};
assert.notDeepNestedInclude = function(exp, inc, msg) {
  new Assertion(
    exp,
    msg,
    assert.notDeepNestedInclude,
    !0
  ).not.deep.nested.include(inc);
};
assert.ownInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.ownInclude, !0).own.include(inc);
};
assert.notOwnInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notOwnInclude, !0).not.own.include(inc);
};
assert.deepOwnInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.deepOwnInclude, !0).deep.own.include(inc);
};
assert.notDeepOwnInclude = function(exp, inc, msg) {
  new Assertion(exp, msg, assert.notDeepOwnInclude, !0).not.deep.own.include(
    inc
  );
};
assert.match = function(exp, re, msg) {
  new Assertion(exp, msg, assert.match, !0).to.match(re);
};
assert.notMatch = function(exp, re, msg) {
  new Assertion(exp, msg, assert.notMatch, !0).to.not.match(re);
};
assert.property = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.property, !0).to.have.property(prop);
};
assert.notProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.notProperty, !0).to.not.have.property(prop);
};
assert.propertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.propertyVal, !0).to.have.property(prop, val);
};
assert.notPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.notPropertyVal, !0).to.not.have.property(
    prop,
    val
  );
};
assert.deepPropertyVal = function(obj, prop, val, msg) {
  new Assertion(obj, msg, assert.deepPropertyVal, !0).to.have.deep.property(
    prop,
    val
  );
};
assert.notDeepPropertyVal = function(obj, prop, val, msg) {
  new Assertion(
    obj,
    msg,
    assert.notDeepPropertyVal,
    !0
  ).to.not.have.deep.property(prop, val);
};
assert.ownProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.ownProperty, !0).to.have.own.property(prop);
};
assert.notOwnProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.notOwnProperty, !0).to.not.have.own.property(
    prop
  );
};
assert.ownPropertyVal = function(obj, prop, value, msg) {
  new Assertion(obj, msg, assert.ownPropertyVal, !0).to.have.own.property(
    prop,
    value
  );
};
assert.notOwnPropertyVal = function(obj, prop, value, msg) {
  new Assertion(
    obj,
    msg,
    assert.notOwnPropertyVal,
    !0
  ).to.not.have.own.property(prop, value);
};
assert.deepOwnPropertyVal = function(obj, prop, value, msg) {
  new Assertion(
    obj,
    msg,
    assert.deepOwnPropertyVal,
    !0
  ).to.have.deep.own.property(prop, value);
};
assert.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
  new Assertion(
    obj,
    msg,
    assert.notDeepOwnPropertyVal,
    !0
  ).to.not.have.deep.own.property(prop, value);
};
assert.nestedProperty = function(obj, prop, msg) {
  new Assertion(obj, msg, assert.nestedProperty, !0).to.have.nested.property(
    prop
  );
};
assert.notNestedProperty = function(obj, prop, msg) {
  new Assertion(
    obj,
    msg,
    assert.notNestedProperty,
    !0
  ).to.not.have.nested.property(prop);
};
assert.nestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(
    obj,
    msg,
    assert.nestedPropertyVal,
    !0
  ).to.have.nested.property(prop, val);
};
assert.notNestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(
    obj,
    msg,
    assert.notNestedPropertyVal,
    !0
  ).to.not.have.nested.property(prop, val);
};
assert.deepNestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(
    obj,
    msg,
    assert.deepNestedPropertyVal,
    !0
  ).to.have.deep.nested.property(prop, val);
};
assert.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
  new Assertion(
    obj,
    msg,
    assert.notDeepNestedPropertyVal,
    !0
  ).to.not.have.deep.nested.property(prop, val);
};
assert.lengthOf = function(exp, len, msg) {
  new Assertion(exp, msg, assert.lengthOf, !0).to.have.lengthOf(len);
};
assert.hasAnyKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAnyKeys, !0).to.have.any.keys(keys2);
};
assert.hasAllKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAllKeys, !0).to.have.all.keys(keys2);
};
assert.containsAllKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.containsAllKeys, !0).to.contain.all.keys(
    keys2
  );
};
assert.doesNotHaveAnyKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.doesNotHaveAnyKeys, !0).to.not.have.any.keys(
    keys2
  );
};
assert.doesNotHaveAllKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.doesNotHaveAllKeys, !0).to.not.have.all.keys(
    keys2
  );
};
assert.hasAnyDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAnyDeepKeys, !0).to.have.any.deep.keys(
    keys2
  );
};
assert.hasAllDeepKeys = function(obj, keys2, msg) {
  new Assertion(obj, msg, assert.hasAllDeepKeys, !0).to.have.all.deep.keys(
    keys2
  );
};
assert.containsAllDeepKeys = function(obj, keys2, msg) {
  new Assertion(
    obj,
    msg,
    assert.containsAllDeepKeys,
    !0
  ).to.contain.all.deep.keys(keys2);
};
assert.doesNotHaveAnyDeepKeys = function(obj, keys2, msg) {
  new Assertion(
    obj,
    msg,
    assert.doesNotHaveAnyDeepKeys,
    !0
  ).to.not.have.any.deep.keys(keys2);
};
assert.doesNotHaveAllDeepKeys = function(obj, keys2, msg) {
  new Assertion(
    obj,
    msg,
    assert.doesNotHaveAllDeepKeys,
    !0
  ).to.not.have.all.deep.keys(keys2);
};
assert.throws = function(fn3, errorLike, errMsgMatcher, msg) {
  (typeof errorLike == "string" || errorLike instanceof RegExp) && (errMsgMatcher = errorLike, errorLike = null);
  let assertErr = new Assertion(fn3, msg, assert.throws, !0).to.throw(
    errorLike,
    errMsgMatcher
  );
  return flag(assertErr, "object");
};
assert.doesNotThrow = function(fn3, errorLike, errMsgMatcher, message) {
  (typeof errorLike == "string" || errorLike instanceof RegExp) && (errMsgMatcher = errorLike, errorLike = null), new Assertion(fn3, message, assert.doesNotThrow, !0).to.not.throw(
    errorLike,
    errMsgMatcher
  );
};
assert.operator = function(val, operator, val2, msg) {
  let ok;
  switch (operator) {
    case "==":
      ok = val == val2;
      break;
    case "===":
      ok = val === val2;
      break;
    case ">":
      ok = val > val2;
      break;
    case ">=":
      ok = val >= val2;
      break;
    case "<":
      ok = val < val2;
      break;
    case "<=":
      ok = val <= val2;
      break;
    case "!=":
      ok = val != val2;
      break;
    case "!==":
      ok = val !== val2;
      break;
    default:
      throw msg = msg && msg + ": ", new AssertionError(
        msg + 'Invalid operator "' + operator + '"',
        void 0,
        assert.operator
      );
  }
  let test2 = new Assertion(ok, msg, assert.operator, !0);
  test2.assert(
    flag(test2, "object") === !0,
    "expected " + inspect2(val) + " to be " + operator + " " + inspect2(val2),
    "expected " + inspect2(val) + " to not be " + operator + " " + inspect2(val2)
  );
};
assert.closeTo = function(act, exp, delta, msg) {
  new Assertion(act, msg, assert.closeTo, !0).to.be.closeTo(exp, delta);
};
assert.approximately = function(act, exp, delta, msg) {
  new Assertion(act, msg, assert.approximately, !0).to.be.approximately(
    exp,
    delta
  );
};
assert.sameMembers = function(set1, set2, msg) {
  new Assertion(set1, msg, assert.sameMembers, !0).to.have.same.members(set2);
};
assert.notSameMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.notSameMembers,
    !0
  ).to.not.have.same.members(set2);
};
assert.sameDeepMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.sameDeepMembers,
    !0
  ).to.have.same.deep.members(set2);
};
assert.notSameDeepMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.notSameDeepMembers,
    !0
  ).to.not.have.same.deep.members(set2);
};
assert.sameOrderedMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.sameOrderedMembers,
    !0
  ).to.have.same.ordered.members(set2);
};
assert.notSameOrderedMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.notSameOrderedMembers,
    !0
  ).to.not.have.same.ordered.members(set2);
};
assert.sameDeepOrderedMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.sameDeepOrderedMembers,
    !0
  ).to.have.same.deep.ordered.members(set2);
};
assert.notSameDeepOrderedMembers = function(set1, set2, msg) {
  new Assertion(
    set1,
    msg,
    assert.notSameDeepOrderedMembers,
    !0
  ).to.not.have.same.deep.ordered.members(set2);
};
assert.includeMembers = function(superset, subset, msg) {
  new Assertion(superset, msg, assert.includeMembers, !0).to.include.members(
    subset
  );
};
assert.notIncludeMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.notIncludeMembers,
    !0
  ).to.not.include.members(subset);
};
assert.includeDeepMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.includeDeepMembers,
    !0
  ).to.include.deep.members(subset);
};
assert.notIncludeDeepMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.notIncludeDeepMembers,
    !0
  ).to.not.include.deep.members(subset);
};
assert.includeOrderedMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.includeOrderedMembers,
    !0
  ).to.include.ordered.members(subset);
};
assert.notIncludeOrderedMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.notIncludeOrderedMembers,
    !0
  ).to.not.include.ordered.members(subset);
};
assert.includeDeepOrderedMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.includeDeepOrderedMembers,
    !0
  ).to.include.deep.ordered.members(subset);
};
assert.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
  new Assertion(
    superset,
    msg,
    assert.notIncludeDeepOrderedMembers,
    !0
  ).to.not.include.deep.ordered.members(subset);
};
assert.oneOf = function(inList, list, msg) {
  new Assertion(inList, msg, assert.oneOf, !0).to.be.oneOf(list);
};
assert.isIterable = function(obj, msg) {
  if (obj == null || !obj[Symbol.iterator])
    throw msg = msg ? `${msg} expected ${inspect2(obj)} to be an iterable` : `expected ${inspect2(obj)} to be an iterable`, new AssertionError(msg, void 0, assert.isIterable);
};
assert.changes = function(fn3, obj, prop, msg) {
  arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.changes, !0).to.change(obj, prop);
};
assert.changesBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.changesBy, !0).to.change(obj, prop).by(delta);
};
assert.doesNotChange = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.doesNotChange, !0).to.not.change(
    obj,
    prop
  );
};
assert.changesButNotBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.changesButNotBy, !0).to.change(obj, prop).but.not.by(delta);
};
assert.increases = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.increases, !0).to.increase(obj, prop);
};
assert.increasesBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.increasesBy, !0).to.increase(obj, prop).by(delta);
};
assert.doesNotIncrease = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.doesNotIncrease, !0).to.not.increase(
    obj,
    prop
  );
};
assert.increasesButNotBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.increasesButNotBy, !0).to.increase(obj, prop).but.not.by(delta);
};
assert.decreases = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.decreases, !0).to.decrease(obj, prop);
};
assert.decreasesBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.decreasesBy, !0).to.decrease(obj, prop).by(delta);
};
assert.doesNotDecrease = function(fn3, obj, prop, msg) {
  return arguments.length === 3 && typeof obj == "function" && (msg = prop, prop = null), new Assertion(fn3, msg, assert.doesNotDecrease, !0).to.not.decrease(
    obj,
    prop
  );
};
assert.doesNotDecreaseBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  return new Assertion(fn3, msg, assert.doesNotDecreaseBy, !0).to.not.decrease(obj, prop).by(delta);
};
assert.decreasesButNotBy = function(fn3, obj, prop, delta, msg) {
  if (arguments.length === 4 && typeof obj == "function") {
    let tmpMsg = delta;
    delta = prop, msg = tmpMsg;
  } else arguments.length === 3 && (delta = prop, prop = null);
  new Assertion(fn3, msg, assert.decreasesButNotBy, !0).to.decrease(obj, prop).but.not.by(delta);
};
assert.ifError = function(val) {
  if (val)
    throw val;
};
assert.isExtensible = function(obj, msg) {
  new Assertion(obj, msg, assert.isExtensible, !0).to.be.extensible;
};
assert.isNotExtensible = function(obj, msg) {
  new Assertion(obj, msg, assert.isNotExtensible, !0).to.not.be.extensible;
};
assert.isSealed = function(obj, msg) {
  new Assertion(obj, msg, assert.isSealed, !0).to.be.sealed;
};
assert.isNotSealed = function(obj, msg) {
  new Assertion(obj, msg, assert.isNotSealed, !0).to.not.be.sealed;
};
assert.isFrozen = function(obj, msg) {
  new Assertion(obj, msg, assert.isFrozen, !0).to.be.frozen;
};
assert.isNotFrozen = function(obj, msg) {
  new Assertion(obj, msg, assert.isNotFrozen, !0).to.not.be.frozen;
};
assert.isEmpty = function(val, msg) {
  new Assertion(val, msg, assert.isEmpty, !0).to.be.empty;
};
assert.isNotEmpty = function(val, msg) {
  new Assertion(val, msg, assert.isNotEmpty, !0).to.not.be.empty;
};
assert.containsSubset = function(val, exp, msg) {
  new Assertion(val, msg).to.containSubset(exp);
};
assert.doesNotContainSubset = function(val, exp, msg) {
  new Assertion(val, msg).to.not.containSubset(exp);
};
var aliases = [
  ["isOk", "ok"],
  ["isNotOk", "notOk"],
  ["throws", "throw"],
  ["throws", "Throw"],
  ["isExtensible", "extensible"],
  ["isNotExtensible", "notExtensible"],
  ["isSealed", "sealed"],
  ["isNotSealed", "notSealed"],
  ["isFrozen", "frozen"],
  ["isNotFrozen", "notFrozen"],
  ["isEmpty", "empty"],
  ["isNotEmpty", "notEmpty"],
  ["isCallable", "isFunction"],
  ["isNotCallable", "isNotFunction"],
  ["containsSubset", "containSubset"]
];
for (let [name, as] of aliases)
  assert[as] = assert[name];
var used = [];
function use(fn3) {
  let exports = {
    use,
    AssertionError,
    util: utils_exports,
    config,
    expect,
    assert,
    Assertion,
    ...should_exports
  };
  return ~used.indexOf(fn3) || (fn3(exports, utils_exports), used.push(fn3)), exports;
}
__name(use, "use");

// ../../node_modules/@testing-library/jest-dom/dist/matchers.mjs
var matchers_exports = {};
__export(matchers_exports, {
  toAppearAfter: () => toAppearAfter,
  toAppearBefore: () => toAppearBefore,
  toBeChecked: () => toBeChecked,
  toBeDisabled: () => toBeDisabled,
  toBeEmpty: () => toBeEmpty,
  toBeEmptyDOMElement: () => toBeEmptyDOMElement,
  toBeEnabled: () => toBeEnabled,
  toBeInTheDOM: () => toBeInTheDOM,
  toBeInTheDocument: () => toBeInTheDocument,
  toBeInvalid: () => toBeInvalid,
  toBePartiallyChecked: () => toBePartiallyChecked,
  toBePartiallyPressed: () => toBePartiallyPressed,
  toBePressed: () => toBePressed,
  toBeRequired: () => toBeRequired,
  toBeValid: () => toBeValid,
  toBeVisible: () => toBeVisible,
  toContainElement: () => toContainElement,
  toContainHTML: () => toContainHTML,
  toHaveAccessibleDescription: () => toHaveAccessibleDescription,
  toHaveAccessibleErrorMessage: () => toHaveAccessibleErrorMessage,
  toHaveAccessibleName: () => toHaveAccessibleName,
  toHaveAttribute: () => toHaveAttribute,
  toHaveClass: () => toHaveClass,
  toHaveDescription: () => toHaveDescription,
  toHaveDisplayValue: () => toHaveDisplayValue,
  toHaveErrorMessage: () => toHaveErrorMessage,
  toHaveFocus: () => toHaveFocus,
  toHaveFormValues: () => toHaveFormValues,
  toHaveRole: () => toHaveRole,
  toHaveSelection: () => toHaveSelection,
  toHaveStyle: () => toHaveStyle,
  toHaveTextContent: () => toHaveTextContent,
  toHaveValue: () => toHaveValue
});

// ../../node_modules/@testing-library/jest-dom/dist/matchers-35e4d3bd.mjs
var import_redent = __toESM(require_redent(), 1);

// ../../node_modules/@adobe/css-tools/dist/index.mjs
function $parcel$defineInteropFlag(a2) {
  Object.defineProperty(a2, "__esModule", { value: !0, configurable: !0 });
}
function $parcel$export(e, n, v, s3) {
  Object.defineProperty(e, n, { get: v, set: s3, enumerable: !0, configurable: !0 });
}
var $009ddb00d3ec72b8$exports = {};
$parcel$defineInteropFlag($009ddb00d3ec72b8$exports);
$parcel$export($009ddb00d3ec72b8$exports, "default", () => $009ddb00d3ec72b8$export$2e2bcd8739ae039);
var $009ddb00d3ec72b8$export$2e2bcd8739ae039 = class extends Error {
  constructor(filename, msg, lineno, column, css) {
    super(filename + ":" + lineno + ":" + column + ": " + msg), this.reason = msg, this.filename = filename, this.line = lineno, this.column = column, this.source = css;
  }
}, $0865a9fb4cc365fe$exports = {};
$parcel$defineInteropFlag($0865a9fb4cc365fe$exports);
$parcel$export($0865a9fb4cc365fe$exports, "default", () => $0865a9fb4cc365fe$export$2e2bcd8739ae039);
var $0865a9fb4cc365fe$export$2e2bcd8739ae039 = class {
  constructor(start, end, source) {
    this.start = start, this.end = end, this.source = source;
  }
}, $b2e137848b48cf4f$exports = {};
$parcel$export($b2e137848b48cf4f$exports, "CssTypes", () => $b2e137848b48cf4f$export$9be5dd6e61d5d73a);
var $b2e137848b48cf4f$export$9be5dd6e61d5d73a;
(function(CssTypes) {
  CssTypes.stylesheet = "stylesheet", CssTypes.rule = "rule", CssTypes.declaration = "declaration", CssTypes.comment = "comment", CssTypes.container = "container", CssTypes.charset = "charset", CssTypes.document = "document", CssTypes.customMedia = "custom-media", CssTypes.fontFace = "font-face", CssTypes.host = "host", CssTypes.import = "import", CssTypes.keyframes = "keyframes", CssTypes.keyframe = "keyframe", CssTypes.layer = "layer", CssTypes.media = "media", CssTypes.namespace = "namespace", CssTypes.page = "page", CssTypes.startingStyle = "starting-style", CssTypes.supports = "supports";
})($b2e137848b48cf4f$export$9be5dd6e61d5d73a || ($b2e137848b48cf4f$export$9be5dd6e61d5d73a = {}));
var $d708735ed1303b43$var$commentre = /\/\*[^]*?(?:\*\/|$)/g, $d708735ed1303b43$export$98e6a39c04603d36 = (css, options) => {
  options = options || {};
  let lineno = 1, column = 1;
  function updatePosition(str) {
    let lines = str.match(/\n/g);
    lines && (lineno += lines.length);
    let i = str.lastIndexOf(`
`);
    column = ~i ? str.length - i : column + str.length;
  }
  function position() {
    let start = {
      line: lineno,
      column
    };
    return function(node) {
      return node.position = new $0865a9fb4cc365fe$export$2e2bcd8739ae039(start, {
        line: lineno,
        column
      }, options?.source || ""), whitespace(), node;
    };
  }
  let errorsList = [];
  function error(msg) {
    let err = new $009ddb00d3ec72b8$export$2e2bcd8739ae039(options?.source || "", msg, lineno, column, css);
    if (options?.silent) errorsList.push(err);
    else throw err;
  }
  function stylesheet() {
    let rulesList = rules();
    return {
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.stylesheet,
      stylesheet: {
        source: options?.source,
        rules: rulesList,
        parsingErrors: errorsList
      }
    };
  }
  function open() {
    return match(/^{\s*/);
  }
  function close() {
    return match(/^}/);
  }
  function rules() {
    let node, rules2 = [];
    for (whitespace(), comments(rules2); css.length && css.charAt(0) !== "}" && (node = atrule() || rule()); ) node && (rules2.push(node), comments(rules2));
    return rules2;
  }
  function match(re) {
    let m2 = re.exec(css);
    if (!m2) return;
    let str = m2[0];
    return updatePosition(str), css = css.slice(str.length), m2;
  }
  function whitespace() {
    match(/^\s*/);
  }
  function comments(rules2) {
    let c;
    for (rules2 = rules2 || []; c = comment(); ) c && rules2.push(c);
    return rules2;
  }
  function comment() {
    let pos = position();
    if (css.charAt(0) !== "/" || css.charAt(1) !== "*") return;
    let m2 = match(/^\/\*[^]*?\*\//);
    return m2 ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.comment,
      comment: m2[0].slice(2, -2)
    }) : error("End of comment missing");
  }
  function findClosingParenthese(str, start, depth) {
    let ptr = start + 1, found = !1, closeParentheses = str.indexOf(")", ptr);
    for (; !found && closeParentheses !== -1; ) {
      let nextParentheses = str.indexOf("(", ptr);
      nextParentheses !== -1 && nextParentheses < closeParentheses ? (ptr = findClosingParenthese(str, nextParentheses + 1, depth + 1) + 1, closeParentheses = str.indexOf(")", ptr)) : found = !0;
    }
    return found && closeParentheses !== -1 ? closeParentheses : -1;
  }
  function selector() {
    let m2 = match(/^([^{]+)/);
    if (!m2) return;
    let res = $d708735ed1303b43$var$trim(m2[0]).replace($d708735ed1303b43$var$commentre, "");
    if (res.indexOf(",") === -1) return [
      res
    ];
    let ptr = 0, startParentheses = res.indexOf("(", ptr);
    for (; startParentheses !== -1; ) {
      let closeParentheses = findClosingParenthese(res, startParentheses, 0);
      if (closeParentheses === -1) break;
      ptr = closeParentheses + 1, res = res.substring(0, startParentheses) + res.substring(startParentheses, closeParentheses).replace(/,/g, "\u200C") + res.substring(closeParentheses), startParentheses = res.indexOf("(", ptr);
    }
    return res = res.replace(/("|')(?:\\\1|.)*?\1/g, (m3) => m3.replace(/,/g, "\u200C")), res.split(",").map((s3) => $d708735ed1303b43$var$trim(s3.replace(/\u200C/g, ",")));
  }
  function declaration() {
    let pos = position(), propMatch = match(/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (!propMatch) return;
    let propValue = $d708735ed1303b43$var$trim(propMatch[0]);
    if (!match(/^:\s*/)) return error("property missing ':'");
    let val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/), ret = pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.declaration,
      property: propValue.replace($d708735ed1303b43$var$commentre, ""),
      value: val ? $d708735ed1303b43$var$trim(val[0]).replace($d708735ed1303b43$var$commentre, "") : ""
    });
    return match(/^[;\s]*/), ret;
  }
  function declarations() {
    let decls = [];
    if (!open()) return error("missing '{'");
    comments(decls);
    let decl;
    for (; decl = declaration(); ) decl && (decls.push(decl), comments(decls));
    return close() ? decls : error("missing '}'");
  }
  function keyframe() {
    let m2, vals = [], pos = position();
    for (; m2 = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/); )
      vals.push(m2[1]), match(/^,\s*/);
    if (vals.length)
      return pos({
        type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.keyframe,
        values: vals,
        declarations: declarations() || []
      });
  }
  function atkeyframes() {
    let pos = position(), m1 = match(/^@([-\w]+)?keyframes\s*/);
    if (!m1) return;
    let vendor = m1[1], m2 = match(/^([-\w]+)\s*/);
    if (!m2) return error("@keyframes missing name");
    let name = m2[1];
    if (!open()) return error("@keyframes missing '{'");
    let frame, frames = comments();
    for (; frame = keyframe(); )
      frames.push(frame), frames = frames.concat(comments());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.keyframes,
      name,
      vendor,
      keyframes: frames
    }) : error("@keyframes missing '}'");
  }
  function atsupports() {
    let pos = position(), m2 = match(/^@supports *([^{]+)/);
    if (!m2) return;
    let supports = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return error("@supports missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.supports,
      supports,
      rules: style
    }) : error("@supports missing '}'");
  }
  function athost() {
    let pos = position();
    if (!match(/^@host\s*/)) return;
    if (!open()) return error("@host missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.host,
      rules: style
    }) : error("@host missing '}'");
  }
  function atcontainer() {
    let pos = position(), m2 = match(/^@container *([^{]+)/);
    if (!m2) return;
    let container = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return error("@container missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.container,
      container,
      rules: style
    }) : error("@container missing '}'");
  }
  function atlayer() {
    let pos = position(), m2 = match(/^@layer *([^{;@]+)/);
    if (!m2) return;
    let layer = $d708735ed1303b43$var$trim(m2[1]);
    if (!open())
      return match(/^[;\s]*/), pos({
        type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.layer,
        layer
      });
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.layer,
      layer,
      rules: style
    }) : error("@layer missing '}'");
  }
  function atmedia() {
    let pos = position(), m2 = match(/^@media *([^{]+)/);
    if (!m2) return;
    let media = $d708735ed1303b43$var$trim(m2[1]);
    if (!open()) return error("@media missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.media,
      media,
      rules: style
    }) : error("@media missing '}'");
  }
  function atcustommedia() {
    let pos = position(), m2 = match(/^@custom-media\s+(--\S+)\s*([^{;\s][^{;]*);/);
    if (m2)
      return pos({
        type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.customMedia,
        name: $d708735ed1303b43$var$trim(m2[1]),
        media: $d708735ed1303b43$var$trim(m2[2])
      });
  }
  function atpage() {
    let pos = position();
    if (!match(/^@page */)) return;
    let sel = selector() || [];
    if (!open()) return error("@page missing '{'");
    let decls = comments(), decl;
    for (; decl = declaration(); )
      decls.push(decl), decls = decls.concat(comments());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.page,
      selectors: sel,
      declarations: decls
    }) : error("@page missing '}'");
  }
  function atdocument() {
    let pos = position(), m2 = match(/^@([-\w]+)?document *([^{]+)/);
    if (!m2) return;
    let vendor = $d708735ed1303b43$var$trim(m2[1]), doc = $d708735ed1303b43$var$trim(m2[2]);
    if (!open()) return error("@document missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.document,
      document: doc,
      vendor,
      rules: style
    }) : error("@document missing '}'");
  }
  function atfontface() {
    let pos = position();
    if (!match(/^@font-face\s*/)) return;
    if (!open()) return error("@font-face missing '{'");
    let decls = comments(), decl;
    for (; decl = declaration(); )
      decls.push(decl), decls = decls.concat(comments());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.fontFace,
      declarations: decls
    }) : error("@font-face missing '}'");
  }
  function atstartingstyle() {
    let pos = position();
    if (!match(/^@starting-style\s*/)) return;
    if (!open()) return error("@starting-style missing '{'");
    let style = comments().concat(rules());
    return close() ? pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.startingStyle,
      rules: style
    }) : error("@starting-style missing '}'");
  }
  let atimport = _compileAtrule("import"), atcharset = _compileAtrule("charset"), atnamespace = _compileAtrule("namespace");
  function _compileAtrule(name) {
    let re = new RegExp("^@" + name + `\\s*((?::?[^;'"]|"(?:\\\\"|[^"])*?"|'(?:\\\\'|[^'])*?')+)(?:;|$)`);
    return function() {
      let pos = position(), m2 = match(re);
      if (!m2) return;
      let ret = {
        type: name
      };
      return ret[name] = m2[1].trim(), pos(ret);
    };
  }
  function atrule() {
    if (css[0] === "@")
      return atkeyframes() || atmedia() || atcustommedia() || atsupports() || atimport() || atcharset() || atnamespace() || atdocument() || atpage() || athost() || atfontface() || atcontainer() || atstartingstyle() || atlayer();
  }
  function rule() {
    let pos = position(), sel = selector();
    return sel ? (comments(), pos({
      type: $b2e137848b48cf4f$export$9be5dd6e61d5d73a.rule,
      selectors: sel,
      declarations: declarations() || []
    })) : error("selector missing");
  }
  return $d708735ed1303b43$var$addParent(stylesheet());
};
function $d708735ed1303b43$var$trim(str) {
  return str ? str.trim() : "";
}
function $d708735ed1303b43$var$addParent(obj, parent) {
  let isNode = obj && typeof obj.type == "string", childParent = isNode ? obj : parent;
  for (let k in obj) {
    let value = obj[k];
    Array.isArray(value) ? value.forEach((v) => {
      $d708735ed1303b43$var$addParent(v, childParent);
    }) : value && typeof value == "object" && $d708735ed1303b43$var$addParent(value, childParent);
  }
  return isNode && Object.defineProperty(obj, "parent", {
    configurable: !0,
    writable: !0,
    enumerable: !1,
    value: parent || null
  }), obj;
}
var $d708735ed1303b43$export$2e2bcd8739ae039 = $d708735ed1303b43$export$98e6a39c04603d36;
var $149c1bd638913645$export$98e6a39c04603d36 = $d708735ed1303b43$export$2e2bcd8739ae039;

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/polyfills/array.from.mjs
var toStr = Object.prototype.toString;
function isCallable(fn3) {
  return typeof fn3 == "function" || toStr.call(fn3) === "[object Function]";
}
function toInteger(value) {
  var number = Number(value);
  return isNaN(number) ? 0 : number === 0 || !isFinite(number) ? number : (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(value) {
  var len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
function arrayFrom(arrayLike, mapFn) {
  var C2 = Array, items = Object(arrayLike);
  if (arrayLike == null)
    throw new TypeError("Array.from requires an array-like object - not null or undefined");
  if (typeof mapFn < "u" && !isCallable(mapFn))
    throw new TypeError("Array.from: when provided, the second argument must be a function");
  for (var len = toLength(items.length), A = isCallable(C2) ? Object(new C2(len)) : new Array(len), k = 0, kValue; k < len; )
    kValue = items[k], mapFn ? A[k] = mapFn(kValue, k) : A[k] = kValue, k += 1;
  return A.length = len, A;
}

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/polyfills/SetLike.mjs
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), Object.defineProperty(Constructor, "prototype", { writable: !1 }), Constructor;
}
function _defineProperty(obj, key, value) {
  return key = _toPropertyKey(key), key in obj ? Object.defineProperty(obj, key, { value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input2, hint) {
  if (_typeof(input2) !== "object" || input2 === null) return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
var SetLike = (function() {
  function SetLike2() {
    var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    _classCallCheck(this, SetLike2), _defineProperty(this, "items", void 0), this.items = items;
  }
  return _createClass(SetLike2, [{
    key: "add",
    value: function(value) {
      return this.has(value) === !1 && this.items.push(value), this;
    }
  }, {
    key: "clear",
    value: function() {
      this.items = [];
    }
  }, {
    key: "delete",
    value: function(value) {
      var previousLength = this.items.length;
      return this.items = this.items.filter(function(item) {
        return item !== value;
      }), previousLength !== this.items.length;
    }
  }, {
    key: "forEach",
    value: function(callbackfn) {
      var _this = this;
      this.items.forEach(function(item) {
        callbackfn(item, item, _this);
      });
    }
  }, {
    key: "has",
    value: function(value) {
      return this.items.indexOf(value) !== -1;
    }
  }, {
    key: "size",
    get: function() {
      return this.items.length;
    }
  }]), SetLike2;
})(), SetLike_default = typeof Set > "u" ? Set : SetLike;

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/getRole.mjs
function getLocalName(element) {
  var _element$localName;
  return (
    // eslint-disable-next-line no-restricted-properties -- actual guard for environments without localName
    (_element$localName = element.localName) !== null && _element$localName !== void 0 ? _element$localName : (
      // eslint-disable-next-line no-restricted-properties -- required for the fallback
      element.tagName.toLowerCase()
    )
  );
}
var localNameToRoleMappings = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  details: "group",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  // WARNING: Only with an accessible name
  form: "form",
  footer: "contentinfo",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  header: "banner",
  hr: "separator",
  html: "document",
  legend: "legend",
  li: "listitem",
  math: "math",
  main: "main",
  menu: "list",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  // WARNING: Only in certain context
  option: "option",
  output: "status",
  progress: "progressbar",
  // WARNING: Only with an accessible name
  section: "region",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  // WARNING: Only in certain context
  td: "cell",
  th: "columnheader",
  thead: "rowgroup",
  tr: "row",
  ul: "list"
}, prohibitedAttributes = {
  caption: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  code: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  deletion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  emphasis: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  generic: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby", "aria-roledescription"]),
  insertion: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  none: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  paragraph: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  presentation: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  strong: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  subscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"]),
  superscript: /* @__PURE__ */ new Set(["aria-label", "aria-labelledby"])
};
function hasGlobalAriaAttributes(element, role) {
  return [
    "aria-atomic",
    "aria-busy",
    "aria-controls",
    "aria-current",
    "aria-description",
    "aria-describedby",
    "aria-details",
    // "disabled",
    "aria-dropeffect",
    // "errormessage",
    "aria-flowto",
    "aria-grabbed",
    // "haspopup",
    "aria-hidden",
    // "invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-live",
    "aria-owns",
    "aria-relevant",
    "aria-roledescription"
  ].some(function(attributeName) {
    var _prohibitedAttributes;
    return element.hasAttribute(attributeName) && !((_prohibitedAttributes = prohibitedAttributes[role]) !== null && _prohibitedAttributes !== void 0 && _prohibitedAttributes.has(attributeName));
  });
}
function ignorePresentationalRole(element, implicitRole) {
  return hasGlobalAriaAttributes(element, implicitRole);
}
function getRole(element) {
  var explicitRole = getExplicitRole(element);
  if (explicitRole === null || presentationRoles.indexOf(explicitRole) !== -1) {
    var implicitRole = getImplicitRole(element);
    if (presentationRoles.indexOf(explicitRole || "") === -1 || ignorePresentationalRole(element, implicitRole || ""))
      return implicitRole;
  }
  return explicitRole;
}
function getImplicitRole(element) {
  var mappedByTag = localNameToRoleMappings[getLocalName(element)];
  if (mappedByTag !== void 0)
    return mappedByTag;
  switch (getLocalName(element)) {
    case "a":
    case "area":
    case "link":
      if (element.hasAttribute("href"))
        return "link";
      break;
    case "img":
      return element.getAttribute("alt") === "" && !ignorePresentationalRole(element, "img") ? "presentation" : "img";
    case "input": {
      var _ref = element, type5 = _ref.type;
      switch (type5) {
        case "button":
        case "image":
        case "reset":
        case "submit":
          return "button";
        case "checkbox":
        case "radio":
          return type5;
        case "range":
          return "slider";
        case "email":
        case "tel":
        case "text":
        case "url":
          return element.hasAttribute("list") ? "combobox" : "textbox";
        case "search":
          return element.hasAttribute("list") ? "combobox" : "searchbox";
        case "number":
          return "spinbutton";
        default:
          return null;
      }
    }
    case "select":
      return element.hasAttribute("multiple") || element.size > 1 ? "listbox" : "combobox";
  }
  return null;
}
function getExplicitRole(element) {
  var role = element.getAttribute("role");
  if (role !== null) {
    var explicitRole = role.trim().split(" ")[0];
    if (explicitRole.length > 0)
      return explicitRole;
  }
  return null;
}

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/util.mjs
var presentationRoles = ["presentation", "none"];
function isElement(node) {
  return node !== null && node.nodeType === node.ELEMENT_NODE;
}
function isHTMLTableCaptionElement(node) {
  return isElement(node) && getLocalName(node) === "caption";
}
function isHTMLInputElement(node) {
  return isElement(node) && getLocalName(node) === "input";
}
function isHTMLOptGroupElement(node) {
  return isElement(node) && getLocalName(node) === "optgroup";
}
function isHTMLSelectElement(node) {
  return isElement(node) && getLocalName(node) === "select";
}
function isHTMLTableElement(node) {
  return isElement(node) && getLocalName(node) === "table";
}
function isHTMLTextAreaElement(node) {
  return isElement(node) && getLocalName(node) === "textarea";
}
function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument, defaultView = _ref.defaultView;
  if (defaultView === null)
    throw new TypeError("no window available");
  return defaultView;
}
function isHTMLFieldSetElement(node) {
  return isElement(node) && getLocalName(node) === "fieldset";
}
function isHTMLLegendElement(node) {
  return isElement(node) && getLocalName(node) === "legend";
}
function isHTMLSlotElement(node) {
  return isElement(node) && getLocalName(node) === "slot";
}
function isSVGElement(node) {
  return isElement(node) && node.ownerSVGElement !== void 0;
}
function isSVGSVGElement(node) {
  return isElement(node) && getLocalName(node) === "svg";
}
function isSVGTitleElement(node) {
  return isSVGElement(node) && getLocalName(node) === "title";
}
function queryIdRefs(node, attributeName) {
  if (isElement(node) && node.hasAttribute(attributeName)) {
    var ids = node.getAttribute(attributeName).split(" "), root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    return ids.map(function(id) {
      return root.getElementById(id);
    }).filter(
      function(element) {
        return element !== null;
      }
      // TODO: why does this not narrow?
    );
  }
  return [];
}
function hasAnyConcreteRoles(node, roles2) {
  return isElement(node) ? roles2.indexOf(getRole(node)) !== -1 : !1;
}

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/accessible-name-and-description.mjs
function asFlatString(s3) {
  return s3.trim().replace(/\s\s+/g, " ");
}
function isHidden(node, getComputedStyleImplementation) {
  if (!isElement(node))
    return !1;
  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true")
    return !0;
  var style = getComputedStyleImplementation(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}
function hasAbstractRole(node, role) {
  if (!isElement(node))
    return !1;
  if (role === "range")
    return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);
  throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
}
function querySelectorAllSubtree(element, selectors) {
  var elements = arrayFrom(element.querySelectorAll(selectors));
  return queryIdRefs(element, "aria-owns").forEach(function(root) {
    elements.push.apply(elements, arrayFrom(root.querySelectorAll(selectors)));
  }), elements;
}
function querySelectedOptions(listbox) {
  return isHTMLSelectElement(listbox) ? listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]") : querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}
function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, presentationRoles);
}
function isNativeHostLanguageTextAlternativeElement(node) {
  return isHTMLTableCaptionElement(node);
}
function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return !1;
}
function getValueOfTextbox(element) {
  return isHTMLInputElement(element) || isHTMLTextAreaElement(element) ? element.value : element.textContent || "";
}
function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");
  return /^["'].*["']$/.test(content) ? content.slice(1, -1) : "";
}
function isLabelableElement(element) {
  var localName = getLocalName(element);
  return localName === "button" || localName === "input" && element.getAttribute("type") !== "hidden" || localName === "meter" || localName === "output" || localName === "progress" || localName === "select" || localName === "textarea";
}
function findLabelableElement(element) {
  if (isLabelableElement(element))
    return element;
  var labelableElement = null;
  return element.childNodes.forEach(function(childNode) {
    if (labelableElement === null && isElement(childNode)) {
      var descendantLabelableElement = findLabelableElement(childNode);
      descendantLabelableElement !== null && (labelableElement = descendantLabelableElement);
    }
  }), labelableElement;
}
function getControlOfLabel(label) {
  if (label.control !== void 0)
    return label.control;
  var htmlFor = label.getAttribute("for");
  return htmlFor !== null ? label.ownerDocument.getElementById(htmlFor) : findLabelableElement(label);
}
function getLabels(element) {
  var labelsProperty = element.labels;
  if (labelsProperty === null)
    return labelsProperty;
  if (labelsProperty !== void 0)
    return arrayFrom(labelsProperty);
  if (!isLabelableElement(element))
    return null;
  var document = element.ownerDocument;
  return arrayFrom(document.querySelectorAll("label")).filter(function(label) {
    return getControlOfLabel(label) === element;
  });
}
function getSlotContents(slot) {
  var assignedNodes = slot.assignedNodes();
  return assignedNodes.length === 0 ? arrayFrom(slot.childNodes) : assignedNodes;
}
function computeTextAlternative(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, consultedNodes = new SetLike_default(), window2 = safeWindow(root), _options$compute = options.compute, compute = _options$compute === void 0 ? "name" : _options$compute, _options$computedStyl = options.computedStyleSupportsPseudoElements, computedStyleSupportsPseudoElements = _options$computedStyl === void 0 ? options.getComputedStyle !== void 0 : _options$computedStyl, _options$getComputedS = options.getComputedStyle, getComputedStyle = _options$getComputedS === void 0 ? window2.getComputedStyle.bind(window2) : _options$getComputedS, _options$hidden = options.hidden, hidden = _options$hidden === void 0 ? !1 : _options$hidden;
  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";
    if (isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoBefore = getComputedStyle(node, "::before"), beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }
    var childNodes = isHTMLSlotElement(node) ? getSlotContents(node) : arrayFrom(node.childNodes).concat(queryIdRefs(node, "aria-owns"));
    if (childNodes.forEach(function(child) {
      var result = computeTextAlternative2(child, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: !1,
        recursion: !0
      }), display2 = isElement(child) ? getComputedStyle(child).getPropertyValue("display") : "inline", separator = display2 !== "inline" ? " " : "";
      accumulatedText += "".concat(separator).concat(result).concat(separator);
    }), isElement(node) && computedStyleSupportsPseudoElements) {
      var pseudoAfter = getComputedStyle(node, "::after"), afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }
    return accumulatedText.trim();
  }
  function useAttribute(element, attributeName) {
    var attribute = element.getAttributeNode(attributeName);
    return attribute !== null && !consultedNodes.has(attribute) && attribute.value.trim() !== "" ? (consultedNodes.add(attribute), attribute.value) : null;
  }
  function computeTooltipAttributeValue(node) {
    return isElement(node) ? useAttribute(node, "title") : null;
  }
  function computeElementTextAlternative(node) {
    if (!isElement(node))
      return null;
    if (isHTMLFieldSetElement(node)) {
      consultedNodes.add(node);
      for (var children = arrayFrom(node.childNodes), i = 0; i < children.length; i += 1) {
        var child = children[i];
        if (isHTMLLegendElement(child))
          return computeTextAlternative2(child, {
            isEmbeddedInLabel: !1,
            isReferenced: !1,
            recursion: !1
          });
      }
    } else if (isHTMLTableElement(node)) {
      consultedNodes.add(node);
      for (var _children = arrayFrom(node.childNodes), _i = 0; _i < _children.length; _i += 1) {
        var _child = _children[_i];
        if (isHTMLTableCaptionElement(_child))
          return computeTextAlternative2(_child, {
            isEmbeddedInLabel: !1,
            isReferenced: !1,
            recursion: !1
          });
      }
    } else if (isSVGSVGElement(node)) {
      consultedNodes.add(node);
      for (var _children2 = arrayFrom(node.childNodes), _i2 = 0; _i2 < _children2.length; _i2 += 1) {
        var _child2 = _children2[_i2];
        if (isSVGTitleElement(_child2))
          return _child2.textContent;
      }
      return null;
    } else if (getLocalName(node) === "img" || getLocalName(node) === "area") {
      var nameFromAlt = useAttribute(node, "alt");
      if (nameFromAlt !== null)
        return nameFromAlt;
    } else if (isHTMLOptGroupElement(node)) {
      var nameFromLabel = useAttribute(node, "label");
      if (nameFromLabel !== null)
        return nameFromLabel;
    }
    if (isHTMLInputElement(node) && (node.type === "button" || node.type === "submit" || node.type === "reset")) {
      var nameFromValue = useAttribute(node, "value");
      if (nameFromValue !== null)
        return nameFromValue;
      if (node.type === "submit")
        return "Submit";
      if (node.type === "reset")
        return "Reset";
    }
    var labels = getLabels(node);
    if (labels !== null && labels.length !== 0)
      return consultedNodes.add(node), arrayFrom(labels).map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: !0,
          isReferenced: !1,
          recursion: !0
        });
      }).filter(function(label) {
        return label.length > 0;
      }).join(" ");
    if (isHTMLInputElement(node) && node.type === "image") {
      var _nameFromAlt = useAttribute(node, "alt");
      if (_nameFromAlt !== null)
        return _nameFromAlt;
      var nameFromTitle = useAttribute(node, "title");
      return nameFromTitle !== null ? nameFromTitle : "Submit Query";
    }
    if (hasAnyConcreteRoles(node, ["button"])) {
      var nameFromSubTree = computeMiscTextAlternative(node, {
        isEmbeddedInLabel: !1,
        isReferenced: !1
      });
      if (nameFromSubTree !== "")
        return nameFromSubTree;
    }
    return null;
  }
  function computeTextAlternative2(current, context) {
    if (consultedNodes.has(current))
      return "";
    if (!hidden && isHidden(current, getComputedStyle) && !context.isReferenced)
      return consultedNodes.add(current), "";
    var labelAttributeNode = isElement(current) ? current.getAttributeNode("aria-labelledby") : null, labelElements = labelAttributeNode !== null && !consultedNodes.has(labelAttributeNode) ? queryIdRefs(current, "aria-labelledby") : [];
    if (compute === "name" && !context.isReferenced && labelElements.length > 0)
      return consultedNodes.add(labelAttributeNode), labelElements.map(function(element) {
        return computeTextAlternative2(element, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: !0,
          // this isn't recursion as specified, otherwise we would skip
          // `aria-label` in
          // <input id="myself" aria-label="foo" aria-labelledby="myself"
          recursion: !1
        });
      }).join(" ");
    var skipToStep2E = context.recursion && isControl(current) && compute === "name";
    if (!skipToStep2E) {
      var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();
      if (ariaLabel !== "" && compute === "name")
        return consultedNodes.add(current), ariaLabel;
      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);
        if (elementTextAlternative !== null)
          return consultedNodes.add(current), elementTextAlternative;
      }
    }
    if (hasAnyConcreteRoles(current, ["menu"]))
      return consultedNodes.add(current), "";
    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);
        return selectedOptions.length === 0 ? isHTMLInputElement(current) ? current.value : "" : arrayFrom(selectedOptions).map(function(selectedOption) {
          return computeTextAlternative2(selectedOption, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: !1,
            recursion: !0
          });
        }).join(" ");
      }
      if (hasAbstractRole(current, "range"))
        return consultedNodes.add(current), current.hasAttribute("aria-valuetext") ? current.getAttribute("aria-valuetext") : current.hasAttribute("aria-valuenow") ? current.getAttribute("aria-valuenow") : current.getAttribute("value") || "";
      if (hasAnyConcreteRoles(current, ["textbox"]))
        return consultedNodes.add(current), getValueOfTextbox(current);
    }
    if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement(current)) {
      var accumulatedText2F = computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: !1
      });
      if (accumulatedText2F !== "")
        return consultedNodes.add(current), accumulatedText2F;
    }
    if (current.nodeType === current.TEXT_NODE)
      return consultedNodes.add(current), current.textContent || "";
    if (context.recursion)
      return consultedNodes.add(current), computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: !1
      });
    var tooltipAttributeValue = computeTooltipAttributeValue(current);
    return tooltipAttributeValue !== null ? (consultedNodes.add(current), tooltipAttributeValue) : (consultedNodes.add(current), "");
  }
  return asFlatString(computeTextAlternative2(root, {
    isEmbeddedInLabel: !1,
    // by spec computeAccessibleDescription starts with the referenced elements as roots
    isReferenced: compute === "description",
    recursion: !1
  }));
}

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/accessible-description.mjs
function _typeof2(o) {
  "@babel/helpers - typeof";
  return _typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && typeof Symbol == "function" && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof2(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function(r2) {
      _defineProperty2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty2(obj, key, value) {
  return key = _toPropertyKey2(key), key in obj ? Object.defineProperty(obj, key, { value, enumerable: !0, configurable: !0, writable: !0 }) : obj[key] = value, obj;
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _toPrimitive2(input2, hint) {
  if (_typeof2(input2) !== "object" || input2 === null) return input2;
  var prim = input2[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input2, hint || "default");
    if (_typeof2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input2);
}
function computeAccessibleDescription(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, description = queryIdRefs(root, "aria-describedby").map(function(element) {
    return computeTextAlternative(element, _objectSpread(_objectSpread({}, options), {}, {
      compute: "description"
    }));
  }).join(" ");
  if (description === "") {
    var ariaDescription = root.getAttribute("aria-description");
    description = ariaDescription === null ? "" : ariaDescription;
  }
  if (description === "") {
    var title = root.getAttribute("title");
    description = title === null ? "" : title;
  }
  return description;
}

// ../../node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api/dist/accessible-name.mjs
function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "none", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return prohibitsNaming(root) ? "" : computeTextAlternative(root, options);
}

// ../../node_modules/@testing-library/jest-dom/dist/matchers-35e4d3bd.mjs
var import_aria_query = __toESM(require_lib(), 1), import_picocolors = __toESM(require_picocolors_browser(), 1), import_css = __toESM(require_css_escape(), 1), GenericTypeError = class extends Error {
  constructor(expectedString, received, matcherFn, context) {
    super(), Error.captureStackTrace && Error.captureStackTrace(this, matcherFn);
    let withType = "";
    try {
      withType = context.utils.printWithType(
        "Received",
        received,
        context.utils.printReceived
      );
    } catch {
    }
    this.message = [
      context.utils.matcherHint(
        `${context.isNot ? ".not" : ""}.${matcherFn.name}`,
        "received",
        ""
      ),
      "",
      // eslint-disable-next-line new-cap
      `${context.utils.RECEIVED_COLOR(
        "received"
      )} value must ${expectedString}.`,
      withType
    ].join(`
`);
  }
}, HtmlElementTypeError = class extends GenericTypeError {
  constructor(...args) {
    super("be an HTMLElement or an SVGElement", ...args);
  }
}, NodeTypeError = class extends GenericTypeError {
  constructor(...args) {
    super("be a Node", ...args);
  }
};
function checkHasWindow(htmlElement, ErrorClass, ...args) {
  if (!htmlElement || !htmlElement.ownerDocument || !htmlElement.ownerDocument.defaultView)
    throw new ErrorClass(htmlElement, ...args);
}
function checkNode(node, ...args) {
  checkHasWindow(node, NodeTypeError, ...args);
  let window2 = node.ownerDocument.defaultView;
  if (!(node instanceof window2.Node))
    throw new NodeTypeError(node, ...args);
}
function checkHtmlElement(htmlElement, ...args) {
  checkHasWindow(htmlElement, HtmlElementTypeError, ...args);
  let window2 = htmlElement.ownerDocument.defaultView;
  if (!(htmlElement instanceof window2.HTMLElement) && !(htmlElement instanceof window2.SVGElement))
    throw new HtmlElementTypeError(htmlElement, ...args);
}
var InvalidCSSError = class extends Error {
  constructor(received, matcherFn, context) {
    super(), Error.captureStackTrace && Error.captureStackTrace(this, matcherFn), this.message = [
      received.message,
      "",
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR("Failing css:"),
      // eslint-disable-next-line new-cap
      context.utils.RECEIVED_COLOR(`${received.css}`)
    ].join(`
`);
  }
};
function parseCSS(css, ...args) {
  let ast = $149c1bd638913645$export$98e6a39c04603d36(`selector { ${css} }`, { silent: !0 }).stylesheet;
  if (ast.parsingErrors && ast.parsingErrors.length > 0) {
    let { reason, line } = ast.parsingErrors[0];
    throw new InvalidCSSError(
      {
        css,
        message: `Syntax error parsing expected css: ${reason} on line: ${line}`
      },
      ...args
    );
  }
  return ast.rules[0].declarations.filter((d) => d.type === "declaration").reduce(
    (obj, { property, value }) => Object.assign(obj, { [property]: value }),
    {}
  );
}
function display(context, value) {
  return typeof value == "string" ? value : context.utils.stringify(value);
}
function getMessage3(context, matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [
    `${matcher}
`,
    // eslint-disable-next-line new-cap
    `${expectedLabel}:
${context.utils.EXPECTED_COLOR(
      (0, import_redent.default)(display(context, expectedValue), 2)
    )}`,
    // eslint-disable-next-line new-cap
    `${receivedLabel}:
${context.utils.RECEIVED_COLOR(
      (0, import_redent.default)(display(context, receivedValue), 2)
    )}`
  ].join(`
`);
}
function matches(textToMatch, matcher) {
  return matcher instanceof RegExp ? matcher.test(textToMatch) : textToMatch.includes(String(matcher));
}
function deprecate(name, replacementText) {
  console.warn(
    `Warning: ${name} has been deprecated and will be removed in future updates.`,
    replacementText
  );
}
function normalize(text) {
  return text.replace(/\s+/g, " ").trim();
}
function getTag(element) {
  return element.tagName && element.tagName.toLowerCase();
}
function getSelectValue({ multiple, options }) {
  let selectedOptions = [...options].filter((option) => option.selected);
  if (multiple)
    return [...selectedOptions].map((opt) => opt.value);
  if (selectedOptions.length !== 0)
    return selectedOptions[0].value;
}
function getInputValue(inputElement) {
  switch (inputElement.type) {
    case "number":
      return inputElement.value === "" ? null : Number(inputElement.value);
    case "checkbox":
      return inputElement.checked;
    default:
      return inputElement.value;
  }
}
var rolesSupportingValues = ["meter", "progressbar", "slider", "spinbutton"];
function getAccessibleValue(element) {
  if (rolesSupportingValues.includes(element.getAttribute("role")))
    return Number(element.getAttribute("aria-valuenow"));
}
function getSingleElementValue(element) {
  if (element)
    switch (element.tagName.toLowerCase()) {
      case "input":
        return getInputValue(element);
      case "select":
        return getSelectValue(element);
      default:
        return element.value ?? getAccessibleValue(element);
    }
}
function toSentence(array, { wordConnector = ", ", lastWordConnector = " and " } = {}) {
  return [array.slice(0, -1).join(wordConnector), array[array.length - 1]].join(
    array.length > 1 ? lastWordConnector : ""
  );
}
function compareAsSet(val1, val2) {
  return Array.isArray(val1) && Array.isArray(val2) ? [...new Set(val1)].every((v) => new Set(val2).has(v)) : val1 === val2;
}
function toBeInTheDOM(element, container) {
  return deprecate(
    "toBeInTheDOM",
    "Please use toBeInTheDocument for searching the entire document and toContainElement for searching a specific container."
  ), element && checkHtmlElement(element, toBeInTheDOM, this), container && checkHtmlElement(container, toBeInTheDOM, this), {
    pass: container ? container.contains(element) : !!element,
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toBeInTheDOM`,
        "element",
        ""
      ),
      "",
      "Received:",
      `  ${this.utils.printReceived(
        element && element.cloneNode(!1)
      )}`
    ].join(`
`)
  };
}
function toBeInTheDocument(element) {
  (element !== null || !this.isNot) && checkHtmlElement(element, toBeInTheDocument, this);
  let pass = element === null ? !1 : element.ownerDocument === element.getRootNode({ composed: !0 }), errorFound = () => `expected document not to contain element, found ${this.utils.stringify(
    element.cloneNode(!0)
  )} instead`, errorNotFound = () => "element could not be found in the document";
  return {
    pass,
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toBeInTheDocument`,
        "element",
        ""
      ),
      "",
      // eslint-disable-next-line new-cap
      this.utils.RECEIVED_COLOR(this.isNot ? errorFound() : errorNotFound())
    ].join(`
`)
  };
}
function toBeEmpty(element) {
  return deprecate(
    "toBeEmpty",
    "Please use instead toBeEmptyDOMElement for finding empty nodes in the DOM."
  ), checkHtmlElement(element, toBeEmpty, this), {
    pass: element.innerHTML === "",
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toBeEmpty`,
        "element",
        ""
      ),
      "",
      "Received:",
      `  ${this.utils.printReceived(element.innerHTML)}`
    ].join(`
`)
  };
}
function toBeEmptyDOMElement(element) {
  return checkHtmlElement(element, toBeEmptyDOMElement, this), {
    pass: isEmptyElement(element),
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toBeEmptyDOMElement`,
        "element",
        ""
      ),
      "",
      "Received:",
      `  ${this.utils.printReceived(element.innerHTML)}`
    ].join(`
`)
  };
}
function isEmptyElement(element) {
  return [...element.childNodes].filter((node) => node.nodeType !== 8).length === 0;
}
function toContainElement(container, element) {
  return checkHtmlElement(container, toContainElement, this), element !== null && checkHtmlElement(element, toContainElement, this), {
    pass: container.contains(element),
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toContainElement`,
        "element",
        "element"
      ),
      "",
      // eslint-disable-next-line new-cap
      this.utils.RECEIVED_COLOR(`${this.utils.stringify(
        container.cloneNode(!1)
      )} ${this.isNot ? "contains:" : "does not contain:"} ${this.utils.stringify(element && element.cloneNode(!1))}
        `)
    ].join(`
`)
  };
}
function getNormalizedHtml(container, htmlText) {
  let div = container.ownerDocument.createElement("div");
  return div.innerHTML = htmlText, div.innerHTML;
}
function toContainHTML(container, htmlText) {
  if (checkHtmlElement(container, toContainHTML, this), typeof htmlText != "string")
    throw new Error(`.toContainHTML() expects a string value, got ${htmlText}`);
  return {
    pass: container.outerHTML.includes(getNormalizedHtml(container, htmlText)),
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toContainHTML`,
        "element",
        ""
      ),
      "Expected:",
      // eslint-disable-next-line new-cap
      `  ${this.utils.EXPECTED_COLOR(htmlText)}`,
      "Received:",
      `  ${this.utils.printReceived(container.cloneNode(!0))}`
    ].join(`
`)
  };
}
function toHaveTextContent(node, checkWith, options = { normalizeWhitespace: !0 }) {
  checkNode(node, toHaveTextContent, this);
  let textContent = options.normalizeWhitespace ? normalize(node.textContent) : node.textContent.replace(/\u00a0/g, " "), checkingWithEmptyString = textContent !== "" && checkWith === "";
  return {
    pass: !checkingWithEmptyString && matches(textContent, checkWith),
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveTextContent`,
          "element",
          ""
        ),
        checkingWithEmptyString ? "Checking with empty string will always match, use .toBeEmptyDOMElement() instead" : `Expected element ${to} have text content`,
        checkWith,
        "Received",
        textContent
      );
    }
  };
}
function toHaveAccessibleDescription(htmlElement, expectedAccessibleDescription) {
  checkHtmlElement(htmlElement, toHaveAccessibleDescription, this);
  let actualAccessibleDescription = computeAccessibleDescription(htmlElement), missingExpectedValue = arguments.length === 1, pass = !1;
  return missingExpectedValue ? pass = actualAccessibleDescription !== "" : pass = expectedAccessibleDescription instanceof RegExp ? expectedAccessibleDescription.test(actualAccessibleDescription) : this.equals(
    actualAccessibleDescription,
    expectedAccessibleDescription
  ), {
    pass,
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveAccessibleDescription.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have accessible description`,
        expectedAccessibleDescription,
        "Received",
        actualAccessibleDescription
      );
    }
  };
}
var ariaInvalidName = "aria-invalid", validStates = ["false"];
function toHaveAccessibleErrorMessage(htmlElement, expectedAccessibleErrorMessage) {
  checkHtmlElement(htmlElement, toHaveAccessibleErrorMessage, this);
  let to = this.isNot ? "not to" : "to", method = this.isNot ? ".not.toHaveAccessibleErrorMessage" : ".toHaveAccessibleErrorMessage", errormessageId = htmlElement.getAttribute("aria-errormessage");
  if (!!errormessageId && /\s+/.test(errormessageId))
    return {
      pass: !1,
      message: () => getMessage3(
        this,
        this.utils.matcherHint(method, "element"),
        "Expected element's `aria-errormessage` attribute to be empty or a single, valid ID",
        "",
        "Received",
        `aria-errormessage="${errormessageId}"`
      )
    };
  let ariaInvalidVal = htmlElement.getAttribute(ariaInvalidName);
  if (!htmlElement.hasAttribute(ariaInvalidName) || validStates.includes(ariaInvalidVal))
    return {
      pass: !1,
      message: () => getMessage3(
        this,
        this.utils.matcherHint(method, "element"),
        "Expected element to be marked as invalid with attribute",
        `${ariaInvalidName}="${String(!0)}"`,
        "Received",
        htmlElement.hasAttribute("aria-invalid") ? `${ariaInvalidName}="${htmlElement.getAttribute(ariaInvalidName)}` : null
      )
    };
  let error = normalize(
    htmlElement.ownerDocument.getElementById(errormessageId)?.textContent ?? ""
  );
  return {
    pass: expectedAccessibleErrorMessage === void 0 ? !!error : expectedAccessibleErrorMessage instanceof RegExp ? expectedAccessibleErrorMessage.test(error) : this.equals(error, expectedAccessibleErrorMessage),
    message: () => getMessage3(
      this,
      this.utils.matcherHint(method, "element"),
      `Expected element ${to} have accessible error message`,
      expectedAccessibleErrorMessage ?? "",
      "Received",
      error
    )
  };
}
var elementRoleList = buildElementRoleList(import_aria_query.elementRoles);
function toHaveRole(htmlElement, expectedRole) {
  checkHtmlElement(htmlElement, toHaveRole, this);
  let actualRoles = getExplicitOrImplicitRoles(htmlElement);
  return {
    pass: actualRoles.some((el) => el === expectedRole),
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveRole.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have role`,
        expectedRole,
        "Received",
        actualRoles.join(", ")
      );
    }
  };
}
function getExplicitOrImplicitRoles(htmlElement) {
  return htmlElement.hasAttribute("role") ? htmlElement.getAttribute("role").split(" ").filter(Boolean) : getImplicitAriaRoles(htmlElement);
}
function getImplicitAriaRoles(currentNode) {
  for (let { match, roles: roles2 } of elementRoleList)
    if (match(currentNode))
      return [...roles2];
  return [];
}
function buildElementRoleList(elementRolesMap) {
  function makeElementSelector({ name, attributes }) {
    return `${name}${attributes.map(({ name: attributeName, value, constraints = [] }) => constraints.indexOf("undefined") !== -1 ? `:not([${attributeName}])` : value ? `[${attributeName}="${value}"]` : `[${attributeName}]`).join("")}`;
  }
  function getSelectorSpecificity({ attributes = [] }) {
    return attributes.length;
  }
  function bySelectorSpecificity({ specificity: leftSpecificity }, { specificity: rightSpecificity }) {
    return rightSpecificity - leftSpecificity;
  }
  function match(element) {
    let { attributes = [] } = element, typeTextIndex = attributes.findIndex(
      (attribute) => attribute.value && attribute.name === "type" && attribute.value === "text"
    );
    typeTextIndex >= 0 && (attributes = [
      ...attributes.slice(0, typeTextIndex),
      ...attributes.slice(typeTextIndex + 1)
    ]);
    let selector = makeElementSelector({ ...element, attributes });
    return (node) => typeTextIndex >= 0 && node.type !== "text" ? !1 : node.matches(selector);
  }
  let result = [];
  for (let [element, roles2] of elementRolesMap.entries())
    result = [
      ...result,
      {
        match: match(element),
        roles: Array.from(roles2),
        specificity: getSelectorSpecificity(element)
      }
    ];
  return result.sort(bySelectorSpecificity);
}
function toHaveAccessibleName(htmlElement, expectedAccessibleName) {
  checkHtmlElement(htmlElement, toHaveAccessibleName, this);
  let actualAccessibleName = computeAccessibleName(htmlElement), missingExpectedValue = arguments.length === 1, pass = !1;
  return missingExpectedValue ? pass = actualAccessibleName !== "" : pass = expectedAccessibleName instanceof RegExp ? expectedAccessibleName.test(actualAccessibleName) : this.equals(actualAccessibleName, expectedAccessibleName), {
    pass,
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${toHaveAccessibleName.name}`,
          "element",
          ""
        ),
        `Expected element ${to} have accessible name`,
        expectedAccessibleName,
        "Received",
        actualAccessibleName
      );
    }
  };
}
function printAttribute(stringify2, name, value) {
  return value === void 0 ? name : `${name}=${stringify2(value)}`;
}
function getAttributeComment(stringify2, name, value) {
  return value === void 0 ? `element.hasAttribute(${stringify2(name)})` : `element.getAttribute(${stringify2(name)}) === ${stringify2(value)}`;
}
function toHaveAttribute(htmlElement, name, expectedValue) {
  checkHtmlElement(htmlElement, toHaveAttribute, this);
  let isExpectedValuePresent = expectedValue !== void 0, hasAttribute = htmlElement.hasAttribute(name), receivedValue = htmlElement.getAttribute(name);
  return {
    pass: isExpectedValuePresent ? hasAttribute && this.equals(receivedValue, expectedValue) : hasAttribute,
    message: () => {
      let to = this.isNot ? "not to" : "to", receivedAttribute = hasAttribute ? printAttribute(this.utils.stringify, name, receivedValue) : null, matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveAttribute`,
        "element",
        this.utils.printExpected(name),
        {
          secondArgument: isExpectedValuePresent ? this.utils.printExpected(expectedValue) : void 0,
          comment: getAttributeComment(
            this.utils.stringify,
            name,
            expectedValue
          )
        }
      );
      return getMessage3(
        this,
        matcher,
        `Expected the element ${to} have attribute`,
        printAttribute(this.utils.stringify, name, expectedValue),
        "Received",
        receivedAttribute
      );
    }
  };
}
function getExpectedClassNamesAndOptions(params) {
  let lastParam = params.pop(), expectedClassNames, options;
  return typeof lastParam == "object" && !(lastParam instanceof RegExp) ? (expectedClassNames = params, options = lastParam) : (expectedClassNames = params.concat(lastParam), options = { exact: !1 }), { expectedClassNames, options };
}
function splitClassNames(str) {
  return str ? str.split(/\s+/).filter((s3) => s3.length > 0) : [];
}
function isSubset$1(subset, superset) {
  return subset.every(
    (strOrRegexp) => typeof strOrRegexp == "string" ? superset.includes(strOrRegexp) : superset.some((className) => strOrRegexp.test(className))
  );
}
function toHaveClass(htmlElement, ...params) {
  checkHtmlElement(htmlElement, toHaveClass, this);
  let { expectedClassNames, options } = getExpectedClassNamesAndOptions(params), received = splitClassNames(htmlElement.getAttribute("class")), expected = expectedClassNames.reduce(
    (acc, className) => acc.concat(
      typeof className == "string" || !className ? splitClassNames(className) : className
    ),
    []
  ), hasRegExp = expected.some((className) => className instanceof RegExp);
  if (options.exact && hasRegExp)
    throw new Error("Exact option does not support RegExp expected class names");
  return options.exact ? {
    pass: isSubset$1(expected, received) && expected.length === received.length,
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveClass`,
          "element",
          this.utils.printExpected(expected.join(" "))
        ),
        `Expected the element ${to} have EXACTLY defined classes`,
        expected.join(" "),
        "Received",
        received.join(" ")
      );
    }
  } : expected.length > 0 ? {
    pass: isSubset$1(expected, received),
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveClass`,
          "element",
          this.utils.printExpected(expected.join(" "))
        ),
        `Expected the element ${to} have class`,
        expected.join(" "),
        "Received",
        received.join(" ")
      );
    }
  } : {
    pass: this.isNot ? received.length > 0 : !1,
    message: () => this.isNot ? getMessage3(
      this,
      this.utils.matcherHint(".not.toHaveClass", "element", ""),
      "Expected the element to have classes",
      "(none)",
      "Received",
      received.join(" ")
    ) : [
      this.utils.matcherHint(".toHaveClass", "element"),
      "At least one expected class must be provided."
    ].join(`
`)
  };
}
function getStyleDeclaration(document, css) {
  let styles2 = {}, copy3 = document.createElement("div");
  return Object.keys(css).forEach((property) => {
    copy3.style[property] = css[property], styles2[property] = copy3.style[property];
  }), styles2;
}
function isSubset(styles2, computedStyle) {
  return !!Object.keys(styles2).length && Object.entries(styles2).every(([prop, value]) => {
    let isCustomProperty = prop.startsWith("--"), spellingVariants = [prop];
    return isCustomProperty || spellingVariants.push(prop.toLowerCase()), spellingVariants.some(
      (name) => computedStyle[name] === value || computedStyle.getPropertyValue(name) === value
    );
  });
}
function printoutStyles(styles2) {
  return Object.keys(styles2).sort().map((prop) => `${prop}: ${styles2[prop]};`).join(`
`);
}
function expectedDiff(diffFn, expected, computedStyles) {
  let received = Array.from(computedStyles).filter((prop) => expected[prop] !== void 0).reduce(
    (obj, prop) => Object.assign(obj, { [prop]: computedStyles.getPropertyValue(prop) }),
    {}
  );
  return diffFn(printoutStyles(expected), printoutStyles(received)).replace(`${import_picocolors.default.red("+ Received")}
`, "");
}
function toHaveStyle(htmlElement, css) {
  checkHtmlElement(htmlElement, toHaveStyle, this);
  let parsedCSS = typeof css == "object" ? css : parseCSS(css, toHaveStyle, this), { getComputedStyle } = htmlElement.ownerDocument.defaultView, expected = getStyleDeclaration(htmlElement.ownerDocument, parsedCSS), received = getComputedStyle(htmlElement);
  return {
    pass: isSubset(expected, received),
    message: () => {
      let matcher = `${this.isNot ? ".not" : ""}.toHaveStyle`;
      return [
        this.utils.matcherHint(matcher, "element", ""),
        expectedDiff(this.utils.diff, expected, received)
      ].join(`

`);
    }
  };
}
function toHaveFocus(element) {
  return checkHtmlElement(element, toHaveFocus, this), {
    pass: element.ownerDocument.activeElement === element,
    message: () => [
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveFocus`,
        "element",
        ""
      ),
      "",
      ...this.isNot ? [
        "Received element is focused:",
        `  ${this.utils.printReceived(element)}`
      ] : [
        "Expected element with focus:",
        `  ${this.utils.printExpected(element)}`,
        "Received element with focus:",
        `  ${this.utils.printReceived(
          element.ownerDocument.activeElement
        )}`
      ]
    ].join(`
`)
  };
}
function getMultiElementValue(elements) {
  let types = [...new Set(elements.map((element) => element.type))];
  if (types.length !== 1)
    throw new Error(
      "Multiple form elements with the same name must be of the same type"
    );
  switch (types[0]) {
    case "radio": {
      let theChosenOne = elements.find((radio) => radio.checked);
      return theChosenOne ? theChosenOne.value : void 0;
    }
    case "checkbox":
      return elements.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value);
    default:
      return elements.map((element) => element.value);
  }
}
function getFormValue(container, name) {
  let elements = [...container.querySelectorAll(`[name="${(0, import_css.default)(name)}"]`)];
  if (elements.length !== 0)
    return elements.length === 1 ? getSingleElementValue(elements[0]) : getMultiElementValue(elements);
}
function getPureName(name) {
  return /\[\]$/.test(name) ? name.slice(0, -2) : name;
}
function getAllFormValues(container) {
  return Array.from(container.elements).map((element) => element.name).reduce(
    (obj, name) => ({
      ...obj,
      [getPureName(name)]: getFormValue(container, name)
    }),
    {}
  );
}
function toHaveFormValues(formElement, expectedValues) {
  if (checkHtmlElement(formElement, toHaveFormValues, this), !formElement.elements)
    throw new Error("toHaveFormValues must be called on a form or a fieldset");
  let formValues = getAllFormValues(formElement);
  return {
    pass: Object.entries(expectedValues).every(
      ([name, expectedValue]) => compareAsSet(formValues[name], expectedValue)
    ),
    message: () => {
      let to = this.isNot ? "not to" : "to", matcher = `${this.isNot ? ".not" : ""}.toHaveFormValues`, commonKeyValues = Object.keys(formValues).filter((key) => expectedValues.hasOwnProperty(key)).reduce((obj, key) => ({ ...obj, [key]: formValues[key] }), {});
      return [
        this.utils.matcherHint(matcher, "element", ""),
        `Expected the element ${to} have form values`,
        this.utils.diff(expectedValues, commonKeyValues)
      ].join(`

`);
    }
  };
}
function isStyleVisible(element) {
  let { getComputedStyle } = element.ownerDocument.defaultView, { display: display2, visibility, opacity } = getComputedStyle(element);
  return display2 !== "none" && visibility !== "hidden" && visibility !== "collapse" && opacity !== "0" && opacity !== 0;
}
function isAttributeVisible(element, previousElement) {
  let detailsVisibility;
  return previousElement ? detailsVisibility = element.nodeName === "DETAILS" && previousElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : !0 : detailsVisibility = element.nodeName === "DETAILS" ? element.hasAttribute("open") : !0, !element.hasAttribute("hidden") && detailsVisibility;
}
function isElementVisible(element, previousElement) {
  return isStyleVisible(element) && isAttributeVisible(element, previousElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function toBeVisible(element) {
  checkHtmlElement(element, toBeVisible, this);
  let isInDocument = element.ownerDocument === element.getRootNode({ composed: !0 }), isVisible2 = isInDocument && isElementVisible(element);
  return {
    pass: isVisible2,
    message: () => {
      let is = isVisible2 ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeVisible`,
          "element",
          ""
        ),
        "",
        `Received element ${is} visible${isInDocument ? "" : " (element is not in the document)"}:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
var FORM_TAGS$2 = [
  "fieldset",
  "input",
  "select",
  "optgroup",
  "option",
  "button",
  "textarea"
];
function isFirstLegendChildOfFieldset(element, parent) {
  return getTag(element) === "legend" && getTag(parent) === "fieldset" && element.isSameNode(
    Array.from(parent.children).find((child) => getTag(child) === "legend")
  );
}
function isElementDisabledByParent(element, parent) {
  return isElementDisabled(parent) && !isFirstLegendChildOfFieldset(element, parent);
}
function isCustomElement(tag) {
  return tag.includes("-");
}
function canElementBeDisabled(element) {
  let tag = getTag(element);
  return FORM_TAGS$2.includes(tag) || isCustomElement(tag);
}
function isElementDisabled(element) {
  return canElementBeDisabled(element) && element.hasAttribute("disabled");
}
function isAncestorDisabled(element) {
  let parent = element.parentElement;
  return !!parent && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent));
}
function isElementOrAncestorDisabled(element) {
  return canElementBeDisabled(element) && (isElementDisabled(element) || isAncestorDisabled(element));
}
function toBeDisabled(element) {
  checkHtmlElement(element, toBeDisabled, this);
  let isDisabled3 = isElementOrAncestorDisabled(element);
  return {
    pass: isDisabled3,
    message: () => {
      let is = isDisabled3 ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeDisabled`,
          "element",
          ""
        ),
        "",
        `Received element ${is} disabled:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
function toBeEnabled(element) {
  checkHtmlElement(element, toBeEnabled, this);
  let isEnabled = !isElementOrAncestorDisabled(element);
  return {
    pass: isEnabled,
    message: () => {
      let is = isEnabled ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeEnabled`,
          "element",
          ""
        ),
        "",
        `Received element ${is} enabled:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
var FORM_TAGS$1 = ["select", "textarea"], ARIA_FORM_TAGS = ["input", "select", "textarea"], UNSUPPORTED_INPUT_TYPES = [
  "color",
  "hidden",
  "range",
  "submit",
  "image",
  "reset"
], SUPPORTED_ARIA_ROLES = [
  "checkbox",
  "combobox",
  "gridcell",
  "listbox",
  "radiogroup",
  "spinbutton",
  "textbox",
  "tree"
];
function isRequiredOnFormTagsExceptInput(element) {
  return FORM_TAGS$1.includes(getTag(element)) && element.hasAttribute("required");
}
function isRequiredOnSupportedInput(element) {
  return getTag(element) === "input" && element.hasAttribute("required") && (element.hasAttribute("type") && !UNSUPPORTED_INPUT_TYPES.includes(element.getAttribute("type")) || !element.hasAttribute("type"));
}
function isElementRequiredByARIA(element) {
  return element.hasAttribute("aria-required") && element.getAttribute("aria-required") === "true" && (ARIA_FORM_TAGS.includes(getTag(element)) || element.hasAttribute("role") && SUPPORTED_ARIA_ROLES.includes(element.getAttribute("role")));
}
function toBeRequired(element) {
  checkHtmlElement(element, toBeRequired, this);
  let isRequired = isRequiredOnFormTagsExceptInput(element) || isRequiredOnSupportedInput(element) || isElementRequiredByARIA(element);
  return {
    pass: isRequired,
    message: () => {
      let is = isRequired ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeRequired`,
          "element",
          ""
        ),
        "",
        `Received element ${is} required:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
var FORM_TAGS = ["form", "input", "select", "textarea"];
function isElementHavingAriaInvalid(element) {
  return element.hasAttribute("aria-invalid") && element.getAttribute("aria-invalid") !== "false";
}
function isSupportsValidityMethod(element) {
  return FORM_TAGS.includes(getTag(element));
}
function isElementInvalid(element) {
  let isHaveAriaInvalid = isElementHavingAriaInvalid(element);
  return isSupportsValidityMethod(element) ? isHaveAriaInvalid || !element.checkValidity() : isHaveAriaInvalid;
}
function toBeInvalid(element) {
  checkHtmlElement(element, toBeInvalid, this);
  let isInvalid = isElementInvalid(element);
  return {
    pass: isInvalid,
    message: () => {
      let is = isInvalid ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeInvalid`,
          "element",
          ""
        ),
        "",
        `Received element ${is} currently invalid:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
function toBeValid(element) {
  checkHtmlElement(element, toBeValid, this);
  let isValid = !isElementInvalid(element);
  return {
    pass: isValid,
    message: () => {
      let is = isValid ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeValid`,
          "element",
          ""
        ),
        "",
        `Received element ${is} currently valid:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
function toHaveValue(htmlElement, expectedValue) {
  if (checkHtmlElement(htmlElement, toHaveValue, this), htmlElement.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(htmlElement.type))
    throw new Error(
      "input with type=checkbox or type=radio cannot be used with .toHaveValue(). Use .toBeChecked() for type=checkbox or .toHaveFormValues() instead"
    );
  let receivedValue = getSingleElementValue(htmlElement), expectsValue = expectedValue !== void 0, expectedTypedValue = expectedValue, receivedTypedValue = receivedValue;
  return expectedValue == receivedValue && expectedValue !== receivedValue && (expectedTypedValue = `${expectedValue} (${typeof expectedValue})`, receivedTypedValue = `${receivedValue} (${typeof receivedValue})`), {
    pass: expectsValue ? compareAsSet(receivedValue, expectedValue) : !!receivedValue,
    message: () => {
      let to = this.isNot ? "not to" : "to", matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveValue`,
        "element",
        expectedValue
      );
      return getMessage3(
        this,
        matcher,
        `Expected the element ${to} have value`,
        expectsValue ? expectedTypedValue : "(any)",
        "Received",
        receivedTypedValue
      );
    }
  };
}
function toHaveDisplayValue(htmlElement, expectedValue) {
  checkHtmlElement(htmlElement, toHaveDisplayValue, this);
  let tagName = htmlElement.tagName.toLowerCase();
  if (!["select", "input", "textarea"].includes(tagName))
    throw new Error(
      ".toHaveDisplayValue() currently supports only input, textarea or select elements, try with another matcher instead."
    );
  if (tagName === "input" && ["radio", "checkbox"].includes(htmlElement.type))
    throw new Error(
      `.toHaveDisplayValue() currently does not support input[type="${htmlElement.type}"], try with another matcher instead.`
    );
  let values = getValues(tagName, htmlElement), expectedValues = getExpectedValues(expectedValue), numberOfMatchesWithValues = expectedValues.filter(
    (expected) => values.some(
      (value) => expected instanceof RegExp ? expected.test(value) : this.equals(value, String(expected))
    )
  ).length, matchedWithAllValues = numberOfMatchesWithValues === values.length, matchedWithAllExpectedValues = numberOfMatchesWithValues === expectedValues.length;
  return {
    pass: matchedWithAllValues && matchedWithAllExpectedValues,
    message: () => getMessage3(
      this,
      this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveDisplayValue`,
        "element",
        ""
      ),
      `Expected element ${this.isNot ? "not " : ""}to have display value`,
      expectedValue,
      "Received",
      values
    )
  };
}
function getValues(tagName, htmlElement) {
  return tagName === "select" ? Array.from(htmlElement).filter((option) => option.selected).map((option) => option.textContent) : [htmlElement.value];
}
function getExpectedValues(expectedValue) {
  return expectedValue instanceof Array ? expectedValue : [expectedValue];
}
function toBeChecked(element) {
  checkHtmlElement(element, toBeChecked, this);
  let isValidInput = () => element.tagName.toLowerCase() === "input" && ["checkbox", "radio"].includes(element.type), isValidAriaElement = () => roleSupportsChecked(element.getAttribute("role")) && ["true", "false"].includes(element.getAttribute("aria-checked"));
  if (!isValidInput() && !isValidAriaElement())
    return {
      pass: !1,
      message: () => `only inputs with type="checkbox" or type="radio" or elements with ${supportedRolesSentence()} and a valid aria-checked attribute can be used with .toBeChecked(). Use .toHaveValue() instead`
    };
  let isChecked = () => isValidInput() ? element.checked : element.getAttribute("aria-checked") === "true";
  return {
    pass: isChecked(),
    message: () => {
      let is = isChecked() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBeChecked`,
          "element",
          ""
        ),
        "",
        `Received element ${is} checked:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
function supportedRolesSentence() {
  return toSentence(
    supportedRoles().map((role) => `role="${role}"`),
    { lastWordConnector: " or " }
  );
}
function supportedRoles() {
  return import_aria_query.roles.keys().filter(roleSupportsChecked);
}
function roleSupportsChecked(role) {
  return import_aria_query.roles.get(role)?.props["aria-checked"] !== void 0;
}
function toBePartiallyChecked(element) {
  checkHtmlElement(element, toBePartiallyChecked, this);
  let isValidInput = () => element.tagName.toLowerCase() === "input" && element.type === "checkbox", isValidAriaElement = () => element.getAttribute("role") === "checkbox";
  if (!isValidInput() && !isValidAriaElement())
    return {
      pass: !1,
      message: () => 'only inputs with type="checkbox" or elements with role="checkbox" and a valid aria-checked attribute can be used with .toBePartiallyChecked(). Use .toHaveValue() instead'
    };
  let isPartiallyChecked = () => {
    let isAriaMixed = element.getAttribute("aria-checked") === "mixed";
    return isValidInput() && element.indeterminate || isAriaMixed;
  };
  return {
    pass: isPartiallyChecked(),
    message: () => {
      let is = isPartiallyChecked() ? "is" : "is not";
      return [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toBePartiallyChecked`,
          "element",
          ""
        ),
        "",
        `Received element ${is} partially checked:`,
        `  ${this.utils.printReceived(element.cloneNode(!1))}`
      ].join(`
`);
    }
  };
}
function toHaveDescription(htmlElement, checkWith) {
  deprecate(
    "toHaveDescription",
    "Please use toHaveAccessibleDescription."
  ), checkHtmlElement(htmlElement, toHaveDescription, this);
  let expectsDescription = checkWith !== void 0, descriptionIDs = (htmlElement.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean), description = "";
  if (descriptionIDs.length > 0) {
    let document = htmlElement.ownerDocument, descriptionEls = descriptionIDs.map((descriptionID) => document.getElementById(descriptionID)).filter(Boolean);
    description = normalize(descriptionEls.map((el) => el.textContent).join(" "));
  }
  return {
    pass: expectsDescription ? checkWith instanceof RegExp ? checkWith.test(description) : this.equals(description, checkWith) : !!description,
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveDescription`,
          "element",
          ""
        ),
        `Expected the element ${to} have description`,
        this.utils.printExpected(checkWith),
        "Received",
        this.utils.printReceived(description)
      );
    }
  };
}
function toHaveErrorMessage(htmlElement, checkWith) {
  if (deprecate("toHaveErrorMessage", "Please use toHaveAccessibleErrorMessage."), checkHtmlElement(htmlElement, toHaveErrorMessage, this), !htmlElement.hasAttribute("aria-invalid") || htmlElement.getAttribute("aria-invalid") === "false") {
    let not = this.isNot ? ".not" : "";
    return {
      pass: !1,
      message: () => getMessage3(
        this,
        this.utils.matcherHint(`${not}.toHaveErrorMessage`, "element", ""),
        "Expected the element to have invalid state indicated by",
        'aria-invalid="true"',
        "Received",
        htmlElement.hasAttribute("aria-invalid") ? `aria-invalid="${htmlElement.getAttribute("aria-invalid")}"` : this.utils.printReceived("")
      )
    };
  }
  let expectsErrorMessage = checkWith !== void 0, errormessageIDs = (htmlElement.getAttribute("aria-errormessage") || "").split(/\s+/).filter(Boolean), errormessage = "";
  if (errormessageIDs.length > 0) {
    let document = htmlElement.ownerDocument, errormessageEls = errormessageIDs.map((errormessageID) => document.getElementById(errormessageID)).filter(Boolean);
    errormessage = normalize(
      errormessageEls.map((el) => el.textContent).join(" ")
    );
  }
  return {
    pass: expectsErrorMessage ? checkWith instanceof RegExp ? checkWith.test(errormessage) : this.equals(errormessage, checkWith) : !!errormessage,
    message: () => {
      let to = this.isNot ? "not to" : "to";
      return getMessage3(
        this,
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.toHaveErrorMessage`,
          "element",
          ""
        ),
        `Expected the element ${to} have error message`,
        this.utils.printExpected(checkWith),
        "Received",
        this.utils.printReceived(errormessage)
      );
    }
  };
}
function getSelection(element) {
  let selection = element.ownerDocument.getSelection();
  if (["input", "textarea"].includes(element.tagName.toLowerCase()))
    return ["radio", "checkbox"].includes(element.type) ? "" : element.value.toString().substring(element.selectionStart, element.selectionEnd);
  if (selection.anchorNode === null || selection.focusNode === null)
    return "";
  let originalRange = selection.getRangeAt(0), temporaryRange = element.ownerDocument.createRange();
  if (selection.containsNode(element, !1))
    temporaryRange.selectNodeContents(element), selection.removeAllRanges(), selection.addRange(temporaryRange);
  else if (!(element.contains(selection.anchorNode) && element.contains(selection.focusNode))) {
    let selectionStartsWithinElement = element === originalRange.startContainer || element.contains(originalRange.startContainer), selectionEndsWithinElement = element === originalRange.endContainer || element.contains(originalRange.endContainer);
    selection.removeAllRanges(), (selectionStartsWithinElement || selectionEndsWithinElement) && (temporaryRange.selectNodeContents(element), selectionStartsWithinElement && temporaryRange.setStart(
      originalRange.startContainer,
      originalRange.startOffset
    ), selectionEndsWithinElement && temporaryRange.setEnd(
      originalRange.endContainer,
      originalRange.endOffset
    ), selection.addRange(temporaryRange));
  }
  let result = selection.toString();
  return selection.removeAllRanges(), selection.addRange(originalRange), result;
}
function toHaveSelection(htmlElement, expectedSelection) {
  checkHtmlElement(htmlElement, toHaveSelection, this);
  let expectsSelection = expectedSelection !== void 0;
  if (expectsSelection && typeof expectedSelection != "string")
    throw new Error("expected selection must be a string or undefined");
  let receivedSelection = getSelection(htmlElement);
  return {
    pass: expectsSelection ? compareAsSet(receivedSelection, expectedSelection) : !!receivedSelection,
    message: () => {
      let to = this.isNot ? "not to" : "to", matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toHaveSelection`,
        "element",
        expectedSelection
      );
      return getMessage3(
        this,
        matcher,
        `Expected the element ${to} have selection`,
        expectsSelection ? expectedSelection : "(any)",
        "Received",
        receivedSelection
      );
    }
  };
}
function toBePressed(element) {
  checkHtmlElement(element, toBePressed, this);
  let roles2 = (element.getAttribute("role") || "").split(" ").map((role) => role.trim()), isButton = element.tagName.toLowerCase() === "button" || element.tagName.toLowerCase() === "input" && element.type === "button" || roles2.includes("button"), pressedAttribute = element.getAttribute("aria-pressed");
  return !isButton || !(pressedAttribute === "true" || pressedAttribute === "false") ? {
    pass: !1,
    message: () => 'Only button or input with type="button" or element with role="button" and a valid aria-pressed attribute can be used with .toBePressed()'
  } : {
    pass: isButton && pressedAttribute === "true",
    message: () => {
      let matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toBePressed`,
        "element",
        ""
      );
      return getMessage3(
        this,
        matcher,
        "Expected element to have",
        `aria-pressed="${this.isNot ? "false" : "true"}"`,
        "Received",
        `aria-pressed="${pressedAttribute}"`
      );
    }
  };
}
function toBePartiallyPressed(element) {
  checkHtmlElement(element, toBePartiallyPressed, this);
  let roles2 = (element.getAttribute("role") || "").split(" ").map((role) => role.trim()), isButton = element.tagName.toLowerCase() === "button" || element.tagName.toLowerCase() === "input" && element.type === "button" || roles2.includes("button"), pressedAttribute = element.getAttribute("aria-pressed");
  return !isButton || !(pressedAttribute === "true" || pressedAttribute === "false" || pressedAttribute === "mixed") ? {
    pass: !1,
    message: () => 'Only button or input with type="button" or element with role="button" and a valid aria-pressed attribute can be used with .toBePartiallyPressed()'
  } : {
    pass: isButton && pressedAttribute === "mixed",
    message: () => {
      let to = this.isNot ? "not to" : "to", matcher = this.utils.matcherHint(
        `${this.isNot ? ".not" : ""}.toBePartiallyPressed`,
        "element",
        ""
      );
      return getMessage3(
        this,
        matcher,
        `Expected element ${to} have`,
        'aria-pressed="mixed"',
        "Received",
        `aria-pressed="${pressedAttribute}"`
      );
    }
  };
}
var DOCUMENT_POSITION_DISCONNECTED = 1, DOCUMENT_POSITION_PRECEDING = 2, DOCUMENT_POSITION_FOLLOWING = 4, DOCUMENT_POSITION_CONTAINS = 8, DOCUMENT_POSITION_CONTAINED_BY = 16, DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32, DOCUMENT_POSITIONS_STRINGS = {
  [DOCUMENT_POSITION_DISCONNECTED]: "Node.DOCUMENT_POSITION_DISCONNECTED",
  [DOCUMENT_POSITION_PRECEDING]: "Node.DOCUMENT_POSITION_PRECEDING",
  [DOCUMENT_POSITION_FOLLOWING]: "Node.DOCUMENT_POSITION_FOLLOWING",
  [DOCUMENT_POSITION_CONTAINS]: "Node.DOCUMENT_POSITION_CONTAINS",
  [DOCUMENT_POSITION_CONTAINED_BY]: "Node.DOCUMENT_POSITION_CONTAINED_BY",
  [DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC]: "Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC"
};
function makeDocumentPositionErrorString(documentPosition) {
  return documentPosition in DOCUMENT_POSITIONS_STRINGS ? `${DOCUMENT_POSITIONS_STRINGS[documentPosition]} (${documentPosition})` : `Unknown document position (${documentPosition})`;
}
function checkToAppear(methodName, targetDocumentPosition) {
  return function(element, secondElement) {
    checkHtmlElement(element, toAppearBefore, this), checkHtmlElement(secondElement, toAppearBefore, this);
    let documentPosition = element.compareDocumentPosition(secondElement);
    return {
      pass: documentPosition === targetDocumentPosition,
      message: () => [
        this.utils.matcherHint(
          `${this.isNot ? ".not" : ""}.${methodName}`,
          "element",
          "secondElement"
        ),
        "",
        `Received: ${makeDocumentPositionErrorString(documentPosition)}`
      ].join(`
`)
    };
  };
}
function toAppearBefore(element, secondElement) {
  return checkToAppear("toAppearBefore", DOCUMENT_POSITION_FOLLOWING).apply(
    this,
    [element, secondElement]
  );
}
function toAppearAfter(element, secondElement) {
  return checkToAppear("toAppearAfter", DOCUMENT_POSITION_PRECEDING).apply(
    this,
    [element, secondElement]
  );
}
var extensions = Object.freeze({
  __proto__: null,
  toAppearAfter,
  toAppearBefore,
  toBeChecked,
  toBeDisabled,
  toBeEmpty,
  toBeEmptyDOMElement,
  toBeEnabled,
  toBeInTheDOM,
  toBeInTheDocument,
  toBeInvalid,
  toBePartiallyChecked,
  toBePartiallyPressed,
  toBePressed,
  toBeRequired,
  toBeValid,
  toBeVisible,
  toContainElement,
  toContainHTML,
  toHaveAccessibleDescription,
  toHaveAccessibleErrorMessage,
  toHaveAccessibleName,
  toHaveAttribute,
  toHaveClass,
  toHaveDescription,
  toHaveDisplayValue,
  toHaveErrorMessage,
  toHaveFocus,
  toHaveFormValues,
  toHaveRole,
  toHaveSelection,
  toHaveStyle,
  toHaveTextContent,
  toHaveValue
});

// ../../node_modules/@testing-library/jest-dom/dist/matchers.mjs
var import_redent2 = __toESM(require_redent(), 1);
var import_aria_query2 = __toESM(require_lib(), 1), import_picocolors2 = __toESM(require_picocolors_browser(), 1), import_css2 = __toESM(require_css_escape(), 1);

// ../../node_modules/@vitest/utils/dist/index.js
var jsTokens_1, hasRequiredJsTokens;
function requireJsTokens() {
  if (hasRequiredJsTokens) return jsTokens_1;
  hasRequiredJsTokens = 1;
  var Identifier, JSXIdentifier, JSXPunctuator, JSXString, JSXText, KeywordsWithExpressionAfter, KeywordsWithNoLineTerminatorAfter, LineTerminatorSequence, MultiLineComment, Newline, NumericLiteral, Punctuator, RegularExpressionLiteral, SingleLineComment, StringLiteral, Template, TokensNotPrecedingObjectLiteral, TokensPrecedingExpression, WhiteSpace;
  return RegularExpressionLiteral = /\/(?![*\/])(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\\]).|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/yu, Punctuator = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y, Identifier = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/yu, StringLiteral = /(['"])(?:(?!\1)[^\\\n\r]|\\(?:\r\n|[^]))*(\1)?/y, NumericLiteral = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y, Template = /[`}](?:[^`\\$]|\\[^]|\$(?!\{))*(`|\$\{)?/y, WhiteSpace = /[\t\v\f\ufeff\p{Zs}]+/yu, LineTerminatorSequence = /\r?\n|[\r\u2028\u2029]/y, MultiLineComment = /\/\*(?:[^*]|\*(?!\/))*(\*\/)?/y, SingleLineComment = /\/\/.*/y, JSXPunctuator = /[<>.:={}]|\/(?![\/*])/y, JSXIdentifier = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/yu, JSXString = /(['"])(?:(?!\1)[^])*(\1)?/y, JSXText = /[^<>{}]+/y, TokensPrecedingExpression = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/, TokensNotPrecedingObjectLiteral = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/, KeywordsWithExpressionAfter = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/, KeywordsWithNoLineTerminatorAfter = /^(?:return|throw|yield)$/, Newline = RegExp(LineTerminatorSequence.source), jsTokens_1 = function* (input2, { jsx = !1 } = {}) {
    var braces, firstCodePoint, isExpression, lastIndex, lastSignificantToken, length, match, mode, nextLastIndex, nextLastSignificantToken, parenNesting, postfixIncDec, punctuator, stack;
    for ({ length } = input2, lastIndex = 0, lastSignificantToken = "", stack = [
      { tag: "JS" }
    ], braces = [], parenNesting = 0, postfixIncDec = !1; lastIndex < length; ) {
      switch (mode = stack[stack.length - 1], mode.tag) {
        case "JS":
        case "JSNonExpressionParen":
        case "InterpolationInTemplate":
        case "InterpolationInJSX":
          if (input2[lastIndex] === "/" && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken)) && (RegularExpressionLiteral.lastIndex = lastIndex, match = RegularExpressionLiteral.exec(input2))) {
            lastIndex = RegularExpressionLiteral.lastIndex, lastSignificantToken = match[0], postfixIncDec = !0, yield {
              type: "RegularExpressionLiteral",
              value: match[0],
              closed: match[1] !== void 0 && match[1] !== "\\"
            };
            continue;
          }
          if (Punctuator.lastIndex = lastIndex, match = Punctuator.exec(input2)) {
            switch (punctuator = match[0], nextLastIndex = Punctuator.lastIndex, nextLastSignificantToken = punctuator, punctuator) {
              case "(":
                lastSignificantToken === "?NonExpressionParenKeyword" && stack.push({
                  tag: "JSNonExpressionParen",
                  nesting: parenNesting
                }), parenNesting++, postfixIncDec = !1;
                break;
              case ")":
                parenNesting--, postfixIncDec = !0, mode.tag === "JSNonExpressionParen" && parenNesting === mode.nesting && (stack.pop(), nextLastSignificantToken = "?NonExpressionParenEnd", postfixIncDec = !1);
                break;
              case "{":
                Punctuator.lastIndex = 0, isExpression = !TokensNotPrecedingObjectLiteral.test(lastSignificantToken) && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken)), braces.push(isExpression), postfixIncDec = !1;
                break;
              case "}":
                switch (mode.tag) {
                  case "InterpolationInTemplate":
                    if (braces.length === mode.nesting) {
                      Template.lastIndex = lastIndex, match = Template.exec(input2), lastIndex = Template.lastIndex, lastSignificantToken = match[0], match[1] === "${" ? (lastSignificantToken = "?InterpolationInTemplate", postfixIncDec = !1, yield {
                        type: "TemplateMiddle",
                        value: match[0]
                      }) : (stack.pop(), postfixIncDec = !0, yield {
                        type: "TemplateTail",
                        value: match[0],
                        closed: match[1] === "`"
                      });
                      continue;
                    }
                    break;
                  case "InterpolationInJSX":
                    if (braces.length === mode.nesting) {
                      stack.pop(), lastIndex += 1, lastSignificantToken = "}", yield {
                        type: "JSXPunctuator",
                        value: "}"
                      };
                      continue;
                    }
                }
                postfixIncDec = braces.pop(), nextLastSignificantToken = postfixIncDec ? "?ExpressionBraceEnd" : "}";
                break;
              case "]":
                postfixIncDec = !0;
                break;
              case "++":
              case "--":
                nextLastSignificantToken = postfixIncDec ? "?PostfixIncDec" : "?UnaryIncDec";
                break;
              case "<":
                if (jsx && (TokensPrecedingExpression.test(lastSignificantToken) || KeywordsWithExpressionAfter.test(lastSignificantToken))) {
                  stack.push({ tag: "JSXTag" }), lastIndex += 1, lastSignificantToken = "<", yield {
                    type: "JSXPunctuator",
                    value: punctuator
                  };
                  continue;
                }
                postfixIncDec = !1;
                break;
              default:
                postfixIncDec = !1;
            }
            lastIndex = nextLastIndex, lastSignificantToken = nextLastSignificantToken, yield {
              type: "Punctuator",
              value: punctuator
            };
            continue;
          }
          if (Identifier.lastIndex = lastIndex, match = Identifier.exec(input2)) {
            switch (lastIndex = Identifier.lastIndex, nextLastSignificantToken = match[0], match[0]) {
              case "for":
              case "if":
              case "while":
              case "with":
                lastSignificantToken !== "." && lastSignificantToken !== "?." && (nextLastSignificantToken = "?NonExpressionParenKeyword");
            }
            lastSignificantToken = nextLastSignificantToken, postfixIncDec = !KeywordsWithExpressionAfter.test(match[0]), yield {
              type: match[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
              value: match[0]
            };
            continue;
          }
          if (StringLiteral.lastIndex = lastIndex, match = StringLiteral.exec(input2)) {
            lastIndex = StringLiteral.lastIndex, lastSignificantToken = match[0], postfixIncDec = !0, yield {
              type: "StringLiteral",
              value: match[0],
              closed: match[2] !== void 0
            };
            continue;
          }
          if (NumericLiteral.lastIndex = lastIndex, match = NumericLiteral.exec(input2)) {
            lastIndex = NumericLiteral.lastIndex, lastSignificantToken = match[0], postfixIncDec = !0, yield {
              type: "NumericLiteral",
              value: match[0]
            };
            continue;
          }
          if (Template.lastIndex = lastIndex, match = Template.exec(input2)) {
            lastIndex = Template.lastIndex, lastSignificantToken = match[0], match[1] === "${" ? (lastSignificantToken = "?InterpolationInTemplate", stack.push({
              tag: "InterpolationInTemplate",
              nesting: braces.length
            }), postfixIncDec = !1, yield {
              type: "TemplateHead",
              value: match[0]
            }) : (postfixIncDec = !0, yield {
              type: "NoSubstitutionTemplate",
              value: match[0],
              closed: match[1] === "`"
            });
            continue;
          }
          break;
        case "JSXTag":
        case "JSXTagEnd":
          if (JSXPunctuator.lastIndex = lastIndex, match = JSXPunctuator.exec(input2)) {
            switch (lastIndex = JSXPunctuator.lastIndex, nextLastSignificantToken = match[0], match[0]) {
              case "<":
                stack.push({ tag: "JSXTag" });
                break;
              case ">":
                stack.pop(), lastSignificantToken === "/" || mode.tag === "JSXTagEnd" ? (nextLastSignificantToken = "?JSX", postfixIncDec = !0) : stack.push({ tag: "JSXChildren" });
                break;
              case "{":
                stack.push({
                  tag: "InterpolationInJSX",
                  nesting: braces.length
                }), nextLastSignificantToken = "?InterpolationInJSX", postfixIncDec = !1;
                break;
              case "/":
                lastSignificantToken === "<" && (stack.pop(), stack[stack.length - 1].tag === "JSXChildren" && stack.pop(), stack.push({ tag: "JSXTagEnd" }));
            }
            lastSignificantToken = nextLastSignificantToken, yield {
              type: "JSXPunctuator",
              value: match[0]
            };
            continue;
          }
          if (JSXIdentifier.lastIndex = lastIndex, match = JSXIdentifier.exec(input2)) {
            lastIndex = JSXIdentifier.lastIndex, lastSignificantToken = match[0], yield {
              type: "JSXIdentifier",
              value: match[0]
            };
            continue;
          }
          if (JSXString.lastIndex = lastIndex, match = JSXString.exec(input2)) {
            lastIndex = JSXString.lastIndex, lastSignificantToken = match[0], yield {
              type: "JSXString",
              value: match[0],
              closed: match[2] !== void 0
            };
            continue;
          }
          break;
        case "JSXChildren":
          if (JSXText.lastIndex = lastIndex, match = JSXText.exec(input2)) {
            lastIndex = JSXText.lastIndex, lastSignificantToken = match[0], yield {
              type: "JSXText",
              value: match[0]
            };
            continue;
          }
          switch (input2[lastIndex]) {
            case "<":
              stack.push({ tag: "JSXTag" }), lastIndex++, lastSignificantToken = "<", yield {
                type: "JSXPunctuator",
                value: "<"
              };
              continue;
            case "{":
              stack.push({
                tag: "InterpolationInJSX",
                nesting: braces.length
              }), lastIndex++, lastSignificantToken = "?InterpolationInJSX", postfixIncDec = !1, yield {
                type: "JSXPunctuator",
                value: "{"
              };
              continue;
          }
      }
      if (WhiteSpace.lastIndex = lastIndex, match = WhiteSpace.exec(input2)) {
        lastIndex = WhiteSpace.lastIndex, yield {
          type: "WhiteSpace",
          value: match[0]
        };
        continue;
      }
      if (LineTerminatorSequence.lastIndex = lastIndex, match = LineTerminatorSequence.exec(input2)) {
        lastIndex = LineTerminatorSequence.lastIndex, postfixIncDec = !1, KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken) && (lastSignificantToken = "?NoLineTerminatorHere"), yield {
          type: "LineTerminatorSequence",
          value: match[0]
        };
        continue;
      }
      if (MultiLineComment.lastIndex = lastIndex, match = MultiLineComment.exec(input2)) {
        lastIndex = MultiLineComment.lastIndex, Newline.test(match[0]) && (postfixIncDec = !1, KeywordsWithNoLineTerminatorAfter.test(lastSignificantToken) && (lastSignificantToken = "?NoLineTerminatorHere")), yield {
          type: "MultiLineComment",
          value: match[0],
          closed: match[1] !== void 0
        };
        continue;
      }
      if (SingleLineComment.lastIndex = lastIndex, match = SingleLineComment.exec(input2)) {
        lastIndex = SingleLineComment.lastIndex, postfixIncDec = !1, yield {
          type: "SingleLineComment",
          value: match[0]
        };
        continue;
      }
      firstCodePoint = String.fromCodePoint(input2.codePointAt(lastIndex)), lastIndex += firstCodePoint.length, lastSignificantToken = firstCodePoint, postfixIncDec = !1, yield {
        type: mode.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
        value: firstCodePoint
      };
    }
  }, jsTokens_1;
}
var jsTokensExports = requireJsTokens(), jsTokens = getDefaultExportFromCjs(jsTokensExports), reservedWords = {
  keyword: [
    "break",
    "case",
    "catch",
    "continue",
    "debugger",
    "default",
    "do",
    "else",
    "finally",
    "for",
    "function",
    "if",
    "return",
    "switch",
    "throw",
    "try",
    "var",
    "const",
    "while",
    "with",
    "new",
    "this",
    "super",
    "class",
    "extends",
    "export",
    "import",
    "null",
    "true",
    "false",
    "in",
    "instanceof",
    "typeof",
    "void",
    "delete"
  ],
  strict: [
    "implements",
    "interface",
    "let",
    "package",
    "private",
    "protected",
    "public",
    "static",
    "yield"
  ]
}, keywords = new Set(reservedWords.keyword), reservedWordsStrictSet = new Set(reservedWords.strict);

// ../../node_modules/@vitest/expect/node_modules/tinyrainbow/dist/chunk-BVHSVHOK.js
var f = {
  reset: [0, 0],
  bold: [1, 22, "\x1B[22m\x1B[1m"],
  dim: [2, 22, "\x1B[22m\x1B[2m"],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  blackBright: [90, 39],
  redBright: [91, 39],
  greenBright: [92, 39],
  yellowBright: [93, 39],
  blueBright: [94, 39],
  magentaBright: [95, 39],
  cyanBright: [96, 39],
  whiteBright: [97, 39],
  bgBlackBright: [100, 49],
  bgRedBright: [101, 49],
  bgGreenBright: [102, 49],
  bgYellowBright: [103, 49],
  bgBlueBright: [104, 49],
  bgMagentaBright: [105, 49],
  bgCyanBright: [106, 49],
  bgWhiteBright: [107, 49]
}, h = Object.entries(f);
function a(n) {
  return String(n);
}
a.open = "";
a.close = "";
var B = h.reduce(
  (n, [e]) => (n[e] = a, n),
  { isColorSupported: !1 }
);
function C(n = !1) {
  let e = typeof process < "u" ? process : void 0, i = e?.env || {}, g2 = e?.argv || [];
  return !("NO_COLOR" in i || g2.includes("--no-color")) && ("FORCE_COLOR" in i || g2.includes("--color") || e?.platform === "win32" || n && i.TERM !== "dumb" || "CI" in i) || typeof window < "u" && !!window.chrome;
}
function p(n = !1) {
  let e = C(n), i = (r, t, c, o) => {
    let l = "", s3 = 0;
    do
      l += r.substring(s3, o) + c, s3 = o + t.length, o = r.indexOf(t, s3);
    while (~o);
    return l + r.substring(s3);
  }, g2 = (r, t, c = r) => {
    let o = (l) => {
      let s3 = String(l), b = s3.indexOf(t, r.length);
      return ~b ? r + i(s3, t, c, b) + t : r + s3 + t;
    };
    return o.open = r, o.close = t, o;
  }, u2 = {
    isColorSupported: e
  }, d = (r) => `\x1B[${r}m`;
  for (let [r, t] of h)
    u2[r] = e ? g2(
      d(t[0]),
      d(t[1]),
      t[2]
    ) : a;
  return u2;
}

// ../../node_modules/@vitest/expect/node_modules/tinyrainbow/dist/browser.js
var s2 = p();

// ../../node_modules/@vitest/spy/node_modules/tinyspy/dist/index.js
function assert2(condition, message) {
  if (!condition)
    throw new Error(message);
}
function isType(type5, value) {
  return typeof value === type5;
}
function isPromise(value) {
  return value instanceof Promise;
}
function define2(obj, key, descriptor) {
  Object.defineProperty(obj, key, descriptor);
}
function defineValue(obj, key, value) {
  define2(obj, key, { value, configurable: !0, writable: !0 });
}
var SYMBOL_STATE = /* @__PURE__ */ Symbol.for("tinyspy:spy"), spies = /* @__PURE__ */ new Set(), reset = (state) => {
  state.called = !1, state.callCount = 0, state.calls = [], state.results = [], state.resolves = [], state.next = [];
}, defineState = (spy2) => (define2(spy2, SYMBOL_STATE, {
  value: { reset: () => reset(spy2[SYMBOL_STATE]) }
}), spy2[SYMBOL_STATE]), getInternalState = (spy2) => spy2[SYMBOL_STATE] || defineState(spy2);
function createInternalSpy(cb) {
  assert2(
    isType("function", cb) || isType("undefined", cb),
    "cannot spy on a non-function value"
  );
  let fn3 = function(...args) {
    let state2 = getInternalState(fn3);
    state2.called = !0, state2.callCount++, state2.calls.push(args);
    let next = state2.next.shift();
    if (next) {
      state2.results.push(next);
      let [type22, result2] = next;
      if (type22 === "ok")
        return result2;
      throw result2;
    }
    let result, type5 = "ok", resultIndex = state2.results.length;
    if (state2.impl)
      try {
        new.target ? result = Reflect.construct(state2.impl, args, new.target) : result = state2.impl.apply(this, args), type5 = "ok";
      } catch (err) {
        throw result = err, type5 = "error", state2.results.push([type5, err]), err;
      }
    let resultTuple = [type5, result];
    return isPromise(result) && result.then(
      (r) => state2.resolves[resultIndex] = ["ok", r],
      (e) => state2.resolves[resultIndex] = ["error", e]
    ), state2.results.push(resultTuple), result;
  };
  defineValue(fn3, "_isMockFunction", !0), defineValue(fn3, "length", cb ? cb.length : 0), defineValue(fn3, "name", cb && cb.name || "spy");
  let state = getInternalState(fn3);
  return state.reset(), state.impl = cb, fn3;
}
function isMockFunction(obj) {
  return !!obj && obj._isMockFunction === !0;
}
var getDescriptor = (obj, method) => {
  let objDescriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (objDescriptor)
    return [obj, objDescriptor];
  let currentProto = Object.getPrototypeOf(obj);
  for (; currentProto !== null; ) {
    let descriptor = Object.getOwnPropertyDescriptor(currentProto, method);
    if (descriptor)
      return [currentProto, descriptor];
    currentProto = Object.getPrototypeOf(currentProto);
  }
}, setPototype = (fn3, val) => {
  val != null && typeof val == "function" && val.prototype != null && Object.setPrototypeOf(fn3.prototype, val.prototype);
};
function internalSpyOn(obj, methodName, mock) {
  assert2(
    !isType("undefined", obj),
    "spyOn could not find an object to spy upon"
  ), assert2(
    isType("object", obj) || isType("function", obj),
    "cannot spyOn on a primitive value"
  );
  let [accessName, accessType] = (() => {
    if (!isType("object", methodName))
      return [methodName, "value"];
    if ("getter" in methodName && "setter" in methodName)
      throw new Error("cannot spy on both getter and setter");
    if ("getter" in methodName)
      return [methodName.getter, "get"];
    if ("setter" in methodName)
      return [methodName.setter, "set"];
    throw new Error("specify getter or setter to spy on");
  })(), [originalDescriptorObject, originalDescriptor] = getDescriptor(obj, accessName) || [];
  assert2(
    originalDescriptor || accessName in obj,
    `${String(accessName)} does not exist`
  );
  let ssr = !1;
  accessType === "value" && originalDescriptor && !originalDescriptor.value && originalDescriptor.get && (accessType = "get", ssr = !0, mock = originalDescriptor.get());
  let original;
  originalDescriptor ? original = originalDescriptor[accessType] : accessType !== "value" ? original = () => obj[accessName] : original = obj[accessName], original && isSpyFunction(original) && (original = original[SYMBOL_STATE].getOriginal());
  let reassign = (cb) => {
    let { value, ...desc } = originalDescriptor || {
      configurable: !0,
      writable: !0
    };
    accessType !== "value" && delete desc.writable, desc[accessType] = cb, define2(obj, accessName, desc);
  }, restore = () => {
    originalDescriptorObject !== obj ? Reflect.deleteProperty(obj, accessName) : originalDescriptor && !original ? define2(obj, accessName, originalDescriptor) : reassign(original);
  };
  mock || (mock = original);
  let spy2 = wrap(createInternalSpy(mock), mock);
  accessType === "value" && setPototype(spy2, original);
  let state = spy2[SYMBOL_STATE];
  return defineValue(state, "restore", restore), defineValue(state, "getOriginal", () => ssr ? original() : original), defineValue(state, "willCall", (newCb) => (state.impl = newCb, spy2)), reassign(
    ssr ? () => (setPototype(spy2, mock), spy2) : spy2
  ), spies.add(spy2), spy2;
}
var ignoreProperties = /* @__PURE__ */ new Set([
  "length",
  "name",
  "prototype"
]);
function getAllProperties(original) {
  let properties = /* @__PURE__ */ new Set(), descriptors2 = {};
  for (; original && original !== Object.prototype && original !== Function.prototype; ) {
    let ownProperties = [
      ...Object.getOwnPropertyNames(original),
      ...Object.getOwnPropertySymbols(original)
    ];
    for (let prop of ownProperties)
      descriptors2[prop] || ignoreProperties.has(prop) || (properties.add(prop), descriptors2[prop] = Object.getOwnPropertyDescriptor(original, prop));
    original = Object.getPrototypeOf(original);
  }
  return {
    properties,
    descriptors: descriptors2
  };
}
function wrap(mock, original) {
  if (!original || // the original is already a spy, so it has all the properties
  SYMBOL_STATE in original)
    return mock;
  let { properties, descriptors: descriptors2 } = getAllProperties(original);
  for (let key of properties) {
    let descriptor = descriptors2[key];
    getDescriptor(mock, key) || define2(mock, key, descriptor);
  }
  return mock;
}
function isSpyFunction(obj) {
  return isMockFunction(obj) && "getOriginal" in obj[SYMBOL_STATE];
}

// ../../node_modules/@vitest/spy/dist/index.js
var mocks = /* @__PURE__ */ new Set();
function isMockFunction2(fn3) {
  return typeof fn3 == "function" && "_isMockFunction" in fn3 && fn3._isMockFunction;
}
function spyOn(obj, method, accessType) {
  let objMethod = accessType ? { [{
    get: "getter",
    set: "setter"
  }[accessType]]: method } : method, state, descriptor = getDescriptor2(obj, method), fn3 = descriptor && descriptor[accessType || "value"];
  isMockFunction2(fn3) && (state = fn3.mock._state());
  try {
    let stub = internalSpyOn(obj, objMethod), spy = enhanceSpy(stub);
    return state && spy.mock._state(state), spy;
  } catch (error) {
    throw error instanceof TypeError && Symbol.toStringTag && obj[Symbol.toStringTag] === "Module" && (error.message.includes("Cannot redefine property") || error.message.includes("Cannot replace module namespace") || error.message.includes("can't redefine non-configurable property")) ? new TypeError(`Cannot spy on export "${String(objMethod)}". Module namespace is not configurable in ESM. See: https://vitest.dev/guide/browser/#limitations`, { cause: error }) : error;
  }
}
var callOrder = 0;
function enhanceSpy(spy) {
  let stub = spy, implementation, onceImplementations = [], implementationChangedTemporarily = !1, instances = [], contexts = [], invocations = [], state = getInternalState(spy), mockContext = {
    get calls() {
      return state.calls;
    },
    get contexts() {
      return contexts;
    },
    get instances() {
      return instances;
    },
    get invocationCallOrder() {
      return invocations;
    },
    get results() {
      return state.results.map(([callType, value]) => ({
        type: callType === "error" ? "throw" : "return",
        value
      }));
    },
    get settledResults() {
      return state.resolves.map(([callType, value]) => ({
        type: callType === "error" ? "rejected" : "fulfilled",
        value
      }));
    },
    get lastCall() {
      return state.calls[state.calls.length - 1];
    },
    _state(state2) {
      return state2 && (implementation = state2.implementation, onceImplementations = state2.onceImplementations, implementationChangedTemporarily = state2.implementationChangedTemporarily), {
        implementation,
        onceImplementations,
        implementationChangedTemporarily
      };
    }
  };
  function mockCall(...args) {
    return instances.push(this), contexts.push(this), invocations.push(++callOrder), (implementationChangedTemporarily ? implementation : onceImplementations.shift() || implementation || state.getOriginal() || (() => {
    })).apply(this, args);
  }
  let name = stub.name;
  stub.getMockName = () => name || "vi.fn()", stub.mockName = (n) => (name = n, stub), stub.mockClear = () => (state.reset(), instances = [], contexts = [], invocations = [], stub), stub.mockReset = () => (stub.mockClear(), implementation = void 0, onceImplementations = [], stub), stub.mockRestore = () => (stub.mockReset(), state.restore(), stub), Symbol.dispose && (stub[Symbol.dispose] = () => stub.mockRestore()), stub.getMockImplementation = () => implementationChangedTemporarily ? implementation : onceImplementations.at(0) || implementation, stub.mockImplementation = (fn3) => (implementation = fn3, state.willCall(mockCall), stub), stub.mockImplementationOnce = (fn3) => (onceImplementations.push(fn3), stub);
  function withImplementation(fn3, cb) {
    let originalImplementation = implementation;
    implementation = fn3, state.willCall(mockCall), implementationChangedTemporarily = !0;
    let reset2 = () => {
      implementation = originalImplementation, implementationChangedTemporarily = !1;
    }, result = cb();
    return typeof result == "object" && result && typeof result.then == "function" ? result.then(() => (reset2(), stub)) : (reset2(), stub);
  }
  return stub.withImplementation = withImplementation, stub.mockReturnThis = () => stub.mockImplementation(function() {
    return this;
  }), stub.mockReturnValue = (val) => stub.mockImplementation(() => val), stub.mockReturnValueOnce = (val) => stub.mockImplementationOnce(() => val), stub.mockResolvedValue = (val) => stub.mockImplementation(() => Promise.resolve(val)), stub.mockResolvedValueOnce = (val) => stub.mockImplementationOnce(() => Promise.resolve(val)), stub.mockRejectedValue = (val) => stub.mockImplementation(() => Promise.reject(val)), stub.mockRejectedValueOnce = (val) => stub.mockImplementationOnce(() => Promise.reject(val)), Object.defineProperty(stub, "mock", { get: () => mockContext }), state.willCall(mockCall), mocks.add(stub), stub;
}
function fn(implementation) {
  let enhancedSpy = enhanceSpy(internalSpyOn({ spy: implementation || function() {
  } }, "spy"));
  return implementation && enhancedSpy.mockImplementation(implementation), enhancedSpy;
}
function getDescriptor2(obj, method) {
  let objDescriptor = Object.getOwnPropertyDescriptor(obj, method);
  if (objDescriptor)
    return objDescriptor;
  let currentProto = Object.getPrototypeOf(obj);
  for (; currentProto !== null; ) {
    let descriptor = Object.getOwnPropertyDescriptor(currentProto, method);
    if (descriptor)
      return descriptor;
    currentProto = Object.getPrototypeOf(currentProto);
  }
}

// ../../node_modules/@vitest/expect/dist/index.js
var MATCHERS_OBJECT = /* @__PURE__ */ Symbol.for("matchers-object"), JEST_MATCHERS_OBJECT = /* @__PURE__ */ Symbol.for("$$jest-matchers-object-storybook"), GLOBAL_EXPECT = /* @__PURE__ */ Symbol.for("expect-global"), ASYMMETRIC_MATCHERS_OBJECT = /* @__PURE__ */ Symbol.for("asymmetric-matchers-object"), customMatchers = {
  toSatisfy(actual, expected, message) {
    let { printReceived: printReceived2, printExpected: printExpected2, matcherHint: matcherHint2 } = this.utils, pass = expected(actual);
    return {
      pass,
      message: () => pass ? `${matcherHint2(".not.toSatisfy", "received", "")}

Expected value to not satisfy:
${message || printExpected2(expected)}
Received:
${printReceived2(actual)}` : `${matcherHint2(".toSatisfy", "received", "")}

Expected value to satisfy:
${message || printExpected2(expected)}

Received:
${printReceived2(actual)}`
    };
  },
  toBeOneOf(actual, expected) {
    let { equals: equals2, customTesters } = this, { printReceived: printReceived2, printExpected: printExpected2, matcherHint: matcherHint2 } = this.utils;
    if (!Array.isArray(expected))
      throw new TypeError(`You must provide an array to ${matcherHint2(".toBeOneOf")}, not '${typeof expected}'.`);
    let pass = expected.length === 0 || expected.some((item) => equals2(item, actual, customTesters));
    return {
      pass,
      message: () => pass ? `${matcherHint2(".not.toBeOneOf", "received", "")}

Expected value to not be one of:
${printExpected2(expected)}
Received:
${printReceived2(actual)}` : `${matcherHint2(".toBeOneOf", "received", "")}

Expected value to be one of:
${printExpected2(expected)}

Received:
${printReceived2(actual)}`
    };
  }
}, EXPECTED_COLOR = s2.green, RECEIVED_COLOR = s2.red, INVERTED_COLOR = s2.inverse, BOLD_WEIGHT = s2.bold, DIM_COLOR = s2.dim;
function matcherHint(matcherName, received = "received", expected = "expected", options = {}) {
  let { comment = "", isDirectExpectCall = !1, isNot = !1, promise = "", secondArgument = "", expectedColor = EXPECTED_COLOR, receivedColor = RECEIVED_COLOR, secondArgumentColor = EXPECTED_COLOR } = options, hint = "", dimString = "expect";
  return !isDirectExpectCall && received !== "" && (hint += DIM_COLOR(`${dimString}(`) + receivedColor(received), dimString = ")"), promise !== "" && (hint += DIM_COLOR(`${dimString}.`) + promise, dimString = ""), isNot && (hint += `${DIM_COLOR(`${dimString}.`)}not`, dimString = ""), matcherName.includes(".") ? dimString += matcherName : (hint += DIM_COLOR(`${dimString}.`) + matcherName, dimString = ""), expected === "" ? dimString += "()" : (hint += DIM_COLOR(`${dimString}(`) + expectedColor(expected), secondArgument && (hint += DIM_COLOR(", ") + secondArgumentColor(secondArgument)), dimString = ")"), comment !== "" && (dimString += ` // ${comment}`), dimString !== "" && (hint += DIM_COLOR(dimString)), hint;
}
var SPACE_SYMBOL = "\xB7";
function replaceTrailingSpaces(text) {
  return text.replace(/\s+$/gm, (spaces) => SPACE_SYMBOL.repeat(spaces.length));
}
function printReceived(object) {
  return RECEIVED_COLOR(replaceTrailingSpaces(stringify(object)));
}
function printExpected(value) {
  return EXPECTED_COLOR(replaceTrailingSpaces(stringify(value)));
}
function getMatcherUtils() {
  return {
    EXPECTED_COLOR,
    RECEIVED_COLOR,
    INVERTED_COLOR,
    BOLD_WEIGHT,
    DIM_COLOR,
    diff,
    matcherHint,
    printReceived,
    printExpected,
    printDiffOrStringify,
    printWithType
  };
}
function printWithType(name, value, print) {
  let type5 = getType(value), hasType = type5 !== "null" && type5 !== "undefined" ? `${name} has type:  ${type5}
` : "", hasValue = `${name} has value: ${print(value)}`;
  return hasType + hasValue;
}
function getCustomEqualityTesters() {
  return globalThis[JEST_MATCHERS_OBJECT].customEqualityTesters;
}
function equals(a2, b, customTesters, strictCheck) {
  return customTesters = customTesters || [], eq(a2, b, [], [], customTesters, strictCheck ? hasKey : hasDefinedKey);
}
var functionToString = Function.prototype.toString;
function isAsymmetric(obj) {
  return !!obj && typeof obj == "object" && "asymmetricMatch" in obj && isA("Function", obj.asymmetricMatch);
}
function asymmetricMatch(a2, b) {
  let asymmetricA = isAsymmetric(a2), asymmetricB = isAsymmetric(b);
  if (!(asymmetricA && asymmetricB)) {
    if (asymmetricA)
      return a2.asymmetricMatch(b);
    if (asymmetricB)
      return b.asymmetricMatch(a2);
  }
}
function eq(a2, b, aStack, bStack, customTesters, hasKey2) {
  let result = !0, asymmetricResult = asymmetricMatch(a2, b);
  if (asymmetricResult !== void 0)
    return asymmetricResult;
  let testerContext = { equals };
  for (let i = 0; i < customTesters.length; i++) {
    let customTesterResult = customTesters[i].call(testerContext, a2, b, customTesters);
    if (customTesterResult !== void 0)
      return customTesterResult;
  }
  if (typeof URL == "function" && a2 instanceof URL && b instanceof URL)
    return a2.href === b.href;
  if (Object.is(a2, b))
    return !0;
  if (a2 === null || b === null)
    return a2 === b;
  let className = Object.prototype.toString.call(a2);
  if (className !== Object.prototype.toString.call(b))
    return !1;
  switch (className) {
    case "[object Boolean]":
    case "[object String]":
    case "[object Number]":
      return typeof a2 != typeof b ? !1 : typeof a2 != "object" && typeof b != "object" ? Object.is(a2, b) : Object.is(a2.valueOf(), b.valueOf());
    case "[object Date]": {
      let numA = +a2, numB = +b;
      return numA === numB || Number.isNaN(numA) && Number.isNaN(numB);
    }
    case "[object RegExp]":
      return a2.source === b.source && a2.flags === b.flags;
    case "[object Temporal.Instant]":
    case "[object Temporal.ZonedDateTime]":
    case "[object Temporal.PlainDateTime]":
    case "[object Temporal.PlainDate]":
    case "[object Temporal.PlainTime]":
    case "[object Temporal.PlainYearMonth]":
    case "[object Temporal.PlainMonthDay]":
      return a2.equals(b);
    case "[object Temporal.Duration]":
      return a2.toString() === b.toString();
  }
  if (typeof a2 != "object" || typeof b != "object")
    return !1;
  if (isDomNode(a2) && isDomNode(b))
    return a2.isEqualNode(b);
  let length = aStack.length;
  for (; length--; ) {
    if (aStack[length] === a2)
      return bStack[length] === b;
    if (bStack[length] === b)
      return !1;
  }
  if (aStack.push(a2), bStack.push(b), className === "[object Array]" && a2.length !== b.length)
    return !1;
  if (a2 instanceof Error && b instanceof Error)
    try {
      return isErrorEqual(a2, b, aStack, bStack, customTesters, hasKey2);
    } finally {
      aStack.pop(), bStack.pop();
    }
  let aKeys = keys(a2, hasKey2), key, size = aKeys.length;
  if (keys(b, hasKey2).length !== size)
    return !1;
  for (; size--; )
    if (key = aKeys[size], result = hasKey2(b, key) && eq(a2[key], b[key], aStack, bStack, customTesters, hasKey2), !result)
      return !1;
  return aStack.pop(), bStack.pop(), result;
}
function isErrorEqual(a2, b, aStack, bStack, customTesters, hasKey2) {
  let result = Object.getPrototypeOf(a2) === Object.getPrototypeOf(b) && a2.name === b.name && a2.message === b.message;
  return typeof b.cause < "u" && result && (result = eq(a2.cause, b.cause, aStack, bStack, customTesters, hasKey2)), a2 instanceof AggregateError && b instanceof AggregateError && result && (result = eq(a2.errors, b.errors, aStack, bStack, customTesters, hasKey2)), result && (result = eq({ ...a2 }, { ...b }, aStack, bStack, customTesters, hasKey2)), result;
}
function keys(obj, hasKey2) {
  let keys2 = [];
  for (let key in obj)
    hasKey2(obj, key) && keys2.push(key);
  return keys2.concat(Object.getOwnPropertySymbols(obj).filter((symbol) => Object.getOwnPropertyDescriptor(obj, symbol).enumerable));
}
function hasDefinedKey(obj, key) {
  return hasKey(obj, key) && obj[key] !== void 0;
}
function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isA(typeName, value) {
  return Object.prototype.toString.apply(value) === `[object ${typeName}]`;
}
function isDomNode(obj) {
  return obj !== null && typeof obj == "object" && "nodeType" in obj && typeof obj.nodeType == "number" && "nodeName" in obj && typeof obj.nodeName == "string" && "isEqualNode" in obj && typeof obj.isEqualNode == "function";
}
var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@", IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@", IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@", IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@", IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
function isImmutableUnorderedKeyed(maybeKeyed) {
  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL] && !maybeKeyed[IS_ORDERED_SENTINEL]);
}
function isImmutableUnorderedSet(maybeSet) {
  return !!(maybeSet && maybeSet[IS_SET_SENTINEL] && !maybeSet[IS_ORDERED_SENTINEL]);
}
function isObjectLiteral(source) {
  return source != null && typeof source == "object" && !Array.isArray(source);
}
function isImmutableList(source) {
  return !!(source && isObjectLiteral(source) && source[IS_LIST_SENTINEL]);
}
function isImmutableOrderedKeyed(source) {
  return !!(source && isObjectLiteral(source) && source[IS_KEYED_SENTINEL] && source[IS_ORDERED_SENTINEL]);
}
function isImmutableOrderedSet(source) {
  return !!(source && isObjectLiteral(source) && source[IS_SET_SENTINEL] && source[IS_ORDERED_SENTINEL]);
}
function isImmutableRecord(source) {
  return !!(source && isObjectLiteral(source) && source[IS_RECORD_SYMBOL]);
}
var IteratorSymbol = Symbol.iterator;
function hasIterator(object) {
  return !!(object != null && object[IteratorSymbol]);
}
function iterableEquality(a2, b, customTesters = [], aStack = [], bStack = []) {
  if (typeof a2 != "object" || typeof b != "object" || Array.isArray(a2) || Array.isArray(b) || !hasIterator(a2) || !hasIterator(b))
    return;
  if (a2.constructor !== b.constructor)
    return !1;
  let length = aStack.length;
  for (; length--; )
    if (aStack[length] === a2)
      return bStack[length] === b;
  aStack.push(a2), bStack.push(b);
  let filteredCustomTesters = [...customTesters.filter((t) => t !== iterableEquality), iterableEqualityWithStack];
  function iterableEqualityWithStack(a3, b2) {
    return iterableEquality(a3, b2, [...customTesters], [...aStack], [...bStack]);
  }
  if (a2.size !== void 0) {
    if (a2.size !== b.size)
      return !1;
    if (isA("Set", a2) || isImmutableUnorderedSet(a2)) {
      let allFound = !0;
      for (let aValue of a2)
        if (!b.has(aValue)) {
          let has = !1;
          for (let bValue of b)
            equals(aValue, bValue, filteredCustomTesters) === !0 && (has = !0);
          if (has === !1) {
            allFound = !1;
            break;
          }
        }
      return aStack.pop(), bStack.pop(), allFound;
    } else if (isA("Map", a2) || isImmutableUnorderedKeyed(a2)) {
      let allFound = !0;
      for (let aEntry of a2)
        if (!b.has(aEntry[0]) || !equals(aEntry[1], b.get(aEntry[0]), filteredCustomTesters)) {
          let has = !1;
          for (let bEntry of b) {
            let matchedKey = equals(aEntry[0], bEntry[0], filteredCustomTesters), matchedValue = !1;
            matchedKey === !0 && (matchedValue = equals(aEntry[1], bEntry[1], filteredCustomTesters)), matchedValue === !0 && (has = !0);
          }
          if (has === !1) {
            allFound = !1;
            break;
          }
        }
      return aStack.pop(), bStack.pop(), allFound;
    }
  }
  let bIterator = b[IteratorSymbol]();
  for (let aValue of a2) {
    let nextB = bIterator.next();
    if (nextB.done || !equals(aValue, nextB.value, filteredCustomTesters))
      return !1;
  }
  if (!bIterator.next().done)
    return !1;
  if (!isImmutableList(a2) && !isImmutableOrderedKeyed(a2) && !isImmutableOrderedSet(a2) && !isImmutableRecord(a2)) {
    let aEntries = Object.entries(a2), bEntries = Object.entries(b);
    if (!equals(aEntries, bEntries, filteredCustomTesters))
      return !1;
  }
  return aStack.pop(), bStack.pop(), !0;
}
function hasPropertyInObject(object, key) {
  return !object || typeof object != "object" || object === Object.prototype ? !1 : Object.prototype.hasOwnProperty.call(object, key) || hasPropertyInObject(Object.getPrototypeOf(object), key);
}
function isObjectWithKeys(a2) {
  return isObject(a2) && !(a2 instanceof Error) && !Array.isArray(a2) && !(a2 instanceof Date);
}
function subsetEquality(object, subset, customTesters = []) {
  let filteredCustomTesters = customTesters.filter((t) => t !== subsetEquality), subsetEqualityWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object2, subset2) => {
    if (isObjectWithKeys(subset2))
      return Object.keys(subset2).every((key) => {
        if (subset2[key] != null && typeof subset2[key] == "object") {
          if (seenReferences.has(subset2[key]))
            return equals(object2[key], subset2[key], filteredCustomTesters);
          seenReferences.set(subset2[key], !0);
        }
        let result = object2 != null && hasPropertyInObject(object2, key) && equals(object2[key], subset2[key], [...filteredCustomTesters, subsetEqualityWithContext(seenReferences)]);
        return seenReferences.delete(subset2[key]), result;
      });
  };
  return subsetEqualityWithContext()(object, subset);
}
function typeEquality(a2, b) {
  if (!(a2 == null || b == null || a2.constructor === b.constructor))
    return !1;
}
function arrayBufferEquality(a2, b) {
  let dataViewA = a2, dataViewB = b;
  if (!(a2 instanceof DataView && b instanceof DataView)) {
    if (!(a2 instanceof ArrayBuffer) || !(b instanceof ArrayBuffer))
      return;
    try {
      dataViewA = new DataView(a2), dataViewB = new DataView(b);
    } catch {
      return;
    }
  }
  if (dataViewA.byteLength !== dataViewB.byteLength)
    return !1;
  for (let i = 0; i < dataViewA.byteLength; i++)
    if (dataViewA.getUint8(i) !== dataViewB.getUint8(i))
      return !1;
  return !0;
}
function sparseArrayEquality(a2, b, customTesters = []) {
  if (!Array.isArray(a2) || !Array.isArray(b))
    return;
  let aKeys = Object.keys(a2), bKeys = Object.keys(b), filteredCustomTesters = customTesters.filter((t) => t !== sparseArrayEquality);
  return equals(a2, b, filteredCustomTesters, !0) && equals(aKeys, bKeys);
}
function generateToBeMessage(deepEqualityName, expected = "#{this}", actual = "#{exp}") {
  let toBeMessage = `expected ${expected} to be ${actual} // Object.is equality`;
  return ["toStrictEqual", "toEqual"].includes(deepEqualityName) ? `${toBeMessage}

If it should pass with deep equality, replace "toBe" with "${deepEqualityName}"

Expected: ${expected}
Received: serializes to the same string
` : toBeMessage;
}
function pluralize(word, count) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
function getObjectKeys(object) {
  return [...Object.keys(object), ...Object.getOwnPropertySymbols(object).filter((s3) => {
    var _Object$getOwnPropert;
    return (_Object$getOwnPropert = Object.getOwnPropertyDescriptor(object, s3)) === null || _Object$getOwnPropert === void 0 ? void 0 : _Object$getOwnPropert.enumerable;
  })];
}
function getObjectSubset(object, subset, customTesters) {
  let stripped = 0, getObjectSubsetWithContext = (seenReferences = /* @__PURE__ */ new WeakMap()) => (object2, subset2) => {
    if (Array.isArray(object2)) {
      if (Array.isArray(subset2) && subset2.length === object2.length)
        return subset2.map((sub, i) => getObjectSubsetWithContext(seenReferences)(object2[i], sub));
    } else {
      if (object2 instanceof Date)
        return object2;
      if (isObject(object2) && isObject(subset2)) {
        if (equals(object2, subset2, [
          ...customTesters,
          iterableEquality,
          subsetEquality
        ]))
          return subset2;
        let trimmed = {};
        seenReferences.set(object2, trimmed), typeof object2.constructor == "function" && typeof object2.constructor.name == "string" && Object.defineProperty(trimmed, "constructor", {
          enumerable: !1,
          value: object2.constructor
        });
        for (let key of getObjectKeys(object2))
          hasPropertyInObject(subset2, key) ? trimmed[key] = seenReferences.has(object2[key]) ? seenReferences.get(object2[key]) : getObjectSubsetWithContext(seenReferences)(object2[key], subset2[key]) : seenReferences.has(object2[key]) || (stripped += 1, isObject(object2[key]) && (stripped += getObjectKeys(object2[key]).length), getObjectSubsetWithContext(seenReferences)(object2[key], subset2[key]));
        if (getObjectKeys(trimmed).length > 0)
          return trimmed;
      }
    }
    return object2;
  };
  return {
    subset: getObjectSubsetWithContext()(object, subset),
    stripped
  };
}
if (!Object.prototype.hasOwnProperty.call(globalThis, MATCHERS_OBJECT)) {
  let globalState = /* @__PURE__ */ new WeakMap();
  Object.defineProperty(globalThis, MATCHERS_OBJECT, { get: () => globalState });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, JEST_MATCHERS_OBJECT)) {
  let matchers = /* @__PURE__ */ Object.create(null), customEqualityTesters = [];
  Object.defineProperty(globalThis, JEST_MATCHERS_OBJECT, {
    configurable: !0,
    get: () => ({
      state: globalThis[MATCHERS_OBJECT].get(globalThis[GLOBAL_EXPECT]),
      matchers,
      customEqualityTesters
    })
  });
}
if (!Object.prototype.hasOwnProperty.call(globalThis, ASYMMETRIC_MATCHERS_OBJECT)) {
  let asymmetricMatchers = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(globalThis, ASYMMETRIC_MATCHERS_OBJECT, { get: () => asymmetricMatchers });
}
function getState(expect4) {
  return globalThis[MATCHERS_OBJECT].get(expect4);
}
function setState(state, expect4) {
  let map = globalThis[MATCHERS_OBJECT], current = map.get(expect4) || {}, results = Object.defineProperties(current, {
    ...Object.getOwnPropertyDescriptors(current),
    ...Object.getOwnPropertyDescriptors(state)
  });
  map.set(expect4, results);
}
var AsymmetricMatcher = class {
  // should have "jest" to be compatible with its ecosystem
  $$typeof = /* @__PURE__ */ Symbol.for("jest.asymmetricMatcher");
  constructor(sample, inverse = !1) {
    this.sample = sample, this.inverse = inverse;
  }
  getMatcherContext(expect4) {
    return {
      ...getState(expect4 || globalThis[GLOBAL_EXPECT]),
      equals,
      isNot: this.inverse,
      customTesters: getCustomEqualityTesters(),
      utils: {
        ...getMatcherUtils(),
        diff,
        stringify,
        iterableEquality,
        subsetEquality
      }
    };
  }
};
AsymmetricMatcher.prototype[/* @__PURE__ */ Symbol.for("chai/inspect")] = function(options) {
  let result = stringify(this, options.depth, { min: !0 });
  return result.length <= options.truncate ? result : `${this.toString()}{\u2026}`;
};
var StringContaining = class extends AsymmetricMatcher {
  constructor(sample, inverse = !1) {
    if (!isA("String", sample))
      throw new Error("Expected is not a string");
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    let result = isA("String", other) && other.includes(this.sample);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "string";
  }
}, Anything = class extends AsymmetricMatcher {
  asymmetricMatch(other) {
    return other != null;
  }
  toString() {
    return "Anything";
  }
  toAsymmetricMatcher() {
    return "Anything";
  }
}, ObjectContaining = class extends AsymmetricMatcher {
  constructor(sample, inverse = !1) {
    super(sample, inverse);
  }
  getPrototype(obj) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.constructor.prototype === obj ? null : obj.constructor.prototype;
  }
  hasProperty(obj, property) {
    return obj ? Object.prototype.hasOwnProperty.call(obj, property) ? !0 : this.hasProperty(this.getPrototype(obj), property) : !1;
  }
  asymmetricMatch(other) {
    if (typeof this.sample != "object")
      throw new TypeError(`You must provide an object to ${this.toString()}, not '${typeof this.sample}'.`);
    let result = !0, matcherContext = this.getMatcherContext();
    for (let property in this.sample)
      if (!this.hasProperty(other, property) || !equals(this.sample[property], other[property], matcherContext.customTesters)) {
        result = !1;
        break;
      }
    return this.inverse ? !result : result;
  }
  toString() {
    return `Object${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "object";
  }
}, ArrayContaining = class extends AsymmetricMatcher {
  constructor(sample, inverse = !1) {
    super(sample, inverse);
  }
  asymmetricMatch(other) {
    if (!Array.isArray(this.sample))
      throw new TypeError(`You must provide an array to ${this.toString()}, not '${typeof this.sample}'.`);
    let matcherContext = this.getMatcherContext(), result = this.sample.length === 0 || Array.isArray(other) && this.sample.every((item) => other.some((another) => equals(item, another, matcherContext.customTesters)));
    return this.inverse ? !result : result;
  }
  toString() {
    return `Array${this.inverse ? "Not" : ""}Containing`;
  }
  getExpectedType() {
    return "array";
  }
}, Any = class extends AsymmetricMatcher {
  constructor(sample) {
    if (typeof sample > "u")
      throw new TypeError("any() expects to be passed a constructor function. Please pass one or use anything() to match any object.");
    super(sample);
  }
  fnNameFor(func) {
    if (func.name)
      return func.name;
    let matches2 = Function.prototype.toString.call(func).match(/^(?:async)?\s*function\s*(?:\*\s*)?([\w$]+)\s*\(/);
    return matches2 ? matches2[1] : "<anonymous>";
  }
  asymmetricMatch(other) {
    return this.sample === String ? typeof other == "string" || other instanceof String : this.sample === Number ? typeof other == "number" || other instanceof Number : this.sample === Function ? typeof other == "function" || typeof other == "function" : this.sample === Boolean ? typeof other == "boolean" || other instanceof Boolean : this.sample === BigInt ? typeof other == "bigint" || other instanceof BigInt : this.sample === Symbol ? typeof other == "symbol" || other instanceof Symbol : this.sample === Object ? typeof other == "object" : other instanceof this.sample;
  }
  toString() {
    return "Any";
  }
  getExpectedType() {
    return this.sample === String ? "string" : this.sample === Number ? "number" : this.sample === Function ? "function" : this.sample === Object ? "object" : this.sample === Boolean ? "boolean" : this.fnNameFor(this.sample);
  }
  toAsymmetricMatcher() {
    return `Any<${this.fnNameFor(this.sample)}>`;
  }
}, StringMatching = class extends AsymmetricMatcher {
  constructor(sample, inverse = !1) {
    if (!isA("String", sample) && !isA("RegExp", sample))
      throw new Error("Expected is not a String or a RegExp");
    super(new RegExp(sample), inverse);
  }
  asymmetricMatch(other) {
    let result = isA("String", other) && this.sample.test(other);
    return this.inverse ? !result : result;
  }
  toString() {
    return `String${this.inverse ? "Not" : ""}Matching`;
  }
  getExpectedType() {
    return "string";
  }
}, CloseTo = class extends AsymmetricMatcher {
  precision;
  constructor(sample, precision = 2, inverse = !1) {
    if (!isA("Number", sample))
      throw new Error("Expected is not a Number");
    if (!isA("Number", precision))
      throw new Error("Precision is not a Number");
    super(sample), this.inverse = inverse, this.precision = precision;
  }
  asymmetricMatch(other) {
    if (!isA("Number", other))
      return !1;
    let result = !1;
    return other === Number.POSITIVE_INFINITY && this.sample === Number.POSITIVE_INFINITY || other === Number.NEGATIVE_INFINITY && this.sample === Number.NEGATIVE_INFINITY ? result = !0 : result = Math.abs(this.sample - other) < 10 ** -this.precision / 2, this.inverse ? !result : result;
  }
  toString() {
    return `Number${this.inverse ? "Not" : ""}CloseTo`;
  }
  getExpectedType() {
    return "number";
  }
  toAsymmetricMatcher() {
    return [
      this.toString(),
      this.sample,
      `(${pluralize("digit", this.precision)})`
    ].join(" ");
  }
}, JestAsymmetricMatchers = (chai, utils) => {
  utils.addMethod(chai.expect, "anything", () => new Anything()), utils.addMethod(chai.expect, "any", (expected) => new Any(expected)), utils.addMethod(chai.expect, "stringContaining", (expected) => new StringContaining(expected)), utils.addMethod(chai.expect, "objectContaining", (expected) => new ObjectContaining(expected)), utils.addMethod(chai.expect, "arrayContaining", (expected) => new ArrayContaining(expected)), utils.addMethod(chai.expect, "stringMatching", (expected) => new StringMatching(expected)), utils.addMethod(chai.expect, "closeTo", (expected, precision) => new CloseTo(expected, precision)), chai.expect.not = {
    stringContaining: (expected) => new StringContaining(expected, !0),
    objectContaining: (expected) => new ObjectContaining(expected, !0),
    arrayContaining: (expected) => new ArrayContaining(expected, !0),
    stringMatching: (expected) => new StringMatching(expected, !0),
    closeTo: (expected, precision) => new CloseTo(expected, precision, !0)
  };
};
function createAssertionMessage(util, assertion, hasArgs) {
  let not = util.flag(assertion, "negate") ? "not." : "", name = `${util.flag(assertion, "_name")}(${hasArgs ? "expected" : ""})`, promiseName = util.flag(assertion, "promise");
  return `expect(actual)${promiseName ? `.${promiseName}` : ""}.${not}${name}`;
}
function recordAsyncExpect(_test, promise, assertion, error) {
  let test2 = _test;
  if (test2 && promise instanceof Promise) {
    promise = promise.finally(() => {
      if (!test2.promises)
        return;
      let index = test2.promises.indexOf(promise);
      index !== -1 && test2.promises.splice(index, 1);
    }), test2.promises || (test2.promises = []), test2.promises.push(promise);
    let resolved = !1;
    return test2.onFinished ?? (test2.onFinished = []), test2.onFinished.push(() => {
      if (!resolved) {
        var _vitest_worker__;
        let stack = (((_vitest_worker__ = globalThis.__vitest_worker__) === null || _vitest_worker__ === void 0 ? void 0 : _vitest_worker__.onFilterStackTrace) || ((s3) => s3 || ""))(error.stack);
        console.warn([
          `Promise returned by \`${assertion}\` was not awaited. `,
          "Vitest currently auto-awaits hanging assertions at the end of the test, but this will cause the test to fail in Vitest 3. ",
          `Please remember to await the assertion.
`,
          stack
        ].join(""));
      }
    }), {
      then(onFulfilled, onRejected) {
        return resolved = !0, promise.then(onFulfilled, onRejected);
      },
      catch(onRejected) {
        return promise.catch(onRejected);
      },
      finally(onFinally) {
        return promise.finally(onFinally);
      },
      [Symbol.toStringTag]: "Promise"
    };
  }
  return promise;
}
function handleTestError(test2, err) {
  var _test$result;
  test2.result || (test2.result = { state: "fail" }), test2.result.state = "fail", (_test$result = test2.result).errors || (_test$result.errors = []), test2.result.errors.push(processError(err));
}
function wrapAssertion(utils, name, fn3) {
  return function(...args) {
    if (name !== "withTest" && utils.flag(this, "_name", name), !utils.flag(this, "soft"))
      return fn3.apply(this, args);
    let test2 = utils.flag(this, "vitest-test");
    if (!test2)
      throw new Error("expect.soft() can only be used inside a test");
    try {
      let result = fn3.apply(this, args);
      return result && typeof result == "object" && typeof result.then == "function" ? result.then(noop, (err) => {
        handleTestError(test2, err);
      }) : result;
    } catch (err) {
      handleTestError(test2, err);
    }
  };
}
var JestChaiExpect = (chai, utils) => {
  let { AssertionError: AssertionError2 } = chai, customTesters = getCustomEqualityTesters();
  function def(name, fn3) {
    let addMethod2 = (n) => {
      let softWrapper = wrapAssertion(utils, n, fn3);
      utils.addMethod(chai.Assertion.prototype, n, softWrapper), utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, n, softWrapper);
    };
    Array.isArray(name) ? name.forEach((n) => addMethod2(n)) : addMethod2(name);
  }
  [
    "throw",
    "throws",
    "Throw"
  ].forEach((m2) => {
    utils.overwriteMethod(chai.Assertion.prototype, m2, (_super) => function(...args) {
      let promise = utils.flag(this, "promise"), object = utils.flag(this, "object"), isNot = utils.flag(this, "negate");
      if (promise === "rejects")
        utils.flag(this, "object", () => {
          throw object;
        });
      else if (promise === "resolves" && typeof object != "function") {
        if (isNot)
          return;
        {
          let message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't", error = { showDiff: !1 };
          throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
        }
      }
      _super.apply(this, args);
    });
  }), def("withTest", function(test2) {
    return utils.flag(this, "vitest-test", test2), this;
  }), def("toEqual", function(expected) {
    let actual = utils.flag(this, "object"), equal = equals(actual, expected, [...customTesters, iterableEquality]);
    return this.assert(equal, "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", expected, actual);
  }), def("toStrictEqual", function(expected) {
    let obj = utils.flag(this, "object"), equal = equals(obj, expected, [
      ...customTesters,
      iterableEquality,
      typeEquality,
      sparseArrayEquality,
      arrayBufferEquality
    ], !0);
    return this.assert(equal, "expected #{this} to strictly equal #{exp}", "expected #{this} to not strictly equal #{exp}", expected, obj);
  }), def("toBe", function(expected) {
    let actual = this._obj, pass = Object.is(actual, expected), deepEqualityName = "";
    return pass || (equals(actual, expected, [
      ...customTesters,
      iterableEquality,
      typeEquality,
      sparseArrayEquality,
      arrayBufferEquality
    ], !0) ? deepEqualityName = "toStrictEqual" : equals(actual, expected, [...customTesters, iterableEquality]) && (deepEqualityName = "toEqual")), this.assert(pass, generateToBeMessage(deepEqualityName), "expected #{this} not to be #{exp} // Object.is equality", expected, actual);
  }), def("toMatchObject", function(expected) {
    let actual = this._obj, pass = equals(actual, expected, [
      ...customTesters,
      iterableEquality,
      subsetEquality
    ]), isNot = utils.flag(this, "negate"), { subset: actualSubset, stripped } = getObjectSubset(actual, expected, customTesters);
    if (pass && isNot || !pass && !isNot) {
      let msg = utils.getMessage(this, [
        pass,
        "expected #{this} to match object #{exp}",
        "expected #{this} to not match object #{exp}",
        expected,
        actualSubset,
        !1
      ]), message = stripped === 0 ? msg : `${msg}
(${stripped} matching ${stripped === 1 ? "property" : "properties"} omitted from actual)`;
      throw new AssertionError2(message, {
        showDiff: !0,
        expected,
        actual: actualSubset
      });
    }
  }), def("toMatch", function(expected) {
    let actual = this._obj;
    if (typeof actual != "string")
      throw new TypeError(`.toMatch() expects to receive a string, but got ${typeof actual}`);
    return this.assert(typeof expected == "string" ? actual.includes(expected) : actual.match(expected), "expected #{this} to match #{exp}", "expected #{this} not to match #{exp}", expected, actual);
  }), def("toContain", function(item) {
    let actual = this._obj;
    if (typeof Node < "u" && actual instanceof Node) {
      if (!(item instanceof Node))
        throw new TypeError(`toContain() expected a DOM node as the argument, but got ${typeof item}`);
      return this.assert(actual.contains(item), "expected #{this} to contain element #{exp}", "expected #{this} not to contain element #{exp}", item, actual);
    }
    if (typeof DOMTokenList < "u" && actual instanceof DOMTokenList) {
      assertTypes(item, "class name", ["string"]);
      let expectedClassList = utils.flag(this, "negate") ? actual.value.replace(item, "").trim() : `${actual.value} ${item}`;
      return this.assert(actual.contains(item), `expected "${actual.value}" to contain "${item}"`, `expected "${actual.value}" not to contain "${item}"`, expectedClassList, actual.value);
    }
    return typeof actual == "string" && typeof item == "string" ? this.assert(actual.includes(item), "expected #{this} to contain #{exp}", "expected #{this} not to contain #{exp}", item, actual) : (actual != null && typeof actual != "string" && utils.flag(this, "object", Array.from(actual)), this.contain(item));
  }), def("toContainEqual", function(expected) {
    let obj = utils.flag(this, "object"), index = Array.from(obj).findIndex((item) => equals(item, expected, customTesters));
    this.assert(index !== -1, "expected #{this} to deep equally contain #{exp}", "expected #{this} to not deep equally contain #{exp}", expected);
  }), def("toBeTruthy", function() {
    let obj = utils.flag(this, "object");
    this.assert(!!obj, "expected #{this} to be truthy", "expected #{this} to not be truthy", !0, obj);
  }), def("toBeFalsy", function() {
    let obj = utils.flag(this, "object");
    this.assert(!obj, "expected #{this} to be falsy", "expected #{this} to not be falsy", !1, obj);
  }), def("toBeGreaterThan", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual > expected, `expected ${actual} to be greater than ${expected}`, `expected ${actual} to be not greater than ${expected}`, expected, actual, !1);
  }), def("toBeGreaterThanOrEqual", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual >= expected, `expected ${actual} to be greater than or equal to ${expected}`, `expected ${actual} to be not greater than or equal to ${expected}`, expected, actual, !1);
  }), def("toBeLessThan", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual < expected, `expected ${actual} to be less than ${expected}`, `expected ${actual} to be not less than ${expected}`, expected, actual, !1);
  }), def("toBeLessThanOrEqual", function(expected) {
    let actual = this._obj;
    return assertTypes(actual, "actual", ["number", "bigint"]), assertTypes(expected, "expected", ["number", "bigint"]), this.assert(actual <= expected, `expected ${actual} to be less than or equal to ${expected}`, `expected ${actual} to be not less than or equal to ${expected}`, expected, actual, !1);
  }), def("toBeNaN", function() {
    let obj = utils.flag(this, "object");
    this.assert(Number.isNaN(obj), "expected #{this} to be NaN", "expected #{this} not to be NaN", Number.NaN, obj);
  }), def("toBeUndefined", function() {
    let obj = utils.flag(this, "object");
    this.assert(obj === void 0, "expected #{this} to be undefined", "expected #{this} not to be undefined", void 0, obj);
  }), def("toBeNull", function() {
    let obj = utils.flag(this, "object");
    this.assert(obj === null, "expected #{this} to be null", "expected #{this} not to be null", null, obj);
  }), def("toBeDefined", function() {
    let obj = utils.flag(this, "object");
    this.assert(typeof obj < "u", "expected #{this} to be defined", "expected #{this} to be undefined", obj);
  }), def("toBeTypeOf", function(expected) {
    let actual = typeof this._obj, equal = expected === actual;
    return this.assert(equal, "expected #{this} to be type of #{exp}", "expected #{this} not to be type of #{exp}", expected, actual);
  }), def("toBeInstanceOf", function(obj) {
    return this.instanceOf(obj);
  }), def("toHaveLength", function(length) {
    return this.have.length(length);
  }), def("toHaveProperty", function(...args) {
    Array.isArray(args[0]) && (args[0] = args[0].map((key) => String(key).replace(/([.[\]])/g, "\\$1")).join("."));
    let actual = this._obj, [propertyName, expected] = args, getValue = () => Object.prototype.hasOwnProperty.call(actual, propertyName) ? {
      value: actual[propertyName],
      exists: !0
    } : utils.getPathInfo(actual, propertyName), { value, exists } = getValue(), pass = exists && (args.length === 1 || equals(expected, value, customTesters)), valueString = args.length === 1 ? "" : ` with value ${utils.objDisplay(expected)}`;
    return this.assert(pass, `expected #{this} to have property "${propertyName}"${valueString}`, `expected #{this} to not have property "${propertyName}"${valueString}`, expected, exists ? value : void 0);
  }), def("toBeCloseTo", function(received, precision = 2) {
    let expected = this._obj, pass = !1, expectedDiff2 = 0, receivedDiff = 0;
    return received === Number.POSITIVE_INFINITY && expected === Number.POSITIVE_INFINITY || received === Number.NEGATIVE_INFINITY && expected === Number.NEGATIVE_INFINITY ? pass = !0 : (expectedDiff2 = 10 ** -precision / 2, receivedDiff = Math.abs(expected - received), pass = receivedDiff < expectedDiff2), this.assert(pass, `expected #{this} to be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff2}`, `expected #{this} to not be close to #{exp}, received difference is ${receivedDiff}, but expected ${expectedDiff2}`, received, expected, !1);
  });
  function assertIsMock(assertion) {
    if (!isMockFunction2(assertion._obj))
      throw new TypeError(`${utils.inspect(assertion._obj)} is not a spy or a call to a spy!`);
  }
  function getSpy(assertion) {
    return assertIsMock(assertion), assertion._obj;
  }
  def(["toHaveBeenCalledTimes", "toBeCalledTimes"], function(number) {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length;
    return this.assert(callCount === number, `expected "${spyName}" to be called #{exp} times, but got ${callCount} times`, `expected "${spyName}" to not be called #{exp} times`, number, callCount, !1);
  }), def("toHaveBeenCalledOnce", function() {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length;
    return this.assert(callCount === 1, `expected "${spyName}" to be called once, but got ${callCount} times`, `expected "${spyName}" to not be called once`, 1, callCount, !1);
  }), def(["toHaveBeenCalled", "toBeCalled"], function() {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length, called = callCount > 0, isNot = utils.flag(this, "negate"), msg = utils.getMessage(this, [
      called,
      `expected "${spyName}" to be called at least once`,
      `expected "${spyName}" to not be called at all, but actually been called ${callCount} times`,
      !0,
      called
    ]);
    if (called && isNot && (msg = formatCalls(spy, msg)), called && isNot || !called && !isNot)
      throw new AssertionError2(msg);
  });
  function equalsArgumentArray(a2, b) {
    return a2.length === b.length && a2.every((aItem, i) => equals(aItem, b[i], [...customTesters, iterableEquality]));
  }
  def(["toHaveBeenCalledWith", "toBeCalledWith"], function(...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), pass = spy.mock.calls.some((callArg) => equalsArgumentArray(callArg, args)), isNot = utils.flag(this, "negate"), msg = utils.getMessage(this, [
      pass,
      `expected "${spyName}" to be called with arguments: #{exp}`,
      `expected "${spyName}" to not be called with arguments: #{exp}`,
      args
    ]);
    if (pass && isNot || !pass && !isNot)
      throw new AssertionError2(formatCalls(spy, msg, args));
  }), def("toHaveBeenCalledExactlyOnceWith", function(...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), callCount = spy.mock.calls.length, pass = spy.mock.calls.some((callArg) => equalsArgumentArray(callArg, args)) && callCount === 1, isNot = utils.flag(this, "negate"), msg = utils.getMessage(this, [
      pass,
      `expected "${spyName}" to be called once with arguments: #{exp}`,
      `expected "${spyName}" to not be called once with arguments: #{exp}`,
      args
    ]);
    if (pass && isNot || !pass && !isNot)
      throw new AssertionError2(formatCalls(spy, msg, args));
  }), def(["toHaveBeenNthCalledWith", "nthCalledWith"], function(times, ...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), nthCall = spy.mock.calls[times - 1], callCount = spy.mock.calls.length, isCalled = times <= callCount;
    this.assert(nthCall && equalsArgumentArray(nthCall, args), `expected ${ordinalOf(times)} "${spyName}" call to have been called with #{exp}${isCalled ? "" : `, but called only ${callCount} times`}`, `expected ${ordinalOf(times)} "${spyName}" call to not have been called with #{exp}`, args, nthCall, isCalled);
  }), def(["toHaveBeenLastCalledWith", "lastCalledWith"], function(...args) {
    let spy = getSpy(this), spyName = spy.getMockName(), lastCall = spy.mock.calls[spy.mock.calls.length - 1];
    this.assert(lastCall && equalsArgumentArray(lastCall, args), `expected last "${spyName}" call to have been called with #{exp}`, `expected last "${spyName}" call to not have been called with #{exp}`, args, lastCall);
  });
  function isSpyCalledBeforeAnotherSpy(beforeSpy, afterSpy, failIfNoFirstInvocation) {
    let beforeInvocationCallOrder = beforeSpy.mock.invocationCallOrder, afterInvocationCallOrder = afterSpy.mock.invocationCallOrder;
    return beforeInvocationCallOrder.length === 0 ? !failIfNoFirstInvocation : afterInvocationCallOrder.length === 0 ? !1 : beforeInvocationCallOrder[0] < afterInvocationCallOrder[0];
  }
  def(["toHaveBeenCalledBefore"], function(resultSpy, failIfNoFirstInvocation = !0) {
    let expectSpy = getSpy(this);
    if (!isMockFunction2(resultSpy))
      throw new TypeError(`${utils.inspect(resultSpy)} is not a spy or a call to a spy`);
    this.assert(isSpyCalledBeforeAnotherSpy(expectSpy, resultSpy, failIfNoFirstInvocation), `expected "${expectSpy.getMockName()}" to have been called before "${resultSpy.getMockName()}"`, `expected "${expectSpy.getMockName()}" to not have been called before "${resultSpy.getMockName()}"`, resultSpy, expectSpy);
  }), def(["toHaveBeenCalledAfter"], function(resultSpy, failIfNoFirstInvocation = !0) {
    let expectSpy = getSpy(this);
    if (!isMockFunction2(resultSpy))
      throw new TypeError(`${utils.inspect(resultSpy)} is not a spy or a call to a spy`);
    this.assert(isSpyCalledBeforeAnotherSpy(resultSpy, expectSpy, failIfNoFirstInvocation), `expected "${expectSpy.getMockName()}" to have been called after "${resultSpy.getMockName()}"`, `expected "${expectSpy.getMockName()}" to not have been called after "${resultSpy.getMockName()}"`, resultSpy, expectSpy);
  }), def(["toThrow", "toThrowError"], function(expected) {
    if (typeof expected == "string" || typeof expected > "u" || expected instanceof RegExp)
      return this.throws(expected === "" ? /^$/ : expected);
    let obj = this._obj, promise = utils.flag(this, "promise"), isNot = utils.flag(this, "negate"), thrown = null;
    if (promise === "rejects")
      thrown = obj;
    else if (promise === "resolves" && typeof obj != "function") {
      if (isNot)
        return;
      {
        let message = utils.flag(this, "message") || "expected promise to throw an error, but it didn't", error = { showDiff: !1 };
        throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
      }
    } else {
      let isThrow = !1;
      try {
        obj();
      } catch (err) {
        isThrow = !0, thrown = err;
      }
      if (!isThrow && !isNot) {
        let message = utils.flag(this, "message") || "expected function to throw an error, but it didn't", error = { showDiff: !1 };
        throw new AssertionError2(message, error, utils.flag(this, "ssfi"));
      }
    }
    if (typeof expected == "function") {
      let name = expected.name || expected.prototype.constructor.name;
      return this.assert(thrown && thrown instanceof expected, `expected error to be instance of ${name}`, `expected error not to be instance of ${name}`, expected, thrown);
    }
    if (expected instanceof Error) {
      let equal = equals(thrown, expected, [...customTesters, iterableEquality]);
      return this.assert(equal, "expected a thrown error to be #{exp}", "expected a thrown error not to be #{exp}", expected, thrown);
    }
    if (typeof expected == "object" && "asymmetricMatch" in expected && typeof expected.asymmetricMatch == "function") {
      let matcher = expected;
      return this.assert(thrown && matcher.asymmetricMatch(thrown), "expected error to match asymmetric matcher", "expected error not to match asymmetric matcher", matcher, thrown);
    }
    throw new Error(`"toThrow" expects string, RegExp, function, Error instance or asymmetric matcher, got "${typeof expected}"`);
  }), [{
    name: "toHaveResolved",
    condition: (spy) => spy.mock.settledResults.length > 0 && spy.mock.settledResults.some(({ type: type5 }) => type5 === "fulfilled"),
    action: "resolved"
  }, {
    name: ["toHaveReturned", "toReturn"],
    condition: (spy) => spy.mock.calls.length > 0 && spy.mock.results.some(({ type: type5 }) => type5 !== "throw"),
    action: "called"
  }].forEach(({ name, condition, action }) => {
    def(name, function() {
      let spy = getSpy(this), spyName = spy.getMockName(), pass = condition(spy);
      this.assert(pass, `expected "${spyName}" to be successfully ${action} at least once`, `expected "${spyName}" to not be successfully ${action}`, pass, !pass, !1);
    });
  }), [{
    name: "toHaveResolvedTimes",
    condition: (spy, times) => spy.mock.settledResults.reduce((s3, { type: type5 }) => type5 === "fulfilled" ? ++s3 : s3, 0) === times,
    action: "resolved"
  }, {
    name: ["toHaveReturnedTimes", "toReturnTimes"],
    condition: (spy, times) => spy.mock.results.reduce((s3, { type: type5 }) => type5 === "throw" ? s3 : ++s3, 0) === times,
    action: "called"
  }].forEach(({ name, condition, action }) => {
    def(name, function(times) {
      let spy = getSpy(this), spyName = spy.getMockName(), pass = condition(spy, times);
      this.assert(pass, `expected "${spyName}" to be successfully ${action} ${times} times`, `expected "${spyName}" to not be successfully ${action} ${times} times`, `expected resolved times: ${times}`, `received resolved times: ${pass}`, !1);
    });
  }), [{
    name: "toHaveResolvedWith",
    condition: (spy, value) => spy.mock.settledResults.some(({ type: type5, value: result }) => type5 === "fulfilled" && equals(value, result)),
    action: "resolve"
  }, {
    name: ["toHaveReturnedWith", "toReturnWith"],
    condition: (spy, value) => spy.mock.results.some(({ type: type5, value: result }) => type5 === "return" && equals(value, result)),
    action: "return"
  }].forEach(({ name, condition, action }) => {
    def(name, function(value) {
      let spy = getSpy(this), pass = condition(spy, value), isNot = utils.flag(this, "negate");
      if (pass && isNot || !pass && !isNot) {
        let spyName = spy.getMockName(), msg = utils.getMessage(this, [
          pass,
          `expected "${spyName}" to ${action} with: #{exp} at least once`,
          `expected "${spyName}" to not ${action} with: #{exp}`,
          value
        ]), results = action === "return" ? spy.mock.results : spy.mock.settledResults;
        throw new AssertionError2(formatReturns(spy, results, msg, value));
      }
    });
  }), [{
    name: "toHaveLastResolvedWith",
    condition: (spy, value) => {
      let result = spy.mock.settledResults[spy.mock.settledResults.length - 1];
      return result && result.type === "fulfilled" && equals(result.value, value);
    },
    action: "resolve"
  }, {
    name: ["toHaveLastReturnedWith", "lastReturnedWith"],
    condition: (spy, value) => {
      let result = spy.mock.results[spy.mock.results.length - 1];
      return result && result.type === "return" && equals(result.value, value);
    },
    action: "return"
  }].forEach(({ name, condition, action }) => {
    def(name, function(value) {
      let spy = getSpy(this), results = action === "return" ? spy.mock.results : spy.mock.settledResults, result = results[results.length - 1], spyName = spy.getMockName();
      this.assert(condition(spy, value), `expected last "${spyName}" call to ${action} #{exp}`, `expected last "${spyName}" call to not ${action} #{exp}`, value, result?.value);
    });
  }), [{
    name: "toHaveNthResolvedWith",
    condition: (spy, index, value) => {
      let result = spy.mock.settledResults[index - 1];
      return result && result.type === "fulfilled" && equals(result.value, value);
    },
    action: "resolve"
  }, {
    name: ["toHaveNthReturnedWith", "nthReturnedWith"],
    condition: (spy, index, value) => {
      let result = spy.mock.results[index - 1];
      return result && result.type === "return" && equals(result.value, value);
    },
    action: "return"
  }].forEach(({ name, condition, action }) => {
    def(name, function(nthCall, value) {
      let spy = getSpy(this), spyName = spy.getMockName(), result = (action === "return" ? spy.mock.results : spy.mock.settledResults)[nthCall - 1], ordinalCall = `${ordinalOf(nthCall)} call`;
      this.assert(condition(spy, nthCall, value), `expected ${ordinalCall} "${spyName}" call to ${action} #{exp}`, `expected ${ordinalCall} "${spyName}" call to not ${action} #{exp}`, value, result?.value);
    });
  }), def("withContext", function(context) {
    for (let key in context)
      utils.flag(this, key, context[key]);
    return this;
  }), utils.addProperty(chai.Assertion.prototype, "resolves", function() {
    let error = new Error("resolves");
    utils.flag(this, "promise", "resolves"), utils.flag(this, "error", error);
    let test2 = utils.flag(this, "vitest-test"), obj = utils.flag(this, "object");
    if (utils.flag(this, "poll"))
      throw new SyntaxError("expect.poll() is not supported in combination with .resolves");
    if (typeof obj?.then != "function")
      throw new TypeError(`You must provide a Promise to expect() when using .resolves, not '${typeof obj}'.`);
    let proxy = new Proxy(this, { get: (target, key, receiver) => {
      let result = Reflect.get(target, key, receiver);
      return typeof result != "function" ? result instanceof chai.Assertion ? proxy : result : (...args) => {
        utils.flag(this, "_name", key);
        let promise = obj.then((value) => (utils.flag(this, "object", value), result.call(this, ...args)), (err) => {
          let _error = new AssertionError2(`promise rejected "${utils.inspect(err)}" instead of resolving`, { showDiff: !1 });
          throw _error.cause = err, _error.stack = error.stack.replace(error.message, _error.message), _error;
        });
        return recordAsyncExpect(test2, promise, createAssertionMessage(utils, this, !!args.length), error);
      };
    } });
    return proxy;
  }), utils.addProperty(chai.Assertion.prototype, "rejects", function() {
    let error = new Error("rejects");
    utils.flag(this, "promise", "rejects"), utils.flag(this, "error", error);
    let test2 = utils.flag(this, "vitest-test"), obj = utils.flag(this, "object"), wrapper = typeof obj == "function" ? obj() : obj;
    if (utils.flag(this, "poll"))
      throw new SyntaxError("expect.poll() is not supported in combination with .rejects");
    if (typeof wrapper?.then != "function")
      throw new TypeError(`You must provide a Promise to expect() when using .rejects, not '${typeof wrapper}'.`);
    let proxy = new Proxy(this, { get: (target, key, receiver) => {
      let result = Reflect.get(target, key, receiver);
      return typeof result != "function" ? result instanceof chai.Assertion ? proxy : result : (...args) => {
        utils.flag(this, "_name", key);
        let promise = wrapper.then((value) => {
          let _error = new AssertionError2(`promise resolved "${utils.inspect(value)}" instead of rejecting`, {
            showDiff: !0,
            expected: new Error("rejected promise"),
            actual: value
          });
          throw _error.stack = error.stack.replace(error.message, _error.message), _error;
        }, (err) => (utils.flag(this, "object", err), result.call(this, ...args)));
        return recordAsyncExpect(test2, promise, createAssertionMessage(utils, this, !!args.length), error);
      };
    } });
    return proxy;
  });
};
function ordinalOf(i) {
  let j = i % 10, k = i % 100;
  return j === 1 && k !== 11 ? `${i}st` : j === 2 && k !== 12 ? `${i}nd` : j === 3 && k !== 13 ? `${i}rd` : `${i}th`;
}
function formatCalls(spy, msg, showActualCall) {
  return spy.mock.calls.length && (msg += s2.gray(`

Received: 

${spy.mock.calls.map((callArg, i) => {
    let methodCall = s2.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call:

`);
    return showActualCall ? methodCall += diff(showActualCall, callArg, { omitAnnotationLines: !0 }) : methodCall += stringify(callArg).split(`
`).map((line) => `    ${line}`).join(`
`), methodCall += `
`, methodCall;
  }).join(`
`)}`)), msg += s2.gray(`

Number of calls: ${s2.bold(spy.mock.calls.length)}
`), msg;
}
function formatReturns(spy, results, msg, showActualReturn) {
  return results.length && (msg += s2.gray(`

Received: 

${results.map((callReturn, i) => {
    let methodCall = s2.bold(`  ${ordinalOf(i + 1)} ${spy.getMockName()} call return:

`);
    return showActualReturn ? methodCall += diff(showActualReturn, callReturn.value, { omitAnnotationLines: !0 }) : methodCall += stringify(callReturn).split(`
`).map((line) => `    ${line}`).join(`
`), methodCall += `
`, methodCall;
  }).join(`
`)}`)), msg += s2.gray(`

Number of calls: ${s2.bold(spy.mock.calls.length)}
`), msg;
}
function getMatcherState(assertion, expect4) {
  let obj = assertion._obj, isNot = utils_exports.flag(assertion, "negate"), promise = utils_exports.flag(assertion, "promise") || "", jestUtils = {
    ...getMatcherUtils(),
    diff,
    stringify,
    iterableEquality,
    subsetEquality
  };
  return {
    state: {
      ...getState(expect4),
      customTesters: getCustomEqualityTesters(),
      isNot,
      utils: jestUtils,
      promise,
      equals,
      suppressedErrors: [],
      soft: utils_exports.flag(assertion, "soft"),
      poll: utils_exports.flag(assertion, "poll")
    },
    isNot,
    obj
  };
}
var JestExtendError = class extends Error {
  constructor(message, actual, expected) {
    super(message), this.actual = actual, this.expected = expected;
  }
};
function JestExtendPlugin(c, expect4, matchers) {
  return (_, utils) => {
    Object.entries(matchers).forEach(([expectAssertionName, expectAssertion]) => {
      function expectWrapper(...args) {
        let { state, isNot, obj } = getMatcherState(this, expect4), result = expectAssertion.call(state, obj, ...args);
        if (result && typeof result == "object" && typeof result.then == "function")
          return result.then(({ pass: pass2, message: message2, actual: actual2, expected: expected2 }) => {
            if (pass2 && isNot || !pass2 && !isNot)
              throw new JestExtendError(message2(), actual2, expected2);
          });
        let { pass, message, actual, expected } = result;
        if (pass && isNot || !pass && !isNot)
          throw new JestExtendError(message(), actual, expected);
      }
      let softWrapper = wrapAssertion(utils, expectAssertionName, expectWrapper);
      utils.addMethod(globalThis[JEST_MATCHERS_OBJECT].matchers, expectAssertionName, softWrapper), utils.addMethod(c.Assertion.prototype, expectAssertionName, softWrapper);
      class CustomMatcher extends AsymmetricMatcher {
        constructor(inverse = !1, ...sample) {
          super(sample, inverse);
        }
        asymmetricMatch(other) {
          let { pass } = expectAssertion.call(this.getMatcherContext(expect4), other, ...this.sample);
          return this.inverse ? !pass : pass;
        }
        toString() {
          return `${this.inverse ? "not." : ""}${expectAssertionName}`;
        }
        getExpectedType() {
          return "any";
        }
        toAsymmetricMatcher() {
          return `${this.toString()}<${this.sample.map((item) => stringify(item)).join(", ")}>`;
        }
      }
      let customMatcher = (...sample) => new CustomMatcher(!1, ...sample);
      Object.defineProperty(expect4, expectAssertionName, {
        configurable: !0,
        enumerable: !0,
        value: customMatcher,
        writable: !0
      }), Object.defineProperty(expect4.not, expectAssertionName, {
        configurable: !0,
        enumerable: !0,
        value: (...sample) => new CustomMatcher(!0, ...sample),
        writable: !0
      }), Object.defineProperty(globalThis[ASYMMETRIC_MATCHERS_OBJECT], expectAssertionName, {
        configurable: !0,
        enumerable: !0,
        value: customMatcher,
        writable: !0
      });
    });
  };
}
var JestExtend = (chai, utils) => {
  utils.addMethod(chai.expect, "extend", (expect4, expects) => {
    use(JestExtendPlugin(chai, expect4, expects));
  });
};

// src/test/expect.ts
function createExpect() {
  use(JestExtend), use(JestChaiExpect), use(JestAsymmetricMatchers);
  let expect4 = ((value, message) => {
    let { assertionCalls } = getState(expect4);
    return setState({ assertionCalls: assertionCalls + 1, soft: !1 }, expect4), expect(value, message);
  });
  Object.assign(expect4, expect), expect4.getState = () => getState(expect4), expect4.setState = (state) => setState(state, expect4), expect4.extend = (expects) => expect.extend(expect4, expects), expect4.soft = (...args) => {
    let assert3 = expect4(...args);
    return expect4.setState({
      soft: !0
    }), assert3;
  }, expect4.extend(customMatchers), expect4.unreachable = (message) => {
    assert.fail(`expected${message ? ` "${message}" ` : " "}not to be reached`);
  };
  function assertions(expected) {
    let errorGen = () => new Error(
      `expected number of assertions to be ${expected}, but got ${expect4.getState().assertionCalls}`
    );
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(errorGen(), assertions), expect4.setState({
      expectedAssertionsNumber: expected,
      expectedAssertionsNumberErrorGen: errorGen
    });
  }
  function hasAssertions() {
    let error = new Error("expected any number of assertion, but got none");
    "captureStackTrace" in Error && typeof Error.captureStackTrace == "function" && Error.captureStackTrace(error, hasAssertions), expect4.setState({
      isExpectingAssertions: !0,
      isExpectingAssertionsError: error
    });
  }
  return setState(
    {
      // this should also add "snapshotState" that is added conditionally
      assertionCalls: 0,
      isExpectingAssertions: !1,
      isExpectingAssertionsError: null,
      expectedAssertionsNumber: null,
      expectedAssertionsNumberErrorGen: null
    },
    expect4
  ), utils_exports.addMethod(expect4, "assertions", assertions), utils_exports.addMethod(expect4, "hasAssertions", hasAssertions), expect4.extend(matchers_exports), expect4;
}
var expect2 = createExpect();
Object.defineProperty(globalThis, GLOBAL_EXPECT, {
  value: expect2,
  writable: !0,
  configurable: !0
});

// ../../node_modules/tinyspy/dist/index.js
function f2(e, t, n) {
  Object.defineProperty(e, t, n);
}
var u = /* @__PURE__ */ Symbol.for("tinyspy:spy");
var P = (e) => {
  e.called = !1, e.callCount = 0, e.calls = [], e.results = [], e.resolves = [], e.next = [];
}, K = (e) => (f2(e, u, { value: { reset: () => P(e[u]) } }), e[u]), T = (e) => e[u] || K(e);

// src/test/spy.ts
var moduleMockSpies = globalThis.__STORYBOOK_MODULE_MOCK_SPIES__ ??= /* @__PURE__ */ new Set(), listeners = /* @__PURE__ */ new Set();
function onMockCall(callback) {
  return listeners.add(callback), () => {
    listeners.delete(callback);
  };
}
var spyOn2 = (...args) => {
  let mock = spyOn(...args);
  return reactiveMock(mock);
};
function fn2(implementation) {
  let mock = implementation ? fn(implementation) : fn();
  return reactiveMock(mock);
}
function reactiveMock(mock) {
  let reactive = listenWhenCalled(mock), originalMockImplementation = reactive.mockImplementation.bind(null);
  return reactive.mockImplementation = (fn3) => listenWhenCalled(originalMockImplementation(fn3)), reactive;
}
function listenWhenCalled(mock) {
  let state = T(mock), impl = state.impl;
  return state.willCall(function(...args) {
    return listeners.forEach((listener) => listener(mock, args)), impl?.apply(this, args);
  }), mock;
}
function clearAllMocks() {
  mocks.forEach((spy) => spy.mockClear()), moduleMockSpies.forEach((spy) => spy.mockClear());
}
function resetAllMocks() {
  mocks.forEach((spy) => spy.mockReset()), moduleMockSpies.forEach((spy) => spy.mockReset());
}
function restoreAllMocks() {
  mocks.forEach((spy) => spy.mockRestore()), moduleMockSpies.forEach((spy) => spy.mockClear());
}
function mocked(item, _options = {}) {
  return item;
}

// src/test/testing-library.ts
import * as domTestingLibrary from "@testing-library/dom";

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/isElementType.js
function isElementType(element, tag, props) {
  return element.namespaceURI && element.namespaceURI !== "http://www.w3.org/1999/xhtml" || (tag = Array.isArray(tag) ? tag : [
    tag
  ], !tag.includes(element.tagName.toLowerCase())) ? !1 : props ? Object.entries(props).every(([k, v]) => element[k] === v) : !0;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/getWindow.js
function getWindow(node) {
  var _node_ownerDocument;
  if (isDocument(node) && node.defaultView)
    return node.defaultView;
  if (!((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0) && _node_ownerDocument.defaultView)
    return node.ownerDocument.defaultView;
  throw new Error(`Could not determine window of node. Node was ${describe(node)}`);
}
function isDocument(node) {
  return node.nodeType === 9;
}
function describe(val) {
  return typeof val == "function" ? `function ${val.name}` : val === null ? "null" : String(val);
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/Blob.js
function readBlobText(blob, FileReader) {
  return new Promise((res, rej) => {
    let fr = new FileReader();
    fr.onerror = rej, fr.onabort = rej, fr.onload = () => {
      res(String(fr.result));
    }, fr.readAsText(blob);
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/FileList.js
function createFileList(window2, files) {
  let list = {
    ...files,
    length: files.length,
    item: (index) => list[index],
    [Symbol.iterator]: function* () {
      for (let i = 0; i < list.length; i++)
        yield list[i];
    }
  };
  return list.constructor = window2.FileList, window2.FileList && Object.setPrototypeOf(list, window2.FileList.prototype), Object.freeze(list), list;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/DataTransfer.js
function _define_property(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var DataTransferItemStub = class {
  getAsFile() {
    return this.file;
  }
  getAsString(callback) {
    typeof this.data == "string" && callback(this.data);
  }
  /* istanbul ignore next */
  webkitGetAsEntry() {
    throw new Error("not implemented");
  }
  constructor(dataOrFile, type5) {
    _define_property(this, "kind", void 0), _define_property(this, "type", void 0), _define_property(this, "file", null), _define_property(this, "data", void 0), typeof dataOrFile == "string" ? (this.kind = "string", this.type = String(type5), this.data = dataOrFile) : (this.kind = "file", this.type = dataOrFile.type, this.file = dataOrFile);
  }
}, DataTransferItemListStub = class extends Array {
  add(...args) {
    let item = new DataTransferItemStub(args[0], args[1]);
    return this.push(item), item;
  }
  clear() {
    this.splice(0, this.length);
  }
  remove(index) {
    this.splice(index, 1);
  }
};
function getTypeMatcher(type5, exact) {
  let [group, sub] = type5.split("/"), isGroup = !sub || sub === "*";
  return (item) => exact ? item.type === (isGroup ? group : type5) : isGroup ? item.type.startsWith(`${group}/`) : item.type === group;
}
function createDataTransferStub(window2) {
  return new class {
    getData(format2) {
      var _this_items_find;
      let match = (_this_items_find = this.items.find(getTypeMatcher(format2, !0))) !== null && _this_items_find !== void 0 ? _this_items_find : this.items.find(getTypeMatcher(format2, !1)), text = "";
      return match?.getAsString((t) => {
        text = t;
      }), text;
    }
    setData(format2, data) {
      let matchIndex = this.items.findIndex(getTypeMatcher(format2, !0)), item = new DataTransferItemStub(data, format2);
      matchIndex >= 0 ? this.items.splice(matchIndex, 1, item) : this.items.push(item);
    }
    clearData(format2) {
      if (format2) {
        let matchIndex = this.items.findIndex(getTypeMatcher(format2, !0));
        matchIndex >= 0 && this.items.remove(matchIndex);
      } else
        this.items.clear();
    }
    get types() {
      let t = [];
      return this.files.length && t.push("Files"), this.items.forEach((i) => t.push(i.type)), Object.freeze(t), t;
    }
    /* istanbul ignore next */
    setDragImage() {
    }
    constructor() {
      _define_property(this, "dropEffect", "none"), _define_property(this, "effectAllowed", "uninitialized"), _define_property(this, "items", new DataTransferItemListStub()), _define_property(this, "files", createFileList(window2, []));
    }
  }();
}
function createDataTransfer(window2, files = []) {
  let dt = typeof window2.DataTransfer > "u" ? createDataTransferStub(window2) : (
    /* istanbul ignore next */
    new window2.DataTransfer()
  );
  return Object.defineProperty(dt, "files", {
    get: () => createFileList(window2, files)
  }), dt;
}
async function getBlobFromDataTransferItem(window2, item) {
  return item.kind === "file" ? item.getAsFile() : new window2.Blob([
    await new Promise((r) => item.getAsString(r))
  ], {
    type: item.type
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/dataTransfer/Clipboard.js
function _define_property2(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
function createClipboardItem(window2, ...blobs) {
  let dataMap = Object.fromEntries(blobs.map((b) => [
    typeof b == "string" ? "text/plain" : b.type,
    Promise.resolve(b)
  ]));
  return typeof window2.ClipboardItem < "u" ? new window2.ClipboardItem(dataMap) : new class {
    get types() {
      return Array.from(Object.keys(this.data));
    }
    async getType(type5) {
      let value = await this.data[type5];
      if (!value)
        throw new Error(`${type5} is not one of the available MIME types on this item.`);
      return value instanceof window2.Blob ? value : new window2.Blob([
        value
      ], {
        type: type5
      });
    }
    constructor(d) {
      _define_property2(this, "data", void 0), this.data = d;
    }
  }(dataMap);
}
var ClipboardStubControl = /* @__PURE__ */ Symbol("Manage ClipboardSub");
function createClipboardStub(window2, control) {
  return Object.assign(new class extends window2.EventTarget {
    async read() {
      return Array.from(this.items);
    }
    async readText() {
      let text = "";
      for (let item of this.items) {
        let type5 = item.types.includes("text/plain") ? "text/plain" : item.types.find((t) => t.startsWith("text/"));
        type5 && (text += await item.getType(type5).then((b) => readBlobText(b, window2.FileReader)));
      }
      return text;
    }
    async write(data) {
      this.items = data;
    }
    async writeText(text) {
      this.items = [
        createClipboardItem(window2, text)
      ];
    }
    constructor(...args) {
      super(...args), _define_property2(this, "items", []);
    }
  }(), {
    [ClipboardStubControl]: control
  });
}
function isClipboardStub(clipboard) {
  return !!clipboard?.[ClipboardStubControl];
}
function attachClipboardStubToView(window2) {
  if (isClipboardStub(window2.navigator.clipboard))
    return window2.navigator.clipboard[ClipboardStubControl];
  let realClipboard = Object.getOwnPropertyDescriptor(window2.navigator, "clipboard"), stub, control = {
    resetClipboardStub: () => {
      stub = createClipboardStub(window2, control);
    },
    detachClipboardStub: () => {
      realClipboard ? Object.defineProperty(window2.navigator, "clipboard", realClipboard) : Object.defineProperty(window2.navigator, "clipboard", {
        value: void 0,
        configurable: !0
      });
    }
  };
  return stub = createClipboardStub(window2, control), Object.defineProperty(window2.navigator, "clipboard", {
    get: () => stub,
    configurable: !0
  }), stub[ClipboardStubControl];
}
function resetClipboardStubOnView(window2) {
  isClipboardStub(window2.navigator.clipboard) && window2.navigator.clipboard[ClipboardStubControl].resetClipboardStub();
}
function detachClipboardStubFromView(window2) {
  isClipboardStub(window2.navigator.clipboard) && window2.navigator.clipboard[ClipboardStubControl].detachClipboardStub();
}
async function readDataTransferFromClipboard(document) {
  let window2 = document.defaultView, clipboard = window2?.navigator.clipboard, items = clipboard && await clipboard.read();
  if (!items)
    throw new Error("The Clipboard API is unavailable.");
  let dt = createDataTransfer(window2);
  for (let item of items)
    for (let type5 of item.types)
      dt.setData(type5, await item.getType(type5).then((b) => readBlobText(b, window2.FileReader)));
  return dt;
}
async function writeDataTransferToClipboard(document, clipboardData) {
  let window2 = getWindow(document), clipboard = window2.navigator.clipboard, items = [];
  for (let i = 0; i < clipboardData.items.length; i++) {
    let dtItem = clipboardData.items[i], blob = await getBlobFromDataTransferItem(window2, dtItem);
    items.push(createClipboardItem(window2, blob));
  }
  if (!(clipboard && await clipboard.write(items).then(
    () => !0,
    // Can happen with other implementations that e.g. require permissions
    /* istanbul ignore next */
    () => !1
  )))
    throw new Error("The Clipboard API is unavailable.");
}
var g = globalThis;
typeof g.afterEach == "function" && g.afterEach(() => {
  typeof globalThis.window < "u" && resetClipboardStubOnView(globalThis.window);
});
typeof g.afterAll == "function" && g.afterAll(() => {
  typeof globalThis.window < "u" && detachClipboardStubFromView(globalThis.window);
});

// ../../node_modules/@testing-library/user-event/dist/esm/utils/focus/selector.js
var FOCUSABLE_SELECTOR = [
  "input:not([type=hidden]):not([disabled])",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[contenteditable=""]',
  '[contenteditable="true"]',
  "a[href]",
  "[tabindex]:not([disabled])"
].join(", ");

// ../../node_modules/@testing-library/user-event/dist/esm/utils/focus/isFocusable.js
function isFocusable(element) {
  return element.matches(FOCUSABLE_SELECTOR);
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/cloneEvent.js
function cloneEvent(event) {
  return new event.constructor(event.type, event);
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/isDisabled.js
function isDisabled2(element) {
  for (let el = element; el; el = el.parentElement)
    if (isElementType(el, [
      "button",
      "input",
      "select",
      "textarea",
      "optgroup",
      "option"
    ])) {
      if (el.hasAttribute("disabled"))
        return !0;
    } else if (isElementType(el, "fieldset")) {
      var _el_querySelector;
      if (el.hasAttribute("disabled") && !(!((_el_querySelector = el.querySelector(":scope > legend")) === null || _el_querySelector === void 0) && _el_querySelector.contains(element)))
        return !0;
    } else if (el.tagName.includes("-") && el.constructor.formAssociated && el.hasAttribute("disabled"))
      return !0;
  return !1;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/focus/getActiveElement.js
function getActiveElement(document) {
  let activeElement = document.activeElement;
  return activeElement?.shadowRoot ? getActiveElement(activeElement.shadowRoot) : isDisabled2(activeElement) ? document.ownerDocument ? (
    /* istanbul ignore next */
    document.ownerDocument.body
  ) : document.body : activeElement;
}
function getActiveElementOrBody(document) {
  var _getActiveElement;
  return (_getActiveElement = getActiveElement(document)) !== null && _getActiveElement !== void 0 ? _getActiveElement : (
    /* istanbul ignore next */
    document.body
  );
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/findClosest.js
function findClosest(element, callback) {
  let el = element;
  do {
    if (callback(el))
      return el;
    el = el.parentElement;
  } while (el && el !== element.ownerDocument.body);
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/edit/isContentEditable.js
function isContentEditable(element) {
  return element.hasAttribute("contenteditable") && (element.getAttribute("contenteditable") == "true" || element.getAttribute("contenteditable") == "");
}
function getContentEditable(node) {
  let element = getElement(node);
  return element && (element.closest('[contenteditable=""]') || element.closest('[contenteditable="true"]'));
}
function getElement(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/click/isClickableInput.js
var clickableInputTypes = (function(clickableInputTypes2) {
  return clickableInputTypes2.button = "button", clickableInputTypes2.color = "color", clickableInputTypes2.file = "file", clickableInputTypes2.image = "image", clickableInputTypes2.reset = "reset", clickableInputTypes2.submit = "submit", clickableInputTypes2.checkbox = "checkbox", clickableInputTypes2.radio = "radio", clickableInputTypes2;
})(clickableInputTypes || {});
function isClickableInput(element) {
  return isElementType(element, "button") || isElementType(element, "input") && element.type in clickableInputTypes;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/edit/isEditable.js
function isEditable(element) {
  return isEditableInputOrTextArea(element) && !element.readOnly || isContentEditable(element);
}
var editableInputTypes = (function(editableInputTypes2) {
  return editableInputTypes2.text = "text", editableInputTypes2.date = "date", editableInputTypes2["datetime-local"] = "datetime-local", editableInputTypes2.email = "email", editableInputTypes2.month = "month", editableInputTypes2.number = "number", editableInputTypes2.password = "password", editableInputTypes2.search = "search", editableInputTypes2.tel = "tel", editableInputTypes2.time = "time", editableInputTypes2.url = "url", editableInputTypes2.week = "week", editableInputTypes2;
})(editableInputTypes || {});
function isEditableInputOrTextArea(element) {
  return isElementType(element, "textarea") || isElementType(element, "input") && element.type in editableInputTypes;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/focus/selection.js
function hasOwnSelection(node) {
  return isElement2(node) && isEditableInputOrTextArea(node);
}
function hasNoSelection(node) {
  return isElement2(node) && isClickableInput(node);
}
function isElement2(node) {
  return node.nodeType === 1;
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/updateSelectionOnFocus.js
function updateSelectionOnFocus(element) {
  let selection = element.ownerDocument.getSelection();
  if (selection?.focusNode && hasOwnSelection(element)) {
    let contenteditable = getContentEditable(selection.focusNode);
    if (contenteditable) {
      if (!selection.isCollapsed) {
        var _contenteditable_firstChild;
        let focusNode = ((_contenteditable_firstChild = contenteditable.firstChild) === null || _contenteditable_firstChild === void 0 ? void 0 : _contenteditable_firstChild.nodeType) === 3 ? contenteditable.firstChild : contenteditable;
        selection.setBaseAndExtent(focusNode, 0, focusNode, 0);
      }
    } else
      selection.setBaseAndExtent(element, 0, element, 0);
  }
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/wrapEvent.js
import { getConfig } from "@testing-library/dom";
function wrapEvent(cb, _element) {
  return getConfig().eventWrapper(cb);
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/focus.js
function focusElement(element) {
  let target = findClosest(element, isFocusable), activeElement = getActiveElement(element.ownerDocument);
  (target ?? element.ownerDocument.body) !== activeElement && (target ? wrapEvent(() => target.focus()) : wrapEvent(() => activeElement?.blur()), updateSelectionOnFocus(target ?? element.ownerDocument.body));
}
function blurElement(element) {
  !isFocusable(element) || !(getActiveElement(element.ownerDocument) === element) || wrapEvent(() => element.blur());
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/registry.js
var behavior = {};

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/click.js
behavior.click = (event, target, instance) => {
  let context = target.closest("button,input,label,select,textarea"), control = context && isElementType(context, "label") && context.control;
  if (control && control !== target)
    return () => {
      isFocusable(control) && (focusElement(control), instance.dispatchEvent(control, cloneEvent(event)));
    };
  if (isElementType(target, "input", {
    type: "file"
  }))
    return () => {
      blurElement(target), target.dispatchEvent(new (getWindow(target)).Event("fileDialog")), focusElement(target);
    };
};

// ../../node_modules/@testing-library/user-event/dist/esm/document/UI.js
var UIValue = /* @__PURE__ */ Symbol("Displayed value in UI"), UISelection = /* @__PURE__ */ Symbol("Displayed selection in UI"), InitialValue = /* @__PURE__ */ Symbol("Initial value to compare on blur");
function isUIValue(value) {
  return typeof value == "object" && UIValue in value;
}
function isUISelectionStart(start) {
  return !!start && typeof start == "object" && UISelection in start;
}
function setUIValue(element, value) {
  element[InitialValue] === void 0 && (element[InitialValue] = element.value), element[UIValue] = value, element.value = Object.assign(new String(value), {
    [UIValue]: !0
  });
}
function getUIValue(element) {
  return element[UIValue] === void 0 ? element.value : String(element[UIValue]);
}
function setUIValueClean(element) {
  element[UIValue] = void 0;
}
function clearInitialValue(element) {
  element[InitialValue] = void 0;
}
function getInitialValue(element) {
  return element[InitialValue];
}
function setUISelectionRaw(element, selection) {
  element[UISelection] = selection;
}
function setUISelection(element, { focusOffset: focusOffsetParam, anchorOffset: anchorOffsetParam = focusOffsetParam }, mode = "replace") {
  let valueLength = getUIValue(element).length, sanitizeOffset = (o) => Math.max(0, Math.min(valueLength, o)), anchorOffset = mode === "replace" || element[UISelection] === void 0 ? sanitizeOffset(anchorOffsetParam) : element[UISelection].anchorOffset, focusOffset = sanitizeOffset(focusOffsetParam), startOffset = Math.min(anchorOffset, focusOffset), endOffset = Math.max(anchorOffset, focusOffset);
  if (element[UISelection] = {
    anchorOffset,
    focusOffset
  }, element.selectionStart === startOffset && element.selectionEnd === endOffset)
    return;
  let startObj = Object.assign(new Number(startOffset), {
    [UISelection]: !0
  });
  try {
    element.setSelectionRange(startObj, endOffset);
  } catch {
  }
}
function getUISelection(element) {
  var _element_selectionStart, _element_selectionEnd, _element_UISelection;
  let sel = (_element_UISelection = element[UISelection]) !== null && _element_UISelection !== void 0 ? _element_UISelection : {
    anchorOffset: (_element_selectionStart = element.selectionStart) !== null && _element_selectionStart !== void 0 ? _element_selectionStart : 0,
    focusOffset: (_element_selectionEnd = element.selectionEnd) !== null && _element_selectionEnd !== void 0 ? _element_selectionEnd : 0
  };
  return {
    ...sel,
    startOffset: Math.min(sel.anchorOffset, sel.focusOffset),
    endOffset: Math.max(sel.anchorOffset, sel.focusOffset)
  };
}
function hasUISelection(element) {
  return !!element[UISelection];
}
function setUISelectionClean(element) {
  element[UISelection] = void 0;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/edit/timeValue.js
var parseInt = globalThis.parseInt;
function buildTimeValue(value) {
  let onlyDigitsValue = value.replace(/\D/g, "");
  if (onlyDigitsValue.length < 2)
    return value;
  let firstDigit = parseInt(onlyDigitsValue[0], 10), secondDigit = parseInt(onlyDigitsValue[1], 10);
  if (firstDigit >= 3 || firstDigit === 2 && secondDigit >= 4) {
    let index;
    return firstDigit >= 3 ? index = 1 : index = 2, build(onlyDigitsValue, index);
  }
  return value.length === 2 ? value : build(onlyDigitsValue, 2);
}
function build(onlyDigitsValue, index) {
  let hours = onlyDigitsValue.slice(0, index), validHours = Math.min(parseInt(hours, 10), 23), minuteCharacters = onlyDigitsValue.slice(index), parsedMinutes = parseInt(minuteCharacters, 10), validMinutes = Math.min(parsedMinutes, 59);
  return `${validHours.toString().padStart(2, "0")}:${validMinutes.toString().padStart(2, "0")}`;
}
function isValidDateOrTimeValue(element, value) {
  let clone2 = element.cloneNode();
  return clone2.value = value, clone2.value === value;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/edit/maxLength.js
var maxLengthSupportedTypes = (function(maxLengthSupportedTypes2) {
  return maxLengthSupportedTypes2.email = "email", maxLengthSupportedTypes2.password = "password", maxLengthSupportedTypes2.search = "search", maxLengthSupportedTypes2.telephone = "telephone", maxLengthSupportedTypes2.text = "text", maxLengthSupportedTypes2.url = "url", maxLengthSupportedTypes2;
})(maxLengthSupportedTypes || {});
function getMaxLength(element) {
  var _element_getAttribute;
  let attr = (_element_getAttribute = element.getAttribute("maxlength")) !== null && _element_getAttribute !== void 0 ? _element_getAttribute : "";
  return /^\d+$/.test(attr) && Number(attr) >= 0 ? Number(attr) : void 0;
}
function supportsMaxLength(element) {
  return isElementType(element, "textarea") || isElementType(element, "input") && element.type in maxLengthSupportedTypes;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/focus/cursor.js
function getNextCursorPosition(node, offset, direction, inputType) {
  if (isTextNode(node) && offset + direction >= 0 && offset + direction <= node.nodeValue.length)
    return {
      node,
      offset: offset + direction
    };
  let nextNode = getNextCharacterContentNode(node, offset, direction);
  if (nextNode) {
    if (isTextNode(nextNode))
      return {
        node: nextNode,
        offset: direction > 0 ? Math.min(1, nextNode.nodeValue.length) : Math.max(nextNode.nodeValue.length - 1, 0)
      };
    if (isElementType(nextNode, "br")) {
      let nextPlusOne = getNextCharacterContentNode(nextNode, void 0, direction);
      return nextPlusOne ? isTextNode(nextPlusOne) ? {
        node: nextPlusOne,
        offset: direction > 0 ? 0 : nextPlusOne.nodeValue.length
      } : direction < 0 && isElementType(nextPlusOne, "br") ? {
        node: nextNode.parentNode,
        offset: getOffset(nextNode)
      } : {
        node: nextPlusOne.parentNode,
        offset: getOffset(nextPlusOne) + (direction > 0 ? 0 : 1)
      } : direction < 0 && inputType === "deleteContentBackward" ? {
        node: nextNode.parentNode,
        offset: getOffset(nextNode)
      } : void 0;
    } else
      return {
        node: nextNode.parentNode,
        offset: getOffset(nextNode) + (direction > 0 ? 1 : 0)
      };
  }
}
function getNextCharacterContentNode(node, offset, direction) {
  let nextOffset = Number(offset) + (direction < 0 ? -1 : 0);
  return offset !== void 0 && isElement3(node) && nextOffset >= 0 && nextOffset < node.children.length && (node = node.children[nextOffset]), walkNodes(node, direction === 1 ? "next" : "previous", isTreatedAsCharacterContent);
}
function isTreatedAsCharacterContent(node) {
  if (isTextNode(node))
    return !0;
  if (isElement3(node)) {
    if (isElementType(node, [
      "input",
      "textarea"
    ]))
      return node.type !== "hidden";
    if (isElementType(node, "br"))
      return !0;
  }
  return !1;
}
function getOffset(node) {
  let i = 0;
  for (; node.previousSibling; )
    i++, node = node.previousSibling;
  return i;
}
function isElement3(node) {
  return node.nodeType === 1;
}
function isTextNode(node) {
  return node.nodeType === 3;
}
function walkNodes(node, direction, callback) {
  for (; ; ) {
    var _node_ownerDocument;
    let sibling = node[`${direction}Sibling`];
    if (sibling) {
      if (node = getDescendant(sibling, direction === "next" ? "first" : "last"), callback(node))
        return node;
    } else if (node.parentNode && (!isElement3(node.parentNode) || !isContentEditable(node.parentNode) && node.parentNode !== ((_node_ownerDocument = node.ownerDocument) === null || _node_ownerDocument === void 0 ? void 0 : _node_ownerDocument.body)))
      node = node.parentNode;
    else
      break;
  }
}
function getDescendant(node, direction) {
  for (; node.hasChildNodes(); )
    node = node[`${direction}Child`];
  return node;
}

// ../../node_modules/@testing-library/user-event/dist/esm/document/trackValue.js
var TrackChanges = /* @__PURE__ */ Symbol("Track programmatic changes for React workaround");
function isReact17Element(element) {
  return Object.getOwnPropertyNames(element).some((k) => k.startsWith("__react")) && getWindow(element).REACT_VERSION === 17;
}
function startTrackValue(element) {
  isReact17Element(element) && (element[TrackChanges] = {
    previousValue: String(element.value),
    tracked: []
  });
}
function trackOrSetValue(element, v) {
  var _element_TrackChanges_tracked, _element_TrackChanges;
  (_element_TrackChanges = element[TrackChanges]) === null || _element_TrackChanges === void 0 || (_element_TrackChanges_tracked = _element_TrackChanges.tracked) === null || _element_TrackChanges_tracked === void 0 || _element_TrackChanges_tracked.push(v), element[TrackChanges] || (setUIValueClean(element), setUISelection(element, {
    focusOffset: v.length
  }));
}
function commitValueAfterInput(element, cursorOffset) {
  var _changes_tracked;
  let changes = element[TrackChanges];
  if (element[TrackChanges] = void 0, !(!(changes == null || (_changes_tracked = changes.tracked) === null || _changes_tracked === void 0) && _changes_tracked.length))
    return;
  let isJustReactStateUpdate = changes.tracked.length === 2 && changes.tracked[0] === changes.previousValue && changes.tracked[1] === element.value;
  isJustReactStateUpdate || setUIValueClean(element), hasUISelection(element) && setUISelection(element, {
    focusOffset: isJustReactStateUpdate ? cursorOffset : element.value.length
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/getTargetTypeAndSelection.js
function getTargetTypeAndSelection(node) {
  let element = getElement2(node);
  if (element && hasOwnSelection(element))
    return {
      type: "input",
      selection: getUISelection(element)
    };
  let selection = element?.ownerDocument.getSelection();
  return {
    type: getContentEditable(node) && selection?.anchorNode && getContentEditable(selection.anchorNode) ? "contenteditable" : "default",
    selection
  };
}
function getElement2(node) {
  return node.nodeType === 1 ? node : node.parentElement;
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/getInputRange.js
function getInputRange(focusNode) {
  let typeAndSelection = getTargetTypeAndSelection(focusNode);
  if (typeAndSelection.type === "input")
    return typeAndSelection.selection;
  if (typeAndSelection.type === "contenteditable") {
    var _typeAndSelection_selection;
    return (_typeAndSelection_selection = typeAndSelection.selection) === null || _typeAndSelection_selection === void 0 ? void 0 : _typeAndSelection_selection.getRangeAt(0);
  }
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/setSelection.js
function setSelection({ focusNode, focusOffset, anchorNode = focusNode, anchorOffset = focusOffset }) {
  var _anchorNode_ownerDocument_getSelection, _anchorNode_ownerDocument;
  if (getTargetTypeAndSelection(focusNode).type === "input")
    return setUISelection(focusNode, {
      anchorOffset,
      focusOffset
    });
  (_anchorNode_ownerDocument = anchorNode.ownerDocument) === null || _anchorNode_ownerDocument === void 0 || (_anchorNode_ownerDocument_getSelection = _anchorNode_ownerDocument.getSelection()) === null || _anchorNode_ownerDocument_getSelection === void 0 || _anchorNode_ownerDocument_getSelection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/input.js
function isDateOrTime(element) {
  return isElementType(element, "input") && [
    "date",
    "time"
  ].includes(element.type);
}
function input(instance, element, data, inputType = "insertText") {
  let inputRange = getInputRange(element);
  inputRange && (!isDateOrTime(element) && !instance.dispatchUIEvent(element, "beforeinput", {
    inputType,
    data
  }) || ("startContainer" in inputRange ? editContenteditable(instance, element, inputRange, data, inputType) : editInputElement(instance, element, inputRange, data, inputType)));
}
function editContenteditable(instance, element, inputRange, data, inputType) {
  let del = !1;
  if (!inputRange.collapsed)
    del = !0, inputRange.deleteContents();
  else if ([
    "deleteContentBackward",
    "deleteContentForward"
  ].includes(inputType)) {
    let nextPosition = getNextCursorPosition(inputRange.startContainer, inputRange.startOffset, inputType === "deleteContentBackward" ? -1 : 1, inputType);
    if (nextPosition) {
      del = !0;
      let delRange = inputRange.cloneRange();
      delRange.comparePoint(nextPosition.node, nextPosition.offset) < 0 ? delRange.setStart(nextPosition.node, nextPosition.offset) : delRange.setEnd(nextPosition.node, nextPosition.offset), delRange.deleteContents();
    }
  }
  if (data)
    if (inputRange.endContainer.nodeType === 3) {
      let offset = inputRange.endOffset;
      inputRange.endContainer.insertData(offset, data), inputRange.setStart(inputRange.endContainer, offset + data.length), inputRange.setEnd(inputRange.endContainer, offset + data.length);
    } else {
      let text = element.ownerDocument.createTextNode(data);
      inputRange.insertNode(text), inputRange.setStart(text, data.length), inputRange.setEnd(text, data.length);
    }
  (del || data) && instance.dispatchUIEvent(element, "input", {
    inputType
  });
}
function editInputElement(instance, element, inputRange, data, inputType) {
  let dataToInsert = data;
  if (supportsMaxLength(element)) {
    let maxLength = getMaxLength(element);
    if (maxLength !== void 0 && data.length > 0) {
      let spaceUntilMaxLength = maxLength - element.value.length;
      if (spaceUntilMaxLength > 0)
        dataToInsert = data.substring(0, spaceUntilMaxLength);
      else
        return;
    }
  }
  let { newValue, newOffset, oldValue } = calculateNewValue(dataToInsert, element, inputRange, inputType);
  newValue === oldValue && newOffset === inputRange.startOffset && newOffset === inputRange.endOffset || isElementType(element, "input", {
    type: "number"
  }) && !isValidNumberInput(newValue) || (setUIValue(element, newValue), setSelection({
    focusNode: element,
    anchorOffset: newOffset,
    focusOffset: newOffset
  }), isDateOrTime(element) ? isValidDateOrTimeValue(element, newValue) && (commitInput(instance, element, newOffset, {}), instance.dispatchUIEvent(element, "change"), clearInitialValue(element)) : commitInput(instance, element, newOffset, {
    data,
    inputType
  }));
}
function calculateNewValue(inputData, node, { startOffset, endOffset }, inputType) {
  let value = getUIValue(node), prologEnd = Math.max(0, startOffset === endOffset && inputType === "deleteContentBackward" ? startOffset - 1 : startOffset), prolog = value.substring(0, prologEnd), epilogStart = Math.min(value.length, startOffset === endOffset && inputType === "deleteContentForward" ? startOffset + 1 : endOffset), epilog = value.substring(epilogStart, value.length), newValue = `${prolog}${inputData}${epilog}`, newOffset = prologEnd + inputData.length;
  if (isElementType(node, "input", {
    type: "time"
  })) {
    let builtValue = buildTimeValue(newValue);
    builtValue !== "" && isValidDateOrTimeValue(node, builtValue) && (newValue = builtValue, newOffset = builtValue.length);
  }
  return {
    oldValue: value,
    newValue,
    newOffset
  };
}
function commitInput(instance, element, newOffset, inputInit) {
  instance.dispatchUIEvent(element, "input", inputInit), commitValueAfterInput(element, newOffset);
}
function isValidNumberInput(value) {
  var _value_match, _value_match1;
  let valueParts = value.split("e", 2);
  return !(/[^\d.\-e]/.test(value) || Number((_value_match = value.match(/-/g)) === null || _value_match === void 0 ? void 0 : _value_match.length) > 2 || Number((_value_match1 = value.match(/\./g)) === null || _value_match1 === void 0 ? void 0 : _value_match1.length) > 1 || valueParts[1] && !/^-?\d*$/.test(valueParts[1]));
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/cut.js
behavior.cut = (event, target, instance) => () => {
  isEditable(target) && input(instance, target, "", "deleteByCut");
};

// ../../node_modules/@testing-library/user-event/dist/esm/document/getValueOrTextContent.js
function getValueOrTextContent(element) {
  return element ? isContentEditable(element) ? element.textContent : getUIValue(element) : null;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/isVisible.js
function isVisible(element) {
  let window2 = getWindow(element);
  for (let el = element; el?.ownerDocument; el = el.parentElement) {
    let { display: display2, visibility } = window2.getComputedStyle(el);
    if (display2 === "none" || visibility === "hidden")
      return !1;
  }
  return !0;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/focus/getTabDestination.js
function getTabDestination(activeElement, shift) {
  let document = activeElement.ownerDocument, focusableElements = document.querySelectorAll(FOCUSABLE_SELECTOR), enabledElements = Array.from(focusableElements).filter((el) => el === activeElement || !(Number(el.getAttribute("tabindex")) < 0 || isDisabled2(el)));
  Number(activeElement.getAttribute("tabindex")) >= 0 && enabledElements.sort((a2, b) => {
    let i = Number(a2.getAttribute("tabindex")), j = Number(b.getAttribute("tabindex"));
    return i === j ? 0 : i === 0 ? 1 : j === 0 ? -1 : i - j;
  });
  let checkedRadio = {}, prunedElements = [
    document.body
  ], activeRadioGroup = isElementType(activeElement, "input", {
    type: "radio"
  }) ? activeElement.name : void 0;
  enabledElements.forEach((currentElement) => {
    let el = currentElement;
    if (isElementType(el, "input", {
      type: "radio"
    }) && el.name) {
      if (el === activeElement) {
        prunedElements.push(el);
        return;
      } else if (el.name === activeRadioGroup)
        return;
      if (el.checked) {
        prunedElements = prunedElements.filter((e) => !isElementType(e, "input", {
          type: "radio",
          name: el.name
        })), prunedElements.push(el), checkedRadio[el.name] = el;
        return;
      }
      if (typeof checkedRadio[el.name] < "u")
        return;
    }
    prunedElements.push(el);
  });
  for (let index = prunedElements.findIndex((el) => el === activeElement); ; )
    if (index += shift ? -1 : 1, index === prunedElements.length ? index = 0 : index === -1 && (index = prunedElements.length - 1), prunedElements[index] === activeElement || prunedElements[index] === document.body || isVisible(prunedElements[index]))
      return prunedElements[index];
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/moveSelection.js
function moveSelection(node, direction) {
  if (hasOwnSelection(node)) {
    let selection = getUISelection(node);
    setSelection({
      focusNode: node,
      focusOffset: selection.startOffset === selection.endOffset ? selection.focusOffset + direction : direction < 0 ? selection.startOffset : selection.endOffset
    });
  } else {
    let selection = node.ownerDocument.getSelection();
    if (!selection?.focusNode)
      return;
    if (selection.isCollapsed) {
      let nextPosition = getNextCursorPosition(selection.focusNode, selection.focusOffset, direction);
      nextPosition && setSelection({
        focusNode: nextPosition.node,
        focusOffset: nextPosition.offset
      });
    } else
      selection[direction < 0 ? "collapseToStart" : "collapseToEnd"]();
  }
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/selectAll.js
function selectAll(target) {
  if (hasOwnSelection(target))
    return setSelection({
      focusNode: target,
      anchorOffset: 0,
      focusOffset: getUIValue(target).length
    });
  var _getContentEditable;
  let focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body;
  setSelection({
    focusNode,
    anchorOffset: 0,
    focusOffset: focusNode.childNodes.length
  });
}
function isAllSelected(target) {
  if (hasOwnSelection(target))
    return getUISelection(target).startOffset === 0 && getUISelection(target).endOffset === getUIValue(target).length;
  var _getContentEditable;
  let focusNode = (_getContentEditable = getContentEditable(target)) !== null && _getContentEditable !== void 0 ? _getContentEditable : target.ownerDocument.body, selection = target.ownerDocument.getSelection();
  return selection?.anchorNode === focusNode && selection.focusNode === focusNode && selection.anchorOffset === 0 && selection.focusOffset === focusNode.childNodes.length;
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/setSelectionRange.js
function setSelectionRange(element, anchorOffset, focusOffset) {
  var _element_firstChild;
  if (hasOwnSelection(element))
    return setSelection({
      focusNode: element,
      anchorOffset,
      focusOffset
    });
  if (isContentEditable(element) && ((_element_firstChild = element.firstChild) === null || _element_firstChild === void 0 ? void 0 : _element_firstChild.nodeType) === 3)
    return setSelection({
      focusNode: element.firstChild,
      anchorOffset,
      focusOffset
    });
  throw new Error("Not implemented. The result of this interaction is unreliable.");
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/radio.js
function walkRadio(instance, el, direction) {
  let window2 = getWindow(el), group = Array.from(el.ownerDocument.querySelectorAll(el.name ? `input[type="radio"][name="${window2.CSS.escape(el.name)}"]` : 'input[type="radio"][name=""], input[type="radio"]:not([name])'));
  for (let i = group.findIndex((e) => e === el) + direction; ; i += direction) {
    if (group[i] || (i = direction > 0 ? 0 : group.length - 1), group[i] === el)
      return;
    if (!isDisabled2(group[i])) {
      focusElement(group[i]), instance.dispatchUIEvent(group[i], "click");
      return;
    }
  }
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/keydown.js
behavior.keydown = (event, target, instance) => {
  var _keydownBehavior_event_key, _keydownBehavior_event_key1;
  return (_keydownBehavior_event_key1 = (_keydownBehavior_event_key = keydownBehavior[event.key]) === null || _keydownBehavior_event_key === void 0 ? void 0 : _keydownBehavior_event_key.call(keydownBehavior, event, target, instance)) !== null && _keydownBehavior_event_key1 !== void 0 ? _keydownBehavior_event_key1 : combinationBehavior(event, target, instance);
};
var keydownBehavior = {
  ArrowDown: (event, target, instance) => {
    if (isElementType(target, "input", {
      type: "radio"
    }))
      return () => walkRadio(instance, target, 1);
  },
  ArrowLeft: (event, target, instance) => isElementType(target, "input", {
    type: "radio"
  }) ? () => walkRadio(instance, target, -1) : () => moveSelection(target, -1),
  ArrowRight: (event, target, instance) => isElementType(target, "input", {
    type: "radio"
  }) ? () => walkRadio(instance, target, 1) : () => moveSelection(target, 1),
  ArrowUp: (event, target, instance) => {
    if (isElementType(target, "input", {
      type: "radio"
    }))
      return () => walkRadio(instance, target, -1);
  },
  Backspace: (event, target, instance) => {
    if (isEditable(target))
      return () => {
        input(instance, target, "", "deleteContentBackward");
      };
  },
  Delete: (event, target, instance) => {
    if (isEditable(target))
      return () => {
        input(instance, target, "", "deleteContentForward");
      };
  },
  End: (event, target) => {
    if (isElementType(target, [
      "input",
      "textarea"
    ]) || isContentEditable(target))
      return () => {
        var _getValueOrTextContent, _getValueOrTextContent_length;
        let newPos = (_getValueOrTextContent_length = (_getValueOrTextContent = getValueOrTextContent(target)) === null || _getValueOrTextContent === void 0 ? void 0 : _getValueOrTextContent.length) !== null && _getValueOrTextContent_length !== void 0 ? _getValueOrTextContent_length : (
          /* istanbul ignore next */
          0
        );
        setSelectionRange(target, newPos, newPos);
      };
  },
  Home: (event, target) => {
    if (isElementType(target, [
      "input",
      "textarea"
    ]) || isContentEditable(target))
      return () => {
        setSelectionRange(target, 0, 0);
      };
  },
  PageDown: (event, target) => {
    if (isElementType(target, [
      "input"
    ]))
      return () => {
        let newPos = getUIValue(target).length;
        setSelectionRange(target, newPos, newPos);
      };
  },
  PageUp: (event, target) => {
    if (isElementType(target, [
      "input"
    ]))
      return () => {
        setSelectionRange(target, 0, 0);
      };
  },
  Tab: (event, target, instance) => () => {
    let dest = getTabDestination(target, instance.system.keyboard.modifiers.Shift);
    focusElement(dest), hasOwnSelection(dest) && setUISelection(dest, {
      anchorOffset: 0,
      focusOffset: dest.value.length
    });
  }
}, combinationBehavior = (event, target, instance) => {
  if (event.code === "KeyA" && instance.system.keyboard.modifiers.Control)
    return () => selectAll(target);
};

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/keypress.js
behavior.keypress = (event, target, instance) => {
  if (event.key === "Enter") {
    if (isElementType(target, "button") || isElementType(target, "input") && ClickInputOnEnter.includes(target.type) || isElementType(target, "a") && target.href)
      return () => {
        instance.dispatchUIEvent(target, "click");
      };
    if (isElementType(target, "input")) {
      let form = target.form, submit = form?.querySelector('input[type="submit"], button:not([type]), button[type="submit"]');
      return submit ? () => instance.dispatchUIEvent(submit, "click") : form && SubmitSingleInputOnEnter.includes(target.type) && form.querySelectorAll("input").length === 1 ? () => instance.dispatchUIEvent(form, "submit") : void 0;
    }
  }
  if (isEditable(target)) {
    let inputType = event.key === "Enter" ? isContentEditable(target) && !instance.system.keyboard.modifiers.Shift ? "insertParagraph" : "insertLineBreak" : "insertText", inputData = event.key === "Enter" ? `
` : event.key;
    return () => input(instance, target, inputData, inputType);
  }
};
var ClickInputOnEnter = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit"
], SubmitSingleInputOnEnter = [
  "email",
  "month",
  "password",
  "search",
  "tel",
  "text",
  "url",
  "week"
];

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/keyup.js
behavior.keyup = (event, target, instance) => {
  var _keyupBehavior_event_key;
  return (_keyupBehavior_event_key = keyupBehavior[event.key]) === null || _keyupBehavior_event_key === void 0 ? void 0 : _keyupBehavior_event_key.call(keyupBehavior, event, target, instance);
};
var keyupBehavior = {
  " ": (event, target, instance) => {
    if (isClickableInput(target))
      return () => instance.dispatchUIEvent(target, "click");
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/event/behavior/paste.js
behavior.paste = (event, target, instance) => {
  if (isEditable(target))
    return () => {
      var _event_clipboardData;
      let insertData = (_event_clipboardData = event.clipboardData) === null || _event_clipboardData === void 0 ? void 0 : _event_clipboardData.getData("text");
      insertData && input(instance, target, insertData, "insertFromPaste");
    };
};

// ../../node_modules/@testing-library/user-event/dist/esm/event/eventMap.js
var eventMap = {
  auxclick: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  beforeinput: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  blur: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: !1,
      cancelable: !1,
      composed: !0
    }
  },
  click: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  contextmenu: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  copy: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  change: {
    EventType: "Event",
    defaultInit: {
      bubbles: !0,
      cancelable: !1
    }
  },
  cut: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  dblclick: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  focus: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: !1,
      cancelable: !1,
      composed: !0
    }
  },
  focusin: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !1,
      composed: !0
    }
  },
  focusout: {
    EventType: "FocusEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !1,
      composed: !0
    }
  },
  keydown: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  keypress: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  keyup: {
    EventType: "KeyboardEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  paste: {
    EventType: "ClipboardEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  input: {
    EventType: "InputEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !1,
      composed: !0
    }
  },
  mousedown: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  mouseenter: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !1,
      cancelable: !1,
      composed: !0
    }
  },
  mouseleave: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !1,
      cancelable: !1,
      composed: !0
    }
  },
  mousemove: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  mouseout: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  mouseover: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  mouseup: {
    EventType: "MouseEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  pointerover: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  pointerenter: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !1,
      cancelable: !1
    }
  },
  pointerdown: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  pointermove: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  pointerup: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  pointercancel: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !1,
      composed: !0
    }
  },
  pointerout: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }
  },
  pointerleave: {
    EventType: "PointerEvent",
    defaultInit: {
      bubbles: !1,
      cancelable: !1
    }
  },
  submit: {
    EventType: "Event",
    defaultInit: {
      bubbles: !0,
      cancelable: !0
    }
  }
};
function getEventClass(type5) {
  return eventMap[type5].EventType;
}
var mouseEvents = [
  "MouseEvent",
  "PointerEvent"
];
function isMouseEvent(type5) {
  return mouseEvents.includes(getEventClass(type5));
}
function isKeyboardEvent(type5) {
  return getEventClass(type5) === "KeyboardEvent";
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/createEvent.js
var eventInitializer = {
  ClipboardEvent: [
    initClipboardEvent
  ],
  Event: [],
  FocusEvent: [
    initUIEvent,
    initFocusEvent
  ],
  InputEvent: [
    initUIEvent,
    initInputEvent
  ],
  MouseEvent: [
    initUIEvent,
    initUIEventModifiers,
    initMouseEvent
  ],
  PointerEvent: [
    initUIEvent,
    initUIEventModifiers,
    initMouseEvent,
    initPointerEvent
  ],
  KeyboardEvent: [
    initUIEvent,
    initUIEventModifiers,
    initKeyboardEvent
  ]
};
function createEvent(type5, target, init) {
  let window2 = getWindow(target), { EventType, defaultInit } = eventMap[type5], event = new (getEventConstructors(window2))[EventType](type5, defaultInit);
  var eventInit = {};
  for (var key in init)
    Object.prototype.hasOwnProperty.call(init, key) && (eventInit[key] = init[key]);
  return eventInit.view = window2, eventInitializer[EventType].forEach(function(f3) {
    f3(event, eventInit);
  }), event;
}
function getEventConstructors(window2) {
  var _window_Event;
  let Event = (_window_Event = window2.Event) !== null && _window_Event !== void 0 ? _window_Event : class {
  };
  var _window_AnimationEvent;
  let AnimationEvent = (_window_AnimationEvent = window2.AnimationEvent) !== null && _window_AnimationEvent !== void 0 ? _window_AnimationEvent : class extends Event {
  };
  var _window_ClipboardEvent;
  let ClipboardEvent = (_window_ClipboardEvent = window2.ClipboardEvent) !== null && _window_ClipboardEvent !== void 0 ? _window_ClipboardEvent : class extends Event {
  };
  var _window_PopStateEvent;
  let PopStateEvent = (_window_PopStateEvent = window2.PopStateEvent) !== null && _window_PopStateEvent !== void 0 ? _window_PopStateEvent : class extends Event {
  };
  var _window_ProgressEvent;
  let ProgressEvent = (_window_ProgressEvent = window2.ProgressEvent) !== null && _window_ProgressEvent !== void 0 ? _window_ProgressEvent : class extends Event {
  };
  var _window_TransitionEvent;
  let TransitionEvent = (_window_TransitionEvent = window2.TransitionEvent) !== null && _window_TransitionEvent !== void 0 ? _window_TransitionEvent : class extends Event {
  };
  var _window_UIEvent;
  let UIEvent = (_window_UIEvent = window2.UIEvent) !== null && _window_UIEvent !== void 0 ? _window_UIEvent : class extends Event {
  };
  var _window_CompositionEvent;
  let CompositionEvent = (_window_CompositionEvent = window2.CompositionEvent) !== null && _window_CompositionEvent !== void 0 ? _window_CompositionEvent : class extends UIEvent {
  };
  var _window_FocusEvent;
  let FocusEvent = (_window_FocusEvent = window2.FocusEvent) !== null && _window_FocusEvent !== void 0 ? _window_FocusEvent : class extends UIEvent {
  };
  var _window_InputEvent;
  let InputEvent = (_window_InputEvent = window2.InputEvent) !== null && _window_InputEvent !== void 0 ? _window_InputEvent : class extends UIEvent {
  };
  var _window_KeyboardEvent;
  let KeyboardEvent = (_window_KeyboardEvent = window2.KeyboardEvent) !== null && _window_KeyboardEvent !== void 0 ? _window_KeyboardEvent : class extends UIEvent {
  };
  var _window_MouseEvent;
  let MouseEvent = (_window_MouseEvent = window2.MouseEvent) !== null && _window_MouseEvent !== void 0 ? _window_MouseEvent : class extends UIEvent {
  };
  var _window_DragEvent;
  let DragEvent = (_window_DragEvent = window2.DragEvent) !== null && _window_DragEvent !== void 0 ? _window_DragEvent : class extends MouseEvent {
  };
  var _window_PointerEvent;
  let PointerEvent = (_window_PointerEvent = window2.PointerEvent) !== null && _window_PointerEvent !== void 0 ? _window_PointerEvent : class extends MouseEvent {
  };
  var _window_TouchEvent;
  let TouchEvent = (_window_TouchEvent = window2.TouchEvent) !== null && _window_TouchEvent !== void 0 ? _window_TouchEvent : class extends UIEvent {
  };
  return {
    Event,
    AnimationEvent,
    ClipboardEvent,
    PopStateEvent,
    ProgressEvent,
    TransitionEvent,
    UIEvent,
    CompositionEvent,
    FocusEvent,
    InputEvent,
    KeyboardEvent,
    MouseEvent,
    DragEvent,
    PointerEvent,
    TouchEvent
  };
}
function assignProps(obj, props) {
  for (let [key, value] of Object.entries(props))
    Object.defineProperty(obj, key, {
      get: () => value ?? null
    });
}
function sanitizeNumber(n) {
  return Number(n ?? 0);
}
function initClipboardEvent(event, { clipboardData }) {
  assignProps(event, {
    clipboardData
  });
}
function initFocusEvent(event, { relatedTarget }) {
  assignProps(event, {
    relatedTarget
  });
}
function initInputEvent(event, { data, inputType, isComposing }) {
  assignProps(event, {
    data,
    isComposing: !!isComposing,
    inputType: String(inputType)
  });
}
function initUIEvent(event, { view, detail }) {
  assignProps(event, {
    view,
    detail: sanitizeNumber(detail ?? 0)
  });
}
function initUIEventModifiers(event, { altKey, ctrlKey, metaKey, shiftKey, modifierAltGraph, modifierCapsLock, modifierFn, modifierFnLock, modifierNumLock, modifierScrollLock, modifierSymbol, modifierSymbolLock }) {
  assignProps(event, {
    altKey: !!altKey,
    ctrlKey: !!ctrlKey,
    metaKey: !!metaKey,
    shiftKey: !!shiftKey,
    getModifierState(k) {
      return !!{
        Alt: altKey,
        AltGraph: modifierAltGraph,
        CapsLock: modifierCapsLock,
        Control: ctrlKey,
        Fn: modifierFn,
        FnLock: modifierFnLock,
        Meta: metaKey,
        NumLock: modifierNumLock,
        ScrollLock: modifierScrollLock,
        Shift: shiftKey,
        Symbol: modifierSymbol,
        SymbolLock: modifierSymbolLock
      }[k];
    }
  });
}
function initKeyboardEvent(event, { key, code, location, repeat, isComposing, charCode }) {
  assignProps(event, {
    key: String(key),
    code: String(code),
    location: sanitizeNumber(location),
    repeat: !!repeat,
    isComposing: !!isComposing,
    charCode
  });
}
function initMouseEvent(event, { x, y, screenX, screenY, clientX = x, clientY = y, button, buttons, relatedTarget, offsetX, offsetY, pageX, pageY }) {
  assignProps(event, {
    screenX: sanitizeNumber(screenX),
    screenY: sanitizeNumber(screenY),
    clientX: sanitizeNumber(clientX),
    x: sanitizeNumber(clientX),
    clientY: sanitizeNumber(clientY),
    y: sanitizeNumber(clientY),
    button: sanitizeNumber(button),
    buttons: sanitizeNumber(buttons),
    relatedTarget,
    offsetX: sanitizeNumber(offsetX),
    offsetY: sanitizeNumber(offsetY),
    pageX: sanitizeNumber(pageX),
    pageY: sanitizeNumber(pageY)
  });
}
function initPointerEvent(event, { pointerId, width, height, pressure, tangentialPressure, tiltX, tiltY, twist, pointerType, isPrimary }) {
  assignProps(event, {
    pointerId: sanitizeNumber(pointerId),
    width: sanitizeNumber(width ?? 1),
    height: sanitizeNumber(height ?? 1),
    pressure: sanitizeNumber(pressure),
    tangentialPressure: sanitizeNumber(tangentialPressure),
    tiltX: sanitizeNumber(tiltX),
    tiltY: sanitizeNumber(tiltY),
    twist: sanitizeNumber(twist),
    pointerType: String(pointerType),
    isPrimary: !!isPrimary
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/dispatchEvent.js
function dispatchUIEvent(target, type5, init, preventDefault = !1) {
  (isMouseEvent(type5) || isKeyboardEvent(type5)) && (init = {
    ...init,
    ...this.system.getUIEventModifiers()
  });
  let event = createEvent(type5, target, init);
  return dispatchEvent.call(this, target, event, preventDefault);
}
function dispatchEvent(target, event, preventDefault = !1) {
  var _behavior_type;
  let type5 = event.type, behaviorImplementation = preventDefault ? () => {
  } : (_behavior_type = behavior[type5]) === null || _behavior_type === void 0 ? void 0 : _behavior_type.call(behavior, event, target, this);
  if (behaviorImplementation) {
    event.preventDefault();
    let defaultPrevented = !1;
    return Object.defineProperty(event, "defaultPrevented", {
      get: () => defaultPrevented
    }), Object.defineProperty(event, "preventDefault", {
      value: () => {
        defaultPrevented = event.cancelable;
      }
    }), wrapEvent(() => target.dispatchEvent(event)), defaultPrevented || behaviorImplementation(), !defaultPrevented;
  }
  return wrapEvent(() => target.dispatchEvent(event));
}
function dispatchDOMEvent(target, type5, init) {
  let event = createEvent(type5, target, init);
  wrapEvent(() => target.dispatchEvent(event));
}

// ../../node_modules/@testing-library/user-event/dist/esm/document/patchFocus.js
import "@testing-library/dom";
var patched = /* @__PURE__ */ Symbol("patched focus/blur methods");
function patchFocus(HTMLElement2) {
  if (HTMLElement2.prototype[patched])
    return;
  let { focus, blur } = HTMLElement2.prototype;
  Object.defineProperties(HTMLElement2.prototype, {
    focus: {
      configurable: !0,
      get: () => patchedFocus
    },
    blur: {
      configurable: !0,
      get: () => patchedBlur
    },
    [patched]: {
      configurable: !0,
      get: () => ({
        focus,
        blur
      })
    }
  });
  let activeCall;
  function patchedFocus(options) {
    if (this.ownerDocument.visibilityState !== "hidden")
      return focus.call(this, options);
    let blurred = getActiveTarget(this.ownerDocument);
    if (blurred === this)
      return;
    let thisCall = /* @__PURE__ */ Symbol("focus call");
    activeCall = thisCall, blurred && (blur.call(blurred), dispatchDOMEvent(blurred, "blur", {
      relatedTarget: this
    }), dispatchDOMEvent(blurred, "focusout", {
      relatedTarget: activeCall === thisCall ? this : null
    })), activeCall === thisCall && (focus.call(this, options), dispatchDOMEvent(this, "focus", {
      relatedTarget: blurred
    })), activeCall === thisCall && dispatchDOMEvent(this, "focusin", {
      relatedTarget: blurred
    });
  }
  function patchedBlur() {
    if (this.ownerDocument.visibilityState !== "hidden")
      return blur.call(this);
    let blurred = getActiveTarget(this.ownerDocument);
    if (blurred !== this)
      return;
    activeCall = /* @__PURE__ */ Symbol("blur call"), blur.call(this), dispatchDOMEvent(blurred, "blur", {
      relatedTarget: null
    }), dispatchDOMEvent(blurred, "focusout", {
      relatedTarget: null
    });
  }
}
function getActiveTarget(document) {
  let active = getActiveElement(document);
  return active?.tagName === "BODY" ? null : active;
}

// ../../node_modules/@testing-library/user-event/dist/esm/document/prepareDocument.js
import "@testing-library/dom";

// ../../node_modules/@testing-library/user-event/dist/esm/document/interceptor.js
var Interceptor = /* @__PURE__ */ Symbol("Interceptor for programmatical calls");
function prepareInterceptor(element, propName, interceptorImpl) {
  let prototypeDescriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, propName), objectDescriptor = Object.getOwnPropertyDescriptor(element, propName), target = prototypeDescriptor?.set ? "set" : "value";
  if (typeof prototypeDescriptor?.[target] != "function" || prototypeDescriptor[target][Interceptor])
    throw new Error(`Element ${element.tagName} does not implement "${String(propName)}".`);
  function intercept(...args) {
    let { applyNative = !1, realArgs, then } = interceptorImpl.call(this, ...args), realFunc = (!applyNative && objectDescriptor || prototypeDescriptor)[target];
    target === "set" ? realFunc.call(this, realArgs) : realFunc.call(this, ...realArgs), then?.();
  }
  intercept[Interceptor] = Interceptor, Object.defineProperty(element, propName, {
    ...objectDescriptor ?? prototypeDescriptor,
    [target]: intercept
  });
}
function prepareValueInterceptor(element) {
  prepareInterceptor(element, "value", function(v) {
    let isUI = isUIValue(v);
    return isUI && startTrackValue(this), {
      applyNative: !!isUI,
      realArgs: sanitizeValue(this, v),
      then: isUI ? void 0 : () => trackOrSetValue(this, String(v))
    };
  });
}
function sanitizeValue(element, v) {
  return isElementType(element, "input", {
    type: "number"
  }) && String(v) !== "" && !Number.isNaN(Number(v)) ? String(Number(v)) : String(v);
}
function prepareSelectionInterceptor(element) {
  prepareInterceptor(element, "setSelectionRange", function(start, ...others) {
    let isUI = isUISelectionStart(start);
    return {
      applyNative: !!isUI,
      realArgs: [
        Number(start),
        ...others
      ],
      then: () => isUI ? void 0 : setUISelectionClean(element)
    };
  }), prepareInterceptor(element, "selectionStart", function(v) {
    return {
      realArgs: v,
      then: () => setUISelectionClean(element)
    };
  }), prepareInterceptor(element, "selectionEnd", function(v) {
    return {
      realArgs: v,
      then: () => setUISelectionClean(element)
    };
  }), prepareInterceptor(element, "select", function() {
    return {
      realArgs: [],
      then: () => setUISelectionRaw(element, {
        anchorOffset: 0,
        focusOffset: getUIValue(element).length
      })
    };
  });
}
function prepareRangeTextInterceptor(element) {
  prepareInterceptor(element, "setRangeText", function(...realArgs) {
    return {
      realArgs,
      then: () => {
        setUIValueClean(element), setUISelectionClean(element);
      }
    };
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/document/prepareDocument.js
var isPrepared = /* @__PURE__ */ Symbol("Node prepared with document state workarounds");
function prepareDocument(document) {
  document[isPrepared] || (document.addEventListener("focus", (e) => {
    let el = e.target;
    prepareElement(el);
  }, {
    capture: !0,
    passive: !0
  }), document.activeElement && prepareElement(document.activeElement), document.addEventListener("blur", (e) => {
    let el = e.target, initialValue = getInitialValue(el);
    initialValue !== void 0 && (el.value !== initialValue && dispatchDOMEvent(el, "change"), clearInitialValue(el));
  }, {
    capture: !0,
    passive: !0
  }), document[isPrepared] = isPrepared);
}
function prepareElement(el) {
  el[isPrepared] || (isElementType(el, [
    "input",
    "textarea"
  ]) && (prepareValueInterceptor(el), prepareSelectionInterceptor(el), prepareRangeTextInterceptor(el)), el[isPrepared] = isPrepared);
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/getDocumentFromNode.js
function getDocumentFromNode(el) {
  return isDocument2(el) ? el : el.ownerDocument;
}
function isDocument2(node) {
  return node.nodeType === 9;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/level.js
var ApiLevel = (function(ApiLevel2) {
  return ApiLevel2[ApiLevel2.Trigger = 2] = "Trigger", ApiLevel2[ApiLevel2.Call = 1] = "Call", ApiLevel2;
})({});
function setLevelRef(instance, level) {
  instance.levelRefs[level] = {};
}
function getLevelRef(instance, level) {
  return instance.levelRefs[level];
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/wait.js
function wait(config2) {
  let delay = config2.delay;
  if (typeof delay == "number")
    return Promise.all([
      new Promise((resolve) => globalThis.setTimeout(() => resolve(), delay)),
      config2.advanceTimers(delay)
    ]);
}

// ../../node_modules/@testing-library/user-event/dist/esm/options.js
var PointerEventsCheckLevel = (function(PointerEventsCheckLevel2) {
  return PointerEventsCheckLevel2[PointerEventsCheckLevel2.EachTrigger = 4] = "EachTrigger", PointerEventsCheckLevel2[PointerEventsCheckLevel2.EachApiCall = 2] = "EachApiCall", PointerEventsCheckLevel2[PointerEventsCheckLevel2.EachTarget = 1] = "EachTarget", PointerEventsCheckLevel2[PointerEventsCheckLevel2.Never = 0] = "Never", PointerEventsCheckLevel2;
})({});

// ../../node_modules/@testing-library/user-event/dist/esm/setup/setup.js
import "@testing-library/dom";

// ../../node_modules/@testing-library/user-event/dist/esm/system/keyboard.js
function _define_property3(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var DOM_KEY_LOCATION = (function(DOM_KEY_LOCATION2) {
  return DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.STANDARD = 0] = "STANDARD", DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.LEFT = 1] = "LEFT", DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.RIGHT = 2] = "RIGHT", DOM_KEY_LOCATION2[DOM_KEY_LOCATION2.NUMPAD = 3] = "NUMPAD", DOM_KEY_LOCATION2;
})({}), modifierKeys = [
  "Alt",
  "AltGraph",
  "Control",
  "Fn",
  "Meta",
  "Shift",
  "Symbol"
];
function isModifierKey(key) {
  return modifierKeys.includes(key);
}
var modifierLocks = [
  "CapsLock",
  "FnLock",
  "NumLock",
  "ScrollLock",
  "SymbolLock"
];
function isModifierLock(key) {
  return modifierLocks.includes(key);
}
var KeyboardHost = class {
  isKeyPressed(keyDef) {
    return this.pressed.has(String(keyDef.code));
  }
  getPressedKeys() {
    return this.pressed.values().map((p2) => p2.keyDef);
  }
  /** Press a key */
  async keydown(instance, keyDef) {
    let key = String(keyDef.key), code = String(keyDef.code), target = getActiveElementOrBody(instance.config.document);
    this.setKeydownTarget(target), this.pressed.add(code, keyDef), isModifierKey(key) && (this.modifiers[key] = !0);
    let unprevented = instance.dispatchUIEvent(target, "keydown", {
      key,
      code
    });
    isModifierLock(key) && !this.modifiers[key] && (this.modifiers[key] = !0, this.modifierLockStart[key] = !0), unprevented && this.pressed.setUnprevented(code), unprevented && this.hasKeyPress(key) && instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keypress", {
      key,
      code,
      charCode: keyDef.key === "Enter" ? 13 : String(keyDef.key).charCodeAt(0)
    });
  }
  /** Release a key */
  async keyup(instance, keyDef) {
    let key = String(keyDef.key), code = String(keyDef.code), unprevented = this.pressed.isUnprevented(code);
    this.pressed.delete(code), isModifierKey(key) && !this.pressed.values().find((p2) => p2.keyDef.key === key) && (this.modifiers[key] = !1), instance.dispatchUIEvent(getActiveElementOrBody(instance.config.document), "keyup", {
      key,
      code
    }, !unprevented), isModifierLock(key) && this.modifiers[key] && (this.modifierLockStart[key] ? this.modifierLockStart[key] = !1 : this.modifiers[key] = !1);
  }
  setKeydownTarget(target) {
    target !== this.lastKeydownTarget && (this.carryChar = ""), this.lastKeydownTarget = target;
  }
  hasKeyPress(key) {
    return (key.length === 1 || key === "Enter") && !this.modifiers.Control && !this.modifiers.Alt;
  }
  constructor(system) {
    _define_property3(this, "system", void 0), _define_property3(this, "modifiers", {
      Alt: !1,
      AltGraph: !1,
      CapsLock: !1,
      Control: !1,
      Fn: !1,
      FnLock: !1,
      Meta: !1,
      NumLock: !1,
      ScrollLock: !1,
      Shift: !1,
      Symbol: !1,
      SymbolLock: !1
    }), _define_property3(this, "pressed", new class {
      add(code, keyDef) {
        var _this_registry, _code, _;
        (_ = (_this_registry = this.registry)[_code = code]) !== null && _ !== void 0 || (_this_registry[_code] = {
          keyDef,
          unpreventedDefault: !1
        });
      }
      has(code) {
        return !!this.registry[code];
      }
      setUnprevented(code) {
        let o = this.registry[code];
        o && (o.unpreventedDefault = !0);
      }
      isUnprevented(code) {
        var _this_registry_code;
        return !!(!((_this_registry_code = this.registry[code]) === null || _this_registry_code === void 0) && _this_registry_code.unpreventedDefault);
      }
      delete(code) {
        delete this.registry[code];
      }
      values() {
        return Object.values(this.registry);
      }
      constructor() {
        _define_property3(this, "registry", {});
      }
    }()), _define_property3(this, "carryChar", ""), _define_property3(this, "lastKeydownTarget", void 0), _define_property3(this, "modifierLockStart", {}), this.system = system;
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/keyboard/keyMap.js
var defaultKeyMap = [
  // alphanumeric block - writing system
  ..."0123456789".split("").map((c) => ({
    code: `Digit${c}`,
    key: c
  })),
  ...")!@#$%^&*(".split("").map((c, i) => ({
    code: `Digit${i}`,
    key: c,
    shiftKey: !0
  })),
  ..."abcdefghijklmnopqrstuvwxyz".split("").map((c) => ({
    code: `Key${c.toUpperCase()}`,
    key: c
  })),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => ({
    code: `Key${c}`,
    key: c,
    shiftKey: !0
  })),
  {
    code: "BracketLeft",
    key: "["
  },
  {
    code: "BracketLeft",
    key: "{",
    shiftKey: !0
  },
  {
    code: "BracketRight",
    key: "]"
  },
  {
    code: "BracketRight",
    key: "}",
    shiftKey: !0
  },
  // alphanumeric block - functional
  {
    code: "Space",
    key: " "
  },
  {
    code: "AltLeft",
    key: "Alt",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "AltRight",
    key: "Alt",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "ShiftLeft",
    key: "Shift",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "ShiftRight",
    key: "Shift",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "ControlLeft",
    key: "Control",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "ControlRight",
    key: "Control",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "MetaLeft",
    key: "Meta",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "MetaRight",
    key: "Meta",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "OSLeft",
    key: "OS",
    location: DOM_KEY_LOCATION.LEFT
  },
  {
    code: "OSRight",
    key: "OS",
    location: DOM_KEY_LOCATION.RIGHT
  },
  {
    code: "ContextMenu",
    key: "ContextMenu"
  },
  {
    code: "Tab",
    key: "Tab"
  },
  {
    code: "CapsLock",
    key: "CapsLock"
  },
  {
    code: "Backspace",
    key: "Backspace"
  },
  {
    code: "Enter",
    key: "Enter"
  },
  // function
  {
    code: "Escape",
    key: "Escape"
  },
  // arrows
  {
    code: "ArrowUp",
    key: "ArrowUp"
  },
  {
    code: "ArrowDown",
    key: "ArrowDown"
  },
  {
    code: "ArrowLeft",
    key: "ArrowLeft"
  },
  {
    code: "ArrowRight",
    key: "ArrowRight"
  },
  // control pad
  {
    code: "Home",
    key: "Home"
  },
  {
    code: "End",
    key: "End"
  },
  {
    code: "Delete",
    key: "Delete"
  },
  {
    code: "PageUp",
    key: "PageUp"
  },
  {
    code: "PageDown",
    key: "PageDown"
  },
  // Special keys that are not part of a default US-layout but included for specific behavior
  {
    code: "Fn",
    key: "Fn"
  },
  {
    code: "Symbol",
    key: "Symbol"
  },
  {
    code: "AltRight",
    key: "AltGraph"
  }
];

// ../../node_modules/@testing-library/user-event/dist/esm/pointer/keyMap.js
var defaultKeyMap2 = [
  {
    name: "MouseLeft",
    pointerType: "mouse",
    button: "primary"
  },
  {
    name: "MouseRight",
    pointerType: "mouse",
    button: "secondary"
  },
  {
    name: "MouseMiddle",
    pointerType: "mouse",
    button: "auxiliary"
  },
  {
    name: "TouchA",
    pointerType: "touch"
  },
  {
    name: "TouchB",
    pointerType: "touch"
  },
  {
    name: "TouchC",
    pointerType: "touch"
  }
];

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/buttons.js
function _define_property4(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var Buttons = class {
  getButtons() {
    let v = 0;
    for (let button of Object.keys(this.pressed))
      v |= 2 ** Number(button);
    return v;
  }
  down(keyDef) {
    let button = getMouseButtonId(keyDef.button);
    if (button in this.pressed) {
      this.pressed[button].push(keyDef);
      return;
    }
    return this.pressed[button] = [
      keyDef
    ], button;
  }
  up(keyDef) {
    let button = getMouseButtonId(keyDef.button);
    if (button in this.pressed && (this.pressed[button] = this.pressed[button].filter((k) => k.name !== keyDef.name), this.pressed[button].length === 0))
      return delete this.pressed[button], button;
  }
  constructor() {
    _define_property4(this, "pressed", {});
  }
}, MouseButton = {
  primary: 0,
  secondary: 1,
  auxiliary: 2,
  back: 3,
  X1: 3,
  forward: 4,
  X2: 4
};
function getMouseButtonId(button = 0) {
  return button in MouseButton ? MouseButton[button] : Number(button);
}
var MouseButtonFlip = {
  1: 2,
  2: 1
};
function getMouseEventButton(button) {
  return button = getMouseButtonId(button), button in MouseButtonFlip ? MouseButtonFlip[button] : button;
}

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/device.js
function _define_property5(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var Device = class {
  get countPressed() {
    return this.pressedKeys.size;
  }
  isPressed(keyDef) {
    return this.pressedKeys.has(keyDef.name);
  }
  addPressed(keyDef) {
    return this.pressedKeys.add(keyDef.name);
  }
  removePressed(keyDef) {
    return this.pressedKeys.delete(keyDef.name);
  }
  constructor() {
    _define_property5(this, "pressedKeys", /* @__PURE__ */ new Set());
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/mouse.js
import "@testing-library/dom";

// ../../node_modules/@testing-library/user-event/dist/esm/utils/misc/getTreeDiff.js
function getTreeDiff(a2, b) {
  let treeA = [];
  for (let el = a2; el; el = el.parentElement)
    treeA.push(el);
  let treeB = [];
  for (let el = b; el; el = el.parentElement)
    treeB.push(el);
  let i = 0;
  for (; !(i >= treeA.length || i >= treeB.length || treeA[treeA.length - 1 - i] !== treeB[treeB.length - 1 - i]); i++)
    ;
  return [
    treeA.slice(0, treeA.length - i),
    treeB.slice(0, treeB.length - i),
    treeB.slice(treeB.length - i)
  ];
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/resolveCaretPosition.js
function resolveCaretPosition({ target, node, offset }) {
  return hasOwnSelection(target) ? {
    node: target,
    offset: offset ?? getUIValue(target).length
  } : node ? {
    node,
    offset: offset ?? (node.nodeType === 3 ? node.nodeValue.length : node.childNodes.length)
  } : findNodeAtTextOffset(target, offset);
}
function findNodeAtTextOffset(node, offset, isRoot = !0) {
  let i = offset === void 0 ? node.childNodes.length - 1 : 0, step = offset === void 0 ? -1 : 1;
  for (; offset === void 0 ? i >= (isRoot ? Math.max(node.childNodes.length - 1, 0) : 0) : i <= node.childNodes.length; ) {
    if (offset && i === node.childNodes.length)
      throw new Error("The given offset is out of bounds.");
    let c = node.childNodes.item(i), text = String(c.textContent);
    if (text.length)
      if (offset !== void 0 && text.length < offset)
        offset -= text.length;
      else {
        if (c.nodeType === 1)
          return findNodeAtTextOffset(c, offset, !1);
        if (c.nodeType === 3)
          return {
            node: c,
            offset: offset ?? c.nodeValue.length
          };
      }
    i += step;
  }
  return {
    node,
    offset: node.childNodes.length
  };
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/setSelectionPerMouse.js
function setSelectionPerMouseDown({ document, target, clickCount, node, offset }) {
  if (hasNoSelection(target))
    return;
  let targetHasOwnSelection = hasOwnSelection(target), text = String(targetHasOwnSelection ? getUIValue(target) : target.textContent), [start, end] = node ? (
    // which elements might be considered in the same line of text.
    // TODO: support expanding initial range on multiple clicks if node is given
    [
      offset,
      offset
    ]
  ) : getTextRange(text, offset, clickCount);
  if (targetHasOwnSelection)
    return setUISelection(target, {
      anchorOffset: start ?? text.length,
      focusOffset: end ?? text.length
    }), {
      node: target,
      start: start ?? 0,
      end: end ?? text.length
    };
  {
    let { node: startNode, offset: startOffset } = resolveCaretPosition({
      target,
      node,
      offset: start
    }), { node: endNode, offset: endOffset } = resolveCaretPosition({
      target,
      node,
      offset: end
    }), range = target.ownerDocument.createRange();
    try {
      range.setStart(startNode, startOffset), range.setEnd(endNode, endOffset);
    } catch {
      throw new Error("The given offset is out of bounds.");
    }
    let selection = document.getSelection();
    return selection?.removeAllRanges(), selection?.addRange(range.cloneRange()), range;
  }
}
function getTextRange(text, pos, clickCount) {
  if (clickCount % 3 === 1 || text.length === 0)
    return [
      pos,
      pos
    ];
  let textPos = pos ?? text.length;
  return clickCount % 3 === 2 ? [
    textPos - text.substr(0, pos).match(/(\w+|\s+|\W)?$/)[0].length,
    pos === void 0 ? pos : pos + text.substr(pos).match(/^(\w+|\s+|\W)?/)[0].length
  ] : [
    textPos - text.substr(0, pos).match(/[^\r\n]*$/)[0].length,
    pos === void 0 ? pos : pos + text.substr(pos).match(/^[^\r\n]*/)[0].length
  ];
}

// ../../node_modules/@testing-library/user-event/dist/esm/event/selection/modifySelectionPerMouse.js
function modifySelectionPerMouseMove(selectionRange, { document, target, node, offset }) {
  let selectionFocus = resolveCaretPosition({
    target,
    node,
    offset
  });
  if ("node" in selectionRange) {
    if (selectionFocus.node === selectionRange.node) {
      let anchorOffset = selectionFocus.offset < selectionRange.start ? selectionRange.end : selectionRange.start, focusOffset = selectionFocus.offset > selectionRange.end || selectionFocus.offset < selectionRange.start ? selectionFocus.offset : selectionRange.end;
      setUISelection(selectionRange.node, {
        anchorOffset,
        focusOffset
      });
    }
  } else {
    let range = selectionRange.cloneRange(), cmp = range.comparePoint(selectionFocus.node, selectionFocus.offset);
    cmp < 0 ? range.setStart(selectionFocus.node, selectionFocus.offset) : cmp > 0 && range.setEnd(selectionFocus.node, selectionFocus.offset);
    let selection = document.getSelection();
    selection?.removeAllRanges(), selection?.addRange(range.cloneRange());
  }
}

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/shared.js
function isDifferentPointerPosition(positionA, positionB) {
  var _positionA_coords, _positionB_coords, _positionA_coords1, _positionB_coords1, _positionA_coords2, _positionB_coords2, _positionA_coords3, _positionB_coords3, _positionA_coords4, _positionB_coords4, _positionA_coords5, _positionB_coords5, _positionA_coords6, _positionB_coords6, _positionA_coords7, _positionB_coords7, _positionA_coords8, _positionB_coords8, _positionA_coords9, _positionB_coords9, _positionA_caret, _positionB_caret, _positionA_caret1, _positionB_caret1;
  return positionA.target !== positionB.target || ((_positionA_coords = positionA.coords) === null || _positionA_coords === void 0 ? void 0 : _positionA_coords.x) !== ((_positionB_coords = positionB.coords) === null || _positionB_coords === void 0 ? void 0 : _positionB_coords.x) || ((_positionA_coords1 = positionA.coords) === null || _positionA_coords1 === void 0 ? void 0 : _positionA_coords1.y) !== ((_positionB_coords1 = positionB.coords) === null || _positionB_coords1 === void 0 ? void 0 : _positionB_coords1.y) || ((_positionA_coords2 = positionA.coords) === null || _positionA_coords2 === void 0 ? void 0 : _positionA_coords2.clientX) !== ((_positionB_coords2 = positionB.coords) === null || _positionB_coords2 === void 0 ? void 0 : _positionB_coords2.clientX) || ((_positionA_coords3 = positionA.coords) === null || _positionA_coords3 === void 0 ? void 0 : _positionA_coords3.clientY) !== ((_positionB_coords3 = positionB.coords) === null || _positionB_coords3 === void 0 ? void 0 : _positionB_coords3.clientY) || ((_positionA_coords4 = positionA.coords) === null || _positionA_coords4 === void 0 ? void 0 : _positionA_coords4.offsetX) !== ((_positionB_coords4 = positionB.coords) === null || _positionB_coords4 === void 0 ? void 0 : _positionB_coords4.offsetX) || ((_positionA_coords5 = positionA.coords) === null || _positionA_coords5 === void 0 ? void 0 : _positionA_coords5.offsetY) !== ((_positionB_coords5 = positionB.coords) === null || _positionB_coords5 === void 0 ? void 0 : _positionB_coords5.offsetY) || ((_positionA_coords6 = positionA.coords) === null || _positionA_coords6 === void 0 ? void 0 : _positionA_coords6.pageX) !== ((_positionB_coords6 = positionB.coords) === null || _positionB_coords6 === void 0 ? void 0 : _positionB_coords6.pageX) || ((_positionA_coords7 = positionA.coords) === null || _positionA_coords7 === void 0 ? void 0 : _positionA_coords7.pageY) !== ((_positionB_coords7 = positionB.coords) === null || _positionB_coords7 === void 0 ? void 0 : _positionB_coords7.pageY) || ((_positionA_coords8 = positionA.coords) === null || _positionA_coords8 === void 0 ? void 0 : _positionA_coords8.screenX) !== ((_positionB_coords8 = positionB.coords) === null || _positionB_coords8 === void 0 ? void 0 : _positionB_coords8.screenX) || ((_positionA_coords9 = positionA.coords) === null || _positionA_coords9 === void 0 ? void 0 : _positionA_coords9.screenY) !== ((_positionB_coords9 = positionB.coords) === null || _positionB_coords9 === void 0 ? void 0 : _positionB_coords9.screenY) || ((_positionA_caret = positionA.caret) === null || _positionA_caret === void 0 ? void 0 : _positionA_caret.node) !== ((_positionB_caret = positionB.caret) === null || _positionB_caret === void 0 ? void 0 : _positionB_caret.node) || ((_positionA_caret1 = positionA.caret) === null || _positionA_caret1 === void 0 ? void 0 : _positionA_caret1.offset) !== ((_positionB_caret1 = positionB.caret) === null || _positionB_caret1 === void 0 ? void 0 : _positionB_caret1.offset);
}

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/mouse.js
function _define_property6(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var Mouse = class {
  move(instance, position, isPrevented) {
    let prevPosition = this.position, prevTarget = this.getTarget(instance);
    if (this.position = position, !isDifferentPointerPosition(prevPosition, position))
      return;
    let nextTarget = this.getTarget(instance), init = this.getEventInit("mousemove"), [leave, enter] = getTreeDiff(prevTarget, nextTarget);
    return {
      leave: () => {
        prevTarget !== nextTarget && (instance.dispatchUIEvent(prevTarget, "mouseout", init), leave.forEach((el) => instance.dispatchUIEvent(el, "mouseleave", init)));
      },
      enter: () => {
        prevTarget !== nextTarget && (instance.dispatchUIEvent(nextTarget, "mouseover", init), enter.forEach((el) => instance.dispatchUIEvent(el, "mouseenter", init)));
      },
      move: () => {
        isPrevented || (instance.dispatchUIEvent(nextTarget, "mousemove", init), this.modifySelecting(instance));
      }
    };
  }
  down(instance, keyDef, isPrevented) {
    let button = this.buttons.down(keyDef);
    if (button === void 0)
      return;
    let target = this.getTarget(instance);
    this.buttonDownTarget[button] = target;
    let init = this.getEventInit("mousedown", keyDef.button), disabled = isDisabled2(target);
    !isPrevented && (disabled || instance.dispatchUIEvent(target, "mousedown", init)) && (this.startSelecting(instance, init.detail), focusElement(target)), !disabled && getMouseEventButton(keyDef.button) === 2 && instance.dispatchUIEvent(target, "contextmenu", this.getEventInit("contextmenu", keyDef.button));
  }
  up(instance, keyDef, isPrevented) {
    let button = this.buttons.up(keyDef);
    if (button === void 0)
      return;
    let target = this.getTarget(instance);
    if (!isDisabled2(target)) {
      if (!isPrevented) {
        let mouseUpInit = this.getEventInit("mouseup", keyDef.button);
        instance.dispatchUIEvent(target, "mouseup", mouseUpInit), this.endSelecting();
      }
      let clickTarget = getTreeDiff(this.buttonDownTarget[button], target)[2][0];
      if (clickTarget) {
        let init = this.getEventInit("click", keyDef.button);
        init.detail && (instance.dispatchUIEvent(clickTarget, init.button === 0 ? "click" : "auxclick", init), init.button === 0 && init.detail === 2 && instance.dispatchUIEvent(clickTarget, "dblclick", {
          ...this.getEventInit("dblclick", keyDef.button),
          detail: init.detail
        }));
      }
    }
  }
  resetClickCount() {
    this.clickCount.reset();
  }
  getEventInit(type5, button) {
    let init = {
      ...this.position.coords
    };
    return init.button = getMouseEventButton(button), init.buttons = this.buttons.getButtons(), type5 === "mousedown" ? init.detail = this.clickCount.getOnDown(init.button) : type5 === "mouseup" ? init.detail = this.clickCount.getOnUp(init.button) : (type5 === "click" || type5 === "auxclick") && (init.detail = this.clickCount.incOnClick(init.button)), init;
  }
  getTarget(instance) {
    var _this_position_target;
    return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
  }
  startSelecting(instance, clickCount) {
    var _this_position_caret, _this_position_caret1;
    this.selecting = setSelectionPerMouseDown({
      document: instance.config.document,
      target: this.getTarget(instance),
      node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node,
      offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset,
      clickCount
    });
  }
  modifySelecting(instance) {
    var _this_position_caret, _this_position_caret1;
    this.selecting && modifySelectionPerMouseMove(this.selecting, {
      document: instance.config.document,
      target: this.getTarget(instance),
      node: (_this_position_caret = this.position.caret) === null || _this_position_caret === void 0 ? void 0 : _this_position_caret.node,
      offset: (_this_position_caret1 = this.position.caret) === null || _this_position_caret1 === void 0 ? void 0 : _this_position_caret1.offset
    });
  }
  endSelecting() {
    this.selecting = void 0;
  }
  constructor() {
    _define_property6(this, "position", {}), _define_property6(this, "buttons", new Buttons()), _define_property6(this, "selecting", void 0), _define_property6(this, "buttonDownTarget", {}), _define_property6(this, "clickCount", new class {
      incOnClick(button) {
        let current = this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
        return this.count = this.count[button] === void 0 ? {} : {
          [button]: Number(this.count[button]) + 1
        }, current;
      }
      getOnDown(button) {
        var _this_count_button;
        this.down = {
          [button]: (_this_count_button = this.count[button]) !== null && _this_count_button !== void 0 ? _this_count_button : 0
        };
        var _this_count_button1;
        return this.count = {
          [button]: (_this_count_button1 = this.count[button]) !== null && _this_count_button1 !== void 0 ? _this_count_button1 : 0
        }, Number(this.count[button]) + 1;
      }
      getOnUp(button) {
        return this.down[button] === void 0 ? void 0 : Number(this.down[button]) + 1;
      }
      reset() {
        this.count = {};
      }
      constructor() {
        _define_property6(this, "down", {}), _define_property6(this, "count", {});
      }
    }());
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/utils/pointer/cssPointerEvents.js
function hasPointerEvents(instance, element) {
  var _checkPointerEvents;
  return ((_checkPointerEvents = checkPointerEvents(instance, element)) === null || _checkPointerEvents === void 0 ? void 0 : _checkPointerEvents.pointerEvents) !== "none";
}
function closestPointerEventsDeclaration(element) {
  let window2 = getWindow(element);
  for (let el = element, tree = []; el?.ownerDocument; el = el.parentElement) {
    tree.push(el);
    let pointerEvents = window2.getComputedStyle(el).pointerEvents;
    if (pointerEvents && ![
      "inherit",
      "unset"
    ].includes(pointerEvents))
      return {
        pointerEvents,
        tree
      };
  }
}
var PointerEventsCheck = /* @__PURE__ */ Symbol("Last check for pointer-events");
function checkPointerEvents(instance, element) {
  let lastCheck = element[PointerEventsCheck];
  if (!(instance.config.pointerEventsCheck !== PointerEventsCheckLevel.Never && (!lastCheck || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachApiCall) && lastCheck[ApiLevel.Call] !== getLevelRef(instance, ApiLevel.Call) || hasBitFlag(instance.config.pointerEventsCheck, PointerEventsCheckLevel.EachTrigger) && lastCheck[ApiLevel.Trigger] !== getLevelRef(instance, ApiLevel.Trigger))))
    return lastCheck?.result;
  let declaration = closestPointerEventsDeclaration(element);
  return element[PointerEventsCheck] = {
    [ApiLevel.Call]: getLevelRef(instance, ApiLevel.Call),
    [ApiLevel.Trigger]: getLevelRef(instance, ApiLevel.Trigger),
    result: declaration
  }, declaration;
}
function assertPointerEvents(instance, element) {
  let declaration = checkPointerEvents(instance, element);
  if (declaration?.pointerEvents === "none")
    throw new Error([
      `Unable to perform pointer interaction as the element ${declaration.tree.length > 1 ? "inherits" : "has"} \`pointer-events: none\`:`,
      "",
      printTree(declaration.tree)
    ].join(`
`));
}
function printTree(tree) {
  return tree.reverse().map((el, i) => [
    "".padEnd(i),
    el.tagName,
    el.id && `#${el.id}`,
    el.hasAttribute("data-testid") && `(testId=${el.getAttribute("data-testid")})`,
    getLabelDescr(el),
    tree.length > 1 && i === 0 && "  <-- This element declared `pointer-events: none`",
    tree.length > 1 && i === tree.length - 1 && "  <-- Asserted pointer events here"
  ].filter(Boolean).join("")).join(`
`);
}
function getLabelDescr(element) {
  var _element_labels;
  let label;
  if (element.hasAttribute("aria-label"))
    label = element.getAttribute("aria-label");
  else if (element.hasAttribute("aria-labelledby")) {
    var _element_ownerDocument_getElementById_textContent, _element_ownerDocument_getElementById;
    label = (_element_ownerDocument_getElementById = element.ownerDocument.getElementById(element.getAttribute("aria-labelledby"))) === null || _element_ownerDocument_getElementById === void 0 || (_element_ownerDocument_getElementById_textContent = _element_ownerDocument_getElementById.textContent) === null || _element_ownerDocument_getElementById_textContent === void 0 ? void 0 : _element_ownerDocument_getElementById_textContent.trim();
  } else if (isElementType(element, [
    "button",
    "input",
    "meter",
    "output",
    "progress",
    "select",
    "textarea"
  ]) && (!((_element_labels = element.labels) === null || _element_labels === void 0) && _element_labels.length))
    label = Array.from(element.labels).map((el) => {
      var _el_textContent;
      return (_el_textContent = el.textContent) === null || _el_textContent === void 0 ? void 0 : _el_textContent.trim();
    }).join("|");
  else if (isElementType(element, "button")) {
    var _element_textContent;
    label = (_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.trim();
  }
  return label = label?.replace(/\n/g, "  "), Number(label?.length) > 30 && (label = `${label?.substring(0, 29)}\u2026`), label ? `(label=${label})` : "";
}
function hasBitFlag(conf, flag3) {
  return (conf & flag3) > 0;
}

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/pointer.js
function _define_property7(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var Pointer = class {
  init(instance) {
    let target = this.getTarget(instance), [, enter] = getTreeDiff(null, target), init = this.getEventInit();
    return assertPointerEvents(instance, target), instance.dispatchUIEvent(target, "pointerover", init), enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init)), this;
  }
  move(instance, position) {
    let prevPosition = this.position, prevTarget = this.getTarget(instance);
    if (this.position = position, !isDifferentPointerPosition(prevPosition, position))
      return;
    let nextTarget = this.getTarget(instance), init = this.getEventInit(-1), [leave, enter] = getTreeDiff(prevTarget, nextTarget);
    return {
      leave: () => {
        hasPointerEvents(instance, prevTarget) && prevTarget !== nextTarget && (instance.dispatchUIEvent(prevTarget, "pointerout", init), leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init)));
      },
      enter: () => {
        assertPointerEvents(instance, nextTarget), prevTarget !== nextTarget && (instance.dispatchUIEvent(nextTarget, "pointerover", init), enter.forEach((el) => instance.dispatchUIEvent(el, "pointerenter", init)));
      },
      move: () => {
        instance.dispatchUIEvent(nextTarget, "pointermove", init);
      }
    };
  }
  down(instance, button = 0) {
    if (this.isDown)
      return;
    let target = this.getTarget(instance);
    assertPointerEvents(instance, target), this.isDown = !0, this.isPrevented = !instance.dispatchUIEvent(target, "pointerdown", this.getEventInit(button));
  }
  up(instance, button = 0) {
    if (!this.isDown)
      return;
    let target = this.getTarget(instance);
    assertPointerEvents(instance, target), this.isPrevented = !1, this.isDown = !1, instance.dispatchUIEvent(target, "pointerup", this.getEventInit(button));
  }
  release(instance) {
    let target = this.getTarget(instance), [leave] = getTreeDiff(target, null), init = this.getEventInit();
    hasPointerEvents(instance, target) && (instance.dispatchUIEvent(target, "pointerout", init), leave.forEach((el) => instance.dispatchUIEvent(el, "pointerleave", init))), this.isCancelled = !0;
  }
  getTarget(instance) {
    var _this_position_target;
    return (_this_position_target = this.position.target) !== null && _this_position_target !== void 0 ? _this_position_target : instance.config.document.body;
  }
  getEventInit(button) {
    return {
      ...this.position.coords,
      pointerId: this.pointerId,
      pointerType: this.pointerType,
      isPrimary: this.isPrimary,
      button: getMouseEventButton(button),
      buttons: this.buttons.getButtons()
    };
  }
  constructor({ pointerId, pointerType, isPrimary }, buttons) {
    _define_property7(this, "pointerId", void 0), _define_property7(this, "pointerType", void 0), _define_property7(this, "isPrimary", void 0), _define_property7(this, "buttons", void 0), _define_property7(this, "isMultitouch", !1), _define_property7(this, "isCancelled", !1), _define_property7(this, "isDown", !1), _define_property7(this, "isPrevented", !1), _define_property7(this, "position", {}), this.pointerId = pointerId, this.pointerType = pointerType, this.isPrimary = isPrimary, this.isMultitouch = !isPrimary, this.buttons = buttons;
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/system/pointer/index.js
function _define_property8(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var PointerHost = class {
  isKeyPressed(keyDef) {
    return this.devices.get(keyDef.pointerType).isPressed(keyDef);
  }
  async press(instance, keyDef, position) {
    this.devices.get(keyDef.pointerType).addPressed(keyDef), this.buttons.down(keyDef);
    let pointerName = this.getPointerName(keyDef), pointer3 = keyDef.pointerType === "touch" ? this.pointers.new(pointerName, keyDef.pointerType, this.buttons) : this.pointers.get(pointerName);
    pointer3.position = position, pointer3.pointerType !== "touch" && (this.mouse.position = position), pointer3.pointerType === "touch" && pointer3.init(instance), pointer3.down(instance, keyDef.button), pointer3.pointerType !== "touch" && this.mouse.down(instance, keyDef, pointer3.isPrevented);
  }
  async move(instance, pointerName, position) {
    let pointer3 = this.pointers.get(pointerName), pointermove = pointer3.move(instance, position), mousemove = pointer3.pointerType === "touch" ? void 0 : this.mouse.move(instance, position, pointer3.isPrevented);
    pointermove?.leave(), mousemove?.leave(), pointermove?.enter(), mousemove?.enter(), pointermove?.move(), mousemove?.move();
  }
  async release(instance, keyDef, position) {
    let device = this.devices.get(keyDef.pointerType);
    device.removePressed(keyDef), this.buttons.up(keyDef);
    let pointer3 = this.pointers.get(this.getPointerName(keyDef)), isPrevented = pointer3.isPrevented;
    if (pointer3.position = position, pointer3.pointerType !== "touch" && (this.mouse.position = position), device.countPressed === 0 && pointer3.up(instance, keyDef.button), pointer3.pointerType === "touch" && pointer3.release(instance), pointer3.pointerType === "touch" && !pointer3.isMultitouch) {
      let mousemove = this.mouse.move(instance, position, isPrevented);
      mousemove?.leave(), mousemove?.enter(), mousemove?.move(), this.mouse.down(instance, keyDef, isPrevented);
    }
    if (!pointer3.isMultitouch) {
      let mousemove = this.mouse.move(instance, position, isPrevented);
      mousemove?.leave(), mousemove?.enter(), mousemove?.move(), this.mouse.up(instance, keyDef, isPrevented);
    }
  }
  getPointerName(keyDef) {
    return keyDef.pointerType === "touch" ? keyDef.name : keyDef.pointerType;
  }
  getPreviousPosition(pointerName) {
    return this.pointers.has(pointerName) ? this.pointers.get(pointerName).position : void 0;
  }
  resetClickCount() {
    this.mouse.resetClickCount();
  }
  getMouseTarget(instance) {
    var _this_mouse_position_target;
    return (_this_mouse_position_target = this.mouse.position.target) !== null && _this_mouse_position_target !== void 0 ? _this_mouse_position_target : instance.config.document.body;
  }
  setMousePosition(position) {
    this.mouse.position = position, this.pointers.get("mouse").position = position;
  }
  constructor(system) {
    _define_property8(this, "system", void 0), _define_property8(this, "mouse", void 0), _define_property8(this, "buttons", void 0), _define_property8(this, "devices", new class {
      get(k) {
        var _this_registry, _k, _;
        return (_ = (_this_registry = this.registry)[_k = k]) !== null && _ !== void 0 ? _ : _this_registry[_k] = new Device();
      }
      constructor() {
        _define_property8(this, "registry", {});
      }
    }()), _define_property8(this, "pointers", new class {
      new(pointerName, pointerType, buttons) {
        let isPrimary = pointerType !== "touch" || !Object.values(this.registry).some((p2) => p2.pointerType === "touch" && !p2.isCancelled);
        return isPrimary || Object.values(this.registry).forEach((p2) => {
          p2.pointerType === pointerType && !p2.isCancelled && (p2.isMultitouch = !0);
        }), this.registry[pointerName] = new Pointer({
          pointerId: this.nextId++,
          pointerType,
          isPrimary
        }, buttons), this.registry[pointerName];
      }
      get(pointerName) {
        if (!this.has(pointerName))
          throw new Error(`Trying to access pointer "${pointerName}" which does not exist.`);
        return this.registry[pointerName];
      }
      has(pointerName) {
        return pointerName in this.registry;
      }
      constructor() {
        _define_property8(this, "registry", {}), _define_property8(this, "nextId", 1);
      }
    }()), this.system = system, this.buttons = new Buttons(), this.mouse = new Mouse(), this.pointers.new("mouse", "mouse", this.buttons);
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/system/index.js
function _define_property9(obj, key, value) {
  return key in obj ? Object.defineProperty(obj, key, {
    value,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : obj[key] = value, obj;
}
var System = class {
  getUIEventModifiers() {
    return {
      altKey: this.keyboard.modifiers.Alt,
      ctrlKey: this.keyboard.modifiers.Control,
      metaKey: this.keyboard.modifiers.Meta,
      shiftKey: this.keyboard.modifiers.Shift,
      modifierAltGraph: this.keyboard.modifiers.AltGraph,
      modifierCapsLock: this.keyboard.modifiers.CapsLock,
      modifierFn: this.keyboard.modifiers.Fn,
      modifierFnLock: this.keyboard.modifiers.FnLock,
      modifierNumLock: this.keyboard.modifiers.NumLock,
      modifierScrollLock: this.keyboard.modifiers.ScrollLock,
      modifierSymbol: this.keyboard.modifiers.Symbol,
      modifierSymbolLock: this.keyboard.modifiers.SymbolLock
    };
  }
  constructor() {
    _define_property9(this, "keyboard", new KeyboardHost(this)), _define_property9(this, "pointer", new PointerHost(this));
  }
};

// ../../node_modules/@testing-library/user-event/dist/esm/convenience/click.js
async function click(element) {
  let pointerIn = [];
  return this.config.skipHover || pointerIn.push({
    target: element
  }), pointerIn.push({
    keys: "[MouseLeft]",
    target: element
  }), this.pointer(pointerIn);
}
async function dblClick(element) {
  return this.pointer([
    {
      target: element
    },
    "[MouseLeft][MouseLeft]"
  ]);
}
async function tripleClick(element) {
  return this.pointer([
    {
      target: element
    },
    "[MouseLeft][MouseLeft][MouseLeft]"
  ]);
}

// ../../node_modules/@testing-library/user-event/dist/esm/convenience/hover.js
async function hover(element) {
  return this.pointer({
    target: element
  });
}
async function unhover(element) {
  return assertPointerEvents(this, this.system.pointer.getMouseTarget(this)), this.pointer({
    target: element.ownerDocument.body
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/convenience/tab.js
async function tab({ shift } = {}) {
  return this.keyboard(shift === !0 ? "{Shift>}{Tab}{/Shift}" : shift === !1 ? "[/ShiftLeft][/ShiftRight]{Tab}" : "{Tab}");
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/keyDef/readNextDescriptor.js
var bracketDict = (function(bracketDict2) {
  return bracketDict2["{"] = "}", bracketDict2["["] = "]", bracketDict2;
})(bracketDict || {});
function readNextDescriptor(text, context) {
  let pos = 0, startBracket = text[pos] in bracketDict ? text[pos] : "";
  pos += startBracket.length;
  let type5 = new RegExp(`^\\${startBracket}{2}`).test(text) ? "" : startBracket;
  return {
    type: type5,
    ...type5 === "" ? readPrintableChar(text, pos, context) : readTag(text, pos, type5, context)
  };
}
function readPrintableChar(text, pos, context) {
  let descriptor = text[pos];
  return assertDescriptor(descriptor, text, pos, context), pos += descriptor.length, {
    consumedLength: pos,
    descriptor,
    releasePrevious: !1,
    releaseSelf: !0,
    repeat: 1
  };
}
function readTag(text, pos, startBracket, context) {
  var _text_slice_match, _text_slice_match1;
  let releasePreviousModifier = text[pos] === "/" ? "/" : "";
  pos += releasePreviousModifier.length;
  let escapedDescriptor = startBracket === "{" && text[pos] === "\\";
  pos += Number(escapedDescriptor);
  let descriptor = escapedDescriptor ? text[pos] : (_text_slice_match = text.slice(pos).match(startBracket === "{" ? /^\w+|^[^}>/]/ : /^\w+/)) === null || _text_slice_match === void 0 ? void 0 : _text_slice_match[0];
  assertDescriptor(descriptor, text, pos, context), pos += descriptor.length;
  var _text_slice_match_;
  let repeatModifier = (_text_slice_match_ = (_text_slice_match1 = text.slice(pos).match(/^>\d+/)) === null || _text_slice_match1 === void 0 ? void 0 : _text_slice_match1[0]) !== null && _text_slice_match_ !== void 0 ? _text_slice_match_ : "";
  pos += repeatModifier.length;
  let releaseSelfModifier = text[pos] === "/" || !repeatModifier && text[pos] === ">" ? text[pos] : "";
  pos += releaseSelfModifier.length;
  let expectedEndBracket = bracketDict[startBracket], endBracket = text[pos] === expectedEndBracket ? expectedEndBracket : "";
  if (!endBracket)
    throw new Error(getErrorMessage([
      !repeatModifier && "repeat modifier",
      !releaseSelfModifier && "release modifier",
      `"${expectedEndBracket}"`
    ].filter(Boolean).join(" or "), text[pos], text, context));
  return pos += endBracket.length, {
    consumedLength: pos,
    descriptor,
    releasePrevious: !!releasePreviousModifier,
    repeat: repeatModifier ? Math.max(Number(repeatModifier.substr(1)), 1) : 1,
    releaseSelf: hasReleaseSelf(releaseSelfModifier, repeatModifier)
  };
}
function assertDescriptor(descriptor, text, pos, context) {
  if (!descriptor)
    throw new Error(getErrorMessage("key descriptor", text[pos], text, context));
}
function hasReleaseSelf(releaseSelfModifier, repeatModifier) {
  if (releaseSelfModifier)
    return releaseSelfModifier === "/";
  if (repeatModifier)
    return !1;
}
function getErrorMessage(expected, found, text, context) {
  return `Expected ${expected} but found "${found ?? ""}" in "${text}"
    See ${context === "pointer" ? "https://testing-library.com/docs/user-event/pointer#pressing-a-button-or-touching-the-screen" : "https://testing-library.com/docs/user-event/keyboard"}
    for more information about how userEvent parses your input.`;
}

// ../../node_modules/@testing-library/user-event/dist/esm/keyboard/parseKeyDef.js
function parseKeyDef(keyboardMap, text) {
  let defs = [];
  do {
    let { type: type5, descriptor, consumedLength, releasePrevious, releaseSelf = !0, repeat } = readNextDescriptor(text, "keyboard");
    var _keyboardMap_find;
    let keyDef = (_keyboardMap_find = keyboardMap.find((def) => {
      if (type5 === "[") {
        var _def_code;
        return ((_def_code = def.code) === null || _def_code === void 0 ? void 0 : _def_code.toLowerCase()) === descriptor.toLowerCase();
      } else if (type5 === "{") {
        var _def_key;
        return ((_def_key = def.key) === null || _def_key === void 0 ? void 0 : _def_key.toLowerCase()) === descriptor.toLowerCase();
      }
      return def.key === descriptor;
    })) !== null && _keyboardMap_find !== void 0 ? _keyboardMap_find : {
      key: "Unknown",
      code: "Unknown",
      [type5 === "[" ? "code" : "key"]: descriptor
    };
    defs.push({
      keyDef,
      releasePrevious,
      releaseSelf,
      repeat
    }), text = text.slice(consumedLength);
  } while (text);
  return defs;
}

// ../../node_modules/@testing-library/user-event/dist/esm/keyboard/index.js
async function keyboard(text) {
  let actions = parseKeyDef(this.config.keyboardMap, text);
  for (let i = 0; i < actions.length; i++)
    await wait(this.config), await keyboardAction(this, actions[i]);
}
async function keyboardAction(instance, { keyDef, releasePrevious, releaseSelf, repeat }) {
  let { system } = instance;
  if (system.keyboard.isKeyPressed(keyDef) && await system.keyboard.keyup(instance, keyDef), !releasePrevious) {
    for (let i = 1; i <= repeat; i++)
      await system.keyboard.keydown(instance, keyDef), i < repeat && await wait(instance.config);
    releaseSelf && await system.keyboard.keyup(instance, keyDef);
  }
}
async function releaseAllKeys(instance) {
  for (let k of instance.system.keyboard.getPressedKeys())
    await instance.system.keyboard.keyup(instance, k);
}

// ../../node_modules/@testing-library/user-event/dist/esm/document/copySelection.js
function copySelection(target) {
  let data = hasOwnSelection(target) ? {
    "text/plain": readSelectedValueFromInput(target)
  } : {
    "text/plain": String(target.ownerDocument.getSelection())
  }, dt = createDataTransfer(getWindow(target));
  for (let type5 in data)
    data[type5] && dt.setData(type5, data[type5]);
  return dt;
}
function readSelectedValueFromInput(target) {
  let sel = getUISelection(target);
  return getUIValue(target).substring(sel.startOffset, sel.endOffset);
}

// ../../node_modules/@testing-library/user-event/dist/esm/clipboard/copy.js
async function copy() {
  let doc = this.config.document;
  var _doc_activeElement;
  let target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
    /* istanbul ignore next */
    doc.body
  ), clipboardData = copySelection(target);
  if (clipboardData.items.length !== 0)
    return this.dispatchUIEvent(target, "copy", {
      clipboardData
    }) && this.config.writeToClipboard && await writeDataTransferToClipboard(doc, clipboardData), clipboardData;
}

// ../../node_modules/@testing-library/user-event/dist/esm/clipboard/cut.js
async function cut() {
  let doc = this.config.document;
  var _doc_activeElement;
  let target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
    /* istanbul ignore next */
    doc.body
  ), clipboardData = copySelection(target);
  if (clipboardData.items.length !== 0)
    return this.dispatchUIEvent(target, "cut", {
      clipboardData
    }) && this.config.writeToClipboard && await writeDataTransferToClipboard(target.ownerDocument, clipboardData), clipboardData;
}

// ../../node_modules/@testing-library/user-event/dist/esm/clipboard/paste.js
async function paste(clipboardData) {
  let doc = this.config.document;
  var _doc_activeElement;
  let target = (_doc_activeElement = doc.activeElement) !== null && _doc_activeElement !== void 0 ? _doc_activeElement : (
    /* istanbul ignore next */
    doc.body
  );
  var _ref;
  let dataTransfer = (_ref = typeof clipboardData == "string" ? getClipboardDataFromString(doc, clipboardData) : clipboardData) !== null && _ref !== void 0 ? _ref : await readDataTransferFromClipboard(doc).catch(() => {
    throw new Error("`userEvent.paste()` without `clipboardData` requires the `ClipboardAPI` to be available.");
  });
  this.dispatchUIEvent(target, "paste", {
    clipboardData: dataTransfer
  });
}
function getClipboardDataFromString(doc, text) {
  let dt = createDataTransfer(getWindow(doc));
  return dt.setData("text", text), dt;
}

// ../../node_modules/@testing-library/user-event/dist/esm/pointer/parseKeyDef.js
function parseKeyDef2(pointerMap, keys2) {
  let defs = [];
  do {
    let { descriptor, consumedLength, releasePrevious, releaseSelf = !0 } = readNextDescriptor(keys2, "pointer"), keyDef = pointerMap.find((p2) => p2.name === descriptor);
    keyDef && defs.push({
      keyDef,
      releasePrevious,
      releaseSelf
    }), keys2 = keys2.slice(consumedLength);
  } while (keys2);
  return defs;
}

// ../../node_modules/@testing-library/user-event/dist/esm/pointer/index.js
async function pointer(input2) {
  let { pointerMap } = this.config, actions = [];
  (Array.isArray(input2) ? input2 : [
    input2
  ]).forEach((actionInput) => {
    typeof actionInput == "string" ? actions.push(...parseKeyDef2(pointerMap, actionInput)) : "keys" in actionInput ? actions.push(...parseKeyDef2(pointerMap, actionInput.keys).map((i) => ({
      ...actionInput,
      ...i
    }))) : actions.push(actionInput);
  });
  for (let i = 0; i < actions.length; i++)
    await wait(this.config), await pointerAction(this, actions[i]);
  this.system.pointer.resetClickCount();
}
async function pointerAction(instance, action) {
  var _previousPosition_caret, _previousPosition_caret1;
  let pointerName = "pointerName" in action && action.pointerName ? action.pointerName : "keyDef" in action ? instance.system.pointer.getPointerName(action.keyDef) : "mouse", previousPosition = instance.system.pointer.getPreviousPosition(pointerName);
  var _action_target, _action_coords, _action_node, _action_offset;
  let position = {
    target: (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : getPrevTarget(instance, previousPosition),
    coords: (_action_coords = action.coords) !== null && _action_coords !== void 0 ? _action_coords : previousPosition?.coords,
    caret: {
      node: (_action_node = action.node) !== null && _action_node !== void 0 ? _action_node : hasCaretPosition(action) || previousPosition == null || (_previousPosition_caret = previousPosition.caret) === null || _previousPosition_caret === void 0 ? void 0 : _previousPosition_caret.node,
      offset: (_action_offset = action.offset) !== null && _action_offset !== void 0 ? _action_offset : hasCaretPosition(action) || previousPosition == null || (_previousPosition_caret1 = previousPosition.caret) === null || _previousPosition_caret1 === void 0 ? void 0 : _previousPosition_caret1.offset
    }
  };
  "keyDef" in action ? (instance.system.pointer.isKeyPressed(action.keyDef) && (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.release(instance, action.keyDef, position)), action.releasePrevious || (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.press(instance, action.keyDef, position), action.releaseSelf && (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.release(instance, action.keyDef, position)))) : (setLevelRef(instance, ApiLevel.Trigger), await instance.system.pointer.move(instance, pointerName, position));
}
function hasCaretPosition(action) {
  var _action_target, _ref;
  return !!((_ref = (_action_target = action.target) !== null && _action_target !== void 0 ? _action_target : action.node) !== null && _ref !== void 0 ? _ref : action.offset !== void 0);
}
function getPrevTarget(instance, position) {
  if (!position)
    throw new Error("This pointer has no previous position. Provide a target property!");
  var _position_target;
  return (_position_target = position.target) !== null && _position_target !== void 0 ? _position_target : instance.config.document.body;
}

// ../../node_modules/@testing-library/user-event/dist/esm/utility/clear.js
import "@testing-library/dom";
async function clear(element) {
  if (!isEditable(element) || isDisabled2(element))
    throw new Error("clear()` is only supported on editable elements.");
  if (focusElement(element), element.ownerDocument.activeElement !== element)
    throw new Error("The element to be cleared could not be focused.");
  if (selectAll(element), !isAllSelected(element))
    throw new Error("The element content to be cleared could not be selected.");
  input(this, element, "", "deleteContentBackward");
}

// ../../node_modules/@testing-library/user-event/dist/esm/utility/selectOptions.js
import { getConfig as getConfig2 } from "@testing-library/dom";
async function selectOptions(select, values) {
  return selectOptionsBase.call(this, !0, select, values);
}
async function deselectOptions(select, values) {
  return selectOptionsBase.call(this, !1, select, values);
}
async function selectOptionsBase(newValue, select, values) {
  if (!newValue && !select.multiple)
    throw getConfig2().getElementError("Unable to deselect an option in a non-multiple select. Use selectOptions to change the selection instead.", select);
  let valArray = Array.isArray(values) ? values : [
    values
  ], allOptions = Array.from(select.querySelectorAll('option, [role="option"]')), selectedOptions = valArray.map((val) => {
    if (typeof val != "string" && allOptions.includes(val))
      return val;
    {
      let matchingOption = allOptions.find((o) => o.value === val || o.innerHTML === val);
      if (matchingOption)
        return matchingOption;
      throw getConfig2().getElementError(`Value "${String(val)}" not found in options`, select);
    }
  }).filter((option) => !isDisabled2(option));
  if (isDisabled2(select) || !selectedOptions.length) return;
  let selectOption = (option) => {
    option.selected = newValue, this.dispatchUIEvent(select, "input", {
      bubbles: !0,
      cancelable: !1,
      composed: !0
    }), this.dispatchUIEvent(select, "change");
  };
  if (isElementType(select, "select"))
    if (select.multiple)
      for (let option of selectedOptions) {
        let withPointerEvents = this.config.pointerEventsCheck === 0 ? !0 : hasPointerEvents(this, option);
        withPointerEvents && (this.dispatchUIEvent(option, "pointerover"), this.dispatchUIEvent(select, "pointerenter"), this.dispatchUIEvent(option, "mouseover"), this.dispatchUIEvent(select, "mouseenter"), this.dispatchUIEvent(option, "pointermove"), this.dispatchUIEvent(option, "mousemove"), this.dispatchUIEvent(option, "pointerdown"), this.dispatchUIEvent(option, "mousedown")), focusElement(select), withPointerEvents && (this.dispatchUIEvent(option, "pointerup"), this.dispatchUIEvent(option, "mouseup")), selectOption(option), withPointerEvents && this.dispatchUIEvent(option, "click"), await wait(this.config);
      }
    else if (selectedOptions.length === 1) {
      let withPointerEvents = this.config.pointerEventsCheck === 0 ? !0 : hasPointerEvents(this, select);
      withPointerEvents ? await this.click(select) : focusElement(select), selectOption(selectedOptions[0]), withPointerEvents && (this.dispatchUIEvent(select, "pointerover"), this.dispatchUIEvent(select, "pointerenter"), this.dispatchUIEvent(select, "mouseover"), this.dispatchUIEvent(select, "mouseenter"), this.dispatchUIEvent(select, "pointerup"), this.dispatchUIEvent(select, "mouseup"), this.dispatchUIEvent(select, "click")), await wait(this.config);
    } else
      throw getConfig2().getElementError("Cannot select multiple options on a non-multiple select", select);
  else if (select.getAttribute("role") === "listbox")
    for (let option of selectedOptions)
      await this.click(option), await this.unhover(option);
  else
    throw getConfig2().getElementError("Cannot select options on elements that are neither select nor listbox elements", select);
}

// ../../node_modules/@testing-library/user-event/dist/esm/utility/type.js
async function type3(element, text, { skipClick = this.config.skipClick, skipAutoClose = this.config.skipAutoClose, initialSelectionStart, initialSelectionEnd } = {}) {
  element.disabled || (skipClick || await this.click(element), initialSelectionStart !== void 0 && setSelectionRange(element, initialSelectionStart, initialSelectionEnd ?? initialSelectionStart), await this.keyboard(text), skipAutoClose || await releaseAllKeys(this));
}

// ../../node_modules/@testing-library/user-event/dist/esm/utils/edit/setFiles.js
var fakeFiles = /* @__PURE__ */ Symbol("files and value properties are mocked");
function restoreProperty(obj, prop, descriptor) {
  descriptor ? Object.defineProperty(obj, prop, descriptor) : delete obj[prop];
}
function setFiles(el, files) {
  var _el_fakeFiles;
  (_el_fakeFiles = el[fakeFiles]) === null || _el_fakeFiles === void 0 || _el_fakeFiles.restore();
  let typeDescr = Object.getOwnPropertyDescriptor(el, "type"), valueDescr = Object.getOwnPropertyDescriptor(el, "value"), filesDescr = Object.getOwnPropertyDescriptor(el, "files");
  function restore() {
    restoreProperty(el, "type", typeDescr), restoreProperty(el, "value", valueDescr), restoreProperty(el, "files", filesDescr);
  }
  el[fakeFiles] = {
    restore
  }, Object.defineProperties(el, {
    files: {
      configurable: !0,
      get: () => files
    },
    value: {
      configurable: !0,
      get: () => files.length ? `C:\\fakepath\\${files[0].name}` : "",
      set(v) {
        if (v === "")
          restore();
        else {
          var _valueDescr_set;
          valueDescr == null || (_valueDescr_set = valueDescr.set) === null || _valueDescr_set === void 0 || _valueDescr_set.call(el, v);
        }
      }
    },
    type: {
      configurable: !0,
      get: () => "file",
      set(v) {
        v !== "file" && (restore(), el.type = v);
      }
    }
  });
}

// ../../node_modules/@testing-library/user-event/dist/esm/utility/upload.js
async function upload(element, fileOrFiles) {
  let input2 = isElementType(element, "label") ? element.control : element;
  if (!input2 || !isElementType(input2, "input", {
    type: "file"
  }))
    throw new TypeError(`The ${input2 === element ? "given" : "associated"} ${input2?.tagName} element does not accept file uploads`);
  if (isDisabled2(element)) return;
  let files = (Array.isArray(fileOrFiles) ? fileOrFiles : [
    fileOrFiles
  ]).filter((file) => !this.config.applyAccept || isAcceptableFile(file, input2.accept)).slice(0, input2.multiple ? void 0 : 1), fileDialog = () => {
    var _input_files;
    files.length === ((_input_files = input2.files) === null || _input_files === void 0 ? void 0 : _input_files.length) && files.every((f3, i) => {
      var _input_files2;
      return f3 === ((_input_files2 = input2.files) === null || _input_files2 === void 0 ? void 0 : _input_files2.item(i));
    }) || (setFiles(input2, createFileList(getWindow(element), files)), this.dispatchUIEvent(input2, "input"), this.dispatchUIEvent(input2, "change"));
  };
  input2.addEventListener("fileDialog", fileDialog), await this.click(element), input2.removeEventListener("fileDialog", fileDialog);
}
function normalize2(nameOrType) {
  return nameOrType.toLowerCase().replace(/(\.|\/)jpg\b/g, "$1jpeg");
}
function isAcceptableFile(file, accept) {
  if (!accept)
    return !0;
  let wildcards = [
    "audio/*",
    "image/*",
    "video/*"
  ];
  return normalize2(accept).trim().split(/\s*,\s*/).some((acceptToken) => acceptToken.startsWith(".") ? normalize2(file.name).endsWith(acceptToken) : wildcards.includes(acceptToken) ? normalize2(file.type).startsWith(acceptToken.replace("*", "")) : normalize2(file.type) === acceptToken);
}

// ../../node_modules/@testing-library/user-event/dist/esm/setup/api.js
var userEventApi = {
  click,
  dblClick,
  tripleClick,
  hover,
  unhover,
  tab,
  keyboard,
  copy,
  cut,
  paste,
  pointer,
  clear,
  deselectOptions,
  selectOptions,
  type: type3,
  upload
};

// ../../node_modules/@testing-library/user-event/dist/esm/setup/wrapAsync.js
import { getConfig as getConfig3 } from "@testing-library/dom";
function wrapAsync(implementation) {
  return getConfig3().asyncWrapper(implementation);
}

// ../../node_modules/@testing-library/user-event/dist/esm/setup/setup.js
var defaultOptionsDirect = {
  applyAccept: !0,
  autoModify: !0,
  delay: 0,
  document: globalThis.document,
  keyboardMap: defaultKeyMap,
  pointerMap: defaultKeyMap2,
  pointerEventsCheck: PointerEventsCheckLevel.EachApiCall,
  skipAutoClose: !1,
  skipClick: !1,
  skipHover: !1,
  writeToClipboard: !1,
  advanceTimers: () => Promise.resolve()
}, defaultOptionsSetup = {
  ...defaultOptionsDirect,
  writeToClipboard: !0
};
function createConfig(options = {}, defaults = defaultOptionsSetup, node) {
  let document = getDocument(options, node, defaults);
  return {
    ...defaults,
    ...options,
    document
  };
}
function setupMain(options = {}) {
  let config2 = createConfig(options);
  prepareDocument(config2.document), patchFocus(getWindow(config2.document).HTMLElement);
  var _config_document_defaultView;
  let view = (_config_document_defaultView = config2.document.defaultView) !== null && _config_document_defaultView !== void 0 ? _config_document_defaultView : (
    /* istanbul ignore next */
    globalThis.window
  );
  return attachClipboardStubToView(view), createInstance(config2).api;
}
function setupDirect({ keyboardState, pointerState, ...options } = {}, node) {
  let config2 = createConfig(options, defaultOptionsDirect, node);
  prepareDocument(config2.document), patchFocus(getWindow(config2.document).HTMLElement);
  var _ref;
  let system = (_ref = pointerState ?? keyboardState) !== null && _ref !== void 0 ? _ref : new System();
  return {
    api: createInstance(config2, system).api,
    system
  };
}
function setupSub(options) {
  return createInstance({
    ...this.config,
    ...options
  }, this.system).api;
}
function wrapAndBindImpl(instance, impl) {
  function method(...args) {
    return setLevelRef(instance, ApiLevel.Call), wrapAsync(() => impl.apply(instance, args).then(async (ret) => (await wait(instance.config), ret)));
  }
  return Object.defineProperty(method, "name", {
    get: () => impl.name
  }), method;
}
function createInstance(config2, system = new System()) {
  let instance = {};
  return Object.assign(instance, {
    config: config2,
    dispatchEvent: dispatchEvent.bind(instance),
    dispatchUIEvent: dispatchUIEvent.bind(instance),
    system,
    levelRefs: {},
    ...userEventApi
  }), {
    instance,
    api: {
      ...Object.fromEntries(Object.entries(userEventApi).map(([name, api]) => [
        name,
        wrapAndBindImpl(instance, api)
      ])),
      setup: setupSub.bind(instance)
    }
  };
}
function getDocument(options, node, defaults) {
  var _options_document, _ref;
  return (_ref = (_options_document = options.document) !== null && _options_document !== void 0 ? _options_document : node && getDocumentFromNode(node)) !== null && _ref !== void 0 ? _ref : defaults.document;
}

// ../../node_modules/@testing-library/user-event/dist/esm/setup/directApi.js
var directApi_exports = {};
__export(directApi_exports, {
  clear: () => clear2,
  click: () => click2,
  copy: () => copy2,
  cut: () => cut2,
  dblClick: () => dblClick2,
  deselectOptions: () => deselectOptions2,
  hover: () => hover2,
  keyboard: () => keyboard2,
  paste: () => paste2,
  pointer: () => pointer2,
  selectOptions: () => selectOptions2,
  tab: () => tab2,
  tripleClick: () => tripleClick2,
  type: () => type4,
  unhover: () => unhover2,
  upload: () => upload2
});
function clear2(element) {
  return setupDirect().api.clear(element);
}
function click2(element, options = {}) {
  return setupDirect(options, element).api.click(element);
}
function copy2(options = {}) {
  return setupDirect(options).api.copy();
}
function cut2(options = {}) {
  return setupDirect(options).api.cut();
}
function dblClick2(element, options = {}) {
  return setupDirect(options).api.dblClick(element);
}
function deselectOptions2(select, values, options = {}) {
  return setupDirect(options).api.deselectOptions(select, values);
}
function hover2(element, options = {}) {
  return setupDirect(options).api.hover(element);
}
async function keyboard2(text, options = {}) {
  let { api, system } = setupDirect(options);
  return api.keyboard(text).then(() => system);
}
async function pointer2(input2, options = {}) {
  let { api, system } = setupDirect(options);
  return api.pointer(input2).then(() => system);
}
function paste2(clipboardData, options) {
  return setupDirect(options).api.paste(clipboardData);
}
function selectOptions2(select, values, options = {}) {
  return setupDirect(options).api.selectOptions(select, values);
}
function tripleClick2(element, options = {}) {
  return setupDirect(options).api.tripleClick(element);
}
function type4(element, text, options = {}) {
  return setupDirect(options, element).api.type(element, text, options);
}
function unhover2(element, options = {}) {
  let { api, system } = setupDirect(options);
  return system.pointer.setMousePosition({
    target: element
  }), api.unhover(element);
}
function upload2(element, fileOrFiles, options = {}) {
  return setupDirect(options).api.upload(element, fileOrFiles);
}
function tab2(options = {}) {
  return setupDirect().api.tab(options);
}

// ../../node_modules/@testing-library/user-event/dist/esm/setup/index.js
var userEvent = {
  ...directApi_exports,
  setup: setupMain
};

// src/test/testing-library.ts
import { once } from "storybook/internal/client-logger";
import { instrument } from "storybook/internal/instrumenter";
var testingLibrary = instrument(
  { ...domTestingLibrary },
  {
    getKeys: (obj) => Object.keys(obj).filter((key) => key !== "eventWrapper"),
    intercept: (method, path) => path[0] === "fireEvent" || method.startsWith("find") || method.startsWith("waitFor")
  }
);
testingLibrary.screen = new Proxy(testingLibrary.screen, {
  get(target, prop, receiver) {
    return typeof window < "u" && globalThis.location?.href?.includes("viewMode=docs") && once.warn(dedent`
        You are using Testing Library's \`screen\` object while the story is rendered in docs mode. This will likely lead to issues, as multiple stories are rendered in the same page and therefore screen will potentially find multiple elements. Use the \`canvas\` utility from the story context instead, which will scope the queries to each story's canvas.

        More info: https://storybook.js.org/docs/writing-tests/interaction-testing?ref=error#querying-the-canvas
      `), Reflect.get(target, prop, receiver);
  }
});
var {
  buildQueries,
  configure,
  createEvent: createEvent2,
  fireEvent,
  findAllByAltText,
  findAllByDisplayValue,
  findAllByLabelText,
  findAllByPlaceholderText,
  findAllByRole,
  findAllByTestId,
  findAllByText,
  findAllByTitle,
  findByAltText,
  findByDisplayValue,
  findByLabelText,
  findByPlaceholderText,
  findByRole,
  findByTestId,
  findByText,
  findByTitle,
  getAllByAltText,
  getAllByDisplayValue,
  getAllByLabelText,
  getAllByPlaceholderText,
  getAllByRole,
  getAllByTestId,
  getAllByText,
  getAllByTitle,
  getByAltText,
  getByDisplayValue,
  getByLabelText,
  getByPlaceholderText,
  getByRole,
  getByTestId,
  getByText,
  getByTitle,
  getConfig: getConfig4,
  getDefaultNormalizer,
  getElementError,
  getNodeText,
  getQueriesForElement,
  getRoles,
  getSuggestedQuery,
  isInaccessible,
  logDOM,
  logRoles,
  prettyDOM,
  queries,
  queryAllByAltText,
  queryAllByAttribute,
  queryAllByDisplayValue,
  queryAllByLabelText,
  queryAllByPlaceholderText,
  queryAllByRole,
  queryAllByTestId,
  queryAllByText,
  queryAllByTitle,
  queryByAltText,
  queryByAttribute,
  queryByDisplayValue,
  queryByLabelText,
  queryByPlaceholderText,
  queryByRole,
  queryByTestId,
  queryByText,
  queryByTitle,
  queryHelpers,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
  prettyFormat
} = testingLibrary, uninstrumentedUserEvent = userEvent, { userEvent: userEvent2 } = instrument(
  { userEvent },
  { intercept: !0, getKeys: (obj) => Object.keys(obj).filter((key) => key !== "eventWrapper") }
);

// src/test/index.ts
var { expect: expect3 } = instrument2(
  { expect: expect2 },
  {
    getKeys: (obj, depth) => {
      if ("constructor" in obj && obj.constructor === Assertion) {
        let privateApi = ["assert", "__methods", "__flags", "_obj"], keys2 = Object.keys(Object.getPrototypeOf(obj)).filter(
          (it) => !privateApi.includes(it)
        );
        return depth > 2 ? keys2 : [...keys2, "not"];
      }
      return "any" in obj ? Object.keys(obj).filter((it) => it !== "any") : Object.keys(obj);
    },
    mutate: !0,
    intercept: (method) => method !== "expect"
  }
), sb = {
  mock: () => {
  }
};
export {
  buildQueries,
  clearAllMocks,
  configure,
  createEvent2 as createEvent,
  expect3 as expect,
  findAllByAltText,
  findAllByDisplayValue,
  findAllByLabelText,
  findAllByPlaceholderText,
  findAllByRole,
  findAllByTestId,
  findAllByText,
  findAllByTitle,
  findByAltText,
  findByDisplayValue,
  findByLabelText,
  findByPlaceholderText,
  findByRole,
  findByTestId,
  findByText,
  findByTitle,
  fireEvent,
  fn2 as fn,
  getAllByAltText,
  getAllByDisplayValue,
  getAllByLabelText,
  getAllByPlaceholderText,
  getAllByRole,
  getAllByTestId,
  getAllByText,
  getAllByTitle,
  getByAltText,
  getByDisplayValue,
  getByLabelText,
  getByPlaceholderText,
  getByRole,
  getByTestId,
  getByText,
  getByTitle,
  getConfig4 as getConfig,
  getDefaultNormalizer,
  getElementError,
  getNodeText,
  getQueriesForElement,
  getRoles,
  getSuggestedQuery,
  isInaccessible,
  isMockFunction2 as isMockFunction,
  logDOM,
  logRoles,
  mocked,
  mocks,
  onMockCall,
  prettyDOM,
  prettyFormat,
  queries,
  queryAllByAltText,
  queryAllByAttribute,
  queryAllByDisplayValue,
  queryAllByLabelText,
  queryAllByPlaceholderText,
  queryAllByRole,
  queryAllByTestId,
  queryAllByText,
  queryAllByTitle,
  queryByAltText,
  queryByAttribute,
  queryByDisplayValue,
  queryByLabelText,
  queryByPlaceholderText,
  queryByRole,
  queryByTestId,
  queryByText,
  queryByTitle,
  queryHelpers,
  resetAllMocks,
  restoreAllMocks,
  sb,
  screen,
  spyOn2 as spyOn,
  uninstrumentedUserEvent,
  userEvent2 as userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within
};
