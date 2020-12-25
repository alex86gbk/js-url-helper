export interface UrlHelperParam {
  path?: string;
  search?: object | string;
  hash?: object | string;
}

/**
 * Url辅助类
 * @param location {Location} 浏览器 location 对象
 * @author alex86gbk
 * @class
 */
export default class UrlHelper {  
  /**
   * @template
   * @private
   */
  static _init(location?: Location | string): void {
    if (!location) {
      location = window.location;
    }
    if (typeof location === 'string') {
      if (location.indexOf("?") > location.indexOf("#") && location.indexOf("#") > -1) {
        alert('URL参数格式异常！');
        console.error('URL参数格式异常！');
      }
    } else {
      if (location.href.indexOf("?") > location.href.indexOf("#") && location.href.indexOf("#") > -1) {
        alert('URL参数格式异常！');
        console.error('URL参数格式异常！');
      }
    }
  }

  /**
   * 判断是否空对象
   * @param obj
   * @return Boolean
   * @private
   */
  static _isEmptyObject(obj: any): boolean {
    for (let key in obj) {
      return false;
    }
    return true;
  }

    /**
     * 获取参数
     * @param params {Array}
     * @return {any}
     * @private
     */
  static _getParam(params: string[]): any {
    let match: string[] | null;
    let param: Object = {};
    const matchReg: RegExp = /([\s\S]*)=([\s\S]*)/;

    for (let i in params) {
      match = matchReg.exec(params[i]);

      if (match === null) {
        console.info('请检查URL参数');
      } else {
        param[match[1]] = decodeURIComponent(match[2]);
      }
    }

    return param;
  }

  /**
   * 设置参数
   * @param obj {Object}
   * @return {String}
   * @private
   */
  static _setParam(obj: Object): string {
    let string: string = '';
    let index: number = 0;

    for (let key in obj) {
      if (index === 0) {
        string += key + '=' + (encodeURIComponent(obj[key]) || '');
      } else {
        string += '&' + key + '=' + (encodeURIComponent(obj[key]) || '');
      }
      index++;
    }

    return string;
  }

  /**
   * 构造函数
   * @param location 
   */
  constructor(location?: Location | string) {
    UrlHelper._init(location);
  }

  /**
   * 获取 search 参数
   * @return {any} 获取到的 search 参数对象
   *
   * 例子：
   *
   *   http://rob:abcd1234@www.example.co.uk/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese
   *
   *   var searchParam = urlHelper.getSearchParam();
   *   searchParam;   // {query1: 'test', silly: 'willy'}
   */
  getSearchParam(location?: Location | string): any {
    let params: Array<string>;

    if (!location) {
      location = window.location;
    }

    if (typeof location === 'object') {
      params = location.search.substr(1).split("&");
      if (location.search.length) {
        return UrlHelper._getParam(params);
      } else {
        return {};
      }
    } else {
      if (location.indexOf("?") > -1) {
        params = location.split("?")[1].split("#")[0].split("&");
        return UrlHelper._getParam(params);
      } else {
        return {};
      }
    }
  }

  /**
   * 获取 hash 参数
   * @param location 用于实时获取 location
   * @return {any} 获取到的 hash 参数对象
   *
   * 例子：
   *
   *   http://rob:abcd1234@www.example.co.uk/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese
   *
   *   var hashParam = urlHelper.getHashParam();
   *   hashParam;   // {test: 'hash', chucky: 'cheese'}
   */
  getHashParam(location?: Location | string): any {
    let params: Array<string>;

    if (!location) {
      location = window.location;
    }

    if (typeof location === 'object') {
      params = location.hash.substr(1).split("&");
      if (location.hash.length) {
        return UrlHelper._getParam(params);
      } else {
        return {};
      }
    } else {
      if (location.indexOf("#") > -1) {
        params = location.split("#")[1].split("&");
        return UrlHelper._getParam(params);
      } else {
        return {};
      }
    }
  }

  /**
   * 设置 search 参数
   * @param param
   * @return String 带 search 格式的 url 参数字符串
   *
   * 例子：
   *
   *   var searchParamString = urlHelper.setSearchParam({
   *     query1: 'test1',
   *     silly: 'willy'
   *   });
   *
   *   // '?query1=test1&silly=willy'
   */
  setSearchParam(param: any): string {
    let paramString: string;

    if (param && typeof param !== 'object') {
      paramString = '?';
    } else if (!UrlHelper._isEmptyObject(param)) {
      paramString = '?';
    } else {
      paramString = '';
    }

    paramString += UrlHelper._setParam(param);

    return paramString;
  }

  /**
   * 设置 hash 参数
   * @param param
   * @return String 带 hash 格式的 url 参数字符串
   *
   * 例子：
   *
   *   var hashParamString = urlHelper.setHashParam({
   *     test: 'hash',
   *     chucky: 'cheese'
   *   });
   *
   *   // '#test=hash&chucky=cheese'
   */
  setHashParam(param: any): string {
    let paramString: string;

    if (param && typeof param !== 'object') {
      paramString = '#';
    } else if (!UrlHelper._isEmptyObject(param)) {
      paramString = '#';
    } else {
      paramString = '';
    }

    paramString += UrlHelper._setParam(param);

    return paramString;
  }

  /**
   * 链接到具体资源，参数为空为当前页
   * @param param {Object}
   * @param param.path {String} 跳转路径
   * @param param.search {Object} 跳转search参数
   * @param param.hash {Object} 跳转hash参数
   * @return {String} 链接地址
   *
   * 例子：
   *
   *   @example
   *   var link = urlHelper.link({
   *     path: '/path/other',
   *     hash: urlHelper.setHashParam({
   *         questionId: 112345
   *     })
   *   });
   * 
   *   或
   * 
   *   var link = urlHelper.link({
   *     path: '/path/other',
   *     hash: {
   *         questionId: 112345
   *     }
   *   });
   *
   *   document.getElementById('nextQuestion').href = link;
   */
  link(param: UrlHelperParam): string {
    if (!param) {
      param = {};
    }
    if (!param.path) {
      param.path = window.location.pathname;
    }
    if (!param.search) {
      param.search = '';
    }
    if (!param.hash) {
      param.hash = '';
    }

    return `${param.path}${(
      typeof param.search === 'string'
        ? param.search
        : this.setSearchParam(param.search)
    )}${(
      typeof param.hash === 'string'
        ? param.hash
        : this.setHashParam(param.hash)
    )}`;
  }

  /**
   * 跳转到具体资源，参数为空则刷新当前页
   * @param param {Object}
   * @param param.path {String} 跳转路径
   * @param param.search {String} 跳转search参数
   * @param param.hash {String} 跳转hash参数
   *
   * 例子：
   *
   *   @example
   *   var urlHelper = new UrlHelper(location)
   *
   *   urlHelper.jump({
   *     path: '/path/other',
   *     search: urlHelper.setSearchParam({
   *         classId: 112345,
   *         studentId: 22351223
   *     })
   *   });
   * 
   *   或
   * 
   *   urlHelper.jump({
   *     path: '/path/other',
   *     search: {
   *         classId: 112345,
   *         studentId: 22351223
   *     }
   *   });
   */
  jump(param: UrlHelperParam): void {
    if (!param) {
      param = {};
    }
    if (!param.path) {
      param.path = window.location.pathname;
    }
    if (!param.search) {
      param.search = '';
    }
    if (!param.hash) {
      param.hash = '';
    }

    window.location.href = this.link(param);
  }
}