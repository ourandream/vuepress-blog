---
title: css
category: front-end
abbrlink: 78cea6d8
date: 2021/12/23 18:23:20
updated: 2021/12/23 18:23:20
---
对MDN web docs中[css](https://developer.mozilla.org/en-US/docs/Learn/CSS)的学习的个人总结.
<!--more-->

# base

css的基本语法如下：

```css
h1 {
    color: red;
    font-size: 5em;
}
```

`h1`是selector,即我们想要修改样式的html element,大括号里面是一对对`property`和`value`(css declaration),用以对element的某个特性进行修改

selector和css declaration和大括号一起被叫做css rulesets

css中有很多可以修改`property`,它们被分为一个个`modules`用以区分,这在命名中有所体现(如[`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color)).

css的value也可以是函数:

```css
.outer {
  border: 5px solid black;
}

.box {
  padding: 10px;
  width: calc(90% - 30px);
  background-color: rebeccapurple;
  color: white;
}
```

这个会设置宽度为%90,最小30px

想修改多个的话：

```css
p, li {
    color: green;
}
```

浏览器一般会给element一些默认样式,我们可以修改或关闭这些样式:

```css
li {
  list-style-type: none;
}
```

当我们修改的不是特定的element,而是经过class指定的element时:

```css
.special {
  color: orange;
  font-weight: bold;
}
```

这样就可以修改所有class为special的element了

我们还可以指定某一类element中的class:

```css
li.special {
  color: orange;
  font-weight: bold;
}
```

这样只会修改li中的special

我们还可以通过element的相对位置来修改element:

```css
li em {
  color: rebeccapurple;
}
```

这个会修改在li中的`em`(descendant combinator)

```css
h1 + p {
  font-size: 200%;
}
```

这个会修改在紧跟在h1后的`p`(adjacent sibling combinator)

一个element通常有不同的`state`(如链接被点击时,鼠标悬停时),css也可以指定`state`来修改样式:

```css
a:link {
  color: pink;
}

a:visited {
  color: green;
}
```

`selector`和`combinator`可以按上面的方式杂在一起使用:

```css
body h1 + p .special {
  color: yellow;
  background-color: black;
  padding: 5px;
}
```

css的使用有三种方式：

`External stylesheet`:

```html
<link rel="stylesheet" href="styles/style.css">
```

`Internal stylesheet`(放在head中):

```html
<style>
    h1 {
        color: blue;
        background-color: yellow;
        border: 1px solid black;
    }

    p {
        color: red;
    }
</style>
```

`Inline styles`(需避免使用):

```html
<h1 style="color: blue;background-color: yellow;border: 1px solid black;">Hello World!</h1>
```

当对同个element有多个可应用的stylesheet时,有一定规则:

```css
p {
  color: red;
}

p {
  color: blue;
}
```

这个后面那个会应用,css会应用后有作用的

```css
.special {
  color: red;
}

p {
  color: blue;
}
```

前面那个会应用,因为前面的`specificity`较高

`@rules`用于设置css的应用规则,如:

```css
@import 'styles2.css';
```

它引入了另一个css文件

```css
body {
  background-color: pink;
}

@media (min-width: 30em) {
  body {
    background-color: blue;
  }
}
```

这个会在宽度满足条件时设置body的背景色

有些`properties`可以在一行设置多个value,被称为`shorthand properties`:

```css
/* In 4-value shorthands like padding and margin, the values are applied
   in the order top, right, bottom, left (clockwise from the top). There are also other
   shorthand types, for example 2-value shorthands, which set padding/margin
   for top/bottom, then left/right */
padding: 10px 15px 15px 5px;
```

如果后面的没有设置值,那它就是默认值

同时我们也看到了css的注释如何写,和c++的注释一样

css中的空格一样和html会被忽略,但注意不要给`properties`和`value`的中间加空格

# cascade and inheritance

`cascade`指css应用规则的规则,上面已经有简单的介绍(后到优先,specificity高优秀),

`cascade`会按如下顺序应用(降序):

1. **Source order**
2. **Specificity**
3. **Importance**

`specificity`的计算较为复杂,基本的逻辑是每个selector有一个数量级的specificity,将某个ruleset里面的specificity相加得到整个的specificity,高的会被使用,但如果相差一个数量级,即使累计值更高,仍是高数量级的先应用.

| 数量级    | selector                     |
| --------- | ---------------------------- |
| thousands | inline style(\<style\>)      |
| hundreds  | ID selector                  |
| tens      | class attribute pseudo-class |
| ones      | element pseudo-element       |

其他如combinators对值无影响.

如**h1 + p::first-letter**,它的`specificity`为0003(三个ones)

如果我们想让某个`property`直接是最特殊的,使用`!important`:

```css
.better {
    background-color: gray;
    border: none !important;
}
```

这样就会直接应用它了,但应该尽量避免使用

有矛盾的declaration的应用顺序如下:

1. Declarations in user agent style sheets (e.g. the browser's default styles, used when no other styling is set).
2. Normal declarations in user style sheets (custom styles set by a user).
3. Normal declarations in author style sheets (these are the styles set by us, the web developers).
4. Important declarations in author style sheets
5. Important declarations in user style sheets

`inheritance`则是指有些父`element`的性质会被继承到子`element`中,只有重新设置才会改变有些不会.

会不会继承一般和常识相符,如像 widths , margins, padding, and borders 都不会继承.

我们使用四个特殊的值来控制继承:

| ---     | 功能                                       |
| ------- | ------------------------------------------ |
| inherit | 打开继承                                   |
| initial | 将值设为初始值                             |
| unset   | 将值设为为进行设置时的值(有时初始有时继承) |
| revert  | 将值设为浏览器的默认样式                   |

例子:

```css
.my-class-1 a {
    color: inherit;
}
```

有时我们会将上述特殊值用在shorthand property `all`上,对改`element`的所有properties应用:

```css
.fix-this {
    all: unset;
}
```



# selector

接下来对selector进行深入的了解

## type class id

type

```
h1 { }
```

universal selector

```css
* {
    margin: 0;
}
```

它会对整个文档起作用(或某个`element`中的所有元素),有时它还会被使用来增加可读性(如用`article *:first-child`代替`article :first-child`避免和`article:first-child`混淆)

class:

```
.box { }
```

如果我们希望选中多个class的组合:

```css
.notebox {
  border: 4px solid #666;
  padding: .5em;
}

.notebox.warning {
  border-color: orange;
  font-weight: bold;
}

.notebox.danger {
  border-color: red;
  font-weight: bold;
}
```

这样下面那两行只有在跟class="notebox danger"`类似的情况才能使用

ID:

```
#unique { }
h1#heading {
    color: rebeccapurple;
}
```

它每页文档只能被使用一次

## attribute

Attribute selectors

| Selector        | Example                         | Description                                  |
| :-------------- | :------------------------------ | :------------------------------------------- |
| `[attr]`        | `a[title]`                      | 匹配有该attribute的                          |
| `[attr=value]`  | `a[href="https://example.com"]` | 匹配有该attribute的且值也匹配的              |
| `*attr~=value]` | `p[class~="special"]`           | 匹配有该attribute的且值中有对应的值的        |
| `[attr|=value]` | `div[lang|="zh"]`               | 匹配有该attribute的且以值为里头的值加-开头的 |
| `[attr^=value]` | `li[class^="box-"]` | 匹配有该attribute的且以值value开头的 |
| `[attr$=value]` | `li[class$="-box"]` | 匹配有该attribute的且以值value结尾的 |
| `[attr*=value]` | `li[class*="box"]`  | 匹配有该attribute的且以值含有value的 |

如果我们相要让值的选中区分大小写,使用`i(li[class^="a" i] )`

pseudo-class(选择特定的state),它工作就像加了特定的class

```
a:hover { }
```

pseudo-elements(选定element的一部分)，就像加了一个element

```
p::first-line { }
```

我们有时会用它的`::before`,`::after`来使用css插入内容到网页中:

```css
.box::before {
    content: "This should show before the other content."
}   
```

一般不用于插入文字,而是插入icon,或者插入一个空格后像编辑一个正常的element一样编辑:

```css
.box::before {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: rebeccapurple;
    border: 1px solid black;
}   
```

## combinators

descendant combinator

```
article p { }
```

选择第一个的子element中的第二个,注意是所有子element

child combinator

```css
article > p
```

选择第一个的直接子element中的对应element,即只选择第一层的子element

adjacent sibling combinator

```css
p + img
```

选择与第一个直接相邻的第二个类型的element

general sibling combinator

```css
p ~ img
```

选择与第一个相邻的第二个类型的element,即使不直接相邻也会起作用.

实际使用时,我们尽量不要使用太复杂的selector,对复用性和可读性等都有一定的损害.

# box model

一个html element可以看作被放在一个`box`中:

![Diagram of the box model](https://cdn.jsdelivr.net/gh/ourandream/blog_images@master/blogs/box-model.618f5usexe80.png)

box初略来说可以分为两种:

block box

> 1.出现在新行
>
> 2.在行的位置会拓展延申占据所有可占据的空间
>
> 3.可使用width,height
>
> 4.Padding, margin and border会导致其他element被推开

inline box

> 1.不出现在新行
>
> 2.不可使用width,height
>
> 3.Padding, margin and border只会导致水平方向其他element被推开

它们都有被定义成 outer display type(inner改变的是element元素里的元素摆放):

```css
.inline {
  display: inline;
}
```

有时我们想要element可以占据独立的空间,又不想换行,还可以使用:

```css
span {
  display: inline-block;
}
```

这样就会在不换行的情况下支持长宽修改,且修改相应property会推开其他element

默认使用standard css box model,此时改变width和height改变的是content box的属性,但这样计算整个box的大小需要加上padding,border的大小,上下左右都要(注意margin不被算在其中).我们可以使用alternative css box model,此时width等就修改的是整个box的大小,content的大小会由这个的大小减去padding,border的大小得到:

```css
.box {
  box-sizing: border-box;
}
```

对整个html文件应用:

```css
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

margin可通过直接的shorthand property修改,也可通过加-修改top,left等具体位置,它的值可正可负:

```css
.box {
  margin-top: -40px;
  margin-right: 30px;
  margin-bottom: 40px;
  margin-left: 4em;
}
```

margin的一个重要概念是margin collapsing.当两个elements的margin相遇时,它们会融合到一起.当它们的值都为正时,去较大的那个.当一正一负时,正-负得到最终的值,当全为负时,去最小的负值.

`border`同样有对应的shorthand property和具体的property,border还可以修改width,style和color:

```css
.container {
  border-top: 5px dotted green;
  border-right: 1px solid black;
  border-bottom: 20px double rgb(23,45,145);
}

.box {
  border: 1px solid #333333;
  border-top-style: dotted;
  border-right-width: 20px;
  border-bottom-color: hotpink;
  border-bottom-height:20px;
}
```

`padding`和`margin`类似,不同的是它没有collapsing,值只能为0或正值.

# background and borders

`background-color`:

```css
.box {
  background-color: green;
}
span {
  background-color: rgba(255,255,255,.5);
}
```

改变content and padding box的背景颜色

`background-image`:

```css
.a {
  background-image: url(balloons.jpg);
}
```

添加背景图片,如果图片较大则默认只显示一部分,图片较小则默认会重复以填满背景.图片会在显示颜色之上.

当图片较小时,我们可以指定如何重复:

```css
.box {
  background-image: url(star.png);
  background-repeat: repeat-y;
}
```

`repeat-x`在水平方向重复,`repeat-y`在垂直方向,`repeat`是默认值,在两个方向都重复;`no-repeat`为不重复.

当图片较大时,我们可以修改它的尺寸:

```css
.box {
  background-image: url(balloons.jpg);
  background-size: cover
}
```

`background-size`可以带两个值(length or percentage)来指定长宽,或者为`cover`(保证长宽比的同时填满背景,图片可能有一部分不显示)或`contain`(保证长宽比的同时尽量填满背景,背景可能有一部分空缺).

我们还可以通过`background-position`来修改背景图片的位置,它一般带两个值,默认为(0,0)

我们可以使用如`top`等的值:

```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: top center;
}
```

我们也可以使用长度比例来指定:

```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: 20px 10%;
}
```

它们可以被混着使用,但这样第一个必须表示水平方向,第二个必须表示垂直方向:

```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: 20px top;
}
```

我们还可以使用四个值:

```css
.box {
  background-image: url(star.png);
  background-repeat: no-repeat;
  background-position: top 20px right 10px;
}
```

这样它会相对于top偏移20px,相对于right偏移10px

我们还可以使用渐变来做背景:

```css
.a {
  background-image: linear-gradient(105deg, rgba(0,249,255,1) 39%, rgba(51,56,57,1) 96%);
}
```

我们可以插入多张图片(逗号分割)做背景:

```css
.a{
background-image: url(image1.png), url(image2.png), url(image3.png), url(image4.png);
background-repeat: no-repeat, repeat-x, repeat;
background-position: 10px 20px,  top right;
}
```

第一个图片会显示在最上层,以此类推.

当下面如`background-repeat`等的数目小于背景图的数目时,我们会重复应用那些值(如在repeat后使用no-repeat,如何是repeat-x).

我们使用`background-attachment`来控制背景图片和页面滚动的关系,当值为`scroll`时,它会跟着页面滚动,当为`fixed`时,它不会跟着页面滚动,一直固定,且会填满整个元素(当日相应的element消失后也会消失),当为`local`时,它不仅跟页面滚动,元素内滚动也会滚动.

我们使用`background`这个shorthand property来简便地修改背景,只需要注意几点:

> 1.逗号分隔值.
>
> 2.颜色的值放最后.
>
> 3.position和size需相应,写成如center/80%的形式

`border`同样有对应的shorthand property和具体的property,border还可以修改width,style和color(注意设置width不设置style不会显示border):

```css
.box {
  background-color: #567895;
  border: 5px solid #0b385f;
  border-bottom-style: dashed;
  color: #fff;
}
```

`border`还可以修改边角的圆角值,有两个长度比例值,分别为水平垂直的对应值,如果只写一个则会被应用到两个中去:

```css
.box {
  border-radius: 10px;
}
.box {
  border-top-right-radius: 1em 10%;
}
```

# text direction

文本的方向被叫做`writing-mode`,有三个值:

- `horizontal-tb`: Top-to-bottom block flow direction. Sentences run horizontally.
- `vertical-rl`: Right-to-left block flow direction. Sentences run vertically.
- `vertical-lr`: Left-to-right block flow direction. Sentences run vertically.

默认是第一个.

当修改这个时,block和inline的方向也会被修改,此时再使用如width,top等会出现问题,故此时我们可以使用logic properties and values:

> width &#8594; inline-size
>
> height &#8594; block-size
>
> margin-top &#8594; margin-block-start

默认block的方向是垂直,inline的方向是水平,对应着修改即可.

这是新出的标准添加的,改变`writing mode`尽量使用避免出错.

# overflowing content

有时内容会overflow，即box太小不足放下内容，内容跑到box外面了。

css默认会让overflow可视化以避免数据顺势,外面可以通过`overflow`来进行控制:

```css
.box {
  border: 1px solid #333333;
  width: 200px;
  height: 100px;
  overflow: hidden;
}
```

这样overflow的内容就会被隐藏了.

外面还可以添加滚动条:

```css
.box {
  border: 1px solid #333333;
  width: 200px;
  height: 100px;
  overflow: scroll;
}
```

这样用户可以通过滚动条看到overflow的内容了.

overflow是可带两个值,一个给`overflow-x`,一个给`overflow-y`,当日也可以单独设置它们:

```css
.box {
  border: 1px solid #333333;
  width: 200px;
  height: 100px;
  overflow-y: scroll;
}
```

这样只会在y方向显示滚动条

在x方向自然也可以,但如果是因为字太大导致overflow,不推荐用此种方式解决.

外面还可以让浏览器根据内容决定是否显示滚动条:

```css
.box {
  border: 1px solid #333333;
  width: 200px;
  height: 100px;
  overflow: auto;
}
```

如果使用了`auto`或`scroll`,我们说我们建立了`block formatting context`,即内容不可超过box,且有滚动条控制内容.

# values and units

css中的`value type`指一类值的集合.

| Data type      | Description                                                  |
| :------------- | :----------------------------------------------------------- |
| `<integer>`    | 整数                                                         |
| `<number>`     | 十进制小数                                                   |
| `<dimension>`  | \<number\>加单位,包括`<length>`,`<angle>`,`<time>`,`<resolution>` |
| `<percentage>` | 相对于其他值的百分比.                                        |

`<length>`的单位有绝对和相对,绝对单位大部分多用于打印,我们一般只用`px(pixel)`,相对单位如下:

| Unit   | Relative to                                                  |
| :----- | :----------------------------------------------------------- |
| `em`   | Font size of the parent, in the case of typographical properties like `font-size`, and font size of the element itself, in the case of other properties like `width`. |
| `ex`   | x-height of the element's font.                              |
| `ch`   | The advance measure (width) of the glyph "0" of the element's font. |
| `rem`  | Font size of the root element.                               |
| `lh`   | Line height of the element.                                  |
| `vw`   | 1% of the viewport's width.                                  |
| `vh`   | 1% of the viewport's height.                                 |
| `vmin` | 1% of the viewport's smaller dimension.                      |
| `vmax` | 1% of the viewport's larger dimension.                       |

其中viewport指浏览器的视窗大小.

`percentage`一般是指占该element的父element对应值的百分比.

一个用`<number>`的例子是`opacity`(控制不透明度),值在0-1之间.

`<color>`可用keyword如red,blue,也可以用十六进制数代表rgb值,如\#02798b,还可以用函数:

```css
.one {
  background-color: rgb(2, 121, 139);
}
```

控制rgb值还有rgba()这个函数,最后的参数控制不透明度(0-1).

还有其他颜色标准的函数如hsl.

`<image>`表示可以用图片作为值,一般用`url()`函数加上地址来使用.

`<position>`表示2d坐标,可带两个坐标值,也可使用`top`, `left`, `bottom`, `right`, and `center`这些keywords,还可以使用keyword加`<length>`表示偏移值(key,num,key,num).

上面提到的keywords被称为`identifiers`,可不带",如果要使用正常的string的话,腰带''.

function还有一个`calc()`可用于进行数学计算:

```css
.box {
  width: calc(20% + 100px);
}
```

# sizing items

一般一个element会有一个`intrinsic size`,即内在大小(`<div>`根据内容自动生成此大小,若无内容则无).当我们通过如`width`等修改大小后,修改完的大小叫`extrinsic size`,即外来的大小.

当我们使用百分比时,一般都会是父element相应的property的值的大小,但`margin`和`padding`的大小会是该box的`inline size`的大小.

我们还可以指定最大最小大小(如`max-height`),指定最大通常是为了让图片不会超出视界,此时图片会等比例缩放.当注意,不要用这样的方法将大图片缩放来使用,这样会让网站加载变慢,还会浪费用户的带宽.

我们有时也使用`viewport`(即浏览器显示网站区域)的大小来修改大小,具体看上面values里的介绍.

# image media and form element

image,video都属于`replaced element`,css不可影响它们的internal layout.

当它们太大时,我们可以利用`max-width`来控制它们在box中:

```css
img {
  max-width:100%;
}
```

也可以使用`object-fit`,它有contain(保持比例尽量填满box,可能填不满),cover(保持比例填满box,可能一部分确实),fill(填满box,不保持比例)等值.

它们在layout中有不同的初始行为.

对于form element修改如下:

```css
input[type="text"],
input[type="email"] {
  border: 2px solid #000;
  margin: 0 0 1em 0;
  padding: 10px;
  width: 100%;
}
```

# styling table

首先添加一些空间，处理layout：

```css
/* spacing */

table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 3px solid purple;
}

