"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_DOCS_EXTENSION = exports.RULE_NAME = void 0;
const utils_1 = require("@angular-eslint/utils");
const utils_2 = require("@typescript-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
exports.RULE_NAME = 'no-implicit-take-until-destroyed';
const RXJS_INTEROP_LINK = 'https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed';
const DEPENDENCY_INJECTION_CONTEXT = 'https://angular.dev/guide/di/dependency-injection-context';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'problem',
        docs: {
            description: `Ensures that \`takeUntilDestroyed()\` is called with an explicit \`DestroyRef\` when used outside of an injection context`,
        },
        schema: [],
        messages: {
            noImplicitTakeUntilDestroyed: `\`takeUntilDestroyed()\` must be called with an explicit \`DestroyRef\` parameter when used outside of an injection context. See more at ${DEPENDENCY_INJECTION_CONTEXT} and ${RXJS_INTEROP_LINK}`,
        },
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if (node.callee.type !== utils_2.AST_NODE_TYPES.Identifier ||
                    node.callee.name !== 'takeUntilDestroyed' ||
                    node.arguments.length > 0 ||
                    isInInjectionContext(node)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'noImplicitTakeUntilDestroyed',
                });
            },
        };
    },
});
function isInInjectionContext(node) {
    let current = node;
    while (current) {
        if (isInFactoryFunction(current)) {
            return true;
        }
        if (utils_1.ASTUtils.isPropertyDefinition(current) ||
            isConstructorMethod(current)) {
            const classDeclaration = utils_1.ASTUtils.getNearestNodeFrom(current, utils_1.ASTUtils.isClassDeclaration);
            if (!classDeclaration) {
                current = current.parent;
                continue;
            }
            const decorator = utils_1.ASTUtils.getAngularClassDecorator(classDeclaration);
            if (decorator && decorator !== 'NgModule') {
                return true;
            }
        }
        if (isNonConstructorMethod(current)) {
            const classDeclaration = utils_1.ASTUtils.getNearestNodeFrom(current, utils_1.ASTUtils.isClassDeclaration);
            if (classDeclaration) {
                const decorator = utils_1.ASTUtils.getAngularClassDecorator(classDeclaration);
                if (decorator &&
                    decorator !== 'NgModule' &&
                    isMethodCalledFromInjectionContext(current, classDeclaration)) {
                    return true;
                }
            }
        }
        current = current.parent;
    }
    return false;
}
function isConstructorMethod(node) {
    return (node.type === utils_2.AST_NODE_TYPES.MethodDefinition && node.kind === 'constructor');
}
function isNonConstructorMethod(node) {
    return (node.type === utils_2.AST_NODE_TYPES.MethodDefinition && node.kind !== 'constructor');
}
function getMethodName(node) {
    if (node.key.type === utils_2.AST_NODE_TYPES.Identifier ||
        node.key.type === utils_2.AST_NODE_TYPES.PrivateIdentifier) {
        return node.key.name;
    }
    return null;
}
function isMethodCalledFromInjectionContext(method, classDeclaration) {
    const methodName = getMethodName(method);
    if (!methodName) {
        return false;
    }
    const isPrivateField = method.key.type === utils_2.AST_NODE_TYPES.PrivateIdentifier;
    for (const member of classDeclaration.body.body) {
        if (!isConstructorMethod(member) &&
            !utils_1.ASTUtils.isPropertyDefinition(member)) {
            continue;
        }
        if (containsCallToMethod(member, methodName, isPrivateField)) {
            return true;
        }
    }
    return false;
}
function isASTNode(value) {
    return (value !== null &&
        typeof value === 'object' &&
        'type' in value &&
        typeof value.type === 'string');
}
function containsCallToMethod(node, methodName, isPrivateField) {
    if (node.type === utils_2.AST_NODE_TYPES.CallExpression &&
        node.callee.type === utils_2.AST_NODE_TYPES.MemberExpression) {
        const { object, property } = node.callee;
        if (object.type === utils_2.AST_NODE_TYPES.ThisExpression) {
            if (isPrivateField &&
                property.type === utils_2.AST_NODE_TYPES.PrivateIdentifier &&
                property.name === methodName) {
                return true;
            }
            if (!isPrivateField &&
                property.type === utils_2.AST_NODE_TYPES.Identifier &&
                property.name === methodName) {
                return true;
            }
        }
    }
    for (const key of Object.keys(node)) {
        if (key === 'parent')
            continue;
        const child = node[key];
        if (child && typeof child === 'object') {
            if (Array.isArray(child)) {
                for (const item of child) {
                    if (isASTNode(item) &&
                        containsCallToMethod(item, methodName, isPrivateField)) {
                        return true;
                    }
                }
            }
            else if (isASTNode(child)) {
                if (containsCallToMethod(child, methodName, isPrivateField)) {
                    return true;
                }
            }
        }
    }
    return false;
}
function isInFactoryFunction(node) {
    if (node.type !== utils_2.AST_NODE_TYPES.ArrowFunctionExpression &&
        node.type !== utils_2.AST_NODE_TYPES.FunctionExpression) {
        return false;
    }
    const parent = node.parent;
    if (!utils_1.ASTUtils.isProperty(parent)) {
        return false;
    }
    const key = parent.key;
    if (key.type === utils_2.AST_NODE_TYPES.Identifier &&
        ['factory', 'useFactory'].includes(key.name)) {
        return true;
    }
    return false;
}
exports.RULE_DOCS_EXTENSION = {
    rationale: `The \`takeUntilDestroyed()\` operator can automatically infer the current component's or directive's \`DestroyRef\` only when called within an injection context — specifically in constructors or field initializers of classes decorated with \`@Component\`, \`@Directive\`, \`@Injectable\`, \`@Pipe\`, or \`@Service\`, or in factory functions (\`useFactory\` in providers or \`factory\` in InjectionTokens). When used in lifecycle methods like \`ngOnInit()\` or \`ngAfterViewInit()\`, in regular methods, in constructors of plain classes not managed by Angular's DI system, or in \`@NgModule\` classes (which don't support the \`ngOnDestroy\` lifecycle), the injection context is not available, and \`takeUntilDestroyed()\` will throw a runtime error: "NG0203: inject() must be called from an injection context." To fix this, inject \`DestroyRef\` using \`inject(DestroyRef)\` and pass it explicitly: \`takeUntilDestroyed(this.destroyRef)\`.`,
};
