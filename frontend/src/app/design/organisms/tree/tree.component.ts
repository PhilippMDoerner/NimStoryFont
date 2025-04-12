import { DataSource } from '@angular/cdk/collections';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  Pipe,
  PipeTransform,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../atoms/button/button.component';

export interface TreeNode {
  children?: TreeNode[] | undefined;
  label: string;
  link: string;
  id: number | string;
  isRootNode: boolean;
  level: number;
}

@Pipe({
  name: 'treeNodeCount',
})
export class TreeNodeCountPipe implements PipeTransform {
  transform(node: TreeNode): string {
    const nodeCount = this.countDescendants(node) - 1;
    switch (nodeCount) {
      case 0:
        return '';
      case 1:
        return '1 item';
      default:
        return `${nodeCount} items`;
    }
  }

  private countDescendants(node: TreeNode): number {
    const descendantCount =
      node.children?.reduce(
        (acc, child) => acc + this.countDescendants(child),
        0,
      ) ?? 0;
    const thisNode = 1;

    return descendantCount + thisNode;
  }
}

@Component({
  selector: 'app-tree',
  imports: [
    CdkTreeModule,
    RouterLink,
    NgClass,
    NgTemplateOutlet,
    ButtonComponent,
    TreeNodeCountPipe,
  ],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'container',
  },
})
export class TreeComponent implements AfterViewInit {
  data = input.required<DataSource<TreeNode>>();
  expandOnInit = input<boolean>(false);

  tree = viewChild.required<CdkTree<TreeNode>>('tree');

  public router = inject(Router);

  ngAfterViewInit(): void {
    if (this.expandOnInit()) {
      this.tree().expandAll();
    }
  }

  childrenAccessor = (dataNode: TreeNode) => dataNode.children ?? [];

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  trackByFn = (_: number, node: TreeNode) => node.id;
}
