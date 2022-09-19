---
title: html
category: front-end
abbrlink: 1879f8e5
date: 2021/12/23 18:23:21
updated: 2021/12/23 18:23:21
---
html是一种标记语言，用于让浏览器识别并展示内容。html包含一系列的element，以使各种各样的内容正确显示。本文内容是基于MDN web docs的[html学习](https://developer.mozilla.org/en-US/docs/Learn/HTML)的相关内容的个人总结.
<!--more-->

# element

我们强调elemnet要有语义学含义

## tags

tags可用于区分element，指定element的功能，如

```html
<p>
    paragraph
</p>
```

指定了一个段落

tags可大写可小写,不过一般写成小写,tags可嵌套,但注意不能错误嵌套如:

```html
<p>My cat is <strong>very grumpy.</p></strong>
```

## block inline

block level element会在新的一行显示内容,还会在内容的上下加上空行(可通过css关闭),inline element则不会

## empty 

有些element加>结尾,如

```html
<img src="https://raw.githubusercontent.com/mdn/beginner-html-site/gh-pages/images/firefox-icon.png">
```

## attributes

attributes用于指定element的各种属性,属性注意要在前后加一个空格,写成

```html
src="..."
```

双引号单引号按个人喜欢使用

有些attribute写下名字即可,它们被称为`Boolean attributes`

# 简单html分析

`<!DOCTYPE html>`:doctype是以前html链接到一系列写好html的规则所用的，现在变成了让所有东西正确工作需要引入的，上述写法是最短的有效写法

`<html></html>`:root element,包含html的所有内容

`<head></head>`:包含文件的各种信息，如字符集、展现给搜索引擎的内容等

`<meta charset="utf-8">`:指定字符集,一般都要指定避免bug

`<title></title>`: 在浏览器标签处显示的标题

`<body></body>`:包含所有显示给用户的内容

html中的多个空格在处理时会自动减少成一个

一些特殊符号如<在html中需要用特殊方式显示

| Literal character | Character reference equivalent |
| :---------------- | :----------------------------- |
| <                 | \&lt;                          |
| >                 | \&gt;                          |
| "                 | \&quot;                        |
| '                 | \&apos;                        |
| &                 | \&amp;                         |

html的注释按如下方式书写

```
<!--comment-->
```

# 重要的head element

`<title>`:在上面已经有阐述

`<meta>`也是head里面的一类重要的element,它包含对数据的阐述(meta data),如上面指定字符集用的就是meta

很多meta data用name和content的格式书写,我们可以利用这个添加作者和简述

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Web Docs Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

其中description会展现在搜索引擎的结果中

还有一类meta data,按property加content的格式书写,用于给一些特定的网站提供内容,如:

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

这样当我们的网站连接到Facebook时,这些信息就会展现

注意一定要按目标网站给的格式书写

我们一般还会在head里面添加favicon(展现在浏览器标签上):

```html
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

它还有一些其他的类别

```html
<!-- third-generation iPad with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://developer.mozilla.org/static/img/favicon144.png">
<!-- iPhone with high-resolution Retina display: -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://developer.mozilla.org/static/img/favicon114.png">
<!-- first- and second-generation iPad: -->
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://developer.mozilla.org/static/img/favicon72.png">
<!-- non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
<link rel="apple-touch-icon-precomposed" href="https://developer.mozilla.org/static/img/favicon57.png">
<!-- basic favicon -->
<link rel="icon" href="https://developer.mozilla.org/static/img/favicon32.png">
```

在head里相当重要的一点是应用css和script:

```html
<link rel="stylesheet" href="my-css-file.css">
<script src="my-js-file.js" defer></script>
```

其中script的`defer`用于让脚本在html加载完后运行避免出错,

我们可以设置html的主要语言,并同时使用其他的语言

```html
<html lang="en-US">
<p>Japanese example: <span lang="ja">ご飯が熱い。</span>.</p>
```

这样可以方便搜索引擎的精确匹配和用语朗器的准确阅读

# 文本组织

html提供很多element用于组织文本结构以便阅读

标题可用`<h1>`,有六个h,但一般一个文件里不要用超过三个

`<p>`用于分段

`<ul>`用于表现无序列表,列表元素用`<li>`包裹

`<ol`为有序列表,其他同上

`ol`可以控制前面的数字,`start`attribute控制开始数字,`reversed`让计数从大到小,`li`的`value` attribute则可控制每一个具体的元素的表头数字.

列表可以嵌套

`<em>`用于强调某个词语,一般显示效果是斜体

`<strong>`用于表示重读,一般显示效果是加粗

`<b>`,`<i>`,`<u>`分别用于获得加粗,斜体,下划线,html定义了一些含义给它们,不过一般记住在超链接时可用下划线即可,如果在address等elements中想加粗也需要加

`<span>`没有特别的含义,但可用它对特定内容应用css或js

`<dl>`用于使用description list，即item和definition相对应的list,`<di>`用于指定item,`<dd>`用于指定definition

```html
<dl>
  <dt>soliloquy</dt>
  <dd>In drama, where a character speaks to themselves, representing their inner thoughts or feelings and in the process relaying them to the audience (but not to other characters.)</dd>
</dl>
```

一个`di`可对应多个`dd`

我们使用`<blockquote>`表示一段内容是从别处应用的,也可以`<q>`(inline quote),区别是前者会一般会自动缩进和空上下行表明自己是block

```html
<p>Here below is a blockquote...</p>
<blockquote cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote">
  <p>The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or <em>HTML Block
  Quotation Element</em>) indicates that the enclosed text is an extended quotation.</p>
