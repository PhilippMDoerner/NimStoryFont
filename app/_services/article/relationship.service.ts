import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ArticleNode,
  LinkGroup,
  NodeLink,
  NodeLinkRaw,
  NodeMap,
} from 'src/app/_models/graph';
import { OverviewItem } from 'src/app/_models/overview';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root',
})
export class RelationshipService extends BaseService<NodeLinkRaw, NodeLink> {
  constructor(http: HttpClient) {
    super(http, 'relationship');
  }

  getNodeMap(campaign: string): Observable<NodeMap> {
    return this.http
      .get<{
        nodes: ArticleNode[];
        links: LinkGroup[];
      }>(`${this.apiUrl}/nodeMap/${campaign}/`)
      .pipe(map((resp) => this.parseNodeMap(resp)));
  }

  private parseNodeMap(nodeMap: {
    nodes: ArticleNode[];
    links: LinkGroup[];
  }): NodeMap {
    const nodes = nodeMap.nodes;
    const linkGroups: LinkGroup[] = nodeMap.links.map((linkGroup) =>
      this.parseLinkGroup(linkGroup, nodes),
    );

    return {
      nodes,
      links: linkGroups,
    };
  }

  parseLinkGroup(linkGroup: LinkGroup, nodes: ArticleNode[]): LinkGroup {
    const links = linkGroup.links
      .map((link) => this.parseLink(link, nodes))
      .filter((x) => x != null);

    return {
      links: links,
      name: linkGroup.name,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseLink(link: any, nodes: ArticleNode[]): NodeLink | undefined {
    const sourceNode = nodes.find((node) => node.guid === link.sourceGuid);
    const targetNode = nodes.find((node) => node.guid === link.targetGuid);
    if (!sourceNode || !targetNode) return undefined;
    return {
      source: sourceNode,
      target: targetNode,
      label: link.label,
      weight: link.weight,
      linkKind: link['linkKind'],
      id: link.id,
      color: link.color,
      icon: link.icon,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override parseEntity(data: any): NodeLink {
    return data;
  }

  override parseOverviewEntity(): OverviewItem {
    throw new Error('NodeLinks do not have an overview');
  }

  override campaignList(): Observable<OverviewItem[]> {
    throw new Error('NodeLinks do not have an overview');
  }

  override campaignDetailList(): Observable<NodeLink[]> {
    throw new Error('NodeLinks do not have an overview');
  }
}
