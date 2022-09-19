---
title: JavaScript
category: front-end
abbrlink: cc1b9611
date: 2021/12/23 18:23:21
updated: 2021/12/23 18:23:21
---
对MDN web Docs中[JS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)学习内容的总结.

<!--more-->

# base

javascript是一门解释性的编程语言,它一般用于配合html,css动态更新网页的内容.它一般在用户端运行,当然它也可以在服务器端运行.

我们可以使用**Application Programming Interfaces** (**APIs**) 来利用js实现很多有意思的功能.API分为`browsers APIs`和`third party APIs`,前者为浏览器自带的API,后者会第三方提供的API.

一般每一个标签页都会运行在一个单独的环境,于是js无法得到其他页的数据.这用于保证数据安全.

类似css,在html中js有如下方式引入:

internal:

```html
<script>

  // JavaScript goes here

</script>
```

external:

```html
<script src="script.js" defer></script>
```

inline:

```html
<script>
    function createParagraph() {
      let para = document.createElement('p');
      para.textContent = 'You clicked the button!';
      document.body.appendChild(para);
    }
</script>
<button onclick="createParagraph()">Click me!</button>
```

同样的,inline不被推荐使用.

在html中我们有`async and defer`来控制js的执行,`async`是下载完立刻执行,`defer`是待所有资源加载完后按html中的顺序执行.注意它们仅对src指定的js文件有效.

js中的注释和c++类似:

```js
// I am a comment
/*
  I am also
  a comment
*/
```

js代码的每一行都要以分号结尾.

## variables

`variables`,即存放值的容器.在js中,我们使用let声明变量:

```js
let myName;
```

赋值:

```js
myName=3;
```

声明和初始化一起:

```css
let myDog = 'Rover';
```

在过去的js中,我们使用`var`来进行`let`的工作,但`var`中有一些很奇怪的设计,如它可以在声明前初始化变量,可以多次声明变量,在`let`中这些操作都被禁止了,这让我们减少潜在的错误.所有尽可能使用`let`.

js的变量命名有如下需要注意:

1. 不要用下划线开头,这在js中是有特殊含义的.
2. 不要用数字开头,这是被禁止的.
3. 不要用js的保留字如`let`.
4. js的变量名大小写敏感,a和A是不同的变量.

js中的变量的类型是动态的,所以我们可以随时为同一个变量更新一个不同类型的值.它主要有如下的类型:

* numbers
* strings
* arrays
* Boolean
* objects

js中也有常量,用`const`声明和初始化:

```js
const count = 1;
```

在初始化后不可再修改,但我们可以改变值的内容:

```js
const bird = { species : 'Kestrel'};
bird.species = 'Striated Caracara';
```

如果是array我们也可以修改它.

我们应该尽可能使用常量,只在必要时使用变量.

## basic math

在js中常用的只有一种数字类型`Number`(实际还有一种少用的`BigInt`用于大数).它可以进行整数小数的相关计算.

对于一个字符串数字,我们可以用`Number(str)`调用构造函数将其转化.

基本的加减乘除和幂运算:

| Operator | Name                                | Purpose                                                      | Example                                                      |
| :------- | :---------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `+`      | Addition                            | Adds two numbers together.                                   | `6 + 9`                                                      |
| `-`      | Subtraction                         | Subtracts the right number from the left.                    | `20 - 15`                                                    |
| `*`      | Multiplication                      | Multiplies two numbers together.                             | `3 * 7`                                                      |
| `/`      | Division                            | Divides the left number by the right.                        | `10 / 5`                                                     |
| `%`      | Remainder (sometimes called modulo) | Returns the remainder left over after you've divided the left number into a number of integer portions equal to the right number. | `8 % 3` (returns 2, as three goes into 8 twice, leaving 2 left over). |
| `**`     | Exponent                            | Raises a `base` number to the `exponent` power, that is, the `base` number multiplied by itself, `exponent` times. It was first Introduced in EcmaScript 2016. | `5 ** 2` (returns `25`, which is the same as `5 * 5`).       |

`++`,`--`和c++中的一样,放变量前面返回加后值,放后面返回原来的值.

赋值的相关运算符也和c++中的一样:

| Operator | Name                      | Purpose                                                      | Example   | Shortcut for |
| :------- | :------------------------ | :----------------------------------------------------------- | :-------- | :----------- |
| `+=`     | Addition assignment       | Adds the value on the right to the variable value on the left, then returns the new variable value | `x += 4;` | `x = x + 4;` |
| `-=`     | Subtraction assignment    | Subtracts the value on the right from the variable value on the left, and returns the new variable value | `x -= 3;` | `x = x - 3;` |
| `*=`     | Multiplication assignment | Multiplies the variable value on the left by the value on the right, and returns the new variable value | `x *= 3;` | `x = x * 3;` |
| `/=`     | Division assignment       | Divides the variable value on the left by the value on the right, and returns the new variable value | `x /= 5;` | `x = x / 5;` |

比较的运算符就稍有不同了:

| Operator | Name                     | Purpose                                                      | Example       |
| :------- | :----------------------- | :----------------------------------------------------------- | :------------ |
| `===`    | Strict equality          | Tests whether the left and right values are identical to one another | `5 === 2 + 4` |
| `!==`    | Strict-non-equality      | Tests whether the left and right values are **not** identical to one another | `5 !== 2 + 3` |
| `<`      | Less than                | Tests whether the left value is smaller than the right one.  | `10 < 6`      |
| `>`      | Greater than             | Tests whether the left value is greater than the right one.  | `10 > 20`     |
| `<=`     | Less than or equal to    | Tests whether the left value is smaller than or equal to the right one. | `3 <= 2`      |
| `>=`     | Greater than or equal to | Tests whether the left value is greater than or equal to the right one. | `5 >= 4`      |

注意`===`和`!==`,实际上js是有`==`和`!=`的,但它们不会检查值的类型,使用前值能更严格地进行比较.

## string

js中的string使用单引号或双引号围起来：

```js
const string = 'The revolution will not be televised.';
```

我们应该只使用一种引号,在一个引号里加另一种是允许的:

```js
const dblSgl = "I'm feeling blue.";
```

但使用同种引号则需要转义字符:

```js
const bigmouth = 'I\'ve got no right to take my place...';
```