</blockquote>
<p>The quote element — <code>&lt;q&gt;</code> — is <q cite="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q">intended
for short quotations that don't require paragraph breaks.</q></p>
```

没有使用js和css的一般,一般引用链接的内容不会显示

我们还会使用`<cite>`来表明引用的作者或书,默认会加上斜体,一般我们还会加上链接

我们使用`<abbr>`来表明一段内容是缩写,并在title的属性里写下完整的内容(鼠标悬停显示)

```html
<p>We use <abbr title="Hypertext Markup Language">HTML</abbr> to structure our web documents.</p>
```

注意可添加`aria-label`属性并填入和`title`一样的内容保证朗读器能读到.

我们使用`<address>`来表明一段内容是联系信息,里面可加链接,注意我们给出的联系信息需要与页内内容相关

我们使用`<sup>`和`<sub>`实现文字上下标

对于代码,html也有很多的element

`<code>`表示一般的代码,`<pre>`表示保留原来的空格,`<var>`表示变量名,`<kbd>`表示键盘输入,`<samp>`表示计算机程序的输出

我们使用`<time>`告诉计算机一段内容是时间日期和具体的事件日期

```html
<time datetime="2016-01-20">20 January 2016</time>
```

# hyperlink

超链接是web中重要的组成部分,几乎所有web的内容可用指向一个链接

一般的链接如下:

```html
<p>I'm creating a link to
<a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
</p>
```

也可以换成其他的内容

```html
<a href="https://www.mozilla.org/en-US/">
  <img src="mozilla-image.png" alt="mozilla logo that links to the mozilla homepage">
</a>
```

链接也可以指向文件的一部分内容,被称为`Document fragments`

```html
<h2 id="Mailing_address">Mailing address</h2>
<p>Want to write us a letter? Use our <a href="contacts.html#Mailing_address">mailing address</a>.</p>
```

`url`在超链接中被使用,指向一个web内容,它在本地使用时使用html根目录下的相对路径

如果要访问上级目录,按如下方式书写:

```html
<p>A link to my <a href="../pdfs/project-brief.pdf">project brief</a>.</p>
```

向上访问多层嵌套..即可

注意指向本文件的某部分只需加#即可

控制超链接,我们使用`target` attribute,其中默认的`_self`是在当前标签页打开,`_blank`是在新标签页打开.

对于超链接的书写,我们有一系列规则

>1.清晰地说明指向
>
>2.不要用超链接的重复形成一段内容
>
>3.不要用link等词汇
>
>4.说明尽可能简短
>
>5.尽量不要让相同的内容指向不同的链接

当我们指向如视频流等非html内容时,更需要清楚的说明

当指定的是下载内容时,我们可以使用如下用法指定下载一个文件:

```html
<a href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
   download="firefox-latest-64bit-installer.exe">
  Download Latest Firefox for Windows (64-bit) (English, US)
