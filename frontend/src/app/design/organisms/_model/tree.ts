import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { TreeNode } from '../tree/tree.component';

export class SingleNodeSource extends DataSource<TreeNode> {
  constructor(public root: TreeNode) {
    super();
  }

  override connect(): Observable<readonly TreeNode[]> {
    return of([this.root]);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  override disconnect(): void {}
}