thead th:nth-child(1) {
  width: 30%;
}

thead th:nth-child(2) {
  width: 20%;
}

thead th:nth-child(3) {
  width: 15%;
}

thead th:nth-child(4) {
  width: 35%;
}

th, td {
  padding: 20px;
}
```

`table-layout: fixed`可让列的大小由headings的大小决定,而不是根据内容决定,这样可让table的大小更可预测,控制.

`thead th:nth-child(4)`用于处理第n个heading的大小,用比例以便适配不同大小的viewport.

` border-collapse: collapse;`让里头的表格的border之间不会有多余的空白.

最后添加了一定padding让表格不那么紧凑,便于阅读.

关于里面的内容,可以添加字体来美化,同时最后将`td`等的`text-align`进行调整以和heading对齐.

我们可以通过添加斑马线让不同的行可读性更高:

```css
/* zebra striping */

tbody tr:nth-child(odd) {
  background-color: #ff33cc;
}

tbody tr:nth-child(even) {
  background-color: #e495e4;
}

tbody tr {
  background-image: url(noise.png);
}

table {
  background-color: #ff33cc;
}
```

`nth-child`支持表达式如2n,even等keyword跟填入相应的表达式起同样的作用

对于caption,需要知道的是我们还可以通过`caption-side: bottom;`,调整captain的位置,如调到下方.

# text and font styling

对于字的美化,css中的properties大致可分为两类:

> 1. 字体的style
>
> 2. ltext ayout的style

## font

首先显而易见的是我们可以用`color`来修改字的颜色.

我们也可以通过`font-family`来修改字体类型:

```css
p {
  font-family: arial;
}
```

它可以带多个值(逗号分隔),浏览器只使用一个,它会从头开始一个个查看是否支持,支持就使用,如果都不支持就使用浏览器的默认字体.

`web safe fonts`指一类在大部分的计算机系统都受支持的字体,推荐使用这些字体.

css定义了五个一般的名字给字体:

| Term         | Definition                                                   |
| :----------- | :----------------------------------------------------------- |
| `serif`      | Fonts that have serifs (the flourishes and other small details you see at the ends of the strokes in some typefaces) |
| `sans-serif` | Fonts that don't have serifs.                                |
| `monospace`  | Fonts where every character has the same width, typically used in code listings. |
| `cursive`    | Fonts that are intended to emulate handwriting, with flowing, connected strokes. |
| `fantasy`    | Fonts that are intended to be decorative.                    |

在`font-family`的最后一般要带一个上面的字体保证有字体可用.

```css
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

