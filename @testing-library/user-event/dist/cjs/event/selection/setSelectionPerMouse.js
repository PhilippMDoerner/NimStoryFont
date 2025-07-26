'use strict';

var UI = require('../../document/UI.js');
require('../../utils/dataTransfer/Clipboard.js');
var selection = require('../../utils/focus/selection.js');
var resolveCaretPosition = require('./resolveCaretPosition.js');

function setSelectionPerMouseDown({ document, target, clickCount, node, offset }) {
    if (selection.hasNoSelection(target)) {
        return;
    }
    const targetHasOwnSelection = selection.hasOwnSelection(target);
    // On non-input elements the text selection per multiple click
    // can extend beyond the target boundaries.
    // The exact mechanism what is considered in the same line is unclear.
    // Looks it might be every inline element.
    // TODO: Check what might be considered part of the same line of text.
    const text = String(targetHasOwnSelection ? UI.getUIValue(target) : target.textContent);
    const [start, end] = node ? // which elements might be considered in the same line of text.
    // TODO: support expanding initial range on multiple clicks if node is given
    [
        offset,
        offset
    ] : getTextRange(text, offset, clickCount);
    // TODO: implement modifying selection per shift/ctrl+mouse
    if (targetHasOwnSelection) {
        UI.setUISelection(target, {
            anchorOffset: start !== null && start !== undefined ? start : text.length,
            focusOffset: end !== null && end !== undefined ? end : text.length
        });
        return {
            node: target,
            start: start !== null && start !== undefined ? start : 0,
            end: end !== null && end !== undefined ? end : text.length
        };
    } else {
        const { node: startNode, offset: startOffset } = resolveCaretPosition.resolveCaretPosition({
            target,
            node,
            offset: start
        });
        const { node: endNode, offset: endOffset } = resolveCaretPosition.resolveCaretPosition({
            target,
            node,
            offset: end
        });
        const range = target.ownerDocument.createRange();
        try {
            range.setStart(startNode, startOffset);
            range.setEnd(endNode, endOffset);
        } catch (e) {
            throw new Error('The given offset is out of bounds.');
        }
        const selection = document.getSelection();
        selection === null || selection === undefined ? undefined : selection.removeAllRanges();
        selection === null || selection === undefined ? undefined : selection.addRange(range.cloneRange());
        return range;
    }
}
function getTextRange(text, pos, clickCount) {
    if (clickCount % 3 === 1 || text.length === 0) {
        return [
            pos,
            pos
        ];
    }
    const textPos = pos !== null && pos !== undefined ? pos : text.length;
    if (clickCount % 3 === 2) {
        return [
            textPos - text.substr(0, pos).match(/(\w+|\s+|\W)?$/)[0].length,
            pos === undefined ? pos : pos + text.substr(pos).match(/^(\w+|\s+|\W)?/)[0].length
        ];
    }
    // triple click
    return [
        textPos - text.substr(0, pos).match(/[^\r\n]*$/)[0].length,
        pos === undefined ? pos : pos + text.substr(pos).match(/^[^\r\n]*/)[0].length
    ];
}

exports.setSelectionPerMouseDown = setSelectionPerMouseDown;