</a>
```

当指向的是`mailto:`时,一般会打开邮箱软件对该链接发生邮件

我们可以指定多个邮箱地址:

```html
<a href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">
  Send mail with cc, bcc, subject and body
</a>
```

最后的body会给邮件自动填充标题名

# 网站结构

一般网站由以下部分组成

`header`:对网站的总介绍,一般是logo和名称,html有`<header>`与其对应

`navigation bar`:导航栏,展现并链接到网站的主要内容的分类,一般放header里,对应的element是`<nav>`

`main content`:主要内容,对应的是`<main>`,一个网页一般只能有一个

`sidebar`:侧边栏,包含一些外部的其他信息如广告,对应的是`<aside>`,一般在main中

`footer`:在网站的底部,包含著作权信息或联系方式等,对应的是`footer`

在main中,还一般会使用`<article>`来某些内容是一部分,`<section>`表示某些内容的功能是一样的

当我们找不到对应语义element时,我们使用如下的elements:

`<span>` inline,`<div>` block level

注意一般要用`class`属性为它们加上标签便于识别,且一定要避免滥用

```html
<div class="shopping-cart">
  <h2>Shopping cart</h2>
  <ul>
    <li>
      <p><a href=""><strong>Silver earrings</strong></a>: $99.95.</p>
      <img src="../products/3333-0985/thumb.png" alt="Silver earrings">
    </li>
    <li>
      ...
    </li>
  </ul>
  <p>Total cost: $237.89</p>
</div>
```

我们还有`<br>`用于让内容在新一行显示,`<hr>`用于加一条横线

```html
<p>There once was a man named O'Dell<br>
Who loved to write HTML<br>
But his structure was bad, his semantics were sad<br>
and his markup didn't read very well.</p>
```

思考网站结构可按如下步骤:

> 1.思考大多数页面需要的elements
>
> 2.画出页面粗结构
>
> 3.写出其他想要放进去的内容
>
> 4.将写出来的内容分成多组(card sorting)
>
> 5.尝试画出网站的结构图

# debug

html对语法并不严格，出现错误浏览器会做一定的补全

可以在如下网站[Ready to check - Nu Html Checker (w3.org)](https://validator.w3.org/nu/)检查错误,

或在浏览器自带的开发工具中查找错误

# 多媒体嵌入

## image

一般我们使用`<img>`来插入图片

```html
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
     width="400"
     height="341"
     title="A T-Rex on display in the Manchester University Museum">
```

其中`alt`是当图片不显示时会显示的信息,`width`,`height`调节长宽,`title`是鼠标悬停时会显示的信息,注意`title`并不被推荐(容易出错)

为了给图片显示说明,我们使用`figure`:

```html
<figure>
  <img src="images/dinosaur.jpg"
       alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
       width="400"
       height="341">

  <figcaption>A T-Rex on display in the Manchester University Museum.</figcaption>
</figure>
```

注意`alt`和下面的说明信息不能相同,不然不显示图片时会信息重复

`figure`不一定要图片,还可以加其他的东西如视频,代码片段等

如果要加装饰性的图片,使用css

## 视频和音频

在html5前，我们使用如`flash`之类的插件播放视频,但这会带来很多问题.html5里,我们可以直接引入视频文件.

```html
<video controls width="400" height="400"
       autoplay loop muted preload="auto"
       poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4">
  <source src="rabbit320.webm" type="video/webm">
  <p>Your browser doesn't support HTML video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
</video>
```

`controls`显示控制视频播放(如开始播放,调整声音等)的空间,`autoplay`让视频会自动开始播放,`loop`让视频自动循环播放,`muted`让视频默认关闭声音,`poster`为视频未播放前显示的图片

视频会自动调整自己的纵横比,如果调整`width`等只会改变控件的大小,视频的其他地方会显示黑色或其他样式

`preload`控制视频的预先加载,`none`不自动加载,`auto`自动加载,`metadata`只加载metadata

`source`用于指示视频文件,也可以直接在video中加src,不过各个浏览器支持的视频文件格式不同,故一般需要提供多个视频文件,这就需要用到source并指定`type`,type可不指定,但会让浏览器试图加载视频以找到一个可以播放的视频

`p`会在浏览器不支持`video`时显示

我们还可以使用`WebVTT`文件为视频添加字幕,它里面有不同的`cue`,`subtitles`是翻译的字幕,`captions`是视频内容的同步字幕或重要声音的介绍,`timed descriptions`是可以被播放器读出来的对重要画面的介绍

按如下方式使用此类文件

```html
<video controls>
    <source src="example.mp4" type="video/mp4">
    <source src="example.webm" type="video/webm">
    <track kind="subtitles" src="subtitles_es.vtt" srclang="es" label="Spanish">
