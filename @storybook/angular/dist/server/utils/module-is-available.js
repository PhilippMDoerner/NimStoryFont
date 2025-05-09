"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleIsAvailable = void 0;
const moduleIsAvailable = (moduleName) => {
    try {
        require.resolve(moduleName);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.moduleIsAvailable = moduleIsAvailable;
