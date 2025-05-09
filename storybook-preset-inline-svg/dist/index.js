"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackFinal = void 0;

const webpackFinal = (config = {}, options = {}) => {
  const {
    module = {}
  } = config;
  const {
    svgInlineLoaderOptions,
    include,
    exclude
  } = options;

  const getInlineSvgRule = () => {
    const rule = {
      test: /\.svg$/i,
      use: [{
        loader: 'svg-inline-loader',
        options: svgInlineLoaderOptions
      }]
    };

    if (include) {
      return { ...rule,
        include
      };
    }

    if (exclude) {
      return { ...rule,
        exclude
      };
    }

    return rule;
  };

  return { ...config,
    module: { ...module,
      rules: [...(module.rules || []).map(rule => {
        // Override loaders related to SVG assets based on preset props
        if (/svg/.test(rule.test)) {
          if (include) {
            return { ...rule,
              exclude: include
            };
          }

          if (exclude) {
            return { ...rule,
              include: exclude
            };
          }

          return { ...rule,
            exclude: /\.svg$/i
          };
        }

        return rule;
      }), getInlineSvgRule()]
    }
  };
};

exports.webpackFinal = webpackFinal;