</video>
```

其中`scrlang`为原来资源的语言,`label`表示`subtitles`的语言

`audio`为播放音频的element,除了长宽调整和`poster`,其他基本和video相同

## 其他网页内容

我们使用`iframe`来引入其他网页的内容(如油管视频)

```html
<head>
  <style> iframe { border: none } </style>
</head>
<body>
  <iframe src="https://developer.mozilla.org/en-US/docs/Glossary"
          width="100%" height="500" allowfullscreen sandbox>
    <p>
      <a href="/en-US/docs/Glossary">
         Fallback link for browsers that don't support iframes
      </a>
    </p>
  </iframe>
</body>
```

其中`allowfullscreen`会让调用的内容通过api支持全屏,`sandbox`则表明该内容使用更安全的设置,`p`和video一样,为不支持iframe时显示的文字,上面的style里面去除了调用时会显示的边框.

使用此element会带来很多安全性问题,但不需要过于担心,只需要多注意,并做些措施:

> 1.只在真的需要时使用
>
> 2.网站使用https(一般都会设置好,如果需要自己设置,看[Let's Encrypt]([Let's Encrypt (letsencrypt.org)](https://letsencrypt.org/))获取帮助)
>
> 3.记得使用`sandbox`,这可以让引入的内容只能加载必要的事物
>
> 4.在自己的网站设置好csp( *[configure your server to send an appropriate `X-Frame-Options` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)*),防止别人随意引用你的网站内容

`embde`和`object`用于嵌入需要插件支持的内容(如flash),因为插件的不便和安全性问题等,现在已经不推荐使用,如果要使用的话看下表

|                                                              | `<embda>`                                                    | `<object>`                                                   |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL) of the embedded content | [`src`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed#attr-src) | [`data`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object#attr-data) |
| *accurate* [media type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the embedded content | [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed#attr-type) | [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object#attr-type) |
| height and width (in CSS pixels) of the box controlled by the plugin | [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed#attr-height) [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed#attr-width) | [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object#attr-height) [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object#attr-width) |
| names and values, to feed the plugin as parameters           | ad hoc attributes with those names and values                | single-tag `<param>` elements, contained within `<object>`   |
| independent HTML content as fallback for an unavailable resource | not supported (`<noembed>` is obsolete)                      | contained within `<object>`, after `<param>` elements        |

## vector graphics

vector graphics比位图好的方面是放大缩小不会失真，而且在其中的文字可以直接访问，便于修改样式和使用脚本等。

不好的地方有复杂图像文件变得很大，很难制作，老浏览器不支持等。

可以直接使用img引入

```html
<img
    src="equilateral.svg"
    alt="triangle with all three sides equal"
    height="87"
    width="100" />
```

但这样使用脚本和css比较麻烦(只能在svg文件内使用css)

我们还可以这样使用

```html
<img src="equilateral.png" alt="triangle with equal sides" srcset="equilateral.svg">
```

这样不支持svg的浏览器会加载png,支持的会加载svg

我们可以直接将svg的代码放入html(inline svg)

```html
<svg width="300" height="200">
    <rect width="100%" height="100%" fill="green" />
</svg>
```

这样可以加快加载速度,更方便地使用css

但这样浏览器不能缓存它,且如果有应急代替图片,支持svg的浏览器也会下载

我们还可以使用`iframe`

```html
<iframe src="triangle.svg" width="500" height="500" sandbox>
    <img src="triangle.png" alt="Triangle with three unequal sides" />
</iframe>
```

这样只会当浏览器不支持iframe时显示fallback,但这样也会导致不能使用js操作

## responsive image

用户的设备有不同的大小和分辨率，有时我们需要根据大小显示不同的图片(art direction problem),有时我们需要根据用户的分辨率选中不同分辨率的图片(resolution switching problem),这需要借助html里面的element,因为css和js会在网页加载前加载,那是图片的element还没有加载无法控制.

解决第二个问题使用`img`的属性:

首先解决在不同尺寸下的分辨率调节

```html
<img srcset="elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 600px) 480px,
            800px"
     src="elva-fairy-800w.jpg"
     alt="Elva dressed as a fairy">
