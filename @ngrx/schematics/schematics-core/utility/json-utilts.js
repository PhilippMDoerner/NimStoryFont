"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPropertyInAstObject = findPropertyInAstObject;
// https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/json-utils.ts
function findPropertyInAstObject(node, propertyName) {
    let maybeNode = null;
    for (const property of node.properties) {
        if (property.key.value == propertyName) {
            maybeNode = property.value;
        }
    }
    return maybeNode;
}
//# sourceMappingURL=json-utilts.js.map