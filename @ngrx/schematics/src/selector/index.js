"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
function default_1(options) {
    return function (host, context) {
        options.path = (0, schematics_core_1.getProjectPath)(host, options);
        var parsedPath = (0, schematics_core_1.parseName)(options.path, options.name || '');
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        var templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            options.skipTests
                ? (0, schematics_1.filter)(function (path) { return !path.endsWith('.spec.ts.template'); })
                : (0, schematics_1.noop)(),
            (0, schematics_1.applyTemplates)(__assign(__assign(__assign({}, schematics_core_1.stringUtils), { 'if-flat': function (s) {
                    return schematics_core_1.stringUtils.group(options.flat ? '' : s, options.group ? 'selectors' : '');
                }, reducerPath: "".concat(relativePath(options)).concat(schematics_core_1.stringUtils.dasherize(options.name), ".reducer") }), options)),
            (0, schematics_1.move)(parsedPath.path),
        ]);
        return (0, schematics_1.chain)([(0, schematics_1.branchAndMerge)((0, schematics_1.chain)([(0, schematics_1.mergeWith)(templateSource)]))])(host, context);
    };
}
function relativePath(options) {
    if (options.feature) {
        return schematics_core_1.stringUtils.featurePath(options.group, options.flat, 'reducers', schematics_core_1.stringUtils.dasherize(options.name));
    }
    return '';
}
//# sourceMappingURL=index.js.map