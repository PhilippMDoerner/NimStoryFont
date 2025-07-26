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
export const filterOutStylingRules = (config) => {
    return config.module.rules.filter((rule) => !isStylingRule(rule));
};