注意如果字体名字有多个词,要加双引号.

我们使用`font-size`来控制字体的大小.为了方便控制,我们一般会将`html`的该property设为10px以便使用`rem`.

`font-style`用于控制斜体字是否开启,很少使用.它有三个值,normal是关闭,italic是开启,oblique是将字体倾斜得到一个类斜体.

`font-weight`用于控制字体的宽度.它有很多值,但除了normal正常字体,bold加粗外,其他很少使用.其他还需要了解的值有lighter,bolder,用于减少或增加加粗效果,还可用100-900的值控制加粗效果.

`text-transform`用于控制文本的转换,值有:

- `none`: 不转换
- `uppercase`:全大写.
- `lowercase`: 全小写.
- `capitalize`: 首字母大写.
- `full-width`: 所有字站一个固定大小的格,效果类似monospace font.

`text-decoration`用于控制对文字的修饰,值如下:

- `none`: 无效果.
- `underline`:下划线.
- `overline`: 上划线.
- `line-through`:删除线.

它可以带多个值,应用多个效果,也可以作为 [`text-decoration-line`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line), [`text-decoration-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style), and [`text-decoration-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color)的shorthand property.

`text-shadow`用于控制字的阴影:

```
text-shadow: 4px 4px 5px red;
```

它的第一个值是阴影的水平偏移,正向右负向左.