如果我们想要连接字符串,直接用加运算符:

```js
greeting + ", " + name
```

但我们也可以使用`template literal`,它和字符串类似,使用**`**包裹,不同的是它可以使用变量:

```js
const greeting = `Hello, ${name}`;
```

变量如果是数字也会自动转化成字符串.我们也可以添加检查的表达式:

```js
const output = `I like the song ${song}.  ${score/highestScore * 100}%.`;
```

书写多行也只需要直接在源代码换行:

```js
const output = `I like the song.
I gave it a score of 90%.`;
```

但原来的字符串需要加`\n`换行.故`template literal`书写字符串更有可读性.

数字和字符串的简单相互转换如下:

```js
const myNum = Number(myString);
const myString2 = myNum2.toString();
```

有一些字符串的methods需要了解.

得到长度:

```js
browserType.length;
```

访问某个字符(类似数组):

```js
browserType[0];
```

检查是否包含某个字串:

```js
browserType.includes('zilla');
```

得到字符串的某个部分,注意不改变原来的字符串,参数是两个索引,且左闭右开:

```js
browserType.slice(1, 4)
```

转换大小写,同样不改变原来字符串:

```js
radData.toLowerCase();
radData.toUpperCase();
```

替换部分字符串,同样不改变而返回新的字符串,前一个参数是要替换的字符,注意有多个匹配的话只替换第一个:

```js
const updated = browserType.replace('moz','van');
```

查询某个子串在字符串中第一次出现时的位置(索引):

```js
const semiColon = station.indexOf(';');
```

利用字符串中的某个分隔符(或分隔字符串)分割字符串形成数组:

```js
let myArray = myData.split(',');
```

## array

js中的array创建如下：

```js
let random = ['tree', 795, [0, 1, 2]];
```

如上所示,它的内容可以是不同类型的量,甚至是数组本身.

它的长度用`length`访问:

```js
shopping.length;
```

使用下标访问和修改数组:

```js
shopping[0]=1;
```

查找数组内容:

```js
birds.indexOf('Owl');
```

在数组的后面添加(`push`)删除(`pop`)元素:

```js
myArray.push('Cardiff');
myArray.pop();
```

在数组的前面添加(`unshift`)删除(`shift`)元素:

```js
myArray.unshift('Edinburgh');
myArray.shift();
```

合并数组:
```js
data_type=data_type.concat(array);
```
遍历数组:

```js
for (let bird of birds) {
  console.log(bird);
}
```

如果我们想对数组的每一个元素进行操作并返回新的数组,使用`map()`,它的参数是一个带一个参数函数:

```js
const doubled = numbers.map(double);
```

类似的,如果像使用某种条件筛选数组并返回符合条件的数组元素:

```js
const longer = cities.filter(isLong);
```

如果想将数组转变成字符串:

```js
let myNewString = myArray.join(',');
```

这样会在数组的元素间自动加上参数的字符串分隔然后形成字符串.

如果我们想让数组元素不分隔:

```js
arr.join('');
```

我们也可以使用`toString()`来转换,但这样会自动加`,`分隔且不可修改.
正确按数字大小排序数组：
```js
weeks.sort(function (a, b) { return a - b;  })
```
# building blocks

## conditions

js中的条件写法和c++的非常类似：

```js
if (choice === 'sunny') {
    para.textContent = 'It is nice and sunny outside today. Wear shorts! Go to the beach, or the park, and get an ice cream.';
} else if (choice === 'rainy') {
    para.textContent = 'Rain is falling outside; take a rain coat and an umbrella, and don\'t stay out for too long.';
} else if (choice === 'snowing') {
    para.textContent = 'The snow is coming down — it is freezing! Best to stay in with a cup of hot chocolate, or go build a snowman.';
} else if (choice === 'overcast') {
    para.textContent = 'It isn\'t raining, but the sky is grey and gloomy; it could turn any minute, so take a rain coat just in case.';
} else {
    para.textContent = '';
}
```

和c++的一样,现检查`if`的条件,然后一个个检查`else if`,如果符合就执行对应的代码块,都不符合就会执行`else`的代码块.

如果条件是一个变量,则不是`false`, `undefined`, `null`, `0`, `NaN`, (`''`) 中的值的变量都为true.

我们可以使用`&&`,`||`,`!`来表示逻辑中的与或非用于构成条件.

js中同样有`switch`用于简化一些条件的书写:

```js
switch (expression) {
  case choice1:
    run this code
    break;

  case choice2:
    run this code instead
    break;

  // include as many cases as you like

  default:
    actually, just run this code
}
```

`case`的值会被用于检查是否和expression的值相同,相同则执行相应代码块.

注意`break`和`default`,如果没有`break`则会从该条条件开始执行所有的代码块.`default`则会在没有条件符合时执行.

## loop

首先是一般的`for`循环:

```js
for (initializer; condition; final-expression) {
  // code to run
}
```

先给定一个初始条件(通常是定义一个局部变量),然后给定允许的条件,最后再给个会改变变量的表达式.

然后按initializer-condition-code-final-experssion的顺序执行直到条件不满足.

`while`:

```js
initializer
while (condition) {
  // code to run

  final-expression
}
```

类似,只是初始和改变的表达式不再括号中.

`do-while`:

```js
initializer
do {
  // code to run

  final-expression
} while (condition)
```

和`while`类似,但`code`会首先被执行一次,然后再进行和`while`一样的操作.

`for..of..`

```js
for (const item of array) {
  // code to run
}
```

用于遍历如数组之类的元素集合.注意不一定要`const`,不过如果是`let`,修改该变量不会对原数组产生影响.

除此之外还有`break`用于跳出循环.`continue`用于进入下一次循环.

## function

函数一般的声明如下:

```js
function random(number) {
  return Math.floor(Math.random()*number);
}
```

调用:

```js
random(1);
btn.onclick=random;//注意作为参数时不能加括号，不然会执行。
```

注意调用可在声明之后.参数的个数可以为0.函数内部也可以调用其他的函数.

在函数外定义的变量称为在`global scope`,它可以在该文件的任何地方调用.

在函数内定义的变量则在自己的`scope`里,只能在函数内使用.

我们可以给定默认值让参数可选:

```js
function hello(name='Chris') {
  console.log(`Hello ${name}!`);
}
```

这样调用时可以给参数也可以不给.

有时我们需要传函数作为参数,此时可以使用匿名函数(即没有名字的函数):

```js
textBox.addEventListener('keydown', function(event) {
  console.log(`You pressed "${event.key}".`);
});
```

除了没有名字且不可在声明前调用,和正常的函数一样.

我们可以用另外的方式来声明匿名函数:

```js
textBox.addEventListener('keydown', (event) => {
  console.log(`You pressed "${event.key}".`);
});
```

如果函数只有一行可以去掉花括号:

```js
textBox.addEventListener('keydown', (event) => console.log(`You pressed "${event.key}".`));
```

如果参数只有一个可以去掉括号:

```js
textBox.addEventListener('keydown', event => console.log(`You pressed "${event.key}".`));
```

如果只有一行且为返回值,可以去掉`return`:

```js
const doubled = originals.map(item => item * 2);
```
可以使用rest parameter语法使用函数剩下的所有参数:
```js
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a)
  console.log("b", b)
  console.log("manyMoreArgs", manyMoreArgs)
}