```

其中`srcset`提供供选中的图片和相应的分辨率(注意单位是w),`sizes`里面是条件和对应选中的分辨率,如果无匹配的,选中第一个比选中的分辨率大的图片,最后一个没有条件指的是无其他匹配时选中,

然后解决在相同尺寸下的分辨率调节

```html
<img srcset="elva-fairy-320w.jpg,
             elva-fairy-480w.jpg 1.5x,
             elva-fairy-640w.jpg 2x"
     src="elva-fairy-640w.jpg"
     alt="Elva dressed as a fairy">
```

其中1.5x等指的是和默认分辨率的比值,默认分辨率不用写1x

解决art direction问题,我们使用`picture`

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg">
  <source media="(min-width: 800px)" srcset="elva-800w.jpg">
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva">
</picture>
```

`media`为设备的大小条件,注意不要同时写sizes,`img`必须写,提供一个没有匹配时的图片显示选择或不支持picture时的图片选择,如果不提供则不会显示图片

# table

在网页中我们经常需要处理表格数据，于是html提高了`table`供我们使用

最简单的情况是添加一行:

```html
<table>
  <tr>
    <td>Breed</td>
    <td>Jack Russell</td>
    <td>Poodle</td>
    <td>Streetdog</td>
    <td>Cocker Spaniel</td>
  </tr>
</table>
```

其中`td`代表表格元素,`tr`代表表格的一行

接下来添加表头:

```html
<table>
  <tr>
    <th>Animals</th>
  </tr>
</table>
```

`th`的用法和`td`类似,只是代表是表头

有时我们希望我们的元素占据多行或多列:

```html
<table>
    <tr>
        <th colspan="2">Animals</th>
    </tr>
</table>
```

这样表示占据2列,类似的还有`rowspan`

对表格的一行修改样式我们可以直接在`tr`中修改,但对于一列只能一个个元素改,这显然没有效率,于是html提高了`col`:

```html
<table>
  <colgroup>
    <col>
    <col style="background-color: yellow">
  </colgroup>
  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
  <tr>
    <td>Robots</td>
    <td>Jazz</td>
  </tr>
</table>
```

这样即可修改列的样式,注意第一个`col`不能舍去,那样修改的就会是第一列而不是第二列,`col`可使用`span`元素同时修改多列样式

接下来为我们的表添加简单介绍:

```html
<table>
  <caption>Dinosaurs in the Jurassic period</caption>

  ...
</table>
```

这会显示在屏幕上,用table 的`summary`属性则不会显示在屏幕上,故我们一般使用`caption`

当表变得复杂时,我们需要加一些结构用以方便处理表的样式等属性

```html
<table>
    <thead>
        <tr>
            <th>Purchase</th>
            <th>Location</th>
            <th>Date</th>
            <th>Evaluation</th>
            <th>Cost (€)</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
            <th colspan="4">SUM</th>
            <td>118</td>
        </tr>
    </tfoot>
    <tr>
        <td>Haircut</td>
        <td>Hairdresser</td>
        <td>12/09</td>
        <td>Great idea</td>
        <td>30</td>
    </tr>
    <tbody>
        <tr>
            <td>Lasagna</td>
            <td>Restaurant</td>
            <td>12/09</td>
            <td>Regrets</td>
            <td>18</td>
        </tr>
        <tr>
            <td>Shoes</td>
            <td>Shoeshop</td>
            <td>13/09</td>
            <td>Big regrets</td>
            <td>65</td>
        </tr>
    </tbody>
</table>
```

`thead`用于表示表头,通常第一行,`tfoot`围住表的foot(通常是最后一行或总结的那一行),`tbody`则围住剩下的table的部分,如果我们没有添加这些,浏览器会默认将table的所有内容放进`tbody`

表可以嵌套,不过一般不这么干,只在确实需要时这么操作,嵌套只需要将另一个表放进`td`等element即可

