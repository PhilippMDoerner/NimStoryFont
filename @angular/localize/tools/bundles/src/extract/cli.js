#!/usr/bin/env node

      import {createRequire as __cjsCompatRequire} from 'module';
      const require = __cjsCompatRequire(import.meta.url);
    
import {
  ArbTranslationSerializer,
  LegacyMessageIdMigrationSerializer,
  MessageExtractor,
  SimpleJsonTranslationSerializer,
  Xliff1TranslationSerializer,
  Xliff2TranslationSerializer,
  XmbTranslationSerializer,
  checkDuplicateMessages,
  parseFormatOptions
} from "../../chunk-E4HORTOJ.js";
import "../../chunk-7G4W4ZDI.js";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/cli.mjs
import { ConsoleLogger, LogLevel, NodeJSFileSystem, setFileSystem } from "@angular/compiler-cli/private/localize";
import glob from "fast-glob";
import yargs from "yargs";

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/index.mjs
function extractTranslations({ rootPath: rootPath2, sourceFilePaths: sourceFilePaths2, sourceLocale, format: format2, outputPath: output, logger: logger2, useSourceMaps, useLegacyIds, duplicateMessageHandling: duplicateMessageHandling2, formatOptions: formatOptions2 = {}, fileSystem: fs }) {
  const basePath = fs.resolve(rootPath2);
  const extractor = new MessageExtractor(fs, logger2, { basePath, useSourceMaps });
  const messages = [];
  for (const file of sourceFilePaths2) {
    messages.push(...extractor.extractMessages(file));
  }
  const diagnostics = checkDuplicateMessages(fs, messages, duplicateMessageHandling2, basePath);
  if (diagnostics.hasErrors) {
    throw new Error(diagnostics.formatDiagnostics("Failed to extract messages"));
  }
  const outputPath = fs.resolve(rootPath2, output);
  const serializer = getSerializer(format2, sourceLocale, fs.dirname(outputPath), useLegacyIds, formatOptions2, fs, diagnostics);
  const translationFile = serializer.serialize(messages);
  fs.ensureDir(fs.dirname(outputPath));
  fs.writeFile(outputPath, translationFile);
  if (diagnostics.messages.length) {
    logger2.warn(diagnostics.formatDiagnostics("Messages extracted with warnings"));
  }
}
function getSerializer(format2, sourceLocale, rootPath2, useLegacyIds, formatOptions2 = {}, fs, diagnostics) {
  switch (format2) {
    case "xlf":
    case "xlif":
    case "xliff":
      return new Xliff1TranslationSerializer(sourceLocale, rootPath2, useLegacyIds, formatOptions2, fs);
    case "xlf2":
    case "xlif2":
    case "xliff2":
      return new Xliff2TranslationSerializer(sourceLocale, rootPath2, useLegacyIds, formatOptions2, fs);
    case "xmb":
      return new XmbTranslationSerializer(rootPath2, useLegacyIds, fs);
    case "json":
      return new SimpleJsonTranslationSerializer(sourceLocale);
    case "arb":
      return new ArbTranslationSerializer(sourceLocale, rootPath2, fs);
    case "legacy-migrate":
      return new LegacyMessageIdMigrationSerializer(diagnostics);
  }
  throw new Error(`No translation serializer can handle the provided format: ${format2}`);
}

// bazel-out/darwin_arm64-fastbuild/bin/packages/localize/tools/src/extract/cli.mjs
process.title = "Angular Localization Message Extractor (localize-extract)";
var args = process.argv.slice(2);
var options = yargs(args).option("l", {
  alias: "locale",
  describe: "The locale of the source being processed",
  default: "en",
  type: "string"
}).option("r", {
  alias: "root",
  default: ".",
  describe: "The root path for other paths provided in these options.\nThis should either be absolute or relative to the current working directory.",
  type: "string"
}).option("s", {
  alias: "source",
  required: true,
  describe: "A glob pattern indicating what files to search for translations, e.g. `./dist/**/*.js`.\nThis should be relative to the root path.",
  type: "string"
}).option("f", {
  alias: "format",
  required: true,
  choices: [
    "xmb",
    "xlf",
    "xlif",
    "xliff",
    "xlf2",
    "xlif2",
    "xliff2",
    "json",
    "legacy-migrate",
    "arb"
  ],
  describe: "The format of the translation file.",
  type: "string"
}).option("formatOptions", {
  describe: 'Additional options to pass to the translation file serializer, in the form of JSON formatted key-value string pairs:\nFor example: `--formatOptions {"xml:space":"preserve"}.\nThe meaning of the options is specific to the format being serialized.',
  type: "string"
}).option("o", {
  alias: "outputPath",
  required: true,
  describe: "A path to where the translation file will be written. This should be relative to the root path.",
  type: "string"
}).option("loglevel", {
  describe: "The lowest severity logging message that should be output.",
  choices: ["debug", "info", "warn", "error"],
  type: "string"
}).option("useSourceMaps", {
  type: "boolean",
  default: true,
  describe: "Whether to generate source information in the output files by following source-map mappings found in the source files"
}).option("useLegacyIds", {
  type: "boolean",
  default: true,
  describe: "Whether to use the legacy id format for messages that were extracted from Angular templates."
}).option("d", {
  alias: "duplicateMessageHandling",
  describe: "How to handle messages with the same id but different text.",
  choices: ["error", "warning", "ignore"],
  default: "warning",
  type: "string"
}).strict().help().parseSync();
var fileSystem = new NodeJSFileSystem();
setFileSystem(fileSystem);
var rootPath = options.r;
var sourceFilePaths = glob.sync(options.s, { cwd: rootPath });
var logLevel = options.loglevel;
var logger = new ConsoleLogger(logLevel ? LogLevel[logLevel] : LogLevel.warn);
var duplicateMessageHandling = options.d;
var formatOptions = parseFormatOptions(options.formatOptions);
var format = options.f;
extractTranslations({
  rootPath,
  sourceFilePaths,
  sourceLocale: options.l,
  format,
  outputPath: options.o,
  logger,
  useSourceMaps: options.useSourceMaps,
  useLegacyIds: format === "legacy-migrate" || options.useLegacyIds,
  duplicateMessageHandling,
  formatOptions,
  fileSystem
});
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
//# sourceMappingURL=cli.js.map
