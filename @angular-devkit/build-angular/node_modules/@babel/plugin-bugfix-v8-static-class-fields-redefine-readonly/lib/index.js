import { types } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';

function isNameOrLength(key) {
  if (types.isIdentifier(key)) {
    return key.name === "name" || key.name === "length";
  }
  if (types.isStringLiteral(key)) {
    return key.value === "name" || key.value === "length";
  }
  return false;
}
function isStaticFieldWithValue(node) {
  return (types.isClassProperty(node) || types.isClassPrivateProperty(node)) && node.static && !!node.value;
}
const hasReferenceVisitor = {
  ReferencedIdentifier(path, state) {
    if (path.node.name === state.name) {
      state.ref();
      path.stop();
    }
  },
  Scope(path, {
    name
  }) {
    if (path.scope.hasOwnBinding(name)) {
      path.skip();
    }
  }
};
function isReferenceOrThis(node, name) {
  return types.isThisExpression(node) || name && types.isIdentifier(node, {
    name
  });
}
const hasReferenceOrThisVisitor = {
  "ThisExpression|ReferencedIdentifier"(path, state) {
    if (isReferenceOrThis(path.node, state.name)) {
      state.ref();
      path.stop();
    }
  },
  FunctionParent(path, state) {
    if (path.isArrowFunctionExpression()) return;
    if (state.name && !path.scope.hasOwnBinding(state.name)) {
      path.traverse(hasReferenceVisitor, state);
    }
    path.skip();
    if (path.isMethod()) {
      path.requeueComputedKeyAndDecorators();
    }
  }
};
function getPotentiallyBuggyFieldsIndexes(path) {
  const buggyPublicStaticFieldsIndexes = [];
  let classReferenced = false;
  const className = path.node.id?.name;
  const hasReferenceState = {
    name: className,
    ref: () => classReferenced = true
  };
  if (className) {
    for (const el of path.get("body.body")) {
      if (el.node.computed) {
        el.get("key").traverse(hasReferenceVisitor, hasReferenceState);
        if (classReferenced) break;
      }
    }
  }
  let nextPotentiallyBuggy = false;
  const {
    body
  } = path.node.body;
  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    if (!nextPotentiallyBuggy) {
      if (types.isStaticBlock(node)) {
        classReferenced = true;
        nextPotentiallyBuggy = true;
      } else if (isStaticFieldWithValue(node)) {
        if (!classReferenced) {
          if (isReferenceOrThis(node.value, className)) {
            classReferenced = true;
          } else {
            path.get(`body.body.${i}.value`).traverse(hasReferenceOrThisVisitor, hasReferenceState);
          }
        }
        if (classReferenced) {
          nextPotentiallyBuggy = !path.scope.isPure(node.value);
        }
      }
    }
    if (types.isClassProperty(node, {
      static: true
    }) && (nextPotentiallyBuggy || node.computed || isNameOrLength(node.key))) {
      buggyPublicStaticFieldsIndexes.push(i);
    }
  }
  return buggyPublicStaticFieldsIndexes;
}
function getNameOrLengthStaticFieldsIndexes(path) {
  const indexes = [];
  const {
    body
  } = path.node.body;
  for (let i = 0; i < body.length; i++) {
    const node = body[i];
    if (types.isClassProperty(node, {
      static: true,
      computed: false
    }) && isNameOrLength(node.key)) {
      indexes.push(i);
    }
  }
  return indexes;
}
function toRanges(nums) {
  const ranges = [];
  if (nums.length === 0) return ranges;
  let start = nums[0];
  let end = start + 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      throw new Error("Internal Babel error: nums must be in ascending order");
    }
    if (nums[i] === end) {
      end++;
    } else {
      ranges.push([start, end]);
      start = nums[i];
      end = start + 1;
    }
  }
  ranges.push([start, end]);
  return ranges;
}

function buildFieldsReplacement(fields, file) {
  return types.staticBlock(fields.map(field => {
    const key = field.computed || !types.isIdentifier(field.key) ? field.key : types.stringLiteral(field.key.name);
    return types.expressionStatement(types.callExpression(file.addHelper("defineProperty"), [types.thisExpression(), key, field.value || types.buildUndefinedNode()]));
  }));
}
const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const setPublicClassFields = api.assumption("setPublicClassFields");
  return {
    name: "bugfix-v8-static-class-fields-redefine-readonly",
    visitor: {
      Class(path) {
        const ranges = toRanges(setPublicClassFields ? getNameOrLengthStaticFieldsIndexes(path) : getPotentiallyBuggyFieldsIndexes(path));
        for (let i = ranges.length - 1; i >= 0; i--) {
          const [start, end] = ranges[i];
          const startPath = path.get("body.body")[start];
          startPath.replaceWith(buildFieldsReplacement(path.node.body.body.slice(start, end), this.file));
          for (let j = end - 1; j > start; j--) {
            path.get("body.body")[j].remove();
          }
        }
      }
    }
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
