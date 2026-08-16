import * as _t from '@babel/types';

const {
  addComment
} = _t;
const PURE_ANNOTATION = "#__PURE__";
const isPureAnnotated = ({
  leadingComments
}) => !!leadingComments && leadingComments.some(comment => /[@#]__PURE__/.test(comment.value));
function annotateAsPure(pathOrNode) {
  const node = pathOrNode.node || pathOrNode;
  if (isPureAnnotated(node)) {
    return;
  }
  addComment(node, "leading", PURE_ANNOTATION);
}

export { annotateAsPure as default };
//# sourceMappingURL=index.js.map
