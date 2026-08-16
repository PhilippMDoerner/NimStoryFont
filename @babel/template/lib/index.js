import * as _t from '@babel/types';
import { parse } from '@babel/parser';
import { codeFrameColumns } from '@babel/code-frame';

const {
  assertExpressionStatement
} = _t;
function makeStatementFormatter(fn) {
  return {
    code: str => `/* @babel/template */;\n${str}`,
    validate: () => {},
    unwrap: ast => {
      return fn(ast.program.body.slice(1));
    }
  };
}
const smart$1 = makeStatementFormatter(body => {
  if (body.length > 1) {
    return body;
  } else {
    return body[0];
  }
});
const statements$1 = makeStatementFormatter(body => body);
const statement$1 = makeStatementFormatter(body => {
  if (body.length === 0) {
    throw new Error("Found nothing to return.");
  }
  if (body.length > 1) {
    throw new Error("Found multiple statements but wanted one");
  }
  return body[0];
});
const expression$1 = {
  code: str => `(\n${str}\n)`,
  validate: ast => {
    if (ast.program.body.length > 1) {
      throw new Error("Found multiple statements but wanted one");
    }
    if (expression$1.unwrap(ast).start === 0) {
      throw new Error("Parse result included parens.");
    }
  },
  unwrap: ({
    program
  }) => {
    const [stmt] = program.body;
    assertExpressionStatement(stmt);
    return stmt.expression;
  }
};
const program$1 = {
  code: str => str,
  validate: () => {},
  unwrap: ast => ast.program
};

function merge(a, b) {
  const {
    placeholderAllowlist = a.placeholderAllowlist,
    placeholderPattern = a.placeholderPattern,
    preserveComments = a.preserveComments,
    syntacticPlaceholders = a.syntacticPlaceholders
  } = b;
  return {
    parser: {
      ...a.parser,
      ...b.parser
    },
    placeholderAllowlist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders
  };
}
function validate$1(opts) {
  if (opts != null && typeof opts !== "object") {
    throw new Error("Unknown template options.");
  }
  if (opts != null && Object.hasOwn(opts, "placeholderWhitelist")) {
    if (!Object.hasOwn(opts, "placeholderAllowlist")) {
      throw new Error("The 'placeholderWhitelist' option has been renamed to " + "'placeholderAllowlist'. Please update your configuration.");
    }
  }
  const {
    placeholderAllowlist,
    placeholderPattern,
    preserveComments,
    syntacticPlaceholders,
    ...parser
  } = opts || {};
  if (placeholderAllowlist != null && !(placeholderAllowlist instanceof Set)) {
    throw new Error("'.placeholderAllowlist' must be a Set, null, or undefined");
  }
  if (placeholderPattern != null && !(placeholderPattern instanceof RegExp) && placeholderPattern !== false) {
    throw new Error("'.placeholderPattern' must be a RegExp, false, null, or undefined");
  }
  if (preserveComments != null && typeof preserveComments !== "boolean") {
    throw new Error("'.preserveComments' must be a boolean, null, or undefined");
  }
  if (syntacticPlaceholders != null && typeof syntacticPlaceholders !== "boolean") {
    throw new Error("'.syntacticPlaceholders' must be a boolean, null, or undefined");
  }
  if (syntacticPlaceholders === true && (placeholderAllowlist != null || placeholderPattern != null)) {
    throw new Error("'.placeholderAllowlist' and '.placeholderPattern' aren't compatible" + " with '.syntacticPlaceholders: true'");
  }
  return {
    parser,
    placeholderAllowlist: placeholderAllowlist || undefined,
    placeholderPattern: placeholderPattern == null ? undefined : placeholderPattern,
    preserveComments: preserveComments == null ? undefined : preserveComments,
    syntacticPlaceholders: syntacticPlaceholders == null ? undefined : syntacticPlaceholders
  };
}
function normalizeReplacements(replacements) {
  if (Array.isArray(replacements)) {
    return replacements.reduce((acc, replacement, i) => {
      acc["$" + i] = replacement;
      return acc;
    }, {});
  } else if (typeof replacements === "object" || replacements == null) {
    return replacements || undefined;
  }
  throw new Error("Template replacements must be an array, object, null, or undefined");
}

