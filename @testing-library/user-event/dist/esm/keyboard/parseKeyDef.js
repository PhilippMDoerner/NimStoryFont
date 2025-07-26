import '../utils/dataTransfer/Clipboard.js';
import { readNextDescriptor } from '../utils/keyDef/readNextDescriptor.js';

/**
 * Parse key definitions per `keyboardMap`
 *
 * Keys can be referenced by `{key}` or `{special}` as well as physical locations per `[code]`.
 * Everything else will be interpreted as a typed character - e.g. `a`.
 * Brackets `{` and `[` can be escaped by doubling - e.g. `foo[[bar` translates to `foo[bar`.
 * Keeping the key pressed can be written as `{key>}`.
 * When keeping the key pressed you can choose how long (how many keydown and keypress) the key is pressed `{key>3}`.
 * You can then release the key per `{key>3/}` or keep it pressed and continue with the next key.
 */ function parseKeyDef(keyboardMap, text) {
    const defs = [];
    do {
        const { type, descriptor, consumedLength, releasePrevious, releaseSelf = true, repeat } = readNextDescriptor(text, 'keyboard');
        var _keyboardMap_find;
        const keyDef = (_keyboardMap_find = keyboardMap.find((def)=>{
            if (type === '[') {
                var _def_code;
                return ((_def_code = def.code) === null || _def_code === undefined ? undefined : _def_code.toLowerCase()) === descriptor.toLowerCase();
            } else if (type === '{') {
                var _def_key;
                return ((_def_key = def.key) === null || _def_key === undefined ? undefined : _def_key.toLowerCase()) === descriptor.toLowerCase();
            }
            return def.key === descriptor;
        })) !== null && _keyboardMap_find !== undefined ? _keyboardMap_find : {
            key: 'Unknown',
            code: 'Unknown',
            [type === '[' ? 'code' : 'key']: descriptor
        };
        defs.push({
            keyDef,
            releasePrevious,
            releaseSelf,
            repeat
        });
        text = text.slice(consumedLength);
    }while (text)
    return defs;
}

export { parseKeyDef };
