import { inject, Injectable, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { select, selectAll, Selection } from 'd3';
import { filter, Subject, take } from 'rxjs';
import { ArticleNode, ArticleNodeKind, NodeLink } from 'src/app/_models/graph';
import { ArticleService } from 'src/app/_services/article/article.service';
import { ellipsize } from 'src/utils/string';
import { LinkClickEvent, SELECTORS } from '../_model/graph';
import { SIDEBAR_ENTRIES } from '../_model/sidebar';

export type NodeMenuData = {
  title: string | undefined;
  description: string | undefined;
  link: string | undefined;
  kind: ArticleNodeKind | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Record<string, any>;

export interface NodeMenuClickEvent {
  event: MouseEvent;
  nodeMenuData: NodeMenuData | undefined;
}

export type GraphElement = Selection<SVGSVGElement, undefined, null, undefined>;
const INTERACTABLE_ELEMENT_SELECTORS = [
  SELECTORS.nodeSelector,
  SELECTORS.linkSelector,
];

@Injectable()
export class GraphMenuService implements OnDestroy {
  articleService = inject(ArticleService);

  allGraphClickEvents$ = new Subject<MouseEvent>(); //All click events the graph registered

  private directGraphClickEvents$ = this.allGraphClickEvents$.pipe(
    filter((event) => {
      const clickTarget = event.target as Element;
      const isClickOnGraph = !INTERACTABLE_ELEMENT_SELECTORS.some(
        (selector) => !!clickTarget.closest(selector),
      );
      return isClickOnGraph;
    }),
  );
  private nodeMenuElementCreatedEvent$ = new Subject<void>();
  private linkMenuElementCreatedEvent$ = new Subject<void>();
  private nodeMenuClickEvents$ = new Subject<NodeMenuClickEvent>();
  private linkMenuClickEvents$ = new Subject<LinkClickEvent>();

  linkDeleteEvents$ = this.linkMenuClickEvents$.pipe(
    filter((event) => {
      const clickTarget = event.event.target as Element;
      const isClickOnDeleteOption = !!clickTarget.closest(
        SELECTORS.deleteLinkSelector,
      );
      return isClickOnDeleteOption;
    }),
  );
  constructor() {
    this.initListeningToMenuClicks();
    this.initCloseBtnClickBehavior();
    this.directGraphClickEvents$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.closeLinkMenu();
      this.closeNodeMenu();
    });
    this.linkDeleteEvents$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.closeLinkMenu());
  }

  private initCloseBtnClickBehavior() {
    this.nodeMenuClickEvents$
      .pipe(
        filter((event) => {
          const clickTarget = event.event.target as Element;
          const isClickOnCloseBtn = clickTarget.closest(
            SELECTORS.nodeMenuCloseBtnSelector,
          );
          if (!isClickOnCloseBtn) return false;

          const isBtnDisabled = clickTarget.hasAttribute('disabled');
          return !isBtnDisabled;
        }),
      )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.closeNodeMenu());
  }

  private initListeningToMenuClicks() {
    this.nodeMenuElementCreatedEvent$
      .pipe(take(1), takeUntilDestroyed())
      .subscribe(() =>
        select<HTMLDivElement, NodeMenuData>(SELECTORS.nodeMenuSelector).on(
          'click',
          (event: MouseEvent, data) =>
            this.nodeMenuClickEvents$.next({
              event,
              nodeMenuData: data,
            }),
        ),
      );

    this.linkMenuElementCreatedEvent$
      .pipe(take(1), takeUntilDestroyed())
      .subscribe(() =>
        select<HTMLDivElement, NodeLink>(SELECTORS.linkMenuSelector).on(
          'click',
          (event: MouseEvent, data) => {
            this.linkMenuClickEvents$.next({ clickedLink: data, event });
          },
        ),
      );
  }

  showLinkContextMenu(event: MouseEvent, link: NodeLink) {
    selectAll(SELECTORS.linkMenuSelector)
      .data([link])
      .enter()
      .append('div')
      .attr('class', 'border border-secondary my-body rounded text-dark')
      .attr('id', SELECTORS.linkMenuId);

    const position = this.getMenuPosition(event);
    selectAll(SELECTORS.linkMenuSelector)
      .style('left', `${position.x}px`)
      .style('top', `${position.y}px`)
      .style('width', '300px')
      .style('overflow', 'auto')
      .style('position', 'absolute')
      .style('display', 'block')
      .html(this.linkContextMenuHTML(link));
    this.closeLinkMenu();
    this.openLinkMenu();

    this.linkMenuElementCreatedEvent$.next();
  }

  showNodeContextMenu(event: MouseEvent, data: NodeMenuData) {
    // create the div element that will hold the context menu
    selectAll(SELECTORS.nodeMenuSelector)
      .data([data])
      .enter()
      .append('div')
      .attr(
        'class',
        'bg-secondary-subtle p-3 border border-info my-body rounded text-dark w-50 h-25',
      )
      .attr('id', SELECTORS.nodeMenuId);

    const position = this.getMenuPosition(event);
    select(SELECTORS.nodeMenuSelector)
      .style('left', `${position.x}px`)
      .style('top', `${position.y}px`)
      .style('min-width', '300px')
      .style('max-width', '600px')
      .style('min-height', '200px')
      .style('overflow', 'auto')
      .style('position', 'absolute')
      .style('display', 'block')
      .html(this.nodeContextMenuHTML(data));

    // Fills contextMenu
    this.closeNodeMenu();
    this.openNodeMenu();

    this.nodeMenuElementCreatedEvent$.next();
  }

  private nodeContextMenuHTML(data: NodeMenuData) {
    const iconClass = `fas fa-${this.toIconClass(data.kind)}`;

    return `
      <div class="d-flex flex-row justify-content-between"> 
        <a class="d-inline-block mb-2" href="${data.link}">
          <h2 class="fs-5 text-dark m-0"> ${data.title ?? 'Unknown'} <i class="${iconClass}"></i></h2>
        </a>
        <button class="border rounded" style="height: fit-content;" id="${SELECTORS.nodeMenuCloseBtnId}">
          <i class="fas fa-times"></i> 
        </button>
      </div>
      <div>${data.description ?? ''}</div>
    `;
  }

  private linkContextMenuHTML(link: NodeLink) {
    const isCustomLink = link.id != undefined;
    const linkLabel = `${(link.source as ArticleNode).record.name} -> ${(link.target as ArticleNode).record.name}`;
    const extraClasses = isCustomLink
      ? ''
      : 'disabled text-decoration-line-through';
    const menu = `
      <div class="list-group" id="link-context-menu">
        <button 
          id="${SELECTORS.deleteLinkId}"
          class="list-group-item list-group-item-action bg-danger ${extraClasses}" ${isCustomLink ? '' : 'disabled'} title="${linkLabel}"
        > 
          <i class="fas fa-trash"></i>
          Delete Link "${ellipsize(linkLabel, 15)}"
        </button>
      </div>
    `;

    return menu;
  }

  public toNodeMenuData(node: ArticleNode): NodeMenuData {
    return {
      title: node?.record.name,
      description: node?.record['description'] as string | undefined,
      link: this.articleService.generateUrlCallback(node?.record)(),
      kind: node?.record.article_type,
    };
  }

  private toIconClass(kind: ArticleNodeKind | undefined): string | undefined {
    if (!kind) return undefined;
    const entry = SIDEBAR_ENTRIES.find((entry) =>
      entry.article_types.includes(kind),
    );
    return entry ? entry.iconClass : undefined;
  }

  public closeNodeMenu() {
    select(SELECTORS.nodeMenuSelector).style('display', 'none');
  }

  public openNodeMenu() {
    select(SELECTORS.nodeMenuSelector).style('display', 'block');
  }

  public closeLinkMenu() {
    select(SELECTORS.linkMenuSelector).style('display', 'none');
  }

  public openLinkMenu() {
    select(SELECTORS.linkMenuSelector).style('display', 'block');
  }

  private getMenuPosition(event: MouseEvent): { x: number; y: number } {
    const halfScreenWidth = window.innerWidth / 2;
    const defaultX = event.pageX - 2;
    const isOverflowingX = defaultX + halfScreenWidth > window.innerWidth;
    const safeX = isOverflowingX
      ? window.innerWidth - halfScreenWidth
      : defaultX;

    const quarterScreenHeight = window.innerHeight / 4;
    const defaultY = event.pageY - 2;
    const isOverflowingY = defaultY + quarterScreenHeight > window.innerHeight;
    const safeY = isOverflowingY
      ? window.innerHeight - quarterScreenHeight
      : defaultY;

    return {
      x: safeX,
      y: safeY,
    };
  }

  ngOnDestroy(): void {
    select(SELECTORS.nodeMenuSelector).remove();
    select(SELECTORS.linkMenuSelector).remove();
  }
}
