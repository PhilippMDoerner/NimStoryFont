"use strict";
var Te = Object.create;
var F = Object.defineProperty;
var Ie = Object.getOwnPropertyDescriptor;
var Fe = Object.getOwnPropertyNames;
var Be = Object.getPrototypeOf, Me = Object.prototype.hasOwnProperty;
var c = (n, e) => F(n, "name", { value: e, configurable: !0 });
var b = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports);
var We = (n, e, t, i) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Fe(e))
      !Me.call(n, s) && s !== t && F(n, s, { get: () => e[s], enumerable: !(i = Ie(e, s)) || i.enumerable });
  return n;
};
var S = (n, e, t) => (t = n != null ? Te(Be(n)) : {}, We(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !n || !n.__esModule ? F(t, "default", { value: n, enumerable: !0 }) : t,
  n
));

// ../node_modules/commander/lib/error.js
var A = b((M) => {
  var j = class extends Error {
    static {
      c(this, "CommanderError");
    }
    /**
     * Constructs the CommanderError class
     * @param {number} exitCode suggested exit code which could be used with process.exit
     * @param {string} code an id string representing the error
     * @param {string} message human-readable description of the error
     */
    constructor(e, t, i) {
      super(i), Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, this.code = t, this.exitCode = e, this.nestedError =
      void 0;
    }
  }, B = class extends j {
    static {
      c(this, "InvalidArgumentError");
    }
    /**
     * Constructs the InvalidArgumentError class
     * @param {string} [message] explanation of why argument is invalid
     */
    constructor(e) {
      super(1, "commander.invalidArgument", e), Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name;
    }
  };
  M.CommanderError = j;
  M.InvalidArgumentError = B;
});

// ../node_modules/commander/lib/argument.js
var $ = b((L) => {
  var { InvalidArgumentError: Le } = A(), W = class {
    static {
      c(this, "Argument");
    }
    /**
     * Initialize a new command argument with the given name and description.
     * The default is that the argument is required, and you can explicitly
     * indicate this with <> around the name. Put [] around the name for an optional argument.
     *
     * @param {string} name
     * @param {string} [description]
     */
    constructor(e, t) {
      switch (this.description = t || "", this.variadic = !1, this.parseArg = void 0, this.defaultValue = void 0, this.defaultValueDescription =
      void 0, this.argChoices = void 0, e[0]) {
        case "<":
          this.required = !0, this._name = e.slice(1, -1);
          break;
        case "[":
          this.required = !1, this._name = e.slice(1, -1);
          break;
        default:
          this.required = !0, this._name = e;
          break;
      }
      this._name.length > 3 && this._name.slice(-3) === "..." && (this.variadic = !0, this._name = this._name.slice(0, -3));
    }
    /**
     * Return argument name.
     *
     * @return {string}
     */
    name() {
      return this._name;
    }
    /**
     * @package
     */
    _concatValue(e, t) {
      return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e);
    }
    /**
     * Set the default value, and optionally supply the description to be displayed in the help.
     *
     * @param {*} value
     * @param {string} [description]
     * @return {Argument}
     */
    default(e, t) {
      return this.defaultValue = e, this.defaultValueDescription = t, this;
    }
    /**
     * Set the custom handler for processing CLI command arguments into argument values.
     *
     * @param {Function} [fn]
     * @return {Argument}
     */
    argParser(e) {
      return this.parseArg = e, this;
    }
    /**
     * Only allow argument value to be one of choices.
     *
     * @param {string[]} values
     * @return {Argument}
     */
    choices(e) {
      return this.argChoices = e.slice(), this.parseArg = (t, i) => {
        if (!this.argChoices.includes(t))
          throw new Le(
            `Allowed choices are ${this.argChoices.join(", ")}.`
          );
        return this.variadic ? this._concatValue(t, i) : t;
      }, this;
    }
    /**
     * Make argument required.
     *
     * @returns {Argument}
     */
    argRequired() {
      return this.required = !0, this;
    }
    /**
     * Make argument optional.
     *
     * @returns {Argument}
     */
    argOptional() {
      return this.required = !1, this;
    }
  };
  function Re(n) {
    let e = n.name() + (n.variadic === !0 ? "..." : "");
    return n.required ? "<" + e + ">" : "[" + e + "]";
  }
  c(Re, "humanReadableArgName");
  L.Argument = W;
  L.humanReadableArgName = Re;
});

// ../node_modules/commander/lib/help.js
var G = b((ae) => {
  var { humanReadableArgName: Ge } = $(), R = class {
    static {
      c(this, "Help");
    }
    constructor() {
      this.helpWidth = void 0, this.sortSubcommands = !1, this.sortOptions = !1, this.showGlobalOptions = !1;
    }
    /**
     * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
     *
     * @param {Command} cmd
     * @returns {Command[]}
     */
    visibleCommands(e) {
      let t = e.commands.filter((s) => !s._hidden), i = e._getHelpCommand();
      return i && !i._hidden && t.push(i), this.sortSubcommands && t.sort((s, r) => s.name().localeCompare(r.name())), t;
    }
    /**
     * Compare options for sort.
     *
     * @param {Option} a
     * @param {Option} b
     * @returns {number}
     */
    compareOptions(e, t) {
      let i = /* @__PURE__ */ c((s) => s.short ? s.short.replace(/^-/, "") : s.long.replace(/^--/, ""), "getSortKey");
      return i(e).localeCompare(i(t));
    }
    /**
     * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
     *
     * @param {Command} cmd
     * @returns {Option[]}
     */
    visibleOptions(e) {
      let t = e.options.filter((s) => !s.hidden), i = e._getHelpOption();
      if (i && !i.hidden) {
        let s = i.short && e._findOption(i.short), r = i.long && e._findOption(i.long);
        !s && !r ? t.push(i) : i.long && !r ? t.push(
          e.createOption(i.long, i.description)
        ) : i.short && !s && t.push(
          e.createOption(i.short, i.description)
        );
      }
      return this.sortOptions && t.sort(this.compareOptions), t;
    }
    /**
     * Get an array of the visible global options. (Not including help.)
     *
     * @param {Command} cmd
     * @returns {Option[]}
     */
    visibleGlobalOptions(e) {
      if (!this.showGlobalOptions) return [];
      let t = [];
      for (let i = e.parent; i; i = i.parent) {
        let s = i.options.filter(
          (r) => !r.hidden
        );
        t.push(...s);
      }
      return this.sortOptions && t.sort(this.compareOptions), t;
    }
    /**
     * Get an array of the arguments if any have a description.
     *
     * @param {Command} cmd
     * @returns {Argument[]}
     */
    visibleArguments(e) {
      return e._argsDescription && e.registeredArguments.forEach((t) => {
        t.description = t.description || e._argsDescription[t.name()] || "";
      }), e.registeredArguments.find((t) => t.description) ? e.registeredArguments : [];
    }
    /**
     * Get the command term to show in the list of subcommands.
     *
     * @param {Command} cmd
     * @returns {string}
     */
    subcommandTerm(e) {
      let t = e.registeredArguments.map((i) => Ge(i)).join(" ");
      return e._name + (e._aliases[0] ? "|" + e._aliases[0] : "") + (e.options.length ? " [options]" : "") + // simplistic check for non-help option
      (t ? " " + t : "");
    }
    /**
     * Get the option term to show in the list of options.
     *
     * @param {Option} option
     * @returns {string}
     */
    optionTerm(e) {
      return e.flags;
    }
    /**
     * Get the argument term to show in the list of arguments.
     *
     * @param {Argument} argument
     * @returns {string}
     */
    argumentTerm(e) {
      return e.name();
    }
    /**
     * Get the longest command term length.
     *
     * @param {Command} cmd
     * @param {Help} helper
     * @returns {number}
     */
    longestSubcommandTermLength(e, t) {
      return t.visibleCommands(e).reduce((i, s) => Math.max(i, t.subcommandTerm(s).length), 0);
    }
    /**
     * Get the longest option term length.
     *
     * @param {Command} cmd
     * @param {Help} helper
     * @returns {number}
     */
    longestOptionTermLength(e, t) {
      return t.visibleOptions(e).reduce((i, s) => Math.max(i, t.optionTerm(s).length), 0);
    }
    /**
     * Get the longest global option term length.
     *
     * @param {Command} cmd
     * @param {Help} helper
     * @returns {number}
     */
    longestGlobalOptionTermLength(e, t) {
      return t.visibleGlobalOptions(e).reduce((i, s) => Math.max(i, t.optionTerm(s).length), 0);
    }
    /**
     * Get the longest argument term length.
     *
     * @param {Command} cmd
     * @param {Help} helper
     * @returns {number}
     */
    longestArgumentTermLength(e, t) {
      return t.visibleArguments(e).reduce((i, s) => Math.max(i, t.argumentTerm(s).length), 0);
    }
    /**
     * Get the command usage to be displayed at the top of the built-in help.
     *
     * @param {Command} cmd
     * @returns {string}
     */
    commandUsage(e) {
      let t = e._name;
      e._aliases[0] && (t = t + "|" + e._aliases[0]);
      let i = "";
      for (let s = e.parent; s; s = s.parent)
        i = s.name() + " " + i;
      return i + t + " " + e.usage();
    }
    /**
     * Get the description for the command.
     *
     * @param {Command} cmd
     * @returns {string}
     */
    commandDescription(e) {
      return e.description();
    }
    /**
     * Get the subcommand summary to show in the list of subcommands.
     * (Fallback to description for backwards compatibility.)
     *
     * @param {Command} cmd
     * @returns {string}
     */
    subcommandDescription(e) {
      return e.summary() || e.description();
    }
    /**
     * Get the option description to show in the list of options.
     *
     * @param {Option} option
     * @return {string}
     */
    optionDescription(e) {
      let t = [];
      return e.argChoices && t.push(
        // use stringify to match the display of the default value
        `choices: ${e.argChoices.map((i) => JSON.stringify(i)).join(", ")}`
      ), e.defaultValue !== void 0 && (e.required || e.optional || e.isBoolean() && typeof e.defaultValue == "boolean") && t.push(
        `default: ${e.defaultValueDescription || JSON.stringify(e.defaultValue)}`
      ), e.presetArg !== void 0 && e.optional && t.push(`preset: ${JSON.stringify(e.presetArg)}`), e.envVar !== void 0 && t.push(`env: ${e.envVar}`),
      t.length > 0 ? `${e.description} (${t.join(", ")})` : e.description;
    }
    /**
     * Get the argument description to show in the list of arguments.
     *
     * @param {Argument} argument
     * @return {string}
     */
    argumentDescription(e) {
      let t = [];
      if (e.argChoices && t.push(
        // use stringify to match the display of the default value
        `choices: ${e.argChoices.map((i) => JSON.stringify(i)).join(", ")}`
      ), e.defaultValue !== void 0 && t.push(
        `default: ${e.defaultValueDescription || JSON.stringify(e.defaultValue)}`
      ), t.length > 0) {
        let i = `(${t.join(", ")})`;
        return e.description ? `${e.description} ${i}` : i;
      }
      return e.description;
    }
    /**
     * Generate the built-in help text.
     *
     * @param {Command} cmd
     * @param {Help} helper
     * @returns {string}
     */
    formatHelp(e, t) {
      let i = t.padWidth(e, t), s = t.helpWidth || 80, r = 2, o = 2;
      function l(f, v) {
        if (v) {
          let I = `${f.padEnd(i + o)}${v}`;
          return t.wrap(
            I,
            s - r,
            i + o
          );
        }
        return f;
      }
      c(l, "formatItem");
      function a(f) {
        return f.join(`
`).replace(/^/gm, " ".repeat(r));
      }
      c(a, "formatList");
      let u = [`Usage: ${t.commandUsage(e)}`, ""], d = t.commandDescription(e);
      d.length > 0 && (u = u.concat([
        t.wrap(d, s, 0),
        ""
      ]));
      let h = t.visibleArguments(e).map((f) => l(
        t.argumentTerm(f),
        t.argumentDescription(f)
      ));
      h.length > 0 && (u = u.concat(["Arguments:", a(h), ""]));
      let m = t.visibleOptions(e).map((f) => l(
        t.optionTerm(f),
        t.optionDescription(f)
      ));
      if (m.length > 0 && (u = u.concat(["Options:", a(m), ""])), this.showGlobalOptions) {
        let f = t.visibleGlobalOptions(e).map((v) => l(
          t.optionTerm(v),
          t.optionDescription(v)
        ));
        f.length > 0 && (u = u.concat([
          "Global Options:",
          a(f),
          ""
        ]));
      }
      let x = t.visibleCommands(e).map((f) => l(
        t.subcommandTerm(f),
        t.subcommandDescription(f)
      ));
      return x.length > 0 && (u = u.concat(["Commands:", a(x), ""])), u.join(`
`);
    }
    /**
     * Calculate the pad width from the maximum term length.
     *
     * @param {Command} cmd
     * @param {Help} helper
     * @returns {number}
     */
    padWidth(e, t) {
      return Math.max(
        t.longestOptionTermLength(e, t),
        t.longestGlobalOptionTermLength(e, t),
        t.longestSubcommandTermLength(e, t),
        t.longestArgumentTermLength(e, t)
      );
    }
    /**
     * Wrap the given string to width characters per line, with lines after the first indented.
     * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
     *
     * @param {string} str
     * @param {number} width
     * @param {number} indent
     * @param {number} [minColumnWidth=40]
     * @return {string}
     *
     */
    wrap(e, t, i, s = 40) {
      let r = " \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF", o = new RegExp(`[\\n][${r}]+`);
      if (e.match(o)) return e;
      let l = t - i;
      if (l < s) return e;
      let a = e.slice(0, i), u = e.slice(i).replace(`\r
`, `
`), d = " ".repeat(i), m = "\\s\u200B", x = new RegExp(
        `
|.{1,${l - 1}}([${m}]|$)|[^${m}]+?([${m}]|$)`,
        "g"
      ), f = u.match(x) || [];
      return a + f.map((v, I) => v === `
` ? "" : (I > 0 ? d : "") + v.trimEnd()).join(`
`);
    }
  };
  ae.Help = R;
});

