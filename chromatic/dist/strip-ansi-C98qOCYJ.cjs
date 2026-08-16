
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3df5b700-3d15-5b98-94c5-1485b61130d4")}catch(e){}}();
function e({onlyFirst:e=!1}={}){return RegExp(`(?:\\u001B\\][\\s\\S]*?(?:\\u0007|\\u001B\\u005C|\\u009C))|[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]`,e?void 0:`g`)}const t=e();function n(e){if(typeof e!=`string`)throw TypeError(`Expected a \`string\`, got \`${typeof e}\``);return!e.includes(`\x1B`)&&!e.includes(``)?e:e.replace(t,``)}Object.defineProperty(exports,`t`,{enumerable:!0,get:function(){return n}});
//# sourceMappingURL=strip-ansi-C98qOCYJ.cjs.map
//# debugId=3df5b700-3d15-5b98-94c5-1485b61130d4
