import { types } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';

const index = declare((api, options) => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  if ("loose" in options) {
    console.warn("@babel/plugin-transform-computed-properties: The 'loose' option has been deprecated, " + "use the 'setComputedProperties' assumption instead (https://babeljs.io/assumptions).");
  }
  const setComputedProperties = api.assumption("setComputedProperties") ?? options.loose;
  const pushComputedProps = setComputedProperties ? pushComputedPropsLoose : pushComputedPropsSpec;
  function buildDefineAccessor(state, obj, prop) {
    const type = prop.kind;
    const key = !prop.computed && types.isIdentifier(prop.key) ? types.stringLiteral(prop.key.name) : prop.key;
    const fn = getValue(prop);
    return types.callExpression(state.addHelper("defineAccessor"), [types.stringLiteral(type), obj, key, fn]);
  }
  function getValue(prop) {
    if (types.isObjectProperty(prop)) {
      return prop.value;
    } else if (types.isObjectMethod(prop)) {
      return types.functionExpression(null, prop.params, prop.body, prop.generator, prop.async);
    }
  }
  function pushAssign(objId, prop, body) {
    body.push(types.expressionStatement(types.assignmentExpression("=", types.memberExpression(types.cloneNode(objId), prop.key, prop.computed || types.isLiteral(prop.key)), getValue(prop))));
  }
  function pushComputedPropsLoose(info) {
    const {
      computedProps,
      state,
      initPropExpression,
      objId,
      body
    } = info;
    for (const prop of computedProps) {
      if (types.isObjectMethod(prop) && (prop.kind === "get" || prop.kind === "set")) {
        if (computedProps.length === 1) {
          return buildDefineAccessor(state, initPropExpression, prop);
        } else {
          body.push(types.expressionStatement(buildDefineAccessor(state, types.cloneNode(objId), prop)));
        }
      } else {
        pushAssign(types.cloneNode(objId), prop, body);
      }
    }
  }
  function pushComputedPropsSpec(info) {
    const {
      objId,
      body,
      computedProps,
      state
    } = info;
    const CHUNK_LENGTH_CAP = 10;
    let currentChunk = null;
    const computedPropsChunks = [];
    for (const prop of computedProps) {
      if (!currentChunk || currentChunk.length === CHUNK_LENGTH_CAP) {
        currentChunk = [];
        computedPropsChunks.push(currentChunk);
      }
      currentChunk.push(prop);
    }
    for (const chunk of computedPropsChunks) {
      const single = computedPropsChunks.length === 1;
      let node = single ? info.initPropExpression : types.cloneNode(objId);
      for (const prop of chunk) {
        if (types.isObjectMethod(prop) && (prop.kind === "get" || prop.kind === "set")) {
          node = buildDefineAccessor(info.state, node, prop);
        } else {
          node = types.callExpression(state.addHelper("defineProperty"), [node, types.toComputedKey(prop), getValue(prop)]);
        }
      }
      if (single) return node;
      body.push(types.expressionStatement(node));
    }
  }
  return {
    name: "transform-computed-properties",
    visitor: {
      ObjectExpression: {
        exit(path, state) {
          const {
            node,
            parent,
            scope
          } = path;
          let hasComputed = false;
          for (const prop of node.properties) {
            hasComputed = prop.computed === true;
            if (hasComputed) break;
          }
          if (!hasComputed) return;
          const initProps = [];
          const computedProps = [];
          let foundComputed = false;
          for (const prop of node.properties) {
            if (types.isSpreadElement(prop)) {
              continue;
            }
            if (prop.computed) {
              foundComputed = true;
            }
            if (foundComputed) {
              computedProps.push(prop);
            } else {
              initProps.push(prop);
            }
          }
          const objId = scope.generateUidIdentifierBasedOnNode(parent);
          const initPropExpression = types.objectExpression(initProps);
          const body = [];
          body.push(types.variableDeclaration("var", [types.variableDeclarator(objId, initPropExpression)]));
          const single = pushComputedProps({
            objId,
            body,
            computedProps,
            initPropExpression,
            state
          });
          if (single) {
            path.replaceWith(single);
          } else {
            if (setComputedProperties) {
              body.push(types.expressionStatement(types.cloneNode(objId)));
            }
            path.replaceWithMultiple(body);
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
