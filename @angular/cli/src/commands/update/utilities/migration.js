"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSchematic = executeSchematic;
exports.executeMigration = executeMigration;
exports.executeMigrations = executeMigrations;
exports.commitChanges = commitChanges;
const schematics_1 = require("@angular-devkit/schematics");
const semver = __importStar(require("semver"));
const schematic_workflow_1 = require("../../../command-builder/utilities/schematic-workflow");
const color_1 = require("../../../utilities/color");
const error_1 = require("../../../utilities/error");
const log_file_1 = require("../../../utilities/log-file");
const prettier_1 = require("../../../utilities/prettier");
const prompt_1 = require("../../../utilities/prompt");
const tty_1 = require("../../../utilities/tty");
const cli_version_1 = require("./cli-version");
const git_1 = require("./git");
async function executeSchematic(workflow, logger, collection, schematic, options = {}) {
    const workflowSubscription = (0, schematic_workflow_1.subscribeToWorkflow)(workflow, logger);
    // TODO: Allow passing a schematic instance directly
    try {
        await workflow
            .execute({
            collection,
            schematic,
            options,
            logger,
        })
            .toPromise();
        return { success: !workflowSubscription.error, files: workflowSubscription.files };
    }
    catch (e) {
        if (e instanceof schematics_1.UnsuccessfulWorkflowExecution) {
            logger.error(`${color_1.figures.cross} Migration failed. See above for further details.\n`);
        }
        else {
            (0, error_1.assertIsError)(e);
            const logPath = (0, log_file_1.writeErrorToLogFile)(e);
            logger.fatal(`${color_1.figures.cross} Migration failed: ${e.message}\n` +
                `  See "${logPath}" for further details.\n`);
        }
        return { success: false, files: workflowSubscription.files };
    }
    finally {
        workflowSubscription.unsubscribe();
    }
}
/**
 * @return Whether or not the migration was performed successfully.
 */
async function executeMigration(workflow, logger, packageName, collectionPath, migrationName, commit = false) {
    const collection = workflow.engine.createCollection(collectionPath);
    const name = collection.listSchematicNames().find((name) => name === migrationName);
    if (!name) {
        logger.error(`Cannot find migration '${migrationName}' in '${packageName}'.`);
        return 1;
    }
    logger.info(color_1.colors.cyan(`** Executing '${migrationName}' of package '${packageName}' **\n`));
    const schematic = workflow.engine.createSchematic(name, collection);
    return executePackageMigrations(workflow, logger, [schematic.description], packageName, commit);
}
/**
 * @return Whether or not the migrations were performed successfully.
 */
async function executeMigrations(workflow, logger, packageName, collectionPath, from, to, commit = false) {
    const collection = workflow.engine.createCollection(collectionPath);
    const migrationRange = new semver.Range('>' + (semver.prerelease(from) ? from.split('-')[0] + '-0' : from) + ' <=' + to.split('-')[0]);
    const requiredMigrations = [];
    const optionalMigrations = [];
    for (const name of collection.listSchematicNames()) {
        const schematic = workflow.engine.createSchematic(name, collection);
        const description = schematic.description;
        description.version = (0, cli_version_1.coerceVersionNumber)(description.version);
        if (!description.version) {
            continue;
        }
        if (semver.satisfies(description.version, migrationRange, { includePrerelease: true })) {
            (description.optional ? optionalMigrations : requiredMigrations).push(description);
        }
    }
    if (requiredMigrations.length === 0 && optionalMigrations.length === 0) {
        return 0;
    }
    // Required migrations
    if (requiredMigrations.length) {
        logger.info(color_1.colors.cyan(`** Executing migrations of package '${packageName}' **\n`));
        requiredMigrations.sort(compareMigrations);
        const result = await executePackageMigrations(workflow, logger, requiredMigrations, packageName, commit);
        if (result === 1) {
            return 1;
        }
    }
    // Optional migrations
    if (optionalMigrations.length) {
        logger.info(color_1.colors.magenta(`** Optional migrations of package '${packageName}' **\n`));
        optionalMigrations.sort(compareMigrations);
        const migrationsToRun = await getOptionalMigrationsToRun(logger, optionalMigrations, packageName);
        if (migrationsToRun?.length) {
            return executePackageMigrations(workflow, logger, migrationsToRun, packageName, commit);
        }
    }
    return 0;
}
async function executePackageMigrations(workflow, logger, migrations, packageName, commit = false) {
    for (const migration of migrations) {
        const { title, description } = getMigrationTitleAndDescription(migration);
        logger.info(color_1.colors.cyan(color_1.figures.pointer) + ' ' + color_1.colors.bold(title));
        if (description) {
            logger.info('  ' + description);
        }
        const { success, files } = await executeSchematic(workflow, logger, migration.collection.name, migration.name);
        if (!success) {
            return 1;
        }
        let modifiedFilesText;
        switch (files.size) {
            case 0:
                modifiedFilesText = 'No changes made';
                break;
            case 1:
                modifiedFilesText = '1 file modified';
                break;
            default:
                modifiedFilesText = `${files.size} files modified`;
                break;
        }
        if (files.size) {
            try {
                await (0, prettier_1.formatFiles)(process.cwd(), files);
            }
            catch (error) {
                (0, error_1.assertIsError)(error);
                logger.warn(`WARNING: Formatting of files failed with the following error: ${error.message}`);
            }
        }
        logger.info(`  Migration completed (${modifiedFilesText}).`);
        // Commit migration
        if (commit) {
            const commitPrefix = `${packageName} migration - ${migration.name}`;
            const commitMessage = migration.description
                ? `${commitPrefix}\n\n${migration.description}`
                : commitPrefix;
            const committed = commitChanges(logger, commitMessage);
            if (!committed) {
                // Failed to commit, something went wrong. Abort the update.
                return 1;
            }
        }
        logger.info(''); // Extra trailing newline.
    }
    return 0;
}
/**
 * @return Whether or not the commit was successful.
 */
