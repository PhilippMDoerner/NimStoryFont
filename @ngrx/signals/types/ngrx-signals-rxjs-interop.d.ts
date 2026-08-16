import { Injector } from '@angular/core';
import { Observable } from 'rxjs';

type RxMethodRef = {
    destroy: () => void;
};
type RxMethod<Input> = ((input: Input | (() => Input) | Observable<Input>, config?: {
    injector?: Injector;
}) => RxMethodRef) & RxMethodRef;
/**
 * @description
 *
 * Creates a reactive method for managing side effects by utilizing RxJS APIs.
 * The method accepts an observable, a signal, a computation function, or
 * a static value.
 *
 * @usageNotes
 *
 * ```ts
 * import { Component, inject, signal } from '@angular/core';
 * import { switchMap } from 'rxjs';
 * import { rxMethod } from '@ngrx/signals/rxjs-interop';
 * import { tapResponse } from '@ngrx/operators';
 *
 * \@Component(...)
 * export class TodoList {
 *   readonly #todosService = inject(TodosService);
 *   readonly userId = signal(1);
 *   readonly todos = signal<Todo[]>([]);
 *
 *   readonly loadTodos = rxMethod<number>(
 *     switchMap((id) =>
 *       this.#todosService.getByUserId(id).pipe(
 *         tapResponse({
 *           next: (todos) => this.todos.set(todos),
 *           error: console.error,
 *         })
 *       )
 *     )
 *   );
 *
 *   constructor() {
 *     // 👇 Load todos on `userId` changes.
 *     this.loadTodos(this.userId);
 *   }
 * }
 * ```
 */
declare function rxMethod<Input>(generator: (source$: Observable<Input>) => Observable<unknown>, config?: {
    injector?: Injector;
}): RxMethod<Input>;

export { rxMethod };
export type { RxMethod };
