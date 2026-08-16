/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { z } from 'zod';
export declare const LIST_PROJECTS_TOOL: import("./tool-registry").McpToolDeclaration<Readonly<{
    [k: string]: z.core.$ZodType<unknown, unknown, z.core.$ZodTypeInternals<unknown, unknown>>;
}>, {
    workspaces: z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        frameworkVersion: z.ZodOptional<z.ZodString>;
        projects: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodOptional<z.ZodEnum<{
                application: "application";
                library: "library";
            }>>;
            builder: z.ZodOptional<z.ZodString>;
            root: z.ZodString;
            sourceRoot: z.ZodString;
            selectorPrefix: z.ZodOptional<z.ZodString>;
            unitTestFramework: z.ZodOptional<z.ZodEnum<{
                vitest: "vitest";
                unknown: "unknown";
                jasmine: "jasmine";
                jest: "jest";
            }>>;
            styleLanguage: z.ZodOptional<z.ZodEnum<{
                css: "css";
                less: "less";
                sass: "sass";
                scss: "scss";
            }>>;
            targets: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    parsingErrors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        filePath: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>;
    versioningErrors: z.ZodDefault<z.ZodArray<z.ZodObject<{
        filePath: z.ZodString;
        message: z.ZodString;
    }, z.core.$strip>>>;
}>;
