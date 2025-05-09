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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
function addImportToNgModule(options) {
    return function (host) {
        var e_1, _a;
        var modulePath = options.module;
        if (!modulePath) {
            return host;
        }
        if (!host.exists(modulePath)) {
            throw new Error("Specified module path ".concat(modulePath, " does not exist"));
        }
        var text = host.read(modulePath);
        if (text === null) {
            throw new schematics_1.SchematicsException("File ".concat(modulePath, " does not exist."));
        }
        var sourceText = text.toString('utf-8');
        var source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
        var statePath = "".concat(options.path, "/").concat(options.statePath);
        var relativePath = (0, schematics_core_1.buildRelativePath)(modulePath, statePath);
        var rootStoreReducers = options.minimal ? "{}" : "reducers";
        var rootStoreConfig = options.minimal ? "" : ", { metaReducers }";
        var storeNgModuleImport = (0, schematics_core_1.addImportToModule)(source, modulePath, options.root
            ? "StoreModule.forRoot(".concat(rootStoreReducers).concat(rootStoreConfig, ")")
            : "StoreModule.forFeature(from".concat(schematics_core_1.stringUtils.classify(options.name), ".").concat(schematics_core_1.stringUtils.camelize(options.name), "FeatureKey, from").concat(schematics_core_1.stringUtils.classify(options.name), ".reducers, { metaReducers: from").concat(schematics_core_1.stringUtils.classify(options.name), ".metaReducers })"), relativePath).shift();
        var commonImports = [
            (0, schematics_core_1.insertImport)(source, modulePath, 'StoreModule', '@ngrx/store'),
            storeNgModuleImport,
        ];
        if (options.root && !options.minimal) {
            commonImports = commonImports.concat([
                (0, schematics_core_1.insertImport)(source, modulePath, 'reducers, metaReducers', relativePath),
            ]);
        }
        else if (!options.root) {
            commonImports = commonImports.concat([
                (0, schematics_core_1.insertImport)(source, modulePath, "* as from".concat(schematics_core_1.stringUtils.classify(options.name)), relativePath, true),
            ]);
        }
        var rootImports = [];
        if (options.root) {
            var hasImports_1 = false;
            (0, schematics_core_1.visitNgModuleImports)(source, function (_, importNodes) {
                hasImports_1 = importNodes.length > 0;
            });
            // `addImportToModule` adds a comma to imports when there are already imports present
            // because at this time the store import hasn't been committed yet, `addImportToModule` wont add a comma
            // so we have to add it here for empty import arrays
            var adjectiveComma = hasImports_1 ? '' : ', ';
            var storeDevtoolsNgModuleImport = (0, schematics_core_1.addImportToModule)(source, modulePath, "".concat(adjectiveComma, "isDevMode() ? StoreDevtoolsModule.instrument() : []"), relativePath).shift();
            rootImports = rootImports.concat([
                (0, schematics_core_1.insertImport)(source, modulePath, 'StoreDevtoolsModule', '@ngrx/store-devtools'),
                (0, schematics_core_1.insertImport)(source, modulePath, 'isDevMode', '@angular/core'),
                storeDevtoolsNgModuleImport,
            ]);
        }
        var changes = __spreadArray(__spreadArray([], __read(commonImports), false), __read(rootImports), false);
        var recorder = host.beginUpdate(modulePath);
        try {
            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                var change = changes_1_1.value;
                if (change instanceof schematics_core_1.InsertChange) {
                    recorder.insertLeft(change.pos, change.toAdd);
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
        if (!options.name && !options.root) {
            throw new Error("Please provide a name for the feature state");
        }
        options.path = (0, schematics_core_1.getProjectPath)(host, options);
        var parsedPath = (0, schematics_core_1.parseName)(options.path, options.name || '');
        options.name = parsedPath.name;
        options.path = parsedPath.path;
        if (options.module) {
            options.module = (0, schematics_core_1.findModuleFromOptions)(host, options);
        }
        if (options.root &&
            options.stateInterface &&
            options.stateInterface !== 'State') {
            options.stateInterface = schematics_core_1.stringUtils.classify(options.stateInterface);
        }
        var templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            options.root && options.minimal ? (0, schematics_1.filter)(function (_) { return false; }) : (0, schematics_1.noop)(),
            (0, schematics_1.applyTemplates)(__assign(__assign(__assign({}, schematics_core_1.stringUtils), options), { isLib: (0, schematics_core_1.isLib)(host, options) })),
            (0, schematics_1.move)(parsedPath.path),
        ]);
        return (0, schematics_1.chain)([
            (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([addImportToNgModule(options), (0, schematics_1.mergeWith)(templateSource)])),
        ])(host, context);
    };
}
//# sourceMappingURL=index.js.map