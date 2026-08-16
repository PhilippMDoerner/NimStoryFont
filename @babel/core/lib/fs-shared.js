import fs from 'node:fs';
import gensync from 'gensync';

const readFile = gensync({
  sync: fs.readFileSync,
  errback: fs.readFile
});
const stat = gensync({
  sync: fs.statSync,
  errback: fs.stat
});

export { readFile, stat };
//# sourceMappingURL=fs-shared.js.map
