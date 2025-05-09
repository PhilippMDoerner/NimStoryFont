"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOutStylingRules = void 0;
const isStylingRule = (rule) => {
    const { test } = rule;
    if (!test) {
        return false;
    }
    if (!(test instanceof RegExp)) {
        return false;
    }
    return test.test('.css') || test.test('.scss') || test.test('.sass');
};
const filterOutStylingRules = (config) => {
    return config.module.rules.filter((rule) => !isStylingRule(rule));
};
exports.filterOutStylingRules = filterOutStylingRules;