// ../node_modules/commander/lib/option.js
var z = b((Y) => {
  var { InvalidArgumentError: Ue } = A(), U = class {
    static {
      c(this, "Option");
    }
    /**
     * Initialize a new `Option` with the given `flags` and `description`.
     *
     * @param {string} flags
     * @param {string} [description]
     */
    constructor(e, t) {
      this.flags = e, this.description = t || "", this.required = e.includes("<"), this.optional = e.includes("["), this.variadic = /\w\.\.\.[>\]]$/.
      test(e), this.mandatory = !1;
      let i = Ye(e);
      this.short = i.shortFlag, this.long = i.longFlag, this.negate = !1, this.long && (this.negate = this.long.startsWith("--no-")), this.defaultValue =
      void 0, this.defaultValueDescription = void 0, this.presetArg = void 0, this.envVar = void 0, this.parseArg = void 0, this.hidden = !1,
      this.argChoices = void 0, this.conflictsWith = [], this.implied = void 0;
    }
    /**
     * Set the default value, and optionally supply the description to be displayed in the help.
     *
     * @param {*} value
     * @param {string} [description]
     * @return {Option}
     */
    default(e, t) {
      return this.defaultValue = e, this.defaultValueDescription = t, this;
    }
    /**
     * Preset to use when option used without option-argument, especially optional but also boolean and negated.
     * The custom processing (parseArg) is called.
     *
     * @example
     * new Option('--color').default('GREYSCALE').preset('RGB');
     * new Option('--donate [amount]').preset('20').argParser(parseFloat);
     *
     * @param {*} arg
     * @return {Option}
     */
    preset(e) {
      return this.presetArg = e, this;
    }
    /**
     * Add option name(s) that conflict with this option.
     * An error will be displayed if conflicting options are found during parsing.
     *
     * @example
     * new Option('--rgb').conflicts('cmyk');
     * new Option('--js').conflicts(['ts', 'jsx']);
     *
     * @param {(string | string[])} names
     * @return {Option}
     */
    conflicts(e) {
      return this.conflictsWith = this.conflictsWith.concat(e), this;
    }
    /**
     * Specify implied option values for when this option is set and the implied options are not.
     *
     * The custom processing (parseArg) is not called on the implied values.
     *
     * @example
     * program
     *   .addOption(new Option('--log', 'write logging information to file'))
     *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
     *
     * @param {object} impliedOptionValues
     * @return {Option}
     */
    implies(e) {
      let t = e;
      return typeof e == "string" && (t = { [e]: !0 }), this.implied = Object.assign(this.implied || {}, t), this;
    }
    /**
     * Set environment variable to check for option value.
     *
     * An environment variable is only used if when processed the current option value is
     * undefined, or the source of the current value is 'default' or 'config' or 'env'.
     *
     * @param {string} name
     * @return {Option}
     */
    env(e) {
      return this.envVar = e, this;
    }
    /**
     * Set the custom handler for processing CLI option arguments into option values.
     *
     * @param {Function} [fn]
     * @return {Option}
     */
    argParser(e) {
      return this.parseArg = e, this;
    }
    /**
     * Whether the option is mandatory and must have a value after parsing.
     *
     * @param {boolean} [mandatory=true]
     * @return {Option}
     */
    makeOptionMandatory(e = !0) {
      return this.mandatory = !!e, this;
    }
    /**
     * Hide option in help.
     *
     * @param {boolean} [hide=true]
     * @return {Option}
     */
    hideHelp(e = !0) {
      return this.hidden = !!e, this;
    }
    /**
     * @package
     */
    _concatValue(e, t) {
      return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e);
    }
    /**
     * Only allow option value to be one of choices.
     *
     * @param {string[]} values
     * @return {Option}
     */
    choices(e) {
      return this.argChoices = e.slice(), this.parseArg = (t, i) => {
        if (!this.argChoices.includes(t))
          throw new Ue(
            `Allowed choices are ${this.argChoices.join(", ")}.`
          );
        return this.variadic ? this._concatValue(t, i) : t;
      }, this;
    }
    /**
     * Return option name.
     *
     * @return {string}
     */
    name() {
      return this.long ? this.long.replace(/^--/, "") : this.short.replace(/^-/, "");
    }
    /**
     * Return option name, in a camelcase format that can be used
     * as a object attribute key.
     *
     * @return {string}
     */
    attributeName() {
      return Je(this.name().replace(/^no-/, ""));
    }
    /**
     * Check if `arg` matches the short or long flag.
     *
     * @param {string} arg
     * @return {boolean}
     * @package
     */
    is(e) {
      return this.short === e || this.long === e;
    }
    /**
     * Return whether a boolean option.
     *
     * Options are one of boolean, negated, required argument, or optional argument.
     *
     * @return {boolean}
     * @package
     */
    isBoolean() {
      return !this.required && !this.optional && !this.negate;
    }
  }, J = class {
    static {
      c(this, "DualOptions");
    }
    /**
     * @param {Option[]} options
     */
    constructor(e) {
      this.positiveOptions = /* @__PURE__ */ new Map(), this.negativeOptions = /* @__PURE__ */ new Map(), this.dualOptions = /* @__PURE__ */ new Set(),
      e.forEach((t) => {
        t.negate ? this.negativeOptions.set(t.attributeName(), t) : this.positiveOptions.set(t.attributeName(), t);
      }), this.negativeOptions.forEach((t, i) => {
        this.positiveOptions.has(i) && this.dualOptions.add(i);
      });
    }
    /**
     * Did the value come from the option, and not from possible matching dual option?
     *
     * @param {*} value
     * @param {Option} option
     * @returns {boolean}
     */
    valueFromOption(e, t) {
      let i = t.attributeName();
      if (!this.dualOptions.has(i)) return !0;
      let s = this.negativeOptions.get(i).presetArg, r = s !== void 0 ? s : !1;
      return t.negate === (r === e);
    }
  };
  function Je(n) {
    return n.split("-").reduce((e, t) => e + t[0].toUpperCase() + t.slice(1));
  }
  c(Je, "camelcase");
  function Ye(n) {
    let e, t, i = n.split(/[ |,]+/);
    return i.length > 1 && !/^[[<]/.test(i[1]) && (e = i.shift()), t = i.shift(), !e && /^-[^-]$/.test(t) && (e = t, t = void 0), { shortFlag: e,
    longFlag: t };
  }
  c(Ye, "splitOptionFlags");
  Y.Option = U;
  Y.DualOptions = J;
});

// ../node_modules/commander/lib/suggestSimilar.js
var ce = b((le) => {
  function ze(n, e) {
    if (Math.abs(n.length - e.length) > 3)
      return Math.max(n.length, e.length);
    let t = [];
    for (let i = 0; i <= n.length; i++)
      t[i] = [i];
    for (let i = 0; i <= e.length; i++)
      t[0][i] = i;
    for (let i = 1; i <= e.length; i++)
      for (let s = 1; s <= n.length; s++) {
        let r = 1;
        n[s - 1] === e[i - 1] ? r = 0 : r = 1, t[s][i] = Math.min(
          t[s - 1][i] + 1,
          // deletion
          t[s][i - 1] + 1,
          // insertion
          t[s - 1][i - 1] + r
          // substitution
        ), s > 1 && i > 1 && n[s - 1] === e[i - 2] && n[s - 2] === e[i - 1] && (t[s][i] = Math.min(t[s][i], t[s - 2][i - 2] + 1));
      }
    return t[n.length][e.length];
  }
  c(ze, "editDistance");
  function Ke(n, e) {
    if (!e || e.length === 0) return "";
    e = Array.from(new Set(e));
    let t = n.startsWith("--");
    t && (n = n.slice(2), e = e.map((o) => o.slice(2)));
    let i = [], s = 3, r = 0.4;
    return e.forEach((o) => {
      if (o.length <= 1) return;
      let l = ze(n, o), a = Math.max(n.length, o.length);
      (a - l) / a > r && (l < s ? (s = l, i = [o]) : l === s && i.push(o));
    }), i.sort((o, l) => o.localeCompare(l)), t && (i = i.map((o) => `--${o}`)), i.length > 1 ? `
(Did you mean one of ${i.join(", ")}?)` : i.length === 1 ? `
(Did you mean ${i[0]}?)` : "";
  }
  c(Ke, "suggestSimilar");
  le.suggestSimilar = Ke;
});

