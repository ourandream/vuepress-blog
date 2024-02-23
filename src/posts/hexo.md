---
title: hexo
tags: blog
categories: others
mathjax: true
top: true
abbrlink: ab21860c
date: 2021-12-23 18:23:25
updated: 2022-04-05 15:06:18
---

折腾了不久 hexo 和 this，也算是玩出了一些心得。准备做些记录，免得忘记。

<!-- more -->

## base

每次改完主题或者想更新博客，必须在博客的根目录下打开 git bash,执行以下命令：

```
hexo g
hexo d
```

然后便可部署到网站上了,注意若是利用 gitee 部署,则还需要前往仓库界面的 gitee page 界面手动更新,github 等其他的网站则不需要

这个命令似乎可以一键部署

```js
hexo deploy
```

如果想测试而不线上部署,可试试如下命令:

```
hexo g
hexo s
```

这些命令执行后,将会在本地部署网站,然后根据给定的网站进入即可

如果发现本地运行的结果和部署好的结果不一致，现在本地使用`hexo clean`然后重新部署,若还不可以则在网站使用 ctrl+f5 刷新缓存.

文章书写可在终端输入如下代码创建模板：

```
hexo new "title"
```

或者直接在\sources_post 里创建 md 文件
文章的前面的各项设置:

```text
---

title: hexo

tags: blog
#tag: [tag1,tag2] 多个标签

categories: others

mathjax: true

top: true #博文置顶

updated: 2017-09-05 20:18:54 #手动添加更新时间

---
```

## next

### 侧边框标题自动添加数字去除

在 next 主题文件\_config.yml 文件下搜索 toc,找到如下界面:

```yml
toc:
  enable: true

  # Automatically add list number to toc.

  number: true

  # If true, all words will placed on next lines if header width longer then sidebar width.

  wrap: false

  # If true, all level of TOC in a post will be displayed, rather than the activated part of it.

  expand_all: false

  # Maximum heading depth of generated toc.

  max_depth: 6
```

把其中的 number 改为 false 即可

### 文章底部标签美化

```swig
<div class="post-tags">
	{%- for tag in post.tags.toArray() %}
	  <a href="{{ url_for(tag.path) }}" rel="tag"><i class="fa fa-tag"></i> {{ tag.name }}</a>
	{%- endfor %}
```

找到相应的代码然后用以上代码覆盖即可

### 上传并在文章中使用图片

先在 npm 中安装**hexo-asset-image**

然后打开/node_modules/hexo-asset-image/index.js
然后将其中内容替换如下:

```js
"use strict";
var cheerio = require("cheerio");

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

var version = String(hexo.version).split(".");
hexo.extend.filter.register("after_post_render", function (data) {
  var config = hexo.config;
  if (config.post_asset_folder) {
    var link = data.permalink;
    if (version.length > 0 && Number(version[0]) == 3)
      var beginPos = getPosition(link, "/", 1) + 1;
    else var beginPos = getPosition(link, "/", 3) + 1;
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
    var endPos = link.lastIndexOf("/") + 1;
    link = link.substring(beginPos, endPos);

    var toprocess = ["excerpt", "more", "content"];
    for (var i = 0; i < toprocess.length; i++) {
      var key = toprocess[i];

      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false,
      });

      $("img").each(function () {
        if ($(this).attr("src")) {
          // For windows style path, we replace '\' to '/'.
          var src = $(this).attr("src").replace("\\", "/");
          if (!/http[s]*.*|\/\/.*/.test(src) && !/^\s*\//.test(src)) {
            // For "about" page, the first part of "src" can't be removed.
            // In addition, to support multi-level local directory.
            var linkArray = link.split("/").filter(function (elem) {
              return elem != "";
            });
            var srcArray = src.split("/").filter(function (elem) {
              return elem != "" && elem != ".";
            });
            if (srcArray.length > 1) srcArray.shift();
            src = srcArray.join("/");
            $(this).attr("src", config.root + link + src);
            console.info &&
              console.info("update link as:-->" + config.root + link + src);
          }
        } else {
          console.info && console.info("no src attr, skipped...");
          console.info && console.info($(this));
        }
      });
      data[key] = $.html();
    }
  }
});
```

然后需要在\_config.yml 中找到如下代码并改为 true

```js
post_asset_folder: true;
```

然后要插入的图片需要放在\_post 文件夹里的一个和 md 文件同名的文件夹,而且使用 markdown 语法调用时忽略文件夹名

```
![](1/1.jpg)
![](1.jpg)
```

即使用下面的哪一行

### 添加 live2d 小人

安装插件：

```
npm install --save hexo-helper-live2d
```

然后在\_config.yml 中添加如下配置:

```js
live2d:
  enable: true  ## 是否启动
  scriptFrom: local ## 默认
  pluginRootPath: live2dw/  ## 插件在站点上的根目录(相对路径)
  pluginJsPath: lib/  ## 脚本文件相对与插件根目录路径
  pluginModelPath: assets/  ## 模型文件相对与插件根目录路径
  tagMode: false  ## 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false  ## 调试, 是否在控制台输出日志
  model:
    use: live2d-widget  ### 模型文件
  display:
    position: right ## 定位方向 left right top bottom
    width: 150  ## 小人宽度
    height: 300 ##  小人高度
    hOffset: -15  ## 向 偏移
    vOffset: -15  ## 像 偏移
  mobile:
    show: true  ## 手机端是否显示
  react:
    opacity: 0.7  ## 模型透明度
```

在 hexo 的根目录创建新文件夹,命名为**live2d_models**,然后 live2d 文件夹放入其中,在上面的设置中的

```
model:
  use:
```

里的内容改为文件夹名即可

通过

```js
npm install --save live2d-widget-model-koharu
```

安装模型的话,模型文件夹放在根目录的**node_modules**里

目前不知道这个插件是否只支持通过此种方式下载的模型

## 更换主题

下载完主题然后放入放博客的目录里的 theme，然后在`config.yml`里修改 theme 即可.注意要删除 hexo-theme 的前缀.

## yilia theme

图片放在 yilia 文件夹的 resources 里面，不过设置路径时要把 resources 去掉

顶部加载图标在 faviico 那里设置

## 推送到 github

在根目录的`config.yml`里面加入如下语句：

```js
deploy:
  type: git
  repository: git@github.com:用户名/用户名.github.io.git
  branch: master
```

如果出现`Error: Spawn failed`,通过以下命令检查 ssh 链接:

```bash
ssh -T git@github.com
```

若失败,在.ssh 文件夹添加 config 文件(没有后缀名),然后输入如下内容:

```
Host github.com
User 你GitHub的邮箱
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```

也可以利用 vercal 或 github action 的自动部署功能,这样只需要将 hexo blog 的根目录推送到 github 上即可.

## 推送到 Coding

根据创造的 SSH 文件里的密钥在个人设置里创建 SSH 密钥，密钥文件一般在`C/Users/user/.SSH`里面,后缀是.pub

然后在根目录的 config.yml 里加入如下语句:

```yml
- type: git
  repository: git@e.coding.net:ourandream/main/ourandream.git
  branch: master
```

注意第一个 ourandream 是团队名

## problem

开头配置必须严格按照 yaml 语法书写,如 title 与后面的字符串必须空一格.