const {
  isCallExpression,
  isExpressionStatement,
  isFunction,
  isIdentifier,
  isJSXIdentifier,
  isNewExpression,
  isPlaceholder,
  isStatement: isStatement$1,
  isStringLiteral: isStringLiteral$1,
  removePropertiesDeep,
  traverse
} = _t;
const PATTERN = /^[_$A-Z0-9]+$/;
function parseAndBuildMetadata(formatter, code, opts) {
  const {
    placeholderAllowlist,
    placeholderPattern,
    preserveComments = false,
    syntacticPlaceholders
  } = opts;
  const ast = parseWithCodeFrame(code, opts.parser, syntacticPlaceholders);
  removePropertiesDeep(ast, {
    preserveComments
  });
  formatter.validate(ast);
  const state = {
    syntactic: {
      placeholders: [],
      placeholderNames: new Set()
    },
    legacy: {
      placeholders: [],
      placeholderNames: new Set()
    },
    placeholderAllowlist,
    placeholderPattern,
    syntacticPlaceholders
  };
  traverse(ast, placeholderVisitorHandler, state);
  return {
    ast,
    ...(state.syntactic.placeholders.length ? state.syntactic : state.legacy)
  };
}
function placeholderVisitorHandler(node, ancestors, state) {
  let name;
  let hasSyntacticPlaceholders = state.syntactic.placeholders.length > 0;
  if (isPlaceholder(node)) {
    if (state.syntacticPlaceholders === false) {
      throw new Error("%%foo%%-style placeholders can't be used when " + "'.syntacticPlaceholders' is false.");
    }
    name = node.name.name;
    hasSyntacticPlaceholders = true;
  } else if (hasSyntacticPlaceholders || state.syntacticPlaceholders) {
    return;
  } else if (isIdentifier(node) || isJSXIdentifier(node)) {
    name = node.name;
  } else if (isStringLiteral$1(node)) {
    name = node.value;
  } else {
    return;
  }
  if (hasSyntacticPlaceholders && (state.placeholderPattern != null || state.placeholderAllowlist != null)) {
    throw new Error("'.placeholderAllowlist' and '.placeholderPattern' aren't compatible" + " with '.syntacticPlaceholders: true'");
  }
  if (!hasSyntacticPlaceholders && (state.placeholderPattern === false || !(state.placeholderPattern || PATTERN).test(name)) && !state.placeholderAllowlist?.has(name)) {
    return;
  }
  ancestors = ancestors.slice();
  const {
    node: parent,
    key
  } = ancestors[ancestors.length - 1];
  let type;
  if (isStringLiteral$1(node) || isPlaceholder(node, {
    expectedNode: "StringLiteral"
  })) {
    type = "string";
  } else if (isNewExpression(parent) && key === "arguments" || isCallExpression(parent) && key === "arguments" || isFunction(parent) && key === "params") {
    type = "param";
  } else if (isExpressionStatement(parent) && !isPlaceholder(node)) {
    type = "statement";
    ancestors = ancestors.slice(0, -1);
  } else if (isStatement$1(node) && isPlaceholder(node)) {
    type = "statement";
  } else {
    type = "other";
  }
  const {
    placeholders,
    placeholderNames
  } = !hasSyntacticPlaceholders ? state.legacy : state.syntactic;
  placeholders.push({
    name,
    type,
    resolve: ast => resolveAncestors(ast, ancestors),
    isDuplicate: placeholderNames.has(name)
  });
  placeholderNames.add(name);
}
function resolveAncestors(ast, ancestors) {
  let parent = ast;
  for (let i = 0; i < ancestors.length - 1; i++) {
    const {
      key,
      index
    } = ancestors[i];
    if (index === undefined) {
      parent = parent[key];
    } else {
      parent = parent[key][index];
    }
  }
  const {
    key,
    index
  } = ancestors[ancestors.length - 1];
  return {
    parent,
    key,
    index
  };
}
function parseWithCodeFrame(code, parserOpts, syntacticPlaceholders) {
  const plugins = (parserOpts.plugins || []).slice();
  if (syntacticPlaceholders !== false) {
    plugins.push("placeholders");
  }
  parserOpts = {
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowNewTargetOutsideFunction: true,
    allowSuperOutsideMethod: true,
    allowYieldOutsideFunction: true,
    sourceType: "module",
    ...parserOpts,
    plugins
  };
  try {
    return parse(code, parserOpts);
  } catch (err) {
    const loc = err.loc;
    if (loc) {
      err.message += "\n" + codeFrameColumns(code, {
        start: loc
      });
      err.code = "BABEL_TEMPLATE_PARSE_ERROR";
    }
    throw err;
  }
}

