"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceChange = exports.RemoveChange = exports.InsertChange = exports.NoopChange = void 0;
exports.createReplaceChange = createReplaceChange;
exports.createRemoveChange = createRemoveChange;
exports.createChangeRecorder = createChangeRecorder;
exports.commitChanges = commitChanges;
/**
 * An operation that does nothing.
 */
class NoopChange {
    description = 'No operation.';
    order = Infinity;
    path = null;
    apply() {
        return Promise.resolve();
    }
}
exports.NoopChange = NoopChange;
/**
 * Will add text to the source code.
 */
class InsertChange {
    path;
    pos;
    toAdd;
    order;
    description;
    constructor(path, pos, toAdd) {
        this.path = path;
        this.pos = pos;
        this.toAdd = toAdd;
        if (pos < 0) {
            throw new Error('Negative positions are invalid');
        }
        this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
        this.order = pos;
    }
    /**
     * This method does not insert spaces if there is none in the original string.
     */
    apply(host) {
        return host.read(this.path).then((content) => {
            const prefix = content.substring(0, this.pos);
            const suffix = content.substring(this.pos);
            return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
        });
    }
}
exports.InsertChange = InsertChange;
/**
 * Will remove text from the source code.
 */
class RemoveChange {
    path;
    pos;
    end;
    order;
    description;
    constructor(path, pos, end) {
        this.path = path;
        this.pos = pos;
        this.end = end;
        if (pos < 0 || end < 0) {
            throw new Error('Negative positions are invalid');
        }
        this.description = `Removed text in position ${pos} to ${end} of ${path}`;
        this.order = pos;
    }
    apply(host) {
        return host.read(this.path).then((content) => {
            const prefix = content.substring(0, this.pos);
            const suffix = content.substring(this.end);
            // TODO: throw error if toRemove doesn't match removed string.
            return host.write(this.path, `${prefix}${suffix}`);
        });
    }
}
exports.RemoveChange = RemoveChange;
/**
 * Will replace text from the source code.
 */
class ReplaceChange {
    path;
    pos;
    oldText;
    newText;
    order;
    description;
    constructor(path, pos, oldText, newText) {
        this.path = path;
        this.pos = pos;
        this.oldText = oldText;
        this.newText = newText;
        if (pos < 0) {
            throw new Error('Negative positions are invalid');
        }
        this.description = `Replaced ${oldText} into position ${pos} of ${path} with ${newText}`;
        this.order = pos;
    }
    apply(host) {
        return host.read(this.path).then((content) => {
            const prefix = content.substring(0, this.pos);
            const suffix = content.substring(this.pos + this.oldText.length);
            const text = content.substring(this.pos, this.pos + this.oldText.length);
            if (text !== this.oldText) {
                return Promise.reject(new Error(`Invalid replace: "${text}" != "${this.oldText}".`));
            }
            // TODO: throw error if oldText doesn't match removed string.
            return host.write(this.path, `${prefix}${this.newText}${suffix}`);
        });
    }
}
exports.ReplaceChange = ReplaceChange;
function createReplaceChange(sourceFile, node, oldText, newText) {
    return new ReplaceChange(sourceFile.fileName, node.getStart(sourceFile), oldText, newText);
}
function createRemoveChange(sourceFile, node, from = node.getStart(sourceFile), to = node.getEnd()) {
    return new RemoveChange(sourceFile.fileName, from, to);
}
function createChangeRecorder(tree, path, changes) {
    const recorder = tree.beginUpdate(path);
    for (const change of changes) {
        if (change instanceof InsertChange) {
            recorder.insertLeft(change.pos, change.toAdd);
        }
        else if (change instanceof RemoveChange) {
            recorder.remove(change.pos, change.end - change.pos);
        }
        else if (change instanceof ReplaceChange) {
            recorder.remove(change.pos, change.oldText.length);
            recorder.insertLeft(change.pos, change.newText);
        }
    }
    return recorder;
}
function commitChanges(tree, path, changes) {
    if (changes.length === 0) {
        return false;
    }
    const recorder = createChangeRecorder(tree, path, changes);
    tree.commitUpdate(recorder);
    return true;
}
//# sourceMappingURL=change.js.map