// ../node_modules/commander/lib/command.js
var me = b((pe) => {
  var Qe = require("node:events").EventEmitter, K = require("node:child_process"), y = require("node:path"), Q = require("node:fs"), p = require("node:process"),
  { Argument: Xe, humanReadableArgName: Ze } = $(), { CommanderError: X } = A(), { Help: et } = G(), { Option: ue, DualOptions: tt } = z(), {
  suggestSimilar: de } = ce(), Z = class n extends Qe {
    static {
      c(this, "Command");
    }
    /**
     * Initialize a new `Command`.
     *
     * @param {string} [name]
     */
    constructor(e) {
      super(), this.commands = [], this.options = [], this.parent = null, this._allowUnknownOption = !1, this._allowExcessArguments = !0, this.
      registeredArguments = [], this._args = this.registeredArguments, this.args = [], this.rawArgs = [], this.processedArgs = [], this._scriptPath =
      null, this._name = e || "", this._optionValues = {}, this._optionValueSources = {}, this._storeOptionsAsProperties = !1, this._actionHandler =
      null, this._executableHandler = !1, this._executableFile = null, this._executableDir = null, this._defaultCommandName = null, this._exitCallback =
      null, this._aliases = [], this._combineFlagAndOptionalValue = !0, this._description = "", this._summary = "", this._argsDescription = void 0,
      this._enablePositionalOptions = !1, this._passThroughOptions = !1, this._lifeCycleHooks = {}, this._showHelpAfterError = !1, this._showSuggestionAfterError =
      !0, this._outputConfiguration = {
        writeOut: /* @__PURE__ */ c((t) => p.stdout.write(t), "writeOut"),
        writeErr: /* @__PURE__ */ c((t) => p.stderr.write(t), "writeErr"),
        getOutHelpWidth: /* @__PURE__ */ c(() => p.stdout.isTTY ? p.stdout.columns : void 0, "getOutHelpWidth"),
        getErrHelpWidth: /* @__PURE__ */ c(() => p.stderr.isTTY ? p.stderr.columns : void 0, "getErrHelpWidth"),
        outputError: /* @__PURE__ */ c((t, i) => i(t), "outputError")
      }, this._hidden = !1, this._helpOption = void 0, this._addImplicitHelpCommand = void 0, this._helpCommand = void 0, this._helpConfiguration =
      {};
    }
    /**
     * Copy settings that are useful to have in common across root command and subcommands.
     *
     * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
     *
     * @param {Command} sourceCommand
     * @return {Command} `this` command for chaining
     */
    copyInheritedSettings(e) {
      return this._outputConfiguration = e._outputConfiguration, this._helpOption = e._helpOption, this._helpCommand = e._helpCommand, this.
      _helpConfiguration = e._helpConfiguration, this._exitCallback = e._exitCallback, this._storeOptionsAsProperties = e._storeOptionsAsProperties,
      this._combineFlagAndOptionalValue = e._combineFlagAndOptionalValue, this._allowExcessArguments = e._allowExcessArguments, this._enablePositionalOptions =
      e._enablePositionalOptions, this._showHelpAfterError = e._showHelpAfterError, this._showSuggestionAfterError = e._showSuggestionAfterError,
      this;
    }
    /**
     * @returns {Command[]}
     * @private
     */
    _getCommandAndAncestors() {
      let e = [];
      for (let t = this; t; t = t.parent)
        e.push(t);
      return e;
    }
    /**
     * Define a command.
     *
     * There are two styles of command: pay attention to where to put the description.
     *
     * @example
     * // Command implemented using action handler (description is supplied separately to `.command`)
     * program
     *   .command('clone <source> [destination]')
     *   .description('clone a repository into a newly created directory')
     *   .action((source, destination) => {
     *     console.log('clone command called');
     *   });
     *
     * // Command implemented using separate executable file (description is second parameter to `.command`)
     * program
     *   .command('start <service>', 'start named service')
     *   .command('stop [service]', 'stop named service, or all if no name supplied');
     *
     * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
     * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
     * @param {object} [execOpts] - configuration options (for executable)
     * @return {Command} returns new command for action handler, or `this` for executable command
     */
    command(e, t, i) {
      let s = t, r = i;
      typeof s == "object" && s !== null && (r = s, s = null), r = r || {};
      let [, o, l] = e.match(/([^ ]+) *(.*)/), a = this.createCommand(o);
      return s && (a.description(s), a._executableHandler = !0), r.isDefault && (this._defaultCommandName = a._name), a._hidden = !!(r.noHelp ||
      r.hidden), a._executableFile = r.executableFile || null, l && a.arguments(l), this._registerCommand(a), a.parent = this, a.copyInheritedSettings(
      this), s ? this : a;
    }
    /**
     * Factory routine to create a new unattached command.
     *
     * See .command() for creating an attached subcommand, which uses this routine to
     * create the command. You can override createCommand to customise subcommands.
     *
     * @param {string} [name]
     * @return {Command} new command
     */
    createCommand(e) {
      return new n(e);
    }
    /**
     * You can customise the help with a subclass of Help by overriding createHelp,
     * or by overriding Help properties using configureHelp().
     *
     * @return {Help}
     */
    createHelp() {
      return Object.assign(new et(), this.configureHelp());
    }
    /**
     * You can customise the help by overriding Help properties using configureHelp(),
     * or with a subclass of Help by overriding createHelp().
     *
     * @param {object} [configuration] - configuration options
     * @return {(Command | object)} `this` command for chaining, or stored configuration
     */
    configureHelp(e) {
      return e === void 0 ? this._helpConfiguration : (this._helpConfiguration = e, this);
    }
    /**
     * The default output goes to stdout and stderr. You can customise this for special
     * applications. You can also customise the display of errors by overriding outputError.
     *
     * The configuration properties are all functions:
     *
     *     // functions to change where being written, stdout and stderr
     *     writeOut(str)
     *     writeErr(str)
     *     // matching functions to specify width for wrapping help
     *     getOutHelpWidth()
     *     getErrHelpWidth()
     *     // functions based on what is being written out
     *     outputError(str, write) // used for displaying errors, and not used for displaying help
     *
     * @param {object} [configuration] - configuration options
     * @return {(Command | object)} `this` command for chaining, or stored configuration
     */
    configureOutput(e) {
      return e === void 0 ? this._outputConfiguration : (Object.assign(this._outputConfiguration, e), this);
    }
    /**
     * Display the help or a custom message after an error occurs.
     *
     * @param {(boolean|string)} [displayHelp]
     * @return {Command} `this` command for chaining
     */
    showHelpAfterError(e = !0) {
      return typeof e != "string" && (e = !!e), this._showHelpAfterError = e, this;
    }
    /**
     * Display suggestion of similar commands for unknown commands, or options for unknown options.
     *
     * @param {boolean} [displaySuggestion]
     * @return {Command} `this` command for chaining
     */
    showSuggestionAfterError(e = !0) {
      return this._showSuggestionAfterError = !!e, this;
    }
    /**
     * Add a prepared subcommand.
     *
     * See .command() for creating an attached subcommand which inherits settings from its parent.
     *
     * @param {Command} cmd - new subcommand
     * @param {object} [opts] - configuration options
     * @return {Command} `this` command for chaining
     */
    addCommand(e, t) {
      if (!e._name)
        throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
      return t = t || {}, t.isDefault && (this._defaultCommandName = e._name), (t.noHelp || t.hidden) && (e._hidden = !0), this._registerCommand(
      e), e.parent = this, e._checkForBrokenPassThrough(), this;
    }
    /**
     * Factory routine to create a new unattached argument.
     *
     * See .argument() for creating an attached argument, which uses this routine to
     * create the argument. You can override createArgument to return a custom argument.
     *
     * @param {string} name
     * @param {string} [description]
     * @return {Argument} new argument
     */
    createArgument(e, t) {
      return new Xe(e, t);
    }
    /**
     * Define argument syntax for command.
     *
     * The default is that the argument is required, and you can explicitly
     * indicate this with <> around the name. Put [] around the name for an optional argument.
     *
     * @example
     * program.argument('<input-file>');
     * program.argument('[output-file]');
     *
     * @param {string} name
     * @param {string} [description]
     * @param {(Function|*)} [fn] - custom argument processing function
     * @param {*} [defaultValue]
     * @return {Command} `this` command for chaining
     */
    argument(e, t, i, s) {
      let r = this.createArgument(e, t);
      return typeof i == "function" ? r.default(s).argParser(i) : r.default(i), this.addArgument(r), this;
    }
    /**
     * Define argument syntax for command, adding multiple at once (without descriptions).
     *
     * See also .argument().
     *
     * @example
     * program.arguments('<cmd> [env]');
     *
     * @param {string} names
     * @return {Command} `this` command for chaining
     */
    arguments(e) {
      return e.trim().split(/ +/).forEach((t) => {
        this.argument(t);
      }), this;
    }
    /**
     * Define argument syntax for command, adding a prepared argument.
     *
     * @param {Argument} argument
     * @return {Command} `this` command for chaining
     */
    addArgument(e) {
      let t = this.registeredArguments.slice(-1)[0];
      if (t && t.variadic)
        throw new Error(
          `only the last argument can be variadic '${t.name()}'`
        );
      if (e.required && e.defaultValue !== void 0 && e.parseArg === void 0)
        throw new Error(
          `a default value for a required argument is never used: '${e.name()}'`
        );
      return this.registeredArguments.push(e), this;
    }
    /**
     * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
     *
     * @example
     *    program.helpCommand('help [cmd]');
     *    program.helpCommand('help [cmd]', 'show help');
     *    program.helpCommand(false); // suppress default help command
     *    program.helpCommand(true); // add help command even if no subcommands
     *
     * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
     * @param {string} [description] - custom description
     * @return {Command} `this` command for chaining
     */
    helpCommand(e, t) {
      if (typeof e == "boolean")
        return this._addImplicitHelpCommand = e, this;
      e = e ?? "help [command]";
      let [, i, s] = e.match(/([^ ]+) *(.*)/), r = t ?? "display help for command", o = this.createCommand(i);
      return o.helpOption(!1), s && o.arguments(s), r && o.description(r), this._addImplicitHelpCommand = !0, this._helpCommand = o, this;
    }
    /**
     * Add prepared custom help command.
     *
     * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
     * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
     * @return {Command} `this` command for chaining
     */
    addHelpCommand(e, t) {
      return typeof e != "object" ? (this.helpCommand(e, t), this) : (this._addImplicitHelpCommand = !0, this._helpCommand = e, this);
    }
    /**
     * Lazy create help command.
     *
     * @return {(Command|null)}
     * @package
     */
    _getHelpCommand() {
      return this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help")) ? (this._helpCommand ===
      void 0 && this.helpCommand(void 0, void 0), this._helpCommand) : null;
    }
    /**
     * Add hook for life cycle event.
     *
     * @param {string} event
     * @param {Function} listener
     * @return {Command} `this` command for chaining
     */
    hook(e, t) {
      let i = ["preSubcommand", "preAction", "postAction"];
      if (!i.includes(e))
        throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${i.join("', '")}'`);
      return this._lifeCycleHooks[e] ? this._lifeCycleHooks[e].push(t) : this._lifeCycleHooks[e] = [t], this;
    }
    /**
     * Register callback to use as replacement for calling process.exit.
     *
     * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
     * @return {Command} `this` command for chaining
     */
    exitOverride(e) {
      return e ? this._exitCallback = e : this._exitCallback = (t) => {
        if (t.code !== "commander.executeSubCommandAsync")
          throw t;
      }, this;
    }
    /**
     * Call process.exit, and _exitCallback if defined.
     *
     * @param {number} exitCode exit code for using with process.exit
     * @param {string} code an id string representing the error
     * @param {string} message human-readable description of the error
     * @return never
     * @private
     */
    _exit(e, t, i) {
      this._exitCallback && this._exitCallback(new X(e, t, i)), p.exit(e);
    }
    /**
     * Register callback `fn` for the command.
     *
     * @example
     * program
     *   .command('serve')
     *   .description('start service')
     *   .action(function() {
     *      // do work here
     *   });
     *
     * @param {Function} fn
     * @return {Command} `this` command for chaining
     */
    action(e) {
      let t = /* @__PURE__ */ c((i) => {
        let s = this.registeredArguments.length, r = i.slice(0, s);
        return this._storeOptionsAsProperties ? r[s] = this : r[s] = this.opts(), r.push(this), e.apply(this, r);
      }, "listener");
      return this._actionHandler = t, this;
    }
    /**
     * Factory routine to create a new unattached option.
     *
     * See .option() for creating an attached option, which uses this routine to
     * create the option. You can override createOption to return a custom option.
     *
     * @param {string} flags
     * @param {string} [description]
     * @return {Option} new option
     */
    createOption(e, t) {
      return new ue(e, t);
    }
    /**
     * Wrap parseArgs to catch 'commander.invalidArgument'.
     *
     * @param {(Option | Argument)} target
     * @param {string} value
     * @param {*} previous
     * @param {string} invalidArgumentMessage
     * @private
     */
    _callParseArg(e, t, i, s) {
      try {
        return e.parseArg(t, i);
      } catch (r) {
        if (r.code === "commander.invalidArgument") {
          let o = `${s} ${r.message}`;
          this.error(o, { exitCode: r.exitCode, code: r.code });
        }
        throw r;
      }
    }
    /**
     * Check for option flag conflicts.
     * Register option if no conflicts found, or throw on conflict.
     *
     * @param {Option} option
     * @private
     */
    _registerOption(e) {
      let t = e.short && this._findOption(e.short) || e.long && this._findOption(e.long);
      if (t) {
        let i = e.long && this._findOption(e.long) ? e.long : e.short;
        throw new Error(`Cannot add option '${e.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${i}'
-  already used by option '${t.flags}'`);
      }
      this.options.push(e);
    }
    /**
     * Check for command name and alias conflicts with existing commands.
     * Register command if no conflicts found, or throw on conflict.
     *
     * @param {Command} command
     * @private
     */
    _registerCommand(e) {
      let t = /* @__PURE__ */ c((s) => [s.name()].concat(s.aliases()), "knownBy"), i = t(e).find(
        (s) => this._findCommand(s)
      );
      if (i) {
        let s = t(this._findCommand(i)).join("|"), r = t(e).join("|");
        throw new Error(
          `cannot add command '${r}' as already have command '${s}'`
        );
      }
      this.commands.push(e);
    }
    /**
     * Add an option.
     *
     * @param {Option} option
     * @return {Command} `this` command for chaining
     */
    addOption(e) {
      this._registerOption(e);
      let t = e.name(), i = e.attributeName();
      if (e.negate) {
        let r = e.long.replace(/^--no-/, "--");
        this._findOption(r) || this.setOptionValueWithSource(
          i,
          e.defaultValue === void 0 ? !0 : e.defaultValue,
          "default"
        );
      } else e.defaultValue !== void 0 && this.setOptionValueWithSource(i, e.defaultValue, "default");
      let s = /* @__PURE__ */ c((r, o, l) => {
        r == null && e.presetArg !== void 0 && (r = e.presetArg);
        let a = this.getOptionValue(i);
        r !== null && e.parseArg ? r = this._callParseArg(e, r, a, o) : r !== null && e.variadic && (r = e._concatValue(r, a)), r == null &&
        (e.negate ? r = !1 : e.isBoolean() || e.optional ? r = !0 : r = ""), this.setOptionValueWithSource(i, r, l);
      }, "handleOptionValue");
      return this.on("option:" + t, (r) => {
        let o = `error: option '${e.flags}' argument '${r}' is invalid.`;
        s(r, o, "cli");
      }), e.envVar && this.on("optionEnv:" + t, (r) => {
        let o = `error: option '${e.flags}' value '${r}' from env '${e.envVar}' is invalid.`;
        s(r, o, "env");
      }), this;
    }
    /**
     * Internal implementation shared by .option() and .requiredOption()
     *
     * @return {Command} `this` command for chaining
     * @private
     */
    _optionEx(e, t, i, s, r) {
      if (typeof t == "object" && t instanceof ue)
        throw new Error(
          "To add an Option object use addOption() instead of option() or requiredOption()"
        );
      let o = this.createOption(t, i);
      if (o.makeOptionMandatory(!!e.mandatory), typeof s == "function")
        o.default(r).argParser(s);
      else if (s instanceof RegExp) {
        let l = s;
        s = /* @__PURE__ */ c((a, u) => {
          let d = l.exec(a);
          return d ? d[0] : u;
        }, "fn"), o.default(r).argParser(s);
      } else
        o.default(s);
      return this.addOption(o);
    }
    /**
     * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
     *
     * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
     * option-argument is indicated by `<>` and an optional option-argument by `[]`.
     *
     * See the README for more details, and see also addOption() and requiredOption().
     *
     * @example
     * program
     *     .option('-p, --pepper', 'add pepper')
     *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required option-argument
     *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
     *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
     *
     * @param {string} flags
     * @param {string} [description]
     * @param {(Function|*)} [parseArg] - custom option processing function or default value
     * @param {*} [defaultValue]
     * @return {Command} `this` command for chaining
     */
    option(e, t, i, s) {
      return this._optionEx({}, e, t, i, s);
    }
    /**
     * Add a required option which must have a value after parsing. This usually means
     * the option must be specified on the command line. (Otherwise the same as .option().)
     *
     * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
     *
     * @param {string} flags
     * @param {string} [description]
     * @param {(Function|*)} [parseArg] - custom option processing function or default value
     * @param {*} [defaultValue]
     * @return {Command} `this` command for chaining
     */
    requiredOption(e, t, i, s) {
      return this._optionEx(
        { mandatory: !0 },
        e,
        t,
        i,
        s
      );
    }
    /**
     * Alter parsing of short flags with optional values.
     *
     * @example
     * // for `.option('-f,--flag [value]'):
     * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
     * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
     *
     * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
     * @return {Command} `this` command for chaining
     */
    combineFlagAndOptionalValue(e = !0) {
      return this._combineFlagAndOptionalValue = !!e, this;
    }
    /**
     * Allow unknown options on the command line.
     *
     * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
     * @return {Command} `this` command for chaining
     */
    allowUnknownOption(e = !0) {
      return this._allowUnknownOption = !!e, this;
    }
    /**
     * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
     *
     * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
     * @return {Command} `this` command for chaining
     */
    allowExcessArguments(e = !0) {
      return this._allowExcessArguments = !!e, this;
    }
    /**
     * Enable positional options. Positional means global options are specified before subcommands which lets
     * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
     * The default behaviour is non-positional and global options may appear anywhere on the command line.
     *
     * @param {boolean} [positional]
     * @return {Command} `this` command for chaining
     */
    enablePositionalOptions(e = !0) {
      return this._enablePositionalOptions = !!e, this;
    }
    /**
     * Pass through options that come after command-arguments rather than treat them as command-options,
     * so actual command-options come before command-arguments. Turning this on for a subcommand requires
     * positional options to have been enabled on the program (parent commands).
     * The default behaviour is non-positional and options may appear before or after command-arguments.
     *
     * @param {boolean} [passThrough] for unknown options.
     * @return {Command} `this` command for chaining
     */
    passThroughOptions(e = !0) {
      return this._passThroughOptions = !!e, this._checkForBrokenPassThrough(), this;
    }
    /**
     * @private
     */
    _checkForBrokenPassThrough() {
      if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions)
        throw new Error(
          `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
        );
    }
    /**
     * Whether to store option values as properties on command object,
     * or store separately (specify false). In both cases the option values can be accessed using .opts().
     *
     * @param {boolean} [storeAsProperties=true]
     * @return {Command} `this` command for chaining
     */
    storeOptionsAsProperties(e = !0) {
      if (this.options.length)
        throw new Error("call .storeOptionsAsProperties() before adding options");
      if (Object.keys(this._optionValues).length)
        throw new Error(
          "call .storeOptionsAsProperties() before setting option values"
        );
      return this._storeOptionsAsProperties = !!e, this;
    }
    /**
     * Retrieve option value.
     *
     * @param {string} key
     * @return {object} value
     */
    getOptionValue(e) {
      return this._storeOptionsAsProperties ? this[e] : this._optionValues[e];
    }
    /**
     * Store option value.
     *
     * @param {string} key
     * @param {object} value
     * @return {Command} `this` command for chaining
     */
    setOptionValue(e, t) {
      return this.setOptionValueWithSource(e, t, void 0);
    }
    /**
     * Store option value and where the value came from.
     *
     * @param {string} key
     * @param {object} value
     * @param {string} source - expected values are default/config/env/cli/implied
     * @return {Command} `this` command for chaining
     */
    setOptionValueWithSource(e, t, i) {
      return this._storeOptionsAsProperties ? this[e] = t : this._optionValues[e] = t, this._optionValueSources[e] = i, this;
    }
    /**
     * Get source of option value.
     * Expected values are default | config | env | cli | implied
     *
     * @param {string} key
     * @return {string}
     */
    getOptionValueSource(e) {
      return this._optionValueSources[e];
    }
    /**
     * Get source of option value. See also .optsWithGlobals().
     * Expected values are default | config | env | cli | implied
     *
     * @param {string} key
     * @return {string}
     */
    getOptionValueSourceWithGlobals(e) {
      let t;
      return this._getCommandAndAncestors().forEach((i) => {
        i.getOptionValueSource(e) !== void 0 && (t = i.getOptionValueSource(e));
      }), t;
    }
    /**
     * Get user arguments from implied or explicit arguments.
     * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
     *
     * @private
     */
    _prepareUserArgs(e, t) {
      if (e !== void 0 && !Array.isArray(e))
        throw new Error("first parameter to parse must be array or undefined");
      if (t = t || {}, e === void 0 && t.from === void 0) {
        p.versions?.electron && (t.from = "electron");
        let s = p.execArgv ?? [];
        (s.includes("-e") || s.includes("--eval") || s.includes("-p") || s.includes("--print")) && (t.from = "eval");
      }
      e === void 0 && (e = p.argv), this.rawArgs = e.slice();
      let i;
      switch (t.from) {
        case void 0:
        case "node":
          this._scriptPath = e[1], i = e.slice(2);
          break;
        case "electron":
          p.defaultApp ? (this._scriptPath = e[1], i = e.slice(2)) : i = e.slice(1);
          break;
        case "user":
          i = e.slice(0);
          break;
        case "eval":
          i = e.slice(1);
          break;
        default:
          throw new Error(
            `unexpected parse option { from: '${t.from}' }`
          );
      }
      return !this._name && this._scriptPath && this.nameFromFilename(this._scriptPath), this._name = this._name || "program", i;
    }
    /**
     * Parse `argv`, setting options and invoking commands when defined.
     *
     * Use parseAsync instead of parse if any of your action handlers are async.
     *
     * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
     *
     * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
     * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
     * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
     * - `'user'`: just user arguments
     *
     * @example
     * program.parse(); // parse process.argv and auto-detect electron and special node flags
     * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
     * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
     *
     * @param {string[]} [argv] - optional, defaults to process.argv
     * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
     * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
     * @return {Command} `this` command for chaining
     */
    parse(e, t) {
      let i = this._prepareUserArgs(e, t);
      return this._parseCommand([], i), this;
    }
    /**
     * Parse `argv`, setting options and invoking commands when defined.
     *
     * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
     *
     * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
     * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
     * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
     * - `'user'`: just user arguments
     *
     * @example
     * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
     * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
     * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
     *
     * @param {string[]} [argv]
     * @param {object} [parseOptions]
     * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
     * @return {Promise}
     */
    async parseAsync(e, t) {
      let i = this._prepareUserArgs(e, t);
      return await this._parseCommand([], i), this;
    }
    /**
     * Execute a sub-command executable.
     *
     * @private
     */
    _executeSubCommand(e, t) {
      t = t.slice();
      let i = !1, s = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
      function r(d, h) {
        let m = y.resolve(d, h);
        if (Q.existsSync(m)) return m;
        if (s.includes(y.extname(h))) return;
        let x = s.find(
          (f) => Q.existsSync(`${m}${f}`)
        );
        if (x) return `${m}${x}`;
      }
      c(r, "findFile"), this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
      let o = e._executableFile || `${this._name}-${e._name}`, l = this._executableDir || "";
      if (this._scriptPath) {
        let d;
        try {
          d = Q.realpathSync(this._scriptPath);
        } catch {
          d = this._scriptPath;
        }
        l = y.resolve(
          y.dirname(d),
          l
        );
      }
      if (l) {
        let d = r(l, o);
        if (!d && !e._executableFile && this._scriptPath) {
          let h = y.basename(
            this._scriptPath,
            y.extname(this._scriptPath)
          );
          h !== this._name && (d = r(
            l,
            `${h}-${e._name}`
          ));
        }
        o = d || o;
      }
      i = s.includes(y.extname(o));
      let a;
      p.platform !== "win32" ? i ? (t.unshift(o), t = he(p.execArgv).concat(t), a = K.spawn(p.argv[0], t, { stdio: "inherit" })) : a = K.spawn(
      o, t, { stdio: "inherit" }) : (t.unshift(o), t = he(p.execArgv).concat(t), a = K.spawn(p.execPath, t, { stdio: "inherit" })), a.killed ||
      ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"].forEach((h) => {
        p.on(h, () => {
          a.killed === !1 && a.exitCode === null && a.kill(h);
        });
      });
      let u = this._exitCallback;
      a.on("close", (d) => {
        d = d ?? 1, u ? u(
          new X(
            d,
            "commander.executeSubCommandAsync",
            "(close)"
          )
        ) : p.exit(d);
      }), a.on("error", (d) => {
        if (d.code === "ENOENT") {
          let h = l ? `searched for local subcommand relative to directory '${l}'` : "no directory for search for local subcommand, use .exe\
cutableDir() to supply a custom directory", m = `'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\

 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${h}`;
          throw new Error(m);
        } else if (d.code === "EACCES")
          throw new Error(`'${o}' not executable`);
        if (!u)
          p.exit(1);
        else {
          let h = new X(
            1,
            "commander.executeSubCommandAsync",
            "(error)"
          );
          h.nestedError = d, u(h);
        }
      }), this.runningCommand = a;
    }
    /**
     * @private
     */
    _dispatchSubcommand(e, t, i) {
      let s = this._findCommand(e);
      s || this.help({ error: !0 });
      let r;
      return r = this._chainOrCallSubCommandHook(
        r,
        s,
        "preSubcommand"
      ), r = this._chainOrCall(r, () => {
        if (s._executableHandler)
          this._executeSubCommand(s, t.concat(i));
        else
          return s._parseCommand(t, i);
      }), r;
    }
    /**
     * Invoke help directly if possible, or dispatch if necessary.
     * e.g. help foo
     *
     * @private
     */
    _dispatchHelpCommand(e) {
      e || this.help();
      let t = this._findCommand(e);
      return t && !t._executableHandler && t.help(), this._dispatchSubcommand(
        e,
        [],
        [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
      );
    }
    /**
     * Check this.args against expected this.registeredArguments.
     *
     * @private
     */
    _checkNumberOfArguments() {
      this.registeredArguments.forEach((e, t) => {
        e.required && this.args[t] == null && this.missingArgument(e.name());
      }), !(this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) && this.args.length >
      this.registeredArguments.length && this._excessArguments(this.args);
    }
    /**
     * Process this.args using this.registeredArguments and save as this.processedArgs!
     *
     * @private
     */
    _processArguments() {
      let e = /* @__PURE__ */ c((i, s, r) => {
        let o = s;
        if (s !== null && i.parseArg) {
          let l = `error: command-argument value '${s}' is invalid for argument '${i.name()}'.`;
          o = this._callParseArg(
            i,
            s,
            r,
            l
          );
        }
        return o;
      }, "myParseArg");
      this._checkNumberOfArguments();
      let t = [];
      this.registeredArguments.forEach((i, s) => {
        let r = i.defaultValue;
        i.variadic ? s < this.args.length ? (r = this.args.slice(s), i.parseArg && (r = r.reduce((o, l) => e(i, l, o), i.defaultValue))) : r ===
        void 0 && (r = []) : s < this.args.length && (r = this.args[s], i.parseArg && (r = e(i, r, i.defaultValue))), t[s] = r;
      }), this.processedArgs = t;
    }
    /**
     * Once we have a promise we chain, but call synchronously until then.
     *
     * @param {(Promise|undefined)} promise
     * @param {Function} fn
     * @return {(Promise|undefined)}
     * @private
     */
    _chainOrCall(e, t) {
      return e && e.then && typeof e.then == "function" ? e.then(() => t()) : t();
    }
    /**
     *
     * @param {(Promise|undefined)} promise
     * @param {string} event
     * @return {(Promise|undefined)}
     * @private
     */
    _chainOrCallHooks(e, t) {
      let i = e, s = [];
      return this._getCommandAndAncestors().reverse().filter((r) => r._lifeCycleHooks[t] !== void 0).forEach((r) => {
        r._lifeCycleHooks[t].forEach((o) => {
          s.push({ hookedCommand: r, callback: o });
        });
      }), t === "postAction" && s.reverse(), s.forEach((r) => {
        i = this._chainOrCall(i, () => r.callback(r.hookedCommand, this));
      }), i;
    }
    /**
     *
     * @param {(Promise|undefined)} promise
     * @param {Command} subCommand
     * @param {string} event
     * @return {(Promise|undefined)}
     * @private
     */
    _chainOrCallSubCommandHook(e, t, i) {
      let s = e;
      return this._lifeCycleHooks[i] !== void 0 && this._lifeCycleHooks[i].forEach((r) => {
        s = this._chainOrCall(s, () => r(this, t));
      }), s;
    }
    /**
     * Process arguments in context of this command.
     * Returns action result, in case it is a promise.
     *
     * @private
     */
    _parseCommand(e, t) {
      let i = this.parseOptions(t);
      if (this._parseOptionsEnv(), this._parseOptionsImplied(), e = e.concat(i.operands), t = i.unknown, this.args = e.concat(t), e && this.
      _findCommand(e[0]))
        return this._dispatchSubcommand(e[0], e.slice(1), t);
      if (this._getHelpCommand() && e[0] === this._getHelpCommand().name())
        return this._dispatchHelpCommand(e[1]);
      if (this._defaultCommandName)
        return this._outputHelpIfRequested(t), this._dispatchSubcommand(
          this._defaultCommandName,
          e,
          t
        );
      this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName && this.help({ error: !0 }), this.
      _outputHelpIfRequested(i.unknown), this._checkForMissingMandatoryOptions(), this._checkForConflictingOptions();
      let s = /* @__PURE__ */ c(() => {
        i.unknown.length > 0 && this.unknownOption(i.unknown[0]);
      }, "checkForUnknownOptions"), r = `command:${this.name()}`;
      if (this._actionHandler) {
        s(), this._processArguments();
        let o;
        return o = this._chainOrCallHooks(o, "preAction"), o = this._chainOrCall(
          o,
          () => this._actionHandler(this.processedArgs)
        ), this.parent && (o = this._chainOrCall(o, () => {
          this.parent.emit(r, e, t);
        })), o = this._chainOrCallHooks(o, "postAction"), o;
      }
      if (this.parent && this.parent.listenerCount(r))
        s(), this._processArguments(), this.parent.emit(r, e, t);
      else if (e.length) {
        if (this._findCommand("*"))
          return this._dispatchSubcommand("*", e, t);
        this.listenerCount("command:*") ? this.emit("command:*", e, t) : this.commands.length ? this.unknownCommand() : (s(), this._processArguments());
      } else this.commands.length ? (s(), this.help({ error: !0 })) : (s(), this._processArguments());
    }
    /**
     * Find matching command.
     *
     * @private
     * @return {Command | undefined}
     */
    _findCommand(e) {
      if (e)
        return this.commands.find(
          (t) => t._name === e || t._aliases.includes(e)
        );
    }
    /**
     * Return an option matching `arg` if any.
     *
     * @param {string} arg
     * @return {Option}
     * @package
     */
    _findOption(e) {
      return this.options.find((t) => t.is(e));
    }
    /**
     * Display an error message if a mandatory option does not have a value.
     * Called after checking for help flags in leaf subcommand.
     *
     * @private
     */
    _checkForMissingMandatoryOptions() {
      this._getCommandAndAncestors().forEach((e) => {
        e.options.forEach((t) => {
          t.mandatory && e.getOptionValue(t.attributeName()) === void 0 && e.missingMandatoryOptionValue(t);
        });
      });
    }
    /**
     * Display an error message if conflicting options are used together in this.
     *
     * @private
     */
    _checkForConflictingLocalOptions() {
      let e = this.options.filter((i) => {
        let s = i.attributeName();
        return this.getOptionValue(s) === void 0 ? !1 : this.getOptionValueSource(s) !== "default";
      });
      e.filter(
        (i) => i.conflictsWith.length > 0
      ).forEach((i) => {
        let s = e.find(
          (r) => i.conflictsWith.includes(r.attributeName())
        );
        s && this._conflictingOption(i, s);
      });
    }
    /**
     * Display an error message if conflicting options are used together.
     * Called after checking for help flags in leaf subcommand.
     *
     * @private
     */
    _checkForConflictingOptions() {
      this._getCommandAndAncestors().forEach((e) => {
        e._checkForConflictingLocalOptions();
      });
    }
    /**
     * Parse options from `argv` removing known options,
     * and return argv split into operands and unknown arguments.
     *
     * Examples:
     *
     *     argv => operands, unknown
     *     --known kkk op => [op], []
     *     op --known kkk => [op], []
     *     sub --unknown uuu op => [sub], [--unknown uuu op]
     *     sub -- --unknown uuu op => [sub --unknown uuu op], []
     *
     * @param {string[]} argv
     * @return {{operands: string[], unknown: string[]}}
     */
    parseOptions(e) {
      let t = [], i = [], s = t, r = e.slice();
      function o(a) {
        return a.length > 1 && a[0] === "-";
      }
      c(o, "maybeOption");
      let l = null;
      for (; r.length; ) {
        let a = r.shift();
        if (a === "--") {
          s === i && s.push(a), s.push(...r);
          break;
        }
        if (l && !o(a)) {
          this.emit(`option:${l.name()}`, a);
          continue;
        }
        if (l = null, o(a)) {
          let u = this._findOption(a);
          if (u) {
            if (u.required) {
              let d = r.shift();
              d === void 0 && this.optionMissingArgument(u), this.emit(`option:${u.name()}`, d);
            } else if (u.optional) {
              let d = null;
              r.length > 0 && !o(r[0]) && (d = r.shift()), this.emit(`option:${u.name()}`, d);
            } else
              this.emit(`option:${u.name()}`);
            l = u.variadic ? u : null;
            continue;
          }
        }
        if (a.length > 2 && a[0] === "-" && a[1] !== "-") {
          let u = this._findOption(`-${a[1]}`);
          if (u) {
            u.required || u.optional && this._combineFlagAndOptionalValue ? this.emit(`option:${u.name()}`, a.slice(2)) : (this.emit(`option\
:${u.name()}`), r.unshift(`-${a.slice(2)}`));
            continue;
          }
        }
        if (/^--[^=]+=/.test(a)) {
          let u = a.indexOf("="), d = this._findOption(a.slice(0, u));
          if (d && (d.required || d.optional)) {
            this.emit(`option:${d.name()}`, a.slice(u + 1));
            continue;
          }
        }
        if (o(a) && (s = i), (this._enablePositionalOptions || this._passThroughOptions) && t.length === 0 && i.length === 0) {
          if (this._findCommand(a)) {
            t.push(a), r.length > 0 && i.push(...r);
            break;
          } else if (this._getHelpCommand() && a === this._getHelpCommand().name()) {
            t.push(a), r.length > 0 && t.push(...r);
            break;
          } else if (this._defaultCommandName) {
            i.push(a), r.length > 0 && i.push(...r);
            break;
          }
        }
        if (this._passThroughOptions) {
          s.push(a), r.length > 0 && s.push(...r);
          break;
        }
        s.push(a);
      }
      return { operands: t, unknown: i };
    }
    /**
     * Return an object containing local option values as key-value pairs.
     *
     * @return {object}
     */
    opts() {
      if (this._storeOptionsAsProperties) {
        let e = {}, t = this.options.length;
        for (let i = 0; i < t; i++) {
          let s = this.options[i].attributeName();
          e[s] = s === this._versionOptionName ? this._version : this[s];
        }
        return e;
      }
      return this._optionValues;
    }
    /**
     * Return an object containing merged local and global option values as key-value pairs.
     *
     * @return {object}
     */
    optsWithGlobals() {
      return this._getCommandAndAncestors().reduce(
        (e, t) => Object.assign(e, t.opts()),
        {}
      );
    }
    /**
     * Display error message and exit (or call exitOverride).
     *
     * @param {string} message
     * @param {object} [errorOptions]
     * @param {string} [errorOptions.code] - an id string representing the error
     * @param {number} [errorOptions.exitCode] - used with process.exit
     */
    error(e, t) {
      this._outputConfiguration.outputError(
        `${e}
`,
        this._outputConfiguration.writeErr
      ), typeof this._showHelpAfterError == "string" ? this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`) : this._showHelpAfterError && (this._outputConfiguration.writeErr(`
`), this.outputHelp({ error: !0 }));
      let i = t || {}, s = i.exitCode || 1, r = i.code || "commander.error";
      this._exit(s, r, e);
    }
    /**
     * Apply any option related environment variables, if option does
     * not have a value from cli or client code.
     *
     * @private
     */
    _parseOptionsEnv() {
      this.options.forEach((e) => {
        if (e.envVar && e.envVar in p.env) {
          let t = e.attributeName();
          (this.getOptionValue(t) === void 0 || ["default", "config", "env"].includes(
            this.getOptionValueSource(t)
          )) && (e.required || e.optional ? this.emit(`optionEnv:${e.name()}`, p.env[e.envVar]) : this.emit(`optionEnv:${e.name()}`));
        }
      });
    }
    /**
     * Apply any implied option values, if option is undefined or default value.
     *
     * @private
     */
    _parseOptionsImplied() {
      let e = new tt(this.options), t = /* @__PURE__ */ c((i) => this.getOptionValue(i) !== void 0 && !["default", "implied"].includes(this.
      getOptionValueSource(i)), "hasCustomOptionValue");
      this.options.filter(
        (i) => i.implied !== void 0 && t(i.attributeName()) && e.valueFromOption(
          this.getOptionValue(i.attributeName()),
          i
        )
      ).forEach((i) => {
        Object.keys(i.implied).filter((s) => !t(s)).forEach((s) => {
          this.setOptionValueWithSource(
            s,
            i.implied[s],
            "implied"
          );
        });
      });
    }
    /**
     * Argument `name` is missing.
     *
     * @param {string} name
     * @private
     */
    missingArgument(e) {
      let t = `error: missing required argument '${e}'`;
      this.error(t, { code: "commander.missingArgument" });
    }
    /**
     * `Option` is missing an argument.
     *
     * @param {Option} option
     * @private
     */
    optionMissingArgument(e) {
      let t = `error: option '${e.flags}' argument missing`;
      this.error(t, { code: "commander.optionMissingArgument" });
    }
    /**
     * `Option` does not have a value, and is a mandatory option.
     *
     * @param {Option} option
     * @private
     */
    missingMandatoryOptionValue(e) {
      let t = `error: required option '${e.flags}' not specified`;
      this.error(t, { code: "commander.missingMandatoryOptionValue" });
    }
    /**
     * `Option` conflicts with another option.
     *
     * @param {Option} option
     * @param {Option} conflictingOption
     * @private
     */
    _conflictingOption(e, t) {
      let i = /* @__PURE__ */ c((o) => {
        let l = o.attributeName(), a = this.getOptionValue(l), u = this.options.find(
          (h) => h.negate && l === h.attributeName()
        ), d = this.options.find(
          (h) => !h.negate && l === h.attributeName()
        );
        return u && (u.presetArg === void 0 && a === !1 || u.presetArg !== void 0 && a === u.presetArg) ? u : d || o;
      }, "findBestOptionFromValue"), s = /* @__PURE__ */ c((o) => {
        let l = i(o), a = l.attributeName();
        return this.getOptionValueSource(a) === "env" ? `environment variable '${l.envVar}'` : `option '${l.flags}'`;
      }, "getErrorMessage"), r = `error: ${s(e)} cannot be used with ${s(t)}`;
      this.error(r, { code: "commander.conflictingOption" });
    }
    /**
     * Unknown option `flag`.
     *
     * @param {string} flag
     * @private
     */
    unknownOption(e) {
      if (this._allowUnknownOption) return;
      let t = "";
      if (e.startsWith("--") && this._showSuggestionAfterError) {
        let s = [], r = this;
        do {
          let o = r.createHelp().visibleOptions(r).filter((l) => l.long).map((l) => l.long);
          s = s.concat(o), r = r.parent;
        } while (r && !r._enablePositionalOptions);
        t = de(e, s);
      }
      let i = `error: unknown option '${e}'${t}`;
      this.error(i, { code: "commander.unknownOption" });
    }
    /**
     * Excess arguments, more than expected.
     *
     * @param {string[]} receivedArgs
     * @private
     */
    _excessArguments(e) {
      if (this._allowExcessArguments) return;
      let t = this.registeredArguments.length, i = t === 1 ? "" : "s", r = `error: too many arguments${this.parent ? ` for '${this.name()}'` :
      ""}. Expected ${t} argument${i} but got ${e.length}.`;
      this.error(r, { code: "commander.excessArguments" });
    }
    /**
     * Unknown command.
     *
     * @private
     */
    unknownCommand() {
      let e = this.args[0], t = "";
      if (this._showSuggestionAfterError) {
        let s = [];
        this.createHelp().visibleCommands(this).forEach((r) => {
          s.push(r.name()), r.alias() && s.push(r.alias());
        }), t = de(e, s);
      }
      let i = `error: unknown command '${e}'${t}`;
      this.error(i, { code: "commander.unknownCommand" });
    }
    /**
     * Get or set the program version.
     *
     * This method auto-registers the "-V, --version" option which will print the version number.
     *
     * You can optionally supply the flags and description to override the defaults.
     *
     * @param {string} [str]
     * @param {string} [flags]
     * @param {string} [description]
     * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
     */
    version(e, t, i) {
      if (e === void 0) return this._version;
      this._version = e, t = t || "-V, --version", i = i || "output the version number";
      let s = this.createOption(t, i);
      return this._versionOptionName = s.attributeName(), this._registerOption(s), this.on("option:" + s.name(), () => {
        this._outputConfiguration.writeOut(`${e}
`), this._exit(0, "commander.version", e);
      }), this;
    }
    /**
     * Set the description.
     *
     * @param {string} [str]
     * @param {object} [argsDescription]
     * @return {(string|Command)}
     */
    description(e, t) {
      return e === void 0 && t === void 0 ? this._description : (this._description = e, t && (this._argsDescription = t), this);
    }
    /**
     * Set the summary. Used when listed as subcommand of parent.
     *
     * @param {string} [str]
     * @return {(string|Command)}
     */
    summary(e) {
      return e === void 0 ? this._summary : (this._summary = e, this);
    }
    /**
     * Set an alias for the command.
     *
     * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
     *
     * @param {string} [alias]
     * @return {(string|Command)}
     */
    alias(e) {
      if (e === void 0) return this._aliases[0];
      let t = this;
      if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler && (t = this.commands[this.commands.length -
      1]), e === t._name)
        throw new Error("Command alias can't be the same as its name");
      let i = this.parent?._findCommand(e);
      if (i) {
        let s = [i.name()].concat(i.aliases()).join("|");
        throw new Error(
          `cannot add alias '${e}' to command '${this.name()}' as already have command '${s}'`
        );
      }
      return t._aliases.push(e), this;
    }
    /**
     * Set aliases for the command.
     *
     * Only the first alias is shown in the auto-generated help.
     *
     * @param {string[]} [aliases]
     * @return {(string[]|Command)}
     */
    aliases(e) {
      return e === void 0 ? this._aliases : (e.forEach((t) => this.alias(t)), this);
    }
    /**
     * Set / get the command usage `str`.
     *
     * @param {string} [str]
     * @return {(string|Command)}
     */
    usage(e) {
      if (e === void 0) {
        if (this._usage) return this._usage;
        let t = this.registeredArguments.map((i) => Ze(i));
        return [].concat(
          this.options.length || this._helpOption !== null ? "[options]" : [],
          this.commands.length ? "[command]" : [],
          this.registeredArguments.length ? t : []
        ).join(" ");
      }
      return this._usage = e, this;
    }
    /**
     * Get or set the name of the command.
     *
     * @param {string} [str]
     * @return {(string|Command)}
     */
    name(e) {
      return e === void 0 ? this._name : (this._name = e, this);
    }
    /**
     * Set the name of the command from script filename, such as process.argv[1],
     * or require.main.filename, or __filename.
     *
     * (Used internally and public although not documented in README.)
     *
     * @example
     * program.nameFromFilename(require.main.filename);
     *
     * @param {string} filename
     * @return {Command}
     */
    nameFromFilename(e) {
      return this._name = y.basename(e, y.extname(e)), this;
    }
    /**
     * Get or set the directory for searching for executable subcommands of this command.
     *
     * @example
     * program.executableDir(__dirname);
     * // or
     * program.executableDir('subcommands');
     *
     * @param {string} [path]
     * @return {(string|null|Command)}
     */
    executableDir(e) {
      return e === void 0 ? this._executableDir : (this._executableDir = e, this);
    }
    /**
     * Return program help documentation.
     *
     * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
     * @return {string}
     */
    helpInformation(e) {
      let t = this.createHelp();
      return t.helpWidth === void 0 && (t.helpWidth = e && e.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.
      getOutHelpWidth()), t.formatHelp(this, t);
    }
    /**
     * @private
     */
    _getHelpContext(e) {
      e = e || {};
      let t = { error: !!e.error }, i;
      return t.error ? i = /* @__PURE__ */ c((s) => this._outputConfiguration.writeErr(s), "write") : i = /* @__PURE__ */ c((s) => this._outputConfiguration.
      writeOut(s), "write"), t.write = e.write || i, t.command = this, t;
    }
    /**
     * Output help information for this command.
     *
     * Outputs built-in help, and custom text added using `.addHelpText()`.
     *
     * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
     */
    outputHelp(e) {
      let t;
      typeof e == "function" && (t = e, e = void 0);
      let i = this._getHelpContext(e);
      this._getCommandAndAncestors().reverse().forEach((r) => r.emit("beforeAllHelp", i)), this.emit("beforeHelp", i);
      let s = this.helpInformation(i);
      if (t && (s = t(s), typeof s != "string" && !Buffer.isBuffer(s)))
        throw new Error("outputHelp callback must return a string or a Buffer");
      i.write(s), this._getHelpOption()?.long && this.emit(this._getHelpOption().long), this.emit("afterHelp", i), this._getCommandAndAncestors().
      forEach(
        (r) => r.emit("afterAllHelp", i)
      );
    }
    /**
     * You can pass in flags and a description to customise the built-in help option.
     * Pass in false to disable the built-in help option.
     *
     * @example
     * program.helpOption('-?, --help' 'show help'); // customise
     * program.helpOption(false); // disable
     *
     * @param {(string | boolean)} flags
     * @param {string} [description]
     * @return {Command} `this` command for chaining
     */
    helpOption(e, t) {
      return typeof e == "boolean" ? (e ? this._helpOption = this._helpOption ?? void 0 : this._helpOption = null, this) : (e = e ?? "-h, --\
help", t = t ?? "display help for command", this._helpOption = this.createOption(e, t), this);
    }
    /**
     * Lazy create help option.
     * Returns null if has been disabled with .helpOption(false).
     *
     * @returns {(Option | null)} the help option
     * @package
     */
    _getHelpOption() {
      return this._helpOption === void 0 && this.helpOption(void 0, void 0), this._helpOption;
    }
    /**
     * Supply your own option to use for the built-in help option.
     * This is an alternative to using helpOption() to customise the flags and description etc.
     *
     * @param {Option} option
     * @return {Command} `this` command for chaining
     */
    addHelpOption(e) {
      return this._helpOption = e, this;
    }
    /**
     * Output help information and exit.
     *
     * Outputs built-in help, and custom text added using `.addHelpText()`.
     *
     * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
     */
    help(e) {
      this.outputHelp(e);
      let t = p.exitCode || 0;
      t === 0 && e && typeof e != "function" && e.error && (t = 1), this._exit(t, "commander.help", "(outputHelp)");
    }
    /**
     * Add additional text to be displayed with the built-in help.
     *
     * Position is 'before' or 'after' to affect just this command,
     * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
     *
     * @param {string} position - before or after built-in help
     * @param {(string | Function)} text - string to add, or a function returning a string
     * @return {Command} `this` command for chaining
     */
    addHelpText(e, t) {
      let i = ["beforeAll", "before", "after", "afterAll"];
      if (!i.includes(e))
        throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${i.join("', '")}'`);
      let s = `${e}Help`;
      return this.on(s, (r) => {
        let o;
        typeof t == "function" ? o = t({ error: r.error, command: r.command }) : o = t, o && r.write(`${o}
`);
      }), this;
    }
    /**
     * Output help information if help flags specified
     *
     * @param {Array} args - array of options to search for help flags
     * @private
     */
    _outputHelpIfRequested(e) {
      let t = this._getHelpOption();
      t && e.find((s) => t.is(s)) && (this.outputHelp(), this._exit(0, "commander.helpDisplayed", "(outputHelp)"));
    }
  };
  function he(n) {
    return n.map((e) => {
      if (!e.startsWith("--inspect"))
        return e;
      let t, i = "127.0.0.1", s = "9229", r;
      return (r = e.match(/^(--inspect(-brk)?)$/)) !== null ? t = r[1] : (r = e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null ? (t =
      r[1], /^\d+$/.test(r[3]) ? s = r[3] : i = r[3]) : (r = e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null && (t = r[1], i =
      r[3], s = r[4]), t && s !== "0" ? `${t}=${i}:${parseInt(s) + 1}` : e;
    });
  }
  c(he, "incrementNodeInspectorPort");
  pe.Command = Z;
});

