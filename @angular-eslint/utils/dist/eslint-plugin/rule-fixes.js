"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportAddFix = getImportAddFix;
exports.getImportRemoveFix = getImportRemoveFix;
exports.getImportReplaceFix = getImportReplaceFix;
exports.getImplementsSchemaFixer = getImplementsSchemaFixer;
exports.getDecoratorPropertyAddFix = getDecoratorPropertyAddFix;
exports.getImplementsRemoveFix = getImplementsRemoveFix;
exports.getNodeToCommaRemoveFix = getNodeToCommaRemoveFix;
const utils_1 = require("@typescript-eslint/utils");
const ast_utils_1 = require("./ast-utils");
const utils_2 = require("../utils");
function getImportAddFix({ compatibleWithTypeOnlyImport = false, fixer, importName, moduleName, node, }) {
    const fullImport = `import { ${importName} } from '${moduleName}';\n`;
    const importDeclarations = (0, ast_utils_1.getImportDeclarations)(node, moduleName);
    if (!importDeclarations?.length) {
        return fixer.insertTextAfterRange([0, 0], fullImport);
    }
    const importDeclarationSpecifier = (0, ast_utils_1.getImportDeclarationSpecifier)(importDeclarations, importName);
    if (importDeclarationSpecifier) {
        return undefined;
    }
    const importClause = (0, ast_utils_1.getCorrespondentImportClause)(importDeclarations, compatibleWithTypeOnlyImport);
    if (!importClause) {
        return fixer.insertTextAfterRange([0, 0], fullImport);
    }
    const replacementText = (0, ast_utils_1.isImportDefaultSpecifier)(importClause)
        ? `, { ${importName} }`
        : `, ${importName}`;
    return fixer.insertTextAfter(importClause, replacementText);
}
function getImportRemoveFix(sourceCode, importDeclarations, importName, fixer) {
    const { importDeclaration, importSpecifier } = (0, ast_utils_1.getImportDeclarationSpecifier)(importDeclarations, importName) ?? {};
    if (!importDeclaration || !importSpecifier)
        return undefined;
    const isFirstImportSpecifier = importDeclaration.specifiers[0] === importSpecifier;
    const isLastImportSpecifier = (0, utils_2.getLast)(importDeclaration.specifiers) === importSpecifier;
    const isSingleImportSpecifier = isFirstImportSpecifier && isLastImportSpecifier;
    if (isSingleImportSpecifier) {
        return fixer.remove(importDeclaration);
    }
    const tokenAfterImportSpecifier = sourceCode.getTokenAfter(importSpecifier);
    if (isFirstImportSpecifier && tokenAfterImportSpecifier) {
        return fixer.removeRange([
            importSpecifier.range[0],
            tokenAfterImportSpecifier.range[1],
        ]);
    }
    const tokenBeforeImportSpecifier = sourceCode.getTokenBefore(importSpecifier);
    if (!tokenBeforeImportSpecifier)
        return undefined;
    return fixer.removeRange([
        tokenBeforeImportSpecifier.range[0],
        importSpecifier.range[1],
    ]);
}
/**
 * Migrates a named import from `fromName` to `toName` for the given module:
 * renames the specifier in place when possible, otherwise adds `toName` and
 * removes `fromName` once it is no longer used.
 */
