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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var schematics_1 = require("@angular-devkit/schematics");
var ts = require("typescript");
var schematics_core_1 = require("../../schematics-core");
function addStateToComponent(options) {
    return function (host) {
        var e_1, _a;
        if (!options.state && !options.stateInterface) {
            return host;
        }
        var statePath = "/".concat(options.path, "/").concat(options.state);
        if (options.state) {
            if (!host.exists(statePath)) {
                throw new Error("The Specified state path ".concat(statePath, " does not exist"));
            }
        }
        var componentPath = "/".concat(options.path, "/") +
            (options.flat ? '' : schematics_core_1.stringUtils.dasherize(options.name) + '/') +
            schematics_core_1.stringUtils.dasherize(options.name) +
            '.component.ts';
        var text = host.read(componentPath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File ".concat(componentPath, " does not exist."));
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(componentPath, sourceText, ts.ScriptTarget.Latest, true);
        var stateImportPath = (0, schematics_core_1.buildRelativePath)(componentPath, statePath);
        var storeImport = (0, schematics_core_1.insertImport)(source, componentPath, 'Store', '@ngrx/store');
        var stateImport = options.state
            ? (0, schematics_core_1.insertImport)(source, componentPath, "* as fromStore", stateImportPath, true)
            : new schematics_core_1.NoopChange();
        var componentClass = source.statements.find(function (stm) { return stm.kind === ts.SyntaxKind.ClassDeclaration; });
        var constructorUpdate = new schematics_core_1.ReplaceChange(componentPath, componentClass.members.pos, '\n', "\n  constructor(private store: Store) {}");
        var changes = [storeImport, stateImport, constructorUpdate];
        var recorder = host.beginUpdate(componentPath);
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                if (change instanceof schematics_core_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
                }
                else if (change instanceof schematics_core_1.ReplaceChange) {
                    recorder.remove(change.pos, change.oldText.length);
                    recorder.insertLeft(change.order, change.newText);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        host.commitUpdate(recorder);
        return host;
    };
}
function default_1(options) {
    return function (host, context) {
        options.path = (0, schematics_core_1.getProjectPath)(host, options);
        var parsedPath = (0, schematics_core_1.parseName)(options.path, options.name);
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        var opts = ['state', 'stateInterface', 'testDepth'].reduce(function (current, key) {
            return (0, schematics_core_1.omit)(current, key);
        }, options);
        var templateSource = (0, schematics_1.apply)((0, schematics_1.url)(options.testDepth === 'unit' ? './files' : './integration-files'), [
            options.skipTests
                ? (0, schematics_1.filter)(function (path) { return !path.endsWith('.spec.ts.template'); })
                : (0, schematics_1.noop)(),
            (0, schematics_1.applyTemplates)(__assign(__assign({ 'if-flat': function (s) { return (options.flat ? '' : s); } }, schematics_core_1.stringUtils), options)),
            (0, schematics_1.move)(parsedPath.path),
        ]);
        // Remove all undefined values to use the schematic defaults (in angular.json or the Angular schema)
        Object.keys(opts).forEach(function (key) {
            return opts[key] === undefined ? delete opts[key] : {};
        });
        return (0, schematics_1.chain)([
            (0, schematics_1.externalSchematic)('@schematics/angular', 'component', __assign(__assign({}, opts), { skipTests: true })),
            addStateToComponent(options),
            (0, schematics_1.mergeWith)(templateSource),
        ])(host, context);
    };
}
//# sourceMappingURL=index.js.map