import { declare } from '@babel/helper-plugin-utils';

const index = declare(api => {
  api.assertVersion("^7.0.0-0 || ^8.0.0");
  const regex = /(\\*)([\u2028\u2029])/g;
  function replace(match, escapes, separator) {
    const isEscaped = escapes.length % 2 === 1;
    if (isEscaped) return match;
    return `${escapes}\\u${separator.charCodeAt(0).toString(16)}`;
  }
  return {
    name: "transform-json-strings",
    manipulateOptions: undefined,
    visitor: api.traverse.explode({
      "DirectiveLiteral|StringLiteral"({
        node
      }) {
        const {
          extra
        } = node;
        if (!extra?.raw) return;
        extra.raw = extra.raw.replace(regex, replace);
      }
    })
  };
});

export { index as default };
//# sourceMappingURL=index.js.map
