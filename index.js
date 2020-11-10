!function(t,e){"function"==typeof define&&define.amd?define(["exports"],e):"undefined"!=typeof exports?e(exports):(e(e={}),t.UrlHelper=e)}(this,function(t){"use strict";t.__esModule=!0,t.UrlHelper=void 0;var e=(n._init=function(t){"string"==typeof(t=t||window.location)?t.indexOf("?")>t.indexOf("#")&&-1<t.indexOf("#")&&alert("URL参数格式异常！"):t.href.indexOf("?")>t.href.indexOf("#")&&-1<t.href.indexOf("#")&&alert("URL参数格式异常！")},n._isEmptyObject=function(t){for(var e in t)return!1;return!0},n._getParam=function(t){var e,n,r={},a=/([\s\S]*)=([\s\S]*)/;for(n in t)null===(e=a.exec(t[n]))?alert("请检查URL参数"):r[e[1]]=decodeURIComponent(e[2]);return r},n._setParam=function(t){var e,n="",r=0;for(e in t)n+=0===r?e+"="+(encodeURIComponent(t[e])||""):"&"+e+"="+(encodeURIComponent(t[e])||""),r++;return n},n.prototype.getSearchParam=function(t){var e;return"object"==typeof(t=t||window.location)?(e=t.search.substr(1).split("&"),t.search.length?n._getParam(e):{}):-1<t.indexOf("?")?(e=t.split("?")[1].split("#")[0].split("&"),n._getParam(e)):{}},n.prototype.getHashParam=function(t){var e;return"object"==typeof(t=t||window.location)?(e=t.hash.substr(1).split("&"),t.hash.length?n._getParam(e):{}):-1<t.indexOf("#")?(e=t.split("#")[1].split("&"),n._getParam(e)):{}},n.prototype.setSearchParam=function(t){var e=(!t||"object"==typeof t)&&n._isEmptyObject(t)?"":"?";return e+=n._setParam(t)},n.prototype.setHashParam=function(t){var e=(!t||"object"==typeof t)&&n._isEmptyObject(t)?"":"#";return e+=n._setParam(t)},n.prototype.link=function(t){return(t=t||{}).path||(t.path=window.location.pathname),t.search||(t.search=""),t.hash||(t.hash=""),""+t.path+("string"==typeof t.search?t.search:this.setSearchParam(t.search))+("string"==typeof t.hash?t.hash:this.setHashParam(t.hash))},n.prototype.jump=function(t){(t=t||{}).path||(t.path=window.location.pathname),t.search||(t.search=""),t.hash||(t.hash=""),window.location.href=this.link(t)},n);function n(t){n._init(t)}t.UrlHelper=e});