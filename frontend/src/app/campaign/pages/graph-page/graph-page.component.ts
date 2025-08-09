import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  Signal,
  signal,
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal,
} from '@angular/core/rxjs-interop';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  combineLatestWith,
  filter,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  Subject,
  take,
  withLatestFrom,
} from 'rxjs';
import {
  ArticleNode,
  DEFAULT_LINK_CATEGORY_COLOR,
  LinkGroup,
  LinkKind,
  NodeLink,
  NodeLinkRaw,
  NodeLinkType,
  NodeMap,
  ParsedNodeMap,
  toGroupLabel,
} from 'src/app/_models/graph';
import { ARTICLE_COLORS, ARTICLE_ICONS } from 'src/app/_models/overview';
import { FormlyService } from 'src/app/_services/formly/formly-service.service';
import { RoutingService } from 'src/app/_services/routing.service';
import { CardComponent } from 'src/app/design//atoms/card/card.component';
import { InfoCircleTooltipComponent } from 'src/app/design//atoms/info-circle-tooltip/info-circle-tooltip.component';
import { PlaceholderComponent } from 'src/app/design//atoms/placeholder/placeholder.component';
import { ArticleFooterComponent } from 'src/app/design//molecules/article-footer/article-footer.component';
import { CollapsiblePanelComponent } from 'src/app/design//molecules/collapsible-panel/collapsible-panel.component';
import { ConfirmationToggleButtonComponent } from 'src/app/design//molecules/confirmation-toggle-button/confirmation-toggle-button.component';
import { FormComponent } from 'src/app/design//molecules/form/form.component';
import { SearchFieldComponent } from 'src/app/design//molecules/search-field/search-field.component';
import { GraphComponent } from 'src/app/design//organisms/graph/graph.component';
import { PageContainerComponent } from 'src/app/design//organisms/page-container/page-container.component';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { NODE_TYPE_OPTIONS } from 'src/app/design/molecules/_models/search-preferences';
import { Toggle } from 'src/app/design/molecules/_models/toggle';
import { ToggleRowComponent } from 'src/app/design/molecules/toggle-row/toggle-row.component';
import { GRAPH_SETTINGS } from 'src/app/design/organisms/_model/graph';
import { GraphMenuService } from 'src/app/design/organisms/graph/graph-menu.service';
import { GraphService } from 'src/app/design/organisms/graph/graph.service';
import { GlobalStore } from 'src/app/global.store';
import { sortAlphabetically } from 'src/utils/array';
import { filterNil } from 'src/utils/rxjs-operators';
import { capitalize } from 'src/utils/string';
import { GraphHelpModalComponent } from '../../components/graph-help-modal/graph-help-modal.component';
import { GraphSettingsModalComponent } from '../../components/graph-settings-modal/graph-settings-modal.component';
import { GraphPageStore } from './graph-page.store';

@Component({
  selector: 'app-graph-page',
  imports: [
    PageContainerComponent,
    GraphComponent,
    ArticleFooterComponent,
    ButtonComponent,
    NgbTooltip,
    NgTemplateOutlet,
    FormComponent,
    CardComponent,
    CollapsiblePanelComponent,
    ConfirmationToggleButtonComponent,
    SearchFieldComponent,
    GraphHelpModalComponent,
    GraphSettingsModalComponent,
    PlaceholderComponent,
    AsyncPipe,
    InfoCircleTooltipComponent,
    ToggleRowComponent,
  ],
  templateUrl: './graph-page.component.html',
  styleUrl: './graph-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GraphMenuService, GraphService],
})
export class GraphPageComponent {
  EMPTY_LABEL = '<label>';
  globalStore = inject(GlobalStore);
  store = inject(GraphPageStore);
  routingService = inject(RoutingService);
  formlyService = inject(FormlyService);
  graphService = inject(GraphService);
  graphMenuService = inject(GraphMenuService);

  selectedNodes = toSignal(this.graphService.nodeSelectionChanged$);
  firstSelectedNode = computed(() => this.selectedNodes()?.[0]);
  secondSelectedNode = computed(() => this.selectedNodes()?.[1]);
  nodeQuery$ = new Subject<string>();
  graphData = computed<ParsedNodeMap | undefined>(() => {
    return this.filterGraphData(
      this.store.graph(),
      this.activeNodeCategories(),
      this.activeLinkCategories(),
    );
  });
  graphData$ = toObservable(this.graphData);
  customLinkTypes$ = toObservable(this.store.customLinkTypes);
  searchedNode$ = this.nodeQuery$.pipe(
    withLatestFrom(this.graphData$.pipe(map((graphData) => graphData?.nodes))),
    filter(([query, nodes]) => query.length >= 3 && !!nodes),
    map(([query, nodes]) =>
      (nodes as ArticleNode[]).find((node) =>
        node.record.name.toLowerCase().includes(query.toLowerCase()),
      ),
    ),
    shareReplay(1),
  );
  graphSettings = signal(GRAPH_SETTINGS);

