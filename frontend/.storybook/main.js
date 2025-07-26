module.exports = {
  stories: [
    '../src/**/*.stories.ts',
  ],

  addons: [
    '@storybook/addon-a11y',
    'storybook-preset-inline-svg',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],

  framework: {
    name: '@storybook/angular',
    options: {}
  },

  core: {
    "disableTelemetry": true
  },

  staticDirs: [
    '../src/assets', 
    '../node_modules/tinymce',
    '../node_modules',
    '../src'
  ],

  docs: {}
};