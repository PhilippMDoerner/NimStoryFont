import { Icon } from 'src/app/design/atoms/_models/icon';
import { capitalize } from 'src/utils/string';

export interface NodeLinkTypeRaw {
  name: string;
  icon?: string;
  color: string;
  weight: number;
  campaign_id: number;
}

export interface NodeLinkType {
  id: number;
  name: string;
  icon?: string;
  color: string;
  weight: number;
  campaign_id: number;
}

export interface NodeLinkRaw {
  sourceGuid: string;
  targetGuid: string;
  label: string;
  weight: number;
  campaign_id: number;
  link_type_id: number;
}

export interface ArticleNode extends d3.SimulationNodeDatum {
  record: { article_type: ArticleNodeKind; name: string } & Record<
    string,
    string | number | boolean | null
  >;
  guid: string;
}

export const NORMAL_LINK_KIND = [
  'organizationMembership',
  'itemOwnership',
  'characterLocation',
  'sublocation',
  'organizationHeadquarter',
  'suborganization',
] as const;

export const NORMAL_LINK_KIND_SET = new Set<string>(NORMAL_LINK_KIND);

export type LinkKind = (typeof NORMAL_LINK_KIND)[number] | string;

export function toGroupLabel(kind: LinkKind): string {
  switch (kind) {
    case 'organizationMembership':
      return 'Organization Memberships';
    case 'itemOwnership':
      return 'Item Ownerships';
    case 'characterLocation':
      return 'Character Locations';
    case 'sublocation':
      return 'Sublocations';
    case 'organizationHeadquarter':
      return 'Organization Headquarters';
    case 'suborganization':
      return 'Subgroup';
    default:
      return capitalize(kind);
  }
}

export interface NodeLink extends d3.SimulationLinkDatum<ArticleNode> {
  id?: number; //Available if linkKind === 'custom'
  label: string;
  weight: number;
  color: string;
  icon: Icon | null;
  linkKind: LinkKind;
}

export interface LinkGroup {
  name: string;
  links: NodeLink[];
}

export interface NodeMap {
  nodes: ArticleNode[];
  links: LinkGroup[];
}

export interface ParsedNodeMap {
  nodes: ArticleNode[];
  linkGroups: LinkGroup[];
  links: NodeLink[];
}

export type NodeSelection = [] | [ArticleNode] | [ArticleNode, ArticleNode];

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const ARTICLE_NODE_KINDS = [
  'LOCATION',
  'CHARACTER',
  'ORGANIZATION',
  'ITEM',
] as const;
export type ArticleNodeKind = (typeof ARTICLE_NODE_KINDS)[number];

export const NODE_COLOR_MAP: { [key in ArticleNodeKind]: string } = {
  CHARACTER: 'var(--character-color)',
  LOCATION: 'var(--location-color)',
  ORGANIZATION: 'var(--organization-color)',
  ITEM: 'var(--item-color)',
};

export function toLinkLabel(link: NodeLink): string {
  return `${(link.source as ArticleNode).record.name} ${link.label} ${(link.target as ArticleNode).record.name}`;
}

export const DEFAULT_LINK_CATEGORY_COLOR = '#999999';
