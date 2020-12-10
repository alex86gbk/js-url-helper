(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.UrlHelper = mod.exports.default;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var UrlHelper = function () {
        function UrlHelper(location) {
            UrlHelper._init(location);
        }
        UrlHelper._init = function (location) {
            if (!location) {
                location = window.location;
            }
            if (typeof location === 'string') {
                if (location.indexOf("?") > location.indexOf("#") && location.indexOf("#") > -1) {
                    alert('URL参数格式异常！');
                }
            } else {
                if (location.href.indexOf("?") > location.href.indexOf("#") && location.href.indexOf("#") > -1) {
                    alert('URL参数格式异常！');
                }
            }
        };
        UrlHelper._isEmptyObject = function (obj) {
            for (var key in obj) {
                return false;
            }
            return true;
        };
        UrlHelper._getParam = function (params) {
            var match;
            var param = {};
            var matchReg = /([\s\S]*)=([\s\S]*)/;
            for (var i in params) {
                match = matchReg.exec(params[i]);
                if (match === null) {
                    alert('请检查URL参数');
                } else {
                    param[match[1]] = decodeURIComponent(match[2]);
                }
            }
            return param;
        };
        UrlHelper._setParam = function (obj) {
            var string = '';
            var index = 0;
            for (var key in obj) {
                if (index === 0) {
                    string += key + '=' + (encodeURIComponent(obj[key]) || '');
                } else {
                    string += '&' + key + '=' + (encodeURIComponent(obj[key]) || '');
                }
                index++;
            }
            return string;
        };
        UrlHelper.prototype.getSearchParam = function (location) {
            var params;
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
        };
        UrlHelper.prototype.getHashParam = function (location) {
            var params;
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
        };
        UrlHelper.prototype.setSearchParam = function (param) {
            var paramString;
            if (param && typeof param !== 'object') {
                paramString = '?';
            } else if (!UrlHelper._isEmptyObject(param)) {
                paramString = '?';
            } else {
                paramString = '';
            }
            paramString += UrlHelper._setParam(param);
            return paramString;
        };
        UrlHelper.prototype.setHashParam = function (param) {
            var paramString;
            if (param && typeof param !== 'object') {
                paramString = '#';
            } else if (!UrlHelper._isEmptyObject(param)) {
                paramString = '#';
            } else {
                paramString = '';
            }
            paramString += UrlHelper._setParam(param);
            return paramString;
        };
        UrlHelper.prototype.link = function (param) {
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
            return "" + param.path + (typeof param.search === 'string' ? param.search : this.setSearchParam(param.search)) + (typeof param.hash === 'string' ? param.hash : this.setHashParam(param.hash));
        };
        UrlHelper.prototype.jump = function (param) {
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
        };
        return UrlHelper;
    }();
    exports.default = UrlHelper;
});