function getImportReplaceFix({ fixer, fromName, moduleName, node, sourceCode, toName, }) {
    const importDeclarations = (0, ast_utils_1.getImportDeclarations)(node, moduleName);
    const toAlreadyImported = Boolean(importDeclarations &&
        (0, ast_utils_1.getImportDeclarationSpecifier)(importDeclarations, toName));
    const fromSpecifier = importDeclarations
        ? (0, ast_utils_1.getImportDeclarationSpecifier)(importDeclarations, fromName)
        : undefined;
    const fromUsedOnce = utils_1.ASTUtils.findVariable(sourceCode.getScope(node), fromName)?.references
        .length === 1;
    if (fromUsedOnce && !toAlreadyImported && fromSpecifier) {
        return [fixer.replaceText(fromSpecifier.importSpecifier, toName)];
    }
    const addFix = toAlreadyImported
        ? undefined
        : getImportAddFix({ fixer, importName: toName, moduleName, node });
    const removeFix = fromUsedOnce && importDeclarations
        ? getImportRemoveFix(sourceCode, importDeclarations, fromName, fixer)
        : undefined;
    return [addFix, removeFix];
}
function getImplementsSchemaFixer({ id, superClass, implements: classImplements, typeParameters, }, interfaceName) {
    if (Array.isArray(classImplements) && classImplements.length > 0) {
        return {
            implementsNodeReplace: (0, utils_2.getLast)(classImplements),
            implementsTextReplace: `, ${interfaceName}`,
        };
    }
    const implementsTextReplace = ` implements ${interfaceName}`;
    if ((0, utils_2.isNotNullOrUndefined)(superClass)) {
        return {
            implementsNodeReplace: superClass,
            implementsTextReplace,
        };
    }
    if ((0, utils_2.isNotNullOrUndefined)(typeParameters)) {
        return {
            implementsNodeReplace: typeParameters,
            implementsTextReplace,
        };
    }
    return {
        implementsNodeReplace: id,
        implementsTextReplace,
    };
}
function getDecoratorPropertyAddFix({ expression }, fixer, text) {
    if (!(0, ast_utils_1.isCallExpression)(expression)) {
        return undefined;
    }
    const [firstArgument] = expression.arguments;
    if (!firstArgument || !(0, ast_utils_1.isObjectExpression)(firstArgument)) {
        // `@Component()` => `@Component({changeDetection: ChangeDetectionStrategy.OnPush})`
        const [initialRange, endRange] = expression.range;
        return fixer.insertTextAfterRange([initialRange + 1, endRange - 1], `{${text}}`);
    }
    const { properties } = firstArgument;
    if (properties.length === 0) {
        //` @Component({})` => `@Component({changeDetection: ChangeDetectionStrategy.OnPush})`
        const [initialRange, endRange] = firstArgument.range;
        return fixer.insertTextAfterRange([initialRange + 1, endRange - 1], text);
    }
    // `@Component({...})` => `@Component({..., changeDetection: ChangeDetectionStrategy.OnPush})`
    return fixer.insertTextAfter((0, utils_2.getLast)(properties), `, ${text}`);
}
function getImplementsRemoveFix(sourceCode, classDeclaration, interfaceName, fixer) {
    const { implements: classImplements } = classDeclaration;
    if (!classImplements)
        return undefined;
    const identifier = (0, ast_utils_1.getInterface)(classDeclaration, interfaceName);
    if (!identifier)
        return undefined;
    const isFirstInterface = classImplements[0].expression === identifier;
    const isLastInterface = (0, utils_2.getLast)(classImplements).expression === identifier;
    const hasSingleInterfaceImplemented = isFirstInterface && isLastInterface;
    const tokenBeforeInterface = sourceCode.getTokenBefore(identifier);
    if (hasSingleInterfaceImplemented) {
        return !tokenBeforeInterface || !(0, ast_utils_1.isImplementsToken)(tokenBeforeInterface)
            ? undefined
            : fixer.removeRange([
                tokenBeforeInterface.range[0],
                classImplements[0].range[1],
            ]);
    }
    if (isFirstInterface) {
        const tokenAfterInterface = sourceCode.getTokenAfter(identifier);
        return !tokenAfterInterface
            ? undefined
            : fixer.removeRange([identifier.range[0], tokenAfterInterface.range[1]]);
    }
    return !tokenBeforeInterface
        ? undefined
        : fixer.removeRange([tokenBeforeInterface.range[0], identifier.range[1]]);
}
function isClosingDelimiterToken(token) {
    return (utils_1.ASTUtils.isClosingBraceToken(token) ||
        utils_1.ASTUtils.isClosingBracketToken(token) ||
        utils_1.ASTUtils.isClosingParenToken(token));
}
/**
 * Removes an element of a comma-separated list (object property, array element,
 * call argument) along with its own trailing comma and surrounding whitespace.
 * The preceding comma is kept so an existing trailing-comma style is preserved.
 */
function getNodeToCommaRemoveFix(sourceCode, node, fixer) {
    const tokenAfterNode = sourceCode.getTokenAfter(node);
    const commaAfterNode = tokenAfterNode && utils_1.ASTUtils.isCommaToken(tokenAfterNode)
        ? tokenAfterNode
        : undefined;
    // When another element follows, remove up to it so it keeps its indentation.
    if (commaAfterNode) {
        const tokenAfterComma = sourceCode.getTokenAfter(commaAfterNode);
        if (tokenAfterComma && !isClosingDelimiterToken(tokenAfterComma)) {
            return fixer.removeRange([node.range[0], tokenAfterComma.range[0]]);
        }
    }
    // Last element: also remove the whitespace before it, but keep the preceding
    // comma.
    const tokenBeforeNode = sourceCode.getTokenBefore(node);
    const start = tokenBeforeNode && utils_1.ASTUtils.isCommaToken(tokenBeforeNode)
        ? tokenBeforeNode.range[1]
        : node.range[0];
    return fixer.removeRange([start, commaAfterNode?.range[1] ?? node.range[1]]);
}