  pageState = signal<'DISPLAY' | 'CREATE'>('DISPLAY');
  isPanelOpen = signal<boolean>(false);

  formlyFields = computed<FormlyFieldConfig[]>(() => [
    this.formlyService.buildInputConfig<NodeLinkRaw>({
      inputKind: 'NAME',
      key: 'label',
    }),
    this.formlyService.buildInputConfig<NodeLinkRaw>({
      inputKind: 'NUMBER',
      key: 'weight',
      required: false,
    }),
    this.formlyService.buildOverviewSelectConfig<NodeLinkRaw, NodeLinkType>({
      label: 'Link Type',
      key: 'link_type_id',
      options$: this.customLinkTypes$ as unknown as Observable<NodeLinkType[]>,
      labelProp: 'name',
      valueProp: 'id',
    }),
  ]);
  userModel = signal<Partial<NodeLinkRaw>>({});
  createLabel = signal<string>(this.EMPTY_LABEL);
  formTitle = computed(
    () =>
      `${this.firstSelectedNode()?.record.name} ${this.createLabel()} ${this.secondSelectedNode()?.record.name}`,
  );

  homeUrl = computed(() =>
    this.routingService.getRoutePath('home', {
      campaign: this.globalStore.campaignName(),
    }),
  );

  private readonly isPageLoading: Observable<boolean> | Signal<boolean> =
    computed(() => this.graphData() == null);

  private activeNodeCategories = signal(
    new Set<string>(NODE_TYPE_OPTIONS.map((option) => option.value)),
  );
  nodeToggles = computed<Toggle<(typeof NODE_TYPE_OPTIONS)[number]['value']>[]>(
    () =>
      NODE_TYPE_OPTIONS.map((option) => ({
        value: option.value,
        active: this.activeNodeCategories().has(option.value),
        color:
          ARTICLE_COLORS[
            option.value.toUpperCase() as Uppercase<
              (typeof NODE_TYPE_OPTIONS)[number]['value']
            >
          ],
        text: option.label,
        icon: ARTICLE_ICONS[
          option.value.toUpperCase() as Uppercase<
            (typeof NODE_TYPE_OPTIONS)[number]['value']
          >
        ],
      })),
  );

  private linkToggles = computed<Toggle<LinkGroup>[] | undefined>(() => {
    return this.store.graph()?.links.map((linkGroup) => {
      const firstLink: NodeLink | undefined = linkGroup.links[0];
      return {
        active: false,
        color: firstLink?.color ?? DEFAULT_LINK_CATEGORY_COLOR,
        value: linkGroup,
        icon: firstLink.icon ?? undefined,
        text: toGroupLabel(linkGroup.name),
      };
    });
  });
  private activeLinkCategories$ = new ReplaySubject<Set<LinkKind>>(1);
  private activeLinkCategories = toSignal(this.activeLinkCategories$);
  linkCategories$: Observable<Toggle<LinkGroup>[] | undefined> =
    this.activeLinkCategories$.pipe(
      map((activeLinkCategories) => {
        const linkTypeOptions = this.linkToggles();
        if (!linkTypeOptions) return undefined;

        return linkTypeOptions
          .map((option) => ({
            ...option,
            active: activeLinkCategories.has(option.value.name),
          }))
          .sort((a, b) => sortAlphabetically(a.text, b.text));
      }),
    );
  linkCategoryFallbackList = Array(6).fill(0); // Any nodemap is guaranteed to have at least 6 entries
  private createLinkState$ = toObservable(this.store.createLinkState);
  private destructor = inject(DestroyRef);