对于视觉受损的人群,我们需要将表中的元素关系阐述清楚以便它们使用阅读器,除了用`th`外,我们还可以为th添加`scope`属性:

```html
<thead>
  <tr>
    <th scope="col">Purchase</th>
  </tr>
</thead>
```

这表明它是某一行或某一列的表头,当它是多行多列的表头时,`scope`里填`colgroup`或`rowgroup`

我们也可以用`id`和`headers`属性表示,这样更为清晰,不过太麻烦一般较少使用:

```html
<thead>
  <tr>
    <th id="purchase">Purchase</th>
    <th id="location">Location</th>
    <th id="date">Date</th>
    <th id="evaluation">Evaluation</th>
    <th id="cost">Cost (€)</th>
  </tr>
</thead>
<tbody>
<tr>
  <th id="haircut">Haircut</th>
  <td headers="location haircut">Hairdresser</td>
  <td headers="date haircut">12/09</td>
  <td headers="evaluation haircut">Great idea</td>
  <td headers="cost haircut">30</td>
</tr>

  ...

</tbody>
```

# form

`web forms`用于用户与网页进行交互，它有很多的`form controls(widgets)`和一些辅助的element组成,并可验证输入的数据格式(`form validation`)

## base

定义`form`:

```html
<form action="/my-handling-form-page" method="post">
	<li class="button">
      	<button type="submit">Send your message</button>
    </li>
</form>
```

其中`action`指数据送往的`url`,`method`指http请求类型.`button`的类型是`submit`,点击它即会传送数据并打开相关界面.
注意如果`form`会发送文件,我们需要设置`enctype="multipart/form-data"`,因为发送的数据会被分为多个部分,每个文件一部分,文本数据一部分,而且method需要被设置为`post`,`get`会将数据附在url中发送,这对文件显然是不可能的.而且一定要设置value.

在`form`中,我们使用`fieldset`来组合一系列widget用于同种功能,这对如`radio`之类的widget尤为重要:

```html
<form>
  <fieldset>
    <legend>Fruit juice size</legend>
    <p>
      <input type="radio" name="size" id="size_1" value="small">
      <label for="size_1">Small</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_2" value="medium">
      <label for="size_2">Medium</label>
    </p>
    <p>
      <input type="radio" name="size" id="size_3" value="large">
      <label for="size_3">Large</label>
    </p>
  </fieldset>
</form>
```

其中`legend`用与介绍`fieldset`的目的.

我们也可以使用`section`来分隔`form`,通常的写法是`section`分隔大功能,`fieldset`分隔一些小功能.

我们使用`label`对一个widget的功能进行说明:

```html
<label for="name">Name:</label> <input type="text" id="name" name="user_name">
```

也可以写成这样的格式:

```html
<label for="name">
  Name: <input type="text" id="name" name="user_name">
</label>
```

其中`for`指widget的id,后者并不需要加`for`,不过一般还是推荐加上.

`label`被点击时,对应的widget也会工作.

推荐每一个`widget`只有一个`label`.
## html5 input type
html5中引入了许多新的`input type`便于使用.
`email`用于表示输入邮箱.它会检查邮箱格式,错误的话发送数据时会报错.
可以利用`multiple`输入多个邮箱(逗号分隔):
```html
<input type="email" id="email" name="email" multiple>
```
`search`用于表示搜索框,与`text`不同的点是浏览器渲染的样式不同.有些浏览器还有自动保存搜索关键字的功能.
`tel`用于输入电话号码.
`url`用于输入链接.
`number`用于输入数字,一般输入框的旁边还会有增加减少数字的按钮.
我们可以设置最大最小值与增减数字的大小:

