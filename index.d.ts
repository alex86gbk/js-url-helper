declare class UrlHelper {
    static _init(location: Location): void
    static _isEmptyObject(obj: any): boolean
    static _getParam(params: Array<string>): object
    static _setParam(obj: {}): string
    constructor(location?: Location | string)
    getSearchParam(location: Location | string): object
    getHashParam(location: Location | string): object
    setSearchParam(param: object): string
    setHashParam(param: object): string
    link(param: UrlParam): string
    jump(param: UrlParam): void
}

/** 获取 search 参数 */
declare function getSearchParam(location: Location | string): object