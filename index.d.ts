export interface UrlHelperParam {
    path?: string;
    search?: object | string;
    hash?: object | string;
}
export default class UrlHelper {
    static _init(location?: Location | string): void;
    static _isEmptyObject(obj: any): boolean;
    static _getParam(params: string[]): any;
    static _setParam(obj: Object): string;
    constructor(location?: Location | string);
    getSearchParam(location?: Location | string): any;
    getHashParam(location?: Location | string): any;
    setSearchParam(param: any): string;
    setHashParam(param: any): string;
    link(param: UrlHelperParam): string;
    jump(param: UrlHelperParam): void;
}
