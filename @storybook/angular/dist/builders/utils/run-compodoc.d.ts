import { BuilderContext } from '@angular-devkit/architect';
import { Observable } from 'rxjs';
export declare const runCompodoc: ({ compodocArgs, tsconfig }: {
    compodocArgs: string[];
    tsconfig: string;
}, context: BuilderContext) => Observable<void>;
