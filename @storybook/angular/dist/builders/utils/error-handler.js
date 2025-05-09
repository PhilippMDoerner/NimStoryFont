"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSummary = exports.printErrorDetails = void 0;
const node_logger_1 = require("storybook/internal/node-logger");
const ts_dedent_1 = require("ts-dedent");
const printErrorDetails = (error) => {
    // Duplicate code for Standalone error handling
    // Source: https://github.com/storybookjs/storybook/blob/39c7ba09ad84fbd466f9c25d5b92791a5450b9f6/lib/core-server/src/build-dev.ts#L136
    node_logger_1.instance.heading = '';
    if (error instanceof Error) {
        if (error.error) {
            node_logger_1.logger.error(error.error);
        }
        else if (error.stats && error.stats.compilation.errors) {
            error.stats.compilation.errors.forEach((e) => node_logger_1.logger.plain(e));
        }
        else {
            node_logger_1.logger.error(error);
        }
    }
    else if (error.compilation?.errors) {
        error.compilation.errors.forEach((e) => node_logger_1.logger.plain(e));
    }
    node_logger_1.logger.line();
};
exports.printErrorDetails = printErrorDetails;
const errorSummary = (error) => {
    return error.close
        ? (0, ts_dedent_1.dedent) `
      FATAL broken build!, will close the process,
      Fix the error below and restart storybook.
    `
        : (0, ts_dedent_1.dedent) `
      Broken build, fix the error above.
      You may need to refresh the browser.
    `;
};
exports.errorSummary = errorSummary;
