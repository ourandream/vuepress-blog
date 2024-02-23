---
title: pixi.js
category: front-end
date: 2022-12-23 18:23:20
---

pixi.js 是一个灵活的创作引擎.

<!-- more -->

## base

pixi.js 使用 webgl 技术.

在安装好 pixi.js 的包后, 首先我们需要启动它:

```js
let app = new PIXI.Application({ width: 640, height: 360 });
```

`Application`是一个助手类, 它会帮我们创建 renderer, stage, 并启动一个 ticker 用于更新.

然后我们需要将它创建的`canvas`添加到 dom:

```js
document.body.appendChild(app.view);
```

然后我们创建一个`Sprite`, 它是加载图片并使用的一种常用方式. 注意使用之前必须加载, 在这里我们使用一个 method 来实现:

```js
// Magically load the PNG asynchronously
let sprite = PIXI.Sprite.from("sample.png");
```

然后我们将`Sprite`加入`Stage`, `Stage`可以理解为场景的根容器, 它的所有内容会被加载城帧:

```js
app.stage.addChild(sprite);
```

然后我们利用`ticker`添加动画. `ticker`会在每一帧调用被提供的 callback:

```js
// Add a variable to count up the seconds our demo has been running
let elapsed = 0.0;
// Tell our application's ticker to run a new callback every frame, passing
// in the amount of time that has passed since the last tick
app.ticker.add((delta) => {
  // Add the time to our total elapsed time
  elapsed += delta;
  -- Update the sprite's X position based on the cosine of our elapsed time.  We divide
  // by 50 to slow the animation down a bit...
  sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
});
```

## container

`container`用于收集一系列子对象, 它的产生耗费很低, 故通常我们建议设置多个`container`对渲染的对象进行分组, 这样既可以灵活控制渲染顺序, 也可以让项目添加功能时更加简单.

通常`container`会被用于存储被 mask(即仅在规定区域可见)的对象:

```js
// Create a graphics object to define our mask
let mask = new PIXI.Graphics();
// Add the rectangular area to show
mask.beginFill(0xffffff);
mask.drawRect(0, 0, 200, 200);
mask.endFill();

// Add container that will hold our masked content
let maskContainer = new PIXI.Container();
// Set the mask to use our graphics object from above
maskContainer.mask = mask;
// Add the mask as a child, so that the mask is positioned relative to its parent
maskContainer.addChild(mask);
// Offset by the window's frame width
maskContainer.position.set(4, 4);
// And add the container to the window!
frame.addChild(maskContainer);

// Create contents for the masked container
let text = new PIXI.Text(
  "This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n" +
    "You can put anything in the container and it will be masked!",
  {
    fontSize: 24,
    fill: 0x1010ff,
    wordWrap: true,
    wordWrapWidth: 180,
  }
);
text.x = 10;
maskContainer.addChild(text);

// Add a ticker callback to scroll the text up and down
let elapsed = 0.0;
app.ticker.add((delta) => {
  -- Update the text's y coordinate to scroll it
  elapsed += delta;
  text.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100.0;
});
```

我们可以使用`Graphics`创建任意形状的 mask. 对与`Sprite`, 我们也可以使用 alpha chanel 作为 mask, 注意 canvas 不支持这点.

`container`的另一个作用是管理被`filter`作用的对象. `filter`是一种仅 webgl 支持的, 会对每一个像素起作用的效果(比如模糊和放大).

注意`filter`应该尽量少使用, 它对性能的影响很大.

## Display Objects

`Display Objects`是一个基类, 表示任何可以被 pixi 渲染的东西. 通常使用的属性如下:

| PROPERTY       | DESCRIPTION                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| **position**   | 相对于父, 在 x 轴或 y 轴的位置, 以像素为单位,  也可以直接使用`object.x` / `object.y`                  |
| **rotation**   | 角度, 以弧度为单位                                                                                    |
| **angle**      | 角度, 以角度为单位                                                                                    |
| **pivot**      | 旋转或子对象的原点.                                                                                   |
| **alpha**      | 可见读, 0-1.                                                                                          |
| **scale**      | 放大缩小范围, 可以单独设置 x, y 的放大缩小.                                                           |
| **skew**       | Skew transforms the object in x and y similar to the CSS skew() function, and is specified in radians |
| **visible**    | 是否可见, 影响自身和子对象是否被更新和渲染.                                                           |
| **renderable** | 是否渲染, 影响自身是否被渲染, 不影响自身的更新和子对象的渲染.                                         |

## Textures

`texture`代表一个用于显示在屏幕的像素资源(如 video, canvas 图形, svg 等).

首先我们需要加载资源, 一般我们使用`loader`, 它会异步加载资源, 并在加载完毕时发送事件. 通常我们会显示一个加载图片, 然后加载所有所需资源再进行渲染.

