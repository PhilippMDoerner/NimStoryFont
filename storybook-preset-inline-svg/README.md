# storybook-preset-inline-svg

A [Storybook preset](https://storybook.js.org/docs/react/addons/writing-presets) to load SVG files inline using `svg-inline-loader`.

## Basic Usage
First `npm install storybook-preset-inline-svg svg-inline-loader`

Then update one of the following files based on your Storybook setup:

* `.storybook/main.js`

    ```js
    module.exports = {
        addons: ['storybook-preset-inline-svg']
    }
    ```

* `.storybook/presets.js`

    ```js
    module.exports = ['storybook-preset-inline-svg']
    ```

## Advanced Usage

By default this preset will inline ***all*** SVG files. Use options to filter which SVG files are inlined, or to pass options along to `svg-inline-loader`.

None of the options are required. Only use one of `include` or `exclude`, not both, which can be a `RegExp` or `Function`.

* `svgInlineLoaderOptions` options supported by [svg-inline-loader](https://www.npmjs.com/package/svg-inline-loader)
* `include` files to be inlined using [include](https://webpack.js.org/configuration/module/#ruleinclude)
* `exclude` files from being inlined using [exclude](https://webpack.js.org/configuration/module/#ruleexclude)

For example,

```js
module.exports = {
  addons: [
    {
      name: 'storybook-preset-inline-svg',
      options: {
        include: /source\/.+\.svg$/,
        svgInlineLoaderOptions: {
          removeTags: true,
          removingTags: ['circle']
        }
      }
    }
  ]
}
```