myFun("one", "two", "three", "four", "five", "six")

// a, "one"
// b, "two"
// manyMoreArgs, ["three", "four", "five", "six"] <-- notice it's an array
```
# event

`event`是在系统中发生的行为或事件.在web中,`event`一般与element相对应(如按钮被点击).

与`event`相对应的有`event handler`,它会在event发生时被执行.在`js`中它是一个函数.

## event handler

我们可以利用对应的properties来应用`event handler`:

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.onclick = function() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```

我们还可以在html中应用:

```html
<button onclick="bgChange()">Press me</button>
<!--在script中写有函数-->
<button onclick="alert('Hello, this is my old-fashioned event handler!');">Press me</button>
<!--直接插入js-->
```

这样使用难以维护,不推荐.

在现代浏览器我们还可以使用`addEventListener`:

```js
const btn = document.querySelector('button');

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', bgChange);
```

这样有两个好处:

1. 可移除`event handler`.
2. 可以应用多个.

移除可以调用对应函数:

```js
btn.removeEventListener('click', bgChange);
```

也可以使用一个额外的控制器:

```js
const controller = new AbortController();
btn.addEventListener('click', function() {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}, { signal: controller.signal }); // pass an AbortSignal to this handler
```

这样的话调用如下语句时所有相关的`event handler`都会被移除:

```js
controller.abort(); // removes any/all event handlers associated with this controller
```

## other concept

有时我们会空间`event handler`带一个`event`参数,它是一个会自动传进的参数,带有额外信息,可进行一些额外的操作.

```js
function bgChange(e) {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}
```

我们可以使用`e.target`访问发出`event`信号的element.

有时我们阻止event的默认行为(如`form`中有submit会自动发送信息并显示成功):

```js
form.onsubmit = function(e) {
  if (fname.value === '' || lname.value === '') {
    e.preventDefault();
    para.textContent = 'You need to fill in both names!';
  }
}
```

我们还需要理解浏览器关于有父element的element的`event handler`的处理.它经历三个阶段:

1. capturing:从html开始,一个个检查有无对应`event`的handler并执行,直到该element的直接父element停止.
2. target:检查对应的element有无handler,有就执行.然后检查event的`bubbling`查看是否进行第三阶段.
3. bubbling:从直接父element开始,检查有无注册了的`event handler`并执行,直到html.

我们写的函数注册`event handler`默认是注册到第三阶段.

我们可以控制不执行:

```js
video.onclick = function(e) {
  e.stopPropagation();
  video.play();
};
```

我们也可以将函数注册到第一阶段,只需将`addEventListener`的第三个参数设为true.

我们可以利用这些实现`event delegation`,即只要某element的子element发出对应信号就会执行一定操作.

# objects

## object literal

js的objects指一系列数据和功能的集合.其中数据被称为`properties`,功能被称为`methods`.

我们可以使用`object literal`来定义对象:

```js
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(this.name[0] + ' ' + this.name[1] + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  },
  greeting: function() {
    alert('Hi! I\'m ' + this.name[0] + '.');
  }
};
```

 如上所示,使用`name:value`的格式书写,用逗号分隔,value可以是量也可以是函数.

调用则可以使用`dot notation`(即点):

```js
person.interests[1];
person.bio();
```

此时我们说类型作为`namespace`,用以调用里面的各种name.

其中调用properties也可以使用`bracket notation`(即方括号):

```js
person['age'];
```

后者的好处是可以用变量来调用.
移除property:
```js
delete obj.property
```

对象可以嵌套,调用时多写一层即可:

```js
person.name.first;
```

此时我们说name是`sub-namespace`.

上面的函数里调用成员时使用了`this`:

```js
greeting: function() {
  alert('Hi! I\'m ' + this.name.first + '.');
}
```

`this`指的就是对象本身,这个用法在用类创建对象时会非常有用.

注意js的`this`和一般编程语言不同,它是根据上下文得到含义的,也就是说,在函数中使用也不会出错:

>method 里的 this 返回的是 obj,
>function 里的 this 非严格模式下返回的是 global or window ，严格模式下返回 undefined,
>箭头函数里没有自己的 this.

我们可以修改properties的值:

```js
person.age=3;
```
为object添加特殊的属性:
```js
Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});
```
我们也用类似的方法可以创建成员:

```js
person['eyes'] = 'hazel';
```

## constructor

js的`constructor`书写如下:

```js
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}
```

然后调用:

```js
let person1 = new Person('Bob');
```

这样我们就可以利用它创建对象了.其中`this`指针在具体对象中指代其本身,`new`告诉解释器要创建对象.

注意对每一个对象中的函数,它都会新建一个对应的函数.

还有一些其他的可以创建对象的方法:

```js
let person1 = new Object();
person1.name='Bob';
```

这样是先利用`Object()`创建一个新对象然后再给值.

我们可以直接用`object literal`作为参数:

```js
let person1 = new Object({
  name: 'Chris',
  age: 38,
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
});
```

我们也可以用已有对象建立新对象:

```js
let copy1 = Object.create(obj);//如果property有对象则会复制reference
var copy2 = JSON.parse(JSON.stringify(obj));//深度拷贝
```

