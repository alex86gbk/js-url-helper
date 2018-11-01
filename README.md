# introduce
## 介绍

Js-url-helper 是一个浏览器 `URL` 辅助工具。
通过 Js-url-helper 可以很方便的操作 `location` 对象。

如：
 - 获取/设置 `search` 参数
 - 获取/设置 `hash` 参数
 - 执行 `URL` 跳转
 - 生成 `URL` 链接
 
[API 说明文档](#api)

# download
## 下载
（仅下载至本地后使用，不能直接作为 CDN 资源引用）

[unzipped](https://raw.githubusercontent.com/alex86gbk/js-url-helper/master/src/index.js) [(~zipped)](https://raw.githubusercontent.com/alex86gbk/js-url-helper/master/dist/js-url-helper.js)

# install
安装

# npm
通过 npm

```bash
npm install --save js-url-helper
```

# browser
浏览器环境：

```html
<script src="js-url-helper.js"></script>
```

# api

* [实例化 UrlHelper](README.md#urlhelper)
* [获取 search 参数](README.md#getsearchparam)
* [获取 hash 参数](README.md#gethashparam)
* [设置 search 参数](README.md#setsearchparam)
* [设置 hash 参数](README.md#sethashparam)
* [执行 URL 跳转](README.md#jump)
* [生成 URL 链接](README.md#link)

# UrlHelper

## 实例化

`new UrlHelper(location)`

### Arguments

 - location **{Object}** 浏览器 `location` 对象
 
### Returns

 - **{Object}** UrlHelper 实例

### Example
```javascript
var urlHelper = new UrlHelper(location);
```

# getSearchParam

`getSearchParam(location)`

## 获取 search 参数

### Arguments

 - [location] `可选参数` **{Object}** 浏览器 `location` 对象
 
### Returns

 - **{Object}** `search` 参数对象

### Example
```text
'http://www.example.com/path/index.html?query1=test&silly=willy'
```

```javascript    
var searchParam = urlHelper.getSearchParam();
// {query1: 'test', silly: 'willy'}
```

# getHashParam

`getHashParam(location)`

## 获取 hash 参数

### Arguments

 - [location] `可选参数` **{Object}** 浏览器 `location` 对象

### Returns

 - **{Object}** `hash` 参数对象

### Example
```text
'http://www.example.com/path/index.html#test=hash&chucky=cheese'
```

```javascript    
var hashParam = urlHelper.getHashParam();
// {test: 'hash', chucky: 'cheese'}
```

# setSearchParam

`setSearchParam(param)`

## 设置 search 参数

### Arguments

 - param **{Object}** `search` 对象
 
### Returns
 
 - **{String}** 带 `search` 信息的 `URL` 参数字符串

### Example
```javascript
var searchParamString = urlHelper.setSearchParam({
  query1: 'test1',
  silly: 'willy'
});
// '?query1=test1&silly=willy'
```

# setHashParam

`setHashParam(param)`

## 设置 hash 参数

### Arguments

 - param **{Object}** `hash` 对象
 
### Returns
 
 - **{String}** 带 `hash` 信息的 `URL` 参数字符串

### Example
```javascript
var hashParamString = urlHelper.setHashParam({
  test: 'hash',
  chucky: 'cheese'
});
// '#test=hash&chucky=cheese'
```

# jump

`jump(param)`

## 执行 URL 跳转，参数为空则刷新当前页。

### Arguments

 - param **{Object}**
 - param.path **{String}** 跳转路径
 - param.search **{String}** search参数
 - param.hash **{String}** hash参数
 
### Returns
 
 - **无**

### Example
```javascript
urlHelper.jump({
  path: '/path/other',
  search: urlHelper.setSearchParam({
    classId: 112345,
    studentId: 22351223
  })
});
```

# link

`link(param)`

## 生成 URL 链接，参数为空为当前页。

### Arguments

 - param **{Object}**
 - param.path **{String}** 跳转路径
 - param.search **{String}** search参数
 - param.hash **{String}** hash参数
 
### Returns
 
 - **{String}** 链接地址

### Example
```javascript
var link = urlHelper.link({
  path: '/path/other',
  search: urlHelper.setHashParam({
    questionId: 112345
  })
});

document.getElementById('nextQuestion').href = link;
```

# 扩展阅读

## location

>Location 对象包含有关当前 URL 的信息。

>Location 对象是 Window 对象的一个部分，可通过 window.location 属性来访问。

## protocol

>设置或返回当前 URL 的协议。

## host

>设置或返回主机名和当前 URL 的端口号。

## port

>设置或返回当前 URL 的端口号。

## pathname

>设置或返回当前 URL 的路径部分。

## search

>设置或返回从问号 (?) 开始的 URL（查询部分）。

## hash

>设置或返回从井号 (#) 开始的 URL（锚）。

## href

>设置或返回完整的 URL。

