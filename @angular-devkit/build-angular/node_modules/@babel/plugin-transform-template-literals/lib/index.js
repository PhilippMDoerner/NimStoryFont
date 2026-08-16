import { declare } from '@babel/helper-plugin-utils';
import { types, template } from '@babel/core';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-template-literals: The 'loose' option has been deprecated, " + "use the `ignoreToPrimitiveHint` and `mutableTemplateObject` assumptions instead (https://babeljs.io/assumptions).");
  }
  const ignoreToPrimitiveHint = api.assumption("ignoreToPrimitiveHint") ?? options.loose;
  const mutableTemplateObject = api.assumption("mutableTemplateObject") ?? options.loose;
  let helperName = "taggedTemplateLiteral";
  if (mutableTemplateObject) helperName += "Loose";
  function buildConcatCallExpressions(items) {
    let avail = true;
    return items.reduce(function (left, right) {
      let canBeInserted = types.isLiteral(right);
      if (!canBeInserted && avail) {
        canBeInserted = true;
        avail = false;
      }
      if (canBeInserted && types.isCallExpression(left)) {
        left.arguments.push(right);
        return left;
      }
      return types.callExpression(types.memberExpression(left, types.identifier("concat")), [right]);
    });
  }
  return {
    name: "transform-template-literals",
    visitor: {
      TaggedTemplateExpression(path) {
        const {
          node
        } = path;
        const {
          quasi
        } = node;
        const strings = [];
        const raws = [];
        let isStringsRawEqual = true;
        for (const elem of quasi.quasis) {
          const {
            raw,
            cooked
          } = elem.value;
          const value = cooked == null ? types.buildUndefinedNode() : types.stringLiteral(cooked);
          strings.push(value);
          raws.push(types.stringLiteral(raw));
          if (raw !== cooked) {
            isStringsRawEqual = false;
          }
        }
        const helperArgs = [types.arrayExpression(strings)];
        if (!isStringsRawEqual) {
          helperArgs.push(types.arrayExpression(raws));
        }
        const tmp = path.scope.generateUidIdentifier("templateObject");
        path.scope.getProgramParent().push({
          id: types.cloneNode(tmp)
        });
        path.replaceWith(types.callExpression(node.tag, [template.expression.ast`
              ${types.cloneNode(tmp)} || (
                ${tmp} = ${this.addHelper(helperName)}(${helperArgs})
              )
            `, ...quasi.expressions]));
      },
      TemplateLiteral(path) {
        if (path.parent.type === "TSLiteralType") {
          return;
        }
        const nodes = [];
        const expressions = path.get("expressions");
        let index = 0;
        for (const elem of path.node.quasis) {
          if (elem.value.cooked) {
            nodes.push(types.stringLiteral(elem.value.cooked));
          }
          if (index < expressions.length) {
            const expr = expressions[index++];
            const node = expr.node;
            if (!types.isStringLiteral(node, {
              value: ""
            })) {
              nodes.push(node);
            }
          }
        }
        if (!types.isStringLiteral(nodes[0]) && !(ignoreToPrimitiveHint && types.isStringLiteral(nodes[1]))) {
          nodes.unshift(types.stringLiteral(""));
        }
        let root = nodes[0];
        if (ignoreToPrimitiveHint) {
          for (let i = 1; i < nodes.length; i++) {
            root = types.binaryExpression("+", root, nodes[i]);
          }
        } else if (nodes.length > 1) {
          root = buildConcatCallExpressions(nodes);
        }
        path.replaceWith(root);
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
