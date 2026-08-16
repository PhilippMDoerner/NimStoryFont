export class ExtendedIterable<T> implements Iterable<T> {
	concat(secondIterable: Iterable<T>): ExtendedIterable<T>;
	new(sourceArray: Iterable<T>): ExtendedIterable<T>;
	map<U>(callback: (entry: T, index: number) => U): ExtendedIterable<U>
	flatMap<U>(callback: (entry: T, index: number) => U[]): ExtendedIterable<U>
	slice(start: number, end: number): ExtendedIterable<T>
	filter(callback: (entry: T, index: number) => any): ExtendedIterable<T>
	[Symbol.iterator]() : Iterator<T>
	forEach(callback: (entry: T, index: number) => any): void
	mapError<U>(callback: (error: Error) => U): ExtendedIterable<U>
	onDone?: Function
	asArray: T[]
}