  constructor() {
    this.globalStore.trackIsPageLoading(this.isPageLoading);

    this.searchedNode$
      .pipe(takeUntilDestroyed())
      .subscribe((node) => this.graphService.centerNodeEvents$.next(node));

    this.graphMenuService.linkDeleteEvents$
      .pipe(
        map((event) => event.clickedLink?.id),
        filterNil(),
        takeUntilDestroyed(),
      )
      .subscribe((linkIdToDelete) => this.onDeleteLink(linkIdToDelete));

    toObservable(this.store.graph)
      .pipe(
        takeUntilDestroyed(),
        filterNil(),
        map((data) => data.links.map((linkGroup) => linkGroup.name)),
      )
      .subscribe((linkCategoryNames) =>
        this.activeLinkCategories$.next(new Set(linkCategoryNames)),
      );
  }

  toggleNodeCategory(
    option: Toggle<(typeof NODE_TYPE_OPTIONS)[number]['value']>,
  ) {
    const newActiveEntries = new Set(this.activeNodeCategories());
    switch (option.active) {
      case false:
        newActiveEntries.delete(option.value);
        break;
      case true:
        newActiveEntries.add(option.value);
        break;
    }
    this.activeNodeCategories.set(newActiveEntries);
  }

  toggleLinkCategory(
    option: Toggle<LinkGroup>,
    linkCategories: Toggle<LinkGroup>[],
  ) {
    const newActiveEntries = new Set(
      linkCategories.filter((cat) => cat.active).map((cat) => cat.value.name),
    );
    switch (option.active) {
      case false:
        newActiveEntries.delete(option.value.name);
        break;
      case true:
        newActiveEntries.add(option.value.name);
        break;
    }
    this.activeLinkCategories$.next(newActiveEntries);
  }

  onCreateConnection(formData: Partial<NodeLinkRaw>) {
    const selectedNodes = this.selectedNodes();
    const has2NodesSelected = selectedNodes?.length === 2;
    if (!has2NodesSelected) return;

    const rawLink: NodeLinkRaw = {
      ...formData,
      campaign_id: this.globalStore.currentCampaign()?.pk,
      sourceGuid: selectedNodes[0].guid,
      targetGuid: selectedNodes[1].guid,
    } as NodeLinkRaw;
    this.store.createConnection(rawLink);

    this.createLinkState$
      .pipe(
        filter((val) => val === 'success' || val === 'error'),
        combineLatestWith(this.graphService.elements$),
        takeUntilDestroyed(this.destructor),
        take(1),
      )
      .subscribe(() => {
        this.graphService.nodeSelectionChanged$.next([]);
        this.pageState.set('DISPLAY');
        this.graphService.centerNodeEvents$.next(selectedNodes[0]);
      });
  }

  onDeleteLink(linkId: number) {
    this.store.deleteConnection(linkId);
  }

  onSettingsChange(newSettings: typeof GRAPH_SETTINGS) {
    this.graphSettings.set(newSettings);
  }

  private filterGraphData(
    graphData: NodeMap | undefined,
    activeNodeCategories: Set<string>,
    activeLinkCategories: Set<string> | undefined,
  ): ParsedNodeMap | undefined {
    const filteredNodes = this.filterNodes(
      graphData?.nodes,
      activeNodeCategories,
    );
    const filteredGroups = this.filterLinkGroups(
      graphData?.links,
      activeLinkCategories,
    );
    const links = filteredGroups?.flatMap((group) => group.links);

    const nodeSet = new Set(filteredNodes?.map((node) => node.guid));
    const filteredLinks = links?.filter((link) => {
      const sourceGuid = (link.source as ArticleNode).guid;
      const targetGuid = (link.target as ArticleNode).guid;
      return nodeSet.has(sourceGuid) && nodeSet.has(targetGuid);
    });

    return {
      links: filteredLinks ?? [],
      nodes: filteredNodes ?? [],
      linkGroups: filteredGroups ?? [],
    };
  }

  private filterNodes(
    nodes: ArticleNode[] | undefined,
    activeNodeCategories: Set<string> | undefined,
  ) {
    if (!nodes) return undefined;

    const hasNodeFilter = activeNodeCategories && activeNodeCategories.size > 0;
    if (!hasNodeFilter) return nodes;

    return nodes.filter((node) =>
      activeNodeCategories.has(
        capitalize(node.record.article_type.toLowerCase()),
      ),
    );
  }

  private filterLinkGroups(
    linkGroups: LinkGroup[] | undefined,
    activeLinkCategories: Set<string> | undefined,
  ) {
    if (!linkGroups) return undefined;
    const hasLinkGroupFilter =
      activeLinkCategories && activeLinkCategories.size > 0;

    if (!hasLinkGroupFilter) return linkGroups;

    return linkGroups.filter((group) => activeLinkCategories.has(group.name));
  }
}