```html
<input type="number" name="age" id="age" min="1" max="10" step="2">
```
`step`的值可以是浮点数.
`slider`用于设置一个滑动条,它用于精确值不重要的情况.一般需要正确设置最大最小,增减值,初始值等要素:
```html
<label for="price">Choose a maximum house price: </label>
<input type="range" name="price" id="price" min="50000" max="500000" step="100" value="250000">
<output class="price-output" for="price"></output>
```
一般还会加一个`output`的element再使用js显示当前值.
html5还添加了多个可获取时间的type.
`datetime-local`用于获取年月日和当前时刻等所有信息.
`month`用于获取月份.
`time`用于获取当前时刻(返回24小时制).
`week`用于获取某年的第几周.
`date`用于获取年月日.
它们均可使用`max`,`min`,`step`等进行控制:
```html
<input type="date" name="myDate" min="2013-06-01" max="2013-08-31" step="7" id="myDate">
```
`color`用于获取颜色,一般返回6位16进制小写的信息.
## other form controls
多行输入：
```html
<textarea cols="30" rows="8">content</textarea>
```
中间的内容会作为默认值.可以放如何内容,即使是html语句也会被当初普通的字符串(可通过 [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)修改).
它有三个控制多行显示的attributes:
- `cols`,控制显示的宽度,值为一个正整数,单位为平均字符宽度,默认是20.
- `rows`,显示的行数,默认为2.
- `wrap`,控制换行,默认为`soft`,显示换行而发送的数据不换行,`hard`都都换行,`off`为都不换.
我们还可以通过`resize`控制它是否可以通过拖动右下角改变大小:
-   `both`: 默认,水平垂直都可以改变.
-   `horizontal`: 仅水平.
-   `vertical`: 仅垂直.
-   `none`: 不可以改变.
-   `block` and `inline`: 在block或inline的方向可以改变,实验性的值.
我们可以通过`select`生成一个有下拉菜单选择的control:
```html
<select id="simple" name="simple">
  <option>Banana</option>
  <option selected>Cherry</option>
  <option>Lemon</option>
</select>
```
默认值通过在`option`填上`selected`属性来设置.
通过`optgroup`来将`option`分组:
```
<select id="groups" name="groups">
  <optgroup label="fruits">
    <option>Banana</option>
    <option selected>Cherry</option>
    <option>Lemon</option>
  </optgroup>
  <optgroup label="vegetables">
    <option>Carrot</option>
    <option>Eggplant</option>
    <option>Potato</option>
  </optgroup>
</select>
```
`option`可以使用`value`属性来控制被选中时发送的数据.默认会将它包裹的内容作为`value`.
默认该control只显示一行,可以使用`size`来显示多行,值即为显示的行数.
添加`mutiple`允许用户选中多个.
`datelist`可以被用来为`input`添加自动补全的内容:
```html
<label for="myFruit">What's your favorite fruit?</label>
<input type="text" name="myFruit" id="myFruit" list="mySuggestion">
<datalist id="mySuggestion">
  <option>Apple</option>
  <option>Banana</option>
  <option>Blackberry</option>
  <option>Blueberry</option>
  <option>Lemon</option>
  <option>Lychee</option>
  <option>Peach</option>
  <option>Pear</option>
</datalist>
```
在不支持`datalist`的浏览器可以通过在它中间添加`label`和`select`来处理,支持的浏览器会忽略`select`等有正常的补全,不支持的则会显示它们.
它偶尔还会被用于一些特殊的用途,如让`input-range`有确定的值供点选,`input-color`有初始的自定义颜色.
`progress`用于显示和`max`相比的比例:
```html
<progress max="100" value="75">75/100</progress>
```
`meter`用于显示值处理哪里范围,`min`和`low`之间为lower,`low`和`high`之间为`medium`,`high`和`max`之间为higher.
然后我们定义`optinum`,即最优值.
-   若它在lower,则 the lower range 为preferred part, the medium range为the average part, and the higher range 为 worst part.
-  若在medium, the lower 为 average, the medium为preferred,higher range is 为average.
-   若在 higher,  lower =>worst part, medium=>average part , higher=>preferred part.
一般而已,preferred时显示绿色,average时显示黄色,worst时显示红色.
`progress`和`meter`包裹的内容会作为不支持浏览器的显示或屏幕阅读器的读取部分.
## Client-side form validation
在发送数据前，我们需要对用户的数据进行验证,看看是否符合规范.
html5提供了很多个attribute来验证:
-   [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required): 标出哪个control的数据是必须的.
-   [`minlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength) and [`maxlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength): 输入数据的长度的最小长度或最大长度.在实践中一般只指定后者.
-   [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) and [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max): 对于数字输入,指定最小值最大值.注意旁边的增减按钮也会被限定在此范围.
-   `type`: 指定数据必须符合的类型.
-   [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern): 使用正则表达式指定数据必须符合的规范.注意`textarea`不支持.