## objects prototype

js通过`prototype chain`实现继承,即每一个构造函数都有一个`prototype`属性,用于存放可以被继承的属性或函数.当继承时,该属性的内容被继承.一个个对象的对应关系形成链.这样的话新的对象的函数会是指向前面函数的指针,避免了重复创建函数的问题.

在浏览器中,我们可以使用`obj.__proto__`来查看它继承了的对象.

我们这样添加可继承的事物:

```js
Person.prototype.farewell = function() {
  alert(this.name.first + ' has left the building. Bye for now!');
};
```

注意`Object()`的相关性质会被自动放入`prototype`中,其他的则需自己添加.

需要进行一次实例化才能在浏览器中看见对应的`prototype`.

基于此,我们构造函数的书写一般如下:

```js
// Constructor with property definitions

function Test(a, b, c, d) {
  // property definitions
}

// First method definition

Test.prototype.x = function() { ... };

// Second method definition

Test.prototype.y = function() { ... };

// etc.
```

注意只要对象的调用在更新之后,它仍会被更新,即使对象的定义在构造函数的更新之前.

上面我们使用的`create`其实也继承了参数的属性,跟上面是同样机制.

对象也有`constructor` property:

```js
person1.constructor;
```

可以用它获取构造函数的名字:

```js
person1.constructor.name
```

## inheritance

js中的继承书写如下:

```js
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}
```

这样我们从Person的构成函数派生形成了一个新构造函数,注意传入参数里`this`是必须的.

然后我们可以设置`prototype`:

```js
Teacher.prototype = Object.create(Person.prototype);
```

但此时Teacher的constructor property会指向Person,为解决这个问题,我们需要进行设置:

```js
Object.defineProperty(Teacher.prototype, 'constructor', {
    value: Teacher,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });
```
## class
`ECMAScript 2015`提供了类似c++语言中的`class`的写法:

```js
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  };

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  };
}
```
上面是`class declaration`的写法,还要`class assignment`的写法:
```js
// unnamed
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

// named
let Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle2"
```
在解释器其实会将其转化为上面的构造函数的相关内容.下面的函数会被自动加入`prototype`中.
在class的body使用`strict mode`.
使用`static`创建class的properties和methods,它们只可通过class本身调用,不可通过class instance调用:
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance;    // undefined
p2.displayName; // undefined
p2.distance;    // undefined

console.log(Point.displayName);      // "Point"
console.log(Point.distance(p1, p2)); // 7.0710678118654755
```
使用`public field declarations`定义properties:
```js
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```
加`#`进行private field declaration,定义的相关内容只可在class内访问:
```js
class Rectangle {
  #height = 0;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}
```

派生写法:

```js
class Teacher extends Person {
  constructor(subject, grade) {
    super(); //让this可以,如果Person有参数需要给相应的参数.
    this.subject = subject;
    this.grade = grade;
  }
}
```
返回继承的class的内容:
```js
class Lion extends Cat {
  speak() {
    super.speak();
    console.log(`${this.name} roars.`);
  }
}
```
使用`Mix-ins`,进行函数的继承:
```js
let calculatorMixin = Base => class extends Base {
  calc() { }
};

let randomizerMixin = Base => class extends Base {
  randomize() { }
};

//use
class Foo { }
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
```
如果后来我们想修改里面的properties,使用`getters`和`setters`:

```js
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);
    // subject and grade are specific to Teacher
    this._subject = subject;
    this.grade = grade;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    this._subject = newSubject;
  }
}
```

这样我们就可以使用subject修改_subject了.且我们可以在每次属性被调用或被修改时进行一些操作.

## json

`json`是一类使用js中的类写法为格式的文件，用以传递数据.把json字符串转化为js对象称为`deserialization`,将js对象转化为json字符串被称为`serialization`.`json`的一般格式如下:

```json
{
  "squadName": "Super hero squad",
  "formed": 2016,
  "active": true,
  "powers": [
      "Immortality",
      "Heat Immunity",
      "Inferno",
      "Teleportation",
      "Interdimensional travel"
  ]
}
```

有几点需要注意:

* 字符串必须使用双引号.

* properties必须用双引号分隔.

`json`也可以是数组:

```json
[
	...
]
```

它甚至可以一个数字,一个字符串.

在js中对`json`的处理使用`JSON`对象:

```js
let myString = JSON.stringify(myObj);//转化为json
const superHeroes = JSON.parse(superHeroesText);//转化为js对象
```

# asynchronous

在js中使用`asynchronous`可以将费时的工作(如查询数据库)放到另一线程中,避免导致网页加载时间过长.

js中的异步操作会放在`event loop`中,它会在非异步操作执行完后执行.js实际上还是一个单线程语言。

## callback

在js中我们可以使用`Async callbacks`,即给定一个函数作为参数,它会在调用的函数执行完毕后执行.

如:

```js
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});

function loadAsset(url, type, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = type;

  xhr.onload = function() {
    callback(xhr.response);
  };

  xhr.send();
}
```

上述代码中的callback会在之后执行,不影响它下面的代码.

注意不是所有的callback都是异步的(如`forEach`).

## promise

`promise`指一个代表函数执行是否成功的中间态对象,它是`modern web APIs`,用于更好的控制异步操作。

当它被创建但没有执行时,我们说它`pending`,当它被返回时,我们说它被`resolved`.成功的叫`fullfilled`,函数的返回信息可以作为参数,失败的叫`rejected`,返回错误信息(`reason`).

我们可以使用`then()`在那之后执行相关操作,它也返回`promise`:

```js
fetch('products.json').then(function(response) {
  return response.json();
}).then(function(json) {
  let products = json;
  initialize(products);
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});
```

`fetch`本身是一个异步函数,它返回`promise`对象.

注意它不会对如`404`之类的网络错误作出响应,我们需要检查`response`:

```js
let promise2 = promise.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    return response.blob();
  }
});
```



注意`try..catch`对它不起作用,需要使用特定的`catch`.

它相对于callback有以下好处:

