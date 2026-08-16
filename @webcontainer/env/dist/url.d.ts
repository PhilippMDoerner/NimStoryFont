declare type FuntionsOnly<Base> = {
    [Key in keyof Base]: Base[Key] extends Function ? Key : never;
}[keyof Base];
declare type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
declare type WritableKeys<T> = {
    [P in keyof T]: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P, never>;
}[keyof T];
declare type UpdateableURLProperties = Pick<URL, WritableKeys<Omit<URL, FuntionsOnly<URL>>>>;
export declare class HostURL {
    private _url;
    private _port;
    static parse(url: string | URL): HostURL;
    get port(): string;
    get hash(): string;
    get host(): string;
    get hostname(): string;
    get href(): string;
    get origin(): string;
    get username(): string;
    get password(): string;
    get pathname(): string;
    get protocol(): string;
    get search(): string;
    get searchParams(): URLSearchParams;
    private constructor();
    update(change: Partial<UpdateableURLProperties>): this;
    private patchedURL;
    toString(): string;
    toJSON(): string;
}
export {};
