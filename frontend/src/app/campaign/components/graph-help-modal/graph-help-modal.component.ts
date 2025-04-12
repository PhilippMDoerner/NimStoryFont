import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toGroupLabel } from 'src/app/_models/graph';
import { ButtonComponent } from 'src/app/design/atoms/button/button.component';
import { IconComponent } from 'src/app/design/atoms/icon/icon.component';
import { SeparatorComponent } from 'src/app/design/atoms/separator/separator.component';

const GRAPH_INFO_RULES = [
  {
    nodeKind1: 'Organization',
    nodeKind2: 'Location',
    groupLabel: toGroupLabel('organizationHeadquarters'),
    description: "The location contains that organization's headquarter",
  },
  {
    nodeKind1: 'Organization',
    nodeKind2: 'Character',
    groupLabel: toGroupLabel('organizationMemberships'),
    description: 'The character is a member of that organization',
  },
  {
    nodeKind1: 'Location',
    nodeKind2: 'Location',
    groupLabel: toGroupLabel('sublocation'),
    description: 'The location is part of the other location',
  },
  {
    nodeKind1: 'Location',
    nodeKind2: 'Character',
    groupLabel: toGroupLabel('characterLocation'),
    description: 'The character is in that location',
  },
  {
    nodeKind1: 'Character',
    nodeKind2: 'Item',
    groupLabel: toGroupLabel('itemOwnership'),
    description: 'The character owns that item',
  },
  {
    nodeKind1: 'Organization',
    nodeKind2: 'Organization',
    groupLabel: toGroupLabel('suborganization'),
    description:
      'The organization is a smaller group within the other organization',
  },
  {
    nodeKind1: 'Any',
    nodeKind2: 'Any',
    groupLabel: undefined,
    description: 'A custom relationship between 2 articles',
  },
];

const GRAPH_INTERACTIONS = [
  {
    event: 'Hovering a node',
    description: 'Node changes color',
  },
  {
    event: 'Left-click node',
    description: 'Node gets selected for creating a custom connection',
  },
  {
    event: 'Right-click node',
    description: 'Open a context menu with information about the node',
  },
  {
    event: 'Hovering a link (clicking a link on mobile)',
    description: 'Link expand and shows label',
  },
  {
    event: 'Right-click link',
    description:
      'Open a context menu with possible actions for the link (some may be disabled for specific kinds of links)',
  },
  {
    event: 'Click on graph background',
    description:
      'Reset node selection, close context menus and reset any links that might have changed',
  },
];

@Component({
  selector: 'app-graph-help-modal',
  imports: [IconComponent, SeparatorComponent, ButtonComponent],
  templateUrl: './graph-help-modal.component.html',
  styleUrl: './graph-help-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphHelpModalComponent {
  modalService = inject(NgbModal);

  infoRules = GRAPH_INFO_RULES;
  infoInteractions = GRAPH_INTERACTIONS;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      modalDialogClass: 'border border-info border-3 rounded mymodal',
    });
  }
}
