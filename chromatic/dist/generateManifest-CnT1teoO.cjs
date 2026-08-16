
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="afe50cbb-1641-52c1-8d6c-c6921dc7cde9")}catch(e){}}();
const e=require(`./chunk-gGpyby2o.cjs`),t=require(`./meow-CSiqYQZC.cjs`),n=require(`./log-Xbwy1UeW.cjs`),r=require(`./validateStorybookVersion-D2vzMhPd.cjs`);let i=require(`path`);i=e.a(i);var a=e.a(t.t());async function o(e){let{flags:t}=(0,a.default)(`
    Usage
      $ chromatic generate-manifest -o <output-dir> [-c <config-dir>]

    Options
      --output-dir, -o <dirname>            Directory where manifest.json will be written (required)
      --storybook-config-dir, -c <dirname>  Directory where to load Storybook configurations from (default: '.rnstorybook')

    Examples
      $ chromatic generate-manifest -o ./storybook-static
      $ chromatic generate-manifest -o ./.storybook-static -c ./custom-config
    `,{argv:e,description:`Generate manifest.json for React Native Storybook`,flags:{outputDir:{type:`string`,alias:`o`},storybookConfigDir:{type:`string`,alias:`c`,default:`.rnstorybook`}}}),o=n.t({},{logPrefix:``,logLevel:`debug`});if(!t.outputDir){o.error(`Error: --output-dir is required`);return}let s={log:o,options:{storybookConfigDir:t.storybookConfigDir},sourceDir:i.default.resolve(t.outputDir)};try{await r.t(s),await r.n(s,{sourceDir:s.sourceDir})}catch(e){o.error(`Error: ${e.message}`),process.exit(1)}}exports.main=o;
//# sourceMappingURL=generateManifest-CnT1teoO.cjs.map
//# debugId=afe50cbb-1641-52c1-8d6c-c6921dc7cde9