* 可以使用多个`then`进行多步异步操作,这在callback中很难实现( [callback hell](http://callbackhell.com/)).
* 可以让代码运行顺序准确.
* 更容易处理异常.
* 不丢失相关操作的控制权.(callback使用第三方库会导致).

如果我们想对多个`promise`同时进行相应:

```js
Promise.all([a, b, c]).then(values => {
  ...
});
```

此时`all`会返回一个`promise`,如果成功的话还会有一个数组作为参数.

注意如果all中的参数某一个出现问题,它仍会`fullfill`,只该参数返回`undefined`.

如果我们想让某些代码无论成功失败都指向,在最后使用`finally`:

```js
myPromise
.then(response => {
  doSomething(response);
})
.catch(e => {
  returnError(e);
})
.finally(() => {
  runFinalCode();
});
```

我们可以使用`promise constructor`来让一些老的异步API(如`setTImeout`)可以使用`promise`:

```js
let timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
  }, 2000);
});
```

此时不可能出现`reject`,有无`setTimeout`没有失败状态.

如果我们想使用`reject`:

```js
function timeoutPromise(message, interval) {
  return new Promise((resolve, reject) => {
    if (message === '' || typeof message !== 'string') {
      reject('Message is empty or not a string');
    } else if (interval < 0 || typeof interval !== 'number') {
      reject('Interval is negative or not a number');
    } else {
      setTimeout(() => {
        resolve(message);
      }, interval);
    }
  });
}
```



## timeouts and internals

我们可以使用`setTimeout`让某个函数在另一个线程等待一定的时间后运行:

```js
let myGreeting = setTimeout(() => {
  alert('Hello, Mr. Universe!');
}, 2000);
```

第一个参数是函数,第二个参数是等待时间(毫秒).它的返回值则可以用于控制停止执行:

```js
clearTimeout(myGreeting);
```

类似的,我们使用`setTimeinternal`来让某个函数没间隔一段时间就运行一次:

```js
const myInterval = setInterval(myFunction, 2000);
clearInterval(myInterval);
```

实际上我们也可以使用`setTimeout`来实现间隔循环运行:

```js
let i = 1;

setTimeout(function run() {
  console.log(i);
  i++;
  setTimeout(run, 100);
}, 100);
```

这与`setInternal`有些许不同.`setInternal`的间隔时间包括执行时间,而`setTimeout`不包括,也就是说后者可以保证某个确定的时间间隔.

当我们将`setTimeout`的时间设为0时,它仍会等待主线程的非异步操作结束后再执行.

类似的还有`requestAnimationFrame`:

```js
rAF = requestAnimationFrame(draw);
cancelAnimationFrame(rAF);
```

它会在网页每次画面刷新时执行,不需要我们给定时间参数.它会尽可能让自己运行得快并接近60帧.它一般绘制动画.

我们可以添加一个参数得到它的时间:

```js
let startTime = null;

function draw(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

   currentTime = timestamp - startTime;

   // Do something based on current time

   requestAnimationFrame(draw);
}

draw();
```

上述函数均在主线程运行.

## async and await

我们可以使用`async`让一个函数或类的方法返回`promise`:

```js
async function hello() { return "Hello" };
```

这样它会返回`promise`且它的返回值会在`then`中作为参数.

在有`async`的函数中,我们可以使用`await`来省略`then`:

```js
async function myFetch() {
  let response = await fetch('coffee.jpg');
...
}
```

这样`response`会等到fetch执行完成后才会得到返回值,它会直接是该函数的返回值而不是`promise`.

如果使用了`await`省略`then`,我们可以直接使用try..catch来处理异常:

```js
async function myFetch() {
  try {
    let response = await fetch('coffee.jpg');
  } catch(e) {
    console.log(e);
  }
}
```

`await`对`promise`的`all`等函数仍适用.

正常情况下如果我们使用多个`await`,它们会等待一个执行完后再执行另一个:

```js
async function timeTest() {
  await timeoutPromise(3000);
  await timeoutPromise(3000);
  await timeoutPromise(3000);
}
```

但我们可以让它们同时执行:

```js
async function timeTest() {
  const timeoutPromiseResolve1 = timeoutPromiseResolve(5000);
  const timeoutPromiseReject2 = timeoutPromiseReject(2000);
  const timeoutPromiseResolve3 = timeoutPromiseResolve(3000);

  const results = await Promise.all([timeoutPromiseResolve1, timeoutPromiseReject2, timeoutPromiseResolve3]);
  return results;
}
```

注意最后利用`all`是为了方便异常处理.

# APIs

## document

就总体而言.

`window`对象代表网页所在的标签页.

`Navigator`对象代表浏览器的状态特征.

`Document`对象指具体加载的网页,用DOM代表.

document的相关API主要用于操作`DOM`.

利用css的selector选择element:

```js
const link = document.querySelector('a');//选择第一个出现的element.
const arr=document.querySelectorAll('a');//选择所有element并放回类似数组的对象.
```

较老的选择方法:

```js
const elementRef = document.getElementById('myId');//利用id选择
const elementRefArray = document.getElementsByTagName('p');//选择某个特定tag,返回类似数组的对象.
```

创建element:

```js
const para = document.createElement('p');
```

修改属性:

```js
link.textContent = 'Mozilla Developer Network';
```

使用`classList`修改class的列表(注意它本身是只读的):
```js
// If the control is not active there is nothing to do
  if (!select.classList.contains('active')) return;

  // We need to get the list of options for the custom control
  var optList = select.querySelector('.optList');

  // We close the list of option
  optList.classList.add('hidden');

  // and we deactivate the custom control itself
  select.classList.remove('active');
```
加入某个element的最后:

```js
sect.appendChild(para);
```

注意如果是已有的element则它会被移动到最后,不会产生新的element.如果想复制用`Node.cloneNode()`.

删除某个element:

```js
sect.removeChild(linkPara);//删除子element.
linkPara.remove();//删除本身,就浏览器不支持.
```

修改css:

```js
para.style.color = 'white';
para.style.backgroundColor = 'black';
```

注意css中用连字符熟悉的attribute需要使用小驼峰方式重新书写.以上语句会变成添加到`inline css`中.

设置`attribute`:

```js
para.setAttribute('class', 'highlight');
```
设置`tabIndex`(即按tab foucus到的顺序):
```js
element.tabIndex = index;
var index = element.tabIndex;
```
它的值是一个正整数或0,它的顺序的规则:
1. 是如果设置了则按设置的数的大小排序,若同样大按出现的顺序排序.
2. 如果为0或不支持,则按出现的次序排序.
## fetch data from server

在以前,我们使用`XMLHttpRequest`来请求数据(Ajax),首先,我们需要创建一个对象:

```js
let request = new XMLHttpRequest();
```

指定链接和http请求类型:

```js
request.open('GET', url);
```

指定响应的类型:

```js
request.responseType = 'text';
```

指定得到响应时的callback:

```js
request.onload = function() {
  poemDisplay.textContent = request.response;
};
```

最后发出请求:

```js
request.send();
```

我们现在可以使用更方便的`fetch`:

```js
fetch(url).then(function(response) {
  return response.text()
}).then(function(text) {
  poemDisplay.textContent = text;
});

fetch(url, {
    method: 'post',
    body: data,
})
```

它是一个异步函数,返回`promise`,而且我们不需要在处理请求类型和发送请求.

当是如图片之类的文件时,我们可以通过`blob`处理成二进制文件,然后生成临时链接;

```js
fetch(url).then(function(response) {
    return response.blob();
}).then(function(blob) {
  // Convert the blob to an object URL — this is basically a temporary internal URL
  // that points to an object stored inside the browser
  let objectURL = URL.createObjectURL(blob);
  // invoke showProduct
  showProduct(objectURL, product);
});
```

## third-party APIs

要使用第三方的API,有时我们需要在html进行连接:

```html
<script src="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js"></script>
<link type="text/css" rel="stylesheet" href="https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css"/>
```

然后再在js中使用.

有时我们直接通过http请求得到数据.

一般它们都需要API keys才能使用,这是API提供商为避免滥用而设立的.

## drawing graphic

我们可以在html中创建`canvas`,然后在js中画图.

首先选择并定义它的长宽并保存:

```js
const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
```

然后获取作图区域(context):

```js
const ctx = canvas.getContext('2d');
```

填充背景色:

```js
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);
```

第二个函数实际是画一个矩形并用颜色填充,头两个参数是矩形的左上角所在位置,后两个参数为宽度和高度.`canvas`的坐标默认以左上为(0,0)以保证全体坐标都为正.

我们可以改变原点位置:

```js
ctx.translate(width/2, height/2);
```

旋转整个`canvas`(弧度制):

```js
ctx.rotate(degToRad(5));
```

注意上述颜色可以是透明的:

```js
ctx.fillStyle = 'rgba(255, 0, 255, 0.75)';
```

如果我们想画边框图而不是填充全部:

```js
ctx.strokeStyle = 'rgb(255, 255, 255)';
ctx.lineWidth = 5;
ctx.strokeRect(25, 25, 175, 200);
```

参数的意义同上.其中`lineWidth`用于设置边框宽度.

我们还可以使用路径来画图.

```js
ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(100, 50);
ctx.lineTo(50, 50);
ctx.fill();
```

其中`beginPath`为开始路径画图(0,0),`moveTo`是移动而不画线,`lineTo`则画线,最后将路径围成的图像进行填充.

我们可以不画线而画圆:

```js
ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
```

前两个参数为圆的中心点,第三个参数为半径,第四个和第五个参数为起始角度和结束角度（弧度制），最后选择顺时针逆时针（false为逆时针）。０度方向为水平向右．

注意如果路径没有形成封闭图片，浏览器会自动在起点和终点补充连线形成封闭图像，所以想画不完整的圆需要画到圆心的直线．

我们也可以利用`stroke`来画只有边线的图像。

我们还可以画字：

```js
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.font = '36px arial';
ctx.strokeText('Canvas text', 50, 50);

ctx.fillStyle = 'red';
ctx.font = '48px georgia';
ctx.fillText('Canvas text', 50, 150);
```

`font`的设置和css中的相同,最后画图的函数的后两个参数指定文本框的左下角.

我们还可以添加图片:

```js
let image = new Image();
image.src = 'firefox.png';
image.onload = function() {
	ctx.drawImage(image, 20, 20, 185, 175, 50, 50, 185, 175);
}
```

`drawImage`的第一个参数为图像element,第二和第三个参数指定裁剪图像的左上位置,第四第五则指定裁剪图像的宽度和高度,6,7指定画图位置的左上角,8,9为画图的宽度和高度.

另外我们可以使用`requestAnimationFrame`等函数绘制动画,注意每一次我们都需要刷新画图并画新的图像,我们无法控制已画的图像.

我们还可以使用`webGL`画3d图像,通常我们会使用第三方库(如three.js)来简化这一操作.

## video and audio

我们可以使用相关的api自己写一个播放控件,具体方法是在html搭好框架后再在js中写相关的功能.它的图标可以使用web icon font以便于切换.

首先我们需要选定element:

```js
const media = document.querySelector('video');
```

下面的APIs负责视频开始和暂停:

```js
media.play();
media.pause();
```

想要复原的话暂停的基础上设置时间为0:

```js
media.currentTime = 0;
```

该property的单位是秒.

如果想加速减速播放,可使用`setTimeInternal`在暂停的基础上来让`currentTime`增加减少.

用`media.duration`可获得整个视频的时长(秒),用于进度条相关控件的实现.

## client-side storage

我们可以在用户端存储一些数据便于加快网页加载,防止多次下载同样的内容.

在过去我们使用`cookies`来存储,现在我们使用Web Storage和IndexDB来存储,前者用于存储简单的数据类似(如字符串,数字),后者用于存储复杂的数据类型(如视频).

它们会根据不同的网站生成分离的数据库.

`Web Storage`我们可以使用`sessionStorage`(仅在标签页加载时临时存储)和`localStorage`(即使标签页关闭也存在).它们的用法类似.其中的数据以`name:value`的格式组织.

添加数据:

```js
localStorage.setItem('name','Chris');
```

读取数据:

```js
let myName = localStorage.getItem('name');
```

`IndexDB`的操作就复杂得多了.

首先我们需要创建一个变量指向数据库:

```js
// Create an instance of a db object for us to store the open database in
let db;
```

然后添加请求并得到数据库:

```js
window.onload = function() {
	// Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    let request = window.indexedDB.open('notes_db', 1);
    // onerror handler signifies that the database didn't open successfully
    request.onerror = function() {
      console.log('Database failed to open');
    };

    // onsuccess handler signifies that the database opened successfully
    request.onsuccess = function() {
      console.log('Database opened successfully');

      // Store the opened database object in the db variable. This is used a lot below
      db = request.result;

      // Run the displayData() function to display the notes already in the IDB
      displayData();
    };
};
```

注意`open`的第一个参数为数据库名,第二个为版本号.

当数据库不存在或无该高版本时,会触发`onupgradeneeded`:

```js
// Setup the database tables if this has not already been done
request.onupgradeneeded = function(e) {
  // Grab a reference to the opened database
  let db = e.target.result;

  // Create an objectStore to store our notes in (basically like a single table)
  // including a auto-incrementing key
  let objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement:true });

  // Define what data items the objectStore will contain
  objectStore.createIndex('title', 'title', { unique: false });
  objectStore.createIndex('body', 'body', { unique: false });

  console.log('Database setup complete');
};
```

里面我们创建了一个表并创建了index.表的元素会自动被分配一个`id`.

添加新数据:

```js
let newItem = { title: titleInput.value, body: bodyInput.value };

// open a read/write db transaction, ready for adding the data
let transaction = db.transaction(['notes_os'], 'readwrite');

// call an object store that's already been added to the database
let objectStore = transaction.objectStore('notes_os');

// Make a request to add our newItem object to the object store
let request = objectStore.add(newItem);
```

遍历:

```js
  let objectStore = db.transaction('notes_os').objectStore('notes_os');
  objectStore.openCursor().onsuccess = function(e) {
    // Get a reference to the cursor
    let cursor = e.target.result;

    // If there is still another data item to iterate through, keep running this code
    if(cursor) {
      ...
      // Iterate to the next item in the cursor
      cursor.continue();
    } 
     else{
         //当指针为空时进行处理
     }
```

注意此时需要把id进行存储方便删除.

删除:

```js
// Define the deleteItem() function
function deleteItem(e) {
  // retrieve the name of the task we want to delete. We need
  // to convert it to a number before trying it use it with IDB; IDB key
  // values are type-sensitive.
  let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

  // open a database transaction and delete the task, finding it using the id we retrieved above
  let transaction = db.transaction(['notes_os'], 'readwrite');
  let objectStore = transaction.objectStore('notes_os');
  let request = objectStore.delete(noteId);

  // report that the data item has been deleted
```

上述操作仍需要加载html,css,js等文件,不可离线,我们也可以利用`service worker`来实现离线可访问.

`service worker`指一个被注册的为某个网站处理请求的js文件.它可以存下http请求的内容.

注册:

```js
  // Register service worker to control making site work offline

  if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/sw.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
```

注意路径是相对于网站跟路径而言的.

安装(即网站加载时开始控制请求):

```js
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/',
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/index.html',
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/index.js',
       '/learning-area/javascript/apis/client-side-storage/cache-sw/video-store-offline/style.css'
     ]);
   })
 );
});
```

里面用了几个cache API,`open`指打开存储的缓存(通过新建对象),`addALL`指请求相关的内容并加入缓存中.

处理请求,有缓存返回缓存,没缓存进行网络请求:

```js
self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```
## Validating forms
js提供了[Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation)用于验证数据.下列element支持它们:
-   [`HTMLButtonElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement) (represents a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element)
-   [`HTMLFieldSetElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement) (represents a [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset) element)
-   [`HTMLInputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) (represents an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element)
-   [`HTMLOutputElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOutputElement) (represents an [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output) element)
-   [`HTMLSelectElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement) (represents a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) element)
-   [`HTMLTextAreaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement) (represents a [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) element)
有如下的attributes:
-   `validationMessage`: 返回表述规范的文字.如果control不需要验证数据或符合规范,返回空字符.
-   `validity`: 返回 `ValidityState` object,有如下attributes:
    -   [`patternMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch "patternMismatch"): 值不符合`pattern`时返回true.
    -   [`tooLong`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong "tooLong"):值长过规定的最长时返回true.
    -   [`tooShort`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort "tooShort"): 值长过规定的最短时返回true.
    -   [`rangeOverflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow "rangeOverflow"): 值大于最大值时返回true.
    -   [`rangeUnderflow`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow "rangeUnderflow"): 值大于最小值时返回true.
    -   [`typeMismatch`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch "typeMismatch"): 值不符合type规定的规范时返回true(when [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) is `email` or `url`).
    -   `valid`: 值符合要求时返回true.
    -   `valueMissing`: 值是必须的却为空时返回true.
-   `willValidate`: 值需要被检查时返回true.
它还有如下的methods:
-   `checkValidity()`:检查是否符合要求. 如果不符合, 返回false并让该element发出 [`invalid` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event)
-   `reportValidity()`: 执行 `checkValidity()` method, 若为false就像用户进行了提交后一样告诉用户出错.
-   `setCustomValidity(message)`:添加不符合要求时浏览器显示的信息.当添加时,该element被认为是`invalid`.添加空字符代表`valid`.
浏览器默认的错误显示不可通过css,且在不同浏览器的实现不同,故我们可以通过[`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/novalidate "This is a link to an unwritten page")属性让form关闭浏览器默认的验证和错误显示,然后使用自己设计的验证系统.

## sending form data
使用`fetch`和`FormData`:
```js
let form = document.querySelector('form');

form.addEventListener('submit',async (e) => {

 // on form submission, prevent default

	 e.preventDefault();
	
	 // construct a FormData object, which fires the formdata event
	
	 data=new FormData(form);
	
	 await fetch(url+'input_a_bill', {
	
		 method: 'post',
		
		 body: data,
	
	 })

});
```
即使有文件它也会自动处理.

# others
## Destructuring assignment
用于解包数组或对象的语法.
数组的基础用法:
```js
const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"
```
定义声明分开:
```js
let a, b;

[a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```
长度超过数组会被赋值为undefined.
可以设置默认值:
```js
let a, b;

[a=5, b=7] = [1];
console.log(a); // 1
console.log(b); // 7
```
理由这种语法可以进行值的交换:
```js
let a = 1;
let b = 3;

[a, b] = [b, a];
console.log(a); // 3
console.log(b); // 1

const arr = [1,2,3];
[arr[2], arr[1]] = [arr[1], arr[2]];
console.log(arr); // [1,3,2]
```
可以处理函数的返回值:
```js
function f() {
  return [1, 2];
}

let a, b;
[a, b] = f();
console.log(a); // 1
console.log(b); // 2
```
可以忽略掉一些值:
```js
function f() {
  return [1, 2, 3];
}

const [a, , b] = f();
console.log(a); // 1
console.log(b); // 3

const [c] = f();
console.log(c); // 1
```
将剩下的值赋给一个变量:
```js
const [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]
```
对象基本语法:
```js
const user = {
    id: 42,
    isVerified: true
};

const {id, isVerified} = user;

console.log(id); // 42
console.log(isVerified); // true
```
于定义分开(`()`是必须的):
```js
let a, b;

({a, b} = {a: 1, b: 2});
```
使用新的名字:
```js
const o = {p: 42, q: true};
const {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true
```
默认值:
```js
const {a = 10, b = 5} = {a: 3};

console.log(a); // 3
console.log(b); // 5
```
用于函数参数:
```js
const user = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
    firstName: 'John',
    lastName: 'Doe'
  }
};

function userId({id}) {
  return id;
}

function whois({displayName, fullName: {firstName: name}}) {
  return `${displayName} is ${name}`;
}

console.log(userId(user)); // 42
console.log(whois(user));  // "jdoe is John"
```
设置参数的默认值(使得该函数可不带参数):
```js
function drawChart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
  console.log(size, coords, radius);
  // do some chart drawing
}

drawChart({
  coords: {x: 18, y: 30},
  radius: 30
});
```
数组和对象的destruction混用:
```js
const metadata = {
  title: 'Scratchpad',
  translations: [
    {
      locale: 'de',
      localization_tags: [],
      last_edit: '2014-04-14T08:43:37',
      url: '/de/docs/Tools/Scratchpad',
      title: 'JavaScript-Umgebung'
    }
  ],
  url: '/en-US/docs/Tools/Scratchpad'
};

let {
  title: englishTitle, // rename
  translations: [
    {
       title: localeTitle, // rename
    },
  ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
```
在循环中使用:
```js
const people = [
  {
    name: 'Mike Smith',
    family: {
      mother: 'Jane Smith',
      father: 'Harry Smith',
      sister: 'Samantha Smith'
    },
    age: 35
  },
  {
    name: 'Tom Jones',
    family: {
      mother: 'Norah Jones',
      father: 'Richard Jones',
      brother: 'Howard Jones'
    },
    age: 25
  }
];

for (const {name: n, family: {father: f}} of people) {
  console.log('Name: ' + n + ', Father: ' + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"
```
使用computed property name:
```js
let key = 'z';
let {[key]: foo} = {z: 'bar'};

console.log(foo); // "bar"
```
将剩下的赋给一个变量:
```js
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10
b; // 20
rest; // { c: 30, d: 40 }
```
destruction可以让不合法的identifier合法:
```js
const foo = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo;

console.log(fizzBuzz); // true
```
当进行destruction时,js会检查prototype链:
```js
let obj = {self: '123'};
obj.__proto__.prot = '456';
const {self, prot} = obj;
// self "123"
// prot "456" (Access to the prototype chain)
```
## modules
以前js通常只需要单文件运行，故没有module功能，现代浏览器为起添加了此功能。
注意只有在modules中可以使用modules,故引入文件需:
```html
<script type="module" src="main.js"></script>
```
modules的核心的`import`和`export`.
首先是`export`,声明moudule可以被import的事物,可以是 functions, `var`, `let`, `const`, 或classes:
```js
export const name = 'square';
```
注意必须是`top-level item`,故不能在函数内export.
更场景的用法是在文件结尾一次性export:
```js
export { name, draw, reportArea, reportPerimeter };
```
我们还可以设置一个默认export:
```js
export default function(ctx) {
  ...
}
```
然后是`import`:
```js
import { name, draw, reportArea, reportPerimeter } from './modules/square.js';
```
import默认:
```js
import defaultExport from "module-name";
import {default as randomSquare} from './modules/square.js';
```
只执行代码不使用:
```js
import '/modules/my-module.js';
```
其中`./`表示当前路径.如果写`/`前缀则需补全前面的文件夹名.
import后不可修改,但可以修改properties,类似const.
module和通常的js文件有以下不同:
- 必须使用server,使用本地文件运行会发送CORS错误.
- 使用`strict mode`.
- 自动defer.
- 引入几次都只执行一次.
- import进的功能在console不可用.
我们可以使用`as`(import,export均可)来重命名避免命名冲突:
```js
// inside module.js
export {
  function1 as newFunctionName,
  function2 as anotherNewFunctionName
};

// inside main.js
import { newFunctionName, anotherNewFunctionName } from './modules/module.js';
```
我们还可以创建一个module对象来方便访问:
```js
import * as Module from './modules/module.js';
Module.function1()
```
我们可以阻止多个文件作为一个module被`import`:
```js
export { Square } from './shapes/square.js';
export { Triangle } from './shapes/triangle.js';
export { Circle } from './shapes/circle.js';
```
注意在其中不能写代码,js会直接定位到相应的文件.
我们还可以使用`import()`来动态引入.它返回`promise`:
```js
import('./modules/myModule.js')
  .then((module) => {
    // Do something with the module.
  });
```
在module中可以使用`await`,引入的文件会自动等待:
```js
// fetch request
const colors = fetch('../data/colors.json')
  .then(response => response.json());

export default await colors;
```
常见问题:
- `.js`文件必须正确配置`MIME-type`.
- 本地运行会导致CORS错误.
- 如果使用`.mjs`表示module,有很多环境会不支持.
## animation
控制animation event:
```css
.slidein {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: 3;
  animation-direction: alternate;
}

@keyframes slidein {
  from {
    margin-left:100%;
    width:300%
  }

  to {
    margin-left:0%;
    width:100%;
  }
}
```

```js
var element = document.getElementById("watchme");
element.addEventListener("animationstart", listener, false);
element.addEventListener("animationend", listener, false);
element.addEventListener("animationiteration", listener, false);

element.className = "slidein";
```
注意我们是在js中让动画开始(添加class),不如start事件会在js执行前发出.