// ../node_modules/commander/index.js
var _e = b((g) => {
  var { Argument: fe } = $(), { Command: ee } = me(), { CommanderError: it, InvalidArgumentError: ge } = A(), { Help: st } = G(), { Option: be } = z();
  g.program = new ee();
  g.createCommand = (n) => new ee(n);
  g.createOption = (n, e) => new be(n, e);
  g.createArgument = (n, e) => new fe(n, e);
  g.Command = ee;
  g.Option = be;
  g.Argument = fe;
  g.Help = st;
  g.CommanderError = it;
  g.InvalidArgumentError = ge;
  g.InvalidOptionArgumentError = ge;
});

// ../node_modules/walk-up-path/dist/cjs/index.js
var ye = b((V) => {
  "use strict";
  Object.defineProperty(V, "__esModule", { value: !0 });
  V.walkUp = void 0;
  var xe = require("path"), rt = /* @__PURE__ */ c(function* (n) {
    for (n = (0, xe.resolve)(n); n; ) {
      yield n;
      let e = (0, xe.dirname)(n);
      if (e === n)
        break;
      n = e;
    }
  }, "walkUp");
  V.walkUp = rt;
});

// ../node_modules/picocolors/picocolors.js
var Ee = b((qt, se) => {
  var Ae = process.argv || [], q = process.env, at = !("NO_COLOR" in q || Ae.includes("--no-color")) && ("FORCE_COLOR" in q || Ae.includes("\
--color") || process.platform === "win32" || require != null && require("tty").isatty(1) && q.TERM !== "dumb" || "CI" in q), lt = /* @__PURE__ */ c(
  (n, e, t = n) => (i) => {
    let s = "" + i, r = s.indexOf(e, n.length);
    return ~r ? n + ct(s, e, t, r) + e : n + s + e;
  }, "formatter"), ct = /* @__PURE__ */ c((n, e, t, i) => {
    let s = "", r = 0;
    do
      s += n.substring(r, i) + t, r = i + e.length, i = n.indexOf(e, r);
    while (~i);
    return s + n.substring(r);
  }, "replaceClose"), ke = /* @__PURE__ */ c((n = at) => {
    let e = n ? lt : () => String;
    return {
      isColorSupported: n,
      reset: e("\x1B[0m", "\x1B[0m"),
      bold: e("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
      dim: e("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
      italic: e("\x1B[3m", "\x1B[23m"),
      underline: e("\x1B[4m", "\x1B[24m"),
      inverse: e("\x1B[7m", "\x1B[27m"),
      hidden: e("\x1B[8m", "\x1B[28m"),
      strikethrough: e("\x1B[9m", "\x1B[29m"),
      black: e("\x1B[30m", "\x1B[39m"),
      red: e("\x1B[31m", "\x1B[39m"),
      green: e("\x1B[32m", "\x1B[39m"),
      yellow: e("\x1B[33m", "\x1B[39m"),
      blue: e("\x1B[34m", "\x1B[39m"),
      magenta: e("\x1B[35m", "\x1B[39m"),
      cyan: e("\x1B[36m", "\x1B[39m"),
      white: e("\x1B[37m", "\x1B[39m"),
      gray: e("\x1B[90m", "\x1B[39m"),
      bgBlack: e("\x1B[40m", "\x1B[49m"),
      bgRed: e("\x1B[41m", "\x1B[49m"),
      bgGreen: e("\x1B[42m", "\x1B[49m"),
      bgYellow: e("\x1B[43m", "\x1B[49m"),
      bgBlue: e("\x1B[44m", "\x1B[49m"),
      bgMagenta: e("\x1B[45m", "\x1B[49m"),
      bgCyan: e("\x1B[46m", "\x1B[49m"),
      bgWhite: e("\x1B[47m", "\x1B[49m"),
      blackBright: e("\x1B[90m", "\x1B[39m"),
      redBright: e("\x1B[91m", "\x1B[39m"),
      greenBright: e("\x1B[92m", "\x1B[39m"),
      yellowBright: e("\x1B[93m", "\x1B[39m"),
      blueBright: e("\x1B[94m", "\x1B[39m"),
      magentaBright: e("\x1B[95m", "\x1B[39m"),
      cyanBright: e("\x1B[96m", "\x1B[39m"),
      whiteBright: e("\x1B[97m", "\x1B[39m"),
      bgBlackBright: e("\x1B[100m", "\x1B[49m"),
      bgRedBright: e("\x1B[101m", "\x1B[49m"),
      bgGreenBright: e("\x1B[102m", "\x1B[49m"),
      bgYellowBright: e("\x1B[103m", "\x1B[49m"),
      bgBlueBright: e("\x1B[104m", "\x1B[49m"),
      bgMagentaBright: e("\x1B[105m", "\x1B[49m"),
      bgCyanBright: e("\x1B[106m", "\x1B[49m"),
      bgWhiteBright: e("\x1B[107m", "\x1B[49m")
    };
  }, "createColors");
  se.exports = ke();
  se.exports.createColors = ke;
});

// ../node_modules/ts-dedent/dist/index.js
var He = b((k) => {
  "use strict";
  Object.defineProperty(k, "__esModule", { value: !0 });
  k.dedent = void 0;
  function Ve(n) {
    for (var e = [], t = 1; t < arguments.length; t++)
      e[t - 1] = arguments[t];
    var i = Array.from(typeof n == "string" ? [n] : n);
    i[i.length - 1] = i[i.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var s = i.reduce(function(l, a) {
      var u = a.match(/\n([\t ]+|(?!\s).)/g);
      return u ? l.concat(u.map(function(d) {
        var h, m;
        return (m = (h = d.match(/[\t ]/g)) === null || h === void 0 ? void 0 : h.length) !== null && m !== void 0 ? m : 0;
      })) : l;
    }, []);
    if (s.length) {
      var r = new RegExp(`
[	 ]{` + Math.min.apply(Math, s) + "}", "g");
      i = i.map(function(l) {
        return l.replace(r, `
`);
      });
    }
    i[0] = i[0].replace(/^\r?\n/, "");
    var o = i[0];
    return e.forEach(function(l, a) {
      var u = o.match(/(?:^|\n)( *)$/), d = u ? u[1] : "", h = l;
      typeof l == "string" && l.includes(`
`) && (h = String(l).split(`
`).map(function(m, x) {
        return x === 0 ? m : "" + d + m;
      }).join(`
`)), o += h + i[a + 1];
    }), o;
  }
  c(Ve, "dedent");
  k.dedent = Ve;
  k.default = Ve;
});

// src/cli/bin/index.ts
var C = require("@storybook/core/common"), De = require("@storybook/core/telemetry"), oe = require("@storybook/core/node-logger"), E = S(_e(), 1);

// ../node_modules/fd-package-json/dist/esm/main.js
var ve = S(ye(), 1), Oe = require("node:path"), H = require("node:fs/promises"), we = require("node:fs");
async function nt(n) {
  try {
    return (await (0, H.stat)(n)).isFile();
  } catch {
    return !1;
  }
}
c(nt, "fileExists");
async function ot(n) {
  for (let e of (0, ve.walkUp)(n)) {
    let t = (0, Oe.resolve)(e, "package.json");
    if (await nt(t))
      return t;
  }
  return null;
}
c(ot, "findPackagePath");
async function O(n) {
  let e = await ot(n);
  if (!e)
    return null;
  try {
    let t = await (0, H.readFile)(e, { encoding: "utf8" });
    return JSON.parse(t);
  } catch {
    return null;
  }
}
c(O, "findPackage");

// node_modules/leven/index.js
var te = [], Ce = [];
function ie(n, e) {
  if (n === e)
    return 0;
  let t = n;
  n.length > e.length && (n = e, e = t);
  let i = n.length, s = e.length;
  for (; i > 0 && n.charCodeAt(~-i) === e.charCodeAt(~-s); )
    i--, s--;
  let r = 0;
  for (; r < i && n.charCodeAt(r) === e.charCodeAt(r); )
    r++;
  if (i -= r, s -= r, i === 0)
    return s;
  let o, l, a, u, d = 0, h = 0;
  for (; d < i; )
    Ce[d] = n.charCodeAt(r + d), te[d] = ++d;
  for (; h < s; )
    for (o = e.charCodeAt(r + h), a = h++, l = h, d = 0; d < i; d++)
      u = o === Ce[d] ? a : a + 1, a = te[d], l = te[d] = a > l ? u > l ? l + 1 : u : u > a ? a + 1 : u;
  return l;
}
c(ie, "leven");

// src/cli/bin/index.ts
var N = S(Ee(), 1);

// ../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var ut = process.env.NODE_ENV === "production", re = "Invariant failed";
function w(n, e) {
  if (!n) {
    if (ut)
      throw new Error(re);
    var t = typeof e == "function" ? e() : e, i = t ? "".concat(re, ": ").concat(t) : re;
    throw new Error(i);
  }
}
c(w, "invariant");

// package.json
var Se = "8.6.12";

// src/cli/build.ts
var je = require("@storybook/core/common"), P = require("@storybook/core/core-server");
var $e = /* @__PURE__ */ c(async (n) => {
  let e = await O(__dirname);
  w(e, "Failed to find the closest package.json file.");
  let t = {
    ...n,
    configDir: n.configDir || "./.storybook",
    outputDir: n.outputDir || "./storybook-static",
    ignorePreview: !!n.previewUrl && !n.forceBuildPreview,
    configType: "PRODUCTION",
    cache: je.cache,
    packageJson: e
  };
  await (0, P.withTelemetry)(
    "build",
    { cliOptions: n, presetOptions: t },
    () => (0, P.buildStaticStandalone)(t)
  );
}, "build");

// src/cli/dev.ts
var qe = require("@storybook/core/common"), D = require("@storybook/core/core-server"), _ = require("@storybook/core/node-logger");
var ne = S(He(), 1);
function ht(n) {
  _.instance.heading = "", n instanceof Error ? n.error ? _.logger.error(n.error) : n.stats && n.stats.compilation.errors ? n.stats.compilation.
  errors.forEach((e) => _.logger.plain(e)) : _.logger.error(n) : n.compilation?.errors && n.compilation.errors.forEach((e) => _.logger.plain(
  e)), _.logger.line(), _.logger.warn(
    n.close ? ne.dedent`
          FATAL broken build!, will close the process,
          Fix the error below and restart storybook.
        ` : ne.dedent`
          Broken build, fix the error above.
          You may need to refresh the browser.
        `
  ), _.logger.line();
}
c(ht, "printError");
var Pe = /* @__PURE__ */ c(async (n) => {
  let { env: e } = process;
  e.NODE_ENV = e.NODE_ENV || "development";
  let t = await O(__dirname);
  w(t, "Failed to find the closest package.json file.");
  let i = {
    ...n,
    configDir: n.configDir || "./.storybook",
    configType: "DEVELOPMENT",
    ignorePreview: !!n.previewUrl && !n.forceBuildPreview,
    cache: qe.cache,
    packageJson: t
  };
  await (0, D.withTelemetry)(
    "dev",
    {
      cliOptions: n,
      presetOptions: i,
      printError: ht
    },
    () => (0, D.buildDevStandalone)(i)
  );
}, "dev");

// src/cli/bin/index.ts
(0, De.addToGlobalContext)("cliVersion", C.versions.storybook);
var T = console, Ne = /* @__PURE__ */ c((n) => E.program.command(n).option(
  "--disable-telemetry",
  "Disable sending telemetry data",
  // default value is false, but if the user sets STORYBOOK_DISABLE_TELEMETRY, it can be true
  process.env.STORYBOOK_DISABLE_TELEMETRY && process.env.STORYBOOK_DISABLE_TELEMETRY !== "false"
).option("--debug", "Get more logs in debug mode", !1).option("--enable-crash-reports", "Enable sending crash reports to telemetry data"), "\
command");
Ne("dev").option("-p, --port <number>", "Port to run Storybook", (n) => parseInt(n, 10)).option("-h, --host <string>", "Host to run Storyboo\
k").option("-c, --config-dir <dir-name>", "Directory where to load Storybook configurations from").option(
  "--https",
  "Serve Storybook over HTTPS. Note: You must provide your own certificate information."
).option(
  "--ssl-ca <ca>",
  "Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)",
  C.parseList
).option("--ssl-cert <cert>", "Provide an SSL certificate. (Required with --https)").option("--ssl-key <key>", "Provide an SSL key. (Require\
d with --https)").option("--smoke-test", "Exit after successful start").option("--ci", "CI mode (skip interactive prompts, don't open browse\
r)").option("--no-open", "Do not open Storybook automatically in the browser").option("--loglevel <level>", "Control level of logging during\
 build").option("--quiet", "Suppress verbose build output").option("--no-version-updates", "Suppress update check", !0).option("--debug-webp\
ack", "Display final webpack configurations for debugging purposes").option(
  "--webpack-stats-json [directory]",
  "Write Webpack stats JSON to disk (synonym for `--stats-json`)"
).option("--stats-json [directory]", "Write stats JSON to disk").option(
  "--preview-url <string>",
  "Disables the default storybook preview and lets your use your own"
).option("--force-build-preview", "Build the preview iframe even if you are using --preview-url").option("--docs", "Build a documentation-on\
ly site using addon-docs").option("--exact-port", "Exit early if the desired port is not available").option(
  "--initial-path [path]",
  "URL path to be appended when visiting Storybook for the first time"
).action(async (n) => {
  oe.logger.setLevel(n.loglevel);
  let e = await O(__dirname);
  w(e, "Failed to find the closest package.json file."), T.log(N.default.bold(`${e.name} v${e.version}`) + N.default.reset(`
`)), (0, C.getEnvConfig)(n, {
    port: "SBCONFIG_PORT",
    host: "SBCONFIG_HOSTNAME",
    staticDir: "SBCONFIG_STATIC_DIR",
    configDir: "SBCONFIG_CONFIG_DIR",
    ci: "CI"
  }), parseInt(`${n.port}`, 10) && (n.port = parseInt(`${n.port}`, 10)), await Pe({ ...n, packageJson: e }).catch(() => process.exit(1));
});
Ne("build").option("-o, --output-dir <dir-name>", "Directory where to store built files").option("-c, --config-dir <dir-name>", "Directory w\
here to load Storybook configurations from").option("--quiet", "Suppress verbose build output").option("--loglevel <level>", "Control level \
of logging during build").option("--debug-webpack", "Display final webpack configurations for debugging purposes").option(
  "--webpack-stats-json [directory]",
  "Write Webpack stats JSON to disk (synonym for `--stats-json`)"
).option("--stats-json [directory]", "Write stats JSON to disk").option(
  "--preview-url <string>",
  "Disables the default storybook preview and lets your use your own"
).option("--force-build-preview", "Build the preview iframe even if you are using --preview-url").option("--docs", "Build a documentation-on\
ly site using addon-docs").option("--test", "Build stories optimized for testing purposes.").action(async (n) => {
  let { env: e } = process;
  e.NODE_ENV = e.NODE_ENV || "production";
  let t = await O(__dirname);
  w(t, "Failed to find the closest package.json file."), oe.logger.setLevel(n.loglevel), T.log(N.default.bold(`${t.name} v${t.version}
`)), (0, C.getEnvConfig)(n, {
    staticDir: "SBCONFIG_STATIC_DIR",
    outputDir: "SBCONFIG_OUTPUT_DIR",
    configDir: "SBCONFIG_CONFIG_DIR"
  }), await $e({
    ...n,
    packageJson: t,
    test: !!n.test || process.env.SB_TESTBUILD === "true"
  }).catch(() => process.exit(1));
});
E.program.on("command:*", ([n]) => {
  T.error(
    ` Invalid command: %s.
 See --help for a list of available commands.`,
    n
  );
  let t = E.program.commands.map((i) => i.name()).find((i) => ie(i, n) < 3);
  t && T.info(`
 Did you mean ${t}?`), process.exit(1);
});
E.program.usage("<command> [options]").version(String(Se)).parse(process.argv);
