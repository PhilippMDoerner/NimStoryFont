import { declare } from '@babel/helper-plugin-utils';

const index = declare(({
  types: t,
  assertVersion
}) => {
  assertVersion("^7.0.0-0 || ^8.0.0");
  function containsClassExpression(path) {
    if (t.isClassExpression(path.node)) return true;
    if (t.isFunction(path.node)) return false;
    const state = {
      found: false
    };
    t.traverseFast(path.node, node => {
      if (t.isClassExpression(node)) {
        state.found = true;
        return t.traverseFast.stop;
      } else if (t.isFunction(node)) {
        return t.traverseFast.skip;
      }
    });
    return state.found;
  }
  function wrap(path) {
    const context = {
      yield: t.isYieldExpression(path.node),
      await: t.isAwaitExpression(path.node)
    };
    t.traverseFast(path.node, node => {
      if (t.isYieldExpression(node)) {
        context.yield = true;
        if (context.await) return t.traverseFast.stop;
      } else if (t.isAwaitExpression(node)) {
        context.await = true;
        if (context.yield) return t.traverseFast.stop;
      }
    });
    let replacement;
    if (context.yield) {
      const fn = t.functionExpression(null, [], t.blockStatement([t.returnStatement(path.node)]), true, context.await);
      replacement = t.yieldExpression(t.callExpression(t.memberExpression(fn, t.identifier("call")), [t.thisExpression(), t.identifier("arguments")]), true);
    } else {
      const fn = t.arrowFunctionExpression([], path.node, context.await);
      replacement = t.callExpression(fn, []);
      if (context.await) replacement = t.awaitExpression(replacement);
    }
    path.replaceWith(replacement);
  }
  return {
    name: "bugfix-firefox-class-in-computed-class-key",
    visitor: {
      Class(path) {
        const hasPrivateElement = path.node.body.body.some(node => t.isPrivate(node));
        if (!hasPrivateElement) return;
        for (const elem of path.get("body.body")) {
          if ("computed" in elem.node && elem.node.computed && containsClassExpression(elem.get("key"))) {
            wrap(elem.get("key"));
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
