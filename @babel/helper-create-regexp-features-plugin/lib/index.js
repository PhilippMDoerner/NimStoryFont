import rewritePattern from 'regexpu-core';
import { types } from '@babel/core';
import annotateAsPure from '@babel/helper-annotate-as-pure';
import semver from 'semver';

const FEATURES = Object.freeze({
  unicodeFlag: 1 << 0,
  dotAllFlag: 1 << 1,
  unicodePropertyEscape: 1 << 2,
  namedCaptureGroups: 1 << 3,
  unicodeSetsFlag_syntax: 1 << 4,
  unicodeSetsFlag: 1 << 5,
  duplicateNamedCaptureGroups: 1 << 6,
  modifiers: 1 << 7
});
const featuresKey = "@babel/plugin-regexp-features/featuresKey";
const runtimeKey = "@babel/plugin-regexp-features/runtimeKey";
function enableFeature(features, feature) {
  return features | feature;
}
function hasFeature(features, feature) {
  return !!(features & feature);
}

function generateRegexpuOptions(pattern, toTransform) {
  const feat = name => {
    return hasFeature(toTransform, FEATURES[name]) ? "transform" : false;
  };
  const featDuplicateNamedGroups = () => {
    if (!feat("duplicateNamedCaptureGroups")) return false;
    const regex = /\(\?<([^>]+)(>|$)/g;
    const seen = new Set();
    for (let match; (match = regex.exec(pattern)) && match[2]; seen.add(match[1])) {
      if (seen.has(match[1])) return "transform";
    }
    return false;
  };
  return {
    unicodeFlag: feat("unicodeFlag"),
    unicodeSetsFlag: feat("unicodeSetsFlag"),
    dotAllFlag: feat("dotAllFlag"),
    unicodePropertyEscapes: feat("unicodePropertyEscape"),
    namedGroups: feat("namedCaptureGroups") || featDuplicateNamedGroups(),
    onNamedGroup: () => {},
    modifiers: feat("modifiers")
  };
}
function canSkipRegexpu(node, options) {
  const {
    flags,
    pattern
  } = node;
  if (flags.includes("v")) {
    if (options.unicodeSetsFlag === "transform") return false;
  }
  if (flags.includes("u")) {
    if (options.unicodeFlag === "transform") return false;
    if (options.unicodePropertyEscapes === "transform" && /\\p\{/i.test(pattern)) {
      return false;
    }
  }
  if (flags.includes("s")) {
    if (options.dotAllFlag === "transform") return false;
  }
  if (options.namedGroups === "transform" && /\(\?<(?![=!])/.test(pattern)) {
    return false;
  }
  if (options.modifiers === "transform" && /\(\?[\w-]+:/.test(pattern)) {
    return false;
  }
  return true;
}
function transformFlags(regexpuOptions, flags) {
  if (regexpuOptions.unicodeSetsFlag === "transform") {
    flags = flags.replace("v", "u");
  }
  if (regexpuOptions.unicodeFlag === "transform") {
    flags = flags.replace("u", "");
  }
  if (regexpuOptions.dotAllFlag === "transform") {
    flags = flags.replace("s", "");
  }
  return flags;
}

const versionKey = "@babel/plugin-regexp-features/version";
function createRegExpFeaturePlugin({
  name,
  feature,
  options = {},
  manipulateOptions = () => {}
}) {
  return {
    name,
    manipulateOptions,
    pre() {
      const {
        file
      } = this;
      const features = file.get(featuresKey) ?? 0;
      let newFeatures = enableFeature(features, FEATURES[feature]);
      const {
        useUnicodeFlag,
        runtime
      } = options;
      if (useUnicodeFlag === false) {
        newFeatures = enableFeature(newFeatures, FEATURES.unicodeFlag);
      }
      if (newFeatures !== features) {
        file.set(featuresKey, newFeatures);
      }
      if (runtime !== undefined) {
        if (file.has(runtimeKey) && file.get(runtimeKey) !== runtime) {
          throw new Error(`The 'runtime' option must be the same for ` + `'@babel/plugin-transform-named-capturing-groups-regex' and ` + `'@babel/plugin-transform-duplicate-named-capturing-groups-regex'.`);
        }
        file.set(runtimeKey, runtime);
      }
      if (!file.get(versionKey) || semver.lt(file.get(versionKey), "8.0.1")) {
        file.set(versionKey, "8.0.1");
      }
    },
    visitor: {
      RegExpLiteral(path) {
        const {
          node
        } = path;
        const {
          file
        } = this;
        const features = file.get(featuresKey);
        const runtime = file.get(runtimeKey) ?? true;
        const regexpuOptions = generateRegexpuOptions(node.pattern, features);
        if (canSkipRegexpu(node, regexpuOptions)) {
          return;
        }
        const namedCaptureGroups = Object.create(null);
        if (regexpuOptions.namedGroups === "transform") {
          regexpuOptions.onNamedGroup = (name, index) => {
            const prev = namedCaptureGroups[name];
            if (typeof prev === "number") {
              namedCaptureGroups[name] = [prev, index];
            } else if (Array.isArray(prev)) {
              prev.push(index);
            } else {
              namedCaptureGroups[name] = index;
            }
          };
        }
        let newFlags;
        if (regexpuOptions.modifiers === "transform") {
          regexpuOptions.onNewFlags = flags => {
            newFlags = flags;
          };
        }
        node.pattern = rewritePattern(node.pattern, node.flags, regexpuOptions);
        if (regexpuOptions.namedGroups === "transform" && Object.keys(namedCaptureGroups).length > 0 && runtime && !isRegExpTest(path)) {
          const call = types.callExpression(this.addHelper("wrapRegExp"), [node, types.valueToNode(namedCaptureGroups)]);
          annotateAsPure(call);
          path.replaceWith(call);
        }
        node.flags = transformFlags(regexpuOptions, newFlags ?? node.flags);
      }
    }
  };
}
function isRegExpTest(path) {
  return path.parentPath.isMemberExpression({
    object: path.node,
    computed: false
  }) && path.parentPath.get("property").isIdentifier({
    name: "test"
  });
}

export { createRegExpFeaturePlugin };
//# sourceMappingURL=index.js.map