function commitChanges(logger, message) {
    // Check if a commit is needed.
    let commitNeeded;
    try {
        commitNeeded = (0, git_1.hasChangesToCommit)();
    }
    catch (err) {
        logger.error(`  Failed to read Git tree:\n${err.stderr}`);
        return false;
    }
    if (!commitNeeded) {
        logger.info('  No changes to commit after migration.');
        return true;
    }
    // Commit changes and abort on error.
    try {
        (0, git_1.createCommit)(message);
    }
    catch (err) {
        logger.error(`Failed to commit update (${message}):\n${err.stderr}`);
        return false;
    }
    // Notify user of the commit.
    const hash = (0, git_1.findCurrentGitSha)();
    const shortMessage = message.split('\n')[0];
    if (hash) {
        logger.info(`  Committed migration step (${(0, git_1.getShortHash)(hash)}): ${shortMessage}.`);
    }
    else {
        // Commit was successful, but reading the hash was not. Something weird happened,
        // but nothing that would stop the update. Just log the weirdness and continue.
        logger.info(`  Committed migration step: ${shortMessage}.`);
        logger.warn('  Failed to look up hash of most recent commit, continuing anyways.');
    }
    return true;
}
async function getOptionalMigrationsToRun(logger, optionalMigrations, packageName) {
    const numberOfMigrations = optionalMigrations.length;
    logger.info(`This package has ${numberOfMigrations} optional migration${numberOfMigrations > 1 ? 's' : ''} that can be executed.`);
    if (!(0, tty_1.isTTY)()) {
        for (const migration of optionalMigrations) {
            const { title } = getMigrationTitleAndDescription(migration);
            logger.info(color_1.colors.cyan(color_1.figures.pointer) + ' ' + color_1.colors.bold(title));
            logger.info(color_1.colors.gray(`  ng update ${packageName} --name ${migration.name}`));
            logger.info(''); // Extra trailing newline.
        }
        return undefined;
    }
    logger.info('Optional migrations may be skipped and executed after the update process, if preferred.');
    logger.info(''); // Extra trailing newline.
    const answer = await (0, prompt_1.askChoices)(`Select the migrations that you'd like to run`, optionalMigrations.map((migration) => {
        const { title, documentation } = getMigrationTitleAndDescription(migration);
        return {
            name: `[${color_1.colors.white(migration.name)}] ${title}${documentation ? ` (${documentation})` : ''}`,
            value: migration.name,
            checked: migration.recommended,
        };
    }), null);
    logger.info(''); // Extra trailing newline.
    return optionalMigrations.filter(({ name }) => answer?.includes(name));
}
function getMigrationTitleAndDescription(migration) {
    const [title, ...description] = migration.description.split('. ');
    return {
        title: title.endsWith('.') ? title : title + '.',
        description: description.join('.\n  '),
        documentation: migration.documentation
            ? new URL(migration.documentation, 'https://angular.dev').href
            : undefined,
    };
}
function compareMigrations(a, b) {
    return semver.compare(a.version, b.version);
}
//# sourceMappingURL=migration.js.map