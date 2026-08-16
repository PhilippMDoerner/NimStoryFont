"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseName = parseName;
const core_1 = require("@angular-devkit/core");
function parseName(path, name) {
    const nameWithoutPath = (0, core_1.basename)(name);
    const namePath = (0, core_1.dirname)((path + '/' + name));
    return {
        name: nameWithoutPath,
        path: (0, core_1.normalize)('/' + namePath),
    };
}
//# sourceMappingURL=parse-name.js.map