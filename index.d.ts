export interface UrlHelperParam {
    path?: string;
    search?: object | string;
    hash?: object | string;
}
export default class UrlHelper {
    static _init(location?: Location | string): void;
    static _isEmptyObject(obj: any): boolean;
    static _getParam(params: string[]): object;
    static _setParam(obj: object): string;
    constructor(location?: Location | string);
    getSearchParam(location?: Location | string): object;
    getHashParam(location?: Location | string): object;
    setSearchParam(param: object): string;
    setHashParam(param: object): string;
    link(param: UrlHelperParam): string;
    jump(param: UrlHelperParam): void;
}
