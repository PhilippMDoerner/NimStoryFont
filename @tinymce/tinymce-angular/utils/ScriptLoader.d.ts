/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Observable } from 'rxjs';
export interface IStateObj {
    script$: Observable<void> | null;
}
interface ScriptLoader {
    load: (doc: Document, url: string) => Observable<void>;
    reinitialize: () => void;
}
declare const ScriptLoader: ScriptLoader;
export { ScriptLoader };
