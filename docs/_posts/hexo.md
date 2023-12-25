---
title: hexo
tags: blog
categories: others
mathjax: true
top: true
abbrlink: ab21860c
date: 2021/12/23 18:23:25
updated: 2022/04/05 15:06:18
---
折腾了不久hexo和this，也算是玩出了一些心得。准备做些记录，免得忘记。
<!--more-->

# base

每次改完主题或者想更新博客，必须在博客的根目录下打开git bash,执行以下命令：
```
hexo g
hexo d
```
然后便可部署到网站上了,注意若是利用gitee部署,则还需要前往仓库界面的gitee page界面手动更新,github等其他的网站则不需要

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

如果发现本地运行的结果和部署好的结果不一致，现在本地使用`hexo clean`然后重新部署,若还不可以则在网站使用ctrl+f5刷新缓存.

文章书写可在终端输入如下代码创建模板：
```
hexo new "title"
```
或者直接在\sources\_post里创建md文件
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

# next

## 侧边框标题自动添加数字去除

在next主题文件_config.yml文件下搜索toc,找到如下界面:
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
把其中的number改为false即可

## 文章底部标签美化
```swig
<div class="post-tags">
	{%- for tag in post.tags.toArray() %}
	  <a href="{{ url_for(tag.path) }}" rel="tag"><i class="fa fa-tag"></i> {{ tag.name }}</a>
	{%- endfor %}
```
找到相应的代码然后用以上代码覆盖即可

## 上传并在文章中使用图片
先在npm中安装**hexo-asset-image**

然后打开/node_modules/hexo-asset-image/index.js
然后将其中内容替换如下:
```js
'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

var version = String(hexo.version).split('.');
hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
        var link = data.permalink;
    if(version.length > 0 && Number(version[0]) == 3)
       var beginPos = getPosition(link, '/', 1) + 1;
    else
       var beginPos = getPosition(link, '/', 3) + 1;
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
    var endPos = link.lastIndexOf('/') + 1;
    link = link.substring(beginPos, endPos);

    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];
 
      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
        if ($(this).attr('src')){
            // For windows style path, we replace '\' to '/'.
            var src = $(this).attr('src').replace('\\', '/');
            if(!/http[s]*.*|\/\/.*/.test(src) &&
               !/^\s*\//.test(src)) {
              // For "about" page, the first part of "src" can't be removed.
              // In addition, to support multi-level local directory.
              var linkArray = link.split('/').filter(function(elem){
                return elem != '';
              });
              var srcArray = src.split('/').filter(function(elem){
                return elem != '' && elem != '.';
              });
              if(srcArray.length > 1)
                srcArray.shift();
              src = srcArray.join('/');
              $(this).attr('src', config.root + link + src);
              console.info&&console.info("update link as:-->"+config.root + link + src);
            }
        }else{
            console.info&&console.info("no src attr, skipped...");
            console.info&&console.info($(this));
        }
      });
      data[key] = $.html();
    }
  }
});
```

然后需要在_config.yml中找到如下代码并改为true
```js
post_asset_folder: true
```

然后要插入的图片需要放在_post文件夹里的一个和md文件同名的文件夹,而且使用markdown语法调用时忽略文件夹名
```
![](1/1.jpg)
![](1.jpg)
```
即使用下面的哪一行

## 添加live2d小人
安装插件：
```
npm install --save hexo-helper-live2d
```

然后在_config.yml中添加如下配置:
```js
live2d:
  enable: true  # 是否启动
  scriptFrom: local # 默认
  pluginRootPath: live2dw/  # 插件在站点上的根目录(相对路径)
  pluginJsPath: lib/  # 脚本文件相对与插件根目录路径
  pluginModelPath: assets/  # 模型文件相对与插件根目录路径
  tagMode: false  # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
  debug: false  # 调试, 是否在控制台输出日志
  model:
    use: live2d-widget  ## 模型文件
  display:
    position: right # 定位方向 left right top bottom
    width: 150  # 小人宽度
    height: 300 #  小人高度
    hOffset: -15  # 向 偏移
    vOffset: -15  # 像 偏移
  mobile:
    show: true  # 手机端是否显示
  react:
    opacity: 0.7  # 模型透明度
```

在hexo的根目录创建新文件夹,命名为**live2d_models**,然后live2d文件夹放入其中,在上面的设置中的
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

# 更换主题

下载完主题然后放入放博客的目录里的theme，然后在`config.yml`里修改theme即可.注意要删除hexo-theme的前缀.

# yilia theme

图片放在yilia文件夹的resources里面，不过设置路径时要把resources去掉

顶部加载图标在faviico那里设置

# 推送到github

在根目录的`config.yml`里面加入如下语句：

```js
deploy:
  type: git
  repository: git@github.com:用户名/用户名.github.io.git
  branch: master
```

如果出现`Error: Spawn failed`,通过以下命令检查ssh链接:

```bash
ssh -T git@github.com
```

若失败,在.ssh文件夹添加config文件(没有后缀名),然后输入如下内容:

```
Host github.com
User 你GitHub的邮箱
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```
也可以利用vercal或github action的自动部署功能,这样只需要将hexo blog的根目录推送到github上即可.
# 推送到Coding

根据创造的SSH文件里的密钥在个人设置里创建SSH密钥，密钥文件一般在`C/Users/user/.SSH`里面,后缀是.pub

然后在根目录的config.yml里加入如下语句:

```yml
- type: git
  repository: git@e.coding.net:ourandream/main/ourandream.git
  branch: master
```

注意第一个ourandream是团队名

# problem
开头配置必须严格按照yaml语法书写,如title与后面的字符串必须空一格.