`BaseTextures`管理一个像素资源. 多个`texture`可使用同一个`BaseTextures`(由于缓存, 对于同个链接, 会返回同个`BaseTextures`, 节省了资源.

注意对于图片, 即使我们加载了`textures`, 我们依然需要将它上传到 cpu 进行解码我们可以使用  [Prepare](https://pixijs.download/release/docs/PIXI.Prepare.html)插件, 在展现前完成所有工作.

当我们不需要某个资源时, 我们可以调用`BaseTextures`的 destroy()来清除. 当我们想去除所有资源时, 使用`PIXI.utils.destroyTextureCache()`.

## Graphics

`Graphics`是一个几何形状构建工具, 一个例子:

```js
// Create a Graphics object, set a fill color, draw a rectangle
let obj = new PIXI.Graphics();
obj.beginFill(0xff0000);
obj.drawRect(0, 0, 200, 100);

// Add it to the stage to render
app.stage.addChild(obj);
```

档我们调用`drawRect`时, 并不是真的渲染了一个正方形, 而是将它`Graphics`的几何列表中.

可用的基本图形如下:

- Line
- Rect
- RoundRect
- Circle
- Ellipse
- Arc
- Bezier and Quadratic Curve

除此之外, 我们还可以使用`@pixi/graphics-extras`扩充基础图形.

几何列表是可复用的:

```js
// Create a master graphics object
let template = new PIXI.Graphics();
// Add a circle
template.drawCircle(100, 100, 50);

// Create 5 duplicate objects
for (let i = 0; i < 5; i++) {
  // Initialize the duplicate using our template's pre-built geometry
  let duplicate = new PIXI.Graphics(template.geometry);
}
```

但也正因为此, 我们不需要它时, 必须调用`destroy()`.

`Graphics`除了按上面的直接渲染外, 也可以利用它的几何形状做 mask, 详见 container 章节.

## Interaction

我们只需要简单地把`DisplayObject`的`interactive`设为 true 即可开启互动.

监听事件:

```js
let sprite = PIXI.Sprite.from("/some/texture.png");
sprite.on("pointerdown", (event) => {
  alert("clicked!");
});
```

一般我们使用`Point`事件, 它既支持鼠标也支持触控屏. 当然我们也可以指定特定的类型来进行一些特殊的操作.

一般事件的触发范围是一个正方形, 我们可以使用`hitArea`来自定义. 它支持  PIXI.Circle, PIXI.Rectangle, PIXI.RoundedRectangle, or PIXI.Polygon.

我们可以设置`interactiveChildren`使得点击测试跳过子对象提高性能.

除此之外还有一些要注意的点:

- pixijs 的子对象触发事件不可以在父对象处理.

- pixijs 不支持捕获事件, 所有不支持全局事件处理.

## Render Loop

- 调用 ticker 的 callback

- 更新 scene graph

- 渲染 scene graph

以上是基本的 render loop, 注意它也可以自定义.

注意刷新率由于种种原因很难控制, 不过我们可以设置 ticker 的`minFPS`  和  `maxFPS`来控制刷新率范围. 注意这种控制并不能保证效果, 最好在 callback 中添加一些处理作为预备.

## Scene Graph

`Scene Graph`是一颗树, 保存所有可渲染的对象. 每个对象可以有自己的子对象. 每个对象的位置, 角度, 可见性, 透明度, 都是相对与父对象而言的. (比如父对象透明度 0.5, 子对象透明度设 0.5 最后结果是 0.25).

对象的最终计算出的位置, 角度等属性存在`worldTransform`, 透明度存在`worldAlpha`.

对象的渲染顺序是从根往下, 对于每一个节点的子节点从第一个子节点到最后一个字节点.

我们可以使用`setChildIndex()`重新安排子节点顺序, `addChildAt()`添加一个字节点到指定位置, `sortableChildren`自动排序子节点.

有时有些内容在可见范围外, 我们希望不渲染它以提升性能. 我们可以通过第三方插件实现, 当然也可以通过设置`renderable`属性自己实现.

对象的位置是相对与子对象的, 默认的根节点的位置原点是左上角.

获得某个对象的全局位置的位置:

```js
// Get the global position of an object, relative to the top-left of the screen
let globalPos = obj.toGlobal(new PIXI.Point(0, 0));
```

对于网页, 我们还会多处一个叫`Screen Coordinates`的参考系, 即基于生成的 canvas 的左上角的参考系. 但 canvas 大小改变时, 渲染的参考系不会改变, 这会导致它们不匹配.

## Sprites

`Sprites`一般代表一张图片, 它是`displayobject`, 故有很多可以设置的选项. 需要注意的如下:

`Tinting`: 给每一个像素点的颜色添加值, 如`obj.tint = 0x00FF00`让对象变为绿色调.

`Blend modes`: 每一个像素点颜色怎么相加, `add`将值加上(每一个 rgb 频道分别), `multiply`类是`Tinting`, `screen`覆盖下面的颜色.

`Pivot vs Anchor`: 两者都可指定旋转的原点. `Pivot` 是`displayobject`的属性, 它是相对于`sprite`左上角的原点便宜值, 以像素为单位. `anchor`是`sprite`特有的属性, 以百分比为值, 如(0.5, 0.5). 注意改变上述两则都会改变它相对于父节点的位置.

## Text

在 webgl 中生成文字意外的是一件困难的事情, 没有原生的方法可用. pixi.js 提供了两种方法:

`Text Object`: 它的原理是交给浏览器处理然后根据浏览器的数据生成图片.我们可以 [text style](https://pixijs.io/pixi-text-style/)轻松地改变样式. 当我们想使用 web fonts 时, 我们需要使用第三方库预加载它(如`FontFaceObserver`. 当它 scale 变大时, 它不会重新生成, 可能导致不清晰.

`BitmapText`: 使用 bitmap font 生成文字. 低耗费, 但需要加载字体文件.

根据一下点选择:

PIXI.Text

- Static text
- Small number of text objects
- High fidelity text rendering (kerning e.g.)
- Text layout (line & letter spacing)

PIXI.BitmapText

- Dynamic text
- Large number of text objects
- Lower memory
