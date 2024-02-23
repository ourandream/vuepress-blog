---
title: http cache
categories: front-end
date: 2024-02-23 23:21:15
updated: 2024-02-23 00:40:46
---

http Cache, 即 http 协议所规定的对同一个 request 的 response 的服用.
本文是对 http cache 的类别和使用的总结.

<!-- more -->

## 类型

### private cache

用于缓存个人信息
需要指定 head

```
Cache-Control: private
```

### shared cache

**proxy caches**

即代理的缓存

**managed cache**

即可控制的缓存
当多个请求到达一个 shard Cache, 会触发 request collapse, 即把多个请求合成一个
如果需要保持请求个数, 需要设置为 private Cache
默认情况下, http 会尽可能地缓存, 这种情况叫做**heuristic caching**(启发式缓存)
若想保持最新状态, 可使用如下 header 让 Cache 不可使用

```
Cache-Control: no-cache
```

注意是不使用, 依然会保存, 如果想不保存使用 no-store(不推荐)
也可使用 hash 组成文件名来实现(用在可改变 url 的资源上)

## 管理 cache 状态

### 状态

fresh, 仍可用
stale, 过时

### 判断

Max-age header 指定 cache 创建后可经过的最长时间

Expires header 指定 cache 过期的时间, 但实践中证明时间字符串的处理很困难, 故较少使用, 两个同时指定时优先度低
Validation

即通过发出短请求的方式确定 cache 情况, 再决定是否重新请求资源

### 控制

If-Modified-Since 在某个日期后是否修改

ETag/If-None-Match 某个抽象数字用于判断是否修改(如使用文件 hash), 优先度高

因为 If-Modified-Since 的日期有其他用途, 一般推荐两个都指定

如果需要强制重新验证:

```
Cache-Control: no-cache

//http1.1下使用如下代替
Cache-Control: max-age=0, must-revalidate
```

### 触发

reload

```
GET / HTTP/1.1
Host: example.com
Cache-Control: max-age=0
If-None-Match: "deadbeef"
If-Modified-Since: Tue, 22 Feb 2022 20:20:20 GMT
```

force reload 绕过 cache

```
GET / HTTP/1.1
Host: example.com
Pragma: no-cache
Cache-Control: no-cache
```

## Vary

可用于指定 http header 来区分请求
