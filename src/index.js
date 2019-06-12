(function (name, definition) {
  let hasDefine = typeof define === 'function';
  let hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    define(definition);
  } else if (hasExports) {
    module.exports = definition();
  } else {
    if (typeof window !== 'undefined') {
      window[name] = definition();
    } else {
      try {
        this[name] = definition();
      } catch (err) {
        throw err;
      }
    }
  }
})('UrlHelper', function () {
  'use strict';

  /**
   * Url辅助类
   * @param location {Object} 浏览器 location 对象
   * @author alex86gbk
   * @class
   * @constructor
   */
  function UrlHelper (location) {
    /** 匹配规则 **/
    const matchReg = /([\s\S]*)=([\s\S]*)/;

    /**
     * @template
     * @private
     */
    function _init() {
      if (!location) {
        location = window.location;
      }
      if (location.href.indexOf("?") > -1 && location.href.indexOf("#") > -1) {
        if (location.href.indexOf("?") > location.href.indexOf("#")) {
          alert('URL参数格式异常！');
        }
      }
    }

    /**
     * 判断是否空对象
     * @param obj
     * @return Boolean
     * @private
     */
    function _isEmptyObject(obj) {
      for (let key in obj){
        return false;
      }
      return true;
    }

    /**
     * 获取参数
     * @param params {Array}
     * @return {Object}
     * @private
     */
    function _getParam(params) {
      let match;
      let param = {};

      for (let i in params) {
        match = matchReg.exec(params[i]);

        try {
          param[match[1]] = decodeURIComponent(match[2]);
        } catch (err) {
          alert('请检查URL参数');
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
    function _setParam(obj) {
      let string = '';
      let index = 0;

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
     * 获取 search 参数
     * @return {Object} 获取到的 search 参数对象
     *
     * 例子：
     *
     *   http://rob:abcd1234@www.example.co.uk/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese
     *
     *   var searchParam = urlHelper.getSearchParam();
     *   searchParam;   // {query1: 'test', silly: 'willy'}
     */
    this.getSearchParam = function () {
      let params;

      if (!location) {
        location = window.location;
      }

      if (typeof location === 'object') {
        params = location.search.substr(1).split("&");
        if (location.search.length) {
          return _getParam(params);
        } else {
          return {};
        }
      } else {
        if (location.indexOf("?") > -1) {
          params = location.split("?")[1].split("#")[0].split("&");
          return _getParam(params);
        } else {
          return {};
        }
      }
    };


    /**
     * 获取 hash 参数
     * @param location 用于实时获取 location
     * @return {Object} 获取到的 hash 参数对象
     *
     * 例子：
     *
     *   http://rob:abcd1234@www.example.co.uk/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese
     *
     *   var hashParam = urlHelper.getHashParam();
     *   hashParam;   // {test: 'hash', chucky: 'cheese'}
     */
    this.getHashParam = function (location) {
      let params;

      if (!location) {
        location = window.location;
      }

      if (typeof location === 'object') {
        params = location.hash.substr(1).split("&");
        if (location.hash.length) {
          return _getParam(params);
        } else {
          return {};
        }
      } else {
        if (location.indexOf("#") > -1) {
          params = location.split("#")[1].split("&");
          return _getParam(params);
        } else {
          return {};
        }
      }
    };

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
    this.setSearchParam = function (param) {
      let paramString;

      if (param && typeof param !== 'object') {
        paramString = '?'
      } else if (!_isEmptyObject(param)) {
        paramString = '?';
      } else {
        paramString = '';
      }

      paramString += _setParam(param);

      return paramString;
    };

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
    this.setHashParam = function (param) {
      let paramString;

      if (param && typeof param !== 'object') {
        paramString = '#'
      } else if (!_isEmptyObject(param)) {
        paramString = '#';
      } else {
        paramString = '';
      }

      paramString += _setParam(param);

      return paramString;
    };

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
     */
    this.jump = function (param) {
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

      window.location.href = param.path + param.search + param.hash;
    };

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
     *   document.getElementById('nextQuestion').href = link;
     */
    this.link = function (param) {
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

      return param.path + param.search + param.hash;
    };

    /**
     * 页面刷新
     * @param param {Object}
     * @param param.path {String} 刷新路径
     * @param param.search {Object} 刷新search参数
     * @param param.hash {Object} 刷新hash参数
     */
    this.refresh = function (param) {
      const refreshNode = document.createElement("meta");
      const params = (param.search ? param.search : '') + (param.hash ? param.hash : '');

      document.getElementsByTagName("head")[0].appendChild(refreshNode);
      refreshNode.setAttribute('http-equiv', 'refresh');
      refreshNode.setAttribute('content', '0;URL=' + param.path + params);
    };

    _init();
  }

  return UrlHelper;
});