const {
  blockStatement,
  cloneNode,
  emptyStatement,
  expressionStatement,
  identifier,
  isStatement,
  isStringLiteral,
  stringLiteral,
  validate
} = _t;
function populatePlaceholders(metadata, replacements) {
  const ast = cloneNode(metadata.ast);
  if (replacements) {
    metadata.placeholders.forEach(placeholder => {
      if (!Object.hasOwn(replacements, placeholder.name)) {
        const placeholderName = placeholder.name;
        throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a
            placeholder you may want to consider passing one of the following options to @babel/template:
            - { placeholderPattern: false, placeholderAllowlist: new Set(['${placeholderName}'])}
            - { placeholderPattern: /^${placeholderName}$/ }`);
      }
    });
    Object.keys(replacements).forEach(key => {
      if (!metadata.placeholderNames.has(key)) {
        throw new Error(`Unknown substitution "${key}" given`);
      }
    });
  }
  metadata.placeholders.slice().reverse().forEach(placeholder => {
    try {
      applyReplacement(placeholder, ast, (replacements && replacements[placeholder.name]) ?? null);
    } catch (e) {
      e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`;
      throw e;
    }
  });
  return ast;
}
function applyReplacement(placeholder, ast, replacement) {
  if (placeholder.isDuplicate) {
    if (Array.isArray(replacement)) {
      replacement = replacement.map(node => cloneNode(node));
    } else if (typeof replacement === "object") {
      replacement = cloneNode(replacement);
    }
  }
  const {
    parent,
    key,
    index
  } = placeholder.resolve(ast);
  if (placeholder.type === "string") {
    if (typeof replacement === "string") {
      replacement = stringLiteral(replacement);
    }
    if (!replacement || !isStringLiteral(replacement)) {
      throw new Error("Expected string substitution");
    }
  } else if (placeholder.type === "statement") {
    if (index === undefined) {
      if (!replacement) {
        replacement = emptyStatement();
      } else if (Array.isArray(replacement)) {
        replacement = blockStatement(replacement);
      } else if (typeof replacement === "string") {
        replacement = expressionStatement(identifier(replacement));
      } else if (!isStatement(replacement)) {
        replacement = expressionStatement(replacement);
      }
    } else {
      if (replacement && !Array.isArray(replacement)) {
        if (typeof replacement === "string") {
          replacement = identifier(replacement);
        }
        if (!isStatement(replacement)) {
          replacement = expressionStatement(replacement);
        }
      }
    }
  } else if (placeholder.type === "param") {
    if (typeof replacement === "string") {
      replacement = identifier(replacement);
    }
    if (index === undefined) throw new Error("Assertion failure.");
  } else {
    if (typeof replacement === "string") {
      replacement = identifier(replacement);
    }
    if (Array.isArray(replacement)) {
      throw new Error("Cannot replace single expression with an array.");
    }
  }
  function set(parent, key, value) {
    const node = parent[key];
    parent[key] = value;
    if (node.type === "Identifier" || node.type === "Placeholder") {
      if (node.typeAnnotation) {
        value.typeAnnotation = node.typeAnnotation;
      }
      if (node.optional) {
        value.optional = node.optional;
      }
      if (node.decorators) {
        value.decorators = node.decorators;
      }
    }
  }
  if (index === undefined) {
    validate(parent, key, replacement);
    set(parent, key, replacement);
  } else {
    const items = parent[key].slice();
    if (placeholder.type === "statement" || placeholder.type === "param") {
      if (replacement == null) {
        items.splice(index, 1);
      } else if (Array.isArray(replacement)) {
        items.splice(index, 1, ...replacement);
      } else {
        set(items, index, replacement);
      }
    } else {
      set(items, index, replacement);
    }
    validate(parent, key, items);
    parent[key] = items;
  }
}

function stringTemplate(formatter, code, opts) {
  code = formatter.code(code);
  let metadata;
  return arg => {
    const replacements = normalizeReplacements(arg);
    if (!metadata) metadata = parseAndBuildMetadata(formatter, code, opts);
    return formatter.unwrap(populatePlaceholders(metadata, replacements));
  };
}

function literalTemplate(formatter, tpl, opts) {
  const {
    metadata,
    names
  } = buildLiteralData(formatter, tpl, opts);
  return arg => {
    const defaultReplacements = {};
    arg.forEach((replacement, i) => {
      defaultReplacements[names[i]] = replacement;
    });
    return arg => {
      const replacements = normalizeReplacements(arg);
      if (replacements) {
        Object.keys(replacements).forEach(key => {
          if (Object.hasOwn(defaultReplacements, key)) {
            throw new Error("Unexpected replacement overlap.");
          }
        });
      }
      return formatter.unwrap(populatePlaceholders(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
    };
  };
}
function buildLiteralData(formatter, tpl, opts) {
  let prefix = "BABEL_TPL$";
  const raw = tpl.join("");
  do {
    prefix = "$$" + prefix;
  } while (raw.includes(prefix));
  const {
    names,
    code
  } = buildTemplateCode(tpl, prefix);
  const metadata = parseAndBuildMetadata(formatter, formatter.code(code), {
    parser: opts.parser,
    placeholderAllowlist: new Set(names.concat(opts.placeholderAllowlist ? Array.from(opts.placeholderAllowlist) : [])),
    placeholderPattern: opts.placeholderPattern,
    preserveComments: opts.preserveComments,
    syntacticPlaceholders: opts.syntacticPlaceholders
  });
  return {
    metadata,
    names
  };
}
function buildTemplateCode(tpl, prefix) {
  const names = [];
  let code = tpl[0];
  for (let i = 1; i < tpl.length; i++) {
    const value = `${prefix}${i - 1}`;
    names.push(value);
    code += value + tpl[i];
  }
  return {
    names,
    code
  };
}

const NO_PLACEHOLDER = validate$1({
  placeholderPattern: false
});
function createTemplateBuilder(formatter, defaultOpts) {
  const templateFnCache = new WeakMap();
  const templateAstCache = new WeakMap();
  const cachedOpts = defaultOpts || validate$1(null);
  return Object.assign((tpl, ...args) => {
    if (typeof tpl === "string") {
      if (args.length > 1) throw new Error("Unexpected extra params.");
      return extendedTrace(stringTemplate(formatter, tpl, merge(cachedOpts, validate$1(args[0]))));
    } else if (Array.isArray(tpl)) {
      let builder = templateFnCache.get(tpl);
      if (!builder) {
        builder = literalTemplate(formatter, tpl, cachedOpts);
        templateFnCache.set(tpl, builder);
      }
      return extendedTrace(builder(args));
    } else if (typeof tpl === "object" && tpl) {
      if (args.length > 0) throw new Error("Unexpected extra params.");
      return createTemplateBuilder(formatter, merge(cachedOpts, validate$1(tpl)));
    }
    throw new Error(`Unexpected template param ${typeof tpl}`);
  }, {
    ast: (tpl, ...args) => {
      if (typeof tpl === "string") {
        if (args.length > 1) throw new Error("Unexpected extra params.");
        return stringTemplate(formatter, tpl, merge(merge(cachedOpts, validate$1(args[0])), NO_PLACEHOLDER))();
      } else if (Array.isArray(tpl)) {
        let builder = templateAstCache.get(tpl);
        if (!builder) {
          builder = literalTemplate(formatter, tpl, merge(cachedOpts, NO_PLACEHOLDER));
          templateAstCache.set(tpl, builder);
        }
        return builder(args)();
      }
      throw new Error(`Unexpected template param ${typeof tpl}`);
    }
  });
}
function extendedTrace(fn) {
  const rootErr = new Error();
  return arg => {
    try {
      return fn(arg);
    } catch (err) {
      err.stack += `\n    =============\n${rootErr.stack.split("\n").slice(3).join("\n")}`;
      throw err;
    }
  };
}

const smart = createTemplateBuilder(smart$1);
const statement = createTemplateBuilder(statement$1);
const statements = createTemplateBuilder(statements$1);
const expression = createTemplateBuilder(expression$1);
const program = createTemplateBuilder(program$1);
const index = Object.assign(smart.bind(undefined), {
  smart,
  statement,
  statements,
  expression,
  program,
  ast: smart.ast
});

export { index as default, expression, program, smart, statement, statements };
//# sourceMappingURL=index.js.map
