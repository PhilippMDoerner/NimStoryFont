import { ArticleNode, NodeLink } from 'src/app/_models/graph';

export const SELECTORS = {
  nodeClass: 'node',
  nodeSelector: '.node',
  linkClass: 'link',
  linkSelector: 'line.link',
  activeLinkClass: 'link--active',
  activeLinkSelector: 'g.link--active',
  linkLabelClass: 'link-label',
  linkLabelSelector: 'text.link-label',
  linkGroupSelector: 'g.link',
  linkIconClass: 'link-icon',
  linkIconSelector: 'foreignObject.link-icon',
  activeClass: `node--active`,
  activeSelector: `g.node.node--active`,
  graphId: 'graph',
  graphSelector: `#graph`,
  nodeMenuId: 'context-menu',
  nodeMenuSelector: `#context-menu`,
  nodeMenuCloseBtnId: 'context-menu-close',
  nodeMenuCloseBtnSelector: '#context-menu-close',
  linkMenuId: 'link-context-menu',
  linkMenuSelector: `#link-context-menu`,
  deleteLinkId: 'delete-link',
  deleteLinkSelector: '#delete-link',
};

export const GRAPH_SETTINGS = {
  width: 1080,
  minZoom: 0.5,
  maxZoom: 12,
  minHeight: 300,
  linkAttractingForce: 0.5,
  nodeRepellingForce: 50,
  undirectedForce: 0.025,
  circleSize: 6,
  xForce: 1,
  yForce: 1,
  centeringTransitionTime: 1000,
  hoverTransitionTime: 200,
  strokeWidth: 0.5,
  iconSize: 10,
};

export interface NodeClickEvent {
  event: MouseEvent;
  clickedNode: ArticleNode | undefined;
}
export interface LinkClickEvent {
  event: MouseEvent;
  clickedLink: NodeLink | undefined;
}