第二个值是垂直偏移,除偏移方向变上下外其他和第一个相同.

第三个是 blur radius,值越高阴影越发散.

第四个是阴影颜色.

我们可以对文本添加多个阴影(逗号分隔):

```css
h1 {
  text-shadow: 1px 1px 1px red,
               2px 2px 1px red;
}
```

## text layout

`text-align`用于控制文本摆放位置,值如下:

- `left`: 摆放在左.
- `right`: 摆放在右.
- `center`: 摆放在中间.
- `justify`: 自适应让所有行的宽度一致,谨慎使用.

`line-height`用于控制每行的高度,它的值可以是带单位的数,也可以是不带单位的数,不带单位的数代表该数乘以字体大小的值,它更被推荐使用.

```css
p {
  line-height: 1.6;
}
```

一般取1.5-2.

`letter-spacing`和`word-spacing`用于控制字和单词之间的间距:

```css
p::first-line {
  letter-spacing: 4px;
  word-spacing: 4px;
}
```

css还有一个shorthand properties,`font`,它必须按[`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style), [`font-variant`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant), [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight), [`font-stretch`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch), [`font-size`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size), [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height),  [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)的顺序来放值.

在使用时,只有`font-size`和`font-family`是必须的.

`font-size`和`line-height`之间需要加/.

例子如下:

```css
p{
    font: italic normal bold normal 3em/1.5 Helvetica, Arial, sans-serif;
}
```

## styling list

处理list相关的空白，我们需要让list的上下空与环绕它的元素一致(vertical rhyme),我们同样需要让它们的内部水平间隔也一致(如控制字的大小).

我们还需要知道三个property:

- [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type): 改变每个li的头的形状,也可让它不显示.
- [`list-style-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position):改变bullet的位置,让它在表外(outside)或表内(inside),如果在表内则内容换行不会自动空出bullet的空间.
- [`list-style-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image): 用图片做bullet,不推荐使用,更推荐如下的用法:

```css
ul {
  padding-left: 2rem;
  list-style-type: none;
}

ul li {
  padding-left: 2rem;
  background-image: url(star.svg);
  background-position: 0 0;
  background-size: 1.6rem 1.6rem;
  background-repeat: no-repeat;
}
```

这样可以用background的相关properties进行更多的控制.

关于list style有一个shorthand property`list-style`,它就是上面三个property的集合,可以使用一个或多个.如果同时使用了图片和形状,则形状只会在图片失效时被使用.

## styling linking

首先了解一下link的各种状态：

- **Link**: 有目的地的link.
- **Visited**:已经被访问过的link.
- **Focus**: focus在link上时.
- **Hover**: 鼠标放在link上时.
- **Active**: 当用户使用link进行跳转时.

默认情况下,link会:

- 有下划线
- 未访问为蓝色.
- 访问后为紫色.
- 鼠标放在上面时会改变形状.
- foucus时边上会有一圈outline(类似边框,但不占页面位置).
- 被使用跳转时呈红色.

我们不能让我们的link和默认差得太远,只是要让link本身显眼,而且在不同状态下有不同的样式以便区分.

我们通过如下三个properties来修改默认样式:

- [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color)  文本颜色.
- [`cursor`](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) 鼠标样式,尽量不要修改.
- [`outline`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) 修改outline.

写css时需严格按如下顺序(不然会不起作用):

```css
a {

}

a:link {

}

a:visited {

}

a:focus {

}

a:hover {

}

a:active {

}
```

有时我们会用修改border-bottom来制造类似下划线的效果,这样做的好处是更多变且不会和字重叠.

我们有时也为link添加icon来区分不同的link:

```css
a[href*="#"] {
  background: url('external-link-52.png') no-repeat 100% 0;
  background-size: 16px 16px;
  padding-right: 19px;
}
```

注意`padding-right`,这样就不会和内容重叠了,且上面也把图片设到了最右边,同样为了不和内容重叠.

我们还经常把link做成一个个按钮,并弄成无序表,此时我们会遇到不同的li之间有多出的空白的问题(inline block的问题).此时可以通过把margin设为负等方法解决.

## web fonts

web fonts即我们可以通过提供字体文件供用户下载来使得字体可用.

首先找字体,有些字网站提供体是需要付费的,有些是免费的(如[Font Squirrel](https://www.fontsquirrel.com/)),我们使用时需要注意它的license.

找到后下载字体文件,通常是一个压缩包里多个字体文件(otf或ttf).

如何在该网站提供的工具(如 [Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator))上上传字体文件,生成`.woff`, `.woff2`文件和css代码,将起放到网站的相应目录并复制相应的css代码.

`@font-face`详解如下:

```css
@font-face {
  font-family: 'zantrokeregular';
  src: url('zantroke-webfont.woff2') format('woff2'),
       url('zantroke-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
```

- `font-family`:字体名字.
- `src`: 字体文件路径和格式,注意复制代码后一定要注意路径是否正确.更想要被应用的格式应该写在前.
- [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)/[`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style): 该字体对于的`font-weight`和`font-style`,这样可区分同个名字的字体.

我们也可以使用在线的字体服务,同样付费或免费( [Google Fonts](https://www.google.com/fonts)),按网站的要求复制想要的html和css代码即可.

# layout

## normal flow

当没有任何对layout的修改时,我们使用normal flow来处理不同element在viewport上的显示.

每一个element可以看成一个box.

box初略来说可以分为两种:

block box

> 1.出现在新行
>
> 2.在行的位置会拓展延申占据所有可占据的空间
>
> 3.可使用width,height
>
> 4.Padding, margin and border会导致其他element被推开

注意block产生新行的方向是根据writing mode产生的,默认是从上到下垂直.

inline box

> 1.不出现在新行
>
> 2.不可使用width,height
>
> 3.Padding, margin and border只会导致水平方向其他element被推开

它们都有被定义成 outer display type(inner改变的是element元素里的元素摆放):

```css
.inline {
  display: inline;
}
```

有时我们想要element可以占据独立的空间,又不想换行,还可以使用:

```css
span {
  display: inline-block;
}
```

这样就会在不换行的情况下支持长宽修改,且修改相应property会推开其他element.

margin的一个重要概念是margin collapsing.当两个elements的margin相遇时,它们会融合到一起.当它们的值都为正时,去较大的那个.当一正一负时,正-负得到最终的值,当全为负时,去最小的负值.

## flexbox

`flexbox`是一维的layout,它可以从行或列的角度安排elements.

使用:

```css
{
    display:flex;
}
```

这样的话,声明的那个element会变成`flex container`,它里面的element会变成`flex items`,`flex container`表现为一个普通的block level element(如果使用`inline-flex`则是inline),它里面的elements则会按行或列排列.

`flex container`的内部结构如下:

![flex container](https://cdn.jsdelivr.net/gh/ourandream/blog_images@master/blogs/flex_terms.4opyqu66an00.png)

`main axis`指排列elements的方向,`cross axies`则是垂直于main axis的方向,它们都有对应的start,end.`flex   item`还有对应的size.

默认main axis是row,我们可以修改:

```css
{
    flex-direction: column;
}
```

我们同时还可以使用`row-reverse` and `column-reverse`交换start,end.

如果`flex item`有固定的大小,可能导致内容超出container,此时我们可以使用:

```css
{
    flex-wrap: wrap;
}
```

这样多出的会放到下一行或下一列.

上述两个properties有一个shorthand property:

```css
{
    flex-flow: row wrap;
}
```

我们可以灵活地控制`flex item`的大小:

```css
article {
  flex: 1;
}
```

该值代表里面的`flex item`相对于其他的`flex item`的大小,如果我们此时:

```css
article:nth-of-type(3) {
  flex: 2;
}
```

这样第三个`flex item`会是前两个的两倍大小.

我们还可以设置最小的大小:

```css
article {
  flex: 1 200px;
}

article:nth-of-type(3) {
  flex: 2 200px;
}
```

这样,`flex item`首先会是200px,然后再根据其他的`flex item`决定是否增加.

`flex`实际是一个shorthand property,我们上面提到的两个property是`flex-grow`和`flex-basis`,它还有一个`flex-shrink`,放在第二位,值也是一个无单位的数.它是指如果container放不下时`flex item`会缩减到其他的多少以避免溢出.

我们推荐使用shorthand property.

我们还可以安排`flex items`的位置:

```css
div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
```

`align-items`安排它们在cross axis的位置,默认是`stretch`,即填满.`center`指的是保持原来的大小的同时放中间.

除此之外还有`flex-start`,`flex-end`等值放在start或end位置.

`justify-content`控制它们在main axis的位置,默认是`flex-start`,除此之外还有`flex-end`,`center`等值同上.

`space-around`则是在每一个flex item的附件添加一些空白,包括头尾,`space-between`则只在flex items之间添加空白,不包括头尾.

我们还可以安排`flex item`的顺序:

```css
button:first-child {
  order: 1;
}
```

`order`的默认值是0,越高则会排得越后,它可以是负值.当值相同时,按html源代码的顺序排列.

flexbox可嵌套.

## grids

grids是一种二维的layout.它有行和列,行或列之间的空格被称为`gutter`.

![grid](https://cdn.jsdelivr.net/gh/ourandream/blog_images@master/blogs/grid.7i05qgtu960.png)

它的使用如下:

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px;
}
```

默认情况下它的表现和normal flow一致,所以我们使用`grid-template-columns`为它创建列,它的值可以是百分比,带单位的数.对于grids,有一个特殊的单位叫`fr`指grid container的可用空间的一份:

```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
```

这样可自动安排大小.

然后我们可以在行列间添加空白:

```css
.container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 20px;
}
```

使用repeat函数简化书写:

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

上面的gap是column-gap和row-gap的shorthand property.

grid有`explicit grid`和`implicit grid`之分,`explicit grid`指我们给定大小模板的grid,`implicit grid`则是与模板垂直的grid,即我们给定了行的话,列就是`explicit grid`.

默认情况下它会按内容的大小自动分配,不过我们也可以指定大小:

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
  grid-gap: 20px;
}
```

我们可以使用`minmax`函数指定最大最小:

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 20px;
}
```

其中auto指最大值按内容自动指定,这样该函数就变成了指定最小值的函数.

如果我们想得到尽可能多的列,可在repeat函数中使用`auto-fill`:

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
}
```

当我们想处理grid container中的element的位置时,我们可以使用`line-based placement`,即通过grid的线来安排,grid的线从1开始,根据writing mode的方向从start到end.

```css
header {
  grid-column: 1 / 3;
  grid-row: 1;
}

article {
  grid-column: 2;
  grid-row: 2;
}

aside {
  grid-column: 1;
  grid-row: 2;
}

footer {
  grid-column: 1 / 3;
  grid-row: 3;
}
```

其中grid-column是`grid-column-start`和`grid-column-end`的shorthand property,另一个同理.这样如header就会从第一条线到第三条线,注意使用时用`/`分隔.

我们可以使用负数,这样指从end开始算线.

我们也可以使用`grid-template-areas`来安排位置:

```css
.container {
  display: grid;
  grid-template-areas:
      "header header"
      "sidebar content"
      "footer footer";
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```

这样的话就会按上述字符串中安排的位置一样安排了.

使用时注意:

1. 我们必须写满每一个位置,重复也得写.
2. 空的用`.`表示.
3. 它必须是一个长方形.
4. 不能在两个方向上重复.

## floats

`float`用于将某个element移出normal flow，然后放在另一个element之上，该element的内容环绕它（类似报纸的环绕字）。

使用:

```css
.box {
  float: left;
}
```

这样该element就会在左边被环绕,值也可以是`right`.

注意由于该element在normal flow外,其他element的margin等不会对它有影响.

如果我们不想让某一个element环绕它,此时我们使用`clear`:

```css
.cleared {
  clear: left;
}
```

它有三个值:

- `left`: Clear items floated to the left.
- `right`: Clear items floated to the right.
- `both`: Clear any floated items, left or right.

有时会出现父element的background颜色等无法覆盖float:

```html
<div class="wrapper">
  <div class="box">Float</div>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus aliquam dolor, eu lacinia lorem placerat vulputate.</p>
</div>
```

![floats](https://cdn.jsdelivr.net/gh/ourandream/blog_images@master/blogs/floats.39u52i1zs960.jpg)

此时有三种解决方案:

1.在之后加点内容后clear(the clearfix hack):

```css
.wrapper {
  background-color: rgb(79,185,227);
  padding: 10px;
  color: #fff;
}
.wrapper::after {
  content: "";
  clear: both;
  display: block;
}
```

2.使用`overflow`:

```css
.wrapper {
  background-color: rgb(79,185,227);
  padding: 10px;
  color: #fff;
  overflow: auto;
}
```

3.使用`flow-root`(较新的方法):

```css
.wrapper {
  background-color: rgb(79,185,227);
  padding: 10px;
  color: #fff;
  display: flow-root;
}
```

## positioning

`positioning`会将element弄出normal flow再进行处理.默认情况下它的值是:

```css
.positioned {
  position: static;
  background: yellow;
}
```

此时会将它放在它在normal flow的位置,故没有变化.

如果改成`relative`:

```css
{
    position: relative;
}
```

此时还是没有改变,但如果再添加:

```css
{
    top: 30px;
    left: 30px;
}
```

此时便会到原来位置的右下角.注意top(left,right等同理)对应向下,这有点反直觉.

我们还可以使用`absolute`:

```css
{
    position: absolute;
}
```

此时它会完全从normal flow剥离,你会发现原来属于它的位置不再有空白,完全消失.此时添加`top`等将会让它相对于它的container block移动.即top则为相对top移动多少.

如果它的父element修改position,它会相对于initial containing block(即整个html的layout)移动.

如果想让它相对于某个父element移动，对该element修改：

```css
div {
    position: relative;
}
```

这样它就会相对它进行移动了.

当发生element重叠时,我们我们希望改变它们重叠的持续,我们使用`z-index`:

```css
{
    z-index: 1;
}
```

z轴可看作从屏幕到人脸的一个坐标轴,故值越大越上.

默认情况下值为`auto`,此时positioned element会在上,且在源代码较后的positioned element在上.

它的值必须不带单位.

position的另一个值`fixed`可让element从根据可看见的viewport显示,这常被用于制作网页导航栏等需要一直显示的element.

```css
h1 {
  position: fixed;
  top: 0;
  width: 500px;
  margin-top: 0;
  background: white;
  padding: 10px;
}
```

`sticky`则会将element在未显示时表现得像relative一样,等它显示并到一定位置时,就固定在viewport中.这是一个较新的value.

## multiple-column layout

用于将内容自动分页，生成多列的布局。

我们可以用`column-count`直接指定列数:

```css
.container {
  column-count: 3;
}
```

也可以通过`column-width`指定列的宽度:

```css
.container {
  column-count: 3;
}
```

注意此时多余的空间会自动填充在列之间形成空白.

对于列的修改,我们只能修改列间空白的大小(`column-gap`)和列的样式(`column-rule`):

```css
.container {
  column-count: 3;
  column-gap: 20px;
  column-rule: 4px dotted rgb(79, 185, 227);
}
```

其中列的样式类似`border`,只是不占有自己空间.

我们可以让某个element在中间隔开列,形成两边各一部分的列:

```css
{
    column-span:all;
}
```

注意此时上面的element的内容形成自己的多列,下面的同上.

有时列对内容的分隔将原本完整的内容分成两个部分,影响观看,此时可以使用`css fragmentation`的相关properties:

```css
.card {
  break-inside: avoid;
}
```

这样就不会让完整的内容分隔了.

## responsive design

现在移动设备的盛行导致屏幕尺寸已经多样到无法一个个做一个网页适配的情况，于是有了`responsive design`,即根据屏幕大小自动适应的一类技术.

它是由三个主要的技术组成:

1. fluid grids.
2.  [fluid images](https://unstoppablerobotninja.com/entry/fluid-images)
3. [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries),即判断屏幕尺寸并选择相应的css properties.

使用如下:

```css
@media screen and (min-width: 800px) {
  .container {
    margin: 1em 2em;
  }
}
```

这样会在判断屏幕在满足一定条件时应用.

有时我们会想设计一个单列的小网页,然后再考虑大尺寸时的多列网页,这种设计思想叫`mobile first design`.

当我们为多个屏幕尺寸安排字体大小时,我们可以使用`vw`等单位实现一次安排:

```css
h1 {
  font-size: calc(1.5rem + 3vw);
}
```

注意不能单独使用,不如会导致无法放大缩小.

一般我们会在html的头部添加:

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

这用于告诉手机浏览器给真实的屏幕尺寸,早期的手机浏览器会给一个大尺寸让大尺寸网页显示然后让用户滚动查看.

## media query

一个基础的`media query`的格式如下:

```css
@media media-type and (media-feature-rule) {
  /* CSS rules go here */
}
```

`media-type`指平台的类型,它是可选的,它有以下的值:

- `all`
- `print`
- `screen`
- `speech`

对于`media-feature-rule`,可以使用width,max-width,height等css的相关properties:

```css
@media screen and (width: 600px) {
    body {
        color: red;
    }
}
```

也可以使用`orientation`的 portrait 和 landscape来选择移动设备的横向或纵向显示:

```css
@media (orientation: landscape) {
    body {
        color: rebeccapurple;
    }
}
```

对于可点击的设备,我们可以这样:

```css
@media (hover: hover) {
    body {
        color: rebeccapurple;
    }
}
```

这样来指定一个设备是否可以使用鼠标的功能.

更进一步还有 `pointer` media feature. 有三个值: `none`, `fine` and `coarse`. `fine` 指和鼠标或触控板一样可以进行悬停等操作,`coarse` 指手指操作,`none` 表示没有相关的设备,可能只使用键盘.

还可以使用相关的逻辑:

与:

```css
@media screen and (min-width: 600px) and (orientation: landscape) {
    body {
        color: blue;
    }
}
```

或

```css
@media screen and (min-width: 600px), screen and (orientation: landscape) {
    body {
        color: blue;
    }
}
```

非(针对media feature)

```css
@media not all and (orientation: landscape) {
    body {
        color: blue;
    }
}
```

## legacy layout methods

过去没有grid layout,为了实现人们使用了很多方法,虽然现在已经有了,但在较旧的网站那些方法依然在使用,故需要了解相关的方法.

我们可以通过class进行操作:

```css
<div class="wrapper">
  <div class="row">
    <div class="col">1</div>
    <div class="col">2</div>
    <div class="col">3</div>
    <div class="col">4</div>
    <div class="col">5</div>
    <div class="col">6</div>
    <div class="col">7</div>
    <div class="col">8</div>
    <div class="col">9</div>
    <div class="col">10</div>
    <div class="col">11</div>
    <div class="col">12</div>
  </div>
  <div class="row">
    <div class="col span1">13</div>
    <div class="col span6">14</div>
    <div class="col span3">15</div>
    <div class="col span2">16</div>
  </div>
</div>
```
然后添加一些基础的properties.
```css
* {
  box-sizing: border-box;/*便于计算width*/
}

body {
  width: 980px;
  margin: 0 auto;
}

.wrapper {
  padding-right: 20px;
}
```
然后添加让每一行独立出来.
```css
.row {
  clear: both;
}

```

然后创建具体的grid的某一块:

```css
.col {
  float: left;
  margin-left: 20px;
  width: 60px;
  background: rgb(255, 150, 150);
}
```

占据多列:

```css
/* Two column widths (120px) plus one gutter width (20px) */
.col.span2 { width: 140px; }
/* Three column widths (180px) plus two gutter widths (40px) */
.col.span3 { width: 220px; }
/* And so on... */
```

我们可以看出其实就是计算具体的宽度然后一个个安排.但有具体的长宽不利于适应屏幕,我们可以计算比例:

```
target / context = result
```

如上面的gutter为20px,整个容器的大小为960px,故为:

```
20 / 960 = 0.02083333333
```

通过这样的方式将上面的代码的长度转化为比例.

我们还可以调用`calu()`:

```css
.col.span2 { width: calc((6.25%*2) + 2.08333333%); }
.col.span3 { width: calc((6.25%*3) + (2.08333333%*2)); }
.col.span4 { width: calc((6.25%*4) + (2.08333333%*3)); }
```

如果有个地方我们希望是空白,我们也需要添加对于的类(即增加margin):

```css
.offset-by-one {
  margin-left: 10.41666666%;
}
```

利用float形成grid是有问题的,column太宽可能导致形成多行,内容太多可能导致overflow,且我们无法对行的大小进行操作.

我们也可以使用`flexbox`来写grid layout,它相对于float会较简便,但基本的思想是一样的.但写时需要时刻注意,它是一个一维的layout,不可能完美.而且flexbox的在旧浏览器的支持不如float.

网上还有很多第三方的css grid framework(如[Skeleton website](http://getskeleton.com/)),使用它们可以简便我们的工作.

## supporting older browsers

对于老的不支持grid或flex等layout的浏览器,我们可以利用fallback给它们.核心思想是浏览器会忽略掉无法使用的css properties,且以下properties在grid,flex中会失效:

1.Float and clear

2.display: inline-block

3.display: table

4.Multiple-column Layout

5.Flexbox as a Fallback for Grid

这样我们可以写两个版本的css.

但有一个问题是width等性质仍会应用,这会导致问题,我们可以使用`feature query`:

```css
@supports (display: grid) {
  .item {
      width: auto;
  }
}
```

这样它会检查是否支持后再应用.注意它是一个较新的规则,故最好让它检查浏览器是否支持现代layout.

当日最重要的是我们要写一个一开始就组织好的html文件,这样即使不支持相关的layout也可使用.

在IE的有些版本中对grid有过短暂的支持(注意edge也支持,所以可能出问题),但需要加类似-ms-的前缀.这个只有在需要支持该版本的IE的大量用户时才会使用,故只需做了解.
# style form
## base
以前对form进行样式修改很困难，现在已经相对简单了，但还是有很多需要注意的点。
和其他的element基本一样修改的：
1.  `<form>`
2.  [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) and [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/leg).
3.  Single-line text [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)s (e.g. type text, url, email...), except for [`<input type="search">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search).
4.  Multi-line [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
5.  Buttons (both [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) and [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button))
6.  [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
7.  [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output)

注意`<input type='submit'>`若修改字体它仍会是系统的字体，故使用`button`更佳.
不同的control安排padding等属性的规则不同,使用`box-sizing`统一设置为`border-box`.
`legend`的位置修改需要使用`position`.

较难修改的：
-   Checkboxes and radio buttons
-   [`<input type="search">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)

不可以用css修改的：
-   [`<input type="color">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color)
-   Date-related controls such as [`<input type="datetime-local">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
-   [`<input type="range">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
-   [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)
-   Elements involved in creating dropdown widgets, including [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select), [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option), [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) and [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist).
-   [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) and [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)

##  bad and ugly
对于bad(较难修改),我们通常会使用(appearance:none)来取消默认样式,然后再进行修改.
对于ugly(无法修改),最后还是建立一个自己的control来替换.
## pseudo class
对所有form control都起作用的：
-   [`:hover`](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover): 当被鼠标悬停时匹配.
-   [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus): 当被focus(如通过tab键)时匹配.
-   [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active): 当actived(点击或按下enter/return键)时匹配.
还有一些特殊的:
-   [`:required`](https://developer.mozilla.org/en-US/docs/Web/CSS/:required) and [`:optional`](https://developer.mozilla.org/en-US/docs/Web/CSS/:optional): 当control是必须的(有`required`属性)时时匹配第一个,否则是第二个.注意如果多个name属性相同的radio中有一个有`required`,它们在未选中时都是非法的,但只有那个有`required`的会匹配.
-   [`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:valid) and [`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid), and [`:in-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/:in-range) and [`:out-of-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/:out-of-range):验证数据时是否符合规范匹配第一个和第一二,数字类型的control(日期类,number,range)是否在min和max设定的数字范围内匹配第三第四个.
-   [`:enabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled) and [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled), and [`:read-only`](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only) and [`:read-write`](https://developer.mozilla.org/en-US/docs/Web/CSS/:read-write): 是否可用(有无`disable`)匹配前两个,是否只读(有`readonly`)匹配后两个.
-   [`:checked`](https://developer.mozilla.org/en-US/docs/Web/CSS/:checked), [`:indeterminate`](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate), and [`:default`](https://developer.mozilla.org/en-US/docs/Web/CSS/:default): 对于checkbox和radio buttons,被选中时匹配第一个,还未选择时匹配第二个,默认值匹配第三个(注意即使不选中了也会匹配).
对于何时匹配`indeterminate`有如下规则:
-   [`<input/radio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio) 当同个`name`属性的一组radio没有一个被选中时.
-   [`<input/checkbox>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)通过js将 `indeterminate` property设未true时.
-   [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) 没有值时.
除此之外还有一些浏览器支持没有那么好的:
-   [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)当它被focus它的子element被focus时匹配.
-  [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) 通过键盘focus时匹配.
-   The [`:placeholder-shown`](https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown) [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) 和 [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 的placeholder显示时(即值未空且有placeholder设定)匹配. 
# others
## animation
使用css动画有以下优点:
1. 使用简易.
2. 表现良好.
3. 浏览器可控制,便于优化性能表现.
css动画的核心是`animation`相关properties和@keyframes.
相关properties:
[`animation-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name)

在`@keyframes`中的名字.

[`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration)

动画一次循环的时长.

[`animation-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)

控制动画途中如何进行.

[`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)

element加载到动画开始的时长.

[`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)

动画重复次数,可通过 `infinite` 设置为无限循环.

[`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)

设置动画在循环中再次开始时的方向.

[`animation-fill-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode)

在执行动画前后是否应用动画使用的style,默认都不应用.

[`animation-play-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state)

控制动画的开始暂停.

例子:
```css
p {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  75% {
    font-size: 300%;
    margin-left: 25%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```
其中是`from`,`to`是`0%`和`100%`的同义词.
该动画会有字变大又变小的效果.在`@keyframes`中如果我们没有写相关的property的值,则它们会是相关element的对于property的值,动画依此产生.
`animation`可以写成shorthand形式,不过写成longhand时我们可以写多个值(逗号分隔),那些值会一一对应:
```css
animation-name: fadeInOut, moveLeft300px, bounce;
animation-duration: 2.5s, 5s, 1s;
animation-iteration-count: 2, 1, 5;
/*bounce-1s-5*/
```
如果值的数量不同,较少的被循环利用:
```css
animation-name: fadeInOut, moveLeft300px, bounce;
animation-duration: 2.5s, 5s;
animation-iteration-count: 2, 1;
/*bounce-2.5s-2*/
```
## transition
`transition`用于控制css properties变换时的动画.
有如下的properties用于控制:
[`transition-property`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property)

标明值变化时要应用动画的properties.

[`transition-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration)

动画执行时长.

[`transition-timing-function`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)

指定一个函数用于控制properties中间值的生成.

[`transition-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay)

指定property值变化与动画开始之间的时间.

shorthand:
```css
div {
    transition: <property> <duration> <timing-function> <delay>;
}
```
例子:
```css
#delay {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}

#delay:hover {
  font-size: 36px;
}
```
如果有多个值时,值较少的property会被循环使用:
```css
div {
  transition-property: opacity, left, top, height;
  transition-duration: 3s, 5s;/*3,5,3,5*/
}
```
特别的,如果是transition-property较短,其他的properties会被缩减.
transition会发出事件便于js进行控制:
```js
el.addEventListener("transitionend", updateTransition, true);
el.addEventListener("transitionrun", signalStart, true);//delay前发出
el.addEventListener("transitionstart", signalStart, true);//delay后发出
```
event object添加了一些properties形成了`TransitionEvent` object:
`propertyName`

transition作用的css property名

`elapsedTime`

当事件发出时动画已经执行的时长.
## scroll snap
`scroll snap`可让用户滚动时快速滚动到指定位置,形成类似翻页的效果.
它的核心是[`scroll-snap-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) 和 [`scroll-snap-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align).
例子:
```html
<article class="scroller">
    <section>
        <h2>Section one</h2>
    </section>
    <section>
        <h2>Section two</h2>
    </section>
    <section>
        <h2>Section three</h2>
    </section>
</article>
```

```css
.scroller {
    height: 300px;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.scroller section {
    scroll-snap-align: start;
}
```
其中y指的是会发生快速滚动的方向,`mandatory`指强制发生快速滚动,它还有另外一个可用值`proximity`,此时只会在接近时发生快速滚动.
`scroll-snap-align`的`start`指的是滚动后停下的在section中的位置(其他element也可).除此之外还有`end`,`center`.
`scroll-padding`和`scroll-margin`用于定义停下时的scroll container的padding和或子element的margin.显示效果是未翻整页.在前者`.scroller`中使用,后者在子element中使用,故后者可有不同值.
## transform
`transform`可在不影响normal flow的情况下改变element的形状和位置.它只对符合box model(display:block)的element起作用.
主要的properties有两个:
[`transform-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)

设置原点(默认是中心).如旋转时设置bottom left按左下点进行旋转.

[`transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

指定改变的类型,可同时执行多个.改变的类型有 rotation, skewing, scaling, 和translation(平移).它们均可在x,y上进行(如translateX(2px)).
也可以在进行3d的变换,不过需要指定`perspective`.

## calc

calc加使用`+`,`-`运算符必须在运算符的两边加上空格.

# 一些建议

> 1.保持命名风格等持续.
>
> 2.加适量的空格增加可读性
>
> 3.添加适量的注释
>
> 4.将文件分为多个logic section并用注释分隔.
>
> 5.避免使用太特殊的selector
>
> 6.将大的css文件分为多个小css文件

logic section的分隔注释如下:

```css
/* || GENERAL STYLES */
```

一般可分为四个section.

1. general styles,即一般的样式
2. utility,即各种有用的类
3. sitewide,所有需要在网站内用的东西,如nav.
4. 最后在添加一些特殊的东西

还有一些其他的工具.

css methodologies,即书写css代码的风格方法,广泛使用的有如BEM,OOCSS.

还有pre-processor,可生成stylesheet,有名的有spass,post-processor,可处理stylesheet.

这些在使用了css in js和现代css后都不再被使用,但了解一下依然是不错的选择.

