---
title: gsap
date: 2022-12-23
category: front-end
---

`gsap`是一个强大的几乎可以用于任何框架, 可以操作任何对象的动画框架.

<!--more-->

# base tweens

在`gsap`中, 一个简单的动画被称为`tween`. 基本的`tween`如下:

`gsap.to()` : 动画从当前状态到给定的值.

`gsap.from()` - 从给定的值到当前状态

`gsap.fromTo()`  : 动画的开始结束状态都自己设置

`gsap.set()` : 马上设置属性, 看不到动画过程.

例子:

```js
gsap.to(".circle", { x: 40, fill: "blue" });
```

# Animatable properties

几乎是所有属性都可以进行动画, 主要的类别如下.

## CSS properties

Transform shorthand

| GSAP                       | CSS                          | Explanation                                                         |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------- |
| x: 100                     | transform: translateX(100px) | Move horizontally (px or SVG units)                                 |
| y: 100                     | transform: translateY(100px) | Move vertically (px or SVG units)                                   |
| xPercent: -50              | transform: translateX(-50%)  | Move horizontally (percentage of element's width)                   |
| yPercent: -50              | transform: translateY(-50%)  | Move vertically (percentage of element's height)                    |
| rotation: 360              | transform: rotate(360deg)    | Rotate (degrees)                                                    |
| scale: 2                   | transform: scale(2, 2)       | Increase or decrease size                                           |
| transformOrigin: "0% 100%" | transform-origin: 0% 100%;   | The center of translation, this will rotate around the bottom left. |

它默认使用 px 和角度为单位, 我们也可以使用其他方式:

```js
x: 200, // use default of px
x: "+=200" // relative values
x: '40vw', // or pass in a string with a different unit for GSAP to parse
x: () => window.innerWidth / 2, // you can even use functional values to do a calculation!

rotation: 360 // use default of degrees
rotation: "1.25rad" // use radians

```

其的 css 属性没有 shorthand 但仍可以使用, 但要注意要有-要转化为小驼峰.

## 数字, 颜色, 或包含数字的字符串

例子:

```js
let obj = { myNum: 10, myColor: "red" };
gsap.to(obj, {
  myNum: 200,
  myColor: "blue",
  onUpdate: () => console.log(obj.myNum, obj.myColor),
});
```

这让`gsap`可以在多个框架下完美工作.

# Special Properties

在`tween`的第二个参数, 除了能设置要动画的属性外, 还有一些特殊的属性可以设置:

| Property   | Description                              |
| ---------- | ---------------------------------------- |
| duration   | 持续时间                                 |
| delay      | 多久后开始(repeatDelay 每次重复的 delay) |
| repeat     | 重复几次                                 |
| yoyo       | 是否在重复时方向相反(如左右移动)         |
| stagger    | 多个目标时每个目标的动画的间隔时间       |
| ease       | 使用数学函数控制动画的速率.              |
| onComplete | 当动画完成时执行给定函数                 |

`ease`有很多具体的选项(甚至可以自定义), 具体需要上官网([Getting Started with GSAP - Learning Center - GreenSock](https://greensock.com/get-started/#easing)))查看.

# timelines

`timeline`用于让我们灵活地控制动画的播放实际, 例如:

```js
// create a timeline
let tl = gsap.timeline();

// add the tweens to the timeline - Note we're using tl.to not gsap.to
tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```

这样会顺序播放.

`timeline`还可以使用[position parameter](https://greensock.com/position-parameter)(第三个参数)来控制, 它有如下类型:

- **Absolute time** (in seconds) - 从 timeline 起始计算的绝对时间

- **Label** - 某个标签指定的时间位置(可通过.`add()`添加)

- `"<"`  - 上一个动画的开始

- `">"` - 上一个动画的结束

- 以  `"+="`  和  `"-="`  的存在表示的**relative** values.  注意`"<"`  或  `">"`后接数字也会视为相对值. 例子:

  - `"+=1"` - 1 second past the end of the timeline (creates a gap)
  - `"-=1"` - 1 second before the end of the timeline (overlaps)
  - `"myLabel+=2"` - 2 seconds past the label `"myLabel"`
  - `"<+=3"` - 3 seconds past the start of the previous animation
  - `"<3"` - same as `"<+=3"` (see above) (`"+="` is implied when following `"<"` or `">"`)
  - `">-0.5"` - 0.5 seconds before the end of the previous animation. It's like saying *"the end of the previous animation plus -0.5"*

- A complex string based on a **percentage**. When immediately following a `"+="` or `"-="` prefix, the percentage is based on [total duration](<https://greensock.com/docs/v3/GSAP/Tween/totalDuration()>) of the **animation being inserted**. When immediately following `"&lt"` or `">"`, it's based on the [total duration](<https://greensock.com/docs/v3/GSAP/Tween/totalDuration()>) of the **previous animation**. *Note: total duration includes repeats/yoyos*. Examples:

  - `"-=25%"` - overlap with the end of the timeline by 25% of the inserting animation's total duration
  - `"+=50%"` - beyond the end of the timeline by 50% of the inserting animation's total duration, creating a gap
  - `"<25%"` - 25% into the previous animation (from its start). Same as `">-75%"` which is negative 75% from the **end** of the previous animation.
  - `"<+=25%"` - 25% of the inserting animation's total duration past the start of the previous animation. Different than `"<25%"` whose percentage is based on the **previous animation's** total duration whereas anything immediately following `"+="` or `"-="` is based on the **inserting animation's** total duration.
  - `"myLabel+=30%"` - 30% of the inserting animation's total duration past the label `"myLabel"`.

`timeline`可以设置默认值, 这样设置`tween`时那些值默认会是默认值:

```js
var tl = gsap.timeline({ defaults: { duration: 1 } });

//no more repetition of duration: 1!
tl.to(".green", { x: 200 })
  .to(".purple", { x: 200, scale: 0.2 })
  .to(".orange", { x: 200, scale: 2, y: 20 });
```

# control

`tween`和`timeline`都更具体地控制动画的开始暂停:

```js
// store the tween or timeline in a variable
let tween = gsap.to("#logo", { duration: 1, x: 100 });

//pause
tween.pause();

//resume (honors direction - reversed or not)
tween.resume();

//reverse (always goes back towards the beginning)
tween.reverse();

//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);

//jump to exacty 1/4th into the tween's progress:
tween.progress(0.25);

//make the tween go half-speed
tween.timeScale(0.5);

//make the tween go double-speed
tween.timeScale(2);

//immediately kill the tween and make it eligible for garbage collection
tween.kill();
```

# callback

一些在某个实际会自动调用的函数.

- **onComplete**: 动画完成时
- **onStart**: 动画开始时
- **onUpdate**: 每次动画更新时(每帧)
- **onRepeat**: 每次动画重复时
- **onReverseComplete**: 反向动画完成时

例子:

```js
gsap.to(".class", {
  duration: 1,
  x: 100,
  // arrow functions are handy for concise callbacks
  onComplete: () => console.log("the tween is complete")
}

// If your function doesn't fit neatly on one line, no worries.
// you can write a regular function and reference it
gsap.timeline({onComplete: tlComplete}); // <- no () after the reference!

function tlComplete() {
  console.log("the tl is complete");
  // more code
}
```

# Plugins

`gsap`有丰富的插件生态, 可以拓展出很多